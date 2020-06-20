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

// TODO: Temporary solution to warm the runtime caches. Eventually do this from UI with a progress bar so people know the status.
self.addEventListener('install', (event) => {
  const enDppnUrls =
    ['abbrev.xml']
    .concat(Array.from({ length: 10 }, (_, k)=> `${k + 1}.xml`))
    .map(f => `/en/dppn/${f}`);
  event.waitUntil(caches.open('lang-en').then((cache) => cache.addAll(enDppnUrls)));

  const enPedUrls =
    Array.from({ length: 4 }, (_, k)=> k)
    .map(n => `/en/ped/${n}/ped.xml`);
  event.waitUntil(caches.open('lang-en').then((cache) => cache.addAll(enPedUrls)));

  // TODO: Generate this list from during the build process.
  const myFiles = ['a10a','a10m','a10t','a11a','a11m','a11t','a1a','a1m','a1t','a2a','a2m','a2t','a3a','a3m','a3t','a4a','a4m','a4t','a5a','a5m','a5t','a6a','a6m','a6t','a7a','a7m','a7t','a8a','a8m','a8t','a9a','a9m','a9t','b1m','b2m','d1a','d1m','d1t','d2a','d2m','d2t','d3a','d3m','d3t','g1m','g2m','g3m','g4m','g5m','k10a','k10m','k11m','k12a','k12m','k13a','k13m','k14a','k14m','k15a','k15m','k16m','k17m','k18m','k19m','k1a','k1m','k20m','k21m','k2a','k2m','k3a','k3m','k4a','k4m','k5a','k5m','k6a','k6m','k7a','k7m','k8a','k8m','k9a','k9m','m1a','m1m','m1t','m2a','m2m','m2t','m3a','m3m','m3t','n1m','n2m','n3m','n4m','n5m','n6m','n7m','n8m','n9m','s1a','s1m','s1t','s2a','s2m','s2t','s3a','s3m','s3t','s4a','s4m','s4t','s5a','s5m','s5t','v10t','v11t','v12t','v13t','v14t','v15t','v16t','v17t','v18t','v1a','v1m','v1t','v2a','v2m','v2t','v3a','v3m','v3t','v4a','v4m','v4t','v5a','v5m','v5t','v6a','v6m','v6t','v7t','v8t','v9t','x1a','x1m','x2a','x2m','y10m','y11m','y12m','y13m','y14m','y1a','y1m','y1t','y2a','y2m','y2t','y3a','y3m','y3t','y4a','y4m','y4t','y5a','y5m','y5t','y6a','y6m','y6t','y7m','y8m','y9a','y9m','y9t',]
  const myUrls =
    myFiles
    .map(f => `/tipitaka/my/${f}.xml`);
  event.waitUntil(caches.open('tipitaka-my').then((cache) => cache.addAll(myUrls)));
});

