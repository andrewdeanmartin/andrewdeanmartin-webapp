import { next } from '@vercel/edge';

const PRIVATE_COOKIE = 'adm_private';
const PRIVATE_MSG = 'admprivate-grant-v1';

const B9_COOKIE = 'adm_b9';
const B9_MSG = 'admb9-grant-v1';

export const config = {
  matcher: [
    '/private',
    '/private/',
    '/private/:path*',
    '/b9',
    '/b9/',
    '/b9/:path*',
  ],
};

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(';')) {
    const i = part.indexOf('=');
    if (i === -1) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    try {
      out[k] = decodeURIComponent(v);
    } catch {
      out[k] = v;
    }
  }
  return out;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let z = 0;
  for (let i = 0; i < a.length; i++) z |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return z === 0;
}

async function hmacHex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function privateToken(secret) {
  return hmacHex(secret, PRIVATE_MSG);
}

async function b9Token(secret, role) {
  return hmacHex(secret, `${B9_MSG}:${role}`);
}

function parseB9Cookie(value) {
  if (!value || !value.includes('.')) return null;
  const dot = value.indexOf('.');
  const role = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  if (!role || !sig) return null;
  return { role, sig };
}

async function handlePrivate(request, path) {
  if (
    path === '/private/login' ||
    path === '/private/login.html' ||
    path === '/private/private.css'
  ) {
    return next();
  }

  const secret = process.env.ADM_PRIVATE_SECRET;
  if (!secret) {
    return Response.redirect(new URL('/private/login?err=config', request.url), 302);
  }

  const cookies = parseCookies(request.headers.get('cookie') || '');
  const got = cookies[PRIVATE_COOKIE] || '';
  const want = await privateToken(secret);

  if (!timingSafeEqual(got, want)) {
    return Response.redirect(new URL('/private/login', request.url), 302);
  }

  return next();
}

async function handleB9(request, path) {
  const publicPaths = new Set([
    '/b9/login',
    '/b9/login.html',
    '/b9/b9.css',
  ]);

  if (
    publicPaths.has(path) ||
    path.startsWith('/b9/js/b9-config') ||
    path.startsWith('/b9/knowledge/')
  ) {
    return next();
  }

  const secret = process.env.B9_JWT_SECRET || process.env.ADM_PRIVATE_SECRET;
  if (!secret) {
    return Response.redirect(new URL('/b9/login?err=config', request.url), 302);
  }

  const cookies = parseCookies(request.headers.get('cookie') || '');
  const parsed = parseB9Cookie(cookies[B9_COOKIE] || '');
  if (!parsed) {
    return Response.redirect(new URL('/b9/login', request.url), 302);
  }

  const want = await b9Token(secret, parsed.role);
  if (!timingSafeEqual(parsed.sig, want)) {
    return Response.redirect(new URL('/b9/login', request.url), 302);
  }

  if (path === '/b9/admin' || path === '/b9/admin.html') {
    if (parsed.role !== 'admin') {
      return Response.redirect(new URL('/b9/?err=admin', request.url), 302);
    }
  }

  return next();
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const path = normalizePath(url.pathname);

  if (path === '/b9' || path.startsWith('/b9/')) {
    return handleB9(request, path);
  }

  return handlePrivate(request, path);
}
