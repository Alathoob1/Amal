const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/HUAWEI/Desktop/VibeCoding';

// This regex targets all emoji characters, extended pictographics, and modifiers
const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F]/gu;

function scanDir(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'assets' && file !== 'beacon-light-world-main') {
        scanDir(fullPath);
      }
    } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      
      // Clean up emojis
      content = content.replace(emojiRegex, '');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Removed emojis from', fullPath);
      }
    }
  }
}

scanDir(dir);
console.log('Done');
