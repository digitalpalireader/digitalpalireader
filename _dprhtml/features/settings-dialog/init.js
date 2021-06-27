export class SettingsDialogTabsViewModel {
  constructor() {
    this.isGeneralSettingsTabSelected = ko.observable(true);
    this.isLayoutSettingsTabSelected = ko.observable(false);
    this.isTextSettingsTabSelected = ko.observable(false);

    this.themes = this.createThemesObjects()
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
    window.location.href = window.location.href;
  }

  defaultPreferences() {
    Object
      .entries(DPR_G.DPR_prefsinfo)
      .forEach(([k, _]) => this[k](DPR_G.DPR_prefsD[k]));
  }

  cancelPreferences() {
    Object
      .entries(DPR_G.DPR_prefsinfo)
      .forEach(([k, _]) => this[k](DPR_G.DPR_prefs[k]));
  }

  hardReset() {
    DPR_prefload_mod.resetAllDprSettings();
  }

  switchTheme(themeName) {
    console.log(themeName)

    if (!this.themes.has(themeName)) {
      throw new Error('unknown theme', themeName)
    }

    this.themes.get(themeName).forEach((v, k) => this[k](v))
    this.savePreferences()
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

  createThemesObjects() {
    return new Map([
      [
        'light', new Map([
          ['colbk', DPR_G.DPR_prefsD['colbk']],
          ['colbkcp', DPR_G.DPR_prefsD['colbkcp']],
          ['colInput', DPR_G.DPR_prefsD['colInput']],
          ['colButtonSel', DPR_G.DPR_prefsD['colButtonSel']],
          ['coltext', DPR_G.DPR_prefsD['coltext']],
          ['colsel', DPR_G.DPR_prefsD['colsel']],
        ])
      ],
      [
        'high-contrast', new Map([
          ['colbk', '#383838'],
          ['colbkcp', '#383838'],
          ['colInput', '#383838'],
          ['colButtonSel', '#78861d'],
          ['coltext', '#cfcfcf'],
          ['colsel', '#cccc01'],
        ])
      ],
    ])    
  }
}
