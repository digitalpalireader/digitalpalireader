//run command: 'workbox injectManifest'
module.exports = {
  globDirectory: "./",
  globPatterns: [
    "**/*.{,xml}"
  ],
  globIgnores: [
    "**/service_worker.js"
  ],
  swSrc: "service_worker_src.js",
  swDest: "service_worker.js",
  maximumFileSizeToCacheInBytes: 12000000
};
