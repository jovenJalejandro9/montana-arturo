const CACHE = 'montana-adcd395b9d';
const FILES = ["./", "index.html", "app.enc", "fonts.css", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "fonts/b5a7e427be1d.woff2", "fonts/983902d8e059.woff2", "fonts/b5a7e427be1d.woff2", "fonts/983902d8e059.woff2", "fonts/b5a7e427be1d.woff2", "fonts/983902d8e059.woff2", "fonts/e1088f01af32.woff2"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((r) => r || fetch(e.request)));
});
