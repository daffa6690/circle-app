const { spawn } = require('child_process');

console.log('\x1b[36m%s\x1b[0m', '➜  App running at: http://circle.local');

// Import open secara dinamis karena dia ESM
import('open').then((open) => {
  open.default('http://circle.local'); // `open` harus pakai `.default`
});

// Jalankan Vite dev server
const vite = spawn('npm', ['run', 'vite'], { stdio: 'inherit' });

vite.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
});
