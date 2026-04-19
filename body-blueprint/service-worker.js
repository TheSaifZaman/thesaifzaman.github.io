// Body Blueprint — Service Worker (offline-first cache)
const CACHE = 'bb-v1';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './data.js',
    './script.js',
    './manifest.json',
    '../new_avatar.jpg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {}))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    const req = e.request;
    if (req.method !== 'GET') return;
    e.respondWith(
        caches.match(req).then(cached => {
            const fetchPromise = fetch(req).then(res => {
                if (res && res.status === 200 && res.type !== 'opaqueredirect') {
                    const copy = res.clone();
                    caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
                }
                return res;
            }).catch(() => cached);
            return cached || fetchPromise;
        })
    );
});
