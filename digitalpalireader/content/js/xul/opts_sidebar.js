var DPROpts = {
	tipitakaOptions: function () {
		document.getElementById('tsoContainer').setAttribute('collapsed',true);
		document.getElementById('tsoSetContainer').setAttribute('collapsed',true);
		document.getElementById('tsoSET').setAttribute('collapsed',true);
		document.getElementById('tsoBOOK').setAttribute('collapsed',true);
		document.getElementById('tsoPart').setAttribute('collapsed',true);
		document.getElementById('tsoMAT').setAttribute('collapsed',true);
		document.getElementById('tsoMAT2').setAttribute('collapsed',true);
		document.getElementById('tsoCO1').setAttribute('collapsed',true);
		document.getElementById('tsoCO2').setAttribute('collapsed',true);
		document.getElementById('tsoCO3').setAttribute('collapsed',true);
		document.getElementById('tsoBO').setAttribute('collapsed',true);

		var which = document.getElementById('tipType').selectedIndex;
		switch(which) {
			case 0:
				document.getElementById('tsoContainer').removeAttribute('collapsed');
				document.getElementById('tsoSetContainer').removeAttribute('collapsed');
				document.getElementById('tsoMAT').removeAttribute('collapsed');
				document.getElementById('tsoCO1').removeAttribute('collapsed');
				document.getElementById('tsoCO2').removeAttribute('collapsed');
				document.getElementById('tsoCO3').removeAttribute('collapsed');
			break;
			case 1:
				document.getElementById('tsoContainer').removeAttribute('collapsed');
				document.getElementById('tsoSET').removeAttribute('collapsed');
				document.getElementById('tsoMAT2').removeAttribute('collapsed');
				document.getElementById('tsoBO').removeAttribute('collapsed');
			break;
			case 2:
				document.getElementById('tsoContainer').removeAttribute('collapsed');
				document.getElementById('tsoSET').removeAttribute('collapsed');
				document.getElementById('tsoBOOK').removeAttribute('collapsed');
				document.getElementById('tsoMAT').removeAttribute('collapsed');
				DPRNav.setSearchBookList(); // populate books
			break;
			case 3:
				document.getElementById('tsoPart').removeAttribute('collapsed');
				document.getElementById('tsoContainer').removeAttribute('collapsed');
				document.getElementById('tsoSET').removeAttribute('collapsed');
				document.getElementById('tsoBOOK').removeAttribute('collapsed');
				document.getElementById('tsoMAT2').removeAttribute('collapsed');
				DPRXML.updateSearchHierarchy(0); // populate sections
			break;
			case 5:
				document.getElementById('tsoContainer').removeAttribute('collapsed');
				document.getElementById('tsoSetContainer').removeAttribute('collapsed');
				document.getElementById('tsoCO2').removeAttribute('collapsed');
			break;
			default:
			break;
		}

	},

	selAll:function(id) {
		var box = document.getElementById(id);
		var sels = box.getElementsByTagName(DPR_PAL.isWeb ? 'input' : 'checkbox');

		var cnt = 0;

		// check if all selected
		for(x=0; x < sels.length; x++) {
			if(sels[x].getAttribute('checked') == 'true') cnt++;
		}

		// if all selected, deselect, otherwise, select
		for(x=0; x < sels.length; x++) {
			sels[x].setAttribute('checked',(cnt != sels.length));
		}
	},

	dictAdvToggle:function() {
		var ao = document.getElementById('dictAdvOpts');
		if(!ao.getAttribute('collapsed')) ao.setAttribute('collapsed',true);
		else ao.removeAttribute('collapsed');
	},

	dictOptions:function () {
		var which = document.getElementById('dictType').value;

		document.getElementById('dictAdvOpts1').setAttribute('collapsed',true); // misc
		document.getElementById('dictAdvOpts2').setAttribute('collapsed',true); // mat
		document.getElementById('dictAdvOpts3').setAttribute('collapsed',true); // sets
		document.getElementById('soNO').collapsed = 'true';
		document.getElementById('soFT').collapsed = 'true';
		document.getElementById('soSW').collapsed = 'true';
		document.getElementById('soRX').collapsed = 'true';
		document.getElementById('soFZ').collapsed = 'true';
		switch (which) {
			case 'DPR': //dpr
				document.getElementById('soNO').removeAttribute('collapsed');
			break;
			case 'PED': // ped
				document.getElementById('dictAdvOpts1').removeAttribute('collapsed');
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'DPPN': // dppn
				document.getElementById('dictAdvOpts1').removeAttribute('collapsed');
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'CPED': // CPED
				document.getElementById('dictAdvOpts1').removeAttribute('collapsed');
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'CEPD': // CEPD
				document.getElementById('dictAdvOpts1').removeAttribute('collapsed');
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'MULTI': // Multi
				document.getElementById('dictAdvOpts1').removeAttribute('collapsed');
				document.getElementById('soFZ').removeAttribute('collapsed');
				//document.getElementById('soFT').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'ATT': // ATTH
				document.getElementById('dictAdvOpts1').removeAttribute('collapsed');
				document.getElementById('dictAdvOpts3').removeAttribute('collapsed');
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'TIK': // TIKA
				document.getElementById('dictAdvOpts1').removeAttribute('collapsed');
				document.getElementById('dictAdvOpts3').removeAttribute('collapsed');
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;
			case 'TIT': // Title
				document.getElementById('dictAdvOpts1').removeAttribute('collapsed');
				document.getElementById('dictAdvOpts2').removeAttribute('collapsed');
				document.getElementById('dictAdvOpts3').removeAttribute('collapsed');
				document.getElementById('soFZ').removeAttribute('collapsed');
				document.getElementById('soRX').removeAttribute('collapsed');
				document.getElementById('soSW').removeAttribute('collapsed');
			break;

		}
	},
	chooseSearchHier:function(depth) { // deactivate lower hierarchy in partial search
		if(!depth) depth = document.getElementById('tsoPR').selectedIndex+1;
		switch(depth) {
			case 1:
				document.getElementById('tsoPvolume').setAttribute('disabled',true);
				document.getElementById('tsoPvagga').setAttribute('disabled',true);
				document.getElementById('tsoPsutta').setAttribute('disabled',true);
				document.getElementById('tsoPsection').setAttribute('disabled',true);
			break;
			case 2:
				document.getElementById('tsoPvolume').removeAttribute('disabled');
				document.getElementById('tsoPvagga').setAttribute('disabled',true);
				document.getElementById('tsoPsutta').setAttribute('disabled',true);
				document.getElementById('tsoPsection').setAttribute('disabled',true);
			break;
			case 3:
				document.getElementById('tsoPvolume').removeAttribute('disabled');
				document.getElementById('tsoPvagga').removeAttribute('disabled');
				document.getElementById('tsoPsutta').setAttribute('disabled',true);
				document.getElementById('tsoPsection').setAttribute('disabled',true);
			break;
			case 4:
				document.getElementById('tsoPvolume').removeAttribute('disabled');
				document.getElementById('tsoPvagga').removeAttribute('disabled');
				document.getElementById('tsoPsutta').removeAttribute('disabled');
				document.getElementById('tsoPsection').setAttribute('disabled',true);
			break;
			case 5:
				document.getElementById('tsoPvolume').removeAttribute('disabled');
				document.getElementById('tsoPvagga').removeAttribute('disabled');
				document.getElementById('tsoPsutta').removeAttribute('disabled');
				document.getElementById('tsoPsection').removeAttribute('disabled');
			break;
		}

	},

}
