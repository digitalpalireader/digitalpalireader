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
  "swDest": "_dprhtml/sw.js",
  "swSrc": "_dprhtml/sw-template.js",
};
