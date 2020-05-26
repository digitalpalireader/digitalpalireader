/*
 * Version: #{DeploymentReleaseNumber}#
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: 'dpr',
  suffix: 'v5',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'google-analytics-name',
});

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    workbox.core.skipWaiting();
  }
});

// workbox.precaching.precacheAndRoute(
//   self.__WB_MANIFEST,
//   {
//     ignoreURLParametersMatching: [/.*/],
//   }
// );


const matchFunction = x => {
  console.warn('>>>> matchFunction', x);
}

const handler = x => {
  console.warn('>>>> handler', x);
}

workbox.routing.registerRoute(
  matchFunction,
  handler,
);

// workbox.routing.registerRoute(
//   ({url}) => url.origin === self.location.origin && /^\/_dprhtml\//i.test(url.pathname),
//   new workbox.strategies.CacheFirst({
//     cacheName: 'tipitaka-my',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year.
//       }),
//     ],
//   }),
// );

// workbox.routing.registerRoute(
//   ({url}) => url.origin === self.location.origin && /^\/tipitaka\/my\//i.test(url.pathname),
//   new workbox.strategies.CacheFirst({
//     cacheName: 'tipitaka-my-2',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year.
//       }),
//     ],
//   }),
// );
