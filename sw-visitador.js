// CORFA-BIONESTA Service Worker v4.1
// Incrementar este número fuerza actualización en todos los dispositivos
var CACHE_NAME = 'corfa-v4.1';
var URLS_TO_CACHE = ['/', '/index.html', '/manifest-visitador.json'];

self.addEventListener('install', function(e) {
  self.skipWaiting(); // Activar inmediatamente sin esperar
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n){ return n !== CACHE_NAME; })
             .map(function(n){ return caches.delete(n); }) // Limpiar caché vieja
      );
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  // Solo cachear recursos propios, no el Apps Script
  if(e.request.url.indexOf('script.google.com') > -1) return;
  if(e.request.url.indexOf('nominatim.openstreetmap.org') > -1) return;
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});
