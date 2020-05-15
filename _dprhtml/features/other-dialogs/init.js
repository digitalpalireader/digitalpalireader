'use strict';

class OtherDialogsViewModel {
  constructor() {
    this.quicklinkInput = ko.observable();
    this.quicklinkInNewTab = ko.observable(false);
    this.bookmarkInput = ko.observable();
  }

  showQuickLinksDialog() {
    this.quicklinkInput('');
    this.quicklinkInNewTab(false);
    $('#quicklink-dialog-root').on('shown.bs.modal', () => $('#dialog-quicklinkInput').trigger('focus'));
    $('#quicklink-dialog-root').modal('show');
  }

  sendQuickLinkFromDialog() {
    // TODO: Handle this.quicklinkInNewTab().
    var place = this.quicklinkInput();
    var outplace = convertShortLink(place);
    if(outplace[0] === false) {
      return alertFlash(outplace[1], outplace[2]);
    }

    openPlace(outplace);
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
      this.showBottomPane(1);
    }
    else if (document.getElementById('convi')) {
      window.sendtoconvert(document.getElementById('convi').innerHTML);
      this.showBottomPane(1);
    }
    else alertFlash('You must select some text to send to the convertor', 'yellow');
  }

  sendToTextpad() {
    if (window.getSelection().toString() != '') {
      window.sendtoPad(window.getSelection().toString() + '');
      this.showBottomPane(2);
    }
    else if (document.getElementById('convi')) {
      window.sendtoPad(document.getElementById('convi').innerHTML);
      this.showBottomPane(2);
    }
    else alertFlash('You must select some text to send to the textpad', 'yellow');
  }

  appendToTextpad() {
    if (window.getSelection().toString() != '') {
      window.sendtoPad(window.getSelection().toString() + '', true);
      this.showBottomPane(2);
    }
    else if (document.getElementById('convi')) {
      window.sendtoPad(document.getElementById('convi').innerHTML, true);
      this.showBottomPane(2);
    }
    else alertFlash('You must select some text to send to the textpad', 'yellow');
  }

  displayPaliQuote() {
    showBv();
    $('#paliquote-dialog-root').modal('show');
  }

  showBookmarksDialog() {
    this.bookmarkInput('');
    $('#bookmark-dialog-root').modal('show');
  }

  sendBookmarkFromDialog(loc, name, desc) {
    // TODO when bookmarks is implemented
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
