'use strict';

class SearchTabViewModel{
  constructor() {
    this.searchType = ko.observable(0);
    this.searchString = ko.observable('');
    this.searchString.subscribe(x => this.searchString(this.searchRegex() ? toUniRegEx(x) : toUni(x)), this);
    this.searchM = ko.observable(true);
    this.searchA = ko.observable(true);
    this.searchT = ko.observable(true);
    this.searchBookString = ko.observable('');
    this.searchRegex = ko.observable(false);

    this.searchSetString = ko.observable('dmsak');
    this.searchSetV = ko.observable(false);
    this.searchSetD = ko.observable(true);
    this.searchSetM = ko.observable(true);
    this.searchSetS = ko.observable(true);
    this.searchSetA = ko.observable(true);
    this.searchSetK = ko.observable(true);
    this.searchSetY = ko.observable(false);
    this.searchSetX = ko.observable(false);
    this.searchSetB = ko.observable(false);
    this.searchSetG = ko.observable(false);
    this.searchSetN = ko.observable(false);

    this.bookMenu = ko.observableArray();
    this.bookListA = ko.observableArray();
    this.bookListB = ko.observableArray();

    this.searchHierarchy = ko.observable([]);

    this.metaList = ko.observableArray();
    this.volumeList = ko.observableArray();
    this.vaggaList = ko.observableArray();
    this.suttaList = ko.observableArray();
    this.sectionList = ko.observableArray();

    this.metaListValue = ko.observable('0');
    this.volumeListValue = ko.observable('0');
    this.vaggaListValue = ko.observable('0');
    this.suttaListValue = ko.observable('0');
    this.sectionListValue = ko.observable('0');
    this.partialValue = ko.observable('1');
  }


  searchPart(part){
    let searchParts = part.split('.');
    this.partialValue(`${parseInt(searchParts[0])+1}`);
    if (searchParts.length == 6){
      this.metaListValue(searchParts[1]);
      this.volumeListValue(searchParts[2]);
      this.vaggaListValue(searchParts[3]);
      this.suttaListValue(searchParts[4]);
      this.sectionListValue(searchParts[5]);
    }
  }

  searchBookDropdown(){
    if(this.searchBookString() == '' || searchType < 2){
      return '1';
    } else {
      return this.searchBookString();
    }
  }

  searchBookCheckbox(bookNumber){
    if(this.searchBookString() == '')
    {
      return true;
    } else {
      const bookArray = (this.searchBookString()||'').split(',');
      return bookArray.includes(`${bookNumber}`);
    }
  }

  searchSet(set){
    set = set.toLowerCase();
    this.searchSetString(set);
    this.searchSetV(set.indexOf('v') > -1);
    this.searchSetD(set.indexOf('d') > -1);
    this.searchSetM(set.indexOf('m') > -1);
    this.searchSetS(set.indexOf('s') > -1);
    this.searchSetA(set.indexOf('a') > -1);
    this.searchSetK(set.indexOf('k') > -1);
    this.searchSetY(set.indexOf('y') > -1);
    this.searchSetX(set.indexOf('x') > -1);
    this.searchSetB(set.indexOf('b') > -1);
    this.searchSetG(set.indexOf('g') > -1);
    this.searchSetN(set.indexOf('n') > -1);
  }

  searchRX(RX){
    this.searchRegex(RX == 'true');
  }

  searchMAT(MAT) {
    MAT = MAT.toLowerCase();
    let MATArray = [];
    if (MAT.indexOf('m') > -1) {
      MATArray.push('m');
    }
    if (MAT.indexOf('a') > -1) {
      MATArray.push('a');
    }
    if (MAT.indexOf('t') > -1) {
      MATArray.push('t');
    }
    this.searchHierarchy(MATArray);
    this.searchM(MAT.indexOf('m') > -1);
    this.searchA(MAT.indexOf('a') > -1);
    this.searchT(MAT.indexOf('t') > -1);
  }
}

const __searchTabViewModel = new SearchTabViewModel();

var searchType = 0;
var searchString = '';
var searchMAT = '';
var searchSet = '';
var searchBook = 0;
var searchPart = 0;
var searchRX = false;

const setSearchParams = () => {
  const urlParams = window.location.search.substring(1, window.location.search.length).split('&');
  urlParams.forEach(parameter => {
    var parameterSections = parameter.split('=');
    switch (parameterSections[0]) {
      case 'type':
        searchType = parseInt(parameterSections[1], 10);
        __searchTabViewModel.searchType(searchType);
        break;
      case 'query':
        searchString = decodeURIComponent(parameterSections[1]);
        __searchTabViewModel.searchString(searchString);
        break;
      case 'MAT':
        searchMAT = parameterSections[1];
        __searchTabViewModel.searchMAT(searchMAT);
        break;
      case 'set':
        searchSet = parameterSections[1];
        __searchTabViewModel.searchSet(searchSet);
        break;
      case 'book':
        searchBook = parameterSections[1];
        __searchTabViewModel.searchBookString(searchBook);
        break;
      case 'part':
        searchPart = parameterSections[1];
        __searchTabViewModel.searchPart(searchPart);
        break;
      case 'rx':
        searchRX = parameterSections[1];
        __searchTabViewModel.searchRX(searchRX);
        break;
    }
  });
}

const initializeSearchSidebarTab = () => {
  const sidebarTab = $(`#${searchFeatureName}TabContent`)[0];
  setSearchParams();
  ko.applyBindings(__searchTabViewModel, sidebarTab);
  DPROpts.tipitakaOptions();
  DPRNav.setSearchBookList();
  DPR_PAL.enablePopover('#isearchInfo', 'click', 'bottom');
}

const initializeSearchFeature = () => {
  getconfig();
  searchTipitaka(searchType,searchString,searchMAT,searchSet,searchBook,searchPart,searchRX);
}
