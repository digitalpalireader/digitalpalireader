'use strict';

class InstallationViewModel {
  constructor() {
    this.downloadBtChecked = ko.observable(false);
    this.installationActivated = this.isAtLeastOneChecked();
    this.isBtInstalled = ko.observable(false);
    this.isBtConfirmationBoxVisible = ko.observable(false);
  }

  async showInstallationDialog() {
    if (!__dprViewModel.installationOngoing()) {
      await this.isResourceInstalled("bt");
      $('#installation-dialog-root').modal('show');
    }
  }

  isAtLeastOneChecked() {
    return this.downloadBtChecked();
  }

  async isResourceInstalled(source) {
    let result = await caches.has(`translation-${source}`);
    this.isBtInstalled(result);
    return result;
  }

  async startInstallation() {
    await this.downloadTranslation("bt");
  }

  async downloadTranslation(source) {
    await DPR_PAL.addOneJS(`/translations/${source}/translations_list.js`);
    const cache = await caches.open(`translation-${source}`)
    await this.addTranslToCache(cache, source)
  }

  async addTranslToCache(cache, source) {
    let translArray = {};
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

  async deleteTranslFromCache(source) {
    switch(source) {
      case "bt":
        this.isBtConfirmationBoxVisible(false);
        break;
    }
    let result = await caches.delete(`translation-${source}`);
    await this.isResourceInstalled("bt");
    return result;
  }
}
