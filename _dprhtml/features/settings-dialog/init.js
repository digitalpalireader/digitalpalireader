'use strict';

class SettingsDialogTabsViewModel {
  constructor() {
    this.isGeneralSettingsTabSelected = ko.observable(true);
    this.isLayoutSettingsTabSelected = ko.observable(false);
    this.isTextSettingsTabSelected = ko.observable(false);

    this.colfont = ko.observable(getPref('colfont'));
    this.colsize = ko.observable(getPref('colsize'));
    this.translits = ko.observable(getPref('translits'));
  }

  showSettingsDialog() {
    $('#settings-dialog-root').modal('show');
    return;
  }

  savePreferences() {
    localStorage['DPR_Prefs_colfont'] = this.colfont();
    localStorage['DPR_Prefs_colsize'] = this.colsize();
    localStorage['DPR_Prefs_translits'] = this.translits();
    localStorage['DPR_Prefs_type_translits'] = 'int';
    DPR_prefs['colfont'] = this.colfont();
    DPR_prefs['colsize'] = this.colsize();
    DPR_prefs['translits'] = this.translits();
    //reload in order to update window with changed preferences - ideally there should be a more elegant way of doing this
    window.location.reload();
  }

  defaultPreferences() {
    this.colfont(DPR_prefsD['colfont']);
    this.colsize(DPR_prefsD['colsize']);
    this.translits(DPR_prefsD['translits']);
  }

  cancelPreferences()
  {
    this.colfont(DPR_prefs['colfont']);
    this.colsize(DPR_prefs['colsize']);
    this.translits(DPR_prefs['translits']);
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
