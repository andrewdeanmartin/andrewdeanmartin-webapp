var B9_CACHE = 'b9-guide-v4';
var B9_STATIC = [
  '/styles.css',
  '/favicon.svg',
  '/b9/b9.css',
  '/b9/manifest.webmanifest',
  '/b9/js/b9-theme.js',
  '/b9/js/b9-shell.js',
  '/b9/js/b9-nav.js',
  '/b9/js/b9-config.js',
  '/b9/js/b9-auth.js',
  '/b9/js/b9-api.js',
  '/b9/knowledge/process-map.json',
  '/b9/knowledge/process-maturity.json',
  '/b9/knowledge/process-nav.json',
  '/b9/knowledge/tools-landscape.json',
  '/b9/knowledge/question-tracks.json',
  '/b9/knowledge/learn-modules.json',
  '/b9/knowledge/connectors.json',
  '/b9/js/b9-workspace.js',
  '/b9/js/b9-export.js',
  '/b9/knowledge/baselines.json',
  '/b9/knowledge/current-stack.json',
  '/b9/icons/icon.svg',
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(B9_CACHE).then(function (cache) {
      return cache.addAll(B9_STATIC).catch(function () {
        /* Partial cache OK on first install */
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (k) { return k.startsWith('b9-guide-') && k !== B9_CACHE; })
          .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  if (event.request.method !== 'GET') return;
  if (url.pathname.indexOf('/b9-api/') === 0 || url.pathname.indexOf('/api/') === 0) return;

  if (url.pathname.indexOf('/b9/') !== 0 && url.pathname !== '/styles.css' && url.pathname !== '/favicon.svg') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var network = fetch(event.request)
        .then(function (response) {
          if (response && response.status === 200) {
            var clone = response.clone();
            caches.open(B9_CACHE).then(function (cache) {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(function () {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('/b9/index.html');
          }
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        });

      return cached || network;
    })
  );
});
