var DPROpts = {
	tipitakaOptions: function () {
		document.getElementById('tsoMAT').setAttribute('collapsed',true);
		document.getElementById('tsoCO1').setAttribute('collapsed',true);
		document.getElementById('tsoCO2').setAttribute('collapsed',true);
		document.getElementById('tsoCO3').setAttribute('collapsed',true);
		document.getElementById('tsoBO').setAttribute('collapsed',true);
		
		var which = document.getElementById('tipType').selectedIndex;
		switch(which) {
			case 4:
				document.getElementById('tsoCO1').removeAttribute('collapsed');
				document.getElementById('tsoCO2').removeAttribute('collapsed');
				document.getElementById('tsoCO3').removeAttribute('collapsed');
			break;
			case 5:
				document.getElementById('tsoBO').removeAttribute('collapsed');
			break;
			case 7:
				document.getElementById('tsoMAT').removeAttribute('collapsed');
			break;
			case 8:
				document.getElementById('tsoMAT').removeAttribute('collapsed');
			break;
			case 9:
				document.getElementById('tsoMAT').removeAttribute('collapsed');
			break;
			case 11:
				document.getElementById('tsoMAT').removeAttribute('collapsed');
				document.getElementById('tsoCO1').removeAttribute('collapsed');
				document.getElementById('tsoCO2').removeAttribute('collapsed');
				document.getElementById('tsoCO3').removeAttribute('collapsed');
			break;
			case 12:
				document.getElementById('tsoMAT').removeAttribute('collapsed');
				document.getElementById('tsoBO').removeAttribute('collapsed');
			break;
			case 14:
				document.getElementById('tsoCO2').removeAttribute('collapsed');
			break;
			default:
			break;
		}

	},
	
	dictAdvToggle:function() {
		var ao = document.getElementById('dictAdvOpts');
		if(!ao.getAttribute('collapsed')) ao.setAttribute('collapsed',true);
		else ao.removeAttribute('collapsed'); 
	},
	
	dictOptions:function () {
		var which = document.getElementById('dictType').value;
		document.getElementById('soNO').collapsed = 'true';
		document.getElementById('soFT').collapsed = 'true';
		document.getElementById('soSW').collapsed = 'true';
		document.getElementById('soRX').collapsed = 'true';
		document.getElementById('soFZ').collapsed = 'true';
		document.getElementById('soNSV').collapsed = 'true';  // Vinaya Select
		document.getElementById('soNS').collapsed = 'true';  // Nikaya Select
		document.getElementById('soNSA').collapsed = 'true';  // Abhi Select
		document.getElementById('soMAT').collapsed = 'true';  // MAT Select
		switch (which) {
			case 'DPR': //dpr
				document.getElementById('soNO').removeAttribute('collapsed');
			break;
			case 'PED': // ped
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'DPPN': // dppn
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'CPED': // CPED
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'CEPD': // CEPD
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'MULTI': // Multi
				document.getElementById('soFZ').removeAttribute('collapsed');
				//document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'ATT': // ATTH
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
				document.getElementById('soNSV').removeAttribute('collapsed');
				document.getElementById('soNS').removeAttribute('collapsed');
				document.getElementById('soNSA').removeAttribute('collapsed');
			break;
			case 'TIK': // TIKA
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
				document.getElementById('soNSV').removeAttribute('collapsed');
				document.getElementById('soNS').removeAttribute('collapsed');
				document.getElementById('soNSA').removeAttribute('collapsed');
			break;
			case 'TIT': // Title
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
				document.getElementById('soMAT').removeAttribute('collapsed');
				document.getElementById('soNSV').removeAttribute('collapsed');
				document.getElementById('soNS').removeAttribute('collapsed');
				document.getElementById('soNSA').removeAttribute('collapsed');
			break;

		}
	},
	
}
