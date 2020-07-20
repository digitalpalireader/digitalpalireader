'use strict';

class InstallationViewModel {
  constructor() {
    this.downloadBtChecked = ko.observable(false);
    this.installationActivated = this.isAtLeastOneChecked();
    this.isBtInstalled = ko.observable(false);
    this.isBtConfirmationBoxVisible = ko.observable(false);
  }

  showInstallationDialog() {
    if (!__dprViewModel.installationOngoing()) {
      this.isRessourceInstalled("bt");
      $('#installation-dialog-root').modal('show');
    }
  }

  isAtLeastOneChecked() {
    return this.downloadBtChecked;
  }

  async isRessourceInstalled(source) {
    let result = await caches.has(`translation-${source}`);
    this.isBtInstalled(result);
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

  showConfirmationBox(source) {
    switch(source) {
      case "bt":
        this.isBtConfirmationBoxVisible(true);
        break;
    }
  }

  cancelTranslDeletion(source) {
    switch(source) {
      case "bt":
        this.isBtConfirmationBoxVisible(false);
        break;
    }
  }

  deleteTranslFromCache(source) {
    switch(source) {
      case "bt":
        this.isBtConfirmationBoxVisible(false);
        break;
    }
    let result = caches.delete(`translation-${source}`);
    this.isRessourceInstalled("bt");
    return result;
  }
}
