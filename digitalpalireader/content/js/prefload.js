
// default prefs

var DPR_prefsD = [];

DPR_prefsD['DictH'] = 250;

DPR_prefsD['translits'] = 0;
DPR_prefsD['textmag'] = 100;
DPR_prefsD['coltext'] = '#111';
DPR_prefsD['colsel'] = '#550';

DPR_prefsD['coldppn'] = '#0B0';
DPR_prefsD['colped'] = '#C40';
DPR_prefsD['colcpd'] = '#44D';

DPR_prefsD['colfont'] = 'Verdana';
DPR_prefsD['colsize'] = '16';

DPR_prefsD['bktype'] = 'colimg';
DPR_prefsD['colbk'] = '#FFD';
DPR_prefsD['imgbk'] = 'url(chrome://digitalpalireader/content/images/background.png)';

DPR_prefsD['bkcptype'] = 'col';
DPR_prefsD['colbkcp'] = '#F4F4F4';
DPR_prefsD['imgbkcp'] = '-moz-linear-gradient(left,#DDC,#FFF,#DDC,#DDC)';

DPR_prefsD['colInput'] = '#FFF';
DPR_prefsD['colButton'] = 'RGBa(200,200,200,0.1)';
DPR_prefsD['imgButton'] = '-moz-linear-gradient(left,#DDC,#FFF,#DDC,#DDC)';
DPR_prefsD['colButtonSel'] = '#FFF';
DPR_prefsD['colbk1'] = 'yellow';
DPR_prefsD['colbk2'] = 'aqua';
DPR_prefsD['colbk3'] = 'green';

DPR_prefsD['colsearch0'] = 'yellow';
DPR_prefsD['colsearch1'] = 'blue';
DPR_prefsD['colsearch2'] = 'green';

DPR_prefsD['green'] = '#00B900';
DPR_prefsD['blue'] = '#5353D5';
DPR_prefsD['brown'] = '#000000';
DPR_prefsD['grey'] = 'grey';
DPR_prefsD['red'] = 'red';

DPR_prefsD['blueh'] = 'powderblue';

DPR_prefsD['ctrans'] = false;
DPR_prefsD['catioff'] = false;
DPR_prefsD['catiloc'] = '<none>';
DPR_prefsD['autodict'] = false;
DPR_prefsD['bkgimg'] = true;

DPR_prefsD['buddhist_texts'] = false;
DPR_prefsD['btloc'] = '<none>';


DPR_prefsD['allContext'] = true;
DPR_prefsD['contextSelected'] = false;
DPR_prefsD['noContext'] = false;

DPR_prefsD['translits'] = 0;

DPR_prefsD['setRows'] = 7;

DPR_prefsD['showPages'] = false;
DPR_prefsD['showPagesFull'] = false;
DPR_prefsD['showVariants'] = true;
DPR_prefsD['showVariantsInline'] = true;
DPR_prefsD['showPermalinks'] = true;
DPR_prefsD['showNames'] = true;
DPR_prefsD['showPedLinks'] = true;

DPR_prefsD['nigahita'] = false;

DPR_prefsD['copyWord'] = false;

DPR_prefsD['altlimit'] = 20;

var DPR_prefs = [];

function setPrefs() {
	var i;
	for (i in DPR_prefsD) {
		var pref = getPref(i);
		if(pref === null)
			pref = DPR_prefsD[i];
		
		DPR_prefs[i] = pref;
	}

	// perform changes
	
	var baseSize = 28;
	var textmag = DPR_prefs['textmag'];
	
	var magSize = Math.round(baseSize*textmag/100);
	var magSize2 = Math.round(baseSize*textmag/200);
	var magSize3 = Math.round(baseSize*textmag/300);
		
	$('head').append('<style id="addedCSS" type="text/css">p,span,td,select,option,input,.bottom-open-close,.left-open-close { font-size: '+magSize3+'pt; }  #prefs-button { top: '+magSize2+'px; height: '+magSize2+'px; width:'+magSize2+'px; } #topdiv,#divb,#content,#close-bottom, #open-bottom{left:'+magSize+'px} #close-bottom,#open-bottom { height: '+magSize+' !important; } .left-open-close, #close-left,#open-left { width: '+magSize+'px !important; } .bottom-open-close { height: '+ Math.round(magSize/1.8)+'px !important;  } #nav-title,.navbutton,.navselect{width:'+ Math.round(2.1*textmag)+'px} #sidebar{width:'+ Math.round(2.4*textmag)+'px} #anft{margin-right:'+magSize2+'px}</style>'); 
	
	$('#div2').css('margin-top',$('#nav-rel-div').height()+'px');
	
	// set pref inputs
	$('#text-size-input').val(DPR_prefs['textmag']);
}


function savePrefs() {
	
	var textmag = $('#text-size-input').val();
	if(!/[^0-9]/.test(textmag) && parseInt(textmag) < 501 && parseInt(textmag) > 49) {
		setPref('textmag',textmag);
	}
	else
		$('#text-size-input').val(DPR_prefs['textmag']);

	setPrefs();
}

function setPref(name,value) {
    var expires = "";
	var date = new Date();
	date.setTime(date.getTime() + (3650*24*60*60*1000));
	expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getPref(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function erasePref(name) {
    createCookie(name,"",-1);
}