workbox.precaching.precacheAndRoute(
  [{"revision":"ee4054a2a4ec6742c84ef446f72db289","url":"css/index-core.css"},{"revision":"c1852febee08909766f730c0939029b3","url":"css/index-override.css"},{"revision":"1a00a15e0a31d3483cf44999b2ea523a","url":"css/index.css"},{"revision":"03c154565abf30755803baee3fff3dd4","url":"css/styles.css"},{"revision":"b0ca91188f22d4ec49a964728182a4a5","url":"etc/dbv.xml"},{"revision":"e0fab7276982190ed2c423c16ec9e3d7","url":"favicon.png"},{"revision":"083d51a47aec4e6f8c49c5f6319ea36c","url":"features/bottom-pane/init.js"},{"revision":"b8edd723656881f67b6b4fe221c96be8","url":"features/bottom-pane/main-pane.html"},{"revision":"8732e55270781564bbd85907022a8ed4","url":"features/dictionary/init.js"},{"revision":"ebdbb87f3c1cdc111d78044dc495ad7c","url":"features/dictionary/main-pane.html"},{"revision":"66cdd9e06d3279146b4ac32b5d96aacb","url":"features/dictionary/tab.html"},{"revision":"7acc14222c03c7edb58a256a00a6436a","url":"features/landing-page/main-pane.html"},{"revision":"5e50d2c6cbbdf964d73b55589c08cabc","url":"features/navigation/init.js"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"features/navigation/main-pane.html"},{"revision":"492622917cf78fc434e5fad1dc3cff98","url":"features/navigation/tab.html"},{"revision":"07a7f06e180f4833ee9b8d2b23b78c70","url":"features/other-dialogs/bookmarks.html"},{"revision":"e708957a773896ddd67cea5318712540","url":"features/other-dialogs/init.js"},{"revision":"64e5eb31ed0d8dbcfebd2daf40559393","url":"features/other-dialogs/paliquote.html"},{"revision":"77de2f03c43561d232b9c18ba779ece6","url":"features/other-dialogs/quicklinks.html"},{"revision":"0b64f9f82d5a3068ff833baaf0b2efee","url":"features/search/init.js"},{"revision":"0dbd474646a4eb279634987d26c5be10","url":"features/search/main-pane.html"},{"revision":"8644034f0e386d62ed587d8632ef82cb","url":"features/search/tab.html"},{"revision":"45d36c8e7fb0189a7728db7b230c99cd","url":"features/settings-dialog/init.js"},{"revision":"64c78138bc8533fd61e3c9b7e971745b","url":"features/settings-dialog/main-pane.html"},{"revision":"6ce021917e2065fc596af728bad3150d","url":"images/abt.gif"},{"revision":"eb5850b8361905a5f2eeea9450b34cc3","url":"images/ati.ico"},{"revision":"bce58c6692f5125cedb673d9e1898903","url":"images/bottomtrans.png"},{"revision":"2420a4fd99579b2f85520f3f0bacd570","url":"images/corb.png"},{"revision":"a6d1ce4da156d226909db8a70e411f5e","url":"images/dt.ico"},{"revision":"cbdf41c22c6eb484828a9009bac15ed1","url":"images/dwheel.png"},{"revision":"e4e9c71e7764bf140726242c17fb41b9","url":"images/hsizegrip.png"},{"revision":"76819f6cddc42a6e9aaf94ef792b546b","url":"images/imgbk.png"},{"revision":"945d79087d8811378f756e3a8cf83027","url":"images/logo.png"},{"revision":"301af766307a76b16ed61512accc9a59","url":"images/logo128.png"},{"revision":"c1d5ffc9dbe95217f35a85e09715c51d","url":"images/logo24.png"},{"revision":"5201866f751ff443b80315d34411fbe1","url":"images/logo48.png"},{"revision":"5d5927bfd051ca0ae4bc99079463f75e","url":"images/logo64.png"},{"revision":"35cd247502cfc65bc2319e2d2a3f0b56","url":"images/pencil.png"},{"revision":"6a131cd0296e2b877a1adec2e629224e","url":"images/vsizegrip.png"},{"revision":"3016098ff6be6ae82c84e0cf54adfcfc","url":"images/wisdom.png"},{"revision":"0960067d89d807cbab912dd1ddbfaac7","url":"index.html"},{"revision":"c5a3f31cced7aa8bdb7cffddd474dd67","url":"js/analysis_arrays.js"},{"revision":"386f43ed7f1b3e0956b999f7d213b181","url":"js/analysis_declension.js"},{"revision":"b780881c260ac4345977135f21f44521","url":"js/analysis_function.js"},{"revision":"d32bd09e1a8745eab91d27fd3b28314d","url":"js/analysis_output.js"},{"revision":"8fb8452f6b0bd505cda6aaa0f50efa35","url":"js/ati_list.js"},{"revision":"39765cad28ae0b4258d167ffb31d5f58","url":"js/attlist.js"},{"revision":"c1d13691135059a32d3b6df0282be268","url":"js/bookmarks.js"},{"revision":"645b45ac76de0b28e942803b2d44f6a5","url":"js/bv.js"},{"revision":"db891b5b92fae6165f856dab749dd477","url":"js/chrome.js"},{"revision":"7dc83486c093f4d54f08739ec6cda8d0","url":"js/config.js"},{"revision":"e237f5ce3ab9e078108471e3a7afce04","url":"js/conjugate.js"},{"revision":"7ac6baf14c0bb770ada8cfb31f19d68c","url":"js/convert.js"},{"revision":"be89a3ae810863bef83bdf34364f89e0","url":"js/dhpv.js"},{"revision":"fea7daa6f66778d3c6b37d4cee342870","url":"js/dict_xml.js"},{"revision":"f58c6a55f780e3a7ca5dd7e9b0629dca","url":"js/dict.js"},{"revision":"b9ba58c08cbd9d7b907c708b92e4d746","url":"js/dppn.js"},{"revision":"22692ea3e312083f814572f0b6c1f6cf","url":"js/dpr_pal.js"},{"revision":"e418ecb6768b7369ef44ebcb7788606d","url":"js/dprviewmodel.js"},{"revision":"b8231e82ed80a5cb53b77b4d28f3000b","url":"js/dt_list.js"},{"revision":"bea37049d8764b81eec65aa0a3468b7d","url":"js/external/ajax/libs/knockout/3.5.0/knockout-min.js"},{"revision":"b1dbc64f8b1dfe0c089dd55b09bbbc72","url":"js/external/ajax/libs/popper.js/1.12.9/umd/popper.min.js"},{"revision":"855075c14fed65779e9226874c12d223","url":"js/external/ajax/libs/popper.js/1.16.0/dist/umd/popper.min.js"},{"revision":"5a8d96197ccef3ea377cc9dc3adc9276","url":"js/external/bootstrap/4.4.1/css/bootstrap-grid.css"},{"revision":"925b3e197524e3be06b0bea0fdba7522","url":"js/external/bootstrap/4.4.1/css/bootstrap-grid.min.css"},{"revision":"36e946d783a00414717590bdaa365178","url":"js/external/bootstrap/4.4.1/css/bootstrap-reboot.css"},{"revision":"733a7ba087751db42a147f23c5c643a5","url":"js/external/bootstrap/4.4.1/css/bootstrap-reboot.min.css"},{"revision":"7b28bc04c3352a66ffc90c60f79e09ad","url":"js/external/bootstrap/4.4.1/css/bootstrap.css"},{"revision":"7cc40c199d128af6b01e74a28c5900b0","url":"js/external/bootstrap/4.4.1/css/bootstrap.min.css"},{"revision":"f48ce11cbbedc33fce49334ff7529365","url":"js/external/bootstrap/4.4.1/js/bootstrap.bundle.js"},{"revision":"1ac3d5fcba485b4672c4a59957794939","url":"js/external/bootstrap/4.4.1/js/bootstrap.bundle.min.js"},{"revision":"34c67892d15d30ddcce3c9994c515b3c","url":"js/external/bootstrap/4.4.1/js/bootstrap.js"},{"revision":"7451e07cd6077783b728c0c924da6629","url":"js/external/bootstrap/4.4.1/js/bootstrap.min.js"},{"revision":"4bb3dd721c4652feee0953261d329710","url":"js/external/font-awesome/4.7.0/css/font-awesome.css"},{"revision":"a0e784c4ca94c271b0338dfb02055be6","url":"js/external/font-awesome/4.7.0/css/font-awesome.min.css"},{"revision":"674f50d287a8c48dc19ba404d20fe713","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.eot"},{"revision":"acf3dcb7ff752b5296ca23ba2c7c2606","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.svg"},{"revision":"b06871f281fee6b241d60582ae9369b9","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf"},{"revision":"fee66e712a8a08eef5805a46892932ad","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.woff"},{"revision":"af7ae505a9eed503f8b8e6982036873e","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2"},{"revision":"0d2717cd5d853e5c765ca032dfd41a4d","url":"js/external/font-awesome/4.7.0/fonts/FontAwesome.otf"},{"revision":"473957cfb255a781b42cb2af51d54a3b","url":"js/external/jquery-3.2.1.min.js"},{"revision":"a6b6350ee94a3ea74595c065cbf58af0","url":"js/external/jquery-3.4.1.min.js"},{"revision":"b7ef3d28aaf7e2aeb467b63e212927ec","url":"js/external/jquery-resizable.js"},{"revision":"e65fb172373d8aab2377f84b0ef2f824","url":"js/external/nanobar-0.4.2.min.js"},{"revision":"7ea717799ef7fa610f53ea03784ff68e","url":"js/external/ui/1.12.1/jquery-ui.min.js"},{"revision":"2c077850d2a53b5cc41a4b2a5ed23e95","url":"js/external/ui/1.12.1/themes/base/jquery-ui.css"},{"revision":"77b1debc29454e1dcaf218991b900d3f","url":"js/format.js"},{"revision":"bb4e93e81b01d6b0f7acb5848e3be99d","url":"js/globalObject.js"},{"revision":"de7df321448ab72618838c749c90189c","url":"js/grammar.js"},{"revision":"81ebf3954b17342687ee40f5009f49a9","url":"js/history.js"},{"revision":"ea1917ba4e7a8cdeb82daf76bc53f2d0","url":"js/index.js"},{"revision":"471f1a255473252bd130d32721e8eaa6","url":"js/inflect.js"},{"revision":"fdaccc8d43e11e99882466e7d38dd5a4","url":"js/irreg.js"},{"revision":"cc5df93d0dc64ffdc83f146a882f760b","url":"js/keyboard_shortcuts.js"},{"revision":"95f0e06dddab38b649afc2c127c58b70","url":"js/listam.js"},{"revision":"128b58018ed1a06c73600e4d901e1b6d","url":"js/listsm.js"},{"revision":"5101e927630fbd96e91da43eef62e74c","url":"js/move.js"},{"revision":"1bef75de5496f08b50634d46345397ec","url":"js/nameno.js"},{"revision":"71286586949374c75913fd0652b2c133","url":"js/navigation_common.js"},{"revision":"8329011c57c7007a148417196feb18fd","url":"js/navigation.js"},{"revision":"c6dc98c3e7ba0b5943c6bf33752b8879","url":"js/ped.js"},{"revision":"20640f6f6b740edd98993b65c2883c3d","url":"js/prefload.js"},{"revision":"b45b92337c53fafe8e5be4bce46f5dd0","url":"js/receive.js"},{"revision":"c778b037c449db3b7b37e4ccad2e9f5b","url":"js/relatt.js"},{"revision":"9aa95f8c733defcbd2a4810d44488da7","url":"js/relmul.js"},{"revision":"b5f4a26de3a4e39ececd6cf69941bd25","url":"js/reltik.js"},{"revision":"3eaf30513d9ee6f15696b208685dab2a","url":"js/roots_link.js"},{"revision":"2bcae4aa114e437568a91289897806aa","url":"js/roots.js"},{"revision":"44b588576d30284049009c0919ebd8cd","url":"js/search_history.js"},{"revision":"fe6c8a3ff8a5c00880743ed83cc6de7f","url":"js/search.js"},{"revision":"0f7655b4ba15cb2092eeb825760de44d","url":"js/send_bottom.js"},{"revision":"243ef7ef688ee352c640a59b911f6fa8","url":"js/send.js"},{"revision":"6444657a5a26db8778f99107ab039195","url":"js/sortaz.js"},{"revision":"d16f22952fb444e515a816f010dd15b4","url":"js/tiklist.js"},{"revision":"e9ee03eca4d8921af122fd91341052d5","url":"js/titles.js"},{"revision":"3e9ce2c79fc65032fea16f7a1e40c8e6","url":"js/translate.js"},{"revision":"a76828a171d418d7727b9d524f2699da","url":"js/translations.js"},{"revision":"6181246f150013fbce745869f5a1ef8c","url":"js/translit.js"},{"revision":"24fb48bef40512472451bf9b3746d9b7","url":"js/web/chrome_sidebar.js"},{"revision":"c160aa65aa959a40acb499c2db66579e","url":"js/web/io.js"},{"revision":"a6e56714cbe19dfbf3e2a87f535e096e","url":"js/web/navigation_sidebar.js"},{"revision":"62dbee4e1afb89aeea1a584f06d48818","url":"js/web/opts_sidebar.js"},{"revision":"cb1d999c932a68e51c9958ba692c8942","url":"js/web/search.js"},{"revision":"462016297d8c610883d0b506ddb25180","url":"js/web/send_sidebar.js"},{"revision":"a8bf37466ac074de45cbdad6a0f9acc7","url":"js/web/sidebar.js"},{"revision":"77b22cabfe0ff062496efd5416c3d3f9","url":"js/web/xml_sidebar.js"},{"revision":"24c8760ea66d2d5b051749c58379ce39","url":"js/xml_load.js"},{"revision":"4dceee5dea67550c55793ca2c594a016","url":"js/xml.js"}],
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
        maxAgeSeconds: 90 * 24 * 60 * 60, // 3 months.
      }),
    ],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/en\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'lang-en',
    plugins: [],
  }),
);

workbox.routing.registerRoute(
  ({url}) => url.origin === self.location.origin && /^\/sa\//i.test(url.pathname),
  new workbox.strategies.CacheFirst({
    cacheName: 'lang-sa',
    plugins: [],
  }),
);
