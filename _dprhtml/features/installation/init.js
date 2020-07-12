'use strict';

class InstallationViewModel {
  constructor() {
    this.download_bt_checked = ko.observable(false);
    this.installationActivated = this.isAtLeastOneChecked();
  }

  isAtLeastOneChecked() {
    return this.download_bt_checked;
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
    $("#installationProgressDiv").show();
    let installElem = document.getElementById("installationBar");
    let installWidth = 0;
    for (var i = 0; i < sourceArray.length; i++) {
      await cache.add(sourceArray[i]);
      installWidth = 100 * i / sourceArray.length;
      installElem.style.width = installWidth + "%";
      installElem.innerHTML = Math.round(installWidth) + "%";
    }
    $("#installationProgressDiv").hide();
  }
}
