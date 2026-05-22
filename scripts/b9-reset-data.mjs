#!/usr/bin/env node
/**
 * Reset all B9 server data (sessions, workspace, stack). Admin only.
 *
 * Usage:
 *   node scripts/b9-reset-data.mjs --target prod --password "$B9_ACCESS_PASSWORD"
 *   node scripts/b9-reset-data.mjs --target local --password b9local
 */
import https from 'https';
import http from 'http';

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const target = arg('--target', 'prod');
const isProd = target === 'prod';
const SITE = isProd ? 'https://www.andrewdeanmartin.com' : arg('--site', 'http://127.0.0.1:8081');
const API = isProd ? 'https://www.andrewdeanmartin.com/b9-api' : arg('--api', 'http://127.0.0.1:3001');
const PASSWORD = arg('--password', process.env.B9_E2E_PASSWORD || process.env.B9_ACCESS_PASSWORD || 'b9local');
const ADMIN_KEY = arg('--admin-key', process.env.B9_ADMIN_API_KEY || process.env.ADMIN_API_KEY);
const BACKUP = args.includes('--backup');

function lib(url) {
  return url.startsWith('https') ? https : http;
}

function request(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const body = opts.body || null;
    const headers = { ...(opts.headers || {}) };
    if (body) headers['Content-Length'] = Buffer.byteLength(body);
    const req = lib(url).request(u, { method: opts.method || 'GET', headers }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8');
        let json = {};
        try {
          json = text ? JSON.parse(text) : {};
        } catch {
          json = { raw: text };
        }
        resolve({ status: res.statusCode, json, text });
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function main() {
  console.log(`Resetting B9 data (${target})…`);

  let auth;
  if (ADMIN_KEY) {
    auth = { 'x-admin-key': ADMIN_KEY, 'Content-Type': 'application/json' };
    console.log('Using admin API key');
  } else {
    const login = await request(`${SITE}/api/b9-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: PASSWORD, role: 'admin' }),
    });

    if (login.status !== 200 || !login.json.token) {
      console.error('Admin login failed:', login.status, login.text || login.json);
      console.error('Tip: pass --admin-key from Render ADMIN_API_KEY, or --password for admin login');
      process.exit(1);
    }

    auth = { Authorization: `Bearer ${login.json.token}`, 'Content-Type': 'application/json' };
  }

  if (BACKUP) {
    const backup = await request(`${API}/v1/admin/backup`, { headers: auth });
    if (backup.status === 200) {
      const fs = await import('fs');
      const path = `b9-store-backup-${new Date().toISOString().slice(0, 10)}.json`;
      fs.writeFileSync(path, JSON.stringify(backup.json, null, 2));
      console.log(`Backup saved: ${path}`);
    } else {
      console.warn('Backup skipped:', backup.status, backup.text);
    }
  }

  const reset = await request(`${API}/v1/admin/reset`, {
    method: 'POST',
    headers: auth,
    body: JSON.stringify({ confirm: true }),
  });

  if (reset.status !== 200) {
    console.error('Reset failed:', reset.status, reset.text || reset.json);
    process.exit(1);
  }

  console.log('Reset complete:', reset.json);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
