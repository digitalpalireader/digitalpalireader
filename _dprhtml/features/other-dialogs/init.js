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
}
