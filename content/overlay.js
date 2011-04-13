var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIWebNavigation)
			   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
			   .rootTreeItem
			   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIDOMWindow); 
mainWindow.document.getElementById('sidebar-header').hidden = true;

function unloadDPR() {
	mainWindow.document.getElementById('sidebar-header').hidden = mainWindow.document.getElementById("sidebar-box").hidden;
}
