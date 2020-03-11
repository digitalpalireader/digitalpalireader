const initializeDictionarySidebarTab = () => {
  DPROpts.dictOptions();
  DPR_PAL.enablePopover('#dictinInfo', 'click', 'bottom');
}

const initializeDictionaryFeature = () => {
  getconfig();
  try {
    startDictLookup();
  } catch(ex) {
    console.log('Unexpected exception. Is a bug. Find and fix.', ex);
  }
}
