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

    this.initializeSets();
  }

  initializeSets() {
    Object
    .entries(G_nikFullNames)
    .forEach(([value, label]) => this.navset.push({ value, label }));
  }

  place(place){
    this.placeArray(place);
    DPRNav.gotoPlace([
      place[0],
      parseInt(place[1]),
      place[2].replace('x','0'),
      place[3].replace('x','0'),
      place[4].replace('x','0'),
      place[5].replace('x','0'),
      place[6].replace('x','0'),
      place[place.length-1],
    ]);
  }

  setPlaces(places) {
    this.places(places);
    this.place(places[0].place)
  }

  navPartOptionsEmpty(opts) {
    return !(opts().length === 0 || (opts().length === 1 && opts()[0].label === G_unnamed));
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
}

const __navigationTabViewModel = new NavigationTabViewModel();

const initializeNavigationFeature = () => {
  let place = __navigationTabViewModel.placeArray();
  switch(place.length){
    case 3:
      loadXMLindex(place,false);
      break;
    case 8:
      loadXMLSection(__navigationTabViewModel.query(), __navigationTabViewModel.para(), place);
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
