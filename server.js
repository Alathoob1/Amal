/*
=========================================================
 README - HOW TO RUN THIS PROJECT
=========================================================
 This project MUST be run through a Node.js server to work correctly.
 DO NOT open the HTML files directly (e.g. by double-clicking them, which opens file:///...).
 
 To run the project:
 1. Open your terminal in this folder.
 2. Run: npm start (or node server.js)
 3. Open your browser and go to: http://localhost:3000
 
 All data is loaded live from the SQLite database (database.sqlite).
=========================================================
*/

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simple CORS middleware to allow requests from file://
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// ----------------------------------------------------
// PAGE ROUTES (Without .html extension)
// ----------------------------------------------------
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));
app.get('/parent', (req, res) => res.sendFile(path.join(__dirname, 'parent.html')));
app.get('/doctor', (req, res) => res.sendFile(path.join(__dirname, 'doctor.html')));

let db;

async function initDB() {
    db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });
    
    // Initialize schema
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);
    
    console.log('Database initialized.');
}

initDB().catch(console.error);

// ----------------------------------------------------
// AUTHENTICATION
// ----------------------------------------------------
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
        }
        if (user.status === 'معطل') {
            return res.status(403).json({ success: false, message: 'هذا الحساب معطل. يرجى مراجعة الإدارة.' });
        }
        
        let isMatch = false;
        if (user.password === password) {
            isMatch = true; 
        } else {
            try { isMatch = await bcrypt.compare(password, user.password); } catch(e){}
        }
        
        if (isMatch) {
            res.json({ success: true, role: user.role, userId: user.id, name: user.fullName });
        } else {
            res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        // Register parent
        const { fullName, email, password, phone, childName, childAge, childGender, childDiagnosis, childNotes } = req.body;
        
        const existing = await db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existing) {
            return res.status(400).json({ success: false, message: 'البريد الإلكتروني مستخدم مسبقاً.' });
        }
        
        const hashedPw = await bcrypt.hash(password, 10);
        const result = await db.run(
            'INSERT INTO users (role, fullName, email, password, phone) VALUES (?, ?, ?, ?, ?)',
            ['parent', fullName, email, hashedPw, phone]
        );
        const parentId = result.lastID;
        
        if (childName) {
            await db.run(
                `INSERT INTO children (parentId, fullName, age, gender, diagnosis, notes) VALUES (?, ?, ?, ?, ?, ?)`,
                [parentId, childName, childAge, childGender, childDiagnosis, childNotes]
            );
        }
        
        // Log activity for Admin
        await db.run(
            'INSERT INTO activity_logs (actorId, actorRole, action, description) VALUES (?, ?, ?, ?)',
            [parentId, 'parent', 'register', `تم تسجيل ولي أمر جديد: ${fullName}`]
        );
        
        // Admin Notification
        const admin = await db.get('SELECT id FROM users WHERE role = "admin" LIMIT 1');
        if (admin) {
            await db.run('INSERT INTO notifications (userId, text) VALUES (?, ?)', [admin.id, `تم تسجيل ولي أمر جديد: ${fullName}`]);
        }
        
        res.json({ success: true, message: 'تم إنشاء الحساب بنجاح', userId: parentId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ----------------------------------------------------
// USERS API
// ----------------------------------------------------
app.get('/api/users', async (req, res) => {
    const users = await db.all('SELECT id, role, fullName, email, phone, createdAt, status FROM users');
    res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await db.get('SELECT id, role, fullName, email, phone, createdAt, status FROM users WHERE id = ?', [req.params.id]);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        let extra = {};
        if (user.role === 'parent') {
            extra.children = await db.all('SELECT * FROM children WHERE parentId = ?', [user.id]);
            extra.appointments = await db.all('SELECT * FROM appointments WHERE parentId = ?', [user.id]);
            extra.reports = await db.all('SELECT r.* FROM reports r JOIN children c ON r.childId = c.id WHERE c.parentId = ?', [user.id]);
        } else if (user.role === 'doctor') {
            extra.details = await db.get('SELECT * FROM doctors WHERE userId = ?', [user.id]);
            extra.appointments = await db.all('SELECT * FROM appointments WHERE doctorId = ?', [user.id]);
            extra.reports = await db.all('SELECT * FROM reports WHERE doctorId = ?', [user.id]);
        }
        res.json({ ...user, ...extra });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const { fullName, email, phone, role, status } = req.body;
        await db.run(
            'UPDATE users SET fullName = ?, email = ?, phone = ?, role = COALESCE(?, role), status = COALESCE(?, status) WHERE id = ?',
            [fullName, email, phone, role, status, req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await db.run('UPDATE users SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const childCount = await db.get('SELECT COUNT(*) as c FROM children WHERE parentId = ?', [req.params.id]);
        const docApptCount = await db.get('SELECT COUNT(*) as c FROM appointments WHERE doctorId = ?', [req.params.id]);
        if ((childCount && childCount.c > 0) || (docApptCount && docApptCount.c > 0)) {
            return res.status(400).json({ success: false, message: 'لا يمكن حذف الحساب لوجود بيانات مرتبطة، يمكن تعطيله بدلاً من ذلك' });
        }
        await db.run('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// CHILDREN API
// ----------------------------------------------------
app.get('/api/children', async (req, res) => {
    const children = await db.all('SELECT * FROM children');
    res.json(children);
});

app.get('/api/children/:id', async (req, res) => {
    const child = await db.get('SELECT * FROM children WHERE id = ?', [req.params.id]);
    res.json(child);
});

app.post('/api/children', async (req, res) => {
    try {
        const { parentId, fullName, age, gender, diagnosis, notes } = req.body;
        const result = await db.run(
            `INSERT INTO children (parentId, fullName, age, gender, diagnosis, notes) VALUES (?, ?, ?, ?, ?, ?)`,
            [parentId, fullName, age, gender, diagnosis, notes]
        );
        res.json({ success: true, childId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/children/:id', async (req, res) => {
    try {
        const { fullName, age, gender, diagnosis, notes } = req.body;
        await db.run(
            'UPDATE children SET fullName = ?, age = ?, gender = ?, diagnosis = ?, notes = ? WHERE id = ?',
            [fullName, age, gender, diagnosis, notes, req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// DOCTORS API
// ----------------------------------------------------
app.get('/api/doctors', async (req, res) => {
    try {
        const doctors = await db.all(`
            SELECT u.id, u.fullName, u.email, u.phone, u.status, u.createdAt, d.specialization, d.experience
            FROM users u
            JOIN doctors d ON u.id = d.userId
            WHERE u.role = 'doctor'
        `);
        res.json(doctors);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/add-doctor', async (req, res) => {
    try {
        const { fullName, email, password, phone, specialization, experience } = req.body;
        const existing = await db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existing) {
            return res.status(400).json({ success: false, message: 'البريد الإلكتروني مستخدم مسبقاً.' });
        }
        
        const hashedPw = await bcrypt.hash(password, 10);
        const result = await db.run(
            'INSERT INTO users (role, fullName, email, password, phone) VALUES (?, ?, ?, ?, ?)',
            ['doctor', fullName, email, hashedPw, phone]
        );
        const doctorId = result.lastID;
        
        await db.run(
            'INSERT INTO doctors (userId, specialization, experience) VALUES (?, ?, ?)',
            [doctorId, specialization, experience]
        );
        
        res.json({ success: true, doctorId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ----------------------------------------------------
// APPOINTMENTS API
// ----------------------------------------------------
app.get('/api/appointments', async (req, res) => {
    const appointments = await db.all('SELECT * FROM appointments ORDER BY date DESC');
    res.json(appointments);
});

app.post('/api/appointments', async (req, res) => {
    try {
        const { childId, parentId, doctorId, date, time, status, notes } = req.body;
        const result = await db.run(
            'INSERT INTO appointments (childId, parentId, doctorId, date, time, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [childId, parentId, doctorId, date, time, status || 'Pending', notes]
        );
        // Link doctor and patient
        await db.run('INSERT OR IGNORE INTO patient_assignments (doctorId, childId, parentId) VALUES (?, ?, ?)', [doctorId, childId, parentId]);
        
        res.json({ success: true, appointmentId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/appointments/:id', async (req, res) => {
    try {
        const { status, notes } = req.body;
        await db.run('UPDATE appointments SET status = ?, notes = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [status, notes, req.params.id]);
        
        const appt = await db.get('SELECT parentId, doctorId FROM appointments WHERE id = ?', [req.params.id]);
        if (appt) {
             let msg = `تم تحديث حالة الموعد إلى: ${status}`;
             await db.run('INSERT INTO notifications (userId, text) VALUES (?, ?)', [appt.parentId, msg]);
             await db.run('INSERT INTO activity_logs (actorId, actorRole, action, description) VALUES (?, ?, ?, ?)', [appt.doctorId, 'doctor', 'appointment_update', msg]);
        }
        
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// ANALYSES API
// ----------------------------------------------------
app.get('/api/analyses', async (req, res) => {
    const analyses = await db.all('SELECT * FROM analyses ORDER BY createdAt DESC');
    res.json(analyses);
});

app.post('/api/analyses', async (req, res) => {
    try {
        const { childId, parentId, doctorId, title, aiResult, aiConfidence, aiSummary } = req.body;
        const result = await db.run(
            'INSERT INTO analyses (childId, parentId, doctorId, title, aiResult, aiConfidence, aiSummary) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [childId, parentId, doctorId, title, aiResult, aiConfidence, aiSummary]
        );
        // Link doctor and patient
        await db.run('INSERT OR IGNORE INTO patient_assignments (doctorId, childId, parentId) VALUES (?, ?, ?)', [doctorId, childId, parentId]);
        
        // Notify doctor
        await db.run('INSERT INTO notifications (userId, text) VALUES (?, ?)', [doctorId, 'طلب تحليل ذكاء اصطناعي جديد بانتظار مراجعتك']);
        
        // Log
        const parent = await db.get('SELECT fullName FROM users WHERE id = ?', [parentId]);
        await db.run('INSERT INTO activity_logs (actorId, actorRole, action, description) VALUES (?, ?, ?, ?)', [parentId, 'parent', 'analysis_request', `طلب تحليل جديد من ولي الأمر: ${parent.fullName}`]);
        
        res.json({ success: true, analysisId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/analyses/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const analysis = await db.get(`
            SELECT a.*, 
                   c.fullName as childName, c.age as childAge, c.gender as childGender, c.diagnosis as childDiagnosis,
                   u1.fullName as parentName, u1.email as parentEmail, u1.phone as parentPhone,
                   u2.fullName as doctorName, d.specialization as doctorSpecialization
            FROM analyses a
            LEFT JOIN children c ON a.childId = c.id
            LEFT JOIN users u1 ON a.parentId = u1.id
            LEFT JOIN users u2 ON a.doctorId = u2.id
            LEFT JOIN doctors d ON u2.id = d.userId
            WHERE a.id = ?
        `, [id]);

        if (!analysis) return res.status(404).json({ success: false, message: 'Analysis not found' });
        res.json({ success: true, analysis });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.put('/api/analyses/:id/review', async (req, res) => {
    try {
        const { doctorReview, doctorRecommendations, status } = req.body;
        await db.run(
            'UPDATE analyses SET doctorReview = ?, doctorRecommendations = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            [doctorReview, doctorRecommendations, status, req.params.id]
        );
        
        const analysis = await db.get('SELECT * FROM analyses WHERE id = ?', [req.params.id]);
        
        if (status === 'sent') {
            // Create a report
            await db.run(
                'INSERT INTO reports (childId, parentId, doctorId, analysisId, title, progress, recommendations, doctorNotes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [analysis.childId, analysis.parentId, analysis.doctorId, analysis.id, analysis.title, analysis.aiSummary, doctorRecommendations, doctorReview, 'sent']
            );
            
            // Notify parent
            await db.run('INSERT INTO notifications (userId, text) VALUES (?, ?)', [analysis.parentId, 'تم استلام تقرير تحليل جديد من الطبيب']);
            
            // Log
            await db.run('INSERT INTO activity_logs (actorId, actorRole, action, description) VALUES (?, ?, ?, ?)', [analysis.doctorId, 'doctor', 'analysis_reviewed', `الطبيب قام بمراجعة واعتماد التحليل للطفل (ID: ${analysis.childId})`]);
        }
        
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// REPORTS API
// ----------------------------------------------------
app.get('/api/reports', async (req, res) => {
    const reports = await db.all('SELECT * FROM reports ORDER BY createdAt DESC');
    res.json(reports);
});

app.post('/api/reports', async (req, res) => {
    try {
        const { childId, parentId, doctorId, title, progress, recommendations, doctorNotes, status } = req.body;
        const result = await db.run(
            'INSERT INTO reports (childId, parentId, doctorId, title, progress, recommendations, doctorNotes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [childId, parentId, doctorId, title, progress, recommendations, doctorNotes, status || 'draft']
        );
        res.json({ success: true, reportId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/reports/:id', async (req, res) => {
    try {
        const { title, progress, recommendations, doctorNotes, status } = req.body;
        await db.run(
            'UPDATE reports SET title = ?, progress = ?, recommendations = ?, doctorNotes = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
            [title, progress, recommendations, doctorNotes, status, req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/reports/:id', async (req, res) => {
    try {
        const report = await db.get(`
            SELECT r.*, c.fullName as childName, u.fullName as doctorName 
            FROM reports r 
            LEFT JOIN children c ON r.childId = c.id
            LEFT JOIN users u ON r.doctorId = u.id
            WHERE r.id = ?`, [req.params.id]);
        if (!report) return res.status(404).json({ error: 'Report not found' });
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ----------------------------------------------------
// MESSAGES & CONVERSATIONS API
// ----------------------------------------------------
app.get('/api/users/:userId/conversations', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await db.all(`
            SELECT c.*, 
                   u1.fullName as p1Name, u1.role as p1Role,
                   u2.fullName as p2Name, u2.role as p2Role
            FROM conversations c
            JOIN users u1 ON c.participant1Id = u1.id
            JOIN users u2 ON c.participant2Id = u2.id
            WHERE c.participant1Id = ? OR c.participant2Id = ?
            ORDER BY c.updatedAt DESC
        `, [userId, userId]);
        
        // Format for frontend
        const formatted = conversations.map(c => {
            const otherParticipantId = c.participant1Id == userId ? c.participant2Id : c.participant1Id;
            const otherParticipantName = c.participant1Id == userId ? c.p2Name : c.p1Name;
            return {
                id: c.id,
                otherParticipantId,
                otherParticipantName,
                updatedAt: c.updatedAt
            };
        });
        res.json(formatted);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/conversations/:conversationId/messages', async (req, res) => {
    try {
        const messages = await db.all('SELECT * FROM messages WHERE conversationId = ? ORDER BY createdAt ASC', [req.params.conversationId]);
        res.json(messages);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const senderId = req.body.senderId || req.body.sender_id;
        const receiverId = req.body.receiverId || req.body.receiver_id;
        const messageText = req.body.message || req.body.text;
        
        if (!senderId || !receiverId || !messageText) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Find or create conversation
        let conv = await db.get(`
            SELECT id FROM conversations 
            WHERE (participant1Id = ? AND participant2Id = ?) OR (participant1Id = ? AND participant2Id = ?)
        `, [senderId, receiverId, receiverId, senderId]);

        if (!conv) {
            const resConv = await db.run('INSERT INTO conversations (participant1Id, participant2Id) VALUES (?, ?)', [senderId, receiverId]);
            conv = { id: resConv.lastID };
        } else {
            await db.run('UPDATE conversations SET updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [conv.id]);
        }

        const result = await db.run(
            'INSERT INTO messages (conversationId, senderId, receiverId, message) VALUES (?, ?, ?, ?)',
            [conv.id, senderId, receiverId, messageText]
        );
        
        // Notify
        await db.run('INSERT INTO notifications (userId, text) VALUES (?, ?)', [receiverId, 'لديك رسالة جديدة']);
        
        res.json({ success: true, messageId: result.lastID, conversationId: conv.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// ACTIVITIES API
// ----------------------------------------------------
app.get('/api/activities', async (req, res) => {
    const activities = await db.all('SELECT * FROM activities ORDER BY createdAt DESC');
    res.json(activities);
});

app.post('/api/activities', async (req, res) => {
    try {
        const { childId, doctorId, title, description, status } = req.body;
        const result = await db.run(
            'INSERT INTO activities (childId, doctorId, title, description, status) VALUES (?, ?, ?, ?, ?)',
            [childId, doctorId, title, description, status || 'Pending']
        );
        res.json({ success: true, activityId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// DASHBOARD AGGREGATION APIs
// ----------------------------------------------------

app.post('/api/notifications', async (req, res) => {
    try {
        const { userId, text } = req.body;
        const result = await db.run(
            'INSERT INTO notifications (userId, text, isRead) VALUES (?, ?, 0)',
            [userId, text]
        );
        res.json({ success: true, notificationId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/notifications/read', async (req, res) => {
    try {
        const { userId } = req.body;
        await db.run('UPDATE notifications SET isRead = 1 WHERE userId = ?', [userId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/notifications', async (req, res) => {
    try {
        const { userId } = req.body;
        await db.run('DELETE FROM notifications WHERE userId = ?', [userId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/parents/:id/data', async (req, res) => {
    try {
        const parentId = req.params.id;
        const profile = await db.get('SELECT id, fullName, email, phone FROM users WHERE id = ? AND role = "parent"', [parentId]);
        if (!profile) return res.status(404).json({ error: 'Parent not found' });
        
        const children = await db.all('SELECT * FROM children WHERE parentId = ?', [parentId]);
        const activities = await db.all('SELECT a.* FROM activities a JOIN children c ON a.childId = c.id WHERE c.parentId = ? ORDER BY a.createdAt DESC', [parentId]);
        const appointments = await db.all('SELECT a.*, u.fullName as doctorName FROM appointments a JOIN users u ON a.doctorId = u.id WHERE a.parentId = ? ORDER BY a.date DESC', [parentId]);
        const notifications = await db.all('SELECT * FROM notifications WHERE userId = ? ORDER BY id DESC', [parentId]);
        const reports = await db.all('SELECT r.*, c.fullName as childName FROM reports r JOIN children c ON r.childId = c.id WHERE r.parentId = ? AND r.status = "sent" ORDER BY r.createdAt DESC', [parentId]);
        const analyses = await db.all('SELECT a.*, c.fullName as childName FROM analyses a JOIN children c ON a.childId = c.id WHERE a.parentId = ? ORDER BY a.createdAt DESC', [parentId]);

        res.json({
            profile,
            children,
            activities,
            appointments,
            notifications,
            reports,
            analyses
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/doctors/:id/data', async (req, res) => {
    try {
        const doctorId = req.params.id;
        const profile = await db.get('SELECT id, fullName, email, phone FROM users WHERE id = ? AND role = "doctor"', [doctorId]);
        if (!profile) return res.status(404).json({ error: 'Doctor not found' });
        
        const doctorDetails = await db.get('SELECT * FROM doctors WHERE userId = ?', [doctorId]);

        // Get unique children linked to this doctor via patient_assignments
        const patients = await db.all(`
            SELECT DISTINCT c.*, u.fullName as parentName 
            FROM children c 
            JOIN users u ON c.parentId = u.id
            JOIN patient_assignments pa ON c.id = pa.childId
            WHERE pa.doctorId = ?
        `, [doctorId]);

        const activities = await db.all('SELECT a.*, c.fullName as childName FROM activities a JOIN children c ON a.childId = c.id WHERE a.doctorId = ? ORDER BY a.createdAt DESC', [doctorId]);
        const appointments = await db.all('SELECT a.*, c.fullName as childName, u.fullName as parentName FROM appointments a JOIN children c ON a.childId = c.id JOIN users u ON a.parentId = u.id WHERE a.doctorId = ? ORDER BY a.date DESC', [doctorId]);
        const reports = await db.all('SELECT r.*, c.fullName as childName, u.fullName as parentName FROM reports r JOIN children c ON r.childId = c.id JOIN users u ON c.parentId = u.id WHERE r.doctorId = ? ORDER BY r.id DESC', [doctorId]);
        const analyses = await db.all('SELECT a.*, c.fullName as childName, u.fullName as parentName FROM analyses a JOIN children c ON a.childId = c.id JOIN users u ON a.parentId = u.id WHERE a.doctorId = ? ORDER BY a.createdAt DESC', [doctorId]);
        const notifications = await db.all('SELECT * FROM notifications WHERE userId = ? ORDER BY id DESC', [doctorId]);

        res.json({
            profile: { ...profile, ...doctorDetails },
            patients,
            activities,
            appointments,
            reports,
            analyses,
            notifications
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/stats', async (req, res) => {
    try {
        const parents = await db.get('SELECT COUNT(*) as count FROM users WHERE role = "parent"');
        const doctors = await db.get('SELECT COUNT(*) as count FROM users WHERE role = "doctor"');
        const children = await db.get('SELECT COUNT(*) as count FROM children');
        const pendingAnalyses = await db.get('SELECT COUNT(*) as count FROM analyses WHERE status = "pending"');
        const totalReports = await db.get('SELECT COUNT(*) as count FROM reports');
        const totalAppointments = await db.get('SELECT COUNT(*) as count FROM appointments');
        
        const logs = await db.all('SELECT * FROM activity_logs ORDER BY id DESC LIMIT 20');
        const users = await db.all('SELECT id, role, fullName, email, phone, createdAt FROM users ORDER BY id DESC LIMIT 10');

        res.json({
            stats: {
                parents: parents.count,
                doctors: doctors.count,
                children: children.count,
                pendingAnalyses: pendingAnalyses.count,
                totalReports: totalReports.count,
                totalAppointments: totalAppointments.count,
                total: parents.count + doctors.count + children.count
            },
            logs,
            users
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/logs', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const logs = await db.all('SELECT * FROM activity_logs ORDER BY id DESC LIMIT ?', [limit]);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// EDUCATIONAL CONTENT API
// ----------------------------------------------------
app.get('/api/educational_content', async (req, res) => {
    try {
        const content = await db.all('SELECT * FROM educational_content ORDER BY createdAt DESC');
        res.json(content);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/educational_content', async (req, res) => {
    try {
        const { title, category, language, author, contentType, description, link, status } = req.body;
        const result = await db.run(
            'INSERT INTO educational_content (title, category, language, author, contentType, description, link, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, category, language, author, contentType, description, link, status || 'مسودة']
        );
        res.json({ success: true, id: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/educational_content/:id', async (req, res) => {
    try {
        const { title, category, language, author, contentType, description, link, status } = req.body;
        await db.run(
            'UPDATE educational_content SET title = ?, category = ?, language = ?, author = ?, contentType = ?, description = ?, link = ?, status = COALESCE(?, status) WHERE id = ?',
            [title, category, language, author, contentType, description, link, status, req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/educational_content/:id', async (req, res) => {
    try {
        await db.run('DELETE FROM educational_content WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`Server is ONLINE!`);
    console.log(`Please open your browser and go to:`);
    console.log(`=> http://localhost:${PORT}`);
    console.log(`\nIMPORTANT: Do NOT open HTML files directly!`);
    console.log(`=================================================\n`);
});
