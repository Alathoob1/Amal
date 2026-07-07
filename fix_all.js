const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. fetchDoctorsList
if (!appJs.includes('fetchDoctorsList')) {
    const fetchDoctorsCode = `
async function fetchDoctorsList() {
    try {
        const res = await fetch('/api/doctors');
        if (res.ok) {
            const data = await res.json();
            const doctors = data.doctors || [];
            const selects = [
                document.getElementById('drawing-doctor-select'),
                document.getElementById('apt-doctor-select'),
                document.getElementById('chat-doctor-select')
            ];
            selects.forEach(select => {
                if (select) {
                    select.innerHTML = '<option value="" disabled selected>Select a doctor...</option>' +
                        doctors.map(d => \`<option value="\${d.id}">\${d.fullName}</option>\`).join('');
                }
            });
        }
    } catch (e) {
        console.error("Failed to fetch doctors", e);
    }
}
`;
    appJs = appJs.replace(
        /async function initializeApp\(\) \{/,
        fetchDoctorsCode + '\nasync function initializeApp() {\n    await fetchDoctorsList();'
    );
}

// 2. mapping data
appJs = appJs.replace(
    /drawings: data\.activities\.map\(d => \(\{\s*id: d\.id,\s*name: d\.title,\s*imageUrl: "https:\/\/images\.unsplash\.com\/photo-1513364776144-60967b0f800f\?w=400",\s*status: d\.status\.toLowerCase\(\),\s*uploadDate: d\.createdAt,\s*aiSummary: d\.description,\s*emotional: "مستقر",\s*behavioral: "جيد",\s*confidence: "95%",\s*doctorComments: d\.description,\s*recommendations: d\.description\s*\}\)\),/g,
    `drawings: (data.analyses || []).map(d => ({
      id: d.id,
      name: d.title || 'تحليل',
      imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
      status: d.status ? d.status.toLowerCase() : 'pending',
      uploadDate: d.createdAt,
      aiSummary: d.aiSummary || d.aiResult || '',
      emotional: "مستقر",
      behavioral: "جيد",
      confidence: "95%",
      doctorComments: d.doctorComments || '',
      recommendations: d.recommendations || ''
    })),
    reports: (data.reports || []).map(r => ({
      id: r.id,
      name: r.title || 'تقرير',
      uploadDate: r.createdAt,
      aiSummary: r.aiSummary || '',
      confidence: r.confidence || '95%',
      emotional: "مستقر",
      behavioral: "جيد",
      doctorComments: r.content || '',
      imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
      status: r.status ? r.status.toLowerCase() : 'approved'
    })),`
);

// 3. reports
appJs = appJs.replace(
    /const approved = data\.drawings\.filter\(d => d\.status === 'approved'\);/g,
    `const approved = data.reports || [];`
);
appJs = appJs.replace(
    /const d = data\.drawings\.find\(dr => dr\.id === reportId\);/g,
    `const d = data.reports.find(dr => String(dr.id) === String(reportId));`
);

// 4. handleDrawingUpload doctorId
// We use a specific replace function
appJs = appJs.replace(
    /const childId = data\.childProfile\?\.id;\s*const doctorId = data\.childProfile\?\.doctor_id;/,
    `const childId = data.childProfile?.id;
        const docSelect = document.getElementById('drawing-doctor-select');
        const doctorId = docSelect ? docSelect.value : null;`
);
appJs = appJs.replace(
    /doctorId: doctorId \|\| 2, \/\/ fallback/,
    `doctorId: doctorId,`
);
appJs = appJs.replace(
    /if \(\!childId\) \{/,
    `if (!doctorId) {
            alert("Please select a doctor. / الرجاء اختيار الطبيب.");
            modal.classList.remove('active');
            return;
        }
        if (!childId) {`
);

// 5. handleBookAppointment doctorId
appJs = appJs.replace(
    /const childId = data\.childProfile\?\.id;\s*const doctorId = data\.childProfile\?\.doctor_id;/,
    `const childId = data.childProfile?.id;
  const docSelect = document.getElementById('apt-doctor-select');
  const doctorId = docSelect ? docSelect.value : null;`
);

// 6. sendChatMessage doctorId
appJs = appJs.replace(
    /let docId = window\.activeConversationDoctorId;\s*if \(\!docId\) \{\s*const data = getLocalData\(\);\s*if \(data && data\.childProfile && data\.childProfile\.doctor_id\) \{\s*docId = data\.childProfile\.doctor_id;\s*\}\s*\}/,
    `const chatSelect = document.getElementById('chat-doctor-select');
  let docId = chatSelect && chatSelect.value ? chatSelect.value : window.activeConversationDoctorId;`
);

// 7. Unify appointment statuses
appJs = appJs.replace(
    /let statusClass = "badge-pending";\s*let statusLabel = "Scheduled";\s*if \(a\.status === 'completed'\) \{\s*statusClass = "badge-approved";\s*statusLabel = "Completed";\s*\}\s*if \(a\.status === 'cancelled'\) \{\s*statusClass = "badge-review";\s*statusLabel = "Cancelled";\s*\}/,
    `let statusClass = "badge-pending";
          let statusLabel = a.status.charAt(0).toUpperCase() + a.status.slice(1);
          if (a.status === 'completed') { statusClass = "badge-approved"; }
          if (a.status === 'approved') { statusClass = "badge-analyzing"; }
          if (a.status === 'rejected' || a.status === 'cancelled') { statusClass = "badge-review"; }`
);

appJs = appJs.replace(
    /const upcoming = data\.appointments\.filter\(a => a\.status !== 'completed' && a\.status !== 'cancelled'\);/,
    `const upcoming = data.appointments.filter(a => a.status === 'pending' || a.status === 'approved' || a.status === 'scheduled');`
);

// 8. loadChatWithDoctor function
if (!appJs.includes('loadChatWithDoctor')) {
    appJs += `\n
window.loadChatWithDoctor = async function(doctorId) {
    window.activeConversationDoctorId = doctorId;
    const userId = getUserId();
    const chatMessagesEl = document.getElementById('chat-history-container');
    if (!chatMessagesEl) return;
    
    chatMessagesEl.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 20px;">جاري تحميل المحادثة...</div>';
    
    try {
        let res = await fetch(\`/api/users/\${userId}/conversations\`);
        let conversations = await res.json();
        let conv = conversations.find(c => c.otherParticipantId == doctorId);
        
        if (!conv) {
            chatMessagesEl.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 20px;">لا توجد محادثات سابقة مع هذا الطبيب. أرسل رسالة للبدء.</div>';
            return;
        }
        
        res = await fetch(\`/api/conversations/\${conv.id}/messages\`);
        const msgs = await res.json();
        chatMessagesEl.innerHTML = msgs.map(msg => \`
          <div class="chat-bubble \${msg.senderId == userId ? 'sent' : 'received'}">
            <p style="margin: 0; color: inherit;">\${msg.message}</p>
          </div>
        \`).join('');
        chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
    } catch (e) {
        console.error(e);
        chatMessagesEl.innerHTML = '<div style="text-align: center; color: red; padding: 20px;">حدث خطأ أثناء تحميل المحادثة.</div>';
    }
}
`;
}

fs.writeFileSync('app.js', appJs);

// Fix admin.html missing endpoints
let adminHtml = fs.readFileSync('admin.html', 'utf8');

adminHtml = adminHtml.replace(
    /async function renderCommunities\(\) \{[\s\S]*?\}\s*async function submitCommunity\(\) \{[\s\S]*?\}/g,
    `async function renderCommunities() {
    const list = document.getElementById('comm-list-body');
    if (list) {
        list.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">المجتمعات غير مفعلة حالياً</td></tr>';
    }
}
async function submitCommunity() {}
async function deactivateCommunity() {}`
);

adminHtml = adminHtml.replace(
    /\/api\/analyses\/\$\{id\}\/decision/g,
    `/api/analyses/\${id}/status`
);
adminHtml = adminHtml.replace(
    /body: JSON\.stringify\(\{ status, review_notes: comments \}\)/g,
    `body: JSON.stringify({ status: status === 'approve' ? 'approved' : 'rejected', doctorComments: comments })`
);

fs.writeFileSync('admin.html', adminHtml);
console.log('Fixes applied successfully.');
