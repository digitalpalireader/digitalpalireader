/* eslint-disable no-restricted-globals */
/*
 * Version: #{DeploymentReleaseNumber}#
 */

// NOTE: On updating the workbox version, need to change the corresponding in azure-pipelines.yml (build)
// and "Generate sw.js" step (release).

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js')
importScripts('/_dprhtml/js/globalObject.js')
importScripts('/_dprhtml/features/installation/init.js')

workbox.core.setCacheNameDetails({
  prefix: 'dpr',
  suffix: 'v5',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'google-analytics-name',
})

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

workbox.precaching.precacheAndRoute(
  // eslint-disable-next-line no-underscore-dangle
  self.__WB_MANIFEST,
  {
    ignoreURLParametersMatching: [/.*/],
  },
)

// eslint-disable-next-line no-undef
DPRComponentRegistry.registry.forEach(
  (component) => {
    workbox.routing.registerRoute(
      component.capture,
      new workbox.strategies.CacheFirst({
        // eslint-disable-next-line no-undef
        cacheName: DPRComponentRegistry.getComponentCacheName(component.id),
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 720 * 24 * 60 * 60,
            maxEntries: 10000,
          }),
          new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      }),
    )
  },
)
