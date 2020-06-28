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
  /*
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
  */
});

workbox.precaching.precacheAndRoute(
  [{"revision":"ee4054a2a4ec6742c84ef446f72db289","url":"css/index-core.css"},{"revision":"c1852febee08909766f730c0939029b3","url":"css/index-override.css"},{"revision":"aea22e8c67533fa47a2135e3c6defc06","url":"css/index.css"},{"revision":"5a13476c47bb1b33e8742b4dfedb141c","url":"css/styles.css"},{"revision":"b0ca91188f22d4ec49a964728182a4a5","url":"etc/dbv.xml"},{"revision":"e0fab7276982190ed2c423c16ec9e3d7","url":"favicon.png"},{"revision":"083d51a47aec4e6f8c49c5f6319ea36c","url":"features/bottom-pane/init.js"},{"revision":"b8edd723656881f67b6b4fe221c96be8","url":"features/bottom-pane/main-pane.html"},{"revision":"8732e55270781564bbd85907022a8ed4","url":"features/dictionary/init.js"},{"revision":"ebdbb87f3c1cdc111d78044dc495ad7c","url":"features/dictionary/main-pane.html"},{"revision":"e3b73f098d897ae95908acace1a7ce77","url":"features/dictionary/tab.html"},{"revision":"cbc7741a33bacc47523ffbd6dc54193b","url":"features/landing-page/main-pane.html"},{"revision":"29afc4cae3dc7cac6a12afc6fa0fc342","url":"features/navigation/init.js"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"features/navigation/main-pane.html"},{"revision":"9be3360ea255282c63f369512baf6891","url":"features/navigation/tab.html"},{"revision":"07a7f06e180f4833ee9b8d2b23b78c70","url":"features/other-dialogs/bookmarks.html"},{"revision":"17ac72c19fcd1c690e357c1209abc75e","url":"features/other-dialogs/init.js"},{"revision":"64e5eb31ed0d8dbcfebd2daf40559393","url":"features/other-dialogs/paliquote.html"},{"revision":"2253cb7a1f2feaa3ffef0cb789278f79","url":"features/other-dialogs/quicklinks.html"},{"revision":"0b64f9f82d5a3068ff833baaf0b2efee","url":"features/search/init.js"},{"revision":"0dbd474646a4eb279634987d26c5be10","url":"features/search/main-pane.html"},{"revision":"667cdcb31c25668eed9e2f651b62c4ad","url":"features/search/tab.html"},{"revision":"cd70a0d5639251550e5e7ef6a5cda207","url":"features/settings-dialog/init.js"},{"revision":"64c78138bc8533fd61e3c9b7e971745b","url":"features/settings-dialog/main-pane.html"},{"revision":"6ce021917e2065fc596af728bad3150d","url":"images/abt.gif"},{"revision":"eb5850b8361905a5f2eeea9450b34cc3","url":"images/ati.ico"},{"revision":"bce58c6692f5125cedb673d9e1898903","url":"images/bottomtrans.png"},{"revision":"2420a4fd99579b2f85520f3f0bacd570","url":"images/corb.png"},{"revision":"a6d1ce4da156d226909db8a70e411f5e","url":"images/dt.ico"},{"revision":"cbdf41c22c6eb484828a9009bac15ed1","url":"images/dwheel.png"},{"revision":"e4e9c71e7764bf140726242c17fb41b9","url":"images/hsizegrip.png"},{"revision":"76819f6cddc42a6e9aaf94ef792b546b","url":"images/imgbk.png"},{"revision":"945d79087d8811378f756e3a8cf83027","url":"images/logo.png"},{"revision":"301af766307a76b16ed61512accc9a59","url":"images/logo128.png"},{"revision":"6b5ce0d238b28b41270c65e6311f9f02","url":"images/logo152.png"},{"revision":"e5448c4062fc0d09bd68fbcc4b1e201c","url":"images/logo192.png"},{"revision":"c1d5ffc9dbe95217f35a85e09715c51d","url":"images/logo24.png"},{"revision":"5201866f751ff443b80315d34411fbe1","url":"images/logo48.png"},{"revision":"39665321963bc507327cfe7517f612e2","url":"images/logo512.png"},{"revision":"5d5927bfd051ca0ae4bc99079463f75e","url":"images/logo64.png"},{"revision":"35cd247502cfc65bc2319e2d2a3f0b56","url":"images/pencil.png"},{"revision":"6a131cd0296e2b877a1adec2e629224e","url":"images/vsizegrip.png"},{"revision":"3016098ff6be6ae82c84e0cf54adfcfc","url":"images/wisdom.png"},{"revision":"2d5bd5d5e1bb850276dde66ce8395761","url":"index.html"},{"revision":"c5a3f31cced7aa8bdb7cffddd474dd67","url":"js/analysis_arrays.js"},{"revision":"386f43ed7f1b3e0956b999f7d213b181","url":"js/analysis_declension.js"},{"revision":"b780881c260ac4345977135f21f44521","url":"js/analysis_function.js"},{"revision":"a31efceeb97e0a97bb8702d398c25817","url":"js/analysis_output.js"},{"revision":"8fb8452f6b0bd505cda6aaa0f50efa35","url":"js/ati_list.js"},{"revision":"39765cad28ae0b4258d167ffb31d5f58","url":"js/attlist.js"},{"revision":"562260a9b3a4610e11a604b878d2bafa","url":"js/bookmarks.js"},{"revision":"3ce231a466c6e4ac7bb14ec67ac89ef0","url":"js/bv.js"},{"revision":"410e5ae6b7824678010ea1e8f8ef6c3c","url":"js/chrome.js"},{"revision":"68dfc60ea0a96005fbcaac7445276929","url":"js/config.js"},{"revision":"e237f5ce3ab9e078108471e3a7afce04","url":"js/conjugate.js"},{"revision":"7ac6baf14c0bb770ada8cfb31f19d68c","url":"js/convert.js"},{"revision":"be89a3ae810863bef83bdf34364f89e0","url":"js/dhpv.js"},{"revision":"d432b03c29fc778536b13f03b96cea58","url":"js/dict_xml.js"},{"revision":"1add2214c05948b96b6708c01182a3ef","url":"js/dict.js"},{"revision":"b9ba58c08cbd9d7b907c708b92e4d746","url":"js/dppn.js"},{"revision":"22692ea3e312083f814572f0b6c1f6cf","url":"js/dpr_pal.js"},{"revision":"e418ecb6768b7369ef44ebcb7788606d","url":"js/dprviewmodel.js"},{"revision":"b8231e82ed80a5cb53b77b4d28f3000b","url":"js/dt_list.js"},{"revision":"bea37049d8764b81eec65aa0a3468b7d","url":"js/external/ajax/libs/knockout/3.5.0/knockout-min.js"},{"revision":"b1dbc64f8b1dfe0c089dd55b09bbbc72","url":"js/external/ajax/libs/popper.js/1.12.9/umd/popper.min.js"},{"revision":"855075c14fed65779e9226874c12d223","url":"js/external/ajax/libs/popper.js/1.16.0/dist/umd/popper.min.js"},{"revision":"5a8d96197ccef3ea377cc9dc3adc9276","url":"js/external/bootstrap/4.4.1/css/bootstrap-grid.css"},{"revision":"925b3e197524e3be06b0bea0fdba7522","url":"js/external/bootstrap/4.4.1/css/bootstrap-grid.min.css"},{"revision":"36e946d783a00414717590bdaa365178","url":"js/external/bootstrap/4.4.1/css/bootstrap-reboot.css"},{"revision":"733a7ba087751db42a147f23c5c643a5","url":"js/external/bootstrap/4.4.1/css/bootstrap-reboot.min.css"},{"revision":"7b28bc04c3352a66ffc90c60f79e09ad","url":"js/external/bootstrap/4.4.1/css/bootstrap.css"},{"revision":"7cc40c199d128af6b01e74a28c5900b0","url":"js/external/bootstrap/4.4.1/css/bootstrap.min.css"},{"revision":"f48ce11cbbedc33fce49334ff7529365","url":"js/external/bootstrap/4.4.1/js/bootstrap.bundle.js"},{"revision":"1ac3d5fcba485b4672c4a59957794939","url":"js/external/bootstrap/4.4.1/js/bootstrap.bundle.min.js"},{"revision":"34c67892d15d30ddcce3c9994c515b3c","url":"js/external/bootstrap/4.4.1/js/bootstrap.js"},{"revision":"7451e07cd6077783b728c0c924da6629","url":"js/external/bootstrap/4.4.1/js/bootstrap.min.js"},{"revision":"4bb3dd721c4652feee0953261d329710","url":"js/external/font-awesome/4.7.0/css/font-awesome.css"},{"revision":"a0e784c4ca94c271b0338dfb02055be6","url":"js/external/font-awesome/4.7.0/css/font-awesome.min.css"},{"revision":"674f50d287a8c48dc19ba404d20fe713","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.eot"},{"revision":"acf3dcb7ff752b5296ca23ba2c7c2606","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.svg"},{"revision":"b06871f281fee6b241d60582ae9369b9","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf"},{"revision":"fee66e712a8a08eef5805a46892932ad","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.woff"},{"revision":"af7ae505a9eed503f8b8e6982036873e","url":"js/external/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2"},{"revision":"0d2717cd5d853e5c765ca032dfd41a4d","url":"js/external/font-awesome/4.7.0/fonts/FontAwesome.otf"},{"revision":"473957cfb255a781b42cb2af51d54a3b","url":"js/external/jquery-3.2.1.min.js"},{"revision":"a6b6350ee94a3ea74595c065cbf58af0","url":"js/external/jquery-3.4.1.min.js"},{"revision":"b7ef3d28aaf7e2aeb467b63e212927ec","url":"js/external/jquery-resizable.js"},{"revision":"e65fb172373d8aab2377f84b0ef2f824","url":"js/external/nanobar-0.4.2.min.js"},{"revision":"7ea717799ef7fa610f53ea03784ff68e","url":"js/external/ui/1.12.1/jquery-ui.min.js"},{"revision":"2c077850d2a53b5cc41a4b2a5ed23e95","url":"js/external/ui/1.12.1/themes/base/jquery-ui.css"},{"revision":"4592bf896ed10339d127f57a36d3c193","url":"js/format.js"},{"revision":"bb4e93e81b01d6b0f7acb5848e3be99d","url":"js/globalObject.js"},{"revision":"de7df321448ab72618838c749c90189c","url":"js/grammar.js"},{"revision":"389d2714f1a176c08b9acfee57a6f683","url":"js/history.js"},{"revision":"fc155485f5e6b1cb311155f5e09b6121","url":"js/index.js"},{"revision":"471f1a255473252bd130d32721e8eaa6","url":"js/inflect.js"},{"revision":"fdaccc8d43e11e99882466e7d38dd5a4","url":"js/irreg.js"},{"revision":"cc5df93d0dc64ffdc83f146a882f760b","url":"js/keyboard_shortcuts.js"},{"revision":"95f0e06dddab38b649afc2c127c58b70","url":"js/listam.js"},{"revision":"128b58018ed1a06c73600e4d901e1b6d","url":"js/listsm.js"},{"revision":"4f464def03124641b1edc1ac2104202d","url":"js/move.js"},{"revision":"1bef75de5496f08b50634d46345397ec","url":"js/nameno.js"},{"revision":"71286586949374c75913fd0652b2c133","url":"js/navigation_common.js"},{"revision":"e7ebbed40b587205a3c8aaf3b8638a14","url":"js/navigation.js"},{"revision":"c6dc98c3e7ba0b5943c6bf33752b8879","url":"js/ped.js"},{"revision":"abdbe2ebf24c9ea6e5f2e0ecac5c8307","url":"js/prefload.js"},{"revision":"b45b92337c53fafe8e5be4bce46f5dd0","url":"js/receive.js"},{"revision":"c778b037c449db3b7b37e4ccad2e9f5b","url":"js/relatt.js"},{"revision":"9aa95f8c733defcbd2a4810d44488da7","url":"js/relmul.js"},{"revision":"b5f4a26de3a4e39ececd6cf69941bd25","url":"js/reltik.js"},{"revision":"3eaf30513d9ee6f15696b208685dab2a","url":"js/roots_link.js"},{"revision":"2bcae4aa114e437568a91289897806aa","url":"js/roots.js"},{"revision":"44b588576d30284049009c0919ebd8cd","url":"js/search_history.js"},{"revision":"512a0175598c480fa5a00a37a511e3df","url":"js/search.js"},{"revision":"c20b9d76038c62d0c7c002b22a53b9ee","url":"js/send_bottom.js"},{"revision":"243ef7ef688ee352c640a59b911f6fa8","url":"js/send.js"},{"revision":"6444657a5a26db8778f99107ab039195","url":"js/sortaz.js"},{"revision":"d16f22952fb444e515a816f010dd15b4","url":"js/tiklist.js"},{"revision":"e9ee03eca4d8921af122fd91341052d5","url":"js/titles.js"},{"revision":"3e9ce2c79fc65032fea16f7a1e40c8e6","url":"js/translate.js"},{"revision":"a76828a171d418d7727b9d524f2699da","url":"js/translations.js"},{"revision":"6181246f150013fbce745869f5a1ef8c","url":"js/translit.js"},{"revision":"24fb48bef40512472451bf9b3746d9b7","url":"js/web/chrome_sidebar.js"},{"revision":"c160aa65aa959a40acb499c2db66579e","url":"js/web/io.js"},{"revision":"a745665622876bedf1252e6b417fe07b","url":"js/web/navigation_sidebar.js"},{"revision":"62dbee4e1afb89aeea1a584f06d48818","url":"js/web/opts_sidebar.js"},{"revision":"cb1d999c932a68e51c9958ba692c8942","url":"js/web/search.js"},{"revision":"462016297d8c610883d0b506ddb25180","url":"js/web/send_sidebar.js"},{"revision":"a8bf37466ac074de45cbdad6a0f9acc7","url":"js/web/sidebar.js"},{"revision":"ba20a36ee3de2aaba02e573ad0bb4afa","url":"js/web/xml_sidebar.js"},{"revision":"84e973a6d2eaf7c6b42d58b3a9b28251","url":"js/xml_load.js"},{"revision":"acf507fcc4e048467103d7f3346efab2","url":"js/xml.js"},{"revision":"19b73599e3975dfa98cef36db9b4e944","url":"manifest.webmanifest"}],
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
