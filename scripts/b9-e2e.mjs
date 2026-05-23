#!/usr/bin/env node
/**
 * B9 portal end-to-end smoke test (no browser).
 *
 * Usage:
 *   node scripts/b9-e2e.mjs --target local
 *   node scripts/b9-e2e.mjs --target prod --password "$B9_E2E_PASSWORD"
 */
import http from 'http';
import https from 'https';

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
}

const target = arg('--target', 'local');
const isProd = target === 'prod';

const SITE = isProd
  ? 'https://www.andrewdeanmartin.com'
  : arg('--site', 'http://127.0.0.1:8081');
const API = isProd
  ? 'https://www.andrewdeanmartin.com/b9-api'
  : arg('--api', 'http://127.0.0.1:3001');
const PASSWORD = arg('--password', isProd ? process.env.B9_E2E_PASSWORD : 'b9local');

let passed = 0;
let failed = 0;
let skipped = 0;

function lib(url) {
  return url.startsWith('https') ? https : http;
}

function request(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const body = opts.body || null;
    const headers = { ...(opts.headers || {}) };
    if (body) headers['Content-Length'] = Buffer.byteLength(body);
    const req = lib(url).request(
      u,
      {
        method: opts.method || 'GET',
        headers,
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const text = Buffer.concat(chunks).toString('utf8');
          resolve({ status: res.statusCode, headers: res.headers, body: text });
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

function ok(label) {
  console.log(`  ✓ ${label}`);
  passed++;
}

function fail(label, detail) {
  console.log(`  ✗ ${label}${detail ? ` — ${detail}` : ''}`);
  failed++;
}

function skip(label, reason) {
  console.log(`  ○ ${label} (skipped: ${reason})`);
  skipped++;
}

async function step(name, fn) {
  process.stdout.write(`\n${name}\n`);
  await fn();
}

async function main() {
  console.log(`B9 E2E — target: ${target}`);
  console.log(`  site: ${SITE}`);
  console.log(`  api:  ${API}`);

  let token = null;
  let role = 'pete';

  await step('1. Infrastructure', async () => {
    const health = await request(`${API}/health`);
    if (health.status === 200 && health.body.includes('"ok"')) ok('API /health');
    else fail('API /health', `HTTP ${health.status}`);

    for (const path of ['/b9/login', '/b9/b9.css', '/b9/knowledge/process-map.json']) {
      const r = await request(`${SITE}${path}`);
      if (r.status >= 200 && r.status < 400) ok(`GET ${path}`);
      else fail(`GET ${path}`, `HTTP ${r.status}`);
    }

    const proxy = isProd ? null : await request(`${SITE}/b9-api/health`).catch(() => null);
    if (isProd) skip('Vercel /b9-api proxy', 'tested via API URL above');
    else if (proxy && proxy.status === 200) ok('Local note: proxy N/A (direct API)');
  });

  await step('2. Auth', async () => {
    if (!PASSWORD) {
      skip('Login', 'set --password or B9_E2E_PASSWORD');
      return;
    }

    const bad = await request(`${SITE}/api/b9-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: '__wrong__', role: 'pete' }),
    });
    if (bad.status === 401) ok('Wrong password → 401');
    else fail('Wrong password', `HTTP ${bad.status}`);

    const good = await request(`${SITE}/api/b9-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: PASSWORD, role: 'pete' }),
    });
    let data;
    try {
      data = JSON.parse(good.body);
    } catch {
      fail('Login JSON', good.body.slice(0, 80));
      return;
    }
    if (good.status === 200 && data.ok && data.token) {
      ok(`Login as ${data.role}`);
      token = data.token;
      role = data.role;
    } else if (data.error === 'not_configured') {
      fail('Login', 'B9_JWT_SECRET not configured on Vercel');
    } else {
      fail('Login', `HTTP ${good.status} ${good.body}`);
    }
  });

  const authHeaders = token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : null;

  await step('3. Shared workspace', async () => {
    if (!authHeaders) {
      skip('Workspace', 'no token');
      return;
    }

    const patch = {
      workspace: {
        tomTargets: { 'discovery-scoping': 'low' },
        baselines: { quoteTurnaround: 'e2e-test-3-days' },
        lastVisited: { page: 'processes', processId: 'discovery-scoping' },
      },
    };
    const put = await request(`${API}/v1/client/workspace`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(patch),
    });
    const putData = JSON.parse(put.body || '{}');
    if (put.status === 200 && putData.workspace?.baselines?.quoteTurnaround === 'e2e-test-3-days') {
      ok('PUT /v1/client/workspace');
    } else fail('PUT workspace', `HTTP ${put.status} ${put.body.slice(0, 120)}`);

    const get = await request(`${API}/v1/client/workspace`, { headers: authHeaders });
    const getData = JSON.parse(get.body || '{}');
    if (
      get.status === 200 &&
      getData.workspace?.tomTargets?.['discovery-scoping'] === 'low'
    ) {
      ok('GET /v1/client/workspace (sync verified)');
    } else fail('GET workspace', `HTTP ${get.status}`);
  });

  await step('4. Stack profile', async () => {
    if (!authHeaders) {
      skip('Stack profile', 'no token');
      return;
    }
    const profile = {
      profile: {
        filledBy: 'e2e-test',
        opsHub: 'Spreadsheets',
        email: 'Google Workspace',
      },
    };
    const put = await request(`${API}/v1/client/stack-profile`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify(profile),
    });
    if (put.status === 200) ok('PUT /v1/client/stack-profile');
    else fail('PUT stack profile', `HTTP ${put.status}`);
  });

  let sessionId = null;

  await step('5. Discover session', async () => {
    if (!authHeaders) {
      skip('Discover', 'no token');
      return;
    }
    const create = await request(`${API}/v1/sessions`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ role, tracks: ['setup'] }),
    });
    const created = JSON.parse(create.body || '{}');
    if (create.status === 200 || create.status === 201) {
      sessionId = created.id || created.session?.id;
      if (sessionId) ok(`POST /v1/sessions → ${sessionId.slice(0, 8)}…`);
      else fail('Create session', 'no id in response');
    } else fail('Create session', `HTTP ${create.status} ${create.body.slice(0, 120)}`);

    if (!sessionId) return;

    const q = await request(`${API}/v1/sessions/${sessionId}/next-question`, {
      headers: authHeaders,
    });
    const qData = JSON.parse(q.body || '{}');
    if (q.status === 200 && qData.question) ok('GET next-question');
    else fail('Next question', `HTTP ${q.status}`);

    if (qData.question?.id) {
      const ans = await request(`${API}/v1/sessions/${sessionId}/answers`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          questionId: qData.question.id,
          trackId: qData.question.track || qData.trackId || 'setup',
          rawAnswer: 'E2E test answer — automated smoke run.',
          questionText: qData.question.text || qData.question.label || '',
        }),
      });
      if (ans.status === 200 || ans.status === 201) ok('POST answer');
      else fail('Submit answer', `HTTP ${ans.status} ${ans.body.slice(0, 120)}`);
    }
  });

  await step('6. Facilitation pack export', async () => {
    if (!authHeaders) {
      skip('Facilitation pack', 'no token');
      return;
    }
    const pack = await request(`${API}/v1/client/facilitation-pack?format=markdown`, {
      headers: authHeaders,
    });
    if (pack.status === 200 && pack.body.includes('Facilitation Pack')) {
      ok('GET facilitation-pack (markdown)');
    } else fail('Facilitation pack', `HTTP ${pack.status}`);
  });

  await step('7. Admin backup', async () => {
    if (!authHeaders || role !== 'admin') {
      skip('Admin backup', role !== 'admin' ? 'logged in as pete' : 'no token');
      return;
    }
    const backup = await request(`${API}/v1/admin/backup`, { headers: authHeaders });
    if (backup.status === 200 && backup.body.includes('"sessions"')) ok('GET /v1/admin/backup');
    else fail('Admin backup', `HTTP ${backup.status}`);
  });

  console.log(`\n${'—'.repeat(40)}`);
  console.log(`Passed: ${passed}  Failed: ${failed}  Skipped: ${skipped}`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
