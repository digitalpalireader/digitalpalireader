var G_dictType = '';
var G_dictQuery = '';
var G_dictOpts = []; // 
var G_dictEntry = '';
var G_dictUnicode = false;

function moveframey() {
} // fake

function startDictLookup(dictType,dictQuery,dictOpts,dictEntry) {

    G_dictEntry = '';

	if(!dictType) { // make opt list from url
		var options = document.location.href.split('?')[1].split('#')[0].split('&');
        for(i = 0; i < options.length; i++) {
            var option = options[i].split('=');
            switch(option[0]) {
                case 'type':
                G_dictType = option[1];
                break;
                case 'query':
                G_dictQuery = decodeURIComponent(option[1]);
                break;
                case 'opts':
                G_dictOpts = option[1].split(',');
                break;
                case 'entry':
                G_dictEntry = decodeURIComponent(option[1]);
                break;
            }
        }

	}
	else { // replace url
		G_dictType = dictType;
		G_dictQuery = dictQuery;
		G_dictOpts = dictOpts;
		G_dictEntry = dictEntry;
		
		var permalink = 'chrome://digitalpalireader/content/dict.htm' + '?type='+G_dictType+(G_dictQuery?'&query=' + G_dictQuery:'') + '&opts=' + G_dictOpts.join(',') + (G_dictEntry?'&entry=' + G_dictEntry:'');
		try {
			window.history.replaceState('Object', 'Title', permalink);
		}
		catch(ex) {
		}
	}

	G_dictUnicode = /[āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ]/.test(G_dictQuery);

	var st = [];
	st['PED'] = 'PED';
	st['DPPN'] = 'DPPN';
	st['CPED'] = 'CPED';
	st['MULTI'] = 'Multi';
	st['CEPD'] = 'CEPD';
	st['ATT'] = 'Atth';
	st['TIK'] = 'Tika';
	st['TIT'] = 'Titles';

	// tab title

	var tabT = "Dict: '" + (G_dictQuery != ''?G_dictQuery:toUni(G_dictEntry.split(',')[1])) + '\' in ' + st[G_dictType];
	
	document.getElementsByTagName('title')[0].innerHTML = tabT;
	document.getElementById('difb').innerHTML = '';
	
	

	switch (G_dictType) {
		case 'PED':
			pedsearchstart();
			break;
		case 'DPPN':
			dppnsearchstart();
			break;
		case 'CPED':
			mlsearchstart();
			break;
		case 'MULTI':
			multisearchstart();
			break;
		case 'CEPD':
			epdsearchstart();
			break;
		case 'ATT':
			attsearchstart();
			break;
		case 'TIK':
			tiksearchstart();
			break;
		case 'TIT':
			titlesearchstart();
			break;
	}
}

