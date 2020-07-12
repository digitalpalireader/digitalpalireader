'use strict';

const alwaysNotify = { notify: 'always' };

class NavigationTabViewModel {
  constructor() {
    this.updatingHierarchy = false;

    this.navTitle = ko.observable('<not_set>');
    this.set = ko.observable('');
    this.set.subscribe(x => DPRNav.changeSet(x), this);
    this.prevSetIndex = 0;
    this.book = ko.observable('').extend(alwaysNotify);
    this.book.subscribe(_ => DPRXML.updateHierarchy(0), this);
    this.MAT = ko.observable('m');
    this.MAT.subscribe(x => DPRNav.switchhier(x));
    this.prevMat = 'm';

    this.meta = ko.observable('0').extend(alwaysNotify);
    this.meta.subscribe(_ => DPRXML.updateHierarchy(1));
    this.volume = ko.observable('0').extend(alwaysNotify);
    this.volume.subscribe(_ => DPRXML.updateHierarchy(2));
    this.vagga = ko.observable('0').extend(alwaysNotify);
    this.vagga.subscribe(_ => DPRXML.updateHierarchy(3));
    this.sutta = ko.observable('0').extend(alwaysNotify);
    this.sutta.subscribe(_ => DPRXML.updateHierarchy(4));
    this.section = ko.observable('0')

    this.navset = ko.observableArray();
    this.navBook = ko.observableArray();

    this.navMeta = ko.observableArray();
    this.navVolume = ko.observableArray();
    this.navVagga = ko.observableArray();
    this.navSutta = ko.observableArray();
    this.navSection = ko.observableArray();
    this.navMetaVisible = ko.computed(function() { return this.navPartOptionsEmpty(this.navMeta); }, this);
    this.navVolumeVisible = ko.computed(function() { return this.navPartOptionsEmpty(this.navVolume); }, this);
    this.navVaggaVisible = ko.computed(function() { return this.navPartOptionsEmpty(this.navVagga); }, this);
    this.navSuttaVisible = ko.computed(function() { return this.navPartOptionsEmpty(this.navSutta); }, this);
    this.navSectionVisible = ko.computed(function() { return this.navPartOptionsEmpty(this.navSection); }, this);

    this.partVisibility = [
      this.navMetaVisible,
      this.navVolumeVisible,
      this.navVaggaVisible,
      this.navSuttaVisible,
      this.navSectionVisible,
    ];

    this.navMetaInfo = ko.computed(function() { return this.computePartInfo(0); }, this);
    this.navVolumeInfo = ko.computed(function() { return this.computePartInfo(1); }, this);
    this.navVaggaInfo = ko.computed(function() { return this.computePartInfo(2); }, this);
    this.navSuttaInfo = ko.computed(function() { return this.computePartInfo(3); }, this);
    this.navSectionInfo = ko.computed(function() { return this.computePartInfo(4); }, this);

    this.placeArray = ko.observableArray();
    this.query = ko.observable('');
    this.para = ko.observable('');

    this.places = ko.observableArray();
    this.sectionPlace = ko.observableArray();

    this.navHistoryVisible = ko.computed(function() { return this.isStorageSupportedByBrowser(); }, this);
    this.navHistoryArray = ko.observableArray();
    this.selectedHistoryItem = ko.observable(),
    this.historyInfo = ko.computed(function() { return this.computeHistoryInfo(); }, this);

    this.bookmarksVisible = ko.computed(function() { return this.isStorageSupportedByBrowser(); }, this);
    this.bookmarksArray = ko.observableArray();
    this.selectedBookmarksItem = ko.observable();
    this.bookmarksInfo = ko.computed(function() { return this.computeBookmarksInfo(); }, this);

    this.initializeSets();
    this.updateHistory();
    this.updateBookmarks();
  }

  initializeSets() {
    Object
    .entries(DPR_G.G_nikFullNames)
    .forEach(([value, label]) => this.navset.push({ value, label: DPR_translit_mod.translit(label) }));
  }

  place(place){
    this.placeArray(place);
    DPRNav.gotoPlace(place);
  }

  setPlaces(places) {
    this.places(places);
    this.place(places[0].place)
  }

  navPartOptionsEmpty(opts) {
    return !(opts().length === 0 || (opts().length === 1 && opts()[0].label === DPR_G.G_unnamed));
  }

