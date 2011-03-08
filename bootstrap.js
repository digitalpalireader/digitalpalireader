
var Cc = Components.classes;
var Ci = Components.interfaces;

function loadIntoWindow(window) {
  if (!window) return;

  // Get the anchor for "overlaying" but make sure the UI is loaded
  let forward = window.document.getElementById("status-bar");
  if (!forward) return;
  // Place the new button after the last button in the top set
  let anchor = window.document.getElementById("status-bar");

  let button = window.document.createElement("statusbarpanel");
  button.setAttribute("id", "DPRStatusBar");
  button.setAttribute("tooltiptext", "Digital Pali Reader");
  button.setAttribute("role", "button");
  
  let image = window.document.createElement('image');
  image.setAttribute('id', 'dpr-button');
  button.appendChild(image);
  button.addEventListener("click", function() {
    loadDPR();
  }, false);

  anchor.appendChild(button);
}

function unloadFromWindow(window) {
  if (!window) return;
  let button = window.document.getElementById("dpr-button");
  if (button)
    button.parentNode.removeChild(button);
}

/*
 bootstrap.js API
*/
function startup(aData, aReason) {
  let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

  // Load into any existing windows
  let enumerator = wm.getEnumerator("navigator:browser");
  while (enumerator.hasMoreElements()) {
    let win = enumerator.getNext().QueryInterface(Ci.nsIDOMWindow);
    loadIntoWindow(win);
  }

  // Load into any new windows
  wm.addListener({
    onOpenWindow: function(aWindow) {
      // Wait for the window to finish loading
      let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal);
      domWindow.addEventListener("load", function() {
        domWindow.removeEventListener("load", arguments.callee, false);
        loadIntoWindow(domWindow);
      }, false);
    },
    onCloseWindow: function(aWindow) { },
    onWindowTitleChange: function(aWindow, aTitle) { }
  });
}

function shutdown(aData, aReason) {
  // When the application is shutting down we normally don't have to clean up any UI changes
  if (aReason == APP_SHUTDOWN) return;

  let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

  // Unload from any existing windows
  let enumerator = wm.getEnumerator("navigator:browser");
  while (enumerator.hasMoreElements()) {
    let win = enumerator.getNext().QueryInterface(Ci.nsIDOMWindow);
    unloadFromWindow(win);
  }
}

function install(aData, aReason) { }

function uninstall(aData, aReason) { }
