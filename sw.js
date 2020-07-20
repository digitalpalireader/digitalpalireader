/*
 * Version: #{DeploymentReleaseNumber}#
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: 'dpr',
  suffix: 'v5',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'google-analytics-name',
});

addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const addTipitakaFilesToCache = (event, lang, files) => {
  const urls = files.map(f => `/tipitaka/${lang}/${f}.xml`);
  event.waitUntil(caches.open(`tipitaka-${lang}`).then((cache) => cache.addAll(urls)));
}

self.addEventListener('install', (event) => {
  const enDppnUrls =
    ['abbrev.xml']
    .concat(Array.from({ length: 10 }, (_, k)=> `${k + 1}.xml`))
    .map(f => `/en/dppn/${f}`);
  event.waitUntil(caches.open('lang-en').then((cache) => cache.addAll(enDppnUrls)));

  const enPedUrls =
    Array.from({ length: 5 }, (_, k)=> k)
    .map(n => `/en/ped/${n}/ped.xml`);
  event.waitUntil(caches.open('lang-en').then((cache) => cache.addAll(enPedUrls)));

  // TODO: Generate this list from during the build process.
  const myFiles = ['a10a','a10m','a10t','a11a','a11m','a11t','a1a','a1m','a1t','a2a','a2m','a2t','a3a','a3m','a3t','a4a','a4m','a4t','a5a','a5m','a5t','a6a','a6m','a6t','a7a','a7m','a7t','a8a','a8m','a8t','a9a','a9m','a9t','b1m','b2m','d1a','d1m','d1t','d2a','d2m','d2t','d3a','d3m','d3t','g1m','g2m','g3m','g4m','g5m','k10a','k10m','k11m','k12a','k12m','k13a','k13m','k14a','k14m','k15a','k15m','k16m','k17m','k18m','k19m','k1a','k1m','k20m','k21m','k2a','k2m','k3a','k3m','k4a','k4m','k5a','k5m','k6a','k6m','k7a','k7m','k8a','k8m','k9a','k9m','m1a','m1m','m1t','m2a','m2m','m2t','m3a','m3m','m3t','n1m','n2m','n3m','n4m','n5m','n6m','n7m','n8m','n9m','s1a','s1m','s1t','s2a','s2m','s2t','s3a','s3m','s3t','s4a','s4m','s4t','s5a','s5m','s5t','v10t','v11t','v12t','v13t','v14t','v15t','v16t','v17t','v18t','v1a','v1m','v1t','v2a','v2m','v2t','v3a','v3m','v3t','v4a','v4m','v4t','v5a','v5m','v5t','v6a','v6m','v6t','v7t','v8t','v9t','x1a','x1m','x2a','x2m','y10m','y11m','y12m','y13m','y14m','y1a','y1m','y1t','y2a','y2m','y2t','y3a','y3m','y3t','y4a','y4m','y4t','y5a','y5m','y5t','y6a','y6m','y6t','y7m','y8m','y9a','y9m','y9t',]
  addTipitakaFilesToCache(event, 'my', myFiles)

  // TODO: Generate this list from during the build process.
  const thFiles = ['a10m','a11m','a1m','a2m','a3m','a4m','a5m','a6m','a7m','a8m','a9m','d1m','d2m','d3m','k1m','k2m','k3m','k4m','k5m','m1m','m2m','m3m','s1m','s2m','s3m','s4m','s5m','v1m','v2m','v3m','v4m','v5m','v6m',]
  addTipitakaFilesToCache(event, 'th', thFiles)
});

workbox.precaching.precacheAndRoute(
  [{"revision":"eab5b00b68d52cf78e40c092469dcba0","url":"_dprhtml/css/index-core.css"},{"revision":"c1852febee08909766f730c0939029b3","url":"_dprhtml/css/index-override.css"},{"revision":"aea22e8c67533fa47a2135e3c6defc06","url":"_dprhtml/css/index.css"},{"revision":"2357429f8b731cd42b887c63d2040287","url":"_dprhtml/css/styles.css"},{"revision":"b0ca91188f22d4ec49a964728182a4a5","url":"_dprhtml/etc/dbv.xml"},{"revision":"f8d47540063c47423aee76a3271d3c53","url":"_dprhtml/features/bottom-pane/init.js"},{"revision":"b69662386c2538ce1e7d681d43aace6c","url":"_dprhtml/features/bottom-pane/main-pane.html"},{"revision":"ad69130bfb8c027ba66be2dabd9cc0bd","url":"_dprhtml/features/dictionary/init.js"},{"revision":"170335bcd4e90c266898efa982d74852","url":"_dprhtml/features/dictionary/main-pane.html"},{"revision":"e3b73f098d897ae95908acace1a7ce77","url":"_dprhtml/features/dictionary/tab.html"},{"revision":"3343fb196de462972f7a9efedc453f75","url":"_dprhtml/features/landing-page/main-pane.html"},{"revision":"8ae03741bda5cec6b7184fff6b5333db","url":"_dprhtml/features/navigation/init.js"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"_dprhtml/features/navigation/main-pane.html"},{"revision":"a36459b881c4dcef9a6c73c3d75a5970","url":"_dprhtml/features/navigation/tab.html"},{"revision":"56a125e2239950c1c9874e7908247ba5","url":"_dprhtml/features/other-dialogs/bookmarks.html"},{"revision":"797d3e435116c8fc5769f570b5edbf5e","url":"_dprhtml/features/other-dialogs/init.js"},{"revision":"64e5eb31ed0d8dbcfebd2daf40559393","url":"_dprhtml/features/other-dialogs/paliquote.html"},{"revision":"2253cb7a1f2feaa3ffef0cb789278f79","url":"_dprhtml/features/other-dialogs/quicklinks.html"},{"revision":"6a7521bb44d4f15ed74175e1798a506c","url":"_dprhtml/features/search/init.js"},{"revision":"264dfe2148894fa5768503cf18c09958","url":"_dprhtml/features/search/main-pane.html"},{"revision":"667cdcb31c25668eed9e2f651b62c4ad","url":"_dprhtml/features/search/tab.html"},{"revision":"cd70a0d5639251550e5e7ef6a5cda207","url":"_dprhtml/features/settings-dialog/init.js"},{"revision":"64c78138bc8533fd61e3c9b7e971745b","url":"_dprhtml/features/settings-dialog/main-pane.html"},{"revision":"6ce021917e2065fc596af728bad3150d","url":"_dprhtml/images/abt.gif"},{"revision":"eb5850b8361905a5f2eeea9450b34cc3","url":"_dprhtml/images/ati.ico"},{"revision":"bce58c6692f5125cedb673d9e1898903","url":"_dprhtml/images/bottomtrans.png"},{"revision":"2420a4fd99579b2f85520f3f0bacd570","url":"_dprhtml/images/corb.png"},{"revision":"a6d1ce4da156d226909db8a70e411f5e","url":"_dprhtml/images/dt.ico"},{"revision":"cbdf41c22c6eb484828a9009bac15ed1","url":"_dprhtml/images/dwheel.png"},{"revision":"e4e9c71e7764bf140726242c17fb41b9","url":"_dprhtml/images/hsizegrip.png"},{"revision":"76819f6cddc42a6e9aaf94ef792b546b","url":"_dprhtml/images/imgbk.png"},{"revision":"945d79087d8811378f756e3a8cf83027","url":"_dprhtml/images/logo.png"},{"revision":"301af766307a76b16ed61512accc9a59","url":"_dprhtml/images/logo128.png"},{"revision":"6b5ce0d238b28b41270c65e6311f9f02","url":"_dprhtml/images/logo152.png"},{"revision":"e5448c4062fc0d09bd68fbcc4b1e201c","url":"_dprhtml/images/logo192.png"},{"revision":"c1d5ffc9dbe95217f35a85e09715c51d","url":"_dprhtml/images/logo24.png"},{"revision":"5201866f751ff443b80315d34411fbe1","url":"_dprhtml/images/logo48.png"},{"revision":"39665321963bc507327cfe7517f612e2","url":"_dprhtml/images/logo512.png"},{"revision":"5d5927bfd051ca0ae4bc99079463f75e","url":"_dprhtml/images/logo64.png"},{"revision":"35cd247502cfc65bc2319e2d2a3f0b56","url":"_dprhtml/images/pencil.png"},{"revision":"6a131cd0296e2b877a1adec2e629224e","url":"_dprhtml/images/vsizegrip.png"},{"revision":"3016098ff6be6ae82c84e0cf54adfcfc","url":"_dprhtml/images/wisdom.png"},{"revision":"019ed264822faa04c790204b481895c9","url":"_dprhtml/index.html"},{"revision":"c5a3f31cced7aa8bdb7cffddd474dd67","url":"_dprhtml/js/analysis_arrays.js"},{"revision":"6d4334800d7270fce3155621e2aeb6dc","url":"_dprhtml/js/analysis_declension.js"},{"revision":"0150ffc171f96d79205633782993f9e4","url":"_dprhtml/js/analysis_function.js"},{"revision":"100ed1707ecdd0ef271e149ffb79b9e8","url":"_dprhtml/js/analysis_output.js"},{"revision":"8fb8452f6b0bd505cda6aaa0f50efa35","url":"_dprhtml/js/ati_list.js"},{"revision":"39765cad28ae0b4258d167ffb31d5f58","url":"_dprhtml/js/attlist.js"},{"revision":"8cbe9eba0f6a135138461f1e0f86a26e","url":"_dprhtml/js/bookmarks.js"},{"revision":"1937cf586c1497c29982050a1b5922da","url":"_dprhtml/js/bv.js"},{"revision":"ef350983c51caf1847c41c3051906370","url":"_dprhtml/js/chrome.js"},{"revision":"f8242cf013f66efba40e3127e09ed19b","url":"_dprhtml/js/config.js"},{"revision":"350196f3864c2e7f81df2bc92d530940","url":"_dprhtml/js/conjugate.js"},{"revision":"76bf47664261d54c57146646a583516f","url":"_dprhtml/js/convert.js"},{"revision":"be89a3ae810863bef83bdf34364f89e0","url":"_dprhtml/js/dhpv.js"},{"revision":"401d928bbe832f0a81b5ec91a4c7e1cc","url":"_dprhtml/js/dict_xml.js"},{"revision":"0401ba1bfb7ae01cf1f3bd66af7a2487","url":"_dprhtml/js/dict.js"},{"revision":"b9ba58c08cbd9d7b907c708b92e4d746","url":"_dprhtml/js/dppn.js"},{"revision":"f5346c0ccb65adbbfa95173d53c26557","url":"_dprhtml/js/dpr_pal.js"},{"revision":"e6102318416075be4b08432fdad70877","url":"_dprhtml/js/dprviewmodel.js"},{"revision":"c2e1b7a43cb60cee03846fd1e7c2852e","url":"_dprhtml/js/dt_list.js"},{"revision":"bea37049d8764b81eec65aa0a3468b7d","url":"_dprhtml/js/external/ajax/libs/knockout/3.5.0/knockout-min.js"},{"revision":"855075c14fed65779e9226874c12d223","url":"_dprhtml/js/external/ajax/libs/popper.js/1.16.0/dist/umd/popper.min.js"},{"revision":"5a8d96197ccef3ea377cc9dc3adc9276","url":"_dprhtml/js/external/bootstrap/4.4.1/css/bootstrap-grid.css"},{"revision":"925b3e197524e3be06b0bea0fdba7522","url":"_dprhtml/js/external/bootstrap/4.4.1/css/bootstrap-grid.min.css"},{"revision":"36e946d783a00414717590bdaa365178","url":"_dprhtml/js/external/bootstrap/4.4.1/css/bootstrap-reboot.css"},{"revision":"733a7ba087751db42a147f23c5c643a5","url":"_dprhtml/js/external/bootstrap/4.4.1/css/bootstrap-reboot.min.css"},{"revision":"7b28bc04c3352a66ffc90c60f79e09ad","url":"_dprhtml/js/external/bootstrap/4.4.1/css/bootstrap.css"},{"revision":"7cc40c199d128af6b01e74a28c5900b0","url":"_dprhtml/js/external/bootstrap/4.4.1/css/bootstrap.min.css"},{"revision":"34c67892d15d30ddcce3c9994c515b3c","url":"_dprhtml/js/external/bootstrap/4.4.1/js/bootstrap.js"},{"revision":"7451e07cd6077783b728c0c924da6629","url":"_dprhtml/js/external/bootstrap/4.4.1/js/bootstrap.min.js"},{"revision":"4bb3dd721c4652feee0953261d329710","url":"_dprhtml/js/external/font-awesome/4.7.0/css/font-awesome.css"},{"revision":"a0e784c4ca94c271b0338dfb02055be6","url":"_dprhtml/js/external/font-awesome/4.7.0/css/font-awesome.min.css"},{"revision":"674f50d287a8c48dc19ba404d20fe713","url":"_dprhtml/js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.eot"},{"revision":"acf3dcb7ff752b5296ca23ba2c7c2606","url":"_dprhtml/js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.svg"},{"revision":"b06871f281fee6b241d60582ae9369b9","url":"_dprhtml/js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf"},{"revision":"fee66e712a8a08eef5805a46892932ad","url":"_dprhtml/js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.woff"},{"revision":"af7ae505a9eed503f8b8e6982036873e","url":"_dprhtml/js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2"},{"revision":"0d2717cd5d853e5c765ca032dfd41a4d","url":"_dprhtml/js/external/font-awesome/4.7.0/fonts/FontAwesome.otf"},{"revision":"a6b6350ee94a3ea74595c065cbf58af0","url":"_dprhtml/js/external/jquery-3.4.1.min.js"},{"revision":"b7ef3d28aaf7e2aeb467b63e212927ec","url":"_dprhtml/js/external/jquery-resizable.js"},{"revision":"e65fb172373d8aab2377f84b0ef2f824","url":"_dprhtml/js/external/nanobar-0.4.2.min.js"},{"revision":"af814813be14025cb1858dbb42912c1a","url":"_dprhtml/js/format.js"},{"revision":"ac6d9274666cb3c213d5590a94aaca61","url":"_dprhtml/js/globalObject.js"},{"revision":"73a53e8d41eb3b28ab3875c5096feea9","url":"_dprhtml/js/grammar.js"},{"revision":"0578ffca348f51d5502a4729be2bb0cf","url":"_dprhtml/js/history.js"},{"revision":"19427464dabe560aa0066fedadc07af3","url":"_dprhtml/js/index.js"},{"revision":"471f1a255473252bd130d32721e8eaa6","url":"_dprhtml/js/inflect.js"},{"revision":"fdaccc8d43e11e99882466e7d38dd5a4","url":"_dprhtml/js/irreg.js"},{"revision":"cc5df93d0dc64ffdc83f146a882f760b","url":"_dprhtml/js/keyboard_shortcuts.js"},{"revision":"95f0e06dddab38b649afc2c127c58b70","url":"_dprhtml/js/listam.js"},{"revision":"128b58018ed1a06c73600e4d901e1b6d","url":"_dprhtml/js/listsm.js"},{"revision":"80e50396984385b76c8692f7caba4898","url":"_dprhtml/js/move.js"},{"revision":"1bef75de5496f08b50634d46345397ec","url":"_dprhtml/js/nameno.js"},{"revision":"da7d9aace16be2df93e456a39b0354c9","url":"_dprhtml/js/navigation_common.js"},{"revision":"4effd42263d2a8a91ae8cb90ec986e30","url":"_dprhtml/js/navigation.js"},{"revision":"c6dc98c3e7ba0b5943c6bf33752b8879","url":"_dprhtml/js/ped.js"},{"revision":"5df910ce3e55e4bfc3b490f3c41904f2","url":"_dprhtml/js/prefload.js"},{"revision":"61432d41e0998045c288656681611074","url":"_dprhtml/js/receive.js"},{"revision":"c778b037c449db3b7b37e4ccad2e9f5b","url":"_dprhtml/js/relatt.js"},{"revision":"9aa95f8c733defcbd2a4810d44488da7","url":"_dprhtml/js/relmul.js"},{"revision":"b5f4a26de3a4e39ececd6cf69941bd25","url":"_dprhtml/js/reltik.js"},{"revision":"3eaf30513d9ee6f15696b208685dab2a","url":"_dprhtml/js/roots_link.js"},{"revision":"2bcae4aa114e437568a91289897806aa","url":"_dprhtml/js/roots.js"},{"revision":"edbad4ceece2ccddb81c119d1b5372e5","url":"_dprhtml/js/search_history.js"},{"revision":"76119db8824afcc28bca3dff59f1f6b7","url":"_dprhtml/js/search.js"},{"revision":"5ab787ec52bcc0f6f2b95fd96104c5db","url":"_dprhtml/js/send_bottom.js"},{"revision":"dea662712435e786fc39dfa0ed560954","url":"_dprhtml/js/send.js"},{"revision":"3002962d4930be7a72d8b014011d85f7","url":"_dprhtml/js/sortaz.js"},{"revision":"d16f22952fb444e515a816f010dd15b4","url":"_dprhtml/js/tiklist.js"},{"revision":"e9ee03eca4d8921af122fd91341052d5","url":"_dprhtml/js/titles.js"},{"revision":"1643f01b2ad77b6075e91badf2bf3671","url":"_dprhtml/js/translate.js"},{"revision":"f65ddc475e75e983e9cdba62c8563085","url":"_dprhtml/js/translations.js"},{"revision":"4804c6a72681ad09161e57ba3c370c9c","url":"_dprhtml/js/translit.js"},{"revision":"f4f80a9a75bb55acd9620958f9489af9","url":"_dprhtml/js/web/chrome_sidebar.js"},{"revision":"d9861a9c6afc893ba2170f2524662de5","url":"_dprhtml/js/web/io.js"},{"revision":"055eb6889b488982f953d1ca6c9b4daf","url":"_dprhtml/js/web/navigation_sidebar.js"},{"revision":"03b88e1d611662fb65f44ca05bdf519e","url":"_dprhtml/js/web/opts_sidebar.js"},{"revision":"e2c6f17842d73032d49c3d195c5b89dc","url":"_dprhtml/js/web/search.js"},{"revision":"88b98c41aca6cf05d695d2d90caef3c7","url":"_dprhtml/js/web/send_sidebar.js"},{"revision":"d822a9aa5f3c1d4b4633a1fbd1ba56f6","url":"_dprhtml/js/web/xml_sidebar.js"},{"revision":"a28f0b3765c7657fefb471393bddc651","url":"_dprhtml/js/xml_load.js"},{"revision":"6a49b8afed3d195f167b6da14208dea9","url":"_dprhtml/js/xml.js"},{"revision":"9eb0342ea3f3c75ade52439b8449fdd0","url":"_dprhtml/sw.js"},{"revision":"484a1f49931468a07aaf675c44ce8284","url":"index-unsupported.html"},{"revision":"a451940e68cb0ccb618e5d7635bae59d","url":"index-upgrade.html"},{"revision":"dc1f9dbae8168d13451cddc5e0a3cc07","url":"index.html"},{"revision":"19b73599e3975dfa98cef36db9b4e944","url":"manifest.webmanifest"},{"revision":"e0fab7276982190ed2c423c16ec9e3d7","url":"favicon.png"}],
  {
    ignoreURLParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/tipitaka\/my\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'tipitaka-my',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 180 * 24 * 60 * 60,
        maxEntries: 100,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/en\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'lang-en',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/sa\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'lang-sa',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 100,
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/tipitaka\/th\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'tipitaka-th',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 180 * 24 * 60 * 60,
        maxEntries: 100,
      }),
    ],
  }),
);
