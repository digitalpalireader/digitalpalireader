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
    if (location.indexOf('?feature=search') > -1) {
      this.activeTab(searchFeatureName);
    } else if (location.indexOf('?feature=dictionary') > -1) {
      this.activeTab(dictionaryFeatureName);
    } else {
      this.activeTab(navigationFeatureName)
    }
  }
}

class SearchTabViewModel{
  constructor() {
    this.searchType = ko.observable(0);
    this.searchString = ko.observable('');
    this.searchM = ko.observable(true);
    this.searchA = ko.observable(true);
    this.searchT = ko.observable(false);
    this.searchBook = ko.observable(0);
    this.searchPart = ko.observable(0);
    this.searchRX = ko.observable(false);

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
  }

  searchSet(set){
    set = set.toLowerCase();
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

  searchMAT(MAT) {
    MAT = MAT.toLowerCase();
    this.searchM(MAT.indexOf('m') > -1);
    this.searchA(MAT.indexOf('a') > -1);
    this.searchT(MAT.indexOf('t') > -1);
  }
}

