-- SQLite Database Schema for Aura Platform

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL CHECK(role IN ('admin', 'doctor', 'parent')),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS children (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER NOT NULL,
    doctor_id INTEGER,
    name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    autism_level TEXT,
    communication_style TEXT,
    behavioral_history TEXT,
    emotional_triggers TEXT,
    medical_notes TEXT,
    therapy_history TEXT,
    medications TEXT,
    allergies TEXT,
    emergency_contact TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS drawings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    child_id INTEGER NOT NULL,
    name TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'analyzing' CHECK(status IN ('analyzing', 'review', 'approved', 'rejected')),
    upload_date TEXT,
    ai_summary TEXT,
    emotional TEXT,
    behavioral TEXT,
    confidence TEXT,
    doctor_comments TEXT,
    recommendations TEXT,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    child_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    drawing_id INTEGER,
    content TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
    date TEXT,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (drawing_id) REFERENCES drawings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER NOT NULL,
    doctor_id INTEGER NOT NULL,
    child_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    type TEXT,
    status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'completed', 'cancelled')),
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor_id INTEGER NOT NULL,
    parent_id INTEGER NOT NULL,
    child_id INTEGER,
    last_message TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER NOT NULL,
    sender_id INTEGER NOT NULL,
    sender_role TEXT NOT NULL CHECK(sender_role IN ('doctor', 'parent', 'admin')),
    text TEXT NOT NULL,
    time TEXT,
    date TEXT,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS community_groups (
    id TEXT PRIMARY KEY,
    name_en TEXT,
    name_ar TEXT,
    desc_en TEXT,
    desc_ar TEXT,
    members INTEGER DEFAULT 0,
    unread INTEGER DEFAULT 0,
    pinned_en TEXT,
    pinned_ar TEXT
);

CREATE TABLE IF NOT EXISTS community_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id TEXT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'resolved', 'ignored')),
    date TEXT,
    FOREIGN KEY (group_id) REFERENCES community_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT,
    text TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    date TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS educational_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ar TEXT,
    title_en TEXT,
    desc_ar TEXT,
    desc_en TEXT,
    type TEXT,
    url TEXT,
    views INTEGER DEFAULT 0
);
