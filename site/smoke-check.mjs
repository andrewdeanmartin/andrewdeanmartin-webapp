#!/usr/bin/env node
/**
 * Fast smoke check — no browser required.
 * Usage: node smoke-check.mjs [baseUrl]
 * Default baseUrl: http://127.0.0.1:8080
 */
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = (process.argv[2] || 'http://127.0.0.1:8080').replace(/\/$/, '');

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, (res) => {
        res.resume();
        resolve(res.statusCode);
      })
      .on('error', reject);
  });
}

const localAssets = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/prompt-demo.js',
  '/reliability-calc.js',
  '/space-invaders.js',
  '/favicon.svg',
  '/og-image.png',
  '/agent-pipeline-run/',
  '/agent-pipeline-run/00-input-schemas.json',
  '/private/login.html',
];

const ids = ['hero', 'about', 'capabilities', 'demos', 'impact', 'connect', 'main-content'];
const demoIds = ['demo-pipeline', 'demo-prompt', 'demo-assessment', 'demo-reliability'];

let failed = 0;

console.log(`Smoke check: ${base}\n`);

for (const asset of localAssets) {
  const code = await fetch(base + asset);
  const ok = code >= 200 && code < 400;
  console.log(`${ok ? '✓' : '✗'} ${asset} → ${code}`);
  if (!ok) failed++;
}

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
for (const id of ids) {
  const ok = html.includes(`id="${id}"`);
  console.log(`${ok ? '✓' : '✗'} section #${id}`);
  if (!ok) failed++;
}
for (const id of demoIds) {
  const ok = html.includes(`id="${id}"`);
  console.log(`${ok ? '✓' : '✗'} demo #${id}`);
  if (!ok) failed++;
}

const ogPath = path.join(__dirname, 'og-image.png');
if (fs.existsSync(ogPath)) {
  // PNG IHDR width/height at bytes 16–23 (big-endian)
  const buf = fs.readFileSync(ogPath);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  const ogOk = w === 1200 && h === 630;
  console.log(`${ogOk ? '✓' : '✗'} og-image.png ${w}×${h} (want 1200×630)`);
  if (!ogOk) failed++;
}

console.log(failed ? `\n${failed} check(s) failed.` : '\nAll smoke checks passed.');
process.exit(failed ? 1 : 0);
