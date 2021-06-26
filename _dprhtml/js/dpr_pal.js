/*
 * Platform abstraction library for DPR.
 *
 * To keep the rest of the codebase uniform across XUL, web and FF/Chrome plugins,
 * we move all platform specific code into this namespace.
 *
 * Depending on where we are running, this module does the right thing.
 */
'use strict';

(function (DPR_Pal, $, undefined) {
  const defineReadOnlyProperty = (name, value) => Object.defineProperty(DPR_Pal, name, { value: value });

  defineReadOnlyProperty(
    "isXUL",
    !!navigator.userAgent.match(/( Waterfox\/)|( PaleMoon\/)/g));

  defineReadOnlyProperty(
    "isWeb",
    !DPR_Pal.isXUL);

  defineReadOnlyProperty(
    "baseUrl",
    DPR_Pal.isXUL ? "chrome://" : `${window.location.origin}/`);

  defineReadOnlyProperty(
    "dprHomePage",
    DPR_Pal.isXUL ? `${DPR_Pal.baseUrl}digitalpalireader/content/index.xul` : `${DPR_Pal.baseUrl}_dprhtml/index.html`);

  defineReadOnlyProperty(
    "contentFolder",
    DPR_Pal.isXUL ? '/content/' : '/_dprhtml/');

  // NOTE: This has to be written using ES6 modules when the work is done.
  const loadedScripts = {}
  DPR_Pal.addOneJS = file => {
    const url = /^\//i.test(file) ? file : `${DPR_Pal.contentFolder}js/${file}.js`

    if (loadedScripts[url.toLowerCase()]) {
      return Promise.resolve()
    }

    console.log('>>>> addOneJS: Loading script:', url)
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script')
      script.src = url
      script.onload = () => {
        loadedScripts[url.toLowerCase()] = true
        resolve(script)
      }
      script.onerror = e => {
        console.log('Error loading script', e)
        reject(new Error(`Script load error for ${url}.`))
      }

      document.body.append(script)
    })
  }

  DPR_Pal.addJS = async (files) => await Promise.all(files.map(DPR_Pal.addOneJS))

  DPR_Pal.showLoadingMarquee = sectionId => {
    if (DPR_Pal.isXUL) {
      $(`${DPR_Chrome.getSectionElementId(sectionId)} #mafbc`).html('');
      document.getElementById('mafbc').appendChild(DPR_G.pleasewait);
    } else {
      $(`${DPR_Chrome.getSectionElementId(sectionId)} #mafbc`).empty();
      $(`${DPR_Chrome.getSectionElementId(sectionId)} #mafbc`).append(DPR_G.pleasewait);
    }
  };

  DPR_Pal.chromeFileExists = fileLoc => {
    return $.ajax({type:"HEAD",url: `${DPR_Pal.baseUrl}${fileLoc}`,async: false}).status!=404;
  };

  /*
  if 'copy permalink to clipboard' button on the modal is pressed , the focus is on the modal .
  thus execCommand("copy") does not copy from the element appended to the body .

  one workaround is to append an element to the modal itself when the modal is open.

  refer : https://stackoverflow.com/questions/48866903/copy-to-clipboard-action-doesnt-work-when-modal-is-open
  */

  DPR_Pal.copyToClipboard = text => {
    if (DPR_Pal.isWeb) {
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
  DPR_Pal.normalizeDprUri = uri => {
    if (DPR_Pal.isWeb && uri.match(dprSchemeUriCracker)) {
      return uri.replace(dprSchemeUriCracker, `${DPR_Pal.baseUrl}_dprhtml/$1.html?$2`);
    } else {
      return uri;
    }
  }

  DPR_Pal.delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  DPR_Pal.mainStylesMatcher = /.*_dprhtml\/css\/styles.*\.css$/i;
  DPR_Pal.dprUrlMatcher = /\/_dprhtml\/index\.html/;

  DPR_Pal.fixupDprBaseUrl = url => url.replace(' dprhtml', '_dprhtml');

  DPR_Pal.enablePopover = (id, trigger, placement) => {
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

  DPR_Pal.getDifId = () => DPR_Pal.isDictionaryFeature() && !DPR_Pal.isDictionaryAnalysisFeature() ? 'difb' : 'difb-bottom';

   // NOTE: Keep DPR-main after DPRm, as was the order in palemoon.
  DPR_Pal.DPR_tabs = Object.freeze({
    'DPRm': { test: x => !x.includes('?feature='), },
    'DPR-main': { test: x => !x.includes('?feature='), },
    'DPRs': { test: x => /\?feature=search&/i.test(x), },
    'DPRd': { test: x => /\?feature=dictionary&/i.test(x), },
  });

  DPR_Pal.DPR_initialTabs = Object.freeze({
    'DPR-main': { test: x => !x.includes('?feature=') || /\?feature=search&/i.test(x) || /\?feature=dictionary&/i.test(x) },
    'DPR-search': { test: x => (/\?feature=search&/i.test(x)), },
    'DPR-dict': { test: x => /\?feature=dictionary&/i.test(x), },
  });

  DPR_Pal.mostRecentUrl = "";

  DPR_Pal.updateMostRecentUrl = () => DPR_Pal.mostRecentUrl = document.location.href;

  DPR_Pal.isNavigationFeature = () => /\?loc=/i.exec(document.location.href);

  DPR_Pal.isSearchFeature = () => /\?feature=search&/i.exec(document.location.href);

  DPR_Pal.isDictionaryFeature = () => /\?feature=dictionary&/i.exec(document.location.href);

  DPR_Pal.isDictionaryAnalysisFeature = () => /&analysis=/i.exec(document.location.href) && document.location.href != DPR_Pal.mostRecentUrl;

  DPR_Pal.getTranslationsBaseUrl = () => `${/localdev/i.test(window.environmentName) ? 'https://staging.digitalpalireader.online' : ''}/_external/translations`

  DPR_Pal.toUrl = x => {
    let url = undefined;
    try {
      url = new URL(x)
    } catch {}

    if (!url) {
      return x;
    }

    if (/^http/.test(url.protocol)) {
      return x;
    } else {
      return 'file://' + x.replace(/\\/g,'/');
    }
  };

  DPR_Pal.modifyUrlPart = (url, queryKey, f) => {
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

  DPR_Pal.toWebUrl = url => {
    const xulUrlCracker = /^chrome:\/\/digitalpalireader\/content\/(index|search|dict|dbv)\.(xul|htm|html)(\?)?(.*)$/i

    let newUrl = url
      .replace(xulUrlCracker, `${DPR_Pal.baseUrl}_dprhtml/index.html?feature=$1&$4`)
      .replace('feature=index', '')
      .replace('feature=dict&', 'feature=dictionary&')
      .replace('?&', '?');

    // NOTE: Following is best guess.
    newUrl = newUrl.replace(/^chrome:\/\//i, DPR_Pal.baseUrl);

    return newUrl;
  };

  //
  // mainWindow.gBrowser emulation layer.
  //

  DPR_Pal.windowHasFocus = false;
  let _mainWindow = null;
  Object.defineProperty(
    DPR_Pal,
    'mainWindow',
    {
      get() {
        if (!_mainWindow) {
          _mainWindow = DPR_Pal.createMainWindow(window);
        }

        return _mainWindow;

        // TODO: Enable once we have a solution for https://github.com/digitalpalireader/digitalpalireader/issues/185
        // if (window.opener && !window.opener.closed) {
        //   return window.opener.DPR_Pal.mainWindow;
        // } else {
        //   if (!_mainWindow) {
        //     _mainWindow = DPR_Pal.createMainWindow(window);
        //   }

        //   return _mainWindow;
        // }
      },
      enumerable: true,
      configurable: true,
    }
  );

  Object.defineProperty(
    DPR_Pal,
    'contentWindow',
    {
      get() {
        return DPR_Pal.mainWindow.gBrowser.selectedTab.linkedBrowser.contentWindow;
      },
      enumerable: true,
      configurable: true,
    }
  );

  Object.defineProperty(
    DPR_Pal,
    'contentDocument',
    {
      get() {
        return DPR_Pal.mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument;
      },
      enumerable: true,
      configurable: true,
    }
  );

  DPR_Pal.getId = url => {
    var tabDef = Object
      .entries(DPR_Pal.DPR_initialTabs)
      .find(([_, x]) => x.test(url));
    if (tabDef) {
      return tabDef[0];
    } else {
      console.error('Cannot get id of url.', url, DPR_Pal.DPR_initialTabs);
      return undefined;
    }
  };

  DPR_Pal.createTab = window => {
    return {
      _window: window,

      _id: DPR_Pal.getId(window.location.href),
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

  DPR_Pal.createMainWindow =  window => {
    const gBrowser = {
      addTab(url) {
        const t = DPR_Pal.createTab(window.open(url));
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
        const tab = this.tabContainer.childNodes.find(t => t._window.DPR_Pal.windowHasFocus);
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

    gBrowser._childNodes = [ DPR_Pal.createTab(window), ];
    gBrowser.selectedTab = gBrowser.tabContainer.childNodes[0];

    return {
      gBrowser: gBrowser,
      document: window.document,
    };
  };
})(window.DPR_Pal = window.DPR_Pal || {}, jQuery);

// NOTE: Keep this out side the above.
window.addEventListener('focus', () => { DPR_Pal.windowHasFocus = true; });
window.addEventListener('blur', () => { DPR_Pal.windowHasFocus = false; });

window.DPR_PAL = DPR_Pal

if (typeof module !== "undefined") {
  module.exports = DPR_Pal;
}
