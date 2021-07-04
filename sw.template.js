// NOTE: On updating the workbox version, need to change the corresponding in azure-pipelines.yml (build)
// and "Generate sw.js" step (release).

import * as WBC from 'workbox-core'
import * as WBP from 'workbox-precaching'
import * as WBR from 'workbox-routing'
import * as WBS from 'workbox-strategies'
import * as WBCR from 'workbox-cacheable-response'
import * as WBE from 'workbox-expiration'
import * as DprComponentRegistry from './_dprhtml/features/installation/component-registry.js'

// NOTE: Do not remove this console log call. It is required to version the Service worker.
// eslint-disable-next-line no-console
console.log('DPR Service Worker version: #{DeploymentReleaseNumber}#')

WBC.setCacheNameDetails({
  prefix: 'dpr',
  suffix: 'v5',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'google-analytics-name',
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

WBP.precacheAndRoute(
  self.__WB_MANIFEST,
  {
    ignoreURLParametersMatching: [/.*/],
  },
)

DprComponentRegistry.registry.forEach(
  (component) => {
    WBR.registerRoute(
      component.capture,
      new WBS.CacheFirst({
        cacheName: DprComponentRegistry.getComponentCacheName(component.id),
        plugins: [
          new WBE.ExpirationPlugin({
            maxAgeSeconds: 720 * 24 * 60 * 60,
            maxEntries: 10000,
          }),
          new WBCR.CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
      }),
    )
  },
)
