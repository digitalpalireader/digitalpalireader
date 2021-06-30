module.exports = {
  maximumFileSizeToCacheInBytes: 5000000,
  dontCacheBustURLsMatching: /\.\w{32}\./,
  globDirectory: '.',
  globPatterns: [
    '_dprhtml/**/*.*',
    'docs/**/*.*',
    './*.html',
    './manifest.webmanifest',
    './favicon.png',
  ],
  globIgnores: [
    '**/*.{map,sh}',
    '**/sw.js',
    'sw.js',
  ],
  swDest: 'sw.temp.js',
  swSrc: 'sw.template.js',
}
