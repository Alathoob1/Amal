// ================================================================
//  db.js — Simple JSON-based database
//  Stores users + logs in db.json (no external DB server needed)
// ================================================================
const fs   = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'db.json');

// ── Read entire database ──
function readDB() {
    if (!fs.existsSync(DB_PATH)) return { users: [], logs: [] };
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        if (!data.logs) data.logs = [];
        return data;
    } catch {
        return { users: [], logs: [] };
    }
}

// ── Write entire database ──
function writeDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Add an audit log entry ──
function addLog({ action, role, status, detail = '' }) {
    const db = readDB();
    const entry = {
        id:        Date.now(),
        action,
        role,
        status,       // 'success' | 'warning' | 'error'
        detail,
        timestamp:  new Date().toISOString()
    };
    db.logs.unshift(entry);           // newest first
    if (db.logs.length > 200) db.logs = db.logs.slice(0, 200);
    writeDB(db);
    return entry;
}

// ── Get all logs ──
function getLogs(limit = 50) {
    const db = readDB();
    return db.logs.slice(0, limit);
}

// ── Seed default admin + doctor accounts if they don't exist ──
async function seedDefaults() {
    const db = readDB();

    const defaults = [
        { name: 'System Admin', email: 'admin@ADMIN',   password: 'Admin@123',  role: 'admin'  },
        { name: 'Dr. Ahmed',    email: 'doctor@DOCTOR', password: 'Doctor@123', role: 'doctor' },
    ];

    let changed = false;
    for (const def of defaults) {
        const exists = db.users.find(u => u.email.toLowerCase() === def.email.toLowerCase());
        if (!exists) {
            const hash = await bcrypt.hash(def.password, 10);
            db.users.push({
                id:        Date.now() + Math.random(),
                name:      def.name,
                email:     def.email,
                password:  hash,
                role:      def.role,
                createdAt: new Date().toISOString()
            });
            changed = true;
            console.log(`✅ Seeded default ${def.role}: ${def.email}`);
        }
    }

    if (changed) writeDB(db);
}

// ── Find user by email (case-insensitive) ──
function findUserByEmail(email) {
    const db = readDB();
    return db.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

// ── Create a new user (role = 'user' only from public registration) ──
async function createUser({ name, email, password }) {
    const db = readDB();

    if (findUserByEmail(email)) {
        throw new Error('EMAIL_EXISTS');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = {
        id:        Date.now(),
        name,
        email,
        password:  hash,
        role:      'user',
        createdAt: new Date().toISOString()
    };

    db.users.push(user);
    writeDB(db);
    return user;
}

// ── Create a doctor account (admin only) ──
async function createDoctor({ name, email, password }) {
    const db = readDB();

    if (findUserByEmail(email)) {
        throw new Error('EMAIL_EXISTS');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = {
        id:        Date.now(),
        name,
        email,
        password:  hash,
        role:      'doctor',
        createdAt: new Date().toISOString()
    };

    db.users.push(user);
    writeDB(db);
    return user;
}

// ── Delete a user by ID ──
function deleteUser(id) {
    const db = readDB();
    const idx = db.users.findIndex(u => u.id === Number(id) || String(u.id) === String(id));
    if (idx === -1) throw new Error('USER_NOT_FOUND');
    const [removed] = db.users.splice(idx, 1);
    writeDB(db);
    return removed;
}

// ── Validate login credentials ──
async function validateLogin(email, password) {
    const user = findUserByEmail(email);
    if (!user) throw new Error('USER_NOT_FOUND');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('WRONG_PASSWORD');

    return { id: user.id, name: user.name, email: user.email, role: user.role };
}

// ── Get all users (without passwords) ──
function getAllUsers() {
    const db = readDB();
    return db.users.map(u => ({
        id: u.id, name: u.name, email: u.email,
        role: u.role, createdAt: u.createdAt
    }));
}

// ── Get stats summary ──
function getStats() {
    const db = readDB();
    const users = db.users;
    return {
        total:   users.length,
        admins:  users.filter(u => u.role === 'admin').length,
        doctors: users.filter(u => u.role === 'doctor').length,
        parents: users.filter(u => u.role === 'user').length,
    };
}

module.exports = {
    readDB, writeDB,
    seedDefaults,
    findUserByEmail,
    createUser,
    createDoctor,
    deleteUser,
    validateLogin,
    getAllUsers,
    getStats,
    addLog,
    getLogs
};
