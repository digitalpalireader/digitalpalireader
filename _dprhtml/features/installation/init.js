'use strict';

class InstallationViewModel {
  constructor() {
    this.downloadBtChecked = ko.observable(false);
    this.installationActivated = this.isAtLeastOneChecked();
    this.isBtInstalled = ko.observable(false);
    this.isBtInstalled.subscribe(_ => isRessourceInstalled("bt"), this);
  }

  showInstallationDialog() {
    if (!__dprViewModel.installationOngoing()) {
      $('#installation-dialog-root').modal('show');
    }
  }

  isAtLeastOneChecked() {
    return this.downloadBtChecked;
  }

  async isRessourceInstalled(source) {
    let result = await caches.has(`translation-${source}`);;
    return result;
  }

  startInstallation() {
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
    __dprViewModel.installationOngoing(true);
    let installWidth;
    for (var i = 0; i < sourceArray.length; i++) {
      await cache.add(sourceArray[i]);
      installWidth = 100 * i / sourceArray.length;
      __dprViewModel.installationBarWidth(installWidth + "%");
      __dprViewModel.installationBar(Math.round(installWidth) + "%");
    }
    __dprViewModel.installationOngoing(false);
  }

  async deleteTranslFromCache(source) {
    return caches.delete(`translation-${source}`);
  }
}
