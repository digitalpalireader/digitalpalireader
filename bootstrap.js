var Cc = Components.classes;
var Ci = Components.interfaces;

function createTestDriver(window)
{

}
var testDriver = null;
function loadIntoWindow(window) {
  if (!window) return;


// 1

	var doc = window.document;

	// Get the add-on bar for that window

	var addonBar = doc.getElementById("addon-bar");

	// Construct the new toolbar item

	var newItem = doc.createElement("toolbaritem");
	var itemLabel = doc.createElement("label");

	// Add the item to the toolbar and set its text label

	newItem.appendChild(itemLabel);
	addonBar.appendChild(newItem);
	itemLabel.value = "Hello world!";

// 2

	let anchor = window.document.getElementById("status-bar");

	let button = window.document.createElement("button");
	button.setAttribute("id", "DPRStatusBar");
	button.setAttribute("value", "test");
	button.setAttribute("tooltiptext", "Digital Pali Reader");
	button.setAttribute("role", "button");
	button.addEventListener("click", function() {
		var theTab          = window.gBrowser.addTab('chrome://digitalpalireader/content/index.htm');
		theTab.label        = "Digital Pali Reader";
		gBrowser.selectedTab = theTab;
		var func = function () { window.gBrowser.setIcon(theTab, "chrome://digitalpalireader/skin/icons/logo.png"); };
		setTimeout(func, 500);
	}, false);

	let image = window.document.createElement('image');
	image.setAttribute('id', 'dpr-button');
	button.appendChild(image);

	anchor.appendChild(button);
}

function unloadFromWindow(window) {
  if (!window) return;
  if (testDriver)
      testDriver.deactivateJSD();
}

/*
 bootstrap.js API
*/
function startup(aData, aReason) {
/*
    Components.utils.import("resource://firebug/firebug-trace-service.js");
    var FBTrace = traceConsoleService.getTracer("extensions.firebug");
  FBTrace.sysout("startup "); */

  let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

  // Load into any existing windows
  let enumerator = wm.getEnumerator("navigator:browser");
  while(enumerator.hasMoreElements()) {
    let win = enumerator.getNext();
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
  let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);

  // Unload from any existing windows
  let enumerator = wm.getEnumerator("navigator:browser");
  while(enumerator.hasMoreElements()) {
    let win = enumerator.getNext();
    unloadFromWindow(win);
  }
}

function install(aData, aReason) { }

function uninstall(aData, aReason) { }
