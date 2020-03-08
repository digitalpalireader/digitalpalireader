//run command: 'workbox generateSW'
module.exports = {
  cacheId: "dpr-1",
  globDirectory: "./",
  globPatterns: [
    "**/*.{css,js,xml,png,eot,otf,svg,ttf,woff,woff2}"
  ],
  globIgnores: [
    "**/service_worker.js"
  ],
  swDest: "workbox_sw/service_worker.js",
  skipWaiting: true,
  clientsClaim: true,
  maximumFileSizeToCacheInBytes: 12000000,
  runtimeCaching: [
    {
      urlPattern: /\.(?:html|htm|xml)$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "markup",
        expiration: {
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
      },
    }
  ],
};
