#!/usr/bin/env python3
"""Static site server with Vercel-style cleanUrls and local B9 auth stub."""
from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import unquote, urlparse, urlunparse

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'site'))
ENV_LOCAL = os.path.join(ROOT, '.env.local')
B9_MSG = 'admb9-grant-v1'
ROLES = ('pete', 'brenda', 'staff', 'admin')


def load_env_local() -> dict[str, str]:
    out: dict[str, str] = {}
    if not os.path.isfile(ENV_LOCAL):
        return out
    with open(ENV_LOCAL, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, val = line.split('=', 1)
            out[key.strip()] = val.strip()
    return out


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode('ascii').rstrip('=')


def sign_jwt(secret: str, payload: dict) -> str:
    header = b64url(json.dumps({'alg': 'HS256', 'typ': 'JWT'}, separators=(',', ':')).encode())
    body = b64url(json.dumps(payload, separators=(',', ':')).encode())
    sig = hmac.new(secret.encode(), f'{header}.{body}'.encode(), hashlib.sha256).digest()
    return f'{header}.{body}.{b64url(sig)}'


def resolve_role(password: str, body_role: str | None, env: dict[str, str]) -> str | None:
    role_passwords = {
        'pete': env.get('B9_PETE_PASSWORD'),
        'brenda': env.get('B9_BRENDA_PASSWORD'),
        'staff': env.get('B9_STAFF_PASSWORD'),
        'admin': env.get('B9_ADMIN_PASSWORD'),
    }
    for role in ROLES:
        expected = role_passwords.get(role)
        if expected and password == expected:
            return role
    shared = env.get('B9_ACCESS_PASSWORD')
    if shared and password == shared:
        if body_role in ROLES:
            return body_role
        return 'pete'
    return None


class CleanUrlHandler(SimpleHTTPRequestHandler):
    allow_reuse_address = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        path = urlparse(self.path).path
        if path == '/api/b9-auth':
            env = load_env_local()
            secret = env.get('B9_JWT_SECRET') or env.get('ADM_PRIVATE_SECRET')
            self._json_response(200, {'ok': True, 'service': 'b9-auth', 'ready': bool(secret)})
            return
        self.path = self._resolve_clean_url(self.path)
        return super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path
        if path == '/api/b9-auth':
            self._handle_b9_auth()
            return
        self.send_error(501, 'Unsupported method')

    def _read_json_body(self) -> dict | None:
        length = int(self.headers.get('Content-Length', 0))
        raw = self.rfile.read(length) if length else b''
        try:
            return json.loads(raw.decode('utf-8') or '{}')
        except json.JSONDecodeError:
            return None

    def _handle_b9_auth(self) -> None:
        body = self._read_json_body()
        if not body or not isinstance(body.get('password'), str):
            self._json_response(400, {'ok': False})
            return

        env = load_env_local()
        secret = env.get('B9_JWT_SECRET') or env.get('ADM_PRIVATE_SECRET')
        if not secret:
            self._json_response(503, {'ok': False, 'error': 'not_configured'})
            return

        role = resolve_role(body['password'], body.get('role'), env)
        if not role:
            self._json_response(401, {'ok': False})
            return

        token = hmac.new(
            secret.encode(), f'{B9_MSG}:{role}'.encode(), hashlib.sha256
        ).hexdigest()
        max_age = 60 * 60 * 24 * 7
        now = int(time.time())
        jwt = sign_jwt(secret, {'role': role, 'sub': role, 'iat': now, 'exp': now + max_age})
        cookie = f'adm_b9={role}.{token}; Path=/b9; HttpOnly; SameSite=Lax; Max-Age={max_age}'
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Set-Cookie', cookie)
        self.end_headers()
        self.wfile.write(json.dumps({'ok': True, 'role': role, 'token': jwt}).encode())

    def _json_response(self, status: int, payload: dict) -> None:
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode())

    def _resolve_clean_url(self, raw_path: str) -> str:
        parsed = urlparse(raw_path)
        path = unquote(parsed.path)

        if path.endswith('/') and path != '/':
            index = os.path.join(ROOT, path.lstrip('/'), 'index.html')
            if os.path.isfile(index):
                return urlunparse(parsed._replace(path=path + 'index.html'))

        if path == '/b9':
            return urlunparse(parsed._replace(path='/b9/index.html'))

        _, ext = os.path.splitext(path)
        if not ext:
            html = os.path.join(ROOT, path.lstrip('/') + '.html')
            if os.path.isfile(html):
                return urlunparse(parsed._replace(path=path + '.html'))

        return raw_path


def main() -> None:
    port = int(os.environ.get('PORT', '8080'))
    server = ThreadingHTTPServer(('', port), CleanUrlHandler)
    print(f'Serving {ROOT}')
    print(f'  B9 app: http://localhost:{port}/b9/')
    print(f'  Local login password: see {ENV_LOCAL} (B9_ACCESS_PASSWORD)')
    print('  (cleanUrls + /api/b9-auth stub enabled)')
    server.serve_forever()


if __name__ == '__main__':
    main()
