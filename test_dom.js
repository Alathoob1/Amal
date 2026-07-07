const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('admin.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on('error', (err) => {
    console.log('CONSOLE ERROR:', err);
});
virtualConsole.on('jsdomError', (err) => {
    console.log('JSDOM ERROR:', err);
});
virtualConsole.on('warn', (warn) => {
    console.log('CONSOLE WARN:', warn);
});

const dom = new JSDOM(html, { 
    runScripts: 'dangerously', 
    resources: 'usable',
    url: "http://localhost:3000/admin.html",
    virtualConsole 
});

setTimeout(() => {
    console.log('Done checking');
    process.exit(0);
}, 2000);
