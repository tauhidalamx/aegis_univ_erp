const { spawn } = require('child_process');

console.log('Starting Aegis ERP Dev Servers...');

// Spawn node server.js
const server = spawn('node', ['server.js'], {
  stdio: 'inherit'
});

// Spawn next dev server via local npx on port 3000
const nextDev = spawn('npx', ['next', 'dev', '-p', '3000', '--webpack'], {
  stdio: 'inherit'
});

let isCleaningUp = false;
function cleanup() {
  if (isCleaningUp) return;
  isCleaningUp = true;
  console.log('\nShutting down dev servers...');
  server.kill('SIGINT');
  nextDev.kill('SIGINT');
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

nextDev.on('exit', (code) => {
  if (!isCleaningUp) {
    console.log(`Next.js dev server exited with code ${code}`);
    cleanup();
  }
});

// Handle termination signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('SIGHUP', cleanup);
