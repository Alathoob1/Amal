const fs = require('fs');

const htmlPath = 'doctor.html';
let content = fs.readFileSync(htmlPath, 'utf8');

// Replace analysis notes area
content = content.replace(
    /<label class="form-label" style="margin-top: auto;">ملاحظات الطبيب \(تظهر في التقرير\):<\/label>\s*<textarea class="form-control" rows="3" placeholder="أضف ملاحظاتك أو عدّل على استنتاج الذكاء الاصطناعي..."><\/textarea>\s*<div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var\(--glass-border\);">\s*<button class="btn btn-primary" style="flex: 1;" onclick="alert\('تم الاعتماد'\); showSection\('review-list-section'\)">اعتماد النتيجة<\/button>\s*<button class="btn btn-outline" style="flex: 1; color: #B7791F; border-color: #B7791F;" onclick="alert\('تم طلب تعديل'\); showSection\('review-list-section'\)">يطلب تعديل<\/button>\s*<button class="btn btn-danger" onclick="alert\('تم الرفض'\); showSection\('review-list-section'\)">رفض<\/button>\s*<\/div>/,
    `<label class="form-label" style="margin-top: auto;">ملاحظات الطبيب (تظهر في التقرير):</label>
                            <textarea id="analysis-review-notes" class="form-control" rows="3" placeholder="أضف ملاحظاتك أو عدّل على استنتاج الذكاء الاصطناعي..."></textarea>
                            
                            <div style="display: flex; gap: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--glass-border);">
                                <button class="btn btn-primary" style="flex: 1;" onclick="submitAnalysisReview('sent')">اعتماد وإرسال التقرير</button>
                                <button class="btn btn-outline" style="flex: 1; color: #B7791F; border-color: #B7791F;" onclick="submitAnalysisReview('reviewed')">حفظ النتيجة كمسودة</button>
                            </div>`
);

// Add Appointment actions
content = content.replace(
    /<div id="appointment-actions-container" style="display: flex; gap: 12px; justify-content: center; border-top: 1px solid var\(--glass-border\); padding-top: 24px;">\s*<button id="btn-appt-start" class="btn btn-primary" onclick="alert\('تم بدء الجلسة'\); showSection\('appointments-list-section'\)">بدء الجلسة<\/button>\s*<button id="btn-appt-cancel" class="btn btn-outline" style="color: var\(--color-danger\); border-color: var\(--color-danger\);" onclick="alert\('تم إلغاء الموعد'\); showSection\('appointments-list-section'\)">إلغاء الموعد<\/button>\s*<\/div>/,
    `<div id="appointment-actions-container" style="display: flex; gap: 12px; justify-content: center; border-top: 1px solid var(--glass-border); padding-top: 24px;">
                            <button id="btn-appt-start" class="btn btn-primary" onclick="updateAppointmentStatus('Completed')">إنهاء الجلسة</button>
                            <button id="btn-appt-approve" class="btn btn-primary" style="background:var(--color-primary);" onclick="updateAppointmentStatus('Approved')">قبول الموعد</button>
                            <button id="btn-appt-cancel" class="btn btn-outline" style="color: var(--color-danger); border-color: var(--color-danger);" onclick="updateAppointmentStatus('Rejected')">رفض الموعد</button>
                        </div>`
);

// We need to completely replace the <script> logic at the bottom
const scriptStart = content.lastIndexOf('<script>');
const scriptEnd = content.lastIndexOf('</script>') + 9;

