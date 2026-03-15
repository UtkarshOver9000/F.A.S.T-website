const fs = require('fs');
const path = require('path');

const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
const buf = Buffer.from(base64, 'base64');
const destDir = path.join(__dirname, '..', 'public', 'assets', 'gallery');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

for (let i = 1; i <= 10; i++) {
  const p = path.join(destDir, `gallery${i}.png`);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, buf);
  }
}

console.log('ensured gallery1-10 png exist');
