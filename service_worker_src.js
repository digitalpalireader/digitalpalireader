importScripts(
  "/digitalpalireader/content/js/external/workbox-v5.0.0/workbox-sw.js"
);

let cache_name = "dpr-runtimeCache"

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          // fetch from internet
          return fetch(event.request)
            .then(function(response) {
              return caches.open(cache_name)
                .then(function(cache) {
                  cache.put(event.request.url, response.clone());
                  return response;
                })
            })
            // fallback
            .catch(function(err) {
              return caches.open(cache_name)
                .then(function(cache) {
                  return cache.match('/DPRHTML/index.html');
                });
            });
        }
      }
    )
  );
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

workbox.routing.registerRoute(
  /\.(?:html|htm|css|js)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: cache_name
  })
);
