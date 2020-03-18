'use strict';

const initializeDictionarySidebarTab = () => {
  const sidebarTab = $(`#${dictionaryFeatureName}TabContent`)[0];
  ko.applyBindings(__dprViewModel.dictionaryTab, sidebarTab);
  parseDictURLParameters();
  DPROpts.dictOptions();
  DPR_PAL.enablePopover('#dictinInfo', 'click', 'bottom');
}

const initializeDictionaryFeature = () => {
  getconfig();
  try {
    startDictLookup();
  } catch(ex) {
    console.error('Unexpected exception. Is a bug. Find and fix.', ex);
  }
}
