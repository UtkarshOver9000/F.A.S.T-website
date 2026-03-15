const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'assets', 'gallery');
const dest = path.join(root, 'public', 'assets', 'gallery');

if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

const files = fs.readdirSync(src).filter((f) => fs.statSync(path.join(src, f)).isFile());

files.forEach((f, i) => {
  const ext = path.extname(f);
  const target = path.join(dest, `gallery-${i + 1}${ext}`);
  fs.copyFileSync(path.join(src, f), target);
});

console.log(`copied ${files.length} files to ${dest}`);
