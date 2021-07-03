'use strict';

const DPR_Web_Navigation_Sidebar = (function () {
  async function changeSet(nik) {
    window.DPR_Globals.NavigationTabViewModel.set(nik);

    const prevSet = DPR_G.G_numberToNik[window.DPR_Globals.NavigationTabViewModel.prevSetIndex]
    if (DPR_G.G_hier == 't' && this.limitt(DPR_G.G_nikToNumber2[window.DPR_Globals.NavigationTabViewModel.set()])) {
      DPR_Chrome.showErrorToast('Ṭīkā not available for ' + DPR_G.G_nikLongName[window.DPR_Globals.NavigationTabViewModel.set()] + '.')
      window.DPR_Globals.NavigationTabViewModel.set(prevSet);
      return;
    }
    if (DPR_G.G_hier == 'a' && window.DPR_Globals.NavigationTabViewModel.set() == 'g') {
      DPR_Chrome.showErrorToast('Atthakatha not available for Gram.')
      window.DPR_Globals.NavigationTabViewModel.set(prevSet);
      return;
    }
    if (DPR_G.G_hier == 'a' && window.DPR_Globals.NavigationTabViewModel.set() == 'b') {
      DPR_Chrome.showErrorToast('Atthakatha not available for Abhidh-s.');
      window.DPR_Globals.NavigationTabViewModel.set(prevSet);
      return;
    }

    window.DPR_Globals.NavigationTabViewModel.prevSetIndex = DPR_G.G_nikToNumber2[nik];

    this.setBookList(nik);
  }

  function getBookName(nik, ht, no) { // nik is nikaya, ht is a DPR_G.G_hier, no will be xml no - 1
    if (Object.keys(DPR_G.G_kynames).includes(nik)) {
      no = DPR_G.G_kynames[nik][no];
      if (ht != 'm') no = no.replace(/([^a]) 1$/, '$1');
    }
    else no++;
    return no.toString();
  }

  function setBookList(nik, book) {
    var titles;
    if (DPR_G.nikvoladi[nik]) titles = DPR_G.nikvoladi[nik];
    else titles = DPR_G.nikvoladi[nik+DPR_G.G_hier];
    window.DPR_Globals.NavigationTabViewModel.navBook.removeAll();

    for (var i = 0; i < titles.length; i++) {
      var title;
      var val;
      if(Object.keys(DPR_G.G_kynames).includes(nik)) {
        title = DPR_G.G_kynames[nik][titles[i]];
        val = titles[i]+1;
      }
      else {
        title = titles[i];
        val = i+1;
      }
      window.DPR_Globals.NavigationTabViewModel.navBook.push({value: val, label: DPR_translit_mod.translit(title)});
    }

    window.DPR_Globals.NavigationTabViewModel.book(book ? book : window.DPR_Globals.NavigationTabViewModel.navBook()[0].value);
  }

  function limitt(nikn) {
    if (nikn == 5 || nikn > 6) { return true; }
    else { return false };
  }

  async function setSearchBookList() {
    const nik = $('#tsoSETm').val();

    const titles = DPR_G.nikvoladi[nik] ? DPR_G.nikvoladi[nik] : DPR_G.nikvoladi[nik + $('#tsoMAT2m').val()];

    window.DPR_Globals.SearchTabViewModel.bookListA.removeAll();
    window.DPR_Globals.SearchTabViewModel.bookListB.removeAll();
    window.DPR_Globals.SearchTabViewModel.bookMenu.removeAll();
    for (var i = 0; i < titles.length; i++) {
      // menu
      let menuValue = ((nik == 'k' || nik == 'y' || nik == 'n') ? (titles[i] + 1) : (i + 1));
      let menuText = DPR_translit_mod.translit((nik == 'k' || nik == 'y' || nik == 'n') ? DPR_G.G_kynames[nik][titles[i]] : DPR_G.G_nikLongName[nik] + ' ' + titles[i]);

      window.DPR_Globals.SearchTabViewModel.bookMenu.push({label: menuText, value: menuValue});

      // check boxes
      const label = ((nik == 'k' || nik == 'y' || nik == 'n') ? DPR_G.G_kynames[nik][titles[i]] : (typeof (titles[i]) == 'number' ? 'Book ' : '') + titles[i]);
      const cbValue = ((nik == 'k' || nik == 'y' || nik == 'n') ? (titles[i] + 1) : (i + 1));

    if (i >= Math.ceil(titles.length / 2)) {

        window.DPR_Globals.SearchTabViewModel.bookListB.push({label: label, id:`tsoBObook${i+1}`, value: cbValue, selected: window.DPR_Globals.SearchTabViewModel.searchBookCheckbox(i+1)});
      } else{
        window.DPR_Globals.SearchTabViewModel.bookListA.push({label: label, id:`tsoBObook${i+1}`, value: cbValue, selected: window.DPR_Globals.SearchTabViewModel.searchBookCheckbox(i+1)});
      }
    }
    await DPRXML.updateSearchHierarchy(0);
  }

  function switchhier(htmp) {

    if (DPR_G.G_hier == htmp) return;

    if (htmp == 't' && this.limitt(window.DPR_Globals.NavigationTabViewModel.prevSetIndex)) {
      DPR_Chrome.showErrorToast('Ṭīkā not available for ' + DPR_G.G_nikLongName[window.DPR_Globals.NavigationTabViewModel.set()] + '.');
      window.DPR_Globals.NavigationTabViewModel.MAT(window.DPR_Globals.NavigationTabViewModel.prevMat);
      return;
    }
    if (htmp == 'a' && window.DPR_Globals.NavigationTabViewModel.prevSetIndex > 7) {
      DPR_Chrome.showErrorToast('Aṭṭhakathā not available for ' + DPR_G.G_nikLongName[window.DPR_Globals.NavigationTabViewModel.set()] + '.');
      window.DPR_Globals.NavigationTabViewModel.MAT(window.DPR_Globals.NavigationTabViewModel.prevMat);
      return;
    }
    if (window.DPR_Globals.NavigationTabViewModel.set() == 'k' && htmp == 'a' && DPR_G.kudvala[window.DPR_Globals.NavigationTabViewModel.book()] == undefined) {
      DPR_Chrome.showErrorToast('Aṭṭhakathā not available for ' + this.getBookName(window.DPR_Globals.NavigationTabViewModel.set(), htmp, window.DPR_Globals.NavigationTabViewModel.navBook().findIndex(x => x.value === window.DPR_Globals.NavigationTabViewModel.book())) + '.');
      window.DPR_Globals.NavigationTabViewModel.MAT(window.DPR_Globals.NavigationTabViewModel.prevMat);
      return;
    }

    DPR_G.G_hier = htmp;
    window.DPR_Globals.NavigationTabViewModel.prevMat = htmp;

    var book = window.DPR_Globals.NavigationTabViewModel.book();
    if (window.DPR_Globals.NavigationTabViewModel.set() == 'k') {
      if (htmp == 'm') {
        book = parseInt(book) - 1;
      }
      else {
        book = DPR_G.kudvala[book];
      }
    }
    else if (window.DPR_Globals.NavigationTabViewModel.set() == 'y') {
      var book = window.DPR_Globals.NavigationTabViewModel.book();
      if (htmp == 'm') {
        book = parseInt(book) - 1;
      }
      else {
        book = DPR_G.abhivala[book];
      }
    }
    else
      book = parseInt(book) - 1;

    this.setBookList(window.DPR_Globals.NavigationTabViewModel.set(), book);
  }

  function historyBox() {
    const sectionId = DPR_Chrome.getPrimarySectionId()

    if (!DPR_PAL.isXUL) {
      return true;
    }

    // history

    var hout = '';
    var theHistory = DPR_history_mod.getHistory();
    if (theHistory.length > 0) {
      document.getElementById('hist-box').collapsed = false;
      var histNode = document.getElementById('history');
      while (histNode.itemCount > 0) histNode.removeItemAt(0);
      var isclear = '';
      histNode.appendItem('-- History --', '0');
      for (var i = 0; i < theHistory.length; i++) {
        var thist = theHistory[i].split('@');
        var thist0 = DPR_translit_mod.toUni(thist[0]);
        thist0 = thist0.split('-');
        thist0[thist0.length - 1] = DPR_translit_mod.translit(thist0[thist0.length - 1]);
        thist0 = thist0.join('-');
        histNode.appendItem(thist0, thist[1]);

        var ch = histNode.childNodes[0].childNodes;
        var x = thist[1].split(',');
        if (x.length > 3) {
          ch[i + 1].setAttribute('onclick', "DPRSend.openPlace(" + `${sectionId}, ` + "[" + x[0] + "'," + x[1] + "," + x[2] + "," + x[3] + "," + x[4] + "," + x[5] + "," + x[6] + ",'" + x[7] + "'],null,null,DPRSend.eventSend(event));");
        }
        else {
          ch[i + 1].setAttribute('onclick', "DPRSend.openIndex(" + `${sectionId}, ` + "['" + x[0] + "'," + x[1] + ",'" + x[2] + "'],DPRSend.eventSend(event));");
        }
      }
      histNode.selectedIndex = 0;
    }
    else document.getElementById('hist-box').collapsed = true;
  }

  function readXML(file) {
    var cont = DPR_io_mod.readFile(file);
    cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(cont, 'text/xml');
    return xmlDoc;
  }

  function searchHistoryBox() {
    console.log("History not yet implemented.");
    return;
    var xmlDoc = this.readXML('DPR_Search_History');

    var bNodes = xmlDoc.getElementsByTagName('search');
    if (bNodes.length > 0) {
      document.getElementById('sh-box').collapsed = false;
      var bList = document.getElementById('searches');
      while (bList.itemCount > 0) bList.removeItemAt(0);
      bList.appendItem('-- History --');

      var types = ['Sets', 'Books', 'Book', 'Part', '', 'ATI'];

      var cnt = 0;

      for (var i = bNodes.length - 1; i >= 0; i--) { // backwards
        cnt++;

        var searchType = bNodes[i].getElementsByTagName('searchType')[0].textContent;
        var searchString = bNodes[i].getElementsByTagName('query')[0].textContent;
        var searchMAT = bNodes[i].getElementsByTagName('MAT')[0].textContent;
        var searchSet = bNodes[i].getElementsByTagName('sets')[0].textContent;
        var searchBook = bNodes[i].getElementsByTagName('book')[0].textContent;
        var searchPart = bNodes[i].getElementsByTagName('part')[0].textContent;
        var searchRX = bNodes[i].getElementsByTagName('rx')[0].textContent;

        var place = '';

        switch (parseInt(searchType)) {
          case 0:
          case 5:
            place = searchSet.split('').join(',');
            break;
          case 1:
            place = DPR_G.G_nikLongName[searchSet];
            break;
          case 2:
          case 3:
          case 4:
            place = DPR_G.G_nikLongName[searchSet] + ' ' + searchBook.split('').join(',');
            break;
        }

        bList.appendItem('\'' + searchString + '\' - ' + place + ' (' + types[parseInt(searchType)] + ')');

        var ch = bList.childNodes[0].childNodes;
        ch[cnt].setAttribute('value', searchType + "|" + searchString + "|" + searchMAT + "|" + searchSet + "|" + searchBook + "|" + searchPart + "|" + searchRX);
        //ch[cnt].setAttribute('tooltiptext','run search');
      }
      bList.selectedIndex = 0;

    }
    else document.getElementById('sh-box').collapsed = true;
  }

  function dictHistoryBox() {
    var xmlDoc = this.readXML('DPR_Dict_History');

    var bNodes = xmlDoc.getElementsByTagName('dict');
    if (bNodes.length > 0) {
      document.getElementById('dh-box').collapsed = false;
      var bList = document.getElementById('dicts');
      while (bList.itemCount > 0) bList.removeItemAt(0);
      bList.appendItem('-- History --');

      var cnt = 0;

      for (var i = bNodes.length - 1; i >= 0; i--) {
        cnt++;

        var query = bNodes[i].getElementsByTagName('query')[0].textContent;
        var type = bNodes[i].getElementsByTagName('type')[0].textContent;
        var opts = bNodes[i].getElementsByTagName('opts')[0].textContent.replace(/,/g, "','");

        bList.appendItem(query + ' (' + type + ')');

        var ch = bList.childNodes[0].childNodes;
        ch[cnt].setAttribute('onclick', "DPRSend.sendDict(true,DPRSend.eventSend(event),'" + type + "','" + DPR_translit_mod.translit(query) + "',['" + opts + "']);");
        ch[cnt].setAttribute('tooltiptext', 'run lookup');
      }
      bList.selectedIndex = 0;

    }
    else document.getElementById('dh-box').collapsed = true;
  }

  function bookmarkBox() {
    var xmlDoc = this.readXML('DPR_Bookmarks');

    var bNodes = xmlDoc.getElementsByTagName('bookmark');
    if (bNodes.length > 0) {
      document.getElementById('bm-box').collapsed = false;
      var bList = document.getElementById('bookmarks');
      while (bList.itemCount > 0) bList.removeItemAt(0);
      bList.appendItem('-- Bookmarks --');
      for (var i = 0; i < bNodes.length; i++) {

        var name = bNodes[i].getElementsByTagName('name')[0].textContent;
        var loc = bNodes[i].getElementsByTagName('location')[0].textContent.split('#');
        var scroll = bNodes[i].getElementsByTagName('scroll')[0].textContent;
        var desc = bNodes[i].getElementsByTagName('description')[0].textContent;

        bList.appendItem(DPR_translit_mod.translit(name));

        var ch = bList.childNodes[0].childNodes;
        ch[i + 1].setAttribute('onclick', "DPRSend.openPlace(" + `${sectionId}` + "[" + loc[0] + "'," + loc[1] + "," + loc[2] + "," + loc[3] + "," + loc[4] + "," + loc[5] + "," + loc[6] + ",'" + loc[7] + "'],null,null,DPRSend.eventSend(event)," + scroll + ");");
        ch[i + 1].setAttribute('tooltiptext', desc);
      }
      bList.selectedIndex = 0;

    }
    else document.getElementById('bm-box').collapsed = true;
  }

  function gotoPlace(place) {
    window.DPR_Globals.NavigationTabViewModel.set(place[0]);
    window.DPR_Globals.NavigationTabViewModel.MAT(place[place.length-1]);
    const b = window.DPR_Globals.NavigationTabViewModel.navBook().findIndex(x => x.value === parseInt(place[1]) + 1);
    window.DPR_Globals.NavigationTabViewModel.book(window.DPR_Globals.NavigationTabViewModel.navBook()[b].value);
    if (place.length > 3) {
      window.DPR_Globals.NavigationTabViewModel.meta(place[2].toString().replace('x','0'));
      window.DPR_Globals.NavigationTabViewModel.volume(place[3].toString().replace('x','0'));
      window.DPR_Globals.NavigationTabViewModel.vagga(place[4].toString().replace('x','0'));
      window.DPR_Globals.NavigationTabViewModel.sutta(place[5].toString().replace('x','0'));
      window.DPR_Globals.NavigationTabViewModel.section(place[6].toString().replace('x','0'));
    }
  }

  async function searchBook(nik, book, hiert) {
    appInsights.trackEvent({ name: 'Search book',  properties: { nik, book, hiert }});

    DPR_Chrome.openDPRSidebar();
    $("#searchTab").click();
    document.getElementById('tipType').selectedIndex = 2;
    await DPROpts.tipitakaOptions();
    document.getElementById('tsoSETm').selectedIndex = DPR_G.G_nikToNumber[nik];
    await this.setSearchBookList();

    document.getElementById('tsoBOOKm').selectedIndex = book - 1;
    await DPRXML.updateSearchHierarchy(0);
    document.getElementById('tsoMATm').checked= (hiert == 'm');
    document.getElementById('tsoMATa').checked= (hiert == 'a');
    document.getElementById('tsoMATt').checked= (hiert == 't');
  }

  return {
    changeSet,
    getBookName,
    setBookList,
    limitt,
    setSearchBookList,
    switchhier,
    historyBox,
    readXML,
    searchHistoryBox,
    dictHistoryBox,
    bookmarkBox,
    gotoPlace,
    searchBook,
  }
})()

window.DPRNav = DPR_Web_Navigation_Sidebar