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
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
        
        // Match password (handle plain text for seed data if needed, or bcrypt)
        let isMatch = false;
        if (user.password === password) {
            isMatch = true; // For simple seed data
        } else {
            try { isMatch = await bcrypt.compare(password, user.password); } catch(e){}
        }
        
        if (isMatch) {
            res.json({ success: true, role: user.role, userId: user.id, name: user.name });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, phone, childName, childAge, childGender, childLevel, childCom, childHistory, childTriggers, childNotes, childTherapy } = req.body;
        
        const existing = await db.get('SELECT id FROM users WHERE email = ?', [email]);
        if (existing) {
            return res.status(400).json({ success: false, message: 'Email already exists.' });
        }
        
        const hashedPw = await bcrypt.hash(password, 10);
        const result = await db.run(
            'INSERT INTO users (role, name, email, password, phone) VALUES (?, ?, ?, ?, ?)',
            ['parent', name, email, hashedPw, phone]
        );
        const parentId = result.lastID;
        
        await db.run(
            `INSERT INTO children 
            (parent_id, name, age, gender, autism_level, communication_style, behavioral_history, emotional_triggers, medical_notes, therapy_history) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [parentId, childName, childAge, childGender, childLevel, childCom, childHistory, childTriggers, childNotes, childTherapy]
        );
        
        res.json({ success: true, message: 'Account created successfully', userId: parentId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ----------------------------------------------------
// USERS API
// ----------------------------------------------------
app.get('/api/users', async (req, res) => {
    const users = await db.all('SELECT id, role, name, email, phone, created_at as createdAt, "active" as status FROM users');
    res.json(users);
});

app.get('/api/users/:id', async (req, res) => {
    const user = await db.get('SELECT id, role, name, email, phone, created_at as createdAt, "active" as status FROM users WHERE id = ?', [req.params.id]);
    res.json(user);
});

// ----------------------------------------------------
// PARENT / CHILD DATA
// ----------------------------------------------------
app.get('/api/parents/:id/data', async (req, res) => {
    try {
        const parentId = req.params.id;
        const profile = await db.get('SELECT * FROM users WHERE id = ? AND role = "parent"', [parentId]);
        if (!profile) return res.status(404).json({ error: 'Parent not found' });
        
        const children = await db.all('SELECT * FROM children WHERE parent_id = ?', [parentId]);
        const drawings = await db.all('SELECT d.* FROM drawings d JOIN children c ON d.child_id = c.id WHERE c.parent_id = ? ORDER BY d.id DESC', [parentId]);
        const appointments = await db.all('SELECT a.*, u.name as doctor_name FROM appointments a JOIN users u ON a.doctor_id = u.id WHERE a.parent_id = ? ORDER BY a.date DESC', [parentId]);
        const notifications = await db.all('SELECT * FROM notifications WHERE user_id = ? ORDER BY id DESC', [parentId]);
        
        res.json({
            profile,
            children,
            drawings,
            appointments,
            notifications
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// DOCTOR DATA
// ----------------------------------------------------
app.get('/api/doctors', async (req, res) => {
    try {
        const doctors = await db.all('SELECT id, role, name, email, phone, created_at as joinDate, "active" as status, "متاح" as availability FROM users WHERE role = "doctor"');
        res.json({ doctors });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/doctors/:id/data', async (req, res) => {
    try {
        const doctorId = req.params.id;
        const profile = await db.get('SELECT id, role, name, email, phone FROM users WHERE id = ?', [doctorId]);
        if (!profile) return res.status(404).json({ error: 'Doctor not found' });
        
        const patients = await db.all('SELECT c.*, u.name as parent_name FROM children c JOIN users u ON c.parent_id = u.id WHERE c.doctor_id = ?', [doctorId]);
        const pendingAnalyses = await db.all('SELECT d.*, c.name as child_name, c.age, c.gender FROM drawings d JOIN children c ON d.child_id = c.id WHERE d.status = "review" AND c.doctor_id = ?', [doctorId]);
        const appointments = await db.all('SELECT a.*, c.name as child_name, u.name as parent_name FROM appointments a JOIN children c ON a.child_id = c.id JOIN users u ON a.parent_id = u.id WHERE a.doctor_id = ? ORDER BY a.date DESC', [doctorId]);
        const reports = await db.all('SELECT r.*, c.name as child_name, c.age as child_age FROM reports r JOIN children c ON r.child_id = c.id WHERE r.doctor_id = ? ORDER BY r.id DESC', [doctorId]);
        
        res.json({
            profile,
            patients,
            pendingAnalyses,
            appointments,
            reports
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// REPORTS
// ----------------------------------------------------
app.put('/api/reports/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await db.run('UPDATE reports SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// MESSAGES & CONVERSATIONS
// ----------------------------------------------------
app.get('/api/users/:id/conversations', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await db.get('SELECT role FROM users WHERE id = ?', [userId]);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        let conversations;
        if (user.role === 'doctor') {
            conversations = await db.all(`
                SELECT c.*, u.name as parent_name, ch.name as child_name 
                FROM conversations c 
                JOIN users u ON c.parent_id = u.id 
                LEFT JOIN children ch ON c.child_id = ch.id 
                WHERE c.doctor_id = ? 
                ORDER BY c.updated_at DESC
            `, [userId]);
        } else if (user.role === 'parent') {
            conversations = await db.all(`
                SELECT c.*, u.name as doctor_name, ch.name as child_name 
                FROM conversations c 
                JOIN users u ON c.doctor_id = u.id 
                LEFT JOIN children ch ON c.child_id = ch.id 
                WHERE c.parent_id = ? 
                ORDER BY c.updated_at DESC
            `, [userId]);
        } else {
            conversations = [];
        }
        res.json({ conversations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/conversations/:id/messages', async (req, res) => {
    try {
        const messages = await db.all('SELECT m.*, u.name as sender_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.conversation_id = ? ORDER BY m.id ASC', [req.params.id]);
        res.json({ messages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const { sender_id, receiver_id, sender_role, text } = req.body;
        const now = new Date();
        const time = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
        const date = now.toISOString().split('T')[0];
        
        let doctor_id, parent_id;
        if (sender_role === 'doctor') {
            doctor_id = sender_id;
            parent_id = receiver_id;
        } else {
            doctor_id = receiver_id;
            parent_id = sender_id;
        }
        
        let conv = await db.get('SELECT id FROM conversations WHERE doctor_id = ? AND parent_id = ?', [doctor_id, parent_id]);
        if (!conv) {
            const child = await db.get('SELECT id FROM children WHERE parent_id = ? AND doctor_id = ? LIMIT 1', [parent_id, doctor_id]) || await db.get('SELECT id FROM children WHERE parent_id = ? LIMIT 1', [parent_id]);
            const child_id = child ? child.id : null;
            const convRes = await db.run('INSERT INTO conversations (doctor_id, parent_id, child_id, last_message) VALUES (?, ?, ?, ?)', [doctor_id, parent_id, child_id, text]);
            conv = { id: convRes.lastID };
        } else {
            await db.run('UPDATE conversations SET last_message = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [text, conv.id]);
        }
        
        const result = await db.run(
            'INSERT INTO messages (conversation_id, sender_id, sender_role, text, time, date) VALUES (?, ?, ?, ?, ?, ?)',
            [conv.id, sender_id, sender_role, text, time, date]
        );
        res.json({ success: true, messageId: result.lastID, conversationId: conv.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// PROFILE
// ----------------------------------------------------
app.put('/api/users/:id/profile', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (password) {
            const hashedPw = await bcrypt.hash(password, 10);
            await db.run('UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?', [name, email, phone, hashedPw, req.params.id]);
        } else {
            await db.run('UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, req.params.id]);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// ADMIN DATA
// ----------------------------------------------------
app.get('/api/admin/stats', async (req, res) => {
    try {
        const parents = await db.get('SELECT COUNT(*) as count FROM users WHERE role = "parent"');
        const doctors = await db.get('SELECT COUNT(*) as count FROM users WHERE role = "doctor"');
        const children = await db.get('SELECT COUNT(*) as count FROM children');
        const newAnalyses = await db.get('SELECT COUNT(*) as count FROM drawings WHERE status = "analyzing"');
        const pendingReviews = await db.get('SELECT COUNT(*) as count FROM drawings WHERE status = "review"');
        const approvedReports = await db.get('SELECT COUNT(*) as count FROM drawings WHERE status = "approved"');
        const flags = await db.get('SELECT COUNT(*) as count FROM community_reports WHERE status = "pending"');
        
        const communityReports = await db.all('SELECT r.*, u.name as user_name, g.name_ar as group_name FROM community_reports r JOIN users u ON r.user_id = u.id LEFT JOIN community_groups g ON r.group_id = g.id ORDER BY r.id DESC LIMIT 20');
        
        res.json({
            stats: {
                parents: parents.count,
                doctors: doctors.count,
                children: children.count,
                newAnalyses: newAnalyses.count,
                pendingReviews: pendingReviews.count,
                approvedReports: approvedReports.count,
                flags: flags.count,
                total: parents.count + doctors.count + children.count
            },
            communityReports
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// DRAWINGS / AI ANALYSES
// ----------------------------------------------------
app.post('/api/drawings', async (req, res) => {
    try {
        const { child_id, name, image_url } = req.body;
        const result = await db.run(
            'INSERT INTO drawings (child_id, name, image_url, status, upload_date) VALUES (?, ?, ?, "analyzing", date("now"))',
            [child_id, name, image_url]
        );
        res.json({ success: true, drawingId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/drawings/:id/review', async (req, res) => {
    try {
        const { status, doctor_comments, recommendations } = req.body;
        await db.run(
            'UPDATE drawings SET status = ?, doctor_comments = ?, recommendations = ? WHERE id = ?',
            [status, doctor_comments, recommendations, req.params.id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// APPOINTMENTS
// ----------------------------------------------------
app.post('/api/appointments', async (req, res) => {
    try {
        const { parent_id, doctor_id, child_id, date, time, type } = req.body;
        const result = await db.run(
            'INSERT INTO appointments (parent_id, doctor_id, child_id, date, time, type) VALUES (?, ?, ?, ?, ?, ?)',
            [parent_id, doctor_id, child_id, date, time, type]
        );
        res.json({ success: true, appointmentId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/appointments/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        await db.run('UPDATE appointments SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// COMMUNITY
// ----------------------------------------------------
app.get('/api/community/groups', async (req, res) => {
    const groups = await db.all('SELECT * FROM community_groups');
    res.json(groups);
});

// ----------------------------------------------------
// LOGS
// ----------------------------------------------------
app.get('/api/logs', async (req, res) => {
    try {
        const notifs = await db.all('SELECT * FROM notifications ORDER BY id DESC LIMIT 10');
        const logs = notifs.map(n => ({
            id: n.id,
            action: n.text,
            timestamp: n.date,
            status: n.type === 'error' ? 'error' : 'success'
        }));
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
