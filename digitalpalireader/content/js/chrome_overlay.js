var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
         .getInterface(Components.interfaces.nsIWebNavigation)
         .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
         .rootTreeItem
         .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
         .getInterface(Components.interfaces.nsIDOMWindow);


var DPROverlay = {
  init:function() {

    let firstRunPref = "extensions.xulschoolhello.firstRunDone";

    if (!Application.prefs.getValue(firstRunPref,false)) {
      this.addToolbarButton();
      Application.prefs.setValue(firstRunPref, true);
    }

    if(document.getElementById("contentAreaContextMenu"))
      document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function(e){DPROverlay.showHideDPRItem(e)}, false);
  },

  addToolbarButton:function() {
    if (!document.getElementById('dpr-button')) {
      var toolbar = document.getElementById('nav-bar');

      var before = null;
      toolbar.insertItem('dpr-button', before);
      toolbar.setAttribute("currentset", toolbar.currentSet);
      document.persist(toolbar.id, "currentset");
    }
  },

  giveIDtoTabs:function() { // startup function, give ids to

    var main = 0; //no main dpr tabs
    var dict = 0; // no dict tabs
    var search = 0; // no dict tabs
    var etc = 0;
    for (var index = 0, tb = mainWindow.gBrowser; index < tb.tabContainer.childNodes.length; index++) {

      // Get the next tab
      var currentTab = tb.tabContainer.childNodes[index];
      var ctloc = tb.getBrowserForTab(currentTab).contentDocument.location.href;
      if (DPR_PAL.dprUrlMatcher.exec(ctloc)) { // a dpr tab
        tb.setIcon(currentTab, "chrome://digitalpalireader/skin/icons/logo.png");
        if(/index\.xul/.exec(ctloc)) currentTab.setAttribute('id',(main++==0?'DPR-main':'DPRm'));
        else if(/dict\.htm/.exec(ctloc)) currentTab.setAttribute('id',(dict++==0?'DPR-dict':'DPRd'));
        else if(/search\.htm/.exec(ctloc)) currentTab.setAttribute('id',(search++==0?'DPR-search':'DPRs'));
        else currentTab.setAttribute('id',(etc++==0?'DPR-x':'DPRx'));
      }
    }
    if(main > 0) return true;
    return false;
  },
  openDPRTab:function(permalink,id,reuse) {
    permalink = DPR_PAL.toWebUrl(permalink);

    if(reuse) { // reuse old tab
      var oldTab = this.findDPRTab(id);

      if (!oldTab) {
        DPRChrome.openDPRTab(permalink,id);
        return true;
      }
    }

    // get last DPR tab

    var start = 0;  // no DPR tabs yet
    var newIdx = 0;

    for (var index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;
      if (!/^DPR/.exec(currentTab.getAttribute('id')) || !DPR_PAL.dprUrlMatcher.exec(ctloc)) { // not a dpr tab
        if (start == 1) { // prev was a DPR tab
          newIdx = index;
          break;
        }
      }
      else {
        start = 1; // got a DPR tab
        newIdx = index+1;
      }
    }
    var newTab = mainWindow.gBrowser.addTab(permalink);
    if(id) newTab.setAttribute('id', id);
    mainWindow.gBrowser.moveTabTo(newTab, newIdx)
    mainWindow.gBrowser.selectedTab = newTab;

  },
  openFirstDPRTab:function() {
    if(!this.findDPRTab()) this.openDPRTab(DPR_PAL.toWebUrl('chrome://digitalpalireader/content/index.xul'),'DPR-main');
  },

  findDPRTab:function(id) {
    for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

      // Does this tab contain our custom attribute?
      if ((id && currentTab.getAttribute('id') == id || !id && /^DPR/.exec(currentTab.getAttribute('id'))) && DPR_PAL.dprUrlMatcher.exec(ctloc)) {

        return currentTab;
      }
    }
    return false;
  },
  isThisDPRTab:function(id) {
    if(mainWindow.gBrowser.selectedTab.id == id) return mainWindow.gBrowser.selectedTab;
    else return false;
  },
  DPRTab:function(id) {
    for (var found = false, index = 0, tabbrowser = mainWindow.gBrowser; index < tabbrowser.tabContainer.childNodes.length && !found; index++) {

      // Get the next tab
      var currentTab = tabbrowser.tabContainer.childNodes[index];
      var ctloc = mainWindow.gBrowser.getBrowserForTab(currentTab).contentDocument.location.href;

      // Does this tab contain our custom attribute?
      if (currentTab.getAttribute('id') == id && DPR_PAL.dprUrlMatcher.exec(ctloc)) {

        return currentTab;
      }
    }
    return false;
  },
  DPR_G.G_prompts: Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService),
  promptData:function(title,data) {
    DPR_G.G_prompts.alert(null, title, data);
  },
  DPRSidebarDocument: function() {
    var sidebar = mainWindow.document.getElementById("sidebar").contentDocument;

    if (sidebar.location.href == DPR_PAL.toWebUrl("chrome://digitalpalireader/content/digitalpalireader.xul")) {
      return sidebar;
    }
    else return false
  },
  openSidebar: function() {
    if(typeof(SidebarUI) != "undefined")
      SidebarUI.toggle('viewDPR');
    else
      toggleSidebar('viewDPR');
    return this.DPRSidebarDocument();
  },
  rightClick:function(type,params) {
    if(gContextMenu.target.tagName!="TEXTAREA"&&gContextMenu.target.tagName!="INPUT"){
      var input = (gContextMenu.isTextSelected?document.commandDispatcher.focusedWindow.getSelection().toString():gContextMenu.target.innerHTML);
    }
    else {
      var el = gContextMenu.target;
      var val = el.value;
      var start = el.selectionStart
      var end = el.selectionEnd
      if(end-start)
        var input=val.substring(start, end);
      else
        var input=val;
    }
    if(!input || input == '') return;
    input = input.replace(/<[^>]*>/g,'');
    input = input.replace(/\u0101/g, 'aa').replace(/\u012B/g, 'ii').replace(/\u016B/g, 'uu').replace(/\u1E6D/g, '\.t').replace(/\u1E0D/g, '\.d').replace(/\u1E45/g, '\"n').replace(/\u1E47/g, '\.n').replace(/\u1E43/g, '\.m').replace(/\u1E41/g, '\.m').replace(/\u00F1/g, '\~n').replace(/\u1E37/g, '\.l').replace(/\u0100/g, 'AA').replace(/\u012A/g, 'II').replace(/\u016A/g, 'UU').replace(/\u1E6C/g, '\.T').replace(/\u1E0C/g, '\.D').replace(/\u1E44/g, '\"N').replace(/\u1E46/g, '\.N').replace(/\u1E42/g, '\.M').replace(/\u00D1/g, '\~N').replace(/\u1E36/g, '\.L');

    switch(true) {
      case (type=='A'):
        var thisTab = this.isThisDPRTab('DPRm');
        if(/ /.test(input)) { // multiple words, send as paragraph
          var permalink = 'dpr:index?text='+input;
          this.openDPRTab(permalink,'DPR-main');
        }
        else { // single word, analyze
          var permalink = 'dpr:index?analysis='+input;
          this.openDPRTab(permalink,'DPR-main');
        }
        break;
      case (/^[A-Z]+$/.test(type)):
        var permalink = 'dpr:dict?type='+type+'&opts=xv,xd,xm,xs,xa,xk,xy,mm,ma,mt,sw,hd&query='+input;
        this.openDPRTab(permalink,'DPRd');
        break;
      case (/^[a-z]+$/.test(type)):
        var permalink = 'dpr:search?type=0&query='+input+'&MAT=m&set='+type+'&book=1&part=1&rx=false';
        this.openDPRTab(permalink,'DPRs');
        break;
      case (type == 'Cv'):
        this.convertText(input,params);
        break;
      case (type == 'Cj'):
        var permalink = 'dpr:conjugate?word='+input;
        this.openDPRTab(permalink,'DPRx');
        break;
      case (type == 'Tr'):
        var permalink = 'dpr:translate?phrase='+input;
        this.openDPRTab(permalink,'DPRx');
        break;
      case (type == 'Qk'):
        this.quickDic(input);
        break;
    }
  },

  showHideDPRItem:function() {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getBranch("extensions.digitalpalireader.");
    var dprmenu = document.getElementById("dpr-sub-context");
    var dprconj = document.getElementById("dpr-conj-item");
    var dprconv = document.getElementById("dpr-conv-context");
    var dprtrans = document.getElementById("dpr-trans-item");
    var dprdict = document.getElementById("dpr-sub-dict");
    var dprsearch = document.getElementById("dpr-sub-search");

    var nosel = (!gContextMenu.isTextSelected && (!gContextMenu.target.value || !gContextMenu.target.value.substring(gContextMenu.target.selectionStart, gContextMenu.target.selectionEnd)));
    var notext = (!gContextMenu.target.innerHTML.replace(/<[^>]+>/g,'') && !gContextMenu.target.value && nosel);

    if(prefs.getBoolPref('Bool.allContext')) {
      dprmenu.hidden = notext;
      dprdict.hidden = nosel;
      dprsearch.hidden = nosel;
      dprconj.hidden = nosel;
      dprtrans.hidden = nosel;
    }
    else if(prefs.getBoolPref('Bool.noContext'))
      dprmenu.hidden = true;
    else if(prefs.getBoolPref('Bool.contextSelected'))
      dprmenu.hidden = nosel;
  },

  mouseMove:function(e) {
    if(e && e.rangeParent && e.rangeParent.nodeType == e.rangeParent.TEXT_NODE && e.rangeParent.parentNode == e.target) {
      var range = HTTparent.ownerDocument.createRange();
      range.selectNode(e.rangeParent);
      var str = range.toString();
      range.detach();
    }

  },
  quickDic:function(input) {
    input = input.replace(/ .*/,'');
    output = DPRTrans.simpleWordTranslation(input);
    alert(output.split('\n'));
  },
  convertText:function(text,type) {
    if(/[อาิีึุูเโํกขคฆงจฉชฌญฏฐฑฒณตถทธนปผพภมยรลฬวสห๐๑๒๓๔๕๖๗๘๙ฯ]/.test(text))
      text = DPRTranslit.fromThai(text);
    if(/[අආඉඊඋඌඑඔඒඇඈඕඖාිීුූෙොෘෟෲෳේැෑෛෝෞංකඛගඝඞචඡජඣඤටඨඩඪණතථදධනපඵබභමයරලළවසහෂශඥඬඳඹඟ]/.test(text))
      text = DPRTranslit.fromSin(text);
    switch(type) {
      case 'u':
        text = DPRTranslit.toUni(text);
        break;
      case 'v':
        text = DPRTranslit.toVel(text);
        break;
      case 'd':
        text = DPRTranslit.toDeva(text);
        break;
      case 'm':
        text = DPRTranslit.toMyan(text);
        break;
      case 's':
        text = DPRTranslit.toSin(text);
        break;
      case 't':
        text = DPRTranslit.toThai(text);
        break;
    }
    if(gContextMenu.target.tagName!="TEXTAREA"&&gContextMenu.target.tagName!="INPUT") {
      const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
      clipboardHelper.copyString(text);
      alert('The following text has been copied to the clipboard:\n\n'+text);
    }
    else {
      var el = gContextMenu.target;
      var val = el.value;
      var start = el.selectionStart;
      var end = el.selectionEnd;
      if(end-start) {
        el.value = val.slice(0, start) + text + val.slice(end );
        gContextMenu.target.setSelectionRange(start,start+text.length);
      }
      else
        gContextMenu.target.value = text;
    }
  }
}

window.addEventListener("load", function(){ DPROverlay.init()}, false);