const newScript = `<script>
        let currentAnalysisId = null;
        let currentApptId = null;
        let currentReportId = null;

        function showSection(sectionId, element) {
            const sections = document.querySelectorAll('.section-content');
            sections.forEach(sec => sec.style.display = 'none');
            
            const targetSection = document.getElementById(sectionId);
            if(targetSection) targetSection.style.display = 'block';
            
            if(element && element.tagName === 'A') {
                const links = document.querySelectorAll('.sidebar-nav a');
                links.forEach(link => link.classList.remove('active'));
                element.classList.add('active');
            }
        }

        function showPatientProfile(name, id) {
            document.getElementById('profile-patient-name').innerText = name;
            showSection('patient-profile-section');
            // Normally would fetch profile data by ID here
        }

        function showProfileTab(tabId, element) {
            const tabs = document.querySelectorAll('.profile-tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));
            const btns = document.querySelectorAll('.profile-tab');
            btns.forEach(btn => btn.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            element.classList.add('active');
        }

        function showAnalysisDetail(id, name, confidence, summary) {
            currentAnalysisId = id;
            document.getElementById('analysis-patient-name').innerText = name;
            document.getElementById('analysis-review-notes').value = '';
            showSection('analysis-detail-section');
        }

        function showReportDetail(id, name, status) {
            currentReportId = id;
            document.getElementById('report-child-name').innerText = name;
            const btnSend = document.getElementById('btn-rep-send');
            const btnEdit = document.getElementById('btn-rep-edit');
            const btnComp = document.getElementById('btn-rep-complete');
            const badge = document.getElementById('report-sent-badge');
            
            btnSend.style.display = 'none';
            btnEdit.style.display = 'none';
            btnComp.style.display = 'none';
            badge.style.display = 'none';

            if(status === 'draft') {
                btnSend.style.display = 'inline-block';
                btnEdit.style.display = 'inline-block';
            } else if(status === 'sent') {
                badge.style.display = 'block';
            }
            showSection('report-detail-section');
        }

        function showAppointmentDetail(id, name, status) {
            currentApptId = id;
            document.getElementById('btn-appt-start').style.display = 'none';
            document.getElementById('btn-appt-approve').style.display = 'none';
            document.getElementById('btn-appt-cancel').style.display = 'none';

            if (status === 'Pending') {
                document.getElementById('btn-appt-approve').style.display = 'inline-block';
                document.getElementById('btn-appt-cancel').style.display = 'inline-block';
            } else if (status === 'Approved') {
                document.getElementById('btn-appt-start').style.display = 'inline-block';
                document.getElementById('btn-appt-cancel').style.display = 'inline-block';
            }

            showSection('appointment-detail-section');
        }

        function renderDoctorDashboard() {
            if (!doctorData) return;
            
            // Stats
            const statPatients = document.getElementById('stat-patients');
            if (statPatients) statPatients.textContent = doctorData.patients?.length || 0;
            
            const pendingAnalyses = doctorData.analyses?.filter(a => a.status === 'pending') || [];
            const draftReports = doctorData.reports?.filter(r => r.status === 'draft') || [];
            
            // Patients table
            const patientsTbody = document.getElementById('doc-patients-tbody');
            if (patientsTbody && doctorData.patients) {
                if (doctorData.patients.length === 0) {
                    patientsTbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">لا يوجد مرضى مسجلين</td></tr>';
                } else {
                    patientsTbody.innerHTML = doctorData.patients.map(p => \`
                        <tr>
                            <td style="font-weight: 600; color: var(--color-primary);">\${p.fullName}</td>
                            <td>\${p.age || '-'} سنوات</td>
                            <td><span class="badge-dynamic" style="background: rgba(226,125,96,0.15); color: #E27D60;">\${p.diagnosis || '-'}</span></td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td><span style="color: #3B5E39; font-weight: 600; font-size: 0.85rem;">نشط</span></td>
                            <td><button class="btn btn-outline" style="padding: 6px 16px; font-size: 0.85rem; border-radius: 6px;" onclick="showPatientProfile('\${p.fullName}', \${p.id})">فتح الملف</button></td>
                        </tr>
                    \`).join('');
                }
            }

            // Analyses Reviews table
            const reviewsTbody = document.getElementById('doc-reviews-tbody');
            if (reviewsTbody) {
                if (pendingAnalyses.length === 0) {
                    reviewsTbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">لا توجد تحليلات بانتظار المراجعة</td></tr>';
                } else {
                    reviewsTbody.innerHTML = pendingAnalyses.map(a => \`
                        <tr>
                            <td style="font-weight: 600;">\${a.childName || 'طفل'}</td>
                            <td>\${a.createdAt}</td>
                            <td><span class="badge-dynamic" style="background: rgba(144,180,242,0.15); color: #1D4ED8;">\${a.aiConfidence || '85%'}</span></td>
                            <td><span class="badge-dynamic badge-edit" style="color: #B7791F; background: rgba(255,193,7,0.15);">بانتظار المراجعة</span></td>
                            <td><button class="btn btn-primary" style="padding: 6px 16px; font-size: 0.85rem;" onclick="showAnalysisDetail(\${a.id}, '\${a.childName}', '\${a.aiConfidence}', '\${a.aiSummary}')">مراجعة</button></td>
                        </tr>
                    \`).join('');
                }
            }

            // Reports table
            const reportsTbody = document.getElementById('doc-reports-tbody');
            if (reportsTbody && doctorData.reports) {
                if (doctorData.reports.length === 0) {
                    reportsTbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">لا توجد تقارير</td></tr>';
                } else {
                    reportsTbody.innerHTML = doctorData.reports.map(r => \`
                        <tr>
                            <td>\${r.createdAt || '-'}</td>
                            <td style="font-weight: 600;">\${r.childName || 'طفل'}</td>
                            <td>تقرير</td>
                            <td><span class="badge-dynamic \${r.status === 'sent' ? 'badge-sent' : 'badge-draft'}">\${r.status === 'sent' ? 'أُرسل' : 'مسودة'}</span></td>
                            <td>
                                <button class="btn btn-outline" style="padding: 6px 16px; font-size: 0.85rem;" onclick="showReportDetail(\${r.id}, '\${r.childName}', '\${r.status}')">\${r.status === 'sent' ? 'عرض التقرير' : 'استكمال التقرير'}</button>
                            </td>
                        </tr>
                    \`).join('');
                }
            }

            // Appointments table (adding it here for completeness)
            const apptsTbody = document.querySelector('#appointments-list-section tbody');
            if (apptsTbody && doctorData.appointments) {
                if (doctorData.appointments.length === 0) {
                    apptsTbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">لا توجد مواعيد</td></tr>';
                } else {
                    apptsTbody.innerHTML = doctorData.appointments.map(a => \`
                        <tr>
                            <td style="font-weight: 600;">\${a.childName || 'طفل'}</td>
                            <td>\${a.date}</td>
                            <td>\${a.time}</td>
                            <td>متابعة</td>
                            <td><span class="badge-dynamic" style="\${a.status === 'Pending' ? 'background: #fff3cd; color: #856404;' : (a.status === 'Approved' ? 'background: #d4edda; color: #155724;' : 'background: #e2e3e5; color: #383d41;')}">\${a.status}</span></td>
                            <td><button class="btn btn-primary" style="padding: 6px 16px; font-size: 0.85rem;" onclick="showAppointmentDetail(\${a.id}, '\${a.childName}', '\${a.status}')">إدارة الجلسة</button></td>
                        </tr>
                    \`).join('');
                }
            }

            // Profile
            if (doctorData.profile) {
                const nameEl = document.getElementById('doc-profile-name');
                const emailEl = document.getElementById('doc-profile-email');
                const phoneEl = document.getElementById('doc-profile-phone');
                if(nameEl) nameEl.textContent = doctorData.profile.fullName;
                if(emailEl) emailEl.value = doctorData.profile.email;
                if(phoneEl) phoneEl.value = doctorData.profile.phone || 'غير مسجل';
            }
        }
        
        async function submitAnalysisReview(status) {
            const notes = document.getElementById('analysis-review-notes').value;
            try {
                const res = await fetch(\`/api/analyses/\${currentAnalysisId}/review\`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ doctorReview: notes, doctorRecommendations: notes, status: status })
                });
                if(res.ok) {
                    alert('تم حفظ المراجعة بنجاح');
                    await refreshDoctorData();
                    showSection('review-list-section');
                }
            } catch(e) { console.error(e); }
        }

        async function updateAppointmentStatus(status) {
            try {
                const res = await fetch(\`/api/appointments/\${currentApptId}\`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ status: status })
                });
                if(res.ok) {
                    alert('تم تحديث حالة الموعد');
                    await refreshDoctorData();
                    showSection('appointments-list-section');
                }
            } catch(e) { console.error(e); }
        }

        async function loadConversations() {
            try {
                const res = await fetch(\`/api/users/\${doctorId}/conversations\`);
                const data = await res.json();
                conversations = data || [];
                
                const chatList = document.getElementById('doc-chat-list');
                if (!chatList) return;
                
                if (conversations.length === 0) {
                    chatList.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--color-text-muted);">لا توجد محادثات حتى الآن</div>';
                } else {
                    chatList.innerHTML = conversations.map(c => \`
                        <div class="chat-item \${activeConversationId === c.id ? 'active' : ''}" onclick="switchChat(this, \${c.id}, '\${c.otherParticipantName}', \${c.otherParticipantId})">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                <h4 style="margin: 0; font-size: 0.95rem; color: var(--color-text-main);">\${c.otherParticipantName}</h4>
                                <span style="font-size: 0.75rem; color: var(--color-text-muted);">\${c.updatedAt ? new Date(c.updatedAt).toLocaleTimeString('ar-SA', {hour: '2-digit', minute:'2-digit'}) : ''}</span>
                            </div>
                        </div>
                    \`).join('');
                }
            } catch(e) {
                console.error("Failed to load conversations:", e);
            }
        }

        async function switchChat(element, convId, otherParticipantName, otherParticipantId) {
            const items = document.querySelectorAll('.chat-item');
            items.forEach(i => i.classList.remove('active'));
            if(element) element.classList.add('active');

            activeConversationId = convId;
            activeParentId = otherParticipantId;

            document.getElementById('chat-header-empty').style.display = 'none';
            document.getElementById('chat-active-area').style.display = 'flex';
            document.getElementById('active-chat-parent-name').innerText = otherParticipantName;
            
            const msgArea = document.getElementById('chat-messages-container');
            msgArea.innerHTML = '<div style="text-align: center; color: var(--color-text-muted);">جاري تحميل الرسائل...</div>';
            
            if (!convId) return;
            
            try {
                const res = await fetch(\`/api/conversations/\${convId}/messages\`);
                const msgs = await res.json();
                
                msgArea.innerHTML = msgs.map(m => \`
                    <div class="chat-bubble \${m.senderId == doctorId ? 'sent' : 'received'}">
                        <p style="margin: 0;">\${m.message}</p>
                    </div>
                \`).join('');
                msgArea.scrollTop = msgArea.scrollHeight;
            } catch(e) {
                console.error(e);
            }
        }

        async function sendMessage() {
            const input = document.getElementById('chat-message-input');
            const text = input.value.trim();
            if(!text || !activeParentId) return;
            
            try {
                const res = await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        senderId: doctorId,
                        receiverId: activeParentId,
                        message: text
                    })
                });
                const data = await res.json();
                if (data.success) {
                    input.value = '';
                    await loadConversations();
                    if (data.conversationId) {
                        const c = conversations.find(x => x.id === data.conversationId);
                        if(c) switchChat(null, c.id, c.otherParticipantName, c.otherParticipantId);
                    }
                }
            } catch(e) {
                console.error("Failed to send message:", e);
            }
        }

        async function refreshDoctorData() {
            try {
                const res = await fetch(\`/api/doctors/\${doctorId}/data\`);
                doctorData = await res.json();
                renderDoctorDashboard();
            } catch(e) { console.error('Failed to refresh data:', e); }
        }
    </script>`;

content = content.substring(0, scriptStart) + newScript + content.substring(scriptEnd);

fs.writeFileSync(htmlPath, content);
console.log('doctor.html updated successfully.');
