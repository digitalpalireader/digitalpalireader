'use strict';

var DPR_search_history_mod = ( function () {

function searchHistoryXML(){
  var cont = readFile('DPR_Search_History');
  cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
  var parser=new DOMParser();
  var xmlDoc = parser.parseFromString(cont,'text/xml');
  return xmlDoc;
}

function eraseSearchHistory(gofrom)
{
  var answer = confirm('Are you sure you want to erase the search history?')
  if(answer)
  {
        eraseFile('DPR_Search_History');
    DPRNav.searchHistoryBox();
  }
}
async function sameSearchHistory(event){
  if(document.getElementById('searches').selectedIndex == 0)
    return;
  var item = document.getElementById('searches').selectedItem.getAttribute('value').split('|');
  var searchType = parseInt(item[0]), searchString = item[1], searchMAT = item[2], searchSet = item[3], searchBook = item[4], searchPart = item[5], searchRX = (item[6]=='true');
  await DPRSend.sendSearch(DPRSend.eventSend(event),searchType, searchString,searchMAT,searchSet,searchBook,searchPart,searchRX);
}
async function simSearchHistory(event){
  if(document.getElementById('searches').selectedIndex == 0)
    return;
  var item = document.getElementById('searches').selectedItem.getAttribute('value').split('|');
  var searchType = item[0], searchString = item[1], searchMAT = item[2], searchSet = item[3], searchBook = item[4], searchPart = item[5], searchRX = item[6];

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

function saveSearchHistory(query,searchType,rx,sets,MAT,book,part) {
  var xmlDoc = searchHistoryXML();
  var newNode = xmlDoc.createElement('search');

  var subNode = xmlDoc.createElement('query');
  var text = xmlDoc.createTextNode(query);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  subNode = xmlDoc.createElement('searchType');
  text = xmlDoc.createTextNode(searchType);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  subNode = xmlDoc.createElement('rx');
  text = xmlDoc.createTextNode(rx);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  subNode = xmlDoc.createElement('sets');
  text = xmlDoc.createTextNode(sets);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  subNode = xmlDoc.createElement('MAT');
  text = xmlDoc.createTextNode(MAT);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  subNode = xmlDoc.createElement('book');
  text = xmlDoc.createTextNode(book);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  subNode = xmlDoc.createElement('part');
  text = xmlDoc.createTextNode(part);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  xmlDoc.documentElement.appendChild(newNode);

  var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

  writeFile('DPR_Search_History', outfile);
  DPRNav.searchHistoryBox();
}

function dictHistoryXML(){
  var cont = readFile('DPR_Dict_History');
  cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
  var parser=new DOMParser();
  var xmlDoc = parser.parseFromString(cont,'text/xml');
  return xmlDoc;
}

function eraseDictHistory(gofrom)
{
  var answer = confirm('Are you sure you want to erase the lookup history?')
  if(answer)
  {
        eraseFile('DPR_Dict_History');
    DPRNav.dictHistoryBox();
  }
}

function saveDictHistory(query,type,opts) {
  if (DPR_PAL.isWeb) {
    console.log("DPR_search_history_mod.saveDictHistory not implemented");
    return;
  }

  var xmlDoc = dictHistoryXML();
  var newNode = xmlDoc.createElement('dict');

  var subNode = xmlDoc.createElement('query');
  var text = xmlDoc.createTextNode(query);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  subNode = xmlDoc.createElement('type');
  text = xmlDoc.createTextNode(type);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  subNode = xmlDoc.createElement('opts');
  text = xmlDoc.createTextNode(opts);
  subNode.appendChild(text);
  newNode.appendChild(subNode);

  xmlDoc.documentElement.appendChild(newNode);

  var outfile = (new XMLSerializer()).serializeToString(xmlDoc);

  writeFile('DPR_Dict_History', outfile);
  DPRNav.dictHistoryBox();
}

return {
saveDictHistory : saveDictHistory,
saveSearchHistory : saveSearchHistory
}
})()
