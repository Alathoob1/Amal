const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.sqlite');

let dbPromise;

async function initDB() {
    dbPromise = open({
        filename: dbPath,
        driver: sqlite3.Database
    });
    
    const db = await dbPromise;
    
    // Check if tables exist
    const row = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    if (!row) {
        console.log("Initializing database schema...");
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
        await db.exec(schema);
        
        console.log("Seeding initial data...");
        const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
        await db.exec(seed);
    }
}

// ── Add an audit log entry ──
async function addLog({ action, role, status, detail = '' }) {
    const db = await dbPromise;
    await db.run(
        `INSERT INTO audit_logs (action, role, status, detail) VALUES (?, ?, ?, ?)`,
        [action, role, status, detail]
    );
}

// ── Get all logs ──
async function getLogs(limit = 50) {
    const db = await dbPromise;
    return await db.all(`SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?`, [limit]);
}

// ── Find user by email ──
async function findUserByEmail(email) {
    const db = await dbPromise;
    return await db.get(`SELECT * FROM users WHERE email = ? COLLATE NOCASE`, [email]);
}

// ── Validate login credentials ──
async function validateLogin(email, password) {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('USER_NOT_FOUND');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('WRONG_PASSWORD');

    return { id: user.id, name: user.name, email: user.email, role: user.role };
}

// ── Create a new user ──
async function createUser({ name, email, password }) {
    const db = await dbPromise;
    const existing = await findUserByEmail(email);
    if (existing) throw new Error('EMAIL_EXISTS');

    const hash = await bcrypt.hash(password, 10);
    const result = await db.run(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')`,
        [name, email, hash]
    );
    return { id: result.lastID, name, email, role: 'user' };
}

