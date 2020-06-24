'use strict';

class OtherDialogsViewModel {
  constructor() {
    this.quicklinkInput = ko.observable();
    this.quicklinkInNewTab = ko.observable(false);
    this.bookmarkName = ko.observable();
  }

  showQuickLinksDialog() {
    this.quicklinkInput('');
    this.quicklinkInNewTab(false);
    $('#quicklink-dialog-root').on('shown.bs.modal', () => $('#dialog-quicklinkInput').trigger('focus'));
    $('#quicklink-dialog-root').modal('show');
  }

  async sendQuickLinkFromDialog() {
    var place = this.quicklinkInput();
    var outplace = convertShortLink(place);
    if(outplace[0] === false) {
      return alertFlash(outplace[1], outplace[2]);
    }
    this.quicklinkInNewTab() ? await openPlace(outplace,null,null,'new') : await openPlace(outplace);
  }

  gotoHome() {
    openDPRTab(DPR_PAL.dprHomePage, 'DPR-main', 1);
  }

  gotoPrevDictEntry() {
    //TO DO
    if (dBot.getElementById('tout')) { dBot.getElementById('tout').onclick(); }
    else if (document.getElementById('pSect')) document.getElementById('pSect').onmouseup();
  }

  gotoNextDictEntry() {
    //TO DO
    if (dBot.getElementById('bout')) { dBot.getElementById('bout').onclick(); }
    else if (document.getElementById('nSect')) document.getElementById('nSect').onmouseup();
  }

  toggleDPRSidebar() {
    DPR_Chrome.toggleDPRSidebar();
    event.preventDefault();
  }

  showBottomPane(key) {
    DPRShowBottomPane(BottomPaneTabsViewModel.TabIds[key - 1]);
    event.preventDefault();
  }

  sendToConvert() {
    if (window.getSelection().toString() != '') {
      window.sendtoconvert(window.getSelection().toString() + '');
      this.showBottomPane(2);
    }
    else if (document.getElementById('convi')) {
      window.sendtoconvert(document.getElementById('convi').innerHTML);
      this.showBottomPane(2);
    }
    else alertFlash('You must select some text to send to the convertor', 'yellow');
  }

  sendToTextpad() {
    if (window.getSelection().toString() != '') {
      window.sendtoPad(window.getSelection().toString() + '');
      this.showBottomPane(3);
    }
    else if (document.getElementById('convi')) {
      window.sendtoPad(document.getElementById('convi').innerHTML);
      this.showBottomPane(3);
    }
    else alertFlash('You must select some text to send to the textpad', 'yellow');
  }

  appendToTextpad() {
    if (window.getSelection().toString() != '') {
      window.sendtoPad(window.getSelection().toString() + '', true);
      this.showBottomPane(3);
    }
    else if (document.getElementById('convi')) {
      window.sendtoPad(document.getElementById('convi').innerHTML, true);
      this.showBottomPane(3);
    }
    else alertFlash('You must select some text to send to the textpad', 'yellow');
  }

  displayPaliQuote() {
    showBv();
    $('#paliquote-dialog-root').modal('show');
  }

  showBookmarksDialog() {
    $('#bookmark-dialog-root').modal('show');
  }

  sendBookmarkFromDialog() {

    var loc = __navigationTabViewModel.placeArray();
    var name = this.bookmarkName();
    var desc = "";
    var check = {value: false};                  // default the checkbox to false

    var scroll = document.getElementById('maf').scrollTop;

    var cont = getBookmarks();
    cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>');
    var parser=new DOMParser();
    var xmlDoc = parser.parseFromString(cont,'text/xml');

    var newNode = xmlDoc.createElement('bookmark');
    var newNodeName = xmlDoc.createElement('name');
    var newNodeLoc = xmlDoc.createElement('location');
    var newNodeScroll = xmlDoc.createElement('scroll');
    var newNodeDesc = xmlDoc.createElement('description');

    //document.form.nik.selectedIndex + '#' + document.form.book.selectedIndex  + '#' + document.form.meta.selectedIndex  + '#' + document.form.volume.selectedIndex  + '#' + document.form.vagga.selectedIndex  + '#' + document.form.sutta.selectedIndex + '#' + document.form.section.selectedIndex + '#' + hier;

    var tLoc = xmlDoc.createTextNode(loc);
    newNodeLoc.appendChild(tLoc);
    newNode.appendChild(newNodeLoc);

    var tName = xmlDoc.createTextNode(name);
    newNodeName.appendChild(tName);
    newNode.appendChild(newNodeName);

    var tScroll = xmlDoc.createTextNode(scroll);
    newNodeScroll.appendChild(tScroll);
    newNode.appendChild(newNodeScroll);

    var tDesc = xmlDoc.createTextNode(desc);
    newNodeDesc.appendChild(tDesc);
    newNode.appendChild(newNodeDesc);

    xmlDoc.documentElement.appendChild(newNode);

    //__navigationTabViewModel.updateBookmarks(xmlDoc);
    alertFlash('Bookmark Saved','green');

    //sendUpdateBookmarks();

  }

  resetSettings() {
    resetAllDprSettings();
    window.location.reload();
  }

  openNewQuizz() {
    // TODO when quizz is implemented
  }

  openHelp() {
    $('#helpDialog').modal('show');
  }

  openHelpVideo() {
    openDPRTab('https://www.youtube.com/watch?v=8n_Tyh2itsQ', 'DPR-help', 0);
  }

  launchFeedbackForm() {
    openDPRTab($(".feedback-form-link").attr("href"), 'DPR-feedback', 0);
  }
}