function pedsearchstart(hard)
{
	var getstring = G_dictQuery;

    if(getstring == '') {
        paliXML(toUni(G_dictEntry));
        return;
    }

	if(!/[^0-9\/]/.exec(getstring) && devCheck == 1) { // dev link
		sendPaliXML('dev/'+getstring+',dev');
		return;
	}
	
	if(/ft/.exec(G_dictOpts)) { // full text search
		
		pedFullTextSearch(getstring);
		return;
	}

	if(/fz/.exec(G_dictOpts)) {
		getstring = toFuzzy(getstring);
	}
	
	var finouta = new Array();
	var y = 0;
	var finout = '';

	for (pedt in mainda)
	{
		if(/fz/.exec(G_dictOpts)) {
			pedt = toFuzzy(pedt);
		}
		var totest = pedt;
		if(G_dictUnicode) totest = toUni(totest);

		if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (totest.search(getstring) == 0 || (!/sw/.test(G_dictOpts) && totest.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (totest.indexOf(getstring) == 0 || (!/sw/.test(G_dictOpts) && totest.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			for (z = 0; z < mainda[pedt].length; z++) {
			
				var loc = mainda[pedt][z];
				
				uniout = pedt;
				
				uniout = toUni(uniout).replace(/`/g,'˚');
				
				finouta[y] = '<a href="javascript:void(0)" style="color:'+DPR_prefs['coltext']+'" onclick="paliXML(\'PED/' + loc+','+ uniout + '\');">' + uniout + (mainda[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>';

				y++;
			}
		}
	}



	document.getElementById('dicthead').innerHTML = '<p>PED entry search for <b style="color:'+DPR_prefs['colped']+'">'+(/rx/.exec(G_dictOpts)?toUniRegEx(getstring):toUni(getstring))+'</b>:<hr />';
	
	var outDiv = document.createElement('div');
	
	if(finouta.length == 0) {
		outDiv.innerHTML += '<table width="100%"><tr><td>No results</td></tr></table><hr />';

		
		if(/hd/.exec(G_dictOpts) || hard) { // find similar words if hard search
			var simlist = findSimilarWords(toFuzzy(getstring),mainda,70,1);
			if(simlist) {
				outDiv.innerHTML += '<p>Did you mean:</p>';
				for (i in simlist) {
					pedt = simlist[i][1];
					for (z = 0; z < mainda[pedt].length; z++) {
					
						var loc = mainda[pedt][z];
						
						uniout = pedt;
						
						uniout = toUni(uniout).replace(/`/g,'˚');
						
						finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['coltext']+'" onclick="paliXML(\'PED/' + loc+','+ uniout + '\')">' + uniout + (mainda[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');

						y++;
					}
				}
			}
			else outDiv.innerHTML += '<p>No suggestions.</p>';
		}
		else {
			finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['colped']+'" onclick="pedsearchstart(1)">Show Suggestions</a><br>');

		}
	}

	var findiv = Math.ceil(finouta.length/3);
	var listoutf = '<table width="100%">';
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}

	outDiv.innerHTML += listoutf + '</table><hr />';
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
	
	if(G_dictEntry) paliXML(toUni(G_dictEntry));
	
	yut = 0;
}

function pedFullTextSearch(getstring) {
	
	getstring = toUni(getstring);
	
	var finalout = '';
	
	var listouta = [];
	
	for (i = 0; i < 5; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML1/'+i+'/ped.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		
		var allp = xmlDoc.getElementsByTagName('data');
		
		for (j =0; j < allp.length; j++) {
			var texttomatch = allp[j].textContent;
			startmatch = texttomatch.search(getstring);
			postpara = '';
			if (startmatch >= 0)
			{
				listouta.push('<a href="#pedo'+i+'/'+j+'" style="color:'+DPR_prefs['colped']+'">' + texttomatch.substring(0,texttomatch.search(/\/b/)-1).replace(/<b>/,'') + '</a><br>'); 
				while (startmatch >= 0)
				{				
					gotstring = texttomatch.match(getstring)[0];
					endmatch = startmatch + gotstring.length;
					beforem = texttomatch.substring(0,startmatch);
					afterm = texttomatch.substring(endmatch,texttomatch.length);
					postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>';
					texttomatch = texttomatch.substring(endmatch);
					startmatch = texttomatch.search(getstring);
				}
				postpara += afterm;

				postpara = postpara.replace(/<c0>/g, '<span style="color:'+DPR_prefs['colped']+'">').replace(/<xc>/g, '</span>');
				
				finalout += '<a name="pedo'+i+'/'+j+'"><p><a href="#diftop" class="small" style="color:'+DPR_prefs['colped']+'">top</a></p><p>' + postpara + '</p><hr>';
			}
		}
	}

	document.getElementById('dicthead').innerHTML = '<div><a name="diftop"><br />PED full-text search for <b style="color:'+DPR_prefs['colped']+'">'+(/rx/.exec(G_dictOpts)?toUniRegEx(getstring):toUni(getstring))+'</b>:</div>';

	// word list

	var y = listouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('dict').innerHTML = '';
		document.getElementById('dict').appendChild(outDiv);
		document.getElementById('odif').scrollTop=0;
		return;
	}	
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+listouta[z]+'</td><td>'+(listouta[findiv+z]?listouta[findiv+z]:'')+'</td><td>'+(listouta[(findiv*2)+z]?listouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table><hr />' + finalout;
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
}

var G_dppn = [];

function dppnsearchstart(hard)
{
	var getstring = G_dictQuery;
    
    if(getstring == '') {
        DPPNXML(toUni(G_dictEntry));
        return;
    }
    
	if(!/[^0-9\/]/.exec(getstring) && devCheck == 1) { // dev link
		sendDPPNXML('dppn/'+getstring);
		return;
	}

	document.getElementById('dict').innerHTML='';
	document.getElementById('dict').appendChild(pleasewait);

	
	if(/ft/.exec(G_dictOpts)) { // full text search
		
		dppnFullTextSearch(getstring);
		return;
	}

	if(/fz/.exec(G_dictOpts)) {
		getstring = toFuzzy(getstring);
	}

	var gslength = getstring.length;
	var loc = '';	
	
	var gletter = getstring.charAt(0);

	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var dict = '../DPPN/';
	
	var finouta = new Array();
	var finout = '';

    for (x in nameda)
	{

		var dppnt = x;
		
		if(/fz/.exec(G_dictOpts)) {
			dppnt = toFuzzy(dppnt);
		}
		
		var totest = dppnt;
		if(G_dictUnicode) totest = toUni(totest);
		
        if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (totest.search(getstring) == 0 || (!/sw/.test(G_dictOpts) && totest.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (totest.indexOf(getstring) == 0 || (!/sw/.test(G_dictOpts) && totest.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			for (z = 0; z < nameda[x].length; z++) {
			
				loc = nameda[x][z];
				
				uniout = toUni(dppnt);
					
				finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['coltext']+'" onClick="DPPNXML(\''+uniout+'/' + loc + ',' + uniout + '\')">' + uniout + (nameda[x].length > 1 ? ' ' + (z+1) : '') + '</a><br>');
			}
		}
	}


	document.getElementById('dicthead').innerHTML = '<p>DPPN entry search for <b style="color:'+DPR_prefs['coldppn']+'">'+(/rx/.exec(G_dictOpts)?toUniRegEx(getstring):toUni(getstring))+'</b>:<hr />';

	var listoutf = '';
	

	if(finouta.length == 0) {
		listoutf += '<table width="100%"><tr><td>No results</td></tr></table><hr />';

		
		if(/hd/.exec(G_dictOpts) || hard) { // find similar words if hard search
			var simlist = findSimilarWords(toFuzzy(getstring),nameda,70,1);
			if(simlist) {
				listoutf += '<p>Did you mean:</p>';
				for (i in simlist) {
					pedt = simlist[i][1];
					for (z = 0; z < nameda[pedt].length; z++) {
					
						var loc = nameda[pedt][z];
						
						uniout = pedt;
						
						uniout = toUni(uniout).replace(/`/g,'˚');
						
						finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['coltext']+'" onClick="DPPNXML(\''+uniout+'/' + loc + ',' + uniout + '\')">' + uniout + (nameda[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');

					}
				}
			}
			else listoutf += '<p>No suggestions.</p>';
		}
		else {
			finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['colped']+'" onclick="dppnsearchstart(1)">Show Suggestions</a><br>');

		}
	}

	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	listoutf += '<table width="100%">';
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table><hr />';
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
	yut = 0;
	
	if(G_dictEntry) DPPNXML(toUni(G_dictEntry));

	
}

function dppnFullTextSearch(getstring) {
	
	var finalouta = [];
	
	var listouta = [];
	getstring = toUni(getstring);
	for (i = 1; i < 10; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML2/'+i+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		
		var allp = xmlDoc.getElementsByTagName('entry');
		
		for (j =0; j < allp.length; j++) {
			var addend = ''; 
			
			var texttomatch = allp[j].textContent;
			if(texttomatch.indexOf('Pali Proper Names') >=0) continue;
			if(texttomatch.indexOf('"huge"]') > -1) var ttitle = texttomatch.substring(texttomatch.indexOf('"huge"]')+7,texttomatch.indexOf('[/div]'));
			else if(texttomatch.indexOf('[b]') > -1) {
				var ttitle = texttomatch.substring(texttomatch.indexOf('[b]')+3,texttomatch.indexOf('[/b]'));
			}
			else continue;
			texttomatch = texttomatch.replace(/\[\/*a[^]]*\]/g, '');
			startmatch = texttomatch.search(getstring);
			postpara = '';
			if (startmatch >= 0)
			{
				listouta.push(ttitle+'###<a href="#dppno'+i+'/'+j+'" style="color:'+DPR_prefs['colped']+'">' + ttitle + '</a><br>');
				while (startmatch >= 0)
				{				
					gotstring = texttomatch.match(getstring)[0];
					endmatch = startmatch + gotstring.length;
					beforem = texttomatch.substring(0,startmatch);
					afterm = texttomatch.substring(endmatch,texttomatch.length);
					postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>';
					texttomatch = texttomatch.substring(endmatch);
					startmatch = texttomatch.search(getstring);
				}
				postpara += afterm;

				postpara = postpara.replace(/<c0>/g, '<span style="color:'+DPR_prefs['colped']+'">').replace(/<xc>/g, '</span>');
				
				finalouta.push(ttitle+'###<hr class="thick"><a name="dppno'+i+'/'+j+'"><div style="position:relative"><div style="position:absolute;top:0px; left:0px;"><a href="javascript:void(0)" onclick="document.getElementById(\'dictc\').scrollTop = 0;" class="small" style="color:'+DPR_prefs['colped']+'">top</a></div><br/>' + postpara.replace(/\[/g, '<').replace(/\]/g, '>') + addend + '</b></div>');
			}
		}
	}


	// word list

	listouta = sortaz(listouta);

	var y = listouta.length;

	var findiv = Math.ceil(y/3);
	
	var listoutf = '<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('dict').innerHTML = '';
		document.getElementById('dict').appendChild(outDiv);
		document.getElementById('odif').scrollTop=0;
		return;
	}	
	
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+listouta[z]+'</td><td>'+(listouta[findiv+z]?listouta[findiv+z]:'')+'</td><td>'+(listouta[(findiv*2)+z]?listouta[(findiv*2)+z]:'')+'</td></tr>';
	}

	document.getElementById('dicthead').innerHTML = '<div><a name="diftop"><br />DPPN full-text search for <b style="color:'+DPR_prefs['colped']+'">'+getstring+'</b>:</div>'+ listoutf;

	var finout = sortaz(finalouta).join('\n');


	var outDiv = document.createElement('div');
	outDiv.innerHTML = '</table><hr />' + finout;
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
}



var G_cpedAlt = [];

function mlsearchstart(hard)
{
	clearDivs('dict');
	var getstring = G_dictQuery;
	if(/fz/.exec(G_dictOpts)) {
		getstring = toFuzzy(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();
	
	
	var gletter = getstring.charAt(0);
	var finouta = new Array();
	var finout = '';
	if( G_cpedAlt = []) {
		for (a in yt) G_cpedAlt.push([a].concat(yt[a]));
	}
		
	var cnt = 0;
	for (x = 0; x < G_cpedAlt.length; x++)
	{
		var us = '';
		var ud = '';

		var gsplit = [G_cpedAlt[x][0],G_cpedAlt[x][3],G_cpedAlt[x][2]];

		if(!/ft/.exec(G_dictOpts)) {
			var tosearch = gsplit[0];
		}
		else {
			var tosearch = G_cpedAlt[x][0]+' '+G_cpedAlt[x][3]+' '+G_cpedAlt[x][2];
		}
		
		if(/fz/.exec(G_dictOpts)) {
			tosearch = toFuzzy(tosearch);
		}

		if(G_dictUnicode) tosearch = toUni(tosearch);
        
        if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			cnt++;
			us = toUni(gsplit[0]);
			ud = toUni(gsplit[1] + ' (' + gsplit[2] + ')');
			
			finouta.push('<div><b><a style="color:'+DPR_prefs['colsel']+'" href="javascript:void(0)" onclick="if(document.getElementById(\'cped'+cnt+'\').innerHTML == \'\') { conjugate(\''+us+'\',\'cped'+cnt+'\')} else { document.getElementById(\'cped'+cnt+'\').innerHTML = \'\';}">' + us + '</a></b>: '+ud +'<br><div class="conjc" id="cped'+cnt+'"></div></div>');

		}
	}
	
	document.getElementById('dicthead').innerHTML = '<p>CPED search for <b style="color:'+DPR_prefs['colped']+'">'+(/rx/.exec(G_dictOpts)?toUniRegEx(getstring):toUni(getstring))+'</b>:<hr /><table width=100%><tr><td valign="top">';

	if(finouta.length == 0) {
		finout += '<table width="100%"><tr><td>No results</td></tr></table><hr />';

		
		if(/hd/.exec(G_dictOpts) || hard) { // find similar words if hard search
			var simlist = findSimilarWords(toFuzzy(getstring),yt,70,1);
			if(simlist) {
				finout += '<p>Did you mean:</p>';
				for (i in simlist) {
					pedt = simlist[i][1];
					
					var loc = yt[pedt];
					
					us = toUni(pedt);
					ud = toUni(yt[pedt][2] + ' (' + yt[pedt][1] + ')');
					
					finouta.push('<div><b><a style="color:'+DPR_prefs['colcpd']+'" href="javascript:void(0)" onclick="if(document.getElementById(\'cpedsim'+i+'\').innerHTML == \'\') { conjugate(\''+us+'\',\'cpedsim'+i+'\')} else { document.getElementById(\'cpedsim'+i+'\').innerHTML = \'\';}">' + us + '</a></b>: '+ud +'<br><div class="conjc" id="cpedsim'+i+'"></div></div>');

				}
			}
			else finout += '<p>No suggestions.</p>';
		}
		else {
			finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['colcpd']+'" onclick="mlsearchstart(1)">Show Suggestions</a><br>');

		}
	}
	
	finout += '<table>'
	for (z = 0; z < finouta.length; z++)
	{
		finout += '<tr><td>'+finouta[z]+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = finout + '</table><hr />';
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
	yut = 0;
}

// multi dictionary PED, DPPN, CPED


function multisearchstart(hard)
{
	var getstring = G_dictQuery;

	if(/fz/.exec(G_dictOpts)) {
		getstring = toFuzzy(getstring);
	}
	
	var finouta = new Array();
	var y = 0;
	var finout = '';

	// get ped

	for (pedt in mainda)
	{
		if(/fz/.exec(G_dictOpts)) {
			pedt = toFuzzy(pedt);
		}

		var tosearch = pedt;
		if(G_dictUnicode) tosearch = toUni(tosearch);

		if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			for (z = 0; z < mainda[pedt].length; z++) {
			
				var loc = mainda[pedt][z];
				
				uniout = pedt;
				
				uniout = toUni(uniout).replace(/`/g,'˚');
				
				finouta.push(uniout+'###<a href="javascript:void(0)" style="color:'+DPR_prefs['colped']+'" onclick="paliXML(\'PED/' + loc+','+ uniout + '\')">' + uniout + (mainda[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');
			}
		}
	}

    for (x in nameda)
	{
		var dppnt = x;
		if(/fz/.exec(G_dictOpts)) {
			dppnt = toFuzzy(dppnt);
		}
		
		var tosearch = dppnt;
		if(G_dictUnicode) tosearch = toUni(tosearch);

        if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			for (z = 0; z < nameda[x].length; z++) {
			
				loc = nameda[x][z];
				
				uniout = toUni(dppnt);
					
				finouta.push(uniout+'###<a href="javascript:void(0)" style="color:'+DPR_prefs['coldppn']+'" onClick="DPPNXML(\''+uniout+'/' + loc + ',' + uniout + '\')">' + uniout + (nameda[x].length > 1 ? ' ' + (z+1) : '') + '</a><br>');
			}
		}
	}

	// get cped
	
	if( G_cpedAlt = []) {
		for (a in yt) G_cpedAlt.push([a].concat(yt[a]));
	}
		
	var cnt = 0;
	for (x = 0; x < G_cpedAlt.length; x++)
	{
		var us = '';
		var ud = '';

		var gsplit = [G_cpedAlt[x][0],G_cpedAlt[x][3],G_cpedAlt[x][2]];

		if(!/ft/.exec(G_dictOpts)) {
			var tosearch = gsplit[0];
		}
		else {
			var tosearch = G_cpedAlt[x][0]+' '+G_cpedAlt[x][3]+' '+G_cpedAlt[x][2];
		}
		
		if(/fz/.exec(G_dictOpts)) {
			tosearch = toFuzzy(tosearch);
		}
		
 		if(G_dictUnicode) tosearch = toUni(tosearch);       
        
        if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!/sw/.exec(G_dictOpts) && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.exec(G_dictOpts) && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			cnt++;
			us = toUni(gsplit[0]);
			ud = toUni(gsplit[1] + ' (' + gsplit[2] + ')');
			
			finouta.push(us+'###<div><a style="color:'+DPR_prefs['colcpd']+'" href="javascript:void(0)" onclick=" conjugate(\''+us+'\',\'dif\')" title="'+ud.replace(/"/g,'&amp;quot;')+'">' + us + '</a><br><div class="conjc" id="cped'+cnt+'"></div></div>');

		}
	}
	
	
	var outDiv = document.createElement('div');
	
	document.getElementById('dicthead').innerHTML = '<p><span style="color:'+DPR_prefs['colped']+'" >PED</span>, <span style="color:'+DPR_prefs['coldppn']+'" >DPPN</span>, &amp; <span style="color:'+DPR_prefs['colcpd']+'" >CPED</span> entry search for <b style="color:'+DPR_prefs['colsel']+'">'+getstring+'</b>:<hr />';

	if(finouta.length == 0) {
		outDiv.innerHTML += '<table width="100%"><tr><td>No results</td></tr></table><hr />';

		
		if(/hd/.exec(G_dictOpts) || hard) { // find similar words if hard search
			var simlistp = findSimilarWords(toFuzzy(getstring),mainda,70,1);
			var simlistd = findSimilarWords(toFuzzy(getstring),nameda,70,1);
			var simlistc = findSimilarWords(toFuzzy(getstring),yt,70,1);
			
			if(simlistp || simlistd || simlistc) {
				outDiv.innerHTML += '<p>Did you mean:</p>';
				for (i in simlistp) {
					pedt = simlistp[i][1];
					for (z = 0; z < mainda[pedt].length; z++) {
					
						var loc = mainda[pedt][z];
						
						uniout = pedt;
						
						uniout = toUni(uniout).replace(/`/g,'˚');
						
						finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['colped']+'" onclick="paliXML(\'PED/' + loc+','+ uniout + '\')">' + uniout + (mainda[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');

						y++;
					}
				}
				for (i in simlistd) {
					pedt = simlistd[i][1];
					for (z = 0; z < nameda[pedt].length; z++) {
					
						var loc = nameda[pedt][z];
						
						uniout = pedt;
						
						uniout = toUni(uniout).replace(/`/g,'˚');
						
						finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['coldppn']+'" onclick="DPPNXML(\''+uniout+'/' + loc + ',' + uniout + '\')">' + uniout + (nameda[pedt].length > 1 ? ' ' + (z+1) : '') + '</a><br>');

						y++;
					}
				}
				for (i in simlistc) {
					pedt = simlistc[i][1];
					
					var loc = yt[pedt];
					
					us = toUni(pedt);
					ud = toUni(yt[pedt][2] + ' (' + yt[pedt][1] + ')');
					
					finouta.push('<div><a style="color:'+DPR_prefs['colcpd']+'" href="javascript:void(0)" onclick="if(document.getElementById(\'cpedsim'+i+'\').innerHTML == \'\') { document.getElementById(\'cpedsim'+i+'\').innerHTML = \''+ud +'\'} else { document.getElementById(\'cpedsim'+i+'\').innerHTML = \'\';}">' + us + '</a><br><div class="conjc" id="cpedsim'+i+'"></div></div>');

				}
			}
			else outDiv.innerHTML += '<p>No suggestions.</p>';
		}
		else {
			finouta.push('<a href="javascript:void(0)" style="color:'+DPR_prefs['colped']+'" onclick="pedsearchstart(1)">Show Suggestions</a><br>');

		}
	}
	else finouta = sortaz(finouta);
	
	var findiv = Math.ceil(finouta.length/3);
	var listoutf = '<table width="100%">';
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}

	outDiv.innerHTML += listoutf + '</table><hr />';
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
	yut = 0;
}



function epdsearchstart()
{
	if(typeof(epd) == 'undefined') {
		return;
	}

	clearDivs('dict');
	
	var getstring = G_dictQuery;
	if(/fz/.exec(G_dictOpts)) {
		getstring = toFuzzy(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();
	
	
	var gletter = getstring.charAt(0);
	var finouta = new Array();
	var y = 0;
	var finout = '';
	
	for (x = 0; x < epd.length; x++)
	{
		gsplit = epd[x].split('^');
		
		if(!/ft/.exec(G_dictOpts)) {
			var tosearch = gsplit[0];
		}
		else {
			var tosearch = epd[x];
		}
		if(/fz/.exec(G_dictOpts)) {
			tosearch = toFuzzy(tosearch);
		}

  		if(G_dictUnicode) tosearch = toUni(tosearch);       
       
        if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!/sw/.exec(G_dictOpts) && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.exec(G_dictOpts) && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			
			finouta.push('<b><font style="color:'+DPR_prefs['colsel']+'">' + gsplit[0] + '</font></b>: '+gsplit[1] +'<br>');

		}
	}
	
	document.getElementById('dicthead').innerHTML = '<p>CEPD search for <b style="color:'+DPR_prefs['colped']+'">'+(/rx/.exec(G_dictOpts)?toUniRegEx(getstring):toUni(getstring))+'</b>:';
	
	finout = '<hr /><table width=100%><tr><td valign="top">';
	if(finouta.length == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = finout + 'No results</td></tr></table>';
		document.getElementById('dict').innerHTML = '';
		document.getElementById('dict').appendChild(outDiv);
		document.getElementById('odif').scrollTop=0;
		return;
	}		
	for (var z = 0; z < finouta.length; z++)
	{
		finout += finouta[z];
	}	
	var outDiv = document.createElement('div');
	outDiv.innerHTML = finout + '</td></tr></table>';
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
	yut = 0;
}


function attsearchstart()
{
	if(typeof(attlist) == 'undefined') {
		return;
	}
	clearDivs('dict');
	
	var getstring = G_dictQuery;
	if(/fz/.exec(G_dictOpts)) {
		getstring = toFuzzy(getstring);
	}
	else getstring = toUni(getstring);
	
	var gslength = getstring.length;
	var gsplit = new Array();	
	var hsplit = [];
	var gletter = getstring.charAt(0);
	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var finouta = new Array();
	var y = 0;
	var finout = '';
	var outnik = '';

	for (x = 0; x < attlist.length; x++)
	{
		outnik = '';
		var attt = attlist[x].split('#')[0];
		
		if(/fz/.exec(G_dictOpts)) {
			attt = toFuzzy(attt);
		}
		
		var tosearch = attt;
 		if(G_dictUnicode) tosearch = toUni(tosearch);       

        if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			var entries = attlist[x].split('#');
			gsplit = entries.shift();
			uniout = toUni(gsplit);
			
			// nikayas
			for(a = 0; a < entries.length; a++) {
				var tnik = entries[a].charAt(0);
				if(G_dictOpts.indexOf('x'+tnik) == -1) entries.splice(a--,1);
				else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
			}
			if (entries.length == 0) continue;
                       
			finouta[y] = '<span class="pointer style="color:'+DPR_prefs['coltext']+'" onclick="getAtthXML('+ x +',\'a\',\''+outnik+'\')">' + uniout + ' (' + (entries.length) + ')</span><br>';
			y++;
		}
	}
	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	document.getElementById('dicthead').innerHTML = '<p>Aṭṭhakathā term search for <b style="color:'+DPR_prefs['colped']+'">'+toUni(getstring)+'</b>:'
	
	var listoutf = '<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('dict').innerHTML = '';
		document.getElementById('dict').appendChild(outDiv);
		document.getElementById('odif').scrollTop=0;
		return;
	}	
		
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table>';
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
	yut = 0;
}


function tiksearchstart()
{
	if(typeof(tiklist) == 'undefined') {
		return;
	}

	clearDivs('dict');
	
	var getstring = G_dictQuery;
	if(/fz/.exec(G_dictOpts)) {
		getstring = toFuzzy(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();	
	var hsplit = [];
	var gletter = getstring.charAt(0);
	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var finouta = new Array();
	var y = 0;
	var finout = '';
	var outnik = '';

	for (x = 0; x < tiklist.length; x++)
	{
		outnik = '';
		var tikt = tiklist[x].split('#')[0];
		
		if(/fz/.exec(G_dictOpts)) {
			tikt = toFuzzy(tikt);
		}

		var tosearch = tikt;
 		if(G_dictUnicode) tosearch = toUni(tosearch);

        if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{

			var entries = tiklist[x].split('#');
			gsplit = entries.shift();
			uniout = toUni(gsplit);
			
			// nikayas
			for(a = 0; a < entries.length; a++) {
				var tnik = entries[a].charAt(0);
				if(G_dictOpts.indexOf('x'+tnik) == -1) entries.splice(a--,1);
				else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
			}
			if (entries.length == 0) continue;

			finouta[y] = '<span class="pointer" style="color:'+DPR_prefs['coltext']+'" onclick="getAtthXML('+ x +',\'t\',\''+outnik+'\')">' + uniout + ' (' + (entries.length) + ')</span><br>';
			y++;
		}
	}
	var y = finouta.length;

	var findiv = Math.ceil(y/3);
	
	document.getElementById('dicthead').innerHTML = '<p>Ṭīka term search for <b style="color:'+DPR_prefs['colped']+'">'+toUni(getstring)+'</b>:';
	
	var listoutf = '<hr /><table width="100%">';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('dict').innerHTML = '';
		document.getElementById('dict').appendChild(outDiv);
		document.getElementById('odif').scrollTop=0;
		return;
	}	
		
	for (z = 0; z < findiv; z++)
	{
		listoutf += '<tr><td>'+finouta[z]+'</td><td>'+(finouta[findiv+z]?finouta[findiv+z]:'')+'</td><td>'+(finouta[(findiv*2)+z]?finouta[(findiv*2)+z]:'')+'</td></tr>';
	}
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf + '</table>';
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
	yut = 0;
}


function titlesearchstart()
{
	if(typeof(titlelist) == 'undefined') {
		return;
	}

	clearDivs('dict');
	
	var getstring = G_dictQuery;
	if(/fz/.exec(G_dictOpts)) { 
		getstring = toFuzzy(getstring);
	}
	else {
		getstring = toUni(getstring);
	}
	
	var gslength = getstring.length;
	var gsplit = new Array();	
	var hsplit = [];
	var gletter = getstring.charAt(0);
	var foldersw = new Array();
	var f0 = 0;
	var f1 = 0;

	var finouta = new Array();
	var y = 0;
	var finout = '';

	var outnik = '';

	for (x = 0; x < titlelist.length; x++)
	{
		
		outnik = '';
		
		var titt = titlelist[x].split('#')[0];
		if(/fz/.exec(G_dictOpts)) {
			titt = toFuzzy(titt);
		}

		var tosearch = titt;
 		if(G_dictUnicode) tosearch = toUni(tosearch);

		if (/rx/.exec(G_dictOpts)) { // reg exp
			var yessir = (tosearch.search(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.search(getstring) > -1));
		}
		else { // non reg exp
			var yessir = (tosearch.indexOf(getstring) == 0 || (!/sw/.test(G_dictOpts) && tosearch.indexOf(getstring) > -1));
		}
		if(yessir)
		{
			
			// separate mat
			var entries = titlelist[x].split('#');
			gsplit = entries.shift();
			uniout = toUni(gsplit);

			for(a = 0; a < entries.length; a++) {
				if(!G_dictOpts.indexOf('m'+entries[a].charAt(entries[a].length-3))) {
					entries.splice(a--,1);
				}
			}
			if (entries.length == 0) continue;
			
			// nikayas
			for(a = 0; a < entries.length; a++) {
				var tnik = entries[a].charAt(0);
				if(G_dictOpts.indexOf('x'+tnik) == -1) entries.splice(a--,1);
				else if(outnik.indexOf(tnik) == -1) outnik+=tnik;
			}
			if (entries.length == 0) continue;

			// add DPPN title entries

			var dppnEntry = [];
			if(nameda[gsplit]) {
				dppnEntry = nameda[gsplit];
			}
			else {
				if(typeof(nameda[gsplit.replace(/\.m$/,'')]) == 'object') {
					dppnEntry = nameda[gsplit.replace(/\.m$/,'')];
				}
				else if(typeof(nameda[gsplit.replace(/o$/,'a')]) == 'object') {
					dppnEntry = nameda[gsplit.replace(/o$/,'a')];
				}
			}
			var dEI = '';
			var dEO = '';
			if(dppnEntry.length > 0) {
				for(d in dppnEntry) {

					dEI += '&nbsp;<span class="pointer" style="color:'+DPR_prefs['coldppn']+'" title="DPPN entry" onclick="toggleDppnTitle(\''+dppnEntry[d]+'\',\'titleS'+x+'^'+d+'\');">n</span>';
					dEO += '<div class="hide round" id="titleS'+x+'^'+d+'"></div>'
				}
			}
			finouta.push('<span class="pointer" style="color:'+DPR_prefs['coltext']+'" onclick="getTitleXML('+ x +','+ (G_dictOpts.indexOf('mm') > -1) +','+(G_dictOpts.indexOf('ma') > -1)+','+(G_dictOpts.indexOf('mt') > -1)+',\''+outnik+'\')">' + uniout + ' (' + entries.length + ')</span>' + dEI + '<br>' + dEO);

		}
	}
	y = finouta.length;

	var findiv = Math.ceil(y/2);
	
	document.getElementById('dicthead').innerHTML = '<p>Title search for <b style="color:'+DPR_prefs['colped']+'">'+getstring+'</b>:';
	
	var listoutf = '<hr />';
	if(y == 0) {
		var outDiv = document.createElement('div');
		outDiv.innerHTML = listoutf + '<tr><td>No results</td></tr></table><hr />';
		document.getElementById('dict').innerHTML = '';
		document.getElementById('dict').appendChild(outDiv);
		document.getElementById('odif').scrollTop=0;
		return;
	}	
	var finol = '';
	var finor = '';
	
	for (z = 0; z < findiv; z++)
	{
		finol +=finouta[z]
		finor += (finouta[findiv+z]?finouta[findiv+z]:''); 
	}
	listoutf += '<table width="100%"><tr><td>'+finol+'</td><td>'+finor+'</td></tr></table>';
	
	var outDiv = document.createElement('div');
	outDiv.innerHTML = listoutf;
	document.getElementById('dict').innerHTML = '';
	document.getElementById('dict').appendChild(outDiv);
	document.getElementById('odif').scrollTop=0;
	yut = 0;
}