// ── Create a doctor ──
async function createDoctor({ name, email, password }) {
    const db = await dbPromise;
    const existing = await findUserByEmail(email);
    if (existing) throw new Error('EMAIL_EXISTS');

    const hash = await bcrypt.hash(password, 10);
    const result = await db.run(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'doctor')`,
        [name, email, hash]
    );
    
    await db.run(
        `INSERT INTO doctors (user_id, specialty, license) VALUES (?, ?, ?)`,
        [result.lastID, 'عام', 'NEW-' + Date.now()]
    );
    
    return { id: result.lastID, name, email, role: 'doctor' };
}

// ── Get all users ──
async function getAllUsers() {
    const db = await dbPromise;
    return await db.all(`
        SELECT u.id, u.name, u.email, u.role, u.status, u.created_at as createdAt,
        (SELECT COUNT(*) FROM children c WHERE c.parent_id = u.id) as childrenCount
        FROM users u
    `);
}

// ── Get user details ──
async function getUserDetails(id) {
    const db = await dbPromise;
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
    if(!user) return null;
    
    let children = [];
    let analyses = [];
    let appointments = [];
    let alerts = [];
    
    if (user.role === 'user') {
        children = await db.all(`SELECT * FROM children WHERE parent_id = ?`, [id]);
        analyses = await db.all(`
            SELECT a.*, c.name as childName 
            FROM ai_analyses a 
            JOIN children c ON a.child_id = c.child_id 
            WHERE c.parent_id = ?`, [id]);
        appointments = await db.all(`
            SELECT ap.*, d.name as doctorName 
            FROM appointments ap 
            JOIN users d ON ap.doctor_id = d.id 
            JOIN children c ON ap.child_id = c.child_id 
            WHERE c.parent_id = ?`, [id]);
    }
    
    return {
        id: user.id, name: user.name, email: user.email, role: user.role,
        status: user.status, phone: user.phone, createdAt: user.created_at,
        children, analyses, appointments, alerts
    };
}

// ── Update user status ──
async function updateUserStatus(id, newStatus) {
    const db = await dbPromise;
    await db.run(`UPDATE users SET status = ? WHERE id = ?`, [newStatus, id]);
    return await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
}

// ── Delete user ──
async function deleteUser(id) {
    const db = await dbPromise;
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
    if (!user) throw new Error('USER_NOT_FOUND');
    await db.run(`DELETE FROM users WHERE id = ?`, [id]);
    return user;
}

// ── Get all children ──
async function getAllChildren() {
    const db = await dbPromise;
    return await db.all(`
        SELECT c.*, u.name as parentName, u.id as parentId 
        FROM children c
        JOIN users u ON c.parent_id = u.id
    `);
}

// ── Get child details ──
async function getChildDetails(id) {
    const db = await dbPromise;
    return await db.get(`
        SELECT c.*, u.name as parentName 
        FROM children c
        JOIN users u ON c.parent_id = u.id
        WHERE c.child_id = ?
    `, [id]);
}

// ── Get all doctors ──
async function getAllDoctors() {
    const db = await dbPromise;
    return await db.all(`
        SELECT u.id, u.name, u.email, u.role, u.status, u.created_at as createdAt,
        d.specialty, d.license, d.license_status as licenseStatus, d.experience_years as experienceYears,
        d.is_available as availability, d.rating, d.cases_count as casesCount, d.reviewed_count as reviewedCount
        FROM users u
        JOIN doctors d ON u.id = d.user_id
    `);
}

// ── Get doctor details ──
async function getDoctorDetails(id) {
    const db = await dbPromise;
    const doc = await db.get(`
        SELECT u.id, u.name, u.email, u.role, u.status, u.created_at as createdAt,
        d.specialty, d.license, d.license_status as licenseStatus, d.experience_years as experienceYears,
        d.is_available as availability, d.rating, d.cases_count as casesCount, d.reviewed_count as reviewedCount
        FROM users u
        JOIN doctors d ON u.id = d.user_id
        WHERE u.id = ?
    `, [id]);
    
    if(!doc) return null;
    
    doc.assignedChildren = await db.all(`SELECT * FROM children WHERE assigned_doctor_id = ?`, [id]);
    doc.pendingReports = await db.all(`
        SELECT a.*, c.name as childName 
        FROM ai_analyses a 
        JOIN children c ON a.child_id = c.child_id 
        WHERE a.assigned_doctor_id = ? AND a.status IN ('new', 'under_review')
    `, [id]);
    doc.historyReports = await db.all(`
        SELECT a.*, c.name as childName 
        FROM ai_analyses a 
        JOIN children c ON a.child_id = c.child_id 
        WHERE a.assigned_doctor_id = ? AND a.status IN ('approved', 'rejected')
    `, [id]);
    
    return doc;
}

// ── Get all analyses ──
async function getAllAnalyses() {
    const db = await dbPromise;
    return await db.all(`
        SELECT a.*, c.name as childName, u.name as parentName, d.name as doctorName
        FROM ai_analyses a
        JOIN children c ON a.child_id = c.child_id
        JOIN users u ON c.parent_id = u.id
        LEFT JOIN users d ON a.assigned_doctor_id = d.id
    `);
}

// ── Get single analysis ──
async function getAnalysisDetails(id) {
    const db = await dbPromise;
    return await db.get(`
        SELECT a.*, c.name as childName, c.age as childAge, u.name as parentName, d.name as doctorName
        FROM ai_analyses a
        JOIN children c ON a.child_id = c.child_id
        JOIN users u ON c.parent_id = u.id
        LEFT JOIN users d ON a.assigned_doctor_id = d.id
        WHERE a.analysis_id = ?
    `, [id]);
}

// ── Update Analysis Decision ──
async function updateAnalysisDecision(id, doctorName, decision, notes, reason = '') {
    const db = await dbPromise;
    const status = decision === 'اعتماد' ? 'approved' : (decision === 'رفض' ? 'rejected' : 'needs_modification');
    const result = await db.run(`
        UPDATE ai_analyses 
        SET status = ?, doctor_decision = ?, doctor_notes = ?, rejection_reason = ?, updated_at = CURRENT_TIMESTAMP, doctor_decision = ?, assigned_doctor_id = (SELECT id FROM users WHERE name = ? LIMIT 1)
        WHERE analysis_id = ?
    `, [status, decision, notes, reason, decision, doctorName, id]);
    return result.changes > 0;
}

// ── Content Management ──
async function getAllContent() {
    const db = await dbPromise;
    return await db.all(`SELECT content_id as id, title_ar as title, category, publish_status as status, created_at as date FROM educational_content`);
}

async function updateContentStatus(id, status) {
    const db = await dbPromise;
    const result = await db.run(`UPDATE educational_content SET publish_status = ? WHERE content_id = ?`, [status, id]);
    return result.changes > 0;
}

async function deleteContent(id) {
    const db = await dbPromise;
    const result = await db.run(`DELETE FROM educational_content WHERE content_id = ?`, [id]);
    return result.changes > 0;
}

// ── Communities ──
async function getAllCommunities() {
    const db = await dbPromise;
    return await db.all(`SELECT group_id as id, name, members_count as membersCount, posts_count as postsCount, status, allow_anonymous as allowAnonymous, disable_comments as disableComments FROM community_groups`);
}

async function getCommunityDetails(id) {
    const db = await dbPromise;
    const comm = await db.get(`SELECT group_id as id, name, members_count as membersCount, posts_count as postsCount, status, allow_anonymous as allowAnonymous, disable_comments as disableComments FROM community_groups WHERE group_id = ?`, [id]);
    if(!comm) return null;
    comm.posts = await db.all(`
        SELECT p.post_id as id, p.content, p.status, p.is_pinned as isPinned, u.name as author, p.created_at as date
        FROM community_posts p
        LEFT JOIN users u ON p.user_id = u.id
        WHERE p.group_id = ?
    `, [id]);
    return comm;
}

async function updateCommunitySettings(id, allowAnonymous, disableComments) {
    const db = await dbPromise;
    const result = await db.run(`UPDATE community_groups SET allow_anonymous = ?, disable_comments = ? WHERE group_id = ?`, [allowAnonymous ? 1 : 0, disableComments ? 1 : 0, id]);
    return result.changes > 0;
}

async function updatePostStatus(communityId, postId, action) {
    const db = await dbPromise;
    if (action === 'delete') {
        const result = await db.run(`DELETE FROM community_posts WHERE post_id = ?`, [postId]);
        await db.run(`UPDATE community_groups SET posts_count = posts_count - 1 WHERE group_id = ?`, [communityId]);
        return result.changes > 0;
    } else if (action === 'approve') {
        const result = await db.run(`UPDATE community_posts SET status = 'approved' WHERE post_id = ?`, [postId]);
        return result.changes > 0;
    } else if (action === 'pin') {
        const result = await db.run(`UPDATE community_posts SET is_pinned = NOT is_pinned WHERE post_id = ?`, [postId]);
        return result.changes > 0;
    }
    return false;
}

// ── Stats ──
async function getStats() {
    const db = await dbPromise;
    const total = await db.get(`SELECT COUNT(*) as c FROM users`);
    const admins = await db.get(`SELECT COUNT(*) as c FROM users WHERE role = 'admin'`);
    const doctors = await db.get(`SELECT COUNT(*) as c FROM users WHERE role = 'doctor'`);
    const parents = await db.get(`SELECT COUNT(*) as c FROM users WHERE role = 'user'`);
    return {
        total: total.c,
        admins: admins.c,
        doctors: doctors.c,
        parents: parents.c
    };
}

module.exports = {
    initDB,
    findUserByEmail,
    createUser,
    createDoctor,
    deleteUser,
    updateUserStatus,
    validateLogin,
    getAllUsers,
    getUserDetails,
    getAllChildren,
    getChildDetails,
    getAllDoctors,
    getDoctorDetails,
    getAllAnalyses,
    getAnalysisDetails,
    updateAnalysisDecision,
    getAllContent,
    updateContentStatus,
    deleteContent,
    getAllCommunities,
    getCommunityDetails,
    updateCommunitySettings,
    updatePostStatus,
    getStats,
    addLog,
    getLogs
};
