'use strict';

class SettingsDialogTabsViewModel {
  constructor() {
    this.isGeneralSettingsTabSelected = ko.observable(true);
    this.isLayoutSettingsTabSelected = ko.observable(false);
    this.isTextSettingsTabSelected = ko.observable(false);

    this.createSettings();
  }

  createSettings() {
    return Object
      .entries(DPR_G.DPR_prefsinfo)
      .reduce((acc, [k, _]) => (acc[k] = ko.observable(DPR_prefload_mod.getPref(k)), acc), this);
  }

  showSettingsDialog() {
    $('#settings-dialog-root').modal('show');
  }

  savePreferences() {
    DPR_prefload_mod.savePreferences(x => this[x]());
    window.location.reload(false);
  }

  defaultPreferences() {
    Object
      .entries(DPR_G.DPR_prefsinfo)
      .forEach(([k, _]) => this[k](DPR_G.DPR_prefsD[k]));
  }

  cancelPreferences() {
    Object
      .entries(DPR_G.DPR_prefsInfo)
      .forEach(([k, _]) => this[k](DPR_G.DPR_prefs[k]));
  }

  hardReset() {
    DPR_prefload_mod.resetAllDprSettings();
  }

  updateActiveSettingsTabId(tabId) {
    Object
      .entries(this)
      .filter(([n, _]) => n.indexOf("TabSelected") !== -1)
      .forEach(([_, fn]) => fn(false));

    this[`is${tabId}SettingsTabSelected`](true);
  }

  updateActiveSettingsTab(_, event) {
    this.updateActiveSettingsTabId($(event.currentTarget).data("tabid"));
  }
}
