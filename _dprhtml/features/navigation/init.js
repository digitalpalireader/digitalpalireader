/* eslint-disable no-undef */
import * as DprGlobals from '../../dpr_globals.js'

export const featureName = 'navigation'

const alwaysNotify = { notify: 'always' }

export class NavigationTabViewModel {
  constructor() {
    this.updatingHierarchy = false

    this.navTitle = ko.observable('<not_set>')
    this.set = ko.observable('')
    this.set.subscribe((x) => DPRNav.changeSet(x), this)
    this.prevSetIndex = 0
    this.book = ko.observable('').extend(alwaysNotify)
    this.book.subscribe((_) => DPRXML.updateHierarchy(0), this)
    this.MAT = ko.observable('m')
    this.MAT.subscribe((x) => DPRNav.switchhier(x))
    this.prevMat = 'm'

    this.meta = ko.observable('0').extend(alwaysNotify)
    this.meta.subscribe((_) => DPRXML.updateHierarchy(1))
    this.volume = ko.observable('0').extend(alwaysNotify)
    this.volume.subscribe((_) => DPRXML.updateHierarchy(2))
    this.vagga = ko.observable('0').extend(alwaysNotify)
    this.vagga.subscribe((_) => DPRXML.updateHierarchy(3))
    this.sutta = ko.observable('0').extend(alwaysNotify)
    this.sutta.subscribe((_) => DPRXML.updateHierarchy(4))
    this.section = ko.observable('0')

    this.navset = ko.observableArray()
    this.navBook = ko.observableArray()

    this.navMeta = ko.observableArray()
    this.navVolume = ko.observableArray()
    this.navVagga = ko.observableArray()
    this.navSutta = ko.observableArray()
    this.navSection = ko.observableArray()
    this.navMetaVisible = ko.computed(function _() { return NavigationTabViewModel.navPartOptionsEmpty(this.navMeta) }, this)
    this.navVolumeVisible = ko.computed(function _() { return NavigationTabViewModel.navPartOptionsEmpty(this.navVolume) }, this)
    this.navVaggaVisible = ko.computed(function _() { return NavigationTabViewModel.navPartOptionsEmpty(this.navVagga) }, this)
    this.navSuttaVisible = ko.computed(function _() { return NavigationTabViewModel.navPartOptionsEmpty(this.navSutta) }, this)
    this.navSectionVisible = ko.computed(function _() { return NavigationTabViewModel.navPartOptionsEmpty(this.navSection) }, this)

    this.partVisibility = [
      this.navMetaVisible,
      this.navVolumeVisible,
      this.navVaggaVisible,
      this.navSuttaVisible,
      this.navSectionVisible,
    ]

    this.navMetaInfo = ko.computed(function _() { return this.computePartInfo(0) }, this)
    this.navVolumeInfo = ko.computed(function _() { return this.computePartInfo(1) }, this)
    this.navVaggaInfo = ko.computed(function _() { return this.computePartInfo(2) }, this)
    this.navSuttaInfo = ko.computed(function _() { return this.computePartInfo(3) }, this)
    this.navSectionInfo = ko.computed(function _() { return this.computePartInfo(4) }, this)

    this.query = ko.observable('')
    this.para = ko.observable('')

    this.places = ko.observableArray()
    this.sectionPlace = ko.observableArray()

    this.isStorageSupportedByBrowser = ko.computed(() => NavigationTabViewModel.isStorageSupportedByBrowser(), this)
    this.navHistoryArray = ko.observableArray()
    this.selectedHistoryItem = ko.observable()
    this.historyInfo = ko.computed(() => NavigationTabViewModel.computeHistoryInfo(), this)

    this.bookmarksVisible = ko.computed(() => NavigationTabViewModel.isStorageSupportedByBrowser(), this)
    this.bookmarksArray = ko.observableArray()
    this.selectedBookmarksItem = ko.observable()
    this.bookmarksInfo = ko.computed(() => NavigationTabViewModel.computeBookmarksInfo(), this)

    this.initializeSets()
    this.updateHistory()
    this.updateBookmarks()

    this.sectionId = window.DPR_Chrome.getPrimarySectionId()
  }

  initializeSets() {
    Object
      .entries(window.DPR_G.G_nikFullNames)
      .forEach(([value, label]) => this.navset.push({ value, label: window.DPR_translit_mod.translit(label) }))
  }

  setPlaces(places) {
    this.places(places)
    DPRNav.gotoPlace(places[0].place)
  }

  static navPartOptionsEmpty(opts) {
    return !(opts().length === 0 || (opts().length === 1 && opts()[0].label === window.DPR_G.G_unnamed))
  }

  computePartInfo(part) {
    if (!this.partVisibility[part]()) {
      return {}
    }

    const isIndex = this.partVisibility.slice(part + 1).some((x) => x())
    return isIndex
      ? {
        text: '≡',
        title: 'Combine all sub-sections (Click to open primary section; Ctrl+Click to open new tab; Shift+Click to open side by side)',
        onmouseup: `DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,${part + 2})`,
      }
      : {
        text: '\u21D2',
        title: 'View this section (Click to open in primary section; Ctrl+Click to open in new tab; Shift+Click to open side by side)',
        onmouseup: 'DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))',
      }
  }

  static isStorageSupportedByBrowser() {
    return typeof Storage !== 'undefined'
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
    if (NavigationTabViewModel.isStorageSupportedByBrowser()) {
      if (!localStorage.getItem('navHistoryArray')) {
        localStorage.setItem('navHistoryArray', JSON.stringify(['-- History --']))
      }
      this.navHistoryArray(JSON.parse(localStorage.getItem('navHistoryArray')))
    }
  }

  // eslint-disable-next-line class-methods-use-this
  sendSelectedBookmarksItem(ctx) {
    // eslint-disable-next-line quotes
    if (ctx.selectedBookmarksItem() && ctx.selectedBookmarksItem() !== "-- Bookmarks --") {
      const selectedBookmItem = ctx.selectedBookmarksItem().toString().replace(/'/g, '').split('@')
      const x = selectedBookmItem[1].split(',')
      const sectionId = window.DPR_Chrome.getPrimarySectionId()
      return x.length > 3 ? DPRSend.openPlace(sectionId, x) : DPRSend.openIndex(sectionId, x)
    }

    return Promise.resolve()
  }

  static computeBookmarksInfo() {
    return {
      text: '\u21D2',
      title: 'Open bookmarks and history window',
      onmouseup: 'window.DPR_bookmarks_mod.bookmarkframe(1)',
    }
  }

  updateBookmarks() {
    if (NavigationTabViewModel.isStorageSupportedByBrowser()) {
      if (!localStorage.getItem('bookmarksArray')) {
        localStorage.setItem('bookmarksArray', JSON.stringify(['-- Bookmarks --']))
      }
      this.bookmarksArray(JSON.parse(localStorage.getItem('bookmarksArray')))
    }
  }
}

export const ViewModel = new NavigationTabViewModel()
DprGlobals.singleton.NavigationTabViewModel = ViewModel

export const initializeFeature = async (sectionId) => {
  await window.DPR_config_mod.getconfig()
  await window.DPR_Chrome.addMainPanelSections(
    ViewModel.places(),
    sectionId,
    ViewModel.query(),
    ViewModel.para(),
  )
}

const parseNavigationURLParams = () => {
  const urlParams = decodeURIComponent(window.location.search).substring(1, window.location.search.length).split('&')
  let query = ''
  let para = ''
  urlParams.forEach((parameter) => {
    const [psec0, psec1] = parameter.split('=')
    switch (psec0) {
      case 'loc':
        ViewModel.setPlaces(psec1.split('|').map(window.DPR_Translations.parsePlace))
        break
      case 'para':
        para = psec1
        ViewModel.para(para)
        break
      case 'query':
        query = psec1
        ViewModel.query(query)
        break
      default:
        // eslint-disable-next-line no-console
        console.warn(`Unrecognized parameter ${psec0}=${[psec1]}`)
    }
  })
}

export const initializeSidebarTab = () => {
  parseNavigationURLParams()
  DPR1_chrome_mod.setTransLitScriptId('#navigation-hierarchy')
  DPR1_chrome_mod.setTransLitScriptId('#nav-set-div')

  window.DPR_PAL.enablePopover('#quicklinks-info', 'hover', 'right')
  window.DPR_PAL.enablePopover('#navigate-book-hierarchy-info', 'hover', 'right')

  ko.applyBindings(ViewModel, $(`#${featureName}TabContent`)[0])

  if (ViewModel.places().length === 0) {
    ViewModel.set('d')
  }
}
