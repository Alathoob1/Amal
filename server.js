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
        
        let isMatch = false;
        if (user.password === password) {
            isMatch = true; 
        } else {
            try { isMatch = await bcrypt.compare(password, user.password); } catch(e){}
        }
        
        if (isMatch) {
            res.json({ success: true, role: user.role, userId: user.id, name: user.fullName });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
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
            return res.status(400).json({ success: false, message: 'Email already exists.' });
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
        
        res.json({ success: true, message: 'Account created successfully', userId: parentId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ----------------------------------------------------
// USERS API
// ----------------------------------------------------
app.get('/api/users', async (req, res) => {
    const users = await db.all('SELECT id, role, fullName, email, phone, createdAt FROM users');
    res.json(users);
});

// ----------------------------------------------------
// CHILDREN API
// ----------------------------------------------------
app.get('/api/children', async (req, res) => {
    const children = await db.all('SELECT * FROM children');
    res.json(children);
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
        res.json({ success: true, appointmentId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/appointments/:id', async (req, res) => {
    try {
        const { status, notes } = req.body;
        await db.run('UPDATE appointments SET status = ?, notes = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?', [status, notes, req.params.id]);
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
        const { childId, doctorId, title, progress, recommendations } = req.body;
        const result = await db.run(
            'INSERT INTO reports (childId, doctorId, title, progress, recommendations) VALUES (?, ?, ?, ?, ?)',
            [childId, doctorId, title, progress, recommendations]
        );
        res.json({ success: true, reportId: result.lastID });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ----------------------------------------------------
// MESSAGES API
// ----------------------------------------------------
app.get('/api/messages', async (req, res) => {
    const messages = await db.all('SELECT * FROM messages ORDER BY createdAt ASC');
    res.json(messages);
});

app.post('/api/messages', async (req, res) => {
    try {
        const { senderId, receiverId, message } = req.body;
        const result = await db.run(
            'INSERT INTO messages (senderId, receiverId, message) VALUES (?, ?, ?)',
            [senderId, receiverId, message]
        );
        res.json({ success: true, messageId: result.lastID });
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

app.get('/api/parents/:id/data', async (req, res) => {
    try {
        const parentId = req.params.id;
        const profile = await db.get('SELECT id, fullName, email, phone FROM users WHERE id = ? AND role = "parent"', [parentId]);
        if (!profile) return res.status(404).json({ error: 'Parent not found' });
        
        const children = await db.all('SELECT * FROM children WHERE parentId = ?', [parentId]);
        const activities = await db.all('SELECT a.* FROM activities a JOIN children c ON a.childId = c.id WHERE c.parentId = ? ORDER BY a.createdAt DESC', [parentId]);
        const appointments = await db.all('SELECT a.*, u.fullName as doctorName FROM appointments a JOIN users u ON a.doctorId = u.id WHERE a.parentId = ? ORDER BY a.date DESC', [parentId]);
        const notifications = await db.all('SELECT * FROM notifications WHERE userId = ? ORDER BY id DESC', [parentId]);
        const messages = await db.all('SELECT * FROM messages WHERE senderId = ? OR receiverId = ? ORDER BY createdAt ASC', [parentId, parentId]);
        const reports = await db.all('SELECT r.* FROM reports r JOIN children c ON r.childId = c.id WHERE c.parentId = ? ORDER BY r.createdAt DESC', [parentId]);

        res.json({
            profile,
            children,
            activities,
            appointments,
            notifications,
            messages,
            reports
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

        // Get unique children linked to this doctor via appointments or activities or reports
        const patients = await db.all(`
            SELECT DISTINCT c.*, u.fullName as parentName 
            FROM children c 
            JOIN users u ON c.parentId = u.id
            WHERE c.id IN (
                SELECT childId FROM appointments WHERE doctorId = ?
                UNION
                SELECT childId FROM reports WHERE doctorId = ?
                UNION
                SELECT childId FROM activities WHERE doctorId = ?
            )
        `, [doctorId, doctorId, doctorId]);

        const activities = await db.all('SELECT a.*, c.fullName as childName FROM activities a JOIN children c ON a.childId = c.id WHERE a.doctorId = ? ORDER BY a.createdAt DESC', [doctorId]);
        const appointments = await db.all('SELECT a.*, c.fullName as childName, u.fullName as parentName FROM appointments a JOIN children c ON a.childId = c.id JOIN users u ON a.parentId = u.id WHERE a.doctorId = ? ORDER BY a.date DESC', [doctorId]);
        const reports = await db.all('SELECT r.*, c.fullName as childName FROM reports r JOIN children c ON r.childId = c.id WHERE r.doctorId = ? ORDER BY r.id DESC', [doctorId]);
        const messages = await db.all('SELECT * FROM messages WHERE senderId = ? OR receiverId = ? ORDER BY createdAt ASC', [doctorId, doctorId]);

        res.json({
            profile: { ...profile, ...doctorDetails },
            patients,
            activities,
            appointments,
            reports,
            messages
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
        const pendingActivities = await db.get('SELECT COUNT(*) as count FROM activities WHERE status = "Pending"');
        const totalReports = await db.get('SELECT COUNT(*) as count FROM reports');
        const totalAppointments = await db.get('SELECT COUNT(*) as count FROM appointments');
        
        const logs = await db.all('SELECT * FROM notifications ORDER BY id DESC LIMIT 20');
        const users = await db.all('SELECT id, role, fullName, email, phone, createdAt FROM users ORDER BY id DESC LIMIT 10');

        res.json({
            stats: {
                parents: parents.count,
                doctors: doctors.count,
                children: children.count,
                pendingActivities: pendingActivities.count,
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

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
