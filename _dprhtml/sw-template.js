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

// TODO: Temporary solution to warm the runtime caches. Eventually do this from UI with a progress bar so people know the status.
self.addEventListener('install', (event) => {
  const enDppnUrls =
    ['abbrev.xml']
    .concat(Array.from({ length: 10 }, (_, k)=> `${k + 1}.xml`))
    .map(f => `/en/dppn/${f}`);
  event.waitUntil(caches.open('lang-en').then((cache) => cache.addAll(enDppnUrls)));

  const enPedUrls =
    Array.from({ length: 4 }, (_, k)=> k)
    .map(n => `/en/ped/${n}/ped.xml`);
  event.waitUntil(caches.open('lang-en').then((cache) => cache.addAll(enPedUrls)));

  // TODO: Generate this list from during the build process.
  const myFiles = ['a10a','a10m','a10t','a11a','a11m','a11t','a1a','a1m','a1t','a2a','a2m','a2t','a3a','a3m','a3t','a4a','a4m','a4t','a5a','a5m','a5t','a6a','a6m','a6t','a7a','a7m','a7t','a8a','a8m','a8t','a9a','a9m','a9t','b1m','b2m','d1a','d1m','d1t','d2a','d2m','d2t','d3a','d3m','d3t','g1m','g2m','g3m','g4m','g5m','k10a','k10m','k11m','k12a','k12m','k13a','k13m','k14a','k14m','k15a','k15m','k16m','k17m','k18m','k19m','k1a','k1m','k20m','k21m','k2a','k2m','k3a','k3m','k4a','k4m','k5a','k5m','k6a','k6m','k7a','k7m','k8a','k8m','k9a','k9m','m1a','m1m','m1t','m2a','m2m','m2t','m3a','m3m','m3t','n1m','n2m','n3m','n4m','n5m','n6m','n7m','n8m','n9m','s1a','s1m','s1t','s2a','s2m','s2t','s3a','s3m','s3t','s4a','s4m','s4t','s5a','s5m','s5t','v10t','v11t','v12t','v13t','v14t','v15t','v16t','v17t','v18t','v1a','v1m','v1t','v2a','v2m','v2t','v3a','v3m','v3t','v4a','v4m','v4t','v5a','v5m','v5t','v6a','v6m','v6t','v7t','v8t','v9t','x1a','x1m','x2a','x2m','y10m','y11m','y12m','y13m','y14m','y1a','y1m','y1t','y2a','y2m','y2t','y3a','y3m','y3t','y4a','y4m','y4t','y5a','y5m','y5t','y6a','y6m','y6t','y7m','y8m','y9a','y9m','y9t',]
  const myUrls =
    myFiles
    .map(f => `/tipitaka/my/${f}.xml`);
  event.waitUntil(caches.open('tipitaka-my').then((cache) => cache.addAll(myUrls)));
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
        maxAgeSeconds: 180 * 24 * 60 * 60,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/en\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'lang-en',
    plugins: [],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/sa\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'lang-sa',
    plugins: [],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/tipitaka\/th\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'tipitaka-th',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 180 * 24 * 60 * 60,
      }),
    ],
  }),
);
