'use strict';

const initializeDictionarySidebarTab = () => {
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
