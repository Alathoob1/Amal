// ================================================================
//  server.js — Aura Backend (Express + JSON Database)
// ================================================================
const express = require('express');
const path    = require('path');
const db      = require('./db');

const app  = express();
const PORT = 3000;

// ── Middleware ──
app.use(express.json());
app.use(express.static(__dirname));

// ── Seed default admin + doctor on startup ──
db.seedDefaults().then(() => {
    console.log('🗄️  Database ready.');
});

// ================================================================
//  AUTH ROUTES
// ================================================================

// POST /api/login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'البريد وكلمة المرور مطلوبان' });
    }

    try {
        const user = await db.validateLogin(email.trim(), password);
        db.addLog({ action: `Login: ${user.email}`, role: user.role, status: 'success' });
        res.json({ success: true, role: user.role, name: user.name, email: user.email });
    } catch (err) {
        db.addLog({ action: `Failed login attempt: ${email}`, role: 'Unknown', status: 'warning' });
        const msg =
            err.message === 'USER_NOT_FOUND'  ? 'البريد الإلكتروني غير مسجل' :
            err.message === 'WRONG_PASSWORD'  ? 'كلمة المرور غير صحيحة' :
            'حدث خطأ، حاول مرة أخرى';
        res.status(401).json({ success: false, message: msg });
    }
});

// POST /api/register  (public users only)
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
    }

    // Block admin/doctor registration from the public form
    const domain = email.split('@')[1]?.toLowerCase() || '';
    if (domain === 'admin' || domain === 'doctor' || domain === 'doc' || domain === 'dr') {
        return res.status(403).json({ success: false, message: 'لا يمكن إنشاء حسابات الأطباء أو المسؤولين من هنا' });
    }

    try {
        const user = await db.createUser({ name, email: email.trim(), password });
        db.addLog({ action: `New account registered: ${email}`, role: 'user', status: 'success' });
        res.json({ success: true, message: 'تم إنشاء الحساب بنجاح!', role: user.role, name: user.name });
    } catch (err) {
        const msg = err.message === 'EMAIL_EXISTS'
            ? 'هذا البريد الإلكتروني مسجل مسبقاً'
            : 'حدث خطأ أثناء إنشاء الحساب';
        res.status(400).json({ success: false, message: msg });
    }
});

// ================================================================
//  ADMIN ROUTES
// ================================================================

// GET /api/users
app.get('/api/users', (req, res) => {
    res.json(db.getAllUsers());
});

// GET /api/stats
app.get('/api/stats', (req, res) => {
    res.json(db.getStats());
});

// GET /api/logs
app.get('/api/logs', (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    res.json(db.getLogs(limit));
});

// POST /api/admin/add-doctor
app.post('/api/admin/add-doctor', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'جميع الحقول مطلوبة' });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
    }

    try {
        const doctor = await db.createDoctor({ name, email: email.trim(), password });
        db.addLog({ action: `New doctor added: ${email}`, role: 'admin', status: 'success', detail: name });
        res.json({ success: true, message: 'تم إضافة الطبيب بنجاح!', doctor: { id: doctor.id, name: doctor.name, email: doctor.email, role: doctor.role } });
    } catch (err) {
        const msg = err.message === 'EMAIL_EXISTS'
            ? 'هذا البريد الإلكتروني مسجل مسبقاً'
            : 'حدث خطأ أثناء إضافة الطبيب';
        res.status(400).json({ success: false, message: msg });
    }
});

// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
    try {
        const removed = db.deleteUser(req.params.id);
        db.addLog({ action: `User deleted: ${removed.email}`, role: 'admin', status: 'warning', detail: removed.role });
        res.json({ success: true, message: 'تم حذف المستخدم بنجاح' });
    } catch (err) {
        res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }
});

// ── Fallback → index.html ──
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`\n🚀 Aura Server running at: http://localhost:${PORT}`);
    console.log(`🔐 Login  API : POST   http://localhost:${PORT}/api/login`);
    console.log(`📝 Register  : POST   http://localhost:${PORT}/api/register`);
    console.log(`👥 Users     : GET    http://localhost:${PORT}/api/users`);
    console.log(`📊 Stats     : GET    http://localhost:${PORT}/api/stats`);
    console.log(`📋 Logs      : GET    http://localhost:${PORT}/api/logs`);
    console.log(`➕ Add Doctor: POST   http://localhost:${PORT}/api/admin/add-doctor`);
    console.log(`🗑  Del User  : DELETE http://localhost:${PORT}/api/users/:id\n`);
});
