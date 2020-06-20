/*
 * Version: #{DeploymentReleaseNumber}#
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: 'dpr',
  suffix: 'v5',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'google-analytics-name',
});

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.precaching.precacheAndRoute(
  self.__WB_MANIFEST,
  {
    ignoreURLParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/tipitaka\/my\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'tipitaka-my',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 90 * 24 * 60 * 60, // 3 months.
      }),
    ],
  }),
);