  computePartInfo(part) {
    if (!this.partVisibility[part]()) {
      return {};
    }

    const isIndex = this.partVisibility.slice(part + 1).some(x => x());
    return isIndex
      ? { text: '≡', title: 'Combine all sub-sections', onmouseup: `DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,${part + 2})` }
      : { text: '\u21D2', title: 'View this section', onmouseup: 'DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))' };
  }

  isStorageSupportedByBrowser() {
    return typeof(Storage) !== "undefined";
  }

  async sendSelectedHistoryItem(ctx) {
    if(ctx.selectedHistoryItem() && ctx.selectedHistoryItem() !== "-- History --") {
      let selectedHistItem = ctx.selectedHistoryItem().toString().replace(/'/g, '').split('@');
      let x = selectedHistItem[1].split(',');
      x.length > 3 ? await DPRSend.openPlace(x) : await DPRSend.openIndex(x);
    }
  }

  computeHistoryInfo() {
    return { text: '\u21D2', title: 'Open bookmarks and history window',
      onmouseup: 'DPR_bookmarks_mod.bookmarkframe(1)'}
  }

  updateHistory() {
    if (this.isStorageSupportedByBrowser) {
      if (!localStorage.getItem("navHistoryArray")) {
        localStorage.setItem("navHistoryArray", JSON.stringify(["-- History --"]))
      }
      this.navHistoryArray(JSON.parse(localStorage.getItem("navHistoryArray")));
    }
  }

  sendSelectedBookmarksItem(ctx) {
    if(ctx.selectedBookmarksItem() && ctx.selectedBookmarksItem() !== "-- Bookmarks --") {
      let selectedBookmItem = ctx.selectedBookmarksItem().toString().replace(/'/g, '').split('@');
      let x = selectedBookmItem[1].split(',');
      x.length > 3 ? DPRSend.openPlace(x) : DPRSend.openIndex(x);
    }
  }

  computeBookmarksInfo() {
    return { text: '\u21D2', title: 'Open bookmarks and history window',
      onmouseup: 'DPR_bookmarks_mod.bookmarkframe(1)'}
  }

  updateBookmarks() {
    if (this.isStorageSupportedByBrowser) {
      if (!localStorage.getItem("bookmarksArray")) {
        localStorage.setItem("bookmarksArray", JSON.stringify(["-- Bookmarks --"]))
      }
      this.bookmarksArray(JSON.parse(localStorage.getItem("bookmarksArray")));
    }
  }
}

const __navigationTabViewModel = new NavigationTabViewModel();

const initializeNavigationFeature = async (sectionId) => {
  await DPR_config_mod.getconfig();
  let place = __navigationTabViewModel.placeArray();
  switch(place.length){
    case 3:
      await DPR_xml_mod.loadXMLindex(sectionId, place,false);
      break;
    case 8:
      await DPR_xml_mod.loadXMLSection(sectionId, __navigationTabViewModel.query(), __navigationTabViewModel.para(), place);
      break;
    default:
      console.error('Unsupported place format ', place);
      break;
  }

  DPR_Chrome.addMainPanelSections(__navigationTabViewModel.places());
}

const parseNavigationURLParams = () => {
  const urlParams = decodeURIComponent(window.location.search).substring(1, window.location.search.length).split('&');
  let place = [];
  let query = '';
  let para = '';
  urlParams.forEach(parameter => {
    var parameterSections = parameter.split('=');
    switch (parameterSections[0]) {
      case 'loc':
        __navigationTabViewModel.setPlaces(
          parameterSections[1]
            .split('|')
            .map(DPR_Translations.parsePlace));
        break;
      case 'para':
        para = parameterSections[1];
        __navigationTabViewModel.para(para);
        break;
      case 'query':
        query = parameterSections[1];
        __navigationTabViewModel.query(query);
        break;
    }
  });
}

const initializeNavigationSidebarTab = () => {
  parseNavigationURLParams();

  DPR_PAL.enablePopover('#quicklinks-info', 'hover', 'right');
  DPR_PAL.enablePopover('#navigate-book-hierarchy-info', 'hover', 'right');

  ko.applyBindings(__navigationTabViewModel, $(`#${navigationFeatureName}TabContent`)[0]);

  if (__navigationTabViewModel.places().length === 0) {
    __navigationTabViewModel.set('d');
  }
}
