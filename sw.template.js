/* eslint-disable no-restricted-globals */

// NOTE: On updating the workbox version, need to change the corresponding in azure-pipelines.yml (build)
// and "Generate sw.js" step (release).

import * as WBC from 'workbox-core'
import * as WBP from 'workbox-precaching'
import * as WBR from 'workbox-routing'
import * as WBS from 'workbox-strategies'
import * as WBCR from 'workbox-cacheable-response'
import * as WBE from 'workbox-expiration'
import * as Installer from './_dprhtml/features/installation/init'

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

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

WBP.precacheAndRoute(
  // eslint-disable-next-line no-underscore-dangle
  self.__WB_MANIFEST,
  {
    ignoreURLParametersMatching: [/.*/],
  },
)

Installer.DPRComponentRegistry.registry.forEach(
  (component) => {
    WBR.registerRoute(
      component.capture,
      new WBS.CacheFirst({
        cacheName: Installer.DPRComponentRegistry.getComponentCacheName(component.id),
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
