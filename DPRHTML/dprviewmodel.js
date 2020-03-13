'use strict';

class DprViewModel {
  constructor() {
    this.loadingFeatureVisible = ko.observable(true)
    this.landingFeatureVisible = ko.observable(false);
    this.mainFeaturesVisible = ko.observable(false);
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
}
