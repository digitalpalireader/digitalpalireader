importScripts(
  "/digitalpalireader/content/js/external/workbox-v5.0.0/workbox-sw.js"
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});

workbox.routing.registerRoute(
  /\.(?:html|htm|css|js|json)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|eot|otf|svg|ttf|woff|woff2|map)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);








