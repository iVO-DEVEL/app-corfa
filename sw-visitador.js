var CACHE='cb-visitador-v1';
var ASSETS=['/visitador.html','/manifest-visitador.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(function(c){var f=fetch(e.request).then(function(r){if(r&&r.status===200){var cl=r.clone();caches.open(CACHE).then(function(ca){ca.put(e.request,cl);});}return r;}).catch(function(){return c;});return c||f;}));});
