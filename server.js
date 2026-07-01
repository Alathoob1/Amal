// ================================================================
//  server.js — Aura Backend (Express + SQLite Database)
// ================================================================
const express = require('express');
const path    = require('path');
const db      = require('./db');

const app  = express();
const PORT = 3000;

// ── Middleware ──
app.use(express.json());
app.use(express.static(__dirname));

// ── Initialize Database ──
db.initDB().then(() => {
    console.log('🗄️  Database initialized and ready.');
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
}).catch(err => {
    console.error('❌ Database initialization failed:', err);
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
        await db.addLog({ action: `تسجيل دخول: ${user.email}`, role: user.role, status: 'success' });
        res.json({ success: true, role: user.role, name: user.name, email: user.email });
    } catch (err) {
        await db.addLog({ action: `محاولة دخول فاشلة: ${email}`, role: 'Unknown', status: 'warning' });
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
        await db.addLog({ action: `تسجيل حساب جديد: ${email}`, role: 'user', status: 'success' });
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
app.get('/api/users', async (req, res) => {
    try {
        const users = await db.getAllUsers();
        res.json(users);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/stats
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await db.getStats();
        res.json(stats);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/logs
app.get('/api/logs', async (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    try {
        const logs = await db.getLogs(limit);
        res.json(logs);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
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
        await db.addLog({ action: `إضافة طبيب جديد: ${email}`, role: 'admin', status: 'success', detail: name });
        res.json({ success: true, message: 'تم إضافة الطبيب بنجاح!', doctor: { id: doctor.id, name: doctor.name, email: doctor.email, role: doctor.role } });
    } catch (err) {
        const msg = err.message === 'EMAIL_EXISTS'
            ? 'هذا البريد الإلكتروني مسجل مسبقاً'
            : 'حدث خطأ أثناء إضافة الطبيب';
        res.status(400).json({ success: false, message: msg });
    }
});

// DELETE /api/users/:id
app.delete('/api/users/:id', async (req, res) => {
    try {
        const removed = await db.deleteUser(req.params.id);
        await db.addLog({ action: `تم حذف مستخدم: ${removed.email}`, role: 'admin', status: 'warning', detail: removed.role });
        res.json({ success: true, message: 'تم حذف المستخدم بنجاح' });
    } catch (err) {
        res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }
});

// GET /api/users/:id
app.get('/api/users/:id', async (req, res) => {
    try {
        const details = await db.getUserDetails(req.params.id);
        if (!details) return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
        res.json({ success: true, user: details });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// PUT /api/users/:id/status
app.put('/api/users/:id/status', async (req, res) => {
    const { status } = req.body;
    if (!['active', 'suspended', 'pending'].includes(status)) {
        return res.status(400).json({ success: false, message: 'حالة غير صالحة' });
    }
    
    try {
        const user = await db.updateUserStatus(req.params.id, status);
        await db.addLog({ action: `تغيير حالة مستخدم: ${user.email} -> ${status}`, role: 'admin', status: 'success' });
        res.json({ success: true, message: 'تم تحديث الحالة بنجاح', status: user.status });
    } catch (err) {
        res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }
});

// GET /api/children
app.get('/api/children', async (req, res) => {
    try {
        res.json({ success: true, children: await db.getAllChildren() });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// GET /api/children/:id
app.get('/api/children/:id', async (req, res) => {
    try {
        const details = await db.getChildDetails(req.params.id);
        if (!details) return res.status(404).json({ success: false, message: 'ملف الطفل غير موجود' });
        res.json({ success: true, child: details });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// GET /api/doctors
app.get('/api/doctors', async (req, res) => {
    try {
        res.json({ success: true, doctors: await db.getAllDoctors() });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// GET /api/doctors/:id
app.get('/api/doctors/:id', async (req, res) => {
    try {
        const details = await db.getDoctorDetails(req.params.id);
        if (!details) return res.status(404).json({ success: false, message: 'الطبيب غير موجود' });
        res.json({ success: true, doctor: details });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// GET /api/analyses
app.get('/api/analyses', async (req, res) => {
    try {
        res.json({ success: true, analyses: await db.getAllAnalyses() });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// GET /api/analyses/:id
app.get('/api/analyses/:id', async (req, res) => {
    try {
        const details = await db.getAnalysisDetails(req.params.id);
        if (!details) return res.status(404).json({ success: false, message: 'التحليل غير موجود' });
        res.json({ success: true, analysis: details });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// PUT /api/analyses/:id/decision
app.put('/api/analyses/:id/decision', express.json(), async (req, res) => {
    try {
        const { decision, notes, doctorName, reason } = req.body;
        const updated = await db.updateAnalysisDecision(req.params.id, doctorName || 'System Admin', decision, notes, reason);
        if (updated) {
            await db.addLog({ action: `تحديث حالة تحليل ${req.params.id} إلى ${decision}`, role: 'admin', status: 'success' });
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'التحليل غير موجود' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// GET /api/content
app.get('/api/content', async (req, res) => {
    try {
        res.json({ success: true, content: await db.getAllContent() });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// PUT /api/content/:id/status
app.put('/api/content/:id/status', express.json(), async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await db.updateContentStatus(req.params.id, status);
        if (updated) {
            await db.addLog({ action: `تحديث حالة المحتوى ${req.params.id} إلى ${status}`, role: 'admin', status: 'success' });
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'المحتوى غير موجود' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// DELETE /api/content/:id
app.delete('/api/content/:id', async (req, res) => {
    try {
        const deleted = await db.deleteContent(req.params.id);
        if (deleted) {
            await db.addLog({ action: `حذف المحتوى ${req.params.id}`, role: 'admin', status: 'warning' });
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'المحتوى غير موجود' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// GET /api/communities
app.get('/api/communities', async (req, res) => {
    try {
        res.json({ success: true, communities: await db.getAllCommunities() });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// GET /api/communities/:id
app.get('/api/communities/:id', async (req, res) => {
    try {
        const details = await db.getCommunityDetails(req.params.id);
        if (!details) return res.status(404).json({ success: false, message: 'المجتمع غير موجود' });
        res.json({ success: true, community: details });
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// PUT /api/communities/:id/settings
app.put('/api/communities/:id/settings', express.json(), async (req, res) => {
    try {
        const { allowAnonymous, disableComments } = req.body;
        const updated = await db.updateCommunitySettings(req.params.id, allowAnonymous, disableComments);
        if (updated) {
            await db.addLog({ action: `تحديث إعدادات مجتمع ${req.params.id}`, role: 'admin', status: 'success' });
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'المجتمع غير موجود' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// PUT /api/communities/:id/posts/:postId/status
app.put('/api/communities/:id/posts/:postId/status', express.json(), async (req, res) => {
    try {
        const { action } = req.body;
        const updated = await db.updatePostStatus(req.params.id, req.params.postId, action);
        if (updated) {
            await db.addLog({ action: `تحديث حالة منشور ${req.params.postId} - ${action}`, role: 'admin', status: 'success' });
            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, message: 'المنشور غير موجود' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'حدث خطأ في الخادم' });
    }
});

// ── Fallback → index.html ──
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
