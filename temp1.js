
        function showSection(sectionId, element) {
            const sections = document.querySelectorAll('.section-content');
            sections.forEach(sec => sec.style.display = 'none');
            
            const targetSection = document.getElementById(sectionId);
            if(targetSection) targetSection.style.display = 'block';
            
            if(element && element.tagName === 'A') {
                const links = document.querySelectorAll('.sidebar-nav a');
                links.forEach(link => link.classList.remove('active'));
                element.classList.add('active');
            } else if(sectionId) {
                const links = document.querySelectorAll('.sidebar-nav a');
                links.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        }

        function showPatientProfile(name) {
            document.getElementById('profile-patient-name').innerText = name;
            showSection('patient-profile-section');
        }

        function showProfileTab(tabId, element) {
            const tabs = document.querySelectorAll('.profile-tab-content');
            tabs.forEach(tab => tab.classList.remove('active'));
            const btns = document.querySelectorAll('.profile-tab');
            btns.forEach(btn => btn.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            element.classList.add('active');
        }

        function showAnalysisDetail(name) {
            document.getElementById('analysis-patient-name').innerText = name;
            showSection('analysis-detail-section');
        }

        function showReportDetail(name, status) {
            document.getElementById('report-child-name').innerText = name;
            const btnSend = document.getElementById('btn-rep-send');
            const btnEdit = document.getElementById('btn-rep-edit');
            const btnComp = document.getElementById('btn-rep-complete');
            const badge = document.getElementById('report-sent-badge');
            
            btnSend.style.display = 'none';
            btnEdit.style.display = 'none';
            btnComp.style.display = 'none';
            badge.style.display = 'none';

            if(status === 'ready') {
                btnSend.style.display = 'inline-block';
                btnEdit.style.display = 'inline-block';
            } else if(status === 'sent') {
                badge.style.display = 'block';
            } else if(status === 'edit') {
                btnEdit.style.display = 'inline-block';
            } else if(status === 'draft') {
                btnComp.style.display = 'inline-block';
            }
            showSection('report-detail-section');
        }

        function showAppointmentDetail(name) {
            showSection('appointment-detail-section');
        }

        // Old switchChat removed to fix SyntaxError
        function renderDoctorDashboard() {
            if (!doctorData) return;
            
            // 1. Populate stats
            document.getElementById('stat-patients').textContent = doctorData.patients?.length || 0;
            document.getElementById('stat-pending').textContent = doctorData.pendingAnalyses?.length || 0;
            document.getElementById('stat-appointments').textContent = doctorData.appointments?.length || 0;

            // 2. Populate Patients table
            const patientsTbody = document.getElementById('doc-patients-tbody');
            if (patientsTbody && doctorData.patients) {
                if (doctorData.patients.length === 0) {
                    patientsTbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">لا يوجد مرضى مسجلين</td></tr>';
                } else {
                    patientsTbody.innerHTML = doctorData.patients.map(p => `
                        <tr>
                            <td style="font-weight: 600; color: var(--color-primary);">${p.name}</td>
                            <td>${p.age || '-'} سنوات</td>
                            <td><span class="badge-dynamic" style="background: rgba(226,125,96,0.15); color: #E27D60;">${p.autism_level || '-'}</span></td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td><span style="color: #3B5E39; font-weight: 600; font-size: 0.85rem;">نشط</span></td>
                            <td><button class="btn btn-outline" style="padding: 6px 16px; font-size: 0.85rem; border-radius: 6px;" onclick="showPatientProfile('${p.name}')">فتح الملف</button></td>
                        </tr>
                    `).join('');
                }
            }

            // 3. Populate AI Analyses Reviews table
            const reviewsTbody = document.getElementById('doc-reviews-tbody');
            if (reviewsTbody && doctorData.pendingAnalyses) {
                if (doctorData.pendingAnalyses.length === 0) {
                    reviewsTbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">لا توجد تحليلات بانتظار المراجعة</td></tr>';
                } else {
                    reviewsTbody.innerHTML = doctorData.pendingAnalyses.map(d => `
                        <tr>
                            <td style="font-weight: 600;">${d.child_name || 'طفل'}</td>
                            <td>${d.upload_date}</td>
                            <td><span class="badge-dynamic" style="background: rgba(144,180,242,0.15); color: #1D4ED8;">85%</span></td>
                            <td><span class="badge-dynamic badge-edit" style="color: #B7791F; background: rgba(255,193,7,0.15);">بانتظار المراجعة</span></td>
                            <td><button class="btn btn-primary" style="padding: 6px 16px; font-size: 0.85rem;" onclick="showAnalysisDetail('${d.child_name}')">مراجعة</button></td>
                        </tr>
                    `).join('');
                }
            }

            // 4. Populate Reports table
            const reportsTbody = document.getElementById('doc-reports-tbody');
            if (reportsTbody && doctorData.reports) {
                if (doctorData.reports.length === 0) {
                    reportsTbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">لا توجد تقارير</td></tr>';
                } else {
                    reportsTbody.innerHTML = doctorData.reports.map(r => `
                        <tr>
                            <td>${r.date || '-'}</td>
                            <td style="font-weight: 600;">${r.child_name || 'طفل'}</td>
                            <td>-</td>
                            <td><span class="badge-dynamic badge-ready">${r.status === 'pending' ? 'بانتظار المراجعة' : r.status}</span></td>
                            <td>
                                <div class="action-btns">
                                    <button class="btn-icon" title="عرض" onclick="showReportDetail('${r.child_name}', '${r.status}')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                                </div>
                            </td>
                        </tr>
                    `).join('');
                }
            }

            // 6. Populate Messages List
            const chatList = document.getElementById('doc-chat-list');
            if (chatList && doctorData.messages) {
                if (doctorData.messages.length === 0) {
                    chatList.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--color-text-muted);">لا توجد رسائل</div>';
                } else {
                    // Group messages by parent/sender (simplified for demo)
                    const uniqueSenders = [...new Set(doctorData.messages.map(m => m.sender_name === doctorData.profile.name ? m.receiver_name : m.sender_name))];
                    chatList.innerHTML = uniqueSenders.map(sender => {
                        const msgs = doctorData.messages.filter(m => m.sender_name === sender || m.receiver_name === sender);
                        const lastMsg = msgs[msgs.length - 1];
                        return `
                            <div class="chat-item" onclick="switchChat(this, '${sender}', '...', false, '${sender}')">
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                                    <h4 style="margin: 0; font-size: 0.95rem; color: var(--color-text-main);">${sender}</h4>
                                    <span style="font-size: 0.75rem; color: var(--color-text-muted);">${lastMsg.time || '-'}</span>
                                </div>
                                <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${lastMsg.text}</p>
                            </div>
                        `;
                    }).join('');
                }
            }

            // 7. Populate Profile
            if (doctorData.profile) {
                const nameEl = document.getElementById('doc-profile-name');
                const emailEl = document.getElementById('doc-profile-email');
                const phoneEl = document.getElementById('doc-profile-phone');
                if(nameEl) nameEl.textContent = doctorData.profile.name;
                if(emailEl) emailEl.value = doctorData.profile.email;
                if(phoneEl) phoneEl.value = doctorData.profile.phone || 'غير مسجل';
            }
        }
        
        function switchChat(element, parentName, childName, isNew, sender) {
            const items = document.querySelectorAll('.chat-item');
            items.forEach(i => i.classList.remove('active'));
            element.classList.add('active');

            document.getElementById('chat-header-empty').style.display = 'none';
            document.getElementById('chat-active-area').style.display = 'flex';
            document.getElementById('active-chat-parent-name').innerText = parentName;
            document.getElementById('active-chat-child-name').innerText = childName;
            
            const msgArea = document.getElementById('chat-messages-container');
            const msgs = doctorData.messages.filter(m => m.sender_name === sender || m.receiver_name === sender);
            msgArea.innerHTML = msgs.map(m => `
                <div class="chat-bubble ${m.sender_name === doctorData.profile.name ? 'sent' : 'received'}">
                    <p style="margin: 0;">${m.text}</p>
                    <div style="font-size: 0.75rem; color: ${m.sender_name === doctorData.profile.name ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)'}; text-align: left; margin-top: 4px;">${m.time || ''}</div>
                </div>
            `).join('');
        }

        // Wrap initDoctorApp to auto-refresh UI on actions
        async function refreshDoctorData() {
            try {
                const API_BASE = (window.location.protocol === 'file:' || window.location.port !== '3000') ? 'http://localhost:3000' : '';
                const res = await fetch(API_BASE + `/api/doctors/${doctorId}/data`);
                doctorData = await res.json();
                renderDoctorDashboard();
            } catch(e) { console.error('Failed to refresh data:', e); }
        }
    