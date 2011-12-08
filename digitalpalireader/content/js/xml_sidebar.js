var DPRXML = {
	updateHierarchy:function (depth,event){ // depth: 4=section, 3=sutta..., 2=vagga..., 1=volume..., 0=all

		document.activeElement.blur();
		
		var nikaya = document.getElementById('set').value;
		var book = document.getElementById('book').value;
		var nikbookhier = nikaya + book + G_hier;
		var xmlDoc = loadXMLFile(nikbookhier,0);


		var meta = (depth > 0  ? document.getElementById('meta').selectedIndex : 0);
		var volume = (depth > 1 ? document.getElementById('volume').selectedIndex : 0);
		var vagga = (depth > 2 ? document.getElementById('vagga').selectedIndex : 0);
		var sutta = (depth > 3 ? document.getElementById('sutta').selectedIndex : 0);


		var nik = nikaya;

		var xml,axml,lista,list,name,namea;
		
		axml = xmlDoc.getElementsByTagName("ha");
		namea = axml[0].getElementsByTagName("han");
		if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,''); 
		else name = this.unnamed;
		var outname = translit(toUni(name));
		document.getElementById('title').value = outname;
			
		var u = xmlDoc.getElementsByTagName("h0");
		var v = u[meta].getElementsByTagName("h1");
		var w = v[volume].getElementsByTagName("h2");
		var x = w[vagga].getElementsByTagName("h3");
		var y = x[sutta].getElementsByTagName("h4");


		switch(true) {
			case (depth == 0): // remake meta list
				lista = this.makeTitleSelect(u,'h0n');

				var listNode = document.getElementById('meta');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.parentNode.collapsed = true;
				}
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.parentNode.collapsed = false;
				}
				listNode.selectedIndex = 0;
			case  (depth < 2): // remake volume list
				lista = this.makeTitleSelect(v,'h1n');
				var listNode = document.getElementById('volume');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.parentNode.collapsed = true;
				}
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.parentNode.collapsed = false;
				}
				listNode.selectedIndex = 0;

			case  (depth < 3): // remake vaggalist
				lista = this.makeTitleSelect(w,'h2n');
				var listNode = document.getElementById('vagga');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.parentNode.collapsed = true;
				}
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.parentNode.collapsed = false;
				}
				listNode.selectedIndex = 0;
			case  (depth < 4): // remake sutta list on depth = 0, 2, or 3
				lista = this.makeTitleSelect(x,'h3n');
				var listNode = document.getElementById('sutta');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.parentNode.collapsed = true;
				}
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					listNode.parentNode.collapsed = false;
				}
				listNode.selectedIndex = 0;
			default: // remake section list

				lista = this.makeTitleSelect(y,'h4n');

				listNode = document.getElementById('section');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					listNode.parentNode.collapsed = true;
				}
				else {
					for(idx = 0; idx < lista.length; idx++){
						listNode.appendItem(lista[idx]);
					}	
					listNode.parentNode.collapsed = false;
				}
				listNode.selectedIndex = 0;
			break;
		}
	
	// buttons
	
		if(document.getElementById('section').parentNode.collapsed == true) {
			if(document.getElementById('sutta').parentNode.collapsed == true) {
				if(document.getElementById('vagga').parentNode.collapsed == true) {
					if(document.getElementById('volume').parentNode.collapsed == true) {
						if(document.getElementById('meta').parentNode.collapsed == true) {
							document.getElementById('meta-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
						}
						else {
							document.getElementById('meta-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
							document.getElementById('meta-b').childNodes[0].setAttribute('value',"➤");
						}			
					}
					else {
						document.getElementById('meta-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
						document.getElementById('meta-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('meta-b').childNodes[0].setAttribute('value',"*");

						document.getElementById('volume-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
						document.getElementById('volume-b').setAttribute('tooltiptext',"View this section");
						document.getElementById('volume-b').childNodes[0].setAttribute('value',"➤");
					}			
				}
				else {
					document.getElementById('meta-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
						document.getElementById('meta-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('meta-b').childNodes[0].setAttribute('value',"*");
						
					document.getElementById('volume-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,3)");
						document.getElementById('volume-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('volume-b').childNodes[0].setAttribute('value',"*");
						
					document.getElementById('vagga-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
						document.getElementById('vagga-b').setAttribute('tooltiptext',"View this section");
						document.getElementById('vagga-b').childNodes[0].setAttribute('value',"➤");
				}
			}
			else {
				document.getElementById('meta-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
						document.getElementById('meta-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('meta-b').childNodes[0].setAttribute('value',"*");
				document.getElementById('volume-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,3)");
						document.getElementById('volume-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('volume-b').childNodes[0].setAttribute('value',"*");
				document.getElementById('vagga-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,4)");
						document.getElementById('vagga-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('vagga-b').childNodes[0].setAttribute('value',"*");
				document.getElementById('sutta-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
						document.getElementById('sutta-b').setAttribute('tooltiptext',"View this section");
						document.getElementById('sutta-b').childNodes[0].setAttribute('value',"➤");
			}
		}
		else {
			document.getElementById('meta-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,2)");
						document.getElementById('meta-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('meta-b').childNodes[0].setAttribute('value',"*");
			document.getElementById('volume-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,3)");
						document.getElementById('volume-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('volume-b').childNodes[0].setAttribute('value',"*");
			document.getElementById('vagga-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,4)");
						document.getElementById('vagga-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('vagga-b').childNodes[0].setAttribute('value',"*");
			document.getElementById('sutta-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event),null,5)");
						document.getElementById('sutta-b').setAttribute('tooltiptext',"Combine all sub-sections");
						document.getElementById('sutta-b').childNodes[0].setAttribute('value',"*");
			document.getElementById('section-b').setAttribute('onmouseup',"DPRSend.importXML(false,null,null,null,DPRSend.eventSend(event))");
						document.getElementById('section-b').setAttribute('tooltiptext',"View this section");
						document.getElementById('section-b').childNodes[0].setAttribute('value',"➤");
		}

	},
	
	updateSearchHierarchy:function (depth){ // depth: 4=section, 3=sutta..., 2=vagga..., 1=volume..., 0=all
		document.activeElement.blur();
		
		var nikaya = document.getElementById('tsoSETm').value;
		var book = document.getElementById('tsoBOOKm').value;
		var hiert = document.getElementById('tsoMAT2m').value;
		var nikbookhier = nikaya + book + hiert;

		var xmlDoc = loadXMLFile(nikbookhier,0);

		var nik = nikaya;

		var meta = (depth > 0  ? document.getElementById('tsoPmeta').selectedIndex : 0);
		var volume = (depth > 1 ? document.getElementById('tsoPvolume').selectedIndex : 0);
		var vagga = (depth > 2 ? document.getElementById('tsoPvagga').selectedIndex : 0);
		var sutta = (depth > 3 ? document.getElementById('tsoPsutta').selectedIndex : 0);

		var xml,axml,lista,list,name,namea;
		
		axml = xmlDoc.getElementsByTagName("ha");
		namea = axml[0].getElementsByTagName("han");
		if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,''); 
		else name = this.unnamed;
		var outname = translit(toUni(name));
			
		var u = xmlDoc.getElementsByTagName("h0");
		var v = u[meta].getElementsByTagName("h1");
		var w = v[volume].getElementsByTagName("h2");
		var x = w[vagga].getElementsByTagName("h3");
		var y = x[sutta].getElementsByTagName("h4");


		switch(true) {
			case (depth == 0): // remake meta list
				lista = this.makeTitleSelect(u,'h0n');

				var listNode = document.getElementById('tsoPmeta');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					document.getElementById('tsoP1').collapsed = true;
					document.getElementById('tsoPR').selectedIndex = 1;
				}
				
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					document.getElementById('tsoP1').collapsed = false;
				}
				listNode.selectedIndex = 0;
			case  (depth < 2): // remake volume list
				lista = this.makeTitleSelect(v,'h1n');
				var listNode = document.getElementById('tsoPvolume');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					document.getElementById('tsoP2').collapsed = true;
					if(document.getElementById('tsoPR').selectedIndex == 1) document.getElementById('tsoPR').selectedIndex = 2;
				}
				
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					document.getElementById('tsoP2').collapsed = false;
				}
				listNode.selectedIndex = 0;

			case  (depth < 3): // remake vaggalist
				lista = this.makeTitleSelect(w,'h2n');
				var listNode = document.getElementById('tsoPvagga');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					document.getElementById('tsoP3').collapsed = true;
					if(document.getElementById('tsoPR').selectedIndex == 2) document.getElementById('tsoPR').selectedIndex = 3;
				}
				
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					document.getElementById('tsoP3').collapsed = false;
				}
				listNode.selectedIndex = 0;
			case  (depth < 4): // remake sutta list on depth = 0, 2, or 3
				lista = this.makeTitleSelect(x,'h3n');
				var listNode = document.getElementById('tsoPsutta');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					document.getElementById('tsoP4').collapsed = true;
					if(document.getElementById('tsoPR').selectedIndex == 3) document.getElementById('tsoPR').selectedIndex = 4;
				}
				
				else {
					for(idx in lista){
						listNode.appendItem(lista[idx]);
					}	
					document.getElementById('tsoP4').collapsed = false;
				}
				listNode.selectedIndex = 0;
			default: // remake section list

				lista = this.makeTitleSelect(y,'h4n');

				listNode = document.getElementById('tsoPsection');
				listNode.removeAllItems();
				
				if (lista.length == 1 && lista[0] == this.unnamed ) {
					listNode.appendItem(this.unnamed);
					document.getElementById('tsoP5').collapsed = true;
				}
				else {
					for(idx = 0; idx < lista.length; idx++){
						listNode.appendItem(lista[idx]);
					}	
					document.getElementById('tsoP5').collapsed = false;
				}
				listNode.selectedIndex = 0;
			break;
		}
		DPROpts.chooseSearchHier();
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
