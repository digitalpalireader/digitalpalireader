'use strict';

class DictionaryTabViewModel{
  constructor(){
    this.query = ko.observable('');
    this.query.subscribe(x => this.query(this.rx() ? toUniRegEx(x) : toUni(x)), this);
    this.type = ko.observable('');
    this.showAdvancedOptions = ko.observable(false);
    this.options = ko.observableArray();
    this.entry = ko.observable('');
    for (var i in DPR_G.G_nikToNumber) {
      this.options.push('x' + i);
    }
    for (var i in DPR_G.G_hNumbers) {
      this.options.push('m' + i);
    }

    this.rx = ko.computed({
      read: function() {
        return this.option('rx');
      },
      write: function (val) {
        let opts = this.options().filter(x => x.toLowerCase() !== 'rx');
        if (val) {
          opts = [...opts, 'rx'];
        }
        this.options(opts);
      },
      owner: this,
    });
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

const initializeDictionaryFeature = async () => {
  getconfig();
  try {
    await startDictLookup();
  } catch(ex) {
    console.error('Unexpected exception. Is a bug. Find and fix.', ex);
  }
}
