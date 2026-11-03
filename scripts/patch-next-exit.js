const fs = require('fs');
const path = require('path');

const filesToPatch = [
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'server', 'lib', 'start-server.js'),
  path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'esm', 'server', 'lib', 'start-server.js'),
];

filesToPatch.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('process.exit(code ?? 0)')) {
      content = content.replace(/process\.exit\(code \?\? 0\)/g, 'process.exit(typeof code === "number" ? code : 0)');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[patch] Patched ${path.relative(path.join(__dirname, '..'), filePath)} for Node 20+ / Node 24 SIGINT compatibility.`);
    }
  }
});

