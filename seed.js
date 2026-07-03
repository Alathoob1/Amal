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
        DELETE FROM community_reports;
        DELETE FROM community_groups;
        DELETE FROM messages;
        DELETE FROM appointments;
        DELETE FROM reports;
        DELETE FROM drawings;
        DELETE FROM children;
        DELETE FROM users;
        DELETE FROM educational_content;
    `);

    // Helper functions
    const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];

    const maleNames = ['أحمد', 'محمد', 'خالد', 'عمر', 'يوسف', 'عبدالله', 'علي', 'حسين', 'سعد', 'فهد', 'فيصل', 'ماجد', 'طارق', 'وليد', 'ياسر', 'ريان', 'زياد', 'سعود', 'فارس', 'نواف'];
    const femaleNames = ['سارة', 'فاطمة', 'نورة', 'مريم', 'عائشة', 'ليلى', 'هند', 'أمل', 'مها', 'ريم', 'شهد', 'حنان', 'منى', 'ندى', 'هدى', 'سميرة', 'بشرى', 'داليا', 'رؤى', 'زينب'];
    const familyNames = ['الغامدي', 'الزهراني', 'العتيبي', 'المطيري', 'الدوسري', 'القحطاني', 'العنزي', 'الشمري', 'الجهني', 'الحربي', 'الشهراني', 'السبيعي', 'الرويلي', 'القرني'];

    console.log("Seeding Users...");
    
    // Admins (3)
    let userIds = { admin: [], doctor: [], parent: [] };
    for (let i = 1; i <= 3; i++) {
        const result = await db.run(`INSERT INTO users (role, name, email, password, phone) VALUES ('admin', 'مدير النظام ${i}', 'admin${i}@aura.com', 'admin123', '050000000${i}')`);
        userIds.admin.push(result.lastID);
    }

    // Doctors (20)
    for (let i = 1; i <= 20; i++) {
        const name = `د. ${randomItem(Math.random() > 0.5 ? maleNames : femaleNames)} ${randomItem(familyNames)}`;
        const result = await db.run(`INSERT INTO users (role, name, email, password, phone) VALUES ('doctor', ?, ?, 'doc123', ?)`,
            [name, `doctor${i}@aura.com`, `05500000${i.toString().padStart(2, '0')}`]);
        userIds.doctor.push(result.lastID);
    }

    // Parents (60)
    for (let i = 1; i <= 60; i++) {
        const name = `${randomItem(Math.random() > 0.5 ? maleNames : femaleNames)} ${randomItem(familyNames)}`;
        const result = await db.run(`INSERT INTO users (role, name, email, password, phone) VALUES ('parent', ?, ?, 'parent123', ?)`,
            [name, `parent${i}@aura.com`, `05600000${i.toString().padStart(2, '0')}`]);
        userIds.parent.push(result.lastID);
    }

    console.log("Seeding Children...");
    // Children (80)
    let childIds = [];
    const autismLevels = ['المستوى الأول', 'المستوى الثاني', 'المستوى الثالث'];
    const communicationStyles = ['يستخدم الكلمات المفردة', 'يستخدم التابلت للرد', 'تواصل غير لفظي', 'يتواصل بعبارات قصيرة'];
    for (let i = 1; i <= 80; i++) {
        const parent_id = randomItem(userIds.parent);
        const doctor_id = randomItem(userIds.doctor);
        const isMale = Math.random() > 0.5;
        const name = randomItem(isMale ? maleNames : femaleNames);
        const age = randomInt(4, 12);
        
        const result = await db.run(
            `INSERT INTO children (parent_id, doctor_id, name, age, gender, autism_level, communication_style, behavioral_history, emotional_triggers, medical_notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [parent_id, doctor_id, name, age, isMale ? 'ذكر' : 'أنثى', randomItem(autismLevels), randomItem(communicationStyles), 'حركة مفرطة عند التوتر', 'الأصوات العالية', 'حساسية للضوء الساطع']
        );
        childIds.push(result.lastID);
    }

    console.log("Seeding AI Analyses (Drawings)...");
    // AI Analyses (150)
    let drawingIds = [];
    const drawingStatuses = ['analyzing', 'review', 'approved', 'rejected'];
    const aiSummaries = ['استخدام مكثف للون الأحمر مما يدل على طاقة عالية.', 'تكرار الأشكال الهندسية، تركيز عالي.', 'خطوط خفيفة ومتباعدة، حالة هدوء.'];
    const drawingsTitles = ['شجرة العائلة', 'المدرسة', 'البحر', 'سيارتي', 'المنزل', 'الحديقة'];
    const photos = [
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400',
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400',
        'https://images.unsplash.com/photo-1511216113906-8f56bbce16a7?w=400'
    ];
    for (let i = 1; i <= 150; i++) {
        const child_id = randomItem(childIds);
        const result = await db.run(
            `INSERT INTO drawings (child_id, name, image_url, status, upload_date, ai_summary, emotional, behavioral, confidence, doctor_comments, recommendations)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                child_id, 
                randomItem(drawingsTitles), 
                randomItem(photos), 
                randomItem(drawingStatuses), 
                randomDate(new Date(2025, 1, 1), new Date()), 
                randomItem(aiSummaries),
                'مستقر', 'تكرار سلوكي', `${randomInt(70, 98)}%`, 'تمت المراجعة بشكل جيد.', 'الاستمرار في اللعب الحسي'
            ]
        );
        drawingIds.push(result.lastID);
    }

    console.log("Seeding Medical Reports...");
    // Reports (150)
    for (let i = 1; i <= 150; i++) {
        const child_id = randomItem(childIds);
        const doctor_id = randomItem(userIds.doctor);
        const drawing_id = randomItem(drawingIds);
        await db.run(
            `INSERT INTO reports (child_id, doctor_id, drawing_id, content, status, date) VALUES (?, ?, ?, ?, ?, ?)`,
            [child_id, doctor_id, drawing_id, 'تقرير طبي مفصل يوضح تطور الحالة السلوكية والتخاطب.', randomItem(['pending', 'approved']), randomDate(new Date(2025, 1, 1), new Date())]
        );
    }

    console.log("Seeding Appointments...");
    // Appointments (250)
    for (let i = 1; i <= 250; i++) {
        const parent_id = randomItem(userIds.parent);
        const doctor_id = randomItem(userIds.doctor);
        const child_id = randomItem(childIds);
        await db.run(
            `INSERT INTO appointments (parent_id, doctor_id, child_id, date, time, type, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [parent_id, doctor_id, child_id, randomDate(new Date(2026, 6, 1), new Date(2026, 12, 31)), `${randomInt(8, 16)}:00`, 'استشارة سلوكية', randomItem(['scheduled', 'completed', 'cancelled'])]
        );
    }

    console.log("Seeding Messages...");
    // Messages (300)
    for (let i = 1; i <= 300; i++) {
        const parent_id = randomItem(userIds.parent);
        const doctor_id = randomItem(userIds.doctor);
        const sender_id = Math.random() > 0.5 ? parent_id : doctor_id;
        const receiver_id = sender_id === parent_id ? doctor_id : parent_id;
        await db.run(
            `INSERT INTO messages (sender_id, receiver_id, text, time, date, is_read) VALUES (?, ?, ?, ?, ?, ?)`,
            [sender_id, receiver_id, 'مرحباً، أود الاستفسار عن تطور الحالة والمواعيد القادمة.', `${randomInt(8, 20)}:30`, randomDate(new Date(2025, 1, 1), new Date()), Math.random() > 0.5 ? 1 : 0]
        );
    }

    console.log("Seeding Community Groups & Reports...");
    // Community Groups
    const groupData = [
        { id: 'grp-general', en: 'General', ar: 'المناقشة العامة' },
        { id: 'grp-nonverbal', en: 'Non-verbal', ar: 'الأطفال غير اللفظيين' },
        { id: 'grp-level1', en: 'Level 1', ar: 'توحد مستوى 1' },
        { id: 'grp-home', en: 'Home Activities', ar: 'الأنشطة المنزلية' }
    ];
    for (let g of groupData) {
        await db.run(`INSERT INTO community_groups (id, name_en, name_ar, desc_ar, members) VALUES (?, ?, ?, ?, ?)`,
            [g.id, g.en, g.ar, 'مجموعة مخصصة للنقاش والدعم', randomInt(50, 300)]);
    }

    // Community Reports (20)
    for (let i = 1; i <= 20; i++) {
        const user_id = randomItem(userIds.parent);
        await db.run(
            `INSERT INTO community_reports (group_id, user_id, content, status, date) VALUES (?, ?, ?, ?, ?)`,
            [randomItem(groupData).id, user_id, 'إبلاغ عن محتوى غير لائق في المجموعة.', randomItem(['pending', 'resolved']), randomDate(new Date(2025, 1, 1), new Date())]
        );
    }

    console.log("Seeding Educational Content...");
    // Educational Content (40)
    for (let i = 1; i <= 40; i++) {
        await db.run(
            `INSERT INTO educational_content (title_ar, title_en, desc_ar, type, url, views) VALUES (?, ?, ?, ?, ?, ?)`,
            [`مقال تعليمي رقم ${i}`, `Educational Article ${i}`, 'شرح مبسط لطرق التعامل مع نوبات الغضب.', 'article', '#', randomInt(10, 1000)]
        );
    }

    console.log("Seeding Notifications...");
    // Notifications (100+)
    for (let i = 1; i <= 120; i++) {
        const user_id = randomItem([...userIds.parent, ...userIds.doctor]);
        await db.run(
            `INSERT INTO notifications (user_id, type, text, is_read, date) VALUES (?, ?, ?, ?, ?)`,
            [user_id, randomItem(['system', 'message', 'report', 'appointment']), 'لديك تنبيه جديد في النظام يرجى مراجعته.', Math.random() > 0.3 ? 1 : 0, randomDate(new Date(2026, 5, 1), new Date())]
        );
    }

    console.log("Database seeded successfully!");
    await db.close();
}

seed().catch(console.error);
