const fs = require('fs');

const adminPath = 'admin.html';
let content = fs.readFileSync(adminPath, 'utf8');

// Patch logs API
content = content.replace(
    /fetch\('\/api\/logs\?limit=5'\)/g,
    `fetch('/api/admin/logs?limit=5')`
);

// Patch stats mapping
content = content.replace(
    /data\.pendingActivities/g,
    `data.stats.pendingAnalyses` // Note: backend returns data.stats, so it should be data.stats.pendingAnalyses
);
content = content.replace(
    /data\.parents/g,
    `data.stats.parents`
);
content = content.replace(
    /data\.doctors/g,
    `data.stats.doctors`
);
content = content.replace(
    /data\.children/g,
    `data.stats.children`
);
content = content.replace(
    /data\.totalReports/g,
    `data.stats.totalReports`
);
content = content.replace(
    /data\.totalAppointments/g,
    `data.stats.totalAppointments`
);

// Patch Add Doctor mapping
content = content.replace(
    /body:JSON\.stringify\(\{name,email,password:pass\}\)/g,
    `body:JSON.stringify({fullName:name,email,password:pass, phone:'-', specialization:'-', experience:'-'})`
);

// Logs structure
content = content.replace(
    /`<div class="activity-item" style="border-right-color: \$\{log\.color\}">\s*<p style="margin:0; font-weight:600;">\$\{log\.title\}<\/p>\s*<p style="margin:4px 0 0 0; font-size:0\.85rem; color:var\(--color-text-muted\);">\$\{log\.time\}<\/p>\s*<\/div>`/g,
    `\`<div class="activity-item" style="border-right-color: #4CAF50">
           <p style="margin:0; font-weight:600;">\${log.description || log.text}</p>
           <p style="margin:4px 0 0 0; font-size:0.85rem; color:var(--color-text-muted);">\${new Date(log.createdAt).toLocaleString('ar-SA')}</p>
     </div>\``
);

fs.writeFileSync(adminPath, content);
console.log('admin.html patched.');
