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
      .entries(DPR_prefsInfo)
      .reduce((acc, [k, _]) => (acc[k] = ko.observable(getPref(k)), acc), this);
  }

  showSettingsDialog() {
    $('#settings-dialog-root').modal('show');
    return;
  }

  savePreferences() {
    savePreferences(x => this[x]());
    window.location.reload(false);
  }

  defaultPreferences() {
    Object
      .entries(DPR_prefsInfo)
      .forEach(([k, _]) => this[k](DPR_prefsD[k]));
  }

  cancelPreferences() {
    Object
      .entries(DPR_prefsInfo)
      .forEach(([k, _]) => this[k](DPR_prefs[k]));
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
