'use strict';

class DprViewModel {
  constructor() {
    this.loadingFeatureVisible = ko.observable(true)
    this.landingFeatureVisible = ko.observable(false);
    this.mainFeaturesVisible = ko.observable(false);
    this.activeTab = ko.observable(navigationFeatureName);
    this.parseURLParameters();
    this.searchTab = new SearchTabViewModel();
  }

  showLandingFeature() {
    this.loadingFeatureVisible(false);
    this.landingFeatureVisible(true);
    this.mainFeaturesVisible(false);
  }

  showMainFeatures() {
    this.loadingFeatureVisible(false);
    this.landingFeatureVisible(false);
    this.mainFeaturesVisible(true);
  }

  parseURLParameters() {
    var location = document.location.href;
    if (DPR_PAL.isNavigationFeature()) {
      this.activeTab(navigationFeatureName)
    } else if (DPR_PAL.isSearchFeature()) {
      this.activeTab(searchFeatureName);
    } else if (DPR_PAL.isDictionaryFeature()) {
      this.activeTab(dictionaryFeatureName);
    } else {
      console.error('Unknown feature', location);
    }
  }
}

class SearchTabViewModel{
  constructor() {
    this.searchType = ko.observable(0);
    this.searchString = ko.observable('');
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

