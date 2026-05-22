import crypto from 'crypto';

const COOKIE = 'adm_b9';
const MSG = 'admb9-grant-v1';
const ROLES = ['pete', 'brenda', 'staff', 'admin'];

function signToken(secret, role) {
  return crypto.createHmac('sha256', secret).update(`${MSG}:${role}`).digest('hex');
}

function signJwt(secret, payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${sig}`;
}

function jwtSecret() {
  return process.env.B9_JWT_SECRET || process.env.ADM_PRIVATE_SECRET;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve(null);
      }
    });
    req.on('error', reject);
  });
}

function secureCookieSuffix() {
  return process.env.VERCEL_ENV === 'development' ? '' : '; Secure';
}

function resolveRole(password, bodyRole) {
  const secret = process.env.B9_JWT_SECRET || process.env.ADM_PRIVATE_SECRET;
  const rolePasswords = {
    pete: process.env.B9_PETE_PASSWORD,
    brenda: process.env.B9_BRENDA_PASSWORD,
    staff: process.env.B9_STAFF_PASSWORD,
    admin: process.env.B9_ADMIN_PASSWORD,
  };
  const shared = process.env.B9_ACCESS_PASSWORD;

  for (const role of ROLES) {
    const expected = rolePasswords[role];
    if (expected && password === expected) return role;
  }

  if (shared && password === shared) {
    const role = bodyRole && ROLES.includes(bodyRole) ? bodyRole : 'pete';
    return role;
  }

  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  let body =
    req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)
      ? req.body
      : await readJsonBody(req);
  if (!body || typeof body.password !== 'string') {
    res.status(400).json({ ok: false });
    return;
  }

  const secret = jwtSecret();
  if (!secret) {
    res.status(503).json({ ok: false, error: 'not_configured' });
    return;
  }

  const role = resolveRole(body.password, body.role);
  if (!role) {
    res.status(401).json({ ok: false });
    return;
  }

  const token = signToken(secret, role);
  const cookieValue = `${role}.${token}`;
  const maxAge = 60 * 60 * 24 * 7;
  res.setHeader(
    'Set-Cookie',
    `${COOKIE}=${encodeURIComponent(cookieValue)}; Path=/b9; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureCookieSuffix()}`
  );

  const jwt = signJwt(secret, {
    role,
    sub: role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + maxAge,
  });

  res.status(200).json({ ok: true, role, token: jwt });
}
