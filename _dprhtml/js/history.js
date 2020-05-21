'use strict';

function removeHistory(value) {
  if (!DPR_PAL.isXUL) {
    return;
  }

  var storeHistory = [];
  var content = readFile('History_List_DPR');

  var oldHistory = content.join('#').split('#'); // legacy support
  for (var j in oldHistory) {
    if (oldHistory[j] != value) { storeHistory.push(oldHistory[j]); }
    if (j > 99) { break; }
  }
  if (storeHistory.length != 0 ) { writeFile('History_List_DPR',storeHistory.join('\n'),'UTF-8'); }
  else { clearHistory(); }
  bookmarkframe(1);
}
//clearHistory();

function clearHistory(cp) {
  if (!DPR_PAL.isXUL) {
    return;
  }

  var answer = confirm('Are you sure you want to erase the history?');
  if(!answer) { return; }
  if(!eraseFile('History_List_DPR')) return false;
  if(!cp) { bookmarkframe(1); }
  DPRSidebarWindow.DPRNav.historyBox();
  alertFlash("History Erased.",'RGBa(255,255,0,0.8)');
}

function getHistory() {

  let content = __navigationTabViewModel.navHistoryArray;
  return content.join('#').split('#');

}

function addHistory(value) {

  if (typeof(Storage) !== "undefined") {
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
