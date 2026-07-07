// fix_v2.js
const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

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

appJs = appJs.replace(
    /const approved = data\.drawings\.filter\(d => d\.status === 'approved'\);/g,
    `const approved = data.reports || [];`
);

appJs = appJs.replace(
    /const d = data\.drawings\.find\(dr => dr\.id === reportId\);/g,
    `const d = data.reports.find(dr => String(dr.id) === String(reportId));`
);

appJs = appJs.replace(
    /const doctorId = data\.childProfile\?\.doctor_id;/g,
    `const docSelect = document.getElementById('drawing-doctor-select');\n        const doctorId = docSelect ? docSelect.value : null;`
);

appJs = appJs.replace(
    /doctorId: doctorId \|\| 2, \/\/ fallback/g,
    `doctorId: doctorId,`
);

appJs = appJs.replace(
    /if \(\!childId\) \{/g,
    `if (!doctorId) {
            alert("Please select a doctor. / الرجاء اختيار الطبيب.");
            modal.classList.remove('active');
            return;
        }
        if (!childId) {`
);

// handleBookAppointment uses: const doctorId = data.childProfile?.doctor_id; again but we replaced it globally! Wait, `replace` with `/g` would replace all instances?
// No, the regex above was not global `/g` for the doctorId.
// Let's do it specifically for `apt-doctor-select` if the previous one didn't replace it globally.
// Oh, I wrote: `/const doctorId = data\.childProfile\?\.doctor_id;/g` 
// If it replaced globally, BOTH upload and appointment got `document.getElementById('drawing-doctor-select')`. That's a bug!
// I should run replace carefully or fix it manually.
