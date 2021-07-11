module.exports = {
  maximumFileSizeToCacheInBytes: 5000000,
  dontCacheBustURLsMatching: /\.\w{20,32}\./,
  globDirectory: '.',
  globPatterns: [
    '_dprhtml/**/*.*',
    'public/**/*.*',
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
  swDest: 'sw.js',
  swSrc: 'sw.template.js',
}
