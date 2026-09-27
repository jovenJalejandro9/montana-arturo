const CACHE = 'hub-9ea3bddddd';
const FILES = ["./", "index.html", "fonts.css", "manifest.webmanifest", "montana.jpg", "carreras.jpg", "hola.mp3", "montana.mp3", "carreras.mp3", "icon-180.png", "icon-192.png", "icon-512.png", "fonts/983902d8e059.woff2", "fonts/b5a7e427be1d.woff2", "fonts/e1088f01af32.woff2"];
const MINE = new Set(FILES.map((f) => new URL(f, self.registration.scope).href));
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE && !k.startsWith('montana-') && !k.startsWith('carreras-')).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url); u.search = '';
  if (e.request.method !== 'GET' || !MINE.has(u.href)) return; // los juegos los sirve su propio service worker
  e.respondWith(fetch(e.request, { cache: 'no-store' }).then((r) => { const c = r.clone(); caches.open(CACHE).then((k) => k.put(e.request, c)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
