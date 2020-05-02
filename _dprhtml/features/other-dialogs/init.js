'use strict';

class OtherDialogsViewModel {
  constructor() {
    this.quicklinkInput = ko.observable();
    this.quicklinkInNewTab = ko.observable(false);
  }

  showQuickLinksDialog() {
    $('#quicklink-dialog-root').modal('show');
    return;
  }

  sendQuickLinkFromDialog() {
    DPRSend.sendQuickLink(null, null, this.quicklinkInput(), this.quicklinkInNewTab());
  }

  gotoHome() {
    openDPRTab(DPR_PAL.dprHomePage, 'DPR-main', 1);
    return;
  }

  toggleDPRSidebar() {
    DPR_Chrome.toggleDPRSidebar();
    event.preventDefault();
    return;
  }

  showBottomPane(key) {
    DPRShowBottomPane(BottomPaneTabsViewModel.TabIds[key]);
    event.preventDefault();
    return;
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
    return;
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
    return;
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
    return;
  }
}
