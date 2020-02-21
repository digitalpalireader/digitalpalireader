if (DPR_PAL.isWeb) {
  console.log('Loading DPR_PAL_Send_Sidebar...');
} else {
  console.log('Cannot DPR_PAL_Send_Sidebar for the wrong platform', DPR_PAL);
}

var DPRSend = {

  eventSend: function (event, internal) {
    if (!event) return;
    if (event.ctrlKey || event.which == 2) return true;
    if (event.shiftKey) return 'shift';
    if (event.which == 1 && internal) return 'internal';
    if (event.which == 1) return false;
    if (event.keyCode) return false;
    return 'right';
  },


  importXML: function (section, labelsearch, para, isPL, add, scroll, cat) {

    if (DPR_PAL.isXUL) {
      var nikaya = document.getElementById('set').value;
      var bookno = parseInt(document.getElementById('book').value) - 1;
    } else {
      var nikaya = document.getElementById('nav-set').value;
      var bookno = parseInt(document.getElementById('nav-book').value) - 1;
    }

    var sutta = 'x', vagga = 'x', volume = 'x', meta = 'x';

    if (section === false) section = 'x';

    //alert(cat);

    if (!cat) cat = 6;

    switch (cat) {
      case 6:
        if (section == 'x') {
          section = document.getElementById('section').selectedIndex;
        }
      case 5:
        sutta = document.getElementById('sutta').selectedIndex;
      case 4:
        vagga = document.getElementById('vagga').selectedIndex;
      case 3:
        volume = document.getElementById('volume').selectedIndex;
      case 2:
        meta = document.getElementById('meta').selectedIndex;
        break;
      default:
        break;
    }


    if (G_hier == 't' && DPRNav.limitt()) {
      alertFlash('Ṭīkā not available for ' + G_nikLongName[document.getElementById('set').value] + '.', 'RGBa(255,0,0,0.8)');
      return;
    }
    if (G_hier == 'a' && nikaya == 'g') {
      alertFlash('Atthakatha not available for grammar.', 'RGBa(255,0,0,0.8)');
      return;
    }
    if (G_hier == 'a' && nikaya == 'b') {
      alertFlash('Atthakatha not available for Abhidh-s.', 'RGBa(255,0,0,0.8)');
      return;
    }



    if (!add && DPR_PAL.isXUL) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLSection(labelsearch, para, [nikaya, bookno, meta, volume, vagga, sutta, section, G_hier]);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + G_hier + (labelsearch ? '&query=' + toVel(labelsearch.join('+')) : '') + (para ? '&para=' + para : '') + (scroll ? '&scroll=' + scroll : '');
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLSection(labelsearch, para, [nikaya, bookno, meta, volume, vagga, sutta, section, G_hier]);
      }
    }
    else if (add == 'shift' && DPR_PAL.isXUL) {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        var elem = thisTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = thisTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + bookno + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + G_hier + (labelsearch ? '&query=' + toVel(labelsearch.join('+')) : '') + (para ? '&para=' + para : '') + (scroll ? '&scroll=' + scroll : '') + '&compare=' + count;

        var node = this.createBrowser(thisTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(thisTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + G_hier + (labelsearch ? '&query=' + toVel(labelsearch.join('+')) : '') + (para ? '&para=' + para : '') + (scroll ? '&scroll=' + scroll : '');
        openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        var elem = oldTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = oldTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + bookno + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + G_hier + (labelsearch ? '&query=' + toVel(labelsearch.join('+')) : '') + (para ? '&para=' + para : '') + (scroll ? '&scroll=' + scroll : '') + '&compare=' + count;

        var node = this.createBrowser(oldTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(oldTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
    }
    else if (DPR_PAL.isXUL) {
      var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + G_hier + (labelsearch ? '&query=' + toVel(labelsearch.join('+')) : '') + (para ? '&para=' + para : '') + (scroll ? '&scroll=' + scroll : '');
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
    else {
      let aplace = [nikaya, bookno, meta, volume, vagga, sutta, section, G_hier];
      Web_Send_OpenPlace(aplace, para, "", add);
    }
  },

  importXMLindex: function (add) {
    var nikaya = document.getElementById('set').value;
    var bookno = document.getElementById('book').value - 1;

    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLindex([nikaya, bookno, G_hier]);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');

      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + G_hier;
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLindex([nikaya, bookno, G_hier]);
      }
    }
    else if (add == 'shift') {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        var elem = thisTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = thisTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + bookno + '.' + G_hier + '&compare=' + count;

        var node = this.createBrowser(thisTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(thisTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + G_hier;
        openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        var elem = oldTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = oldTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + bookno + '.' + G_hier + '&compare=' + count;

        var node = this.createBrowser(oldTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(oldTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
    }
    else {
      var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + bookno + '.' + G_hier;
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  },

  openPlace: function ([nikaya, book, meta, volume, vagga, sutta, section, hiert], para, stringra, add) {
    if (!nikaya || add == 'right') return;

    if (stringra) {
      stringra = stringra.replace(/`/g, '"');
      stringra = stringra.split('#');
      if (G_searchRX == 'true') {
        for (i in stringra) { stringra[i] = new RegExp(stringra[i]); }
      }
    }
    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLSection(stringra, para, [nikaya, book, meta, volume, vagga, sutta, section, hiert]);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (stringra ? '&query=' + toVel(stringra.join('+')) : '') + (para ? '&para=' + (para + 1) : '');
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLSection(stringra, para, [nikaya, book, meta, volume, vagga, sutta, section, hiert]);
      }
    }
    else if (add == 'shift') {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        var elem = thisTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = thisTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (stringra ? '&query=' + toVel(stringra.join('+')) : '') + (para ? '&para=' + (para + 1) : '') + '&compare=' + count;

        var node = this.createBrowser(thisTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(thisTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (stringra ? '&query=' + toVel(stringra.join('+')) : '') + (para ? '&para=' + (para + 1) : '');
        openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        var elem = oldTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = oldTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (stringra ? '&query=' + toVel(stringra.join('+')) : '') + (para ? '&para=' + (para + 1) : '') + '&compare=' + count;
        var node = this.createBrowser(oldTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(oldTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
    }
    else {
      var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (stringra ? '&query=' + toVel(stringra.join('+')) : '') + (para ? '&para=' + (para + 1) : '');
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  },

  openIndex: function ([nikaya, book, hiert], add) {
    if (!nikaya || add == 'right') return;
    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLindex([nikaya, book, hiert]);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + hiert;
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.loadXMLindex([nikaya, book, hiert]);
      }
    }
    else if (add == 'shift') {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        var elem = thisTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = thisTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + book + '.' + hiert + '&compare=' + count;

        var node = this.createBrowser(thisTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(thisTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + hiert + '&compare=' + count;
        openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        var elem = oldTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = oldTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + book + '.' + hiert + '&compare=' + count;
        var node = this.createBrowser(oldTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(oldTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
    }
    else {
      var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + hiert;
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  },

  sendQuickLink: function (add, value) {
    if (add == 'right') return;
    var ql;
    if (DPR_PAL.isXUL)
      ql = convertShortLink(document.getElementById('iquick').value);
    else
      ql = convertShortLink(value);
    if (!ql)
      return;
    if (ql[0] === false) {
      return alert(ql[1]);
    }
    var nikaya = ql[0];
    var book = ql[1];
    var meta = ql[2];
    var volume = ql[3];
    var vagga = ql[4];
    var sutta = ql[5];
    var section = ql[6];
    var hiert = ql[7];

    var para = (ql[8] ? ql.pop() : null);

    if (!add && DPR_PAL.isXUL) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        thisTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.openPlace(ql, para);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (para ? '&para=' + para : '');
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        oldTabBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.openPlace(ql, para);
      }
    }
    else if (add == 'shift' && DPR_PAL.isXUL) {
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        var elem = thisTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = thisTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + '&compare=' + count + (para ? '&para=' + para : '');

        var node = this.createBrowser(thisTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(thisTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (para ? '&para=' + para : '');
        openDPRTab(permalink, 'DPR-main');
        return;
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        var elem = oldTabBrowser.contentDocument.getElementById('dpr-tops');
        var count = oldTabBrowser.contentWindow.getBrowserCount() + 1;
        var permalink = 'chrome://digitalpalireader/content/top.htm' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + '&compare=' + count + (para ? '&para=' + para : '');
        var node = this.createBrowser(oldTabBrowser.contentDocument, permalink, count);
        var splitter = this.createSplitter(oldTabBrowser.contentDocument, count);

        elem.appendChild(splitter);
        elem.appendChild(node);
        return;
      }
    }
    else if (DPR_PAL.isXUL) {
      var permalink = 'chrome://digitalpalireader/content/index.xul' + '?loc=' + nikaya + '.' + book + '.' + meta + '.' + volume + '.' + vagga + '.' + sutta + '.' + section + '.' + hiert + (para ? '&para=' + para : '');
      DPRChrome.openDPRTab(permalink, 'DPRm');
    } else {
      let aplace = [nikaya, book, meta, volume, vagga, sutta, section, hiert];
      Web_Send_OpenPlace(aplace, '', '', 'internal');
    }
  },


  sendAnalysisToOutput: function (input, frombox, add) {
    if (DPR_PAL.isWeb) {
      outputAnalysis(input,frombox);
      DPR_PAL.closeSideBar();
      return;
    }

    if (add == 'right') return;

    if (!add) { // reuse old tab
      var thisTab = DPRChrome.isThisDPRTab('DPRm');
      if (thisTab) {
        var thisTabBrowser = mainWindow.gBrowser.getBrowserForTab(thisTab);
        thisTabBrowser.contentWindow.outputAnalysis(input, frombox);
        return;
      }
      var oldTab = DPRChrome.findDPRTab('DPR-main');
      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/index.xul' + '?analysis=' + toVel(input) + '&options=' + frombox;
        DPRChrome.openDPRTab(permalink, 'DPR-main');
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        oldTabBrowser.contentWindow.outputAnalysis(input, frombox);
      }
    }
    else {
      var permalink = 'chrome://digitalpalireader/content/index.xul' + '?analysis=' + toVel(input) + '&frombox=' + frombox;
      DPRChrome.openDPRTab(permalink, 'DPRm');
    }
  },


  sendDict: function (hard, add, which, getstring, opts) {

    DPR_PAL.closeSideBar();

    var start = Date.now();
    var end, mid, elapsed;

    if (add == 'right') return;
    if (!getstring) {
      var getstring = $('#dictin').prop("value");

      if (!hard) {
        if (getstring == this.G_lastsearch || getstring == '' || !DPR_prefs['autodict'] || $('#soregexp').prop("checked") || $('#sofulltext').prop("checked")) return;
      }

      this.G_lastsearch = getstring;

      var which = $('#dictType').prop("value");

      var opts = [];

      for (i in G_nikToNumber) {
        if ($('#soNS' + i) && $('#soNS' + i).prop("checked")) opts.push('x' + i);
      }
      for (i in G_hNumbers) {
        if ($('#soMAT' + i).prop("checked")) opts.push('m' + i);
      }

      if ($('#soregexp').prop("checked")) opts.push('rx');
      if ($('#sofuzzy').prop("checked")) opts.push('fz');
      if ($('#sofulltext').prop("checked")) opts.push('ft');
      if ($('#sostartword').prop("checked")) opts.push('sw');
      if (hard) opts.push('hd');

      if (hard)
        saveDictHistory(getstring, which, opts.join(','));

    }
    if (which == 'DPR') {
      var text = toVel(getstring);

      this.sendAnalysisToOutput(text, (hard ? 1 : 2), add);
    }
    else {
      if (!add && DPR_PAL.isXUL) { // reuse old tab
        var oldTab = DPRChrome.findDPRTab('DPR-dict');
        if (!oldTab) {
          if (!hard)
            return;
          var permalink = 'chrome://digitalpalireader/content/dict.htm' + '?type=' + which + '&query=' + encodeURIComponent(getstring) + '&opts=' + opts.join(',');
          DPRChrome.openDPRTab(permalink, 'DPR-dict');
        }
        else {
          mainWindow.gBrowser.selectedTab = oldTab;
          var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
          oldTabBrowser.contentWindow.startDictLookup(which, getstring, opts);
        }
      }
      else if (hard && DPR_PAL.isXUL) {
        var permalink = 'chrome://digitalpalireader/content/dict.htm' + '?type=' + which + '&query=' + encodeURIComponent(getstring) + '&opts=' + opts.join(',');
        DPRChrome.openDPRTab(permalink, 'DPRd');
      } else {
        const permalink = `${DPR_PAL.dprHomePage}?feature=dictionary&type=${which}&query=${encodeURIComponent(getstring)}&opts=${opts.join(',')}`;
        DPRChrome.openDPRTab(permalink, 'DPRd');
      }
    }
  },

  sendSearch: function (add, searchType, searchString, searchMAT, searchSet, searchBook, searchPart, searchRX) {
    if (add == 'right') return;

    if (!searchString) { // not direct from box

      var getstring = document.getElementById('isearch').value;
      if (!this.checkGetstring(getstring)) return;

      var which = document.getElementById('tipType').selectedIndex;

      if (getstring == '_dev' && DPR_PAL.isXUL) { // Dev
        DPRChrome.openDPRTab('chrome://digitalpalireader/content/dev.xul', 'DPRd');
        return;
      }


      // get options

      if (which == 0 || which == 2) {
        var MAT = (document.getElementById('tsoMATm').checked ? 'm' : '') + (document.getElementById('tsoMATa').checked ? 'a' : '') + (document.getElementById('tsoMATt').checked ? 't' : '');
      }
      else var MAT = document.getElementById('tsoMAT2m').value;

      if (which == 0) { // get sets
        var sets = ''
        for (i in G_nikToNumber) {
          if (document.getElementById('tsoCO' + i).checked) sets += i;
        }
      }
      else if (which == 5) {
        var sets = ''
        for (i in 'dmsak') {
          if (document.getElementById('tsoCO' + 'dmsak'[i]).checked) sets += 'dmsak'[i];
        }
      }
      else var sets = document.getElementById('tsoSETm').value;

      if (which == 1) { // get books
        var book = [];
        if (nikvoladi[document.getElementById('tsoSETm').value]) {
          for (i = 1; i <= nikvoladi[document.getElementById('tsoSETm').value].length; i++) {
            if (document.getElementById('tsoBObook' + i).checked) book.push(i);
          }
        }
        else {
          for (i = 1; i <= nikvoladi[document.getElementById('tsoSETm').value + document.getElementById('tsoMAT2m').value].length; i++) {
            if (document.getElementById('tsoBObook' + i).checked) book.push(document.getElementById('tsoBObook' + i).getAttribute('data-value'));
          }
        }
        book = book.join(',');
      }
      else book = document.getElementById('tsoBOOKm').value;

      if (which == 3) { // get parts
        var part = document.getElementById('tsoPR').value - 1 + '.' + document.getElementById('tsoPmeta').selectedIndex + '.' + document.getElementById('tsoPvolume').selectedIndex + '.' + document.getElementById('tsoPvagga').selectedIndex + '.' + document.getElementById('tsoPsutta').selectedIndex + '.' + document.getElementById('tsoPsection').selectedIndex;
      }
      else part = 1;


      var rx = document.getElementById('tsoRx').checked;

      saveSearchHistory(getstring, which, rx, sets, MAT, book, part);
    }
    else {
      var which = searchType;
      var getstring = searchString;
      var MAT = searchMAT;
      var sets = searchSet;
      var book = searchBook;
      var part = searchPart;
      var rx = searchRX;
    }
    if (!add && DPR_PAL.isXUL) { // reuse old tab
      var oldTab = DPRChrome.findDPRTab('DPR-search');

      if (!oldTab) {
        var permalink = 'chrome://digitalpalireader/content/search.xul' + '?type=' + which + '&query=' + getstring + '&MAT=' + MAT + '&set=' + sets + '&book=' + book + '&part=' + part + '&rx=' + rx;
        DPRChrome.openDPRTab(permalink, 'DPR-search');
      }
      else {
        mainWindow.gBrowser.selectedTab = oldTab;
        var oldTabBrowser = mainWindow.gBrowser.getBrowserForTab(oldTab);
        oldTabBrowser.contentDocument.getElementById('dpr-search-browser').contentWindow.searchTipitaka(which, getstring, MAT, sets, book, part, rx);
      }
    }
    else if (DPR_PAL.isXUL) {
      var permalink = 'chrome://digitalpalireader/content/search.xul' + '?type=' + which + '&query=' + getstring + '&MAT=' + MAT + '&set=' + sets + '&book=' + book + '&part=' + part + '&rx=' + rx;
      DPRChrome.openDPRTab(permalink, 'DPRs');
    } else {
      const permalink = `${DPR_PAL.dprHomePage}?feature=search&type=${which}&query=${getstring}&MAT=${MAT}&set=${sets}&book=${book}&part=${part}&rx=${rx}`;
      DPRChrome.openDPRTab(permalink, 'DPRs');
    }
  },

  checkGetstring: function (getstring) {

    var stringra = [];

    var yesplus = getstring.indexOf('+');
    if (yesplus >= 0) {
      stringra = getstring.split('+');
    }
    if (getstring.length < 3) {
      alertFlash("Minimum three letter search length", 'yellow');
      $('#sbfb').html('<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>');
      $('#sbfa').html('');
      $('#sbfab').html('');
      return false;
    }
    if (stringra.length > 3) {
      alertFlash("Maximum three strings per search", 'yellow');
      $('#sbfb').html('<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>');
      $('#sbfa').html('');
      return false;
    }
    for (var s = 0; s < stringra.length; s++) {
      if (stringra[s].length < 3 && stringra.length > 0) {
        alertFlash("Minimum three letter search length", 'yellow');
        $('#sbfb').html('<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>');
        $('#sbfa').html('');
        $('#sbfab').html('');
        return false;
      }
    }
    return true;
  },

  createBrowser: function (thisDocument, url, count) {
    var browser = thisDocument.createElement('browser');
    browser.setAttribute('disablehistory', 'true');
    browser.setAttribute('type', 'content');
    browser.setAttribute('src', url);
    browser.setAttribute('style', 'max-height:99%');
    browser.setAttribute('flex', '1');
    browser.setAttribute('persist', 'height');
    browser.setAttribute('id', 'dpr-index-top-' + count);

    return browser;
  },

  createSplitter: function (thisDocument, count) {
    var splitter = thisDocument.createElement('splitter');
    splitter.setAttribute('id', 'dpr-index-top-' + count + '-splitter');

    return splitter;
  },
};
