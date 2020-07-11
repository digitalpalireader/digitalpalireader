'use strict';

class TranslationsViewModel {
  constructor() {
    this.downloadTranslation("bt");
  }

  async downloadTranslation(source) {
    await DPR_PAL.addOneJS(`/translations/${source}/translations_list.js`);
    caches.open(`translation-${source}`).then((cache) => this.addTranslToCache(cache, source));
  }

  async addTranslToCache(cache, source) {
    let translArray = Array();
    translArray["bt"] = DPR_G.btUrlsToPrefetch;
    // add here other transl. sources: ati, abt, dt
    let sourceArray = translArray[source];
    for (var i = 0; i < sourceArray.length; i++) {
      await cache.add(sourceArray[i]);
    }
  }
}
