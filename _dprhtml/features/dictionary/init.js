/* eslint-disable no-undef */
import * as DprGlobals from '../../dpr_globals'

export const featureName = 'dictionary'

export class DictionaryTabViewModel {
  constructor() {
    this.query = ko.observable('')
    this.query.subscribe((x) => this.query(this.rx() ? DPR_translit_mod.toUniRegEx(x) : DPR_translit_mod.toUni(x)), this)
    this.type = ko.observable('')
    this.showAdvancedOptions = ko.observable(false)
    this.options = ko.observableArray()
    this.entry = ko.observable('')
    const n2nKeys = Object.keys(DPR_G.G_nikToNumber)
    for (let i = 0; i < n2nKeys.length; i += 1) {
      this.options.push(`x${n2nKeys[i]}`)
    }

    const hnKeys = Object.keys(DPR_G.G_hNumbers)
    for (let i = 0; i < hnKeys.length; i += 1) {
      this.options.push(`m${hnKeys[i]}`)
    }

    this.rx = ko.computed({
      read() {
        return this.option('rx')
      },
      write(val) {
        let opts = this.options().filter((x) => x.toLowerCase() !== 'rx')
        if (val) {
          opts = [...opts, 'rx']
        }
        this.options(opts)
      },
      owner: this,
    })
  }

  option(optionName) {
    return this.options.indexOf(optionName) > -1
  }
}

export const ViewModel = new DictionaryTabViewModel()
DprGlobals.singleton.DictionaryTabViewModel = ViewModel

export const initializeSidebarTab = () => {
  const sidebarTab = $(`#${featureName}TabContent`)[0]
  ko.applyBindings(ViewModel, sidebarTab)
  DPR_dict_mod.parseDictURLParameters()
  DPROpts.dictOptions()
  DPR_PAL.enablePopover('#dictinInfo', 'click', 'bottom')
}

export const initializeFeature = async (sectionId) => {
  await DPR_config_mod.getconfig()
  DPR_dict_mod.parseDictURLParameters()
  try {
    await DPR_dict_mod.startDictLookup(sectionId)
  } catch (ex) {
    // eslint-disable-next-line no-console
    console.error('Unexpected exception. Is a bug. Find and fix.', ex)
  }
}
