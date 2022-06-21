'use strict';

const DPR_Search_History = (function () {

  async function sameSearchHistory(data){

    let dataJsObj = ko.toJS(data);

    if (dataJsObj.displayText.localeCompare("-- History --") !== 0)
    {
      await DPRSend.sendSearch(DPRSend.eventSend(),dataJsObj.searchType, dataJsObj.query, dataJsObj.MAT, dataJsObj.sets, dataJsObj.book, dataJsObj.part, dataJsObj.rx);
    }
  }
  
  async function simSearchHistory(data){

    let dataJsObj = ko.toJS(data);

    if (dataJsObj.displayText.localeCompare("-- History --") !== 0)
    {
      let searchType = dataJsObj.searchType, searchString = dataJsObj.query, searchMAT = dataJsObj.MAT, searchSet = dataJsObj.sets, searchBook = dataJsObj.book, searchPart = dataJsObj.part, searchRX = dataJsObj.rx;

      document.getElementById('tipType').selectedIndex = searchType;
      await DPROpts.tipitakaOptions();
      document.getElementById('isearch').value = '';

      if(searchType == 0 || searchType == 2) {
        for(var i in DPR_G.G_hLetters){
          if(searchMAT.search(DPR_G.G_hLetters[i]) > -1)
            document.getElementById('tsoMAT'+DPR_G.G_hLetters[i]).checked = true;
          else
            document.getElementById('tsoMAT'+DPR_G.G_hLetters[i]).checked = false;
        }
      }
      else {
        document.getElementById('tsoMAT2m').selectedIndex = DPR_G.G_hNumbers[searchMAT];
        await DPRXML.updateSearchHierarchyAfterSetSearchBookList(0);
      }

      if(searchType == 0 || searchType == 5) { 
        for (var i in DPR_G.G_nikToNumber) {
          if(searchSet.search(i) > -1)
            document.getElementById('tsoCO'+i).checked = true;
          else
            document.getElementById('tsoCO'+i).checked = false;
        }
      }
      else {
        document.getElementById('tsoSETm').value = searchSet;
        await DPRNav.setSearchBookList();
      }
      if(searchType == 1) {
        for (var i=0;i< document.getElementById('tsoBOOKm').itemCount;i++) {
          if(searchBook.search(i+1) > -1)
            document.getElementById('tsoBObook' + i).checked = true;
          else
            document.getElementById('tsoBObook' + i).checked = false;
        }
      }
      else {
        document.getElementById('tsoBOOKm').value = searchBook;
        await DPRXML.updateSearchHierarchy(0);
      }

      if(searchType == 3) {
        var parts = searchPart.split('.');
        for(var i=1;i<parts.length;i++) {
          document.getElementById('tsoP'+DPR_G.G_listTitles[i-1]).selectedIndex = parts[i];
          await DPRXML.updateSearchHierarchy(i);
        }
        document.getElementById('tsoPR').selectedIndex = parts[0];
        DPROpts.chooseSearchHier(parseInt(parts[0])+1);
      }

      document.getElementById('tsoRx').checked = (searchRX == 'true');
    }
  }

  function addSearchHistory(query, searchType, rx, sets, MAT, book, part) {   
    
    let searchHistStoreObj = 
    {
      query: query, 
      searchType: searchType, 
      rx: rx,
      sets: sets,
      MAT: MAT,
      book: book,
      part: part,
      displayText: ''
    };

    searchHistStoreObj.displayText = getSearchHistDisplayText(query, searchType, rx, sets, MAT, book, part);

    let searchHistoryArrayFromStorage = localStorage.getItem("searchHistoryArray");
    if (searchHistoryArrayFromStorage) {
      let data = JSON.parse(searchHistoryArrayFromStorage);
      if(!(data instanceof Array)) {
        data = [data];
      }
      for (var i in data) {
        if (i > 99) return;
      }
      data.push(searchHistStoreObj);
      localStorage.setItem("searchHistoryArray", JSON.stringify(data));
      window.DPR_Globals.SearchTabViewModel.updateHistory();
    }
  }

  function getSearchHistDisplayText(query, searchType, rx, sets, MAT, book, part) { 

    let types = ['Sets', 'Books', 'Book', 'Part', '', 'ATI'];
    let place = '';

    switch (parseInt(searchType)) {
      case 0:
      case 5:
        place = sets.split('').join(',');
        break;
      case 1:
        place = DPR_G.G_nikLongName[sets[0]];
        break;
      case 2:
      case 3:
      case 4:
        place = DPR_G.G_nikLongName[sets[0]] + ' ' + book.split('').join(',');
        break;
    }

    return '\'' + query + '\' - ' + place + ' (' + types[parseInt(searchType)] + ')';
  }

  async function clearSearchHistory() {
    var answer = confirm('Are you sure you want to erase the history?');
    if(!answer) { return; }
    let searchHistoryArrayFromStorage = localStorage.getItem("searchHistoryArray");
    if (searchHistoryArrayFromStorage) {
      localStorage.removeItem("searchHistoryArray");
      window.DPR_Globals.SearchTabViewModel.updateHistory();
    }
  }

  return {
    sameSearchHistory,
    simSearchHistory,
    addSearchHistory,
    clearSearchHistory
  }
})()

window.DPR_search_history_mod = DPR_Search_History
