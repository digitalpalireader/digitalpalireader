'use strict';

class OtherDialogsViewModel {
  constructor() {
    this.quicklinkInput = ko.observable();
    this.quicklinkInNewTab = ko.observable(false);
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

    //var para = outplace.pop();
    openPlace(outplace);
  }

  gotoHome() {
    openDPRTab(DPR_PAL.dprHomePage, 'DPR-main', 1);
  }

  toggleDPRSidebar() {
    DPR_Chrome.toggleDPRSidebar();
    event.preventDefault();
  }

  showBottomPane(key) {
    DPRShowBottomPane(BottomPaneTabsViewModel.TabIds[key]);
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
}
