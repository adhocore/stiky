var cacheName = 'stiky-v1';
var urlsToCache = [
  './',
  'index.html?a=1',
  'manifest.json',
  'sw.js',
  'css/stiky.css',
  'js/stiky.js',
  'js/lib/stikyapp.js',
  'js/lib/collection/stikynotes.js',
  'js/lib/view/noteview.js',
  'js/lib/model/stikynote.js',
  'js/vendor/require.min.js',
  'js/vendor/jquery.min.js',
  'js/vendor/underscore.min.js',
  'js/vendor/backbone.min.js',
  'js/vendor/backbone.localstorage.min.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['stiky-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
