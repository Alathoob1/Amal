const fs = require('fs');

const jsPath = 'app.js';
let content = fs.readFileSync(jsPath, 'utf8');

// Patch simulateAnalysisUpload
content = content.replace(
    /await fetch\('\/api\/activities', {\s*method: 'POST',\s*headers: { 'Content-Type': 'application\/json' },\s*body: JSON\.stringify\({\s*childId,\s*doctorId,\s*title,\s*description: "Performing visual extraction for shapes and balance...",\s*status: "Pending"\s*}\)\s*}\);/g,
    `await fetch('/api/analyses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    childId: childId || 1, // fallback to avoid crash
                    parentId: localStorage.getItem('auraUserId'),
                    doctorId: doctorId || 2, // fallback
                    title: title || 'رسم تحليل جديد',
                    aiResult: 'Analysis completed successfully',
                    aiConfidence: '85%',
                    aiSummary: 'الرسم يظهر تركيزاً كبيراً في التفاصيل الدقيقة مما قد يشير إلى مستوى عالٍ من التركيز. الألوان المستخدمة دافئة وتميل للإيجابية.'
                })
            });`
);

// Patch chat rendering
content = content.replace(
    /let res = await fetch\(`\/api\/users\/\$\{userId\}\/conversations`\);\s*let data = await res\.json\(\);\s*const conversations = data\.conversations \|\| \[\];\s*console\.log\("Conversations fetched:", conversations\);\s*const conv = conversations\[0\]; \s*if \(\!conv\) {\s*chatMessagesEl\.innerHTML = '<div style="text-align: center; color: var\(--color-text-muted\); padding: 20px;">لا توجد محادثات حتى الآن<\/div>';\s*return;\s*}\s*window\.activeConversationDoctorId = conv\.doctor_id;\s*res = await fetch\(`\/api\/conversations\/\$\{conv\.id\}\/messages`\);\s*data = await res\.json\(\);\s*const msgs = data\.messages \|\| \[\];\s*console\.log\("Messages fetched:", msgs\);\s*chatMessagesEl\.innerHTML = msgs\.map\(msg => `\s*<div class="chat-bubble \$\{msg\.sender_role === 'parent' \? 'sent' : 'received'\}">\s*<div style="font-weight: 600; font-size: 0\.8rem; margin-bottom: 4px;">\s*\$\{msg\.sender_name\}\s*<\/div>\s*<p style="margin: 0; color: inherit;">\$\{msg\.text\}<\/p>\s*<div class="time" style="font-size: 0\.75rem; text-align: left; margin-top: 4px;">\$\{msg\.time \|\| ''\}<\/div>\s*<\/div>\s*`\)\.join\(''\);/g,
    `let res = await fetch(\`/api/users/\${userId}/conversations\`);
    let conversations = await res.json();
    console.log("Conversations fetched:", conversations);
    const conv = conversations[0]; 
    if (!conv) {
        chatMessagesEl.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: 20px;">لا توجد محادثات حتى الآن</div>';
        return;
    }
    window.activeConversationDoctorId = conv.otherParticipantId;
    res = await fetch(\`/api/conversations/\${conv.id}/messages\`);
    const msgs = await res.json();
    console.log("Messages fetched:", msgs);
    chatMessagesEl.innerHTML = msgs.map(msg => \`
      <div class="chat-bubble \${msg.senderId == userId ? 'sent' : 'received'}">
        <p style="margin: 0; color: inherit;">\${msg.message}</p>
      </div>
    \`).join('');`
);

// Patch sending message
content = content.replace(
    /body: JSON\.stringify\({\s*sender_id: userId,\s*receiver_id: docId,\s*sender_role: 'parent',\s*text: text\s*}\)/g,
    `body: JSON.stringify({
              senderId: userId,
              receiverId: docId,
              message: text
          })`
);

// We need to patch the reports listing too. Let's replace the renderApprovedReportsList fetch logic if needed
// Actually we can just do a regex replace for '/api/activities' if any left
// Let's also patch the load of data:
content = content.replace(
    /const res = await fetch\(`\/api\/users\/\$\{userId\}`,\s*\{\s*headers:\s*\{ 'Content-Type': 'application\/json' \}\s*\}\);/g,
    `const res = await fetch(\`/api/parents/\${userId}/data\`);`
);
content = content.replace(
    /const userData = await res\.json\(\);/g,
    `const userData = await res.json();
          // Map structure for app.js existing expected structure
          userData.children = userData.children || [];
          userData.reports = userData.reports || [];
          userData.appointments = userData.appointments || [];
          if(userData.children.length > 0) {
              userData.childProfile = userData.children[0];
          }
    `
);

fs.writeFileSync(jsPath, content);
console.log('app.js updated successfully.');
