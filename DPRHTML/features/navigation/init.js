'use strict';

class NavigationTabViewModel {
  constructor(){
    this.set = ko.observable('');
    this.book = ko.observable('');
    this.M = ko.observable(true);
    this.A = ko.observable(false);
    this.T = ko.observable(false);
    this.place = ko.observableArray();
    this.navset = ko.observableArray();
  }
}

const __navigationTabViewModel = new NavigationTabViewModel();

const initializeNavigationFeature = () => {
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
        __navigationTabViewModel.book(place[0]);
        break;
      case 'para':
        para = parameterSections[1];
        break;
      case 'query':
        query = parameterSections[1];
        break;
    }
  });

  switch(place.length){
    case 3:
      loadXMLindex(place,false);
      break;
    case 8:
      loadXMLSection(query, para, place);
      break;
    default:
      break;
  }
}

const initializeNavigationSidebarTab = () => {
  const sidebarTab = $(`#${navigationFeatureName}TabContent`)[0];
  ko.applyBindings(__navigationTabViewModel, sidebarTab);
  let bookList = 'd';
  var navset = $("#nav-set");
  for (var i in G_nikFullNames) {
    __navigationTabViewModel.navset.push({value: i, label: G_nikFullNames[i]});
  }
  navset.val(bookList);

  digitalpalireader.setBookList(bookList);
  digitalpalireader.changeSet();
  navset.change(function () {
    digitalpalireader.changeSet();
  });
  $("#nav-book").change(function () {
    digitalpalireader.updateSubnav(0);
  });

  $('#nav-title').prop('title', 'View index for this book');

  DPR_PAL.enablePopover('#quicklinks-info', 'hover', 'right');

  DPR_PAL.enablePopover('#navigate-book-hierarchy-info', 'hover', 'right');
}
