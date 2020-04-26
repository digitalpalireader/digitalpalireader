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
    "contentFolder",
    DPR_PAL.isXUL ? '/content/' : '/digitalpalireader/content/');

  DPR_PAL.addJS = files => {
    if (DPR_PAL.isXUL) {
      var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
      for (var i = 0; i < files.length; i++) {
        if (!/\.js$/.test(files[i]))
          files[i] = DPR_PAL.toWebUrl('chrome://digitalpalireader/content/js/' + files[i] + '.js');
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
  DPR_PAL.normalizeDprUri = uri => {
    if (DPR_PAL.isWeb && uri.match(dprSchemeUriCracker)) {
      return uri.replace(dprSchemeUriCracker, `${DPR_PAL.baseUrl}_dprhtml/$1.html?$2`);
    } else {
      return uri;
    }
  }

  DPR_PAL.dprUrlMatcher = /\/_dprhtml\/index\.html/;

  DPR_PAL.fixupDprBaseUrl = url => url.replace(' dprhtml', '_dprhtml');

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

   // NOTE: Keep DPR-main after DPRm, as was the order in palemoon.
  DPR_PAL.DPR_tabs = Object.freeze({
    'DPRm': { test: x => !x.includes('?feature='), },
    'DPR-main': { test: x => !x.includes('?feature='), },
    'DPRs': { test: x => /\?feature=search&/i.test(x), },
    'DPRd': { test: x => /\?feature=dictionary&/i.test(x), },
  });

  DPR_PAL.DPR_initialTabs = Object.freeze({
    'DPR-main': { test: x => !x.includes('?feature='), },
    'DPR-search': { test: x => /\?feature=search&/i.test(x), },
    'DPR-dict': { test: x => /\?feature=dictionary&/i.test(x), },
  });

  DPR_PAL.isNavigationFeature = () => /\?loc=/i.exec(document.location.href);

  DPR_PAL.isSearchFeature = () => /\?feature=search&/i.exec(document.location.href);

  DPR_PAL.isDictionaryFeature = () => /\?feature=dictionary&/i.exec(document.location.href);

  DPR_PAL.toUrl = x => {
    if (/^http/.test(new URL(x).protocol)) {
      return x;
    } else {
      return 'file://' + x.replace(/\\/g,'/');
    }
  };

  DPR_PAL.modifyUrlPart = (url, queryKey, f) => {
    const [baseUrl, qps] = url.split('?');
    const newQps = qps
      .split('&')
      .map(qp => {
        const [key, value] = qp.split('=');
        const newValue = (key === queryKey) ? f(value) : value;
        return `${key}=${newValue}`;
      });

    return `${baseUrl}?${newQps.join('&')}`;
  };

  DPR_PAL.toWebUrl = url => {
    const xulUrlCracker = /^chrome:\/\/digitalpalireader\/content\/(index|search|dict)\.(xul|htm)(\?)?(.*)$/i

    return url
      .replace(xulUrlCracker, `${DPR_PAL.baseUrl}_dprhtml/index.html?feature=$1&$4`)
      .replace('feature=index', '')
      .replace('feature=dict&', 'feature=dictionary&')
      .replace('?&', '?');
  };

  //
  // mainWindow.gBrowser emulation layer.
  //

  DPR_PAL.windowHasFocus = false;
  let _mainWindow = null;
  Object.defineProperty(
    DPR_PAL,
    'mainWindow',
    {
      get() {
        if (!_mainWindow) {
          _mainWindow = DPR_PAL.createMainWindow(window);
        }

        return _mainWindow;

        // TODO: Enable once we have a solution for https://github.com/digitalpalireader/digitalpalireader/issues/185
        // if (window.opener && !window.opener.closed) {
        //   return window.opener.DPR_PAL.mainWindow;
        // } else {
        //   if (!_mainWindow) {
        //     _mainWindow = DPR_PAL.createMainWindow(window);
        //   }

        //   return _mainWindow;
        // }
      },
      enumerable: true,
      configurable: true,
    }
  );

  Object.defineProperty(
    DPR_PAL,
    'contentWindow',
    {
      get() {
        return DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow;
      },
      enumerable: true,
      configurable: true,
    }
  );

  Object.defineProperty(
    DPR_PAL,
    'contentDocument',
    {
      get() {
        return DPR_PAL.mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument;
      },
      enumerable: true,
      configurable: true,
    }
  );

  DPR_PAL.getId = url => {
    var tabDef = Object
      .entries(DPR_PAL.DPR_initialTabs)
      .find(([_, x]) => x.test(url));
    if (tabDef) {
      return tabDef[0];
    } else {
      console.error('Cannot get id of url.', url, DPR_PAL.DPR_initialTabs);
      return undefined;
    }
  };

  DPR_PAL.createTab = window => {
    return {
      _window: window,

      _id: DPR_PAL.getId(window.location.href),
      get id() {
        return this._id;
      },
      set id(id) {
        this._id = id;
      },

      getAttribute(aid) {
        if (aid === 'id') {
          return this.id;
        } else {
          console.log('Unknown aid', aid);
        }
      },
      setAttribute(aid, aval) {
        if (aid === 'id') {
          this.id = aval;
        } else {
          console.log('Unknown aid', aid);
        }
      },

      get linkedBrowser() {
        return {
          contentWindow: window,
          contentDocument: window.document,
        };
      }
    };
  };

  DPR_PAL.createMainWindow =  window => {
    const gBrowser = {
      addTab(url) {
        const t = DPR_PAL.createTab(window.open(url));
        this._childNodes.push(t);
        return t;
      },

      moveTabTo(tab, index) {
        const otherTabs = this.tabContainer.childNodes.filter(t => t._window !== tab._window);
        if (this.tabContainer.childNodes.length !== otherTabs.length) {
          otherTabs.splice(index, 0, tab);
          this.tabContainer.childNodes = [...otherTabs];
        } else {
          console.error('Tab', tab, 'does not exist in', this.tabContainer.childNodes);
        }
      },

      getBrowserForTab(tab) {
        return {
          contentWindow: tab._window,
          contentDocument: {
            location: tab._window.document.location,
            getElementById: id => {
              if (id === 'dpr-tops') {
                return {
                  getElementsByTagName: id => {
                    if (id === 'browser') {
                      return [
                        {
                          contentWindow: tab._window,
                        },
                      ];
                    } else {
                      console.error('Unsupported id', id);
                    }
                  },
                }
              } else if (id === 'dpr-search-browser') {
                return {
                  contentWindow: tab._window,
                };
              } else {
                console.error('Unsupported id', id);
              }
            },
          },
        };
      },

      _selectedTab: null,
      get selectedTab() {
        const tab = this.tabContainer.childNodes.find(t => t._window.DPR_PAL.windowHasFocus);
        return tab ? tab : this._selectedTab;
      },
      set selectedTab(val) {
        this._selectedTab = val;
        this._selectedTab._window.focus();
      },

      _childNodes: [],
      get tabContainer() {
        return {
          childNodes: [
            ...this._childNodes.filter(x => !x._window.closed),
          ],
        };
      },
    };

    gBrowser._childNodes = [ DPR_PAL.createTab(window), ];
    gBrowser.selectedTab = gBrowser.tabContainer.childNodes[0];

    return {
      gBrowser: gBrowser,
      document: window.document,
    };
  };

  console.log('Loaded DPR_PAL!', DPR_PAL);
})(window.DPR_PAL = window.DPR_PAL || {}, jQuery);

// NOTE: Keep this out side the above.
window.addEventListener('focus', () => { DPR_PAL.windowHasFocus = true; });
window.addEventListener('blur', () => { DPR_PAL.windowHasFocus = false; });
