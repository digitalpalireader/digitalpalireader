export class DprGlobals {
  constructor() {
    this._data = new Map()
  }

  _get(name) {
    return this._data.get(name)
  }

  _set(name, value) {
    if (this._data.get(name)) {
      throw new Error(`cannot reset '${name}'`)
    }

    this._data.set(name, value)
  }

  //
  get DprViewModel() { return this._get('DprViewModel') }

  set DprViewModel(value) { this._set('DprViewModel', value) }

  //
  get NavigationTabViewModel() { return this._get('NavigationTabViewModel') }

  set NavigationTabViewModel(value) { this._set('NavigationTabViewModel', value) }

  //
  get SearchTabViewModel() { return this._get('SearchTabViewModel') }

  set SearchTabViewModel(value) { this._set('SearchTabViewModel', value) }

  //
  get DictionaryTabViewModel() { return this._get('DictionaryTabViewModel') }

  set DictionaryTabViewModel(value) { this._set('DictionaryTabViewModel', value) }

  //
  get BottomPaneTabsViewModel() { return this._get('BottomPaneTabsViewModel') }

  set BottomPaneTabsViewModel(value) { this._set('BottomPaneTabsViewModel', value) }

  //
  get SettingsDialogViewModel() { return this._get('SettingsDialogViewModel') }

  set SettingsDialogViewModel(value) { this._set('SettingsDialogViewModel', value) }

  //
  get OtherDialogsViewModel() { return this._get('OtherDialogsViewModel') }

  set OtherDialogsViewModel(value) { this._set('OtherDialogsViewModel', value) }

  //
  get InstallationViewModel() { return this._get('InstallationViewModel') }

  set InstallationViewModel(value) { this._set('InstallationViewModel', value) }
}

export const singleton = new DprGlobals()
window.DPR_Globals = singleton
