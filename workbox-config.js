module.exports = {
  "maximumFileSizeToCacheInBytes": 5000000,
  "dontCacheBustURLsMatching": /\.\w{32}\./,
  "globDirectory": "./",
  "globPatterns": [
    "**/*.*"
  ],
  "globIgnores": [
    "**/*.{map,sh}",
  ],
  "swDest": "sw.js",
  "swSrc": "sw-template.js",
};
