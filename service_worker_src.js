importScripts(
  "/digitalpalireader/content/js/external/workbox-v5.0.0/workbox-sw.js"
);

const handlerCb = ({url, event, params}) => {
  return fetch(event.request)
  .then((response) => {
    return response.text();
  })
  .then((responseBody) => {
    return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
  });
};

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});

workbox.routing.registerRoute(
  new RegExp('/.*\\.xml'),
  handlerCb,
  'XHR'
);

workbox.routing.registerRoute(
  /\.(?:html|htm|css|js,)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'assets-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50,
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
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      })
    ]
  })
);








