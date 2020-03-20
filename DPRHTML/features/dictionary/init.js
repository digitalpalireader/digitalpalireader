'use strict';

class DictionaryTabViewModel{
  constructor(){
    this.query = ko.observable('');
    this.type = ko.observable('');
    this.showAdvancedOptions = ko.observable(false);
    this.options = ko.observableArray();
    this.entry = ko.observable('');
    for (var i in G_nikToNumber) {
      this.options.push('x' + i);
    }
    for (var i in G_hNumbers) {
      this.options.push('m' + i);
    }
  }

  option(optionName){
    return this.options.indexOf(optionName) > -1;
  }
}

const __dictionaryTabViewModel = new DictionaryTabViewModel();

const initializeDictionarySidebarTab = () => {
  const sidebarTab = $(`#${dictionaryFeatureName}TabContent`)[0];
  ko.applyBindings(__dictionaryTabViewModel, sidebarTab);
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
