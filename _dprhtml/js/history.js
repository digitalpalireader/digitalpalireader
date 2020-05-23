'use strict';

function removeHistory(value) {
  //TO DO
}

function clearHistory(cp) {

  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    var answer = confirm('Are you sure you want to erase the history?');
    if(!answer) { return; }
    let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
    if (navHistoryArrayFromStorage) {
      localStorage.removeItem("navHistoryArray");
      __navigationTabViewModel.updateHistory();
      bookmarkframe();
    }
  }
}

function getHistory() {

  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
    let content = [];
    if (navHistoryArrayFromStorage) {
      let data = JSON.parse(navHistoryArrayFromStorage);
      for (var i in data) {
        content.push(data[i]);
      }
    }
    return content.join('#').split('#');
  }

}

function addHistory(value) {

  if (__navigationTabViewModel.isStorageSupportedByBrowser) {
    let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
    if (navHistoryArrayFromStorage) {
      let data = JSON.parse(navHistoryArrayFromStorage);
      for (var i in data) {
        if (data[i].localeCompare(value) === 0 || i > 99) return;
      }
      data.push(value);
      localStorage.setItem("navHistoryArray", JSON.stringify(data));
      __navigationTabViewModel.updateHistory();
    }
  }
}
