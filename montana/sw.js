const CACHE = 'montana-e634b90da5';
const FILES = ["./", "index.html", "app.enc", "fonts.css", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "fonts/b5a7e427be1d.woff2", "fonts/983902d8e059.woff2", "fonts/e1088f01af32.woff2"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k.startsWith(CACHE.split('-')[0] + '-')).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  // la página y el juego cifrado: primero la red (así llegan las actualizaciones), la caché si no hay conexión
  if (e.request.mode === 'navigate' || u.pathname.endsWith('/app.enc') || u.pathname.endsWith('/')) {
    e.respondWith(fetch(e.request, { cache: 'no-store' }).then((r) => { const c = r.clone(); caches.open(CACHE).then((k) => k.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
