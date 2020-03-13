importScripts(
  "/digitalpalireader/content/js/external/workbox-v5.0.0/workbox-sw.js"
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});

workbox.routing.setDefaultHandler(new workbox.strategies.StaleWhileRevalidate());









