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
    let wMain = window;
    if (window.getSelection().toString() != '') {
      wMain.sendtoconvert(window.getSelection().toString() + '');
    }
    else if (document.getElementById('convi')) { wMain.sendtoconvert(document.getElementById('convi').innerHTML); }
    else alertFlash('You must select some text to send to the convertor', 'yellow');
    this.showBottomPane(1);
    return;
  }
}
