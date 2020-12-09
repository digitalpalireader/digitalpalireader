module.exports = {
  "maximumFileSizeToCacheInBytes": 5000000,
  "dontCacheBustURLsMatching": /\.\w{32}\./,
  "globDirectory": ".",
  "globPatterns": [
    "_dprhtml/**/*.*",
    "misc/pali/*.*",
    "./*.html",
    "./manifest.webmanifest",
    "./favicon.png",
  ],
  "globIgnores": [
    "**/*.{map,sh}",
  ],
  "swDest": "sw.js",
  "swSrc": "sw-template.js",
};
