'use strict';

class NavigationTabViewModel {
  constructor(){
    this.set = ko.observable('d');
    this.book = ko.observable('1');
    this.MAT = ko.observable('m');
    this.navset = ko.observableArray();

    this.meta = ko.observable('0');
    this.volume = ko.observable('0');
    this.vagga = ko.observable('0');
    this.sutta = ko.observable('0');
    this.section = ko.observable('0');

    this.navBook = ko.observableArray();
    this.navMeta = ko.observableArray();
    this.navVolume = ko.observableArray();
    this.navVagga = ko.observableArray();
    this.navSutta = ko.observableArray();
    this.navSection = ko.observableArray();

    this.placeArray = ko.observableArray();
    this.query = ko.observable('');
    this.para = ko.observable('');
  }

  place(place){
    this.placeArray(place);
    this.set(place[0]);
    this.MAT(place[place.length-1]);
    this.book(`${parseInt(place[1])+1}`);
    if (place.length === 8) {
      this.meta(place[2]);
      this.volume(place[3]);
      this.vagga(place[4]);
      this.sutta(place[5]);
      this.section(place[6]);
    }
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
      break;
  }
}

const parseNavigationURLParams = () => {
  const urlParams = window.location.search.substring(1, window.location.search.length).split('&');
  let place = [];
  let query = '';
  let para = '';
  urlParams.forEach(parameter => {
    var parameterSections = parameter.split('=');
    switch (parameterSections[0]) {
      case 'loc':
        place = makeLocPlace(parameterSections[1]);
        __navigationTabViewModel.place(place);
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
  const sidebarTab = $(`#${navigationFeatureName}TabContent`)[0];
  ko.applyBindings(__navigationTabViewModel, sidebarTab);
  var navset = $("#nav-set");
  for (var i in G_nikFullNames) {
    __navigationTabViewModel.navset.push({value: i, label: G_nikFullNames[i]});
  }


  digitalpalireader.setBookList(__navigationTabViewModel.set());
  digitalpalireader.changeSet();
  navset.change(function () {
    __navigationTabViewModel.book('1');
    digitalpalireader.changeSet();
  });
  $("#nav-book").change(function () {
    digitalpalireader.updateSubnav(0);
  });

  $('#nav-title').prop('title', 'View index for this book');

  DPR_PAL.enablePopover('#quicklinks-info', 'hover', 'right');

  DPR_PAL.enablePopover('#navigate-book-hierarchy-info', 'hover', 'right');
}
