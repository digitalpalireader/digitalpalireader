/*
 * Platform abstraction library for DPR.
 *
 * To keep the rest of the codebase uniform across XUL, web and FF/Chrome plugins,
 * we move all platform specific code into this namespace.
 *
 * Depending on where we are running, this module does the right thing.
 */
'use strict';

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
    DPR_PAL.isXUL ? "chrome://" : `${window.location.origin}/`);

  defineReadOnlyProperty(
    "dprHomePage",
    DPR_PAL.isXUL ? `${DPR_PAL.baseUrl}digitalpalireader/content/index.xul` : `${DPR_PAL.baseUrl}_dprhtml/index.html`);

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

  DPR_PAL.bottomFrameUp = () => { return $(".rotate").hasClass("down") };

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
    return $.ajax({type:"HEAD",url: `${DPR_PAL.baseUrl}${fileLoc}`,async: false}).status!=404;
  };

  /*
  if 'copy permalink to clipboard' button on the modal is pressed , the focus is on the modal .
  thus execCommand("copy") does not copy from the element appended to the body .

  one workaround is to append an element to the modal itself when the modal is open.

  refer : https://stackoverflow.com/questions/48866903/copy-to-clipboard-action-doesnt-work-when-modal-is-open
  */

  DPR_PAL.copyToClipboard = text => {
    if (DPR_PAL.isWeb) {
      var targetElement = $(".modal-open").length?$(".modal-body"):$('body');
      $('<input>').attr('class','clipboardCopy').attr('style','position: absolute; left: -1000px; top: -1000px').val(text).appendTo(targetElement);
      $('.clipboardCopy').select();
      document.execCommand("copy");
      $('.clipboardCopy').remove();
    } else {
      const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
      clipboardHelper.copyString(text);
    }
  }

  const dprSchemeUriCracker = /^dpr:(.+)\?(.*)$/;
  DPR_PAL.normalizeDprSchemeUri = uri => {
    if (DPR_PAL.isWeb && uri.match(dprSchemeUriCracker)) {
      return uri.replace(dprSchemeUriCracker, `${DPR_PAL.baseUrl}_dprhtml/$1.html?$2`);
    } else {
      return uri;
    }
  }

  DPR_PAL.enablePopover = (id, trigger, placement) => {
    $(id)
      .each(function() {
        $(this).popover({
          trigger: trigger,
          html: true,
          container: "body",
          boundary: "window",
          placement: placement,
          content: () => $(`${id}-popover-content`).html(),
        })
      });
  }

  DPR_PAL.getDifId = () => /analysis=[^&]/.test(window.location.href) ? 'difb-bottom' : 'difb';

  DPR_PAL.isNavigationFeature = () => {
    const matcher = DPR_PAL.isWeb ? /\?loc=/i : /index\.htm/i;
    return matcher.exec(document.location.href);
  }

  DPR_PAL.isSearchFeature = () => {
    const matcher = DPR_PAL.isWeb ? /\?feature=search&/i : /search\.htm/i;
    return matcher.exec(document.location.href);
  }

  DPR_PAL.isDictionaryFeature = () => {
    const matcher = DPR_PAL.isWeb ? /\?feature=dictionary&/i : /dict\.htm/i;
    return matcher.exec(document.location.href);
  }

  console.log('Loaded DPR_PAL!', DPR_PAL);
})(window.DPR_PAL = window.DPR_PAL || {}, jQuery);
