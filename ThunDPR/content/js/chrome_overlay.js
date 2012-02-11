var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIWebNavigation)
			   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
			   .rootTreeItem
			   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
			   .getInterface(Components.interfaces.nsIDOMWindow); 


var DPROverlay = {
	rightClick:function(type) {
		try{
			var el = document.getElementById('content-frame');
			var te = el.contentWindow.getSelection();
			
			var range = te.getRangeAt(0);
			
			var nn = document.createElement('p');
			var frag = range.extractContents();
			var newn = this.replaceTexts(frag,type);
			range.insertNode(newn);
			te.removeAllRanges();
			te.addRange(range);
		}
		catch(ex){
			alert(ex);
		}
	},
	
	replaceTexts:function(node,type) {
		try{
			if(!node.childNodes.length) {
				node.textContent = this.replacer(node.textContent,type);
				return node;
			}
			for(var i = 0; i < node.childNodes.length;i++) {
				node.childNodes[i] = this.replaceTexts(node.childNodes[i],type);
			}
			return node;
		}
		catch(ex){
			alert(ex);
		}
	},
	replacer:function(html,type) {
		switch(type) {
			case 'u':
				html = DPRTranslit.toUni(html);
				break;
			case 'v':
				html = DPRTranslit.toVel(html);
				break;
		}
		return html;
	},
}