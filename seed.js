const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

async function seed() {
    console.log("Dropping existing database...");
    const dbPath = path.join(__dirname, 'database.sqlite');
    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
    }

    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    console.log("Initializing schema...");
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);

    console.log("Seeding data...");
    
    const hashedPass = await bcrypt.hash('123456', 10);

    // Users
    console.log("Creating users...");
    // 1 Admin
    await db.run("INSERT INTO users (fullName, email, password, role) VALUES (?, ?, ?, ?)", ['المدير العام', 'admin@amal.com', hashedPass, 'admin']);
    
    // 2 Doctors
    await db.run("INSERT INTO users (fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?)", ['د. أحمد محمود', 'doctor@amal.com', hashedPass, 'doctor', '0500000001']);
    const doc1Id = (await db.get("SELECT id FROM users WHERE email='doctor@amal.com'")).id;
    await db.run("INSERT INTO doctors (userId, specialization, experience) VALUES (?, ?, ?)", [doc1Id, 'أخصائي توحد وتخاطب', '10 سنوات']);

    await db.run("INSERT INTO users (fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?)", ['د. سارة خليل', 'doctor2@amal.com', hashedPass, 'doctor', '0500000002']);
    const doc2Id = (await db.get("SELECT id FROM users WHERE email='doctor2@amal.com'")).id;
    await db.run("INSERT INTO doctors (userId, specialization, experience) VALUES (?, ?, ?)", [doc2Id, 'أخصائية تعديل سلوك', '8 سنوات']);

    // 3 Parents
    await db.run("INSERT INTO users (fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?)", ['خالد عبدالله', 'parent@amal.com', hashedPass, 'parent', '0501111111']);
    const par1Id = (await db.get("SELECT id FROM users WHERE email='parent@amal.com'")).id;

    await db.run("INSERT INTO users (fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?)", ['منى سعود', 'parent2@amal.com', hashedPass, 'parent', '0502222222']);
    const par2Id = (await db.get("SELECT id FROM users WHERE email='parent2@amal.com'")).id;

    await db.run("INSERT INTO users (fullName, email, password, role, phone) VALUES (?, ?, ?, ?, ?)", ['ياسر علي', 'parent3@amal.com', hashedPass, 'parent', '0503333333']);
    const par3Id = (await db.get("SELECT id FROM users WHERE email='parent3@amal.com'")).id;

    // 4 Children
    console.log("Creating children...");
    await db.run("INSERT INTO children (parentId, fullName, age, gender, diagnosis) VALUES (?, ?, ?, ?, ?)", [par1Id, 'أحمد خالد', 6, 'ذكر', 'توحد بسيط']);
    const c1Id = (await db.get("SELECT id FROM children WHERE fullName='أحمد خالد'")).id;

    await db.run("INSERT INTO children (parentId, fullName, age, gender, diagnosis) VALUES (?, ?, ?, ?, ?)", [par1Id, 'نورة خالد', 4, 'أنثى', 'تأخر نطق']);
    const c2Id = (await db.get("SELECT id FROM children WHERE fullName='نورة خالد'")).id;

    await db.run("INSERT INTO children (parentId, fullName, age, gender, diagnosis) VALUES (?, ?, ?, ?, ?)", [par2Id, 'يوسف أحمد', 8, 'ذكر', 'توحد متوسط']);
    const c3Id = (await db.get("SELECT id FROM children WHERE fullName='يوسف أحمد'")).id;

    await db.run("INSERT INTO children (parentId, fullName, age, gender, diagnosis) VALUES (?, ?, ?, ?, ?)", [par3Id, 'سارة ياسر', 5, 'أنثى', 'اضطراب فرط الحركة وتشتت الانتباه']);
    const c4Id = (await db.get("SELECT id FROM children WHERE fullName='سارة ياسر'")).id;

    // Patient Assignments
    await db.run("INSERT INTO patient_assignments (doctorId, childId, parentId) VALUES (?, ?, ?)", [doc1Id, c1Id, par1Id]);
    await db.run("INSERT INTO patient_assignments (doctorId, childId, parentId) VALUES (?, ?, ?)", [doc1Id, c3Id, par2Id]);
    await db.run("INSERT INTO patient_assignments (doctorId, childId, parentId) VALUES (?, ?, ?)", [doc2Id, c2Id, par1Id]);
    await db.run("INSERT INTO patient_assignments (doctorId, childId, parentId) VALUES (?, ?, ?)", [doc2Id, c4Id, par3Id]);

    // Analyses
    console.log("Creating analyses...");
    await db.run("INSERT INTO analyses (childId, parentId, doctorId, title, aiResult, aiConfidence, aiSummary, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [c1Id, par1Id, doc1Id, 'رسمة العائلة', 'Analysis data', '88%', 'ملخص إيجابي يدل على ترابط أسري جيد', 'reviewed']);
    const a1Id = (await db.get("SELECT id FROM analyses WHERE title='رسمة العائلة'")).id;

    await db.run("INSERT INTO analyses (childId, parentId, doctorId, title, aiResult, aiConfidence, aiSummary, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [c3Id, par2Id, doc1Id, 'رسمة شجرة', 'Analysis data', '75%', 'تشير الرسمة إلى بعض العزلة والتوتر', 'pending']);
    
    // Reports
    console.log("Creating reports...");
    await db.run("INSERT INTO reports (childId, parentId, doctorId, analysisId, title, progress, recommendations, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [c1Id, par1Id, doc1Id, a1Id, 'تقرير تقييم الذكاء الاصطناعي', 'تحسن ملحوظ', 'الاستمرار في الجلسات الجماعية', 'sent']);
    await db.run("INSERT INTO reports (childId, parentId, doctorId, title, progress, recommendations, status) VALUES (?, ?, ?, ?, ?, ?, ?)", [c2Id, par1Id, doc2Id, 'متابعة دورية', 'جيد جدا', 'تمارين التخاطب المنزلية', 'draft']);

    // Appointments
    console.log("Creating appointments...");
    await db.run("INSERT INTO appointments (childId, parentId, doctorId, date, time, status) VALUES (?, ?, ?, ?, ?, ?)", [c1Id, par1Id, doc1Id, '2026-07-10', '10:00 ص', 'Approved']);
    await db.run("INSERT INTO appointments (childId, parentId, doctorId, date, time, status) VALUES (?, ?, ?, ?, ?, ?)", [c3Id, par2Id, doc1Id, '2026-07-15', '04:00 م', 'Pending']);
    
    // Conversations and Messages
    console.log("Creating messages...");
    await db.run("INSERT INTO conversations (participant1Id, participant2Id) VALUES (?, ?)", [par1Id, doc1Id]);
    const convId = (await db.get("SELECT id FROM conversations")).id;
    await db.run("INSERT INTO messages (conversationId, senderId, receiverId, message) VALUES (?, ?, ?, ?)", [convId, par1Id, doc1Id, 'السلام عليكم دكتور، كيف كان تقييم أحمد اليوم؟']);
    await db.run("INSERT INTO messages (conversationId, senderId, receiverId, message) VALUES (?, ?, ?, ?)", [convId, doc1Id, par1Id, 'وعليكم السلام، تقييمه ممتاز وسأرسل التقرير قريباً.']);

    // Educational Content
    console.log("Creating educational content...");
    await db.run("INSERT INTO educational_content (title, category, contentType, status) VALUES (?, ?, ?, ?)", ['التعامل مع نوبات الغضب', 'تعديل سلوك', 'مقال', 'منشور']);
    
    console.log("Seed data successfully inserted.");
}

seed().catch(console.error);
