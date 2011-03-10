
function loadDPR() {
    var theTab          = gBrowser.addTab('chrome://digitalpalireader/content/index.htm');
    theTab.label        = "Digital Pali Reader";
    gBrowser.selectedTab = theTab;
	var func = function () { gBrowser.setIcon(theTab, "chrome://digitalpalireader/skin/icons/logo.png"); };
	setTimeout(func, 500);
}
