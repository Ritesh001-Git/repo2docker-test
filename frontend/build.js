const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'src'), { recursive: true });
for (const file of ['index.html']) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}
fs.copyFileSync(path.join(root, 'src', 'main.js'), path.join(dist, 'src', 'main.js'));
fs.copyFileSync(path.join(root, 'src', 'style.css'), path.join(dist, 'src', 'style.css'));
console.log('Static frontend built successfully into dist/');
