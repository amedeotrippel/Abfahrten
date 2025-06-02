const CACHE_NAME = 'fahrplan-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './icon-192.png',
  './icon-512.png'
];

// Installation – Dateien zwischenspeichern
self.addEventListener('install', event => {
  console.log('Service Worker installing.');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktivierung
self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
});

// Bei Anfragen: erst Cache, dann Netzwerk
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});