
function loadDPR() {
    var theTab          = gBrowser.addTab('chrome://digitalpalireader/content/index.htm');
    theTab.label        = "Digital Pali Reader";
    gBrowser.selectedTab = theTab;
	var func = function () { gBrowser.setIcon(theTab, "chrome://digitalpalireader/skin/icons/logo.png"); };
	setTimeout(func, 500);
}

var myExt_urlBarListener = {
  QueryInterface: function(aIID)
  {
   if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
       aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
       aIID.equals(Components.interfaces.nsISupports))
     return this;
   throw Components.results.NS_NOINTERFACE;
  },

  onLocationChange: function(aProgress, aRequest, aURI)
  {
    myExtension.processNewURL(aURI);
  },

  onStateChange: function(a, b, c, d) {},
  onProgressChange: function(a, b, c, d, e, f) {},
  onStatusChange: function(a, b, c, d) {},
  onSecurityChange: function(a, b, c) {}
};

var myExtension = {
  oldURL: null,
  
  init: function() {
    // Listen for webpage loads
    gBrowser.addProgressListener(myExt_urlBarListener,
        Components.interfaces.nsIWebProgress.NOTIFY_LOCATION);
  },
  
  uninit: function() {
    gBrowser.removeProgressListener(myExt_urlBarListener);
  },

  processNewURL: function(aURI) {
    if (aURI.spec == this.oldURL)
      return;
    
    alert(aURI.spec);
    // now we know the url is new...
    this.oldURL = aURI.spec;
  }
};

//window.addEventListener("load", function() {myExtension.init()}, false);
//window.addEventListener("unload", function() {myExtension.uninit()}, false);

//gURLBar.addEventListener('keypress',function() {testMe()},false);

function testMe() {
}
