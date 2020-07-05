'use strict';

class BottomPaneTabsViewModel {
  constructor() {
    this.isDTabSelected = ko.observable(true);
    this.isCvTabSelected = ko.observable(false);
    this.isTpTabSelected = ko.observable(false);
    this.isTrTabSelected = ko.observable(false);
    this.isCjTabSelected = ko.observable(false);
  }

  updateActiveTabId(tabId) {
    Object
      .entries(this)
      .filter(([n, _]) => n.indexOf("TabSelected") !== -1)
      .forEach(([_, fn]) => fn(false));

    this[`is${tabId}TabSelected`](true);
  }

  updateActiveTab(_, event) {
    this.updateActiveTabId($(event.currentTarget).data("tabid"));
  }
}

BottomPaneTabsViewModel.TabIds = ['D', 'Cv', 'Tp', 'Tr', 'Cj'];

var DPR_BottomPane = (function () {
  const wrapWithTelemetry = function(fn) {
    return function() {
      appInsights.trackEvent({ name: `Bottom Pane: ${fn.name}`,  properties: { }});
      return fn.apply(this, arguments);
    };
  };

  return {
    cvConvert: wrapWithTelemetry(DPR_convert_mod.convert),
    cvSortaz: wrapWithTelemetry(DPR_sortaz_mod.sortaz),

    tpToVel: wrapWithTelemetry(DPR_translit_mod.toVel),
    tpToUni: wrapWithTelemetry(DPR_translit_mod.toUni),
    tpSendTextPad: wrapWithTelemetry(DPR_send_bottom_mod.sendTextPad),
    tpSavePad: wrapWithTelemetry(DPR_convert_mod.savePad),

    trTranslateText: wrapWithTelemetry(DPR_translate_mod.translateText),
    trTranslateTextFromBottomPane: wrapWithTelemetry(DPR_translate_mod.translateTextFromBottomPane),
    trInsertWordByWord: wrapWithTelemetry(DPR_translate_mod.insertWordByWord),

    cjInsertConj: wrapWithTelemetry(DPR_conjugate_mod.insertConj),
  };
})();
