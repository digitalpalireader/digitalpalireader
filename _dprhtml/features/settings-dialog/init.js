'use strict';

class SettingsDialogTabsViewModel {
  constructor() {
    this.isGeneralSettingsTabSelected = ko.observable(true);
    this.isLayoutSettingsTabSelected = ko.observable(false);
    this.isTextSettingsTabSelected = ko.observable(false);

    // NOTE: Keep this initialization. At times there appears to be a race condition with ctor and ko.
    this.createSettings();
  }

  createSettings() {
    return Object
      .entries(DPR_prefsInfo)
      .reduce((acc, [k, v]) => {
          acc[k] = ko.observable(getPref(k));
          return acc;
        },
        this);
  }

  savePreferences() {
    Object
      .entries(DPR_prefsInfo)
      .forEach(([k, v]) => {
          localStorage[`DPR_Prefs_${k}_type`] = v.type;
          localStorage[`DPR_Prefs_${k}`] = this[k]();
          DPR_prefs[k] = this[k]();
        });

    window.location.reload();
  }

  defaultPreferences() {
    Object
      .entries(DPR_prefsInfo)
      .forEach(([k, v]) => {
          this[k](DPR_prefsD[k]);
        });
  }

  cancelPreferences() {
    Object
      .entries(DPR_prefsInfo)
      .forEach(([k, v]) => {
          this[k](DPR_prefs[k]);
        });
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
