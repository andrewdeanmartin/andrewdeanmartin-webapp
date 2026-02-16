#!/usr/bin/env node
/**
 * Start the portfolio site and run the QA test suite automatically.
 * Usage: node run-site-and-test.js
 * 
 * - Starts Python HTTP server on port 8080 (or 8081 if 8080 is in use)
 * - Waits for the server to respond
 * - Runs Puppeteer tests in headless mode
 * - Stops the server when done
 */

const { spawn } = require('child_process');
const path = require('path');
const http = require('http');
const fs = require('fs');

const PORT = 8080;
const siteDir = path.join(__dirname, 'site');
const serverScript = path.join(__dirname, 'qa-test.js');

function waitForServer(port, maxAttempts = 20) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      const req = http.get(`http://127.0.0.1:${port}/`, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        attempts++;
        if (attempts >= maxAttempts) {
          reject(new Error(`Server did not respond after ${maxAttempts} attempts`));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

function runPythonServer() {
  return spawn('python3', ['-m', 'http.server', String(PORT)], {
    cwd: siteDir,
    stdio: ['ignore', 'pipe', 'pipe']
  });
}

function runTests() {
  return new Promise((resolve, reject) => {
    const child = spawn('node', [serverScript], {
      cwd: __dirname,
      env: { ...process.env, HEADLESS: 'true' },
      stdio: 'inherit'
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Tests exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

async function main() {
  let serverProcess = null;

  // Check if 8080 already responds (user may have started server)
  const checkExisting = () => new Promise((r) => {
    const req = http.get(`http://127.0.0.1:${PORT}/`, (res) => { res.resume(); r(true); });
    req.on('error', () => r(false));
  });

  if (await checkExisting()) {
    console.log(`Server already running at http://127.0.0.1:${PORT}. Running QA tests (headless)...\n`);
    await runTests();
    return;
  }

  serverProcess = runPythonServer();
  let started = false;
  serverProcess.on('exit', (code) => {
    if (!started && code !== 0) {
      console.error('Server failed to start (e.g. port in use). Start manually: cd site && python3 -m http.server 8080');
    }
  });

  await new Promise((r) => setTimeout(r, 600));
  const exited = await new Promise((r) => {
    const t = setTimeout(() => r(false), 400);
    serverProcess.on('exit', () => { clearTimeout(t); r(true); });
  });

  if (exited) {
    console.error('Port 8080 may be in use. Start the site manually: cd site && python3 -m http.server 8080');
    console.error('Then run: npm run test:headless');
    process.exit(1);
  }

  started = true;
  serverProcess.stderr.on('data', (d) => process.stderr.write(d));
  serverProcess.stdout.on('data', (d) => process.stdout.write(d));

  try {
    console.log(`Starting server at http://127.0.0.1:${PORT} ...`);
    await waitForServer(PORT);
    console.log('Server ready. Running QA tests (headless)...\n');
    await runTests();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    if (serverProcess) serverProcess.kill();
    console.log('\nServer stopped.');
  }
}

main();
