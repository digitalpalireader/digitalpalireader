'use strict';

const DPR_Dict_History = (function () {
  
  async function sendDictHistory(data){

    let dataJsObj = ko.toJS(data);

    if (dataJsObj.displayText.localeCompare("-- History --") !== 0)
    {
      await DPRSend.sendDict(true,DPRSend.eventSend(),dataJsObj.type, DPR_translit_mod.translit(dataJsObj.query), [dataJsObj.opts]);
    }
  }

  async function clearDictHistory() {
    var answer = confirm('Are you sure you want to erase the lookup history?');
    if(!answer) { return; }
    let dictHistoryArrayFromStorage = localStorage.getItem("dictHistoryArray");
    if (dictHistoryArrayFromStorage) {
      localStorage.removeItem("dictHistoryArray");
      window.DPR_Globals.DictionaryTabViewModel.updateHistory();
    }
  }

  function saveDictHistory(query,type,opts) {

    let dictHistStoreObj = 
    {
      query: query, 
      type: type,
      opts: opts,
      displayText: ''
    };

    dictHistStoreObj.displayText = query + ' (' + type + ')';

    let dictHistoryArrayFromStorage = localStorage.getItem("dictHistoryArray");
    if (dictHistoryArrayFromStorage) {
      let data = JSON.parse(dictHistoryArrayFromStorage);
      if(!(data instanceof Array)) {
        data = [data];
      }
      for (var i in data) {
        if (i > 99) return;
      }
      data.push(dictHistStoreObj);
      localStorage.setItem("dictHistoryArray", JSON.stringify(data));
      window.DPR_Globals.DictionaryTabViewModel.updateHistory();
    }
  }

  return {
    clearDictHistory,
    sendDictHistory,
    saveDictHistory
  }
})()

window.DPR_dict_history_mod = DPR_Dict_History
