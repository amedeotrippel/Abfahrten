const CACHE_NAME = 'fahrplan-cache-v2'; // << aktualisiere bei jeder Änderung
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Installiere neuen Service Worker und speichere Ressourcen
self.addEventListener('install', event => {
  self.skipWaiting(); // sofort aktiv
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Aktiviere sofort und lösche alte Caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  return self.clients.claim();
});

// Lade Ressourcen zuerst aus dem Cache, sonst aus dem Netz
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
