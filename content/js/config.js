var colorcfg = [];
var confmove = [];
var cfg = [];
var atiIns = 0;

function changeStyleByName(name,attrib,value) {
		var tags = document.getElementsByName(name);
		for(var i=0;i < tags.length;i++)
		{
			eval('tags[i].style.'+attrib+'="'+value+'";');
		} 
}

if(!ioCheck) {
	for (i in sPrefs) {
		confmove[i] = sPrefVals[i]; 
	}
	for (i in cPrefs) {
		colorcfg[cPrefs[i]] = cPrefVals[i]; 
	}
	for (i in mPrefs) {
		cfg[mPrefs[i]] = mPrefVals[i]; 
	}

	script = parseInt(cfg['script']); 



	function getconfig() {
		
		changeStyleByName('ioDep','display','none');

		document.getElementById('mafa').style.backgroundImage = 'url(images/background.png)';
		document.getElementById('mafb').style.backgroundImage = 'url(images/background.png)';
		document.getElementById('dif').style.backgroundImage = 'url(images/background.png)';
		document.getElementById('cof').style.backgroundImage = 'url(images/background.png)';
		document.getElementById('scf').style.backgroundImage = 'url(images/background.png)';
		document.getElementById('searchb').style.backgroundImage = 'url(images/background.png)';

		document.getElementById('mafa').style.backgroundColor = colorcfg['colbk'];
		document.getElementById('mafb').style.backgroundColor = colorcfg['colbk'];
		document.getElementById('dif').style.backgroundColor = colorcfg['colbk'];
		document.getElementById('cof').style.backgroundColor = colorcfg['colbk'];
		document.getElementById('scf').style.backgroundColor = colorcfg['colbk'];
		document.getElementById('searchb').style.backgroundColor = colorcfg['colbk'];
		document.body.style.backgroundColor = colorcfg['colbk'];

		var colort = colorcfg['colbkcp'];
		document.getElementById('searcht').style.backgroundColor = colort;
		document.getElementById('brmid').style.backgroundColor = colort;
		document.getElementById('brleft').style.backgroundColor = colort;

	}
}
else {

	confmove[0] = getSizePref('AnalyzeH'); // used for the height of the analysis bar in the middle of the screen
	confmove[1] = getSizePref('DictH'); // used for the height of the bottom box containing the dictionary, scratchpad and convertpad
	confmove[2] = getSizePref('ControlW'); // used for the width of the control box on the right side of the screen.
	confmove[3] = getSizePref('SearchH'); // used for the height of the search box (hidden)

	colorcfg['coltext'] = getColPref('coltext');
	colorcfg['colsel'] = getColPref('colsel');

	colorcfg['coldppn'] = getColPref('coldppn');
	colorcfg['colped'] = getColPref('colped');
	colorcfg['colcpd'] = getColPref('colcpd');

	colorcfg['colfont'] = getColPref('colfont');
	colorcfg['colsize'] = getColPref('colsize');

	colorcfg['colsearch0'] = getColPref('colsearch0');
	colorcfg['colsearch1'] = getColPref('colsearch1');
	colorcfg['colsearch2'] = getColPref('colsearch2');

	colorcfg['colbk'] = getColPref('colbk');
	colorcfg['colbkcp'] = getColPref('colbkcp');
	colorcfg['colbk1'] = getColPref('colbk1');
	colorcfg['colbk2'] = getColPref('colbk2');
	colorcfg['colbk3'] = getColPref('colbk3');

	colorcfg['green'] = getColPref('green');
	colorcfg['blue'] = getColPref('blue');
	colorcfg['brown'] = getColPref('brown');
	colorcfg['grey'] = getColPref('grey');
	colorcfg['red'] = getColPref('red');

	colorcfg['blueh'] = getColPref('blueh');

	cfg['ctrans'] = (getMiscPref("ctrans") == "checked"?"checked":"");
	cfg['catioff'] = (getMiscPref("catioff") == "checked"?"checked":"");
	cfg['catiloc'] = getMiscPref("catiloc").replace(/\\/g, '/');
	cfg['autodict'] = (getMiscPref('autodict') == "checked"?"checked":"");
	cfg['bkgimg'] = (getMiscPref('bkgimg') == "checked"?"checked":"");
	cfg['script'] = getMiscPref('script');
	cfg['cpanel'] = getMiscPref('cpanel');

	cfg['cp1'] = getMiscPref('cp1');
	cfg['cp2'] = getMiscPref('cp2');
	cfg['cp3'] = getMiscPref('cp3');
	cfg['cp4'] = getMiscPref('cp4');
	cfg['cp5'] = getMiscPref('cp5');
	cfg['cp6'] = getMiscPref('cp6');
	cfg['cp7'] = getMiscPref('cp7');
	cfg['cp8'] = getMiscPref('cp8');



	var script = 0;

	function getconfig() {
		confmove[0] = getSizePref('AnalyzeH'); // used for the height of the analysis bar in the middle of the screen
		confmove[1] = getSizePref('DictH'); // used for the height of the bottom box containing the dictionary, scratchpad and convertpad
		confmove[2] = getSizePref('ControlW'); // used for the width of the control box on the right side of the screen.
		confmove[3] = getSizePref('SearchH'); // used for the height of the search box (hidden)

		colorcfg['coltext'] = getColPref('coltext');
		colorcfg['colsel'] = getColPref('colsel');

		colorcfg['coldppn'] = getColPref('coldppn');
		colorcfg['colped'] = getColPref('colped');
		colorcfg['colcpd'] = getColPref('colcpd');

		colorcfg['colfont'] = getColPref('colfont');
		colorcfg['colsize'] = getColPref('colsize');

		colorcfg['colsearch0'] = getColPref('colsearch0');
		colorcfg['colsearch1'] = getColPref('colsearch1');
		colorcfg['colsearch2'] = getColPref('colsearch2');

		colorcfg['colbk'] = getColPref('colbk');
		colorcfg['colbkcp'] = getColPref('colbkcp');
		colorcfg['colbk1'] = getColPref('colbk1');
		colorcfg['colbk1'] = getColPref('colbk1');
		colorcfg['colbk3'] = getColPref('colbk3');

		colorcfg['green'] = getColPref('green');
		colorcfg['blue'] = getColPref('blue');
		colorcfg['brown'] = getColPref('brown');
		colorcfg['grey'] = getColPref('grey');
		colorcfg['red'] = getColPref('red');

		colorcfg['blueh'] = getColPref('blueh');

		cfg['ctrans'] = (getMiscPref("ctrans") == "checked"?"checked":"");
		cfg['catioff'] = (getMiscPref("catioff") == "checked"?"checked":"");
		cfg['catiloc'] = getMiscPref("catiloc").replace(/\\/g, '/');
		cfg['autodict'] = (getMiscPref('autodict') == "checked"?"checked":"");
		cfg['bkgimg'] = (getMiscPref('bkgimg') == "checked"?"checked":"");
		cfg['script'] = getMiscPref('script');
		script = parseInt(cfg['script']); 
		cfg['cpanel'] = getMiscPref('cpanel');

		cfg['cp1'] = getMiscPref('cp1');
		cfg['cp2'] = getMiscPref('cp2');
		cfg['cp3'] = getMiscPref('cp3');
		cfg['cp4'] = getMiscPref('cp4');
		cfg['cp5'] = getMiscPref('cp5');
		cfg['cp6'] = getMiscPref('cp6');
		cfg['cp7'] = getMiscPref('cp7');
		cfg['cp8'] = getMiscPref('cp8');

		// change colors

		changeStyleByName('changecolor','color',colorcfg['coltext']);

		// Add ATI translations if preferred
		if (cfg['ctrans'] == "checked" && typeof(atiD) == 'undefined' && atiIns == 0) {
			if (cfg['catioff'] == "checked") { 
				var nsrc = 'file://' + getHomePath().replace(/\\/g, '/') +'/'+ cfg['catiloc'] + '/html/tech/digital_pali_reader_suttas.js';
			}
			else { var nsrc = 'http://www.accesstoinsight.org/tech/digital_pali_reader_suttas.php'; }
			atiIns = 1;
			var headID = document.getElementsByTagName("head")[0];         
			var newScript = document.createElement('script');
			newScript.type = 'text/javascript';
			newScript.src = nsrc;
			headID.appendChild(newScript);
		}
		
		// Control Panel
		
		if(cfg['cpanel'] == '0' && cpout == 1) { moveframec(); };

		for (var i = 1; i <= 7; i++) {
			cfg['cp'+i] == '0' ? document.getElementById('cp'+i).style.display='none':'';
		}

		// update backgrounds
			
		checkbackground();
		checkcpbkg();

		// update fonts

		document.styleSheets[0]['cssRules'][0].style.color = colorcfg['coltext']; 
		document.styleSheets[0]['cssRules'][0].style.fontFamily = colorcfg['colfont']; 
		document.styleSheets[0]['cssRules'][1].style.fontSize = colorcfg['colsize'] + 'px'; 
		document.styleSheets[0]['cssRules'][2].style.fontSize = Math.round(parseInt(colorcfg['colsize'])*.9) + 'px';  // select, etc.
		document.styleSheets[0]['cssRules'][3].style.fontSize = Math.round(parseInt(colorcfg['colsize'])*.8) + 'px';  // small
		document.styleSheets[0]['cssRules'][4].style.fontSize = Math.round(parseInt(colorcfg['colsize'])*.7) + 'px';  // tiny
		
		document.styleSheets[0]['cssRules'][5].style.height = Math.round(30/16*parseInt(colorcfg['colsize'])) + 'px';  // abut - all buttons
		document.styleSheets[0]['cssRules'][6].style.width = Math.round(24/16*parseInt(colorcfg['colsize'])) + 'px';  // tbut - text buttons

		// update script
		
		//script = parseInt(cfg['script']);
		//document.form.translits.selectedIndex = script;
	}

	function changecss(myclass,element,value) {
		var CSSRules
		if (document.all) {
			CSSRules = 'rules'
		}
		else if (document.getElementById) {
			CSSRules = 'cssRules'
		}
		for (var i = 0; i < document.styleSheets[0][CSSRules].length; i++) {
			if (document.styleSheets[0][CSSRules][i].selectorText == myclass) {
				document.styleSheets[0][CSSRules][i].style[element] = value
			}
		}	
	}

	function checkbackground(x) {
		if (x==1) { 
			var colort = document.getElementById('colbk').value; 
			var bkgimg = document.getElementById('bkgimg').checked; 
		}
		else { 
			var colort = colorcfg['colbk']; 
			var bkgimg = cfg['bkgimg']; 
		}
		if (bkgimg == 'checked' || bkgimg == true) var bkgurl = 'url(images/background.png)';
		else bkgurl = '';

		document.getElementById('mafa').style.backgroundImage = bkgurl;
		document.getElementById('mafb').style.backgroundImage = bkgurl;
		document.getElementById('dif').style.backgroundImage = bkgurl;
		document.getElementById('cof').style.backgroundImage = bkgurl;
		document.getElementById('scf').style.backgroundImage = bkgurl;
		document.getElementById('searchb').style.backgroundImage = bkgurl;

		document.getElementById('mafa').style.backgroundColor = colort;
		document.getElementById('mafb').style.backgroundColor = colort;
		document.getElementById('dif').style.backgroundColor = colort;
		document.getElementById('cof').style.backgroundColor = colort;
		document.getElementById('scf').style.backgroundColor = colort;
		document.getElementById('searchb').style.backgroundColor = colort;
		document.body.style.backgroundColor = colort;
	}

	function checkcpbkg(x) {
		if (x==1) { 
			var colort = document.getElementById('colbkcp').value 
			document.getElementById('confanf').style.backgroundColor = colort;
			document.getElementById('confcpf').style.backgroundColor = colort;
		}
		else { var colort = colorcfg['colbkcp'] }
		document.getElementById('searcht').style.backgroundColor = colort;
		document.getElementById('brmid').style.backgroundColor = colort;
		document.getElementById('brleft').style.backgroundColor = colort;
	}

	function loadOptions() {
		moveframex(2);

		var winW = window.innerWidth;
		var winH = window.innerHeight;

		document.getElementById('mafa').innerHTML = '';
		var mafaout = '<table style="width:100%">';
			mafaout += '<tr>';
				mafaout += '<td valign="top" align="center"><div align="center"><b>Layout</b><br /><br /></div><form id="sizeform"><table align=center border=1 height="' + (winH/3) + '">';
				mafaout += '<tr>';
					mafaout += '<td id="confcpf" bgcolor="'+colorcfg['colbkcp']+'" align=center rowspan=3 width="' + (confmove[2]/2.5) + '">W<br><input onBlur="confmove[2] = checksizes(\'ControlW\',this.value); this.value = confmove[2]; moveframex(2,1);" id="ControlW" value="'+confmove[2]+'" type=input maxlength=4 size=4 title="Enter desired width"></td>';
					mafaout += '<td width="' + ((winW-confmove[2])/3) + '" align=center>(<i>auto</i>)</td>';
				mafaout += '</tr>';
				mafaout += '<tr>';
					mafaout += '<td id="confanf" bgcolor="'+colorcfg['colbkcp']+'" align=center height="1">(<i>auto</i>)</td>';
				mafaout += '</tr>';
				mafaout += '<tr>';
					mafaout += '<td id="confdictf" align=center height="' + (confmove[1]/3) + '">H <input onBlur="confmove[1] = checksizes(\'DictH\',this.value); this.value = confmove[1]; moveframex(2,1);" id="DictH" value="'+confmove[1]+'" type=input maxlength=4 size=4 title="Enter desired height"></td>';
				mafaout += '</tr>';
			mafaout += '</table>';
			mafaout += '<table><tr>';
					mafaout += '<td align="right"><b id="col6" style="background-color:'+colorcfg['colbk']+'; color:'+colorcfg['coltext']+'">Main Background: </b></td>';
					mafaout += '<td><input name="color6" id="colbk" value="'+colorcfg['colbk']+'" type=input size=7 title="Enter desired background color" onkeyup="document.getElementById(\'col6\').style.backgroundColor=this.value; checkbackground(1)"> <input type="checkbox" id="bkgimg" ' + (cfg['bkgimg']=='checked' ? 'checked':'') + ' onclick="checkbackground(1);" '+cfg['bkgimg']+'>Add texture</input>';
				mafaout += '</tr><tr>';
					mafaout += '<td align="right"><b id="col7" style="color:'+colorcfg['coltext']+'; background-color:'+colorcfg['colbkcp']+'">Panel Background: </b></td>';
					mafaout += '<td><input name="color7" id="colbkcp" value="'+colorcfg['colbkcp']+'" type=input size=7 title="Enter desired control panel color" onkeyup="document.getElementById(\'col7\').style.backgroundColor=this.value; checkcpbkg(1)">';
				mafaout += '</tr>';
			mafaout += '</table>';
			mafaout += '</p></form></td>';
			mafaout += '<td style="border-left:grey 1px solid" align=center valign="top"><div align=center><b>Text</b><br /><br /></div>';
				mafaout += '<form id="colorform">';
				mafaout += '<table><tr>';
					mafaout += '<td align="right"><font style="color:'+colorcfg['coltext']+'" id="col1">Text: </font></td>';
					mafaout += '<td><input name="color1" id="coltext" value="'+colorcfg['coltext']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col1\').style.color=this.value;"></td>';
					mafaout += '<td align="right"><b id="col8">Font: </b></td>';
					mafaout += '<td><input name="color8" id="colfont" value="'+colorcfg['colfont']+'" type=input size=7 title="Enter desired font family" onkeyup="document.getElementById(\'col8\').style.fontFamily=this.value">';
				mafaout += '</tr><tr>';
					mafaout += '<td align="right"><b style="color:'+colorcfg['colsel']+'" id="col2">Selected: </b></td>';
					mafaout += '<td><input name="color2" id="colsel" value="'+colorcfg['colsel']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col2\').style.color=this.value;"><br>';
					mafaout += '<td align="right"><b id="col9">Size: </b></td>';
					mafaout += '<td><input name="color9" id="colsize" value="'+colorcfg['colsize']+'" type=input size=7 title="Enter desired font size in pixels" onkeyup="document.getElementById(\'col9\').style.fontSize=this.value + \'px\'">px';
				mafaout += '</tr><tr>';
					mafaout += '<td align="right"><b style="color:'+colorcfg['colped']+'" id="col3">PED: </b></td>';
					mafaout += '<td><input name="color3" id="colped" value="'+colorcfg['colped']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col3\').style.color=this.value;">';
					mafaout += '<td align="right"><b id="col9">Script: </b></td>';
					mafaout += '<td><select class="sel" size="1" name="color10" id="translits" selectedIndex="'+cfg['script']+'" title="Select desired script" onchange="changeScript(1);"><option selected>Roman</option><option>Thai</option><option>Devanagari</option><option>Myanmar</option><option>Sinhala</option></select>';
				mafaout += '</tr><tr>';
					mafaout += '<td align="right"><b style="color:'+colorcfg['coldppn']+'" id="col4">DPPN: </b></td>';
					mafaout += '<td><input name="color4" id="coldppn" value="'+colorcfg['coldppn']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col4\').style.color=this.value;">';
				mafaout += '</tr><tr>';
					mafaout += '<td align="right"><b style="color:'+colorcfg['colcpd']+'" id="col5">CPD: </b></td>';
					mafaout += '<td><input name="color5" id="colcpd" value="'+colorcfg['colcpd']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col5\').style.color=this.value;">';
				mafaout += '</tr></table>';
			mafaout += '</form></td>';
		mafaout += '</tr><tr>';
			mafaout += '<td colspan=3><hr /><form name="miscform">';
				mafaout += '<p><b>Options:</b></p>';
				mafaout += '<p>Show translations <input type=checkbox id="ctrans" '+cfg['ctrans']+' onclick="this.checked==true ? document.getElementById(\'catiul\').style.display = \'block\' : document.getElementById(\'catiul\').style.display = \'none\';">';
				mafaout += '<ul id="catiul" '+(cfg['ctrans'] == 'checked' ? '': 'style="display:none"')+' ><li><input type="checkbox" name="catioff" id="catioff" '+cfg['catioff']+'> Use <a href="http://www.accesstoinsight.org/tech/download/bulk/bulk.html" style="color:blue" target="_blank">offline version</a> of <a href="http://www.accesstoinsight.org/" style="color:blue" target="_blank">accesstoinsight.org</a> - location: <b>'+getHomePath()+'/</b><input type="text" name="catiloc" id="catiloc" value="'+cfg['catiloc']+'" onkeyup="if(fileExists(this.value,\'start.html\')) { document.getElementById(\'atilocx\').style.color=\'green\'; document.getElementById(\'atilocx\').innerHTML=\'ok\'; } else{document.getElementById(\'atilocx\').style.color=\'red\'; document.getElementById(\'atilocx\').innerHTML=\'x\';}"><b>/start.html <font id="atilocx" size="5" style="color:'+(fileExists(cfg['catiloc'],'start.html') ? 'green">ok' : 'red">x' )+'</font></b></li></ul></p>';
				mafaout += '<p>Dictionary search as you type <input type=checkbox id="autodict" '+cfg['autodict']+'>';
			mafaout += '</form></td>';
		mafaout += '</tr></table>';
		mafaout += '<p align=center>';
			mafaout += '<button class="btn" onclick="saveOptions()">Save</button>';
			mafaout += '<button class="btn" onclick="moveframex(2); refreshit()">Cancel</button>';
			mafaout += '<button class="btn" onclick="eraseOptions(1)">Restore defaults</button><b style="color:'+colorcfg['colsel']+'" id=message> </b>';
		mafaout += '</p>';
		document.getElementById('mafbc').innerHTML = mafaout;
		document.getElementById('translits').selectedIndex = parseInt(cfg['script']);
	}

	function saveOptions() {
		
		if(document.miscform.catioff.checked && !fileExists(document.miscform.catiloc.value,'start.html')) {
			alert('Unrecognized local directory for ATI.  Please disable offline translations before saving preferences.'); 
			return; 
		}
		
		var Val;
		var Pref;
		for (i = 0; i < cPrefs.length; i++) {
			Pref = cPrefs[i];
			if (document.getElementById(Pref)) {
				Val = document.getElementById(Pref).value;
				if (Val) {
					setColPref(Pref,Val);
				}
			}
		}
		for (i = 0; i < sPrefs.length; i++) {
			Pref = sPrefs[i];
			if (document.getElementById(Pref)) {
				Val = document.getElementById(Pref).value;
				if (Val) {
					Val = checksizes(Pref,Val);
					setSizePref(Pref,Val);
				}
			}
		}
		for (i = 0; i < mPrefs.length; i++) {
			Pref = mPrefs[i];
			if (document.getElementById(Pref)) {
				if (document.getElementById(Pref).type=='checkbox') {
					Val = document.getElementById(Pref).checked;
					if (Val == true) Val = 'checked';
					if (Val == false) Val = 'unchecked';
				}
				else Val = document.getElementById(Pref).value;
				setMiscPref(Pref,Val);
			}
		}
		document.getElementById('message').innerHTML = " Options saved."
		moveframex(2);
		atiIns = 0; // in case we have to load a new ATI - it will still check for atiD
		getconfig();
	}

	function checksizes(pref,size) {

		var winW = window.innerWidth;
		var winH = window.innerHeight;
		switch (pref) {
			case 'ControlW':
				if (size < 80) { return 80; }
				if (size > (winW - 200)) { return (winW-200); }
				break;
			case 'AnalyzeH':
				if (size < 20) { return 20; }
				if (size > (winH - parseInt(confmove[1])-200)) { return (winH - parseInt(confmove[1]) - 200); }
				break;
			case 'DictH':
				if (size < 40) { return 40; }
				if (size > (winH - parseInt(confmove[0])-200)) { return (winH - parseInt(confmove[0]) - 200); }
				break;
			}
		return parseInt(size);
	}

	function eraseOptions(which) {
		
		var yes = confirm('Are you sure you want to reset all options?');
		
		if(!yes) return;
		
		for (i = 0; i < cPrefs.length; i++) {
			var Pref = cPrefs[i];
			var Val = cPrefVals[i];
			setColPref(Pref,Val);
		}
		for (i = 0; i < sPrefs.length; i++) {
			var Pref = sPrefs[i];
			var Val = sPrefVals[i];
			setSizePref(Pref,Val);
		}
		for (i = 0; i < mPrefs.length; i++) {
			var Pref = mPrefs[i];
			var Val = mPrefVals[i];
			setMiscPref(Pref,Val);
		}
		getconfig();
		if (which) {
			loadOptions();
			document.getElementById('message').innerHTML = " Options reset."
			moveframex(2);
		}
		else { refreshit(1); }
	}

}
