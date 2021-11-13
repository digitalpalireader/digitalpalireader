/* eslint-disable no-undef */
import * as DprGlobals from '../../dpr_globals.js'

export const featureName = 'search'

export class SearchTabViewModel {
  constructor() {
    this.searchType = ko.observable(0)
    this.searchString = ko.observable('')
    this.searchString.subscribe(
      (x) => this.searchString(this.searchRegex() ? DPR_translit_mod.toUniRegEx(x) : DPR_translit_mod.toUni(x)),
      this,
    )
    this.searchM = ko.observable(true)
    this.searchA = ko.observable(false)
    this.searchT = ko.observable(false)
    this.searchBookString = ko.observable('')
    this.searchRegex = ko.observable(false)

    this.searchSetString = ko.observable('dmsak')
    this.searchSetV = ko.observable(false)
    this.searchSetD = ko.observable(true)
    this.searchSetM = ko.observable(true)
    this.searchSetS = ko.observable(true)
    this.searchSetA = ko.observable(true)
    this.searchSetK = ko.observable(true)
    this.searchSetY = ko.observable(false)
    this.searchSetX = ko.observable(false)
    this.searchSetB = ko.observable(false)
    this.searchSetG = ko.observable(false)
    this.searchSetN = ko.observable(false)

    this.bookMenu = ko.observableArray()
    this.bookListA = ko.observableArray()
    this.bookListB = ko.observableArray()

    this.searchHierarchy = ko.observable([])

    this.metaList = ko.observableArray()
    this.volumeList = ko.observableArray()
    this.vaggaList = ko.observableArray()
    this.suttaList = ko.observableArray()
    this.sectionList = ko.observableArray()

    this.metaListValue = ko.observable('0')
    this.volumeListValue = ko.observable('0')
    this.vaggaListValue = ko.observable('0')
    this.suttaListValue = ko.observable('0')
    this.sectionListValue = ko.observable('0')
    this.partialValue = ko.observable('1')

    this.HistOptions = ko.observable('m')
    this.HistOptions.subscribe((x) => DPRNav.switchhier(x))

    this.isStorageSupportedByBrowser = ko.computed(() => SearchTabViewModel.isStorageSupportedByBrowser(), this)
    this.searchHistoryArray = ko.observableArray()
    this.selectedHistoryItem = ko.observable()
    this.historyInfo = ko.computed(() => SearchTabViewModel.computeHistoryInfo(), this)

    this.sameSearchHistory = ko.pureComputed({
      read: () => (DPR_Search_History.sameSearchHistory(this.selectedHistoryItem)),
      write: () => (DPR_Search_History.sameSearchHistory(this.selectedHistoryItem)),
      owner: this,
    })

    this.simSearchHistory = ko.pureComputed({
      read: () => (DPR_Search_History.simSearchHistory(this.selectedHistoryItem)),
      write: () => (DPR_Search_History.simSearchHistory(this.selectedHistoryItem)),
      owner: this,
    })

    this.updateHistory()
  }

  static isStorageSupportedByBrowser() {
    return typeof Storage !== 'undefined'
  }

  searchPart(part) {
    const searchParts = part.toString().split('.')
    this.partialValue(`${parseInt(searchParts[0], 10) + 1}`)
    if (searchParts.length === 6) {
      this.metaListValue(searchParts[1])
      this.volumeListValue(searchParts[2])
      this.vaggaListValue(searchParts[3])
      this.suttaListValue(searchParts[4])
      this.sectionListValue(searchParts[5])
    }
  }

  searchBookDropdown() {
    if (this.searchBookString() === '' || DPR_G.searchType < 2) {
      return '1'
    }

    return this.searchBookString()
  }

  searchBookCheckbox(bookNumber) {
    if (this.searchBookString() === '') {
      return true
    }

    const bookArray = (this.searchBookString() || '').split(',')
    return bookArray.includes(`${bookNumber}`)
  }

  searchSet(set) {
    const setl = set.toLowerCase()
    this.searchSetString(setl)
    this.searchSetV(setl.indexOf('v') > -1)
    this.searchSetD(setl.indexOf('d') > -1)
    this.searchSetM(setl.indexOf('m') > -1)
    this.searchSetS(setl.indexOf('s') > -1)
    this.searchSetA(setl.indexOf('a') > -1)
    this.searchSetK(setl.indexOf('k') > -1)
    this.searchSetY(setl.indexOf('y') > -1)
    this.searchSetX(setl.indexOf('x') > -1)
    this.searchSetB(setl.indexOf('b') > -1)
    this.searchSetG(setl.indexOf('g') > -1)
    this.searchSetN(setl.indexOf('n') > -1)
  }

