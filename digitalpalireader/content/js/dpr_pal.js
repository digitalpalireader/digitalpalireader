/*
 * Platform abstraction library for DPR.
 *
 * To keep the rest of the codebase uniform across XUL, web and FF/Chrome plugins,
 * we move all platform specific code into this namespace.
 *
 * Depending on where we are running, this module does the right thing.
 */

console.log('Loading DPR_PAL...');

(function (DPR_PAL, $, undefined) {
  const defineReadOnlyProperty = (name, value) => Object.defineProperty(DPR_PAL, name, { value: value });

  defineReadOnlyProperty(
    "isXUL",
    !!navigator.userAgent.match(/( Waterfox\/)|( PaleMoon\/)/g));

  defineReadOnlyProperty(
    "isWeb",
    !DPR_PAL.isXUL);

  defineReadOnlyProperty(
    "baseUrl",
    DPR_PAL.isXUL ? "chrome://" : "/");

  defineReadOnlyProperty(
    "dprHomePage",
    DPR_PAL.isXUL ? `${DPR_PAL.baseUrl}digitalpalireader/content/index.xul` : "/DPRHTML/index.html");

  defineReadOnlyProperty(
    "mainWindow",
    DPR_PAL.isXUL
      ? window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIWebNavigation)
        .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
        .rootTreeItem
        .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIDOMWindow)
      : null);

  defineReadOnlyProperty(
    "contentWindow",
    DPR_PAL.isXUL ? DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow : window);

  defineReadOnlyProperty(
    "contentDocument",
    DPR_PAL.isXUL ? DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument : window.document);

  defineReadOnlyProperty(
    "contentFolder",
    DPR_PAL.isXUL ? '/content/' : '/digitalpalireader/content/');

  DPR_PAL.addJS = files => {
    if (DPR_PAL.isXUL) {
      var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
      for (var i = 0; i < files.length; i++) {
        if (!/\.js$/.test(files[i]))
          files[i] = 'chrome://digitalpalireader/content/js/' + files[i] + '.js';
        try {
          loader.loadSubScript(files[i], null, 'UTF-8');
        }
        catch (ex) {
          return [ex, files[i]];
        }
      }
    } else {
      // Not loading dynamically yet. It's preloaded by index.html for now.
    }
  };

  DPR_PAL.showLoadingMarquee = () => {
    if (DPR_PAL.isXUL) {
      $('#mafbc').html('');
      document.getElementById('mafbc').appendChild(pleasewait);
    } else {
      $('#mafbc').empty();
      $('#mafbc').append(pleasewait);
    }
  };

  DPR_PAL.chromeFileExists = fileLoc => {
    var xmlhttp = new window.XMLHttpRequest();
    try {
      xmlhttp.open("GET", `${DPR_PAL.baseUrl}${fileLoc}`, false);
      xmlhttp.onreadystatechange=function() {
        xmlhttp.abort();
      }
      xmlhttp.send(null);
    }
    catch(ex) {
      return false;
    }
    return true;
  };

  DPR_PAL.openSideBar = () => {
    if (DPR_PAL.isWeb) {
      $('#sidebar').modal("show");
    } else {
      console.error("Not implemented for XUL");
    }
  }

  DPR_PAL.closeSideBar = () => {
    if (DPR_PAL.isWeb) {
      $('#sidebar').modal("hide");
    } else {
      console.error("Not implemented for XUL");
    }
  }

  const bottomFrameSelector = ".bottomFrame .bottomFrameContent";
  DPR_PAL.openBottomFrame = () => {
    if (DPR_PAL.isWeb) {
      $(bottomFrameSelector).show();
    } else {
      console.error("Not implemented for XUL");
    }
  }

  DPR_PAL.closeBottomFrame = () => {
    if (DPR_PAL.isWeb) {
      $(bottomFrameSelector).hide();
    } else {
      console.error("Not implemented for XUL");
    }
  }

  DPR_PAL.toggleBottomFrame = () => {
    if (DPR_PAL.isWeb) {
      $(bottomFrameSelector).slideToggle();
    } else {
      console.error("Not implemented for XUL");
    }
  }

  console.log('Loaded DPR_PAL!', DPR_PAL);
})(window.DPR_PAL = window.DPR_PAL || {}, jQuery);
