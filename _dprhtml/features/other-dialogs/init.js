import * as DprGlobals from '../../dpr_globals.js'
import * as Navigation from '../navigation/init.js'

export class OtherDialogsViewModel {
  constructor() {
    this.quicklinkInput = ko.observable()
    this.quicklinkInNewTab = ko.observable(false)
    this.bookmarkName = ko.observable()
    this.sectionId = window.DPR_Chrome.getPrimarySectionId()
    OtherDialogsViewModel.subscribeToEvents(this)
  }

  showQuickLinksDialog() {
    this.quicklinkInput('')
    this.quicklinkInNewTab(false)
    $('#quicklink-dialog-root').on('shown.bs.modal', () => $('#dialog-quicklinkInput').trigger('focus'))
    $('#quicklink-dialog-root').modal('show')
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  async sendQuickLinkFromDialog() {
    const place = this.quicklinkInput()
    const outplace = window.DPR_navigation_common_mod.convertShortLink(place)
    if (outplace[0] === false) {
      window.DPR1_format_mod.alertFlash(outplace[1], outplace[2])
      return
    }

    if (this.quicklinkInNewTab()) {
      await window.DPR1_send_mod.openPlace(this.sectionId, outplace, null, null, 'new')
    } else {
      await window.DPR1_send_mod.openPlace(this.sectionId, outplace)
    }
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  gotoHome() {
    window.DPR1_chrome_mod.openDPRTab(window.DPR_PAL.dprHomePage, 'DPR-main', 1)
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  gotoPrevDictEntry() {
    // TODO: Following was the code. But I cannot find bout or dBot
    const dBot = undefined
    if (dBot.getElementById('tout')) {
      dBot.getElementById('tout').onclick()
    } else if (document.getElementById('pSect')) {
      document.getElementById('pSect').onmouseup()
    }
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  gotoNextDictEntry() {
    // TODO: Following was the code. But I cannot find bout or dBot
    const dBot = undefined
    if (dBot.getElementById('bout')) {
      dBot.getElementById('bout').onclick()
    } else if (document.getElementById('nSect')) {
      document.getElementById('nSect').onmouseup()
    }
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  toggleDPRSidebar() {
    window.DPR_Chrome.toggleDPRSidebar()
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  showBottomPane(key) {
    window.DPR1_chrome_mod.DPRShowBottomPane(window.BottomPaneTabIds[key - 1])
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  sendToConvert() {
    if (window.getSelection().toString() !== '') {
      window.DPR_convert_mod.sendtoconvert(window.getSelection().toString())
      this.showBottomPane(2)
    } else if (document.getElementById('convi')) {
      window.DPR_convert_mod.sendtoconvert(document.getElementById('convi').innerHTML)
      this.showBottomPane(2)
    } else {
      window.DPR1_format_mod.alertFlash('You must select some text to send to the convertor', 'yellow')
    }
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  sendToTextpad() {
    if (window.getSelection().toString() !== '') {
      window.DPR_convert_mod.sendtoPad(window.getSelection().toString())
      this.showBottomPane(3)
    } else if (document.getElementById('convi')) {
      window.DPR_convert_mod.sendtoPad(document.getElementById('convi').innerHTML)
      this.showBottomPane(3)
    } else {
      window.DPR1_format_mod.alertFlash('You must select some text to send to the textpad', 'yellow')
    }
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  appendToTextpad() {
    if (window.getSelection().toString() !== '') {
      window.DPR_convert_mod.sendtoPad(window.getSelection().toString(), true)
      this.showBottomPane(3)
    } else if (document.getElementById('convi')) {
      window.DPR_convert_mod.sendtoPad(document.getElementById('convi').innerHTML, true)
      this.showBottomPane(3)
    } else {
      window.DPR1_format_mod.alertFlash('You must select some text to send to the textpad', 'yellow')
    }
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  displayPaliQuote() {
    window.DPR_bv_mod.showBv()
    $('#paliquote-dialog-root').modal('show')
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  showBookmarksDialog() {
    $('#bookmark-dialog-root').modal('show')
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  sendBookmarkFromDialog() {
    const loc = Navigation.ViewModel.placeArray()
    const name = this.bookmarkName()
    const desc = ''

    const scroll = document.getElementById('maf').scrollTop

    let cont = window.DPR_bookmarks_mod.getBookmarks()
    cont = (cont ? cont.join('\n') : '<?xml version="1.0" encoding="UTF-8"?>\n<xml></xml>')
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(cont, 'text/xml')

    const newNode = xmlDoc.createElement('bookmark')
    const newNodeName = xmlDoc.createElement('name')
    const newNodeLoc = xmlDoc.createElement('location')
    const newNodeScroll = xmlDoc.createElement('scroll')
    const newNodeDesc = xmlDoc.createElement('description')

    const tLoc = xmlDoc.createTextNode(loc)
    newNodeLoc.appendChild(tLoc)
    newNode.appendChild(newNodeLoc)

    const tName = xmlDoc.createTextNode(name)
    newNodeName.appendChild(tName)
    newNode.appendChild(newNodeName)

    const tScroll = xmlDoc.createTextNode(scroll)
    newNodeScroll.appendChild(tScroll)
    newNode.appendChild(newNodeScroll)

    const tDesc = xmlDoc.createTextNode(desc)
    newNodeDesc.appendChild(tDesc)
    newNode.appendChild(newNodeDesc)

    xmlDoc.documentElement.appendChild(newNode)

    window.DPR1_format_mod.alertFlash('Bookmark Saved', 'green')
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  resetSettings() {
    window.DPR_prefload_mod.resetAllDprSettings()
    window.location.reload()
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  openNewQuizz() {
    // TODO: when quiz is implemented
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  openHelp() {
    $('#helpDialog').modal('show')
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  openHelpVideo() {
    window.DPR1_chrome_mod.openDPRTab('https://www.youtube.com/watch?v=qP2i7xY2sRI', 'DPR-help', 0)
  }

  // NOTE: Needs to be a instance member as it is called from ko
  // eslint-disable-next-line class-methods-use-this
  launchFeedbackForm() {
    window.DPR1_chrome_mod.openDPRTab($('.feedback-form-link').attr('href'), 'DPR-feedback', 0)
  }

  static subscribeToEvents(thisObj) {
    window.DPR_Mediator.on('OtherDialogs:sendToConvert', () => thisObj.sendToConvert())
    window.DPR_Mediator.on('OtherDialogs:sendToTextpad', () => thisObj.sendToTextpad())
    window.DPR_Mediator.on('OtherDialogs:appendToTextpad', () => thisObj.appendToTextpad())
    window.DPR_Mediator.on('OtherDialogs:showBookmarksDialog', () => thisObj.showBookmarksDialog())
    window.DPR_Mediator.on('OtherDialogs:showSettingsDialog', () => thisObj.showSettingsDialog())
    window.DPR_Mediator.on('OtherDialogs:showQuickLinksDialog', () => thisObj.showQuickLinksDialog())
    window.DPR_Mediator.on('OtherDialogs:gotoHome', () => thisObj.gotoHome())
    window.DPR_Mediator.on('OtherDialogs:toggleDPRSidebar', () => thisObj.toggleDPRSidebar())
    window.DPR_Mediator.on('OtherDialogs:showBottomPane', () => thisObj.showBottomPane())
    window.DPR_Mediator.on('OtherDialogs:displayPaliQuote', () => thisObj.displayPaliQuote())
    window.DPR_Mediator.on('OtherDialogs:resetSettings', () => thisObj.resetSettings())
    window.DPR_Mediator.on('OtherDialogs:openNewQuizz', () => thisObj.openNewQuizz())
    window.DPR_Mediator.on('OtherDialogs:openHelp', () => thisObj.openHelp())
    window.DPR_Mediator.on('OtherDialogs:openHelpVideo', () => thisObj.openHelpVideo())
    window.DPR_Mediator.on('OtherDialogs:launchFeedbackForm', () => thisObj.launchFeedbackForm())
    window.DPR_Mediator.on('OtherDialogs:showInstallationDialog', () => thisObj.showInstallationDialog())
  }
}

export const ViewModel = new OtherDialogsViewModel()
DprGlobals.singleton.OtherDialogsViewModel = ViewModel
