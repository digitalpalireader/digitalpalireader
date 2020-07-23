'use strict';

class InstallationViewModel {
  constructor() {
    this.downloadBtChecked = ko.observable();
    this.downloadBtChecked.subscribe(_ => this.deleteTranslFromCache("bt"));
    this.downloadDtChecked = ko.observable();
    this.downloadDtChecked.subscribe(_ => this.deleteTranslFromCache("dt"));
  }

  showInstallationDialog() {
    this.downloadBtChecked(localStorage.getItem("btTranslComp") !== null);
    this.downloadDtChecked(localStorage.getItem("dtTranslComp") !== null);
    if (!__dprViewModel.installationOngoing()) {
      $('#installation-dialog-root').modal('show');
    }
  }

  async startInstallation() {
    let urlArray = {};
    let btUrlArray = [];
    let dtUrlArray = [];

    if (this.downloadBtChecked()) {
      await DPR_PAL.addOneJS("/translations/bt/translations_list.js");
      const btCache = await caches.open("translation-bt");
      btUrlArray = DPR_G.btUrlsToPrefetch;
      urlArray["bt"] = btUrlArray;
      urlArray["btCache"] = btCache;
    }
    if (this.downloadDtChecked()) {
      const dtCache = await caches.open("translation-dt");
      const dtBaseUrl = DPR_Translations.trProps.dt.baseUrl;
      Object.keys(DT_LIST.translations).forEach(function (prop) {
        dtUrlArray = dtUrlArray.concat(DT_LIST.translations[prop].map(c => `${dtBaseUrl}/${c.u}`));
      });
      urlArray["dt"] = dtUrlArray;
      urlArray["dtCache"] = dtCache;
    }
    __dprViewModel.installationOngoing(true);
    let installWidth;
    let arraysSumLength = btUrlArray.length + dtUrlArray.length;
    let progressCount = 0;
    for (const prop in urlArray) {
      let checkJ = 0;
      for (var j = 0; j < urlArray[prop].length; j++) {
        await urlArray[`${prop}Cache`].add(urlArray[prop][j]);
        installWidth = 100 * (progressCount + j) / arraysSumLength;
        __dprViewModel.installationBarWidth(installWidth + "%");
        __dprViewModel.installationBar(Math.round(installWidth) + "%");
        checkJ = j;
      }
    progressCount += Object.keys(urlArray[prop]).length;
    let storeObj ={isLength: checkJ, shouldLength: Object.keys(urlArray[prop]).length};
    localStorage.setItem(`${prop}TranslComp`, JSON.stringify(storeObj));
    }
    __dprViewModel.installationOngoing(false);
  }

  async deleteTranslFromCache(source) {
    let result = false;
    if (await caches.has(`translation-${source}`)) {
      result = await caches.delete(`translation-${source}`);
      localStorage.removeItem(`${source}TranslComp`);
    }
    return result;
  }
}
