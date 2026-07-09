-- Centralized SQLite Database Schema for Aura Platform

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL CHECK(role IN ('admin', 'doctor', 'parent')),
    status TEXT DEFAULT 'نشط',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS children (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parentId INTEGER NOT NULL,
    fullName TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    diagnosis TEXT,
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    specialization TEXT,
    experience TEXT,
    availableDays TEXT,
    bio TEXT,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS patient_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER NOT NULL,
    childId INTEGER NOT NULL,
    parentId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctorId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    childId INTEGER NOT NULL,
    parentId INTEGER NOT NULL,
    doctorId INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'Pending' CHECK(status IN ('Pending', 'Approved', 'Completed', 'Cancelled', 'Rejected')),
    notes TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS analyses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    childId INTEGER NOT NULL,
    parentId INTEGER NOT NULL,
    doctorId INTEGER ,
    title TEXT,
    uploadedFileName TEXT,
    uploadedImage TEXT,
    aiResult TEXT,
    aiConfidence TEXT,
    aiSummary TEXT,
    doctorReview TEXT,
    doctorRecommendations TEXT,
    status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'reviewed', 'sent')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    childId INTEGER NOT NULL,
    parentId INTEGER NOT NULL,
    doctorId INTEGER NOT NULL,
    analysisId INTEGER,
    title TEXT NOT NULL,
    progress TEXT,
    recommendations TEXT,
    doctorNotes TEXT,
    status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'sent')),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (analysisId) REFERENCES analyses(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant1Id INTEGER NOT NULL,
    participant2Id INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (participant1Id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (participant2Id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversationId INTEGER,
    senderId INTEGER NOT NULL,
    receiverId INTEGER NOT NULL,
    message TEXT NOT NULL,
    attachmentData TEXT,
    attachmentType TEXT,
    attachmentName TEXT,
    isRead INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversationId) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    childId INTEGER NOT NULL,
    doctorId INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (childId) REFERENCES children(id) ON DELETE CASCADE,
    FOREIGN KEY (doctorId) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    text TEXT NOT NULL,
    isRead INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actorId INTEGER,
    actorRole TEXT,
    targetUserId INTEGER,
    entityType TEXT,
    entityId INTEGER,
    action TEXT NOT NULL,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actorId) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (targetUserId) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS educational_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT, category TEXT, language TEXT, author TEXT,
    contentType TEXT, description TEXT, link TEXT, status TEXT DEFAULT 'مسودة',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS community_groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nameEn TEXT NOT NULL,
    nameAr TEXT NOT NULL,
    descEn TEXT,
    descAr TEXT,
    members INTEGER DEFAULT 0,
    pinned INTEGER DEFAULT 0,
    unread INTEGER DEFAULT 0,
    moderators TEXT DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS community_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupId INTEGER NOT NULL,
    author TEXT NOT NULL,
    text TEXT NOT NULL,
    anonymous INTEGER DEFAULT 0,
    attachmentName TEXT,
    attachmentType TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (groupId) REFERENCES community_groups(id) ON DELETE CASCADE
);
