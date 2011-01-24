var colorcfg = [];
var confmove = [];
var cfg = [];
var atiIns = 0;

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
cfg['autodict'] = (getMiscPref('autodict') == "checked"?"checked":"");
cfg['bkgimg'] = (getMiscPref('bkgimg') == "checked"?"checked":"");
cfg['script'] = getMiscPref('script');
cfg['cpanel'] = getMiscPref('cpanel');


var colchanges = document.getElementsByName('changecolor');
for(var i=0;i < colchanges.length;i++)
{
    colchanges[i].style.color=colorcfg['coltext'];
} 

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
	cfg['autodict'] = (getMiscPref('autodict') == "checked"?"checked":"");
	cfg['bkgimg'] = (getMiscPref('bkgimg') == "checked"?"checked":"");
	cfg['script'] = getMiscPref('script');
	cfg['cpanel'] = getMiscPref('cpanel');
	
    // Add ATI translations if preferred
    if (cfg['ctrans'] == "checked" && typeof(atiD) == 'undefined' && atiIns == 0) {
		atiIns = 1;
        var headID = document.getElementsByTagName("head")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'http://www.accesstoinsight.org/tech/digital_pali_reader_suttas.php';
        headID.appendChild(newScript);
    }
	
	// Control Panel
	
	if(cfg['cpanel'] == '0' && cpout == 1) { moveframec(); };

	// update backgrounds
		
	checkbackground();
	checkcpbkg();

	// update fonts

	document.styleSheets[0]['cssRules'][0].style.color = colorcfg['coltext']; 
	document.styleSheets[0]['cssRules'][0].style.fontFamily = colorcfg['colfont']; 
	document.styleSheets[0]['cssRules'][1].style.fontSize = colorcfg['colsize'] + 'px'; 
	document.styleSheets[0]['cssRules'][2].style.fontSize = (parseInt(colorcfg['colsize']) - 2) + 'px'; 
	document.styleSheets[0]['cssRules'][3].style.fontSize = (parseInt(colorcfg['colsize']) - 6) + 'px'; 

	// update script
	
	script = parseInt(cfg['script']);
	document.form.translits.selectedIndex = script;
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
    var mafaout = '<table style="width:' + (winW-confmove[2]-100) + 'px">';
    mafaout += '<tr><td colspan=2><font size=4><b>DPR Configuration</b></font></td></tr>';
    mafaout += '<tr><td valign=top><p align=center><b>Size</b></p><p><form id="sizeform">';
		mafaout += '<table align=center border=1 height="' + (winH/2.5) + '">';
		mafaout += '<tr>';
			mafaout += '<td width="' + ((winW-confmove[2])/2.5) + '" align=center>(<i>auto</i>)</td>';
			mafaout += '<td id="confanf" bgcolor="'+colorcfg['colbkcp']+'" align=center rowspan=3 width="' + (confmove[2]/2.5) + '">W<br><input onBlur="confmove[2] = checksizes(\'ControlW\',this.value); this.value = confmove[2]; moveframex(2,1);" id="ControlW" value="'+confmove[2]+'" type=input maxlength=4 size=4 title="Enter desired width"></td>';
		mafaout += '</tr>';
		mafaout += '<tr>';
			mafaout += '<td id="confcpf" bgcolor="'+colorcfg['colbkcp']+'" align=center height="' + (confmove[0]/2.5) + '">H <input onBlur="confmove[0] = checksizes(\'AnalyzeH\',this.value); this.value = confmove[0]; moveframex(2,1);" id="AnalyzeH" value="'+confmove[0]+'" type=input maxlength=4 size=4 title="Enter desired height"></td>';
		mafaout += '</tr>';
		mafaout += '<tr>';
			mafaout += '<td align=center height="' + (confmove[1]/2.5) + '">H <input onBlur="confmove[1] = checksizes(\'DictH\',this.value); this.value = confmove[1]; moveframex(2,1);" id="DictH" value="'+confmove[1]+'" type=input maxlength=4 size=4 title="Enter desired height"></td>';
		mafaout += '</tr>';
		mafaout += '</table>';
    mafaout += '</p></form></td>';
    mafaout += '<td align=center><form id="colorform">';
    mafaout += '<p align=center><b>Text</b></p>';
    mafaout += '<p style="color:'+colorcfg['coltext']+'" id="col1">Text: <input name="color1" id="coltext" value="'+colorcfg['coltext']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col1\').style.color=this.value;"><br>';
    mafaout += '<p><b style="color:'+colorcfg['colsel']+'" id="col2">Selected: </b><input name="color2" id="colsel" value="'+colorcfg['colsel']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col2\').style.color=this.value;"><br>';
    mafaout += '<p><b style="color:'+colorcfg['colped']+'" id="col3">PED: </b><input name="color3" id="colped" value="'+colorcfg['colped']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col3\').style.color=this.value;">';
    mafaout += '<p><b style="color:'+colorcfg['coldppn']+'" id="col4">DPPN: </b><input name="color4" id="coldppn" value="'+colorcfg['coldppn']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col4\').style.color=this.value;">';
    mafaout += '<p><b style="color:'+colorcfg['colcpd']+'" id="col5">CPD: </b><input name="color5" id="colcpd" value="'+colorcfg['colcpd']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col5\').style.color=this.value;">';
    mafaout += '<p><b id="col6" style="color:'+colorcfg['coltext']+'; background-color:'+colorcfg['colbkcp']+'">Panel: </b><input name="color6" id="colbkcp" value="'+colorcfg['colbkcp']+'" type=input size=7 title="Enter desired control panel color" onkeyup="document.getElementById(\'col6\').style.backgroundColor=this.value; checkcpbkg(1)">';
    mafaout += '<p><b id="col7" style="background-color:'+colorcfg['colbk']+'; color:'+colorcfg['coltext']+'">BKGD: </b><input name="color7" id="colbk" value="'+colorcfg['colbk']+'" type=input size=7 title="Enter desired background color" onkeyup="document.getElementById(\'col7\').style.backgroundColor=this.value; checkbackground(1)"><br /><input type="checkbox" id="bkgimg" ' + (cfg['bkgimg']=='checked' ? 'checked':'') + ' onclick="checkbackground(1);" '+cfg['bkgimg']+'>Add parchment texture</input>';
    mafaout += '<p><b id="col8">Font: </b><input name="color8" id="colfont" value="'+colorcfg['colfont']+'" type=input size=7 title="Enter desired font family" onkeyup="document.getElementById(\'col8\').style.fontFamily=this.value">';
    mafaout += '<p><b id="col9">Size (px): </b><input name="color9" id="colsize" value="'+colorcfg['colsize']+'" type=input size=7 title="Enter desired font size in pixels" onkeyup="document.getElementById(\'col9\').style.fontSize=this.value + \'px\'">';
    mafaout += '</form></td></tr><tr><td colspan=2><hr /><p><b>Misc. Options:</b></p>';
    mafaout += '<p>Show translations <input type=checkbox id="ctrans" '+cfg['ctrans']+'>';
    mafaout += '<p>Dictionary search as you type <input type=checkbox id="autodict" '+cfg['autodict']+'>';
    mafaout += '</td></tr></table>';
    mafaout += '<p align=center>';
		mafaout += '<button class="btn" onclick="saveOptions()">Save</button>';
		mafaout += '<button class="btn" onclick="moveframex(2); refreshit()">Cancel</button>';
		mafaout += '<button class="btn" onclick="eraseOptions(1)">Restore defaults</button><b style="color:'+colorcfg['colsel']+'" id=message> </b>';
    mafaout += '</p>';
    document.getElementById('mafb').innerHTML = mafaout;
}

function saveOptions() {
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
            Val = document.getElementById(Pref).checked;
            if (Val == true) Val = 'checked';
            else Val = 'unchecked';
            setMiscPref(Pref,Val);
        }
    }
    document.getElementById('message').innerHTML = " Options saved."
    moveframex(2);
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
