module.exports = {
  "maximumFileSizeToCacheInBytes": 5000000,
  "dontCacheBustURLsMatching": /\.\w{32}\./,
  "globDirectory": "_dprhtml/",
  "globPatterns": [
    "**/*.*"
  ],
  "globIgnores": [
    "**/*.{map,sh}",
  ],
  "swDest": "_dprhtml/service-worker.js",
  "swSrc": "_dprhtml/service-worker-template.js",
};
