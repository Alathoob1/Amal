const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

async function seed() {
    const db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

    console.log("Initializing schema...");
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await db.exec(schema);

    console.log("Clearing existing data...");
    await db.exec(`
        DELETE FROM notifications;
        DELETE FROM activities;
        DELETE FROM messages;
        DELETE FROM reports;
        DELETE FROM appointments;
        DELETE FROM doctors;
        DELETE FROM children;
        DELETE FROM users;
    `);

    // Helper functions
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];

    const maleNames = ['أحمد', 'محمد', 'خالد', 'عمر', 'يوسف'];
    const femaleNames = ['سارة', 'فاطمة', 'نورة', 'مريم', 'عائشة'];
    const familyNames = ['الغامدي', 'الزهراني', 'العتيبي', 'المطيري', 'الدوسري'];

    console.log("Seeding Users...");
    
    // Admins (1)
    let userIds = { admin: [], doctor: [], parent: [] };
    const adminRes = await db.run(`INSERT INTO users (role, fullName, email, password, phone) VALUES ('admin', 'مدير النظام', 'admin@aura.com', 'admin123', '0500000001')`);
    userIds.admin.push(adminRes.lastID);

    // Doctors (2)
    let doctorIds = []; // corresponds to doctors table id
    for (let i = 1; i <= 2; i++) {
        const name = `د. ${randomItem(Math.random() > 0.5 ? maleNames : femaleNames)} ${randomItem(familyNames)}`;
        const res = await db.run(`INSERT INTO users (role, fullName, email, password, phone) VALUES ('doctor', ?, ?, 'doc123', ?)`,
            [name, `doctor${i}@aura.com`, `055000000${i}`]);
        userIds.doctor.push(res.lastID);

        const docRes = await db.run(`INSERT INTO doctors (userId, specialization, experience, availableDays, bio) VALUES (?, ?, ?, ?, ?)`,
            [res.lastID, 'طب نفسي أطفال', '10 سنوات', 'الاثنين - الخميس', 'متخصص في تقييم وتعديل سلوك الأطفال.']);
        doctorIds.push(docRes.lastID);
    }

    // Parents (2)
    for (let i = 1; i <= 2; i++) {
        const name = `${randomItem(Math.random() > 0.5 ? maleNames : femaleNames)} ${randomItem(familyNames)}`;
        const res = await db.run(`INSERT INTO users (role, fullName, email, password, phone) VALUES ('parent', ?, ?, 'parent123', ?)`,
            [name, `parent${i}@aura.com`, `056000000${i}`]);
        userIds.parent.push(res.lastID);
    }

    console.log("Seeding Children...");
    // Children (3)
    let childIds = [];
    const autismLevels = ['المستوى الأول', 'المستوى الثاني', 'المستوى الثالث'];
    for (let i = 1; i <= 3; i++) {
        const parentId = randomItem(userIds.parent);
        const isMale = Math.random() > 0.5;
        const name = randomItem(isMale ? maleNames : femaleNames);
        const age = randomInt(4, 12);
        
        const res = await db.run(
            `INSERT INTO children (parentId, fullName, age, gender, diagnosis, notes) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [parentId, name, age, isMale ? 'ذكر' : 'أنثى', randomItem(autismLevels), 'يحتاج تركيز على التواصل البصري.']
        );
        childIds.push(res.lastID);
    }

    console.log("Seeding Appointments...");
    // Appointments (5)
    for (let i = 1; i <= 5; i++) {
        const childId = randomItem(childIds);
        const child = await db.get('SELECT parentId FROM children WHERE id = ?', [childId]);
        const doctorId = randomItem(userIds.doctor);
        await db.run(
            `INSERT INTO appointments (childId, parentId, doctorId, date, time, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [childId, child.parentId, doctorId, randomDate(new Date(2026, 6, 1), new Date(2026, 12, 31)), `${randomInt(8, 16)}:00`, randomItem(['Pending', 'Approved', 'Completed', 'Cancelled']), 'متابعة دورية']
        );
    }

    console.log("Seeding Reports...");
    // Reports (5)
    for (let i = 1; i <= 5; i++) {
        const childId = randomItem(childIds);
        const doctorId = randomItem(userIds.doctor);
        await db.run(
            `INSERT INTO reports (childId, doctorId, title, progress, recommendations) VALUES (?, ?, ?, ?, ?)`,
            [childId, doctorId, 'تقرير التطور الشهري', 'تحسن ملحوظ في التواصل', 'الاستمرار في الجلسات']
        );
    }

    console.log("Seeding Messages...");
    // Messages (10)
    for (let i = 1; i <= 10; i++) {
        const parentId = randomItem(userIds.parent);
        const doctorId = randomItem(userIds.doctor);
        const senderId = Math.random() > 0.5 ? parentId : doctorId;
        const receiverId = senderId === parentId ? doctorId : parentId;
        await db.run(
            `INSERT INTO messages (senderId, receiverId, message) VALUES (?, ?, ?)`,
            [senderId, receiverId, 'مرحباً، أود الاستفسار عن تطور الحالة.']
        );
    }

    console.log("Seeding Activities...");
    // Activities (5)
    for (let i = 1; i <= 5; i++) {
        const childId = randomItem(childIds);
        const doctorId = randomItem(userIds.doctor);
        await db.run(
            `INSERT INTO activities (childId, doctorId, title, description, status) VALUES (?, ?, ?, ?, ?)`,
            [childId, doctorId, 'لعبة المطابقة الملونة', 'مطابقة الألوان لتعزيز التركيز.', randomItem(['Pending', 'Completed'])]
        );
    }

    console.log("Seeding Notifications...");
    // Notifications (5)
    for (let i = 1; i <= 5; i++) {
        const userId = randomItem([...userIds.parent, ...userIds.doctor]);
        await db.run(
            `INSERT INTO notifications (userId, text, isRead) VALUES (?, ?, ?)`,
            [userId, 'تذكير بموعد الجلسة القادمة غداً.', Math.random() > 0.3 ? 1 : 0]
        );
    }

    console.log("Database seeded successfully!");
    await db.close();
}

seed().catch(console.error);
