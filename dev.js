const { spawn } = require('child_process');

console.log('Starting Aegis ERP Dev Servers...');

// Spawn node server.js
const server = spawn('node', ['server.js'], {
  stdio: 'inherit'
});

// Spawn vite dev server via local npx
const vite = spawn('npx', ['vite'], {
  stdio: 'inherit'
});

let isCleaningUp = false;
function cleanup() {
  if (isCleaningUp) return;
  isCleaningUp = true;
  console.log('\nShutting down dev servers...');
  server.kill('SIGINT');
  vite.kill('SIGINT');
  // Wait a moment before exiting to let children clean up
  setTimeout(() => {
    process.exit(0);
  }, 500);
}

// Handle child exits
server.on('exit', (code) => {
  if (!isCleaningUp) {
    console.log(`Backend server exited with code ${code}`);
    cleanup();
  }
});

vite.on('exit', (code) => {
  if (!isCleaningUp) {
    console.log(`Vite dev server exited with code ${code}`);
    cleanup();
  }
});

// Handle termination signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('SIGHUP', cleanup);
