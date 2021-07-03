'use strict';

const DPR_History = (function () {
  async function removeHistory(i) {
    if (window.DPR_Globals.NavigationTabViewModel.isStorageSupportedByBrowser) {
      let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
      let data = [];
      if (navHistoryArrayFromStorage) {
        data = JSON.parse(navHistoryArrayFromStorage).slice();
        data.splice(i, 1);
        localStorage.setItem("navHistoryArray", JSON.stringify(data));
        window.DPR_Globals.NavigationTabViewModel.updateHistory();
        await DPR_bookmarks_mod.bookmarkframe(0);
      }
    }
  }

  async function clearHistory(cp) {
    if (window.DPR_Globals.NavigationTabViewModel.isStorageSupportedByBrowser) {
      var answer = confirm('Are you sure you want to erase the history?');
      if(!answer) { return; }
      let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
      if (navHistoryArrayFromStorage) {
        localStorage.removeItem("navHistoryArray");
        window.DPR_Globals.NavigationTabViewModel.updateHistory();
        await DPR_bookmarks_mod.bookmarkframe(0);
      }
    }
  }

  function getHistory() {
    if (window.DPR_Globals.NavigationTabViewModel.isStorageSupportedByBrowser) {
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
    if (window.DPR_Globals.NavigationTabViewModel.isStorageSupportedByBrowser) {
      let navHistoryArrayFromStorage = localStorage.getItem("navHistoryArray");
      if (navHistoryArrayFromStorage) {
        let data = JSON.parse(navHistoryArrayFromStorage);
        for (var i in data) {
          if (data[i].localeCompare(value) === 0 || i > 99) return;
        }
        data.push(value);
        localStorage.setItem("navHistoryArray", JSON.stringify(data));
        window.DPR_Globals.NavigationTabViewModel.updateHistory();
      }
    }
  }

  return {
    addHistory,
    clearHistory,
    getHistory,
    removeHistory,
  }
})()

window.DPR_history_mod = DPR_History
