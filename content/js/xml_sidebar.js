var DPRXML = {
	updateHierarchy:function (altget,stop,prev,ssect){

		document.activeElement.blur();
		var getsutta = 0; // fix this...
		var newload = 0;
		
		if (altget == 3) getsutta = 4; // only remake section lists
		if (altget == 4) getsutta = 3; // remake section and sutta lists only, not vagga, volume or meta lists
		if (altget == 5) getsutta = 2; // remake section, sutta and vagga lists only, not volume or meta lists
		if (altget == 6) getsutta = 1; // remake all but meta lists
		if (stop == 0) newload = 0; // load xml data
		if (stop == 1) newload = 1; // don't load xml data
		if (stop == 2) newload = 2; // don't load xml data, load index instead
		if (stop == 3) { switchhier(prev); newload = 2 };
		   
		var nikaya = document.getElementById('set').value;
		var book = document.getElementById('book').value;
		var bookload = 'xml/' + nikaya + book + G_hier + '.xml';
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		var meta = (getsutta > 0  ? document.getElementById('meta').selectedIndex : 0);
		var volume = (getsutta > 1 ? document.getElementById('volume').selectedIndex : 0);
		var vagga = (getsutta > 2 ? document.getElementById('vagga').selectedIndex : 0);
		var sutta = (getsutta > 3 ? document.getElementById('sutta').selectedIndex : 0);


		var nik = document.getElementById('set').value;
		var book = document.getElementById('book').value;

		var xml,axml,lista,list,name,namea;
		
		axml = xmlDoc.getElementsByTagName("ha");
		namea = axml[0].getElementsByTagName("han");
		if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,''); 
		else name = this.unnamed;
		var outname = translit(toUni(name));
		document.getElementById('title').label = outname;
			
		var u = xmlDoc.getElementsByTagName("h0");
		var v = u[meta].getElementsByTagName("h1");
		var w = v[volume].getElementsByTagName("h2");
		var x = w[vagga].getElementsByTagName("h3");
		var y = x[sutta].getElementsByTagName("h4");
		
		if (getsutta == 0) // remake meta list
		{
			lista = this.makeTitleSelect(u,'h0n');

			var listNode = document.getElementById('meta');
			listNode.removeAllItems();
			
			if (lista.length == 1 && lista[0] == this.unnamed ) {
				listNode.appendItem(this.unnamed);
				listNode.collapsed = true;
			}
			
			else {
				for(idx in lista){
					listNode.appendItem(lista[idx]);
				}	
				listNode.collapsed = false;
			}
			listNode.selectedIndex = 0;
		}
		
		if (getsutta < 2) // remake volume list
		{
			lista = this.makeTitleSelect(v,'h1n');
			var listNode = document.getElementById('volume');
			listNode.removeAllItems();
			
			if (lista.length == 1 && lista[0] == this.unnamed ) {
				listNode.appendItem(this.unnamed);
				listNode.collapsed = true;
			}
			
			else {
				for(idx in lista){
					listNode.appendItem(lista[idx]);
				}	
				listNode.collapsed = false;
			}
			listNode.selectedIndex = 0;
		}
		if (getsutta < 3) // remake vaggalist
		{
			lista = this.makeTitleSelect(w,'h2n');
			var listNode = document.getElementById('vagga');
			listNode.removeAllItems();
			
			if (lista.length == 1 && lista[0] == this.unnamed ) {
				listNode.appendItem(this.unnamed);
				listNode.collapsed = true;
			}
			
			else {
				for(idx in lista){
					listNode.appendItem(lista[idx]);
				}	
				listNode.collapsed = false;
			}
			listNode.selectedIndex = 0;
		}

		if (getsutta < 4) // remake sutta list on getsutta = 0, 2, or 3
		{
			lista = this.makeTitleSelect(x,'h3n');
			var listNode = document.getElementById('sutta');
			listNode.removeAllItems();
			
			if (lista.length == 1 && lista[0] == this.unnamed ) {
				listNode.appendItem(this.unnamed);
				listNode.collapsed = true;
			}
			
			else {
				for(idx in lista){
					listNode.appendItem(lista[idx]);
				}	
				listNode.collapsed = false;
			}
			listNode.selectedIndex = 0;
		}
		lista = this.makeTitleSelect(y,'h4n');

		listNode = document.getElementById('section');
		listNode.removeAllItems();
		
		if (lista.length == 1 && lista[0] == this.unnamed ) {
			listNode.appendItem(this.unnamed);
			listNode.collapsed = true;
		}
		else {
			for(idx in lista){
				listNode.appendItem(lista[idx]);
			}	
			listNode.collapsed = false;
		}
		listNode.selectedIndex = 0;

	//	if (newload == 0) importXML();
	//	else if (newload == 2) importXMLindex();
	},

	makeTitleSelect:function(xml,tag) { // output menupopup tag with titles in menuitems
		var name, namea;
		var outlist = [];
		for (var a = 0; a < xml.length; a++)
		{
			name = xml[a].getElementsByTagName(tag);
			if (name[0].childNodes[0] && name[0].textContent.replace(/ /g,'').length > 0) namea = name[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,'');
			else {
				namea = this.unnamed;
				outlist.push(namea);
				continue;
			}
			
			namea = translit(toUni(namea));

			outlist.push(namea);
		}
		return outlist;
	},

	unnamed:'[unnamed]',
}
