#!/usr/bin/env python3
"""Static site server with Vercel-style cleanUrls for local development."""
from __future__ import annotations

import os
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import unquote, urlparse, urlunparse

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'site'))


class CleanUrlHandler(SimpleHTTPRequestHandler):
    allow_reuse_address = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        self.path = self._resolve_clean_url(self.path)
        return super().do_GET()

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
    print('  (cleanUrls enabled — same paths as Vercel)')
    server.serve_forever()


if __name__ == '__main__':
    main()
