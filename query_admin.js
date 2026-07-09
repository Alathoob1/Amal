const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

(async () => {
    const db = await open({ filename: './database.sqlite', driver: sqlite3.Database });
    const admins = await db.all("SELECT * FROM users WHERE role='admin'");
    console.log(JSON.stringify(admins, null, 2));
    await db.close();
})();
