const fs = require('fs');
const path = require('path');

// List of files to process
const files = [
  'contribute.js',
  'index.html',
  'developer.html',
  'pending.html',
  'styles.css',
];

function stripComments(content, ext) {
  if (ext === '.js') {
    // Remove single-line // comments (not inside URLs) and multi-line /* */
    // First remove multi-line comments
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    // Then remove // comments
    content = content.replace(/([^:]|^)\/\/.*$/gm, '$1');
  } else if (ext === '.html') {
    // Remove HTML comments <!-- ... -->
    content = content.replace(/<!--[\s\S]*?-->/g, '');
  } else if (ext === '.css') {
    // Remove CSS comments /* ... */
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  }
  return content;
}

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  const ext = path.extname(file);
  const original = fs.readFileSync(filePath, 'utf8');
  const stripped = stripComments(original, ext);
  fs.writeFileSync(filePath, stripped, 'utf8');
  console.log(`Processed ${file}`);
});
