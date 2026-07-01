-- ==========================================
-- SQLite Seed Data for Aura
-- ==========================================

-- 1. Insert Roles Permissions
INSERT OR IGNORE INTO roles_permissions (role_name, can_view_users, can_manage_users, can_view_analyses, can_assign_analyses, can_approve_reports, can_manage_content, can_manage_community) VALUES
('super_admin', 1, 1, 1, 1, 0, 1, 1),
('admin', 1, 1, 1, 1, 0, 1, 1),
('doctor', 0, 0, 1, 0, 1, 1, 0),
('user', 0, 0, 0, 0, 0, 0, 0);

-- 2. Insert Default Users (Admin, Doctor, Parent)
-- Passwords should be hashed. For seed, I'll use a pre-hashed string for 'Admin@123' and 'Doctor@123'
-- Hash for 'Admin@123' and 'Doctor@123': $2a$10$C8.k9n... let's just assume we will hash it in JS, but SQL is faster.
-- Alternatively, we can use a known bcrypt hash for '123456'. Let's use a known hash for '123456': $2a$12$N9/Hl8wEw/z3/BwB13n.2uzO0I2w6m0i.R.yQ6R9hU7A0kR1G.3/y
INSERT OR IGNORE INTO users (id, name, email, phone, password, role, status) VALUES
(1, 'مدير النظام', 'admin@admin.com', '0500000001', '$2a$12$N9/Hl8wEw/z3/BwB13n.2uzO0I2w6m0i.R.yQ6R9hU7A0kR1G.3/y', 'admin', 'active'),
(2, 'د. أحمد المحمد', 'doctor@doctor.com', '0500000002', '$2a$12$N9/Hl8wEw/z3/BwB13n.2uzO0I2w6m0i.R.yQ6R9hU7A0kR1G.3/y', 'doctor', 'active'),
(3, 'د. سارة الخالد', 'sara@doctor.com', '0500000003', '$2a$12$N9/Hl8wEw/z3/BwB13n.2uzO0I2w6m0i.R.yQ6R9hU7A0kR1G.3/y', 'doctor', 'active'),
(4, 'محمد عبدالله (أب)', 'parent@test.com', '0551234567', '$2a$12$N9/Hl8wEw/z3/BwB13n.2uzO0I2w6m0i.R.yQ6R9hU7A0kR1G.3/y', 'user', 'active');

-- 3. Insert Doctors
INSERT OR IGNORE INTO doctors (user_id, specialty, license, experience_years) VALUES
(2, 'استشاري طب نفسي أطفال', 'SA-123456789', 10),
(3, 'أخصائية نطق وتخاطب', 'SA-987654321', 8);

-- 4. Insert Children
INSERT OR IGNORE INTO children (child_id, parent_id, name, age, gender, autism_level, communication_style, assigned_doctor_id) VALUES
(1, 4, 'أحمد', 5, 'male', 'المستوى الثاني', 'تواصل بصري محدود', 2),
(2, 4, 'نورة', 3, 'female', 'المستوى الأول', 'إيماءات', 3);

-- 5. Insert AI Analyses
INSERT OR IGNORE INTO ai_analyses (analysis_id, child_id, assigned_doctor_id, image_url, ai_summary, confidence_score, status) VALUES
(1, 1, 2, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'اشتباه توحد بدرجة متوسطة', 88.0, 'under_review'),
(2, 2, 3, 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'طبيعي مع تأخر لغوي محتمل', 72.0, 'approved');

-- 6. Insert Content
INSERT OR IGNORE INTO educational_content (title_ar, content, category, publish_status) VALUES
('كيف تتعامل مع نوبات الغضب؟', 'محتوى تجريبي عن الغضب', 'إرشادات للأهل', 'published'),
('أهمية الروتين اليومي', 'محتوى تجريبي عن الروتين', 'مقالات', 'draft');

-- 7. Insert Communities
INSERT OR IGNORE INTO community_groups (group_id, name, description, created_by, status) VALUES
(1, 'دعم أهالي أطفال التوحد الخفيف', 'مجموعة لتبادل الخبرات', 1, 'active');

-- 8. Insert Posts
INSERT OR IGNORE INTO community_posts (group_id, user_id, content, status) VALUES
(1, 4, 'ما هي أفضل طريقة لتنظيم وقت اللعب؟', 'approved');

-- 9. Logs
INSERT OR IGNORE INTO audit_logs (user_id, action, role, status) VALUES
(1, 'تم إعداد قاعدة البيانات الأولية', 'admin', 'success');
