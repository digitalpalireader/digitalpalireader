///
/// NOTE: Do not import any modules into this module as it also consumed by service worker.
///

export class DprGlobals {
  constructor() {
    this._data = new Map()
    this.createReadOnlyProperties()
    this.createWriteOnceProperties()
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

  createReadOnlyProperties() {
    const properties = [
      ['ATITranslationsBaseUrl', '/_external/translations/ati'], // Shared with translations.js
      ['BTTranslationsBaseUrl', '/_external/translations/bt-bdhrs'], // Shared with translations.js
      ['DTTranslationsBaseUrl', '/_external/translations/dt'], // Shared with translations.js
    ]

    properties.forEach(([name, value], _index) => {
      Object.defineProperty(this, name, {
        get() {
          return value
        },
      })
    })
  }

  createWriteOnceProperties() {
    const propertyNames = [
      'DprViewModel',
      'NavigationTabViewModel',
      'SearchTabViewModel',
      'DictionaryTabViewModel',
      'BottomPaneTabsViewModel',
      'SettingsDialogViewModel',
      'OtherDialogsViewModel',
      'InstallationViewModel',
    ]

    propertyNames.forEach((propertyName) => Object.defineProperty(this, propertyName, {
      get() {
        return this._get(propertyName)
      },
      set(value) {
        this._set(propertyName, value)
      },
    }))
  }
}

export const singleton = new DprGlobals()
self.DPR_Globals = singleton
