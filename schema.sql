-- ==========================================
-- SQLite Schema for Aura
-- ==========================================

CREATE TABLE IF NOT EXISTS roles_permissions (
    role_id INTEGER PRIMARY KEY AUTOINCREMENT,
    role_name TEXT UNIQUE NOT NULL,
    can_view_users BOOLEAN DEFAULT 0,
    can_manage_users BOOLEAN DEFAULT 0,
    can_view_analyses BOOLEAN DEFAULT 0,
    can_assign_analyses BOOLEAN DEFAULT 0,
    can_approve_reports BOOLEAN DEFAULT 0,
    can_manage_content BOOLEAN DEFAULT 0,
    can_manage_community BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('super_admin', 'admin', 'doctor', 'user')),
    status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'suspended', 'pending')),
    language TEXT DEFAULT 'ar',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
    doctor_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    specialty TEXT NOT NULL,
    license TEXT UNIQUE NOT NULL,
    license_status TEXT DEFAULT 'valid',
    experience_years INTEGER NOT NULL DEFAULT 0,
    is_available BOOLEAN DEFAULT 1,
    rating REAL DEFAULT 5.0,
    cases_count INTEGER DEFAULT 0,
    reviewed_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS children (
    child_id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT,
    autism_level TEXT,
    communication_style TEXT,
    emotional_triggers TEXT,
    behavioral_history TEXT,
    medical_notes TEXT,
    treatment_start_date DATE,
    assigned_doctor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ai_analyses (
    analysis_id INTEGER PRIMARY KEY AUTOINCREMENT,
    child_id INTEGER NOT NULL REFERENCES children(child_id) ON DELETE CASCADE,
    assigned_doctor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    image_url TEXT NOT NULL,
    ai_summary TEXT,
    confidence_score REAL,
    behavioral_indicators TEXT, -- stored as JSON string
    emotional_indicators TEXT, -- stored as JSON string
    status TEXT DEFAULT 'new' CHECK(status IN ('new', 'assigned_to_doctor', 'under_review', 'needs_modification', 'approved', 'rejected')),
    doctor_decision TEXT,
    doctor_notes TEXT,
    rejection_reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    analysis_id INTEGER NOT NULL UNIQUE REFERENCES ai_analyses(analysis_id) ON DELETE CASCADE,
    child_id INTEGER NOT NULL REFERENCES children(child_id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    report_summary TEXT NOT NULL,
    recommendations TEXT,
    medical_disclaimer TEXT DEFAULT 'تنبيه طبي: هذا التقرير هو أداة مساعدة ولا يغني عن التشخيص الطبي المباشر.',
    status TEXT DEFAULT 'draft',
    is_shared_with_parent BOOLEAN DEFAULT 0,
    shared_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    child_id INTEGER NOT NULL REFERENCES children(child_id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_type TEXT,
    appointment_date DATE NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    status TEXT DEFAULT 'scheduled',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS community_groups (
    group_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    members_count INTEGER DEFAULT 0,
    posts_count INTEGER DEFAULT 0,
    reports_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active',
    allow_anonymous BOOLEAN DEFAULT 1,
    disable_comments BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS community_posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_id INTEGER REFERENCES community_groups(group_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    is_anonymous BOOLEAN DEFAULT 0,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    is_pinned BOOLEAN DEFAULT 0,
    reports_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS educational_content (
    content_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title_ar TEXT NOT NULL,
    title_en TEXT,
    content TEXT NOT NULL,
    category TEXT,
    content_type TEXT,
    reviewed_by_doctor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    publish_status TEXT DEFAULT 'draft',
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    role TEXT,
    status TEXT,
    detail TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
