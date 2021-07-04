import * as DprGlobals from '../../dpr_globals.js'

export class SettingsDialogViewModel {
  constructor() {
    this.isGeneralSettingsTabSelected = ko.observable(true)
    this.isLayoutSettingsTabSelected = ko.observable(false)
    this.isTextSettingsTabSelected = ko.observable(false)

    this.themes = SettingsDialogViewModel.createThemesObjects()
    this.createSettings()
  }

  createSettings() {
    return Object
      .entries(window.DPR_G.DPR_prefsinfo)
      .reduce((acc, [k, _]) => { acc[k] = ko.observable(window.DPR_prefload_mod.getPref(k)); return acc }, this)
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  showSettingsDialog() {
    $('#settings-dialog-root').modal('show')
  }

  savePreferences() {
    window.DPR_prefload_mod.savePreferences((x) => this[x]())

    // NOTE: This is a recommended way to reload the current page.
    // eslint-disable-next-line no-self-assign
    window.location.href = window.location.href
  }

  defaultPreferences() {
    Object
      .entries(window.DPR_G.DPR_prefsinfo)
      .forEach(([k, _]) => this[k](window.DPR_G.DPR_prefsD[k]))
  }

  cancelPreferences() {
    Object
      .entries(window.DPR_G.DPR_prefsinfo)
      .forEach(([k, _]) => this[k](window.DPR_G.DPR_prefs[k]))
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  hardReset() {
    window.DPR_prefload_mod.resetAllDprSettings()
  }

  switchTheme(themeName) {
    // eslint-disable-next-line no-console
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
      .filter(([n, _]) => n.indexOf('TabSelected') !== -1)
      .forEach(([_, fn]) => fn(false))

    this[`is${tabId}SettingsTabSelected`](true)
  }

  updateActiveSettingsTab(_, event) {
    this.updateActiveSettingsTabId($(event.currentTarget).data('tabid'))
  }

  static createThemesObjects() {
    return new Map([
      [
        'light', new Map([
          ['colbk', window.DPR_G.DPR_prefsD.colbk],
          ['colbkcp', window.DPR_G.DPR_prefsD.colbkcp],
          ['colInput', window.DPR_G.DPR_prefsD.colInput],
          ['colButtonSel', window.DPR_G.DPR_prefsD.colButtonSel],
          ['coltext', window.DPR_G.DPR_prefsD.coltext],
          ['colsel', window.DPR_G.DPR_prefsD.colsel],
        ]),
      ],
      [
        'high-contrast', new Map([
          ['colbk', '#383838'],
          ['colbkcp', '#383838'],
          ['colInput', '#383838'],
          ['colButtonSel', '#78861d'],
          ['coltext', '#cfcfcf'],
          ['colsel', '#cccc01'],
        ]),
      ],
    ])
  }
}

export const ViewModel = new SettingsDialogViewModel()
DprGlobals.singleton.SettingsDialogViewModel = ViewModel