  searchRX(RX) {
    this.searchRegex(RX.toString() === 'true')
  }

  searchMAT(mat) {
    const matl = mat.toLowerCase()
    const matArray = []
    if (matl.indexOf('m') > -1) {
      matArray.push('m')
    }
    if (matl.indexOf('a') > -1) {
      matArray.push('a')
    }
    if (matl.indexOf('t') > -1) {
      matArray.push('t')
    }
    this.searchHierarchy(matArray)
    this.searchM(matl.indexOf('m') > -1)
    this.searchA(matl.indexOf('a') > -1)
    this.searchT(matl.indexOf('t') > -1)
  }

  async sendSelectedHistoryItem(ctx) {
    if (ctx.selectedHistoryItem() && ctx.selectedHistoryItem() !== '-- History --') {
      const selectedHistItem = ctx.selectedHistoryItem().toString().replace(/'/g, '').split('@')
      const x = selectedHistItem[1].split(',')
      if (x.length > 3) {
        await DPRSend.openPlace(this.sectionId, x)
      } else {
        await DPRSend.openIndex(this.sectionId, x)
      }
    }
  }

  static computeHistoryInfo() {
    return {
      text: '\u21D2',
      title: 'Open bookmarks and history window',
      onmouseup: 'window.DPR_bookmarks_mod.bookmarkframe(1)',
    }
  }

  updateHistory() {
    if (SearchTabViewModel.isStorageSupportedByBrowser()) {
      const searchHistStoreDefaultObj = {
        query: '',
        searchType: '',
        rx: '',
        sets: '',
        MAT: '',
        book: '',
        part: '',
        displayText: '-- History --',
      }

      if (!localStorage.getItem('searchHistoryArray')) {
        localStorage.setItem('searchHistoryArray', JSON.stringify(searchHistStoreDefaultObj))
      }

      this.searchHistoryArray(JSON.parse(localStorage.getItem('searchHistoryArray')))
    }
  }

  clearSearchHistory() {
    DPR_Search_History.clearSearchHistory(this)
  }
}

export const ViewModel = new SearchTabViewModel()
DprGlobals.singleton.SearchTabViewModel = ViewModel

window.DPR_G.searchType = 0
window.DPR_G.searchString = ''
window.DPR_G.searchMAT = ''
window.DPR_G.searchSet = ''
window.DPR_G.searchBook = 0
window.DPR_G.searchPart = 0
window.DPR_G.searchRX = false

const setSearchParams = () => {
  const urlSearchParams = new URLSearchParams(DPR_PAL.isSearchFeature() ? window.location.search : '')
  const savedSearchParams = JSON.parse(DPR_prefload_mod.loadSearchSettings())
  const getSearchParamValue = (n) => urlSearchParams.get(n) || savedSearchParams[n]

  ViewModel.searchType(DPR_G.searchType = parseInt(getSearchParamValue('type'), 10))
  ViewModel.searchString(DPR_G.searchString = decodeURIComponent(getSearchParamValue('query')))
  ViewModel.searchMAT(DPR_G.searchMAT = getSearchParamValue('MAT'))
  ViewModel.searchSet(DPR_G.searchSet = getSearchParamValue('set'))
  ViewModel.searchBookString(DPR_G.searchBook = getSearchParamValue('book'))
  ViewModel.searchPart(DPR_G.searchPart = getSearchParamValue('part'))
  ViewModel.searchRX(DPR_G.searchRX = getSearchParamValue('rx'))
}

export const initializeSidebarTab = async () => {
  const sidebarTab = $(`#${featureName}TabContent`)[0]
  setSearchParams()
  ko.applyBindings(ViewModel, sidebarTab)
  await DPROpts.tipitakaOptions()
  await DPRNav.setSearchBookList()
  DPR_PAL.enablePopover('#isearchInfo', 'click', 'bottom')
}

export const initializeFeature = async (sectionId) => {
  await DPR_config_mod.getconfig()
  setSearchParams()
  await DPR1_search_mod.searchTipitaka(
    sectionId,
    DPR_G.searchType,
    DPR_G.searchString,
    DPR_G.searchMAT,
    DPR_G.searchSet,
    DPR_G.searchBook,
    DPR_G.searchPart,
    DPR_G.searchRX,
  )
}
