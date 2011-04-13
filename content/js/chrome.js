
function openDPRTab(permalink,id) {
	
	var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                   .getInterface(Components.interfaces.nsIWebNavigation)
                   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                   .rootTreeItem
                   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                   .getInterface(Components.interfaces.nsIDOMWindow); 

	var newTab = mainWindow.gBrowser.addTab(permalink);

	if(id) newTab.setAttribute('id', id);
	mainWindow.gBrowser.moveTabTo(newTab, mainWindow.gBrowser.selectedTab.tabIndex+1)
	mainWindow.gBrowser.selectedTab = newTab;

}

