const { spawn } = require('child_process');
const net = require('net');

const START_PORT = 8080;
const MAX_PORT = 8100;

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createConnection({ port, host: '127.0.0.1' })
      .on('error', () => resolve(true))
      .on('connect', () => {
        tester.destroy();
        resolve(false);
      });
    tester.setTimeout(500);
    tester.on('timeout', () => {
      tester.destroy();
      resolve(true);
    });
  });
}

async function findAvailablePort() {
  for (let port = START_PORT; port <= MAX_PORT; port++) {
    const available = await isPortAvailable(port);
    if (!available) {
      console.log(`Port ${port} is in use, trying next...`);
    } else {
      return port;
    }
  }
  throw new Error(`No available port found between ${START_PORT} and ${MAX_PORT}`);
}

async function startServer() {
  try {
    console.log('Scanning for available port...\n');
    const port = await findAvailablePort();
    console.log(`\x1b[32m✓ Found available port: ${port}\x1b[0m`);
    console.log(`\x1b[36m→ Starting server at http://localhost:${port}\x1b[0m\n`);
    
    const child = spawn('npx', ['http-server', '-p', port.toString(), '-o'], {
      stdio: 'inherit',
      shell: true
    });
    
    child.on('error', (err) => {
      console.error('Failed to start server:', err);
    });
    
  } catch (err) {
    console.error('\x1b[31mError:', err.message, '\x1b[0m');
    process.exit(1);
  }
}

startServer();
