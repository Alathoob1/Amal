const fs = require('fs');
let c = fs.readFileSync('server.js', 'utf8');
c = c.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('server.js', c);
console.log('Fixed server.js');
