const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const BASE_URL = 'http://localhost:3000';

async function testFlows() {
    console.log("=== STARTING INTEGRATION TESTS ===\n");
    let allPassed = true;
    let report = [];

    const logPass = (msg) => { console.log(`✅ [PASS] ${msg}`); report.push(`✅ ${msg}`); };
    const logFail = (msg) => { console.error(`❌ [FAIL] ${msg}`); report.push(`❌ ${msg}`); allPassed = false; };

    try {
        // --- 1. Test Admin Login ---
        let res = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@amal.com', password: '123456' })
        });
        let data = await res.json();
        if (data.success && data.role === 'admin') logPass("Admin login successful");
        else logFail("Admin login failed");
        const adminId = data.userId;

        // --- 2. Test Doctor Login ---
        res = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'doctor@amal.com', password: '123456' })
        });
        data = await res.json();
        if (data.success && data.role === 'doctor') logPass("Doctor login successful");
        else logFail("Doctor login failed");
        const doctorId = data.userId;

        // --- 3. Test Parent Login ---
        res = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'parent@amal.com', password: '123456' })
        });
        data = await res.json();
        if (data.success && data.role === 'parent') logPass("Parent login successful");
        else logFail("Parent login failed");
        const parentId = data.userId;

        // Get Parent Data to get Child ID
        res = await fetch(`${BASE_URL}/api/parents/${parentId}/data`);
        let parentData = await res.json();
        if (parentData && parentData.children && parentData.children.length > 0) {
            logPass("Fetched Parent Data successfully");
        } else {
            logFail("Failed to fetch Parent Data or no children found");
        }
        const childId = parentData.children[0].id;

        // --- 4. Parent Requests Analysis ---
        res = await fetch(`${BASE_URL}/api/analyses`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                childId: childId, parentId: parentId, doctorId: doctorId,
                title: 'Test Analysis', aiResult: 'Test', aiConfidence: '99%', aiSummary: 'Test Summary'
            })
        });
        data = await res.json();
        if (data.success) logPass("Parent successfully requested an analysis");
        else logFail("Parent failed to request an analysis");

        // --- 5. Parent Books Appointment ---
        res = await fetch(`${BASE_URL}/api/appointments`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                childId: childId, parentId: parentId, doctorId: doctorId,
                date: '2026-10-10', time: '10:00 AM'
            })
        });
        data = await res.json();
        if (data.success) logPass("Parent successfully booked an appointment");
        else logFail("Parent failed to book an appointment");

        // --- 6. Parent Sends Message ---
        res = await fetch(`${BASE_URL}/api/messages`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senderId: parentId, receiverId: doctorId, message: 'Hello Doctor!' })
        });
        data = await res.json();
        if (data.success) logPass("Parent successfully sent a message");
        else logFail("Parent failed to send a message");

        // --- 7. Doctor Fetches Dashboard ---
        res = await fetch(`${BASE_URL}/api/doctors/${doctorId}/data`);
        let doctorData = await res.json();
        if (doctorData && doctorData.analyses && doctorData.appointments) {
            logPass("Doctor successfully fetched dashboard data");
            const newAnalysis = doctorData.analyses.find(a => a.title === 'Test Analysis');
            if (newAnalysis) logPass("Doctor sees the new analysis in pending list");
            else logFail("Doctor did not see the new analysis");

            const newAppt = doctorData.appointments.find(a => a.date === '2026-10-10');
            if (newAppt) logPass("Doctor sees the new appointment");
            else logFail("Doctor did not see the new appointment");

            // --- 8. Doctor Reviews Analysis ---
            if (newAnalysis) {
                res = await fetch(`${BASE_URL}/api/analyses/${newAnalysis.id}/review`, {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'sent', doctorReview: 'Looks good', doctorRecommendations: 'Keep it up' })
                });
                if (res.ok) logPass("Doctor successfully reviewed and sent analysis");
                else logFail("Doctor failed to review analysis");
            }

            // --- 9. Doctor Approves Appointment ---
            if (newAppt) {
                res = await fetch(`${BASE_URL}/api/appointments/${newAppt.id}`, {
                    method: 'PUT', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'Approved' })
                });
                if (res.ok) logPass("Doctor successfully approved appointment");
                else logFail("Doctor failed to approve appointment");
            }
        } else {
            logFail("Doctor failed to fetch dashboard data");
        }

        // --- 10. Doctor Replies to Message ---
        res = await fetch(`${BASE_URL}/api/messages`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ senderId: doctorId, receiverId: parentId, message: 'Hello Parent!' })
        });
        data = await res.json();
        if (data.success) logPass("Doctor successfully replied to message");
        else logFail("Doctor failed to reply to message");

        // --- 11. Admin Verifies Logs and Stats ---
        res = await fetch(`${BASE_URL}/api/admin/stats`);
        let adminStats = await res.json();
        if (adminStats && adminStats.stats) logPass("Admin successfully fetched stats");
        else logFail("Admin failed to fetch stats");

        res = await fetch(`${BASE_URL}/api/admin/logs?limit=10`);
        let adminLogs = await res.json();
        if (adminLogs && adminLogs.length > 0) {
            logPass("Admin successfully fetched activity logs");
            const apptLog = adminLogs.find(l => l.action === 'appointment_update' || l.description.includes('موعد'));
            const reviewLog = adminLogs.find(l => l.action === 'analysis_review' || l.description.includes('تحليل'));
            if (apptLog && reviewLog) logPass("Activity logs captured the doctor's actions properly");
            else logFail("Activity logs missed some actions");
        } else {
            logFail("Admin failed to fetch activity logs");
        }

    } catch (err) {
        logFail(`Exception occurred during tests: ${err.message}`);
    }

    console.log("\n=== TEST REPORT ===");
    report.forEach(l => console.log(l));
    console.log(`\nOverall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
}

testFlows();
