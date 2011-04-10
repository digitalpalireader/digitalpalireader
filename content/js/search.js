var G_searchStartTime;

var G_uniRegExp = /[AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṃñḷĀĪŪṬḌṄṆṂÑḶ]/;

function checkGetstring(getstring) {

	var stringra = [];
	
	var yesplus = getstring.indexOf('+');
	if (yesplus >= 0)
	{
		stringra = getstring.split('+');
	}
	if (getstring.length < 3)
	{
		alertFlash("Minimum three letter search length",'RGBa(255,255,0,0.8)');
		document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
		document.getElementById('sbfa').innerHTML='';
		document.getElementById('sbfab').innerHTML='';
		return false;
	}
	if (stringra.length > 3)
	{
		alertFlash("Maximum three strings per search",'RGBa(255,255,0,0.8)');
		document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
		document.getElementById('sbfa').innerHTML='';
		return false;
	}
	for (var s = 0; s < stringra.length; s++)
	{
		if (stringra[s].length < 3 && stringra.length > 0)
		{
			alertFlash("Minimum three letter search length",'RGBa(255,255,0,0.8)');
			document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
			document.getElementById('sbfa').innerHTML='';
			document.getElementById('sbfab').innerHTML='';
			return false;
		}
	}
	return true;
}

function searchTipitaka() {
	
	if(!checkGetstring(document.form.isearch.value)) return;
	
	var which = document.getElementById('tipType').selectedIndex;
	
	if(which == 3 || which == 6 || which == 10 || which == 13) return;
	
	if(which == 15) { // Dev
		DevInput(document.form.isearch.value);
		return;
	}

	starttime = new Date;
	starttime = starttime.getTime();


	document.form.usearch.value = toUni(document.form.isearch.value); 
	moves(1);
	scrollToId('search',0);
	clearDivs('search');
	resetvalues();



	switch(which) {
		case 0:
		case 4:
		case 7:
		case 11:
			pausesall();
		break;
		case 1:
		case 5:
		case 8:
		case 12:
			pausetwo();
		break;
		case 2:
		case 9:
			pausethree();
		break;
		case 14: // ATI
			atiSearchStart();
		break;
	}

}

function tipitakaOptions() {
	
	document.getElementById('tsoMAT').style.display = 'none';
	document.getElementById('tsoCO1').style.display = 'none';
	document.getElementById('tsoCO2').style.display = 'none';
	document.getElementById('tsoCO3').style.display = 'none';
	document.getElementById('tsoBO').style.display = 'none';
	
	var which = document.getElementById('tipType').selectedIndex;
	switch(which) {
		case 4:
			document.getElementById('tsoCO1').style.display = 'block';
			document.getElementById('tsoCO2').style.display = 'block';
			document.getElementById('tsoCO3').style.display = 'block';
		break;
		case 5:
			document.getElementById('tsoBO').style.display = 'block';
		break;
		case 7:
			document.getElementById('tsoMAT').style.display = 'block';
		break;
		case 8:
			document.getElementById('tsoMAT').style.display = 'block';
		break;
		case 9:
			document.getElementById('tsoMAT').style.display = 'block';
		break;
		case 11:
			document.getElementById('tsoMAT').style.display = 'block';
			document.getElementById('tsoCO1').style.display = 'block';
			document.getElementById('tsoCO2').style.display = 'block';
			document.getElementById('tsoCO3').style.display = 'block';
		break;
		case 12:
			document.getElementById('tsoMAT').style.display = 'block';
			document.getElementById('tsoBO').style.display = 'block';
		break;
		case 14:
			document.getElementById('tsoCO2').style.display = 'block';
		break;
		default:
		break;
	}
}


var filearrayf = []; // [nik+book] = [m,a,t]
filearrayf["v1"] = [1,1,1];
filearrayf['v2'] = [1,1,1];
filearrayf['v3'] = [1,1,1];
filearrayf['v4'] = [1,1,1];
filearrayf['v5'] = [1,1,1];
filearrayf['v6'] = [1,1,1];
filearrayf['d1'] = [1,1,1];
filearrayf['d2'] = [1,1,1];
filearrayf['d3'] = [1,1,1];
filearrayf['m1'] = [1,1,1];
filearrayf['m2'] = [1,1,1];
filearrayf['m3'] = [1,1,1];
filearrayf['s1'] = [1,1,1];
filearrayf['s2'] = [1,1,1];
filearrayf['s3'] = [1,1,1];
filearrayf['s4'] = [1,1,1];
filearrayf['s5'] = [1,1,1];
filearrayf['a1'] = [1,1,1];
filearrayf['a2'] = [1,1,1];
filearrayf['a3'] = [1,1,1];
filearrayf['a4'] = [1,1,1];
filearrayf['a5'] = [1,1,1];
filearrayf['a6'] = [1,1,1];
filearrayf['a7'] = [1,1,1];
filearrayf['a8'] = [1,1,1];
filearrayf['a9'] = [1,1,1];
filearrayf['a10'] = [1,1,1];
filearrayf['a11'] = [1,1,1];
filearrayf['k1'] = [1,1,0];
filearrayf['k2'] = [1,1,0];
filearrayf['k3'] = [1,1,0];
filearrayf['k4'] = [1,1,0];
filearrayf['k5'] = [1,1,0];
filearrayf['k6'] = [1,1,0];
filearrayf['k7'] = [1,1,0];
filearrayf['k8'] = [1,1,0];
filearrayf['k9'] = [1,1,0];
filearrayf['k10'] = [1,1,0];
filearrayf['k11'] = [1,0,0];
filearrayf['k12'] = [1,1,0];
filearrayf['k13'] = [1,1,0];
filearrayf['k14'] = [1,1,0];
filearrayf['k15'] = [1,1,0];
filearrayf['k16'] = [1,0,0];
filearrayf['k17'] = [1,0,0];
filearrayf['k18'] = [1,0,0];
filearrayf['k19'] = [1,0,0];
filearrayf['k20'] = [1,0,0];
filearrayf['k21'] = [1,0,0];
filearrayf['y1'] = [1,1,1];
filearrayf['y2'] = [1,1,1];
filearrayf['y3'] = [1,1,1];
filearrayf['y4'] = [1,1,1];
filearrayf['y5'] = [1,1,1];
filearrayf['y6'] = [1,1,1];
filearrayf['y7'] = [1,0,0];
filearrayf['y8'] = [1,0,0];
filearrayf['y9'] = [1,1,1];
filearrayf['y10'] = [1,0,0];
filearrayf['y11'] = [1,0,0];
filearrayf['y12'] = [1,0,0];
filearrayf['y13'] = [1,0,0];
filearrayf['y14'] = [1,0,0];
filearrayf['x1'] = [1,1,0];
filearrayf['x2'] = [1,1,0];
filearrayf['b1'] = [1,0,0];
filearrayf['b2'] = [1,0,0];
filearrayf['g1'] = [1,0,0];
filearrayf['g2'] = [1,0,0];
filearrayf['g3'] = [1,0,0];
filearrayf['g4'] = [1,0,0];
filearrayf['g5'] = [1,0,0];

var filearray = [];

var nikletter = new Array();
nikletter[0] = 'v';
nikletter[1] = 'd';
nikletter[2] = 'm';
nikletter[3] = 's';
nikletter[4] = 'a';
nikletter[5] = 'k';
nikletter[6] = 'y';
nikletter[7] = 'x';
nikletter[8] = 'b';
nikletter[9] = 'g';

var bookfile = '';
var count = 0;
var bookload = '';
var nikayaat = '';
var bookat = '';
var first = 0;
var buffer = '';
var nextbookfile = '';
var rescount = -1;
var resultcount = new Array();
var thiscount = 0;

var stopsearch = 0;

var filelistat = 0;

var newnikaya = '';
var nikcount =0;
var qz = 0;

var nikperm = 0;
var bookperm = 1;

var exword = new Array();
var countmatch = 0;

function resetvalues() {
	filearray = [];
	exword.length=0;
	stopsearch = 0;	
	bookperm = 1;
	rescount = -1;
	qz = 0;
	nikayaat = '';
	newnikaya = '';
	nikcount = 0;
	thiscount = 0;
	bookfile = '';
	countmatch = 0;
}

function makeProgressTable() {

	var tableout = '<table width=100% height="8px" id="stftb" style="border-collapse:collapse"><tr>';
	var fal = filearray.length;
	for (q2 = 0; q2 < fal; q2++)
	{
		tableout += '<td bgcolor="'+colorcfg['colbkcp']+'" width=1 class="bordered"></td>';
	}
	tableout += '</tr></table>';
	document.getElementById('stfc').innerHTML = tableout;
}

function pausesall() 
{
	// make filearray
	var which = document.getElementById('tipType').selectedIndex;

	for(w in filearrayf) {
		if ((which == 0 || which == 7) && /[xbg]/.exec(w.charAt(0))) continue; // don't add extracanonical texts for tipitaka match 
		if ((which == 4 || which == 11) && !document.getElementById('tsoCO'+w.charAt(0)).checked) continue; // don't add unchecked collections

		if(which > 6) { // multiple hier
			for (x = 0; x < 3; x++) {
				if(document.getElementById('tsoMAT'+hLetters[x]).checked && filearrayf[w][x] == 1) { // this hier is checked and the file exists in this hier
					filearray.push(w+hLetters[x]);
				}
			}
		}
		else { // single hier
			if (hier == "m" && filearrayf[w][0] == 1 || hier == "a" && filearrayf[w][1] == 1 || hier == "t" && filearrayf[w][2] == 1) filearray.push(w+hier);
		}
	}

	if(filearray.length == 0) {
		alert('No books in selection');
		return;
	}

	var getstring = document.form.usearch.value;

	
	
	document.getElementById('sbfab').innerHTML = '';
	document.getElementById('sbfb').innerHTML = '<hr>';
	
	var toplist = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="this.blur(); stopsearch = 1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td width=1 style="color:'+colorcfg['colsel']+'">Search&nbsp;results&nbsp;for&nbsp;<b style="color:'+colorcfg['colsel']+'">' + getstring.replace(/ /g, '&nbsp;') + ':&nbsp;</b></td><td align=left> '
	
	var toplista = [];
	
	for (i = 0; i < nikletter.length; i++) {
		if ((which == 0 || which == 7) && /[xbg]/.exec(nikletter[i])) continue; // don't add extracanonical texts for tipitaka match 
		if ((which == 4 || which == 11) && !document.getElementById('tsoCO'+nikletter[i]).checked) continue; // don't add unchecked collections
		toplista.push('<span id="sdf'+nikletter[i]+'"><a href="javascript:void(0)" onclick="document.getElementById(\'sbfbc\').scrollTop = document.getElementById(\'sbfN'+nikletter[i]+'\').offsetTop;">'+nikname[nikletter[i]]+':</a> <span id="stfH'+nikletter[i]+'"></span></span>');
	}
	
	toplist += toplista.join(', ');
	
	toplist += '</td><td width=1><span class="abut obut" title="minimize search frame" onClick="moves(0); this.blur(); stopsearch = 1;">-</span></td></tr></table>';
	
	document.getElementById('stfb').innerHTML = toplist;

	makeProgressTable();

	
	importXMLs(1);
}
function pausetwo() { // init function for single collection

	// make filearray
	var which = document.getElementById('tipType').selectedIndex;
	var nikaya = document.form.nik.value;
	
	for(w in filearrayf) {
		if (w.charAt(0) != nikaya) continue; // only this collection
		if ((which == 5 || which == 12) && !document.getElementById('tsoBObook' + w.substring(1)).checked) continue; // skip unchecked books 

		if(which > 6) { // multiple hier
			for (x = 0; x < 3; x++) {
				if(document.getElementById('tsoMAT'+hLetters[x]).checked && filearrayf[w][x] == 1) { // this hier is checked and the file exists in this hier
					filearray.push(w+hLetters[x]);
				}
			}
		}
		else { // single hier
			if (hier == "m" && filearrayf[w][0] == 1 || hier == "a" && filearrayf[w][1] == 1 || hier == "t" && filearrayf[w][2] == 1) filearray.push(w+hier);
		}
	}

	if(filearray.length == 0) {
		alert('No books in selection');
		return;
	}

	makeProgressTable();

	var getstring = document.form.usearch.value;

	document.getElementById('sbfab').innerHTML = '';
	document.getElementById('sbfb').innerHTML = '<hr>';
	document.getElementById('stfb').innerHTML = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="this.blur(); stopsearch = 1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td width=1>Search&nbsp;results&nbsp;for&nbsp;<b style="color:'+colorcfg['colsel']+'">' + getstring.replace(/ /g, '&nbsp;') + ':&nbsp;</b></td><td align=left><span id="stfx"></span> matches in ' + nikname[nikaya] + '</td><td width=1><span class="abut obut" title="stop search" onClick="this.blur(); stopsearch = 1; moves(0)">-</span></td></tr></table>';

	importXMLs(2);
}

function pausethree() {
	
	var which = document.getElementById('tipType').selectedIndex;
	var nikbook = document.form.nik.value+document.form.book.value
	var getstring = document.form.usearch.value;

	if(which == 9) { // single book, multiple hier
		for (x = 0; x < 3; x++) {
			if(document.getElementById('tsoMAT'+hLetters[x]).checked && filearrayf[nikbook][x] == 1) { // this hier is checked and the current book in the current nikaya exists in this hier
				filearray.push(nikbook+hLetters[x]);
			}
		}
	}		
	else { // single book
		filearray = [nikbook+hier];
	}
	
	if(filearray.length == 0) {
		alert('No books in selection');
		return;
	}

	makeProgressTable();

	var nikaya = document.form.nik.value;
	var book = document.form.book.value;

	document.getElementById('stfb').innerHTML = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="this.blur(); stopsearch = 1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td align=left>Search&nbsp;results&nbsp;for&nbsp;<b style="color:'+colorcfg['colsel']+'">' + getstring.replace(/ /g, '&nbsp;') + '</b> in <b>' + nikname[nikaya] + ' ' + book + '</b>: <span id="stfx"></span></td><td width=1><span class="abut obut" title="stop search" onClick="this.blur(); stopsearch = 1; moves(0)">-</span></td></tr></table>';

	importXMLs(3);
}

function bounce(sct)
{
	document.getElementById('stftb').getElementsByTagName('td')[qz-1].setAttribute('bgcolor','#2F2');
	setTimeout('importXMLs('+sct+')', 10)
}


function finishSearch() {
	document.getElementById('stfstop').setAttribute('style','display:none');
	document.getElementById('sbfbc').scrollTop = 0;

	var endtime = new Date;
	var totaltime = Math.round((endtime.getTime() - starttime)*10/6)/1000;

	document.getElementById('stfc').innerHTML = '&nbsp;&nbsp;<span class="small"><b><i>'+(stopsearch == 1 ? 'stopped after' : 'finished in') + ' ' + totaltime + 's</b></i>';
}

function importXMLs(cnt)
{
	if (stopsearch==1) {
		finishSearch();
		return;
    }	
	
	var which = document.getElementById('tipType').selectedIndex;

	count = cnt;
	var bookno = 0;
	var endloop = 0;
	var yellowcount = 0;

	var getstring = document.form.usearch.value;
	var stringra = new Array();
	
	document.getElementById('plus').innerHTML = '-';
	document.getElementById('plus').title = 'minimize search frame';

	if (cnt == 1) // whole tipitaka or multiple collections
	{
		bookfile = filearray[qz];
		newnikaya = bookfile.charAt(0);
		if (nikayaat != newnikaya)
		{
			var headingNode = document.createElement('div');
			headingNode.setAttribute('id', 'sbfN' + newnikaya);
			headingNode.setAttribute('name', 'xyz');
			headingNode.setAttribute('class', 'huge');
			headingNode.innerHTML = nikname[newnikaya] + '<hr>';
			document.getElementById('sbfb').appendChild(headingNode);
			thiscount = 0;
			rescount++;
		}
		nikayaat = bookfile.charAt(0);
		bookat = bookfile.substring(1,bookfile.length-1);
		bookperm = bookat;
		nikperm = nikayaat;
		hiert = bookfile.charAt(bookfile.length-1);
		
		bookload = 'xml/' + bookfile + '.xml';

		//devO(bookload);

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		createTables(xmlDoc,hiert);
					
		document.getElementById('stfH'+nikayaat).innerHTML = thiscount;
		if (qz < filearray.length-1) 
		{
			nextbookfile = filearray[qz+1];
			if (nextbookfile.charAt(0) != nikayaat) document.getElementById('stfH'+nikayaat).style.color=colorcfg['colsel'];
			qz++;
			bounce(1);
		}
		else {
			qz = 0;
			bookperm = 0;
			document.getElementById('stfH'+nikayaat).style.color=colorcfg['colsel'];
			finishSearch();
		}			
	}	
	else if (cnt == 2) // nikaya
	{
		var nikaya = document.form.nik.value;

		
		bookfile = filearray[qz];
		bookat = bookfile.substring(1,bookfile.length-1);
		bookperm = bookat;
		hiert = bookfile.charAt(bookfile.length-1);

/*		var headingNode = document.createElement('div');
		headingNode.setAttribute('name', 'xyz');
		headingNode.setAttribute('id', 'xyz');
		headingNode.setAttribute('class', 'large');
		headingNode.innerHTML = nikname[nikaya] + (hier == 'm' ? '' : '-'+hier) + ' ' + getBookName(nikaya, hiert, parseInt(bookat)-1) + '<hr>';
		document.getElementById('sbfb').appendChild(headingNode);
*/		
		bookload = 'xml/' + bookfile + '.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		createTables(xmlDoc,hiert);
					
		document.getElementById('stfx').innerHTML = thiscount;
		
		if (qz < filearray.length-1) 
		{
			qz++;
			bounce(2);
		}
		else {
			qz = 0;
			bookperm = 0;
			thiscount = 0;
			finishSearch();
		}			
	}
	else if (cnt == 3) // this book
	{
		var nikaya = document.form.nik.value;
		var book = document.form.book.value;
		
		bookfile = filearray[qz];
		hiert = bookfile.charAt(bookfile.length-1);

		bookload = 'xml/' + bookfile + '.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		createTables(xmlDoc,hiert);
					
		document.getElementById('stfx').innerHTML = thiscount;
		
		if (qz < filearray.length-1) 
		{
			qz++;
			bounce(3);
		}
		else {
			qz = 0;
			thiscount = 0;
			finishSearch();
		}		
	}
	document.getElementById('searchb').scrollTop = 0; //vertical scroll
	buffer = '';
	first = 0;
	nikperm = 0;
	
}

function createTables(xmlDoc,hiert)
{
	//alert(bookload);
	var u = xmlDoc.getElementsByTagName("h0");
	
	var getstring = document.form.usearch.value;

	var gotstring;
	var nikaya = document.form.nik.value;
	var book = document.form.book.value;

	if (count == 1 || count == 2) {
		book = bookperm;
	}
	if (count == 1)
	{
		nikaya = nikperm;
	}
	var bookname = getBookName(nikaya,hiert,parseInt(book)-1);
	
	var postpara ='';
	var theData = '';
	
	var beforem = '';
	var afterm = '';
	var spaceb = 0;
	var spacea = 0;
	var aftermex = '';
	
	var tempexword = new Array();
	var exwordout = '';
	var kexword = new Array();
	
	var findiv = 0;
	var findivx = 0;
	var findiva = new Array();
	var ctab = 0;
	var flag1 = 0;
	var flag2 = 0;
	
	var texttomatch = '';
	var startmatch = 0;
	var endmatch = 0;

	var dups = [];
	var dupsx = '';
	var tagtitle = '';
	var texnodups = [];
	var exnodups = [];
	var l = 0;

	var exwordNode = document.createElement('div');
	exwordNode.setAttribute("id",'searchres');
	
	var outNode = document.createElement('div');
	var finalout = '';


	var match = 0;
	var nummatch = 0;
	var extranummatch = -1;
	
	var stringra = new Array();
	var perstring = '';
	var yesall = 0;
	
	var titlesonly = false;

	var yesplus = getstring.indexOf('+'); // look for multi matches
	if (yesplus >= 0) {
		stringra = getstring.split('+');
	}
	else {
		stringra[0] = getstring;
		if(document.form.tsoregexp.checked) getstring = new RegExp(getstring);
	}
	var sraout = stringra.join('#');
	sraout = sraout.replace(/"/g, '`');
	
	for (var sx = 0; sx < u.length; sx++) // per h0
	{
		var v = u[sx].getElementsByTagName("h1");
			
		for (var sy = 0; sy < v.length; sy++) // per h1
		{
			var w = v[sy].getElementsByTagName("h2");
		
			for (var sz = 0; sz < w.length; sz++) // per h2
			{

				
				var x = w[sz].getElementsByTagName("h3");
				
	
				for (var s = 0; s < x.length; s++) // per h3
				{

					
					var y = x[s].getElementsByTagName("h4");
					
					for (var se = 0; se < y.length; se++) // per h4
					{

						var z = y[se].getElementsByTagName("p");		

						for (var tmp = 0; tmp < z.length; tmp++) // per paragraph
						{


							texttomatch = z[tmp].textContent.substring(4);
							texttomatch = texttomatch.replace(/\{[^}]+\}/g, '');
							if (document.form.usearch.value.search(/[0-9]/g) == -1) texttomatch = texttomatch.replace(/\^a\^[^^]*\^ea\^/g, ''); // remove pesky page references unless we're searching for them.

							//texttomatch = texttomatch.replace(/\^b\^/g, '');
							//texttomatch = texttomatch.replace(/\^eb\^/g, '');

							texttomatch = texttomatch.replace(/  */g, ' ');
							texttomatch = texttomatch.replace(/''nti/g, 'n”ti');
							texttomatch = texttomatch.replace(/"nti/g, 'n”ti');
							texttomatch = texttomatch.replace(/'nti/g, 'n’ti');							
							texttomatch = texttomatch.replace(/"ti/g, '”ti');
							texttomatch = texttomatch.replace(/''ti/g, '”ti');
							texttomatch = texttomatch.replace(/'ti/g, '’ti');
							texttomatch = texttomatch.replace(/``/g, '“');
							texttomatch = texttomatch.replace(/`/g, '‘');
							texttomatch = texttomatch.replace(/''/g, '”');
							texttomatch = texttomatch.replace(/'/g, '’');
							texttomatch = texttomatch.replace(/\.\.\.pe0\.\.\./g, ' ... pe ...');
							texttomatch = texttomatch.replace(/\.\./g, '.');
							
							if (yesplus >= 0) // multiple search terms		
							{
								tagtitle = '';
								tempexword = [];
								for (d = 0; d < stringra.length; d++)
								{
									perstring = stringra[d];
									if(document.form.tsoregexp.checked) perstring = new RegExp(perstring);

									if(document.form.tsoregexp.checked) startmatch = texttomatch.search(perstring);
									else startmatch = texttomatch.indexOf(perstring)
									postpara = '';
									tempexword[d] = [];
									if (startmatch >= 0) 
									{
										yesall++;


										while (startmatch >= 0)
										{				
											if(document.form.tsoregexp.checked) gotstring = texttomatch.match(perstring)[0];
											else gotstring = perstring;


											endmatch = startmatch + gotstring.length;
											beforem = texttomatch.substring(0,startmatch);
											afterm = texttomatch.substring(endmatch);
											
											if(gotstring.indexOf('<c') == -1 && gotstring.indexOf('c>') == -1 ) { // make sure we're not doubling
												postpara += beforem + '<c'+d+'>' + gotstring + '<xc>';
												
												// get words
												spaceb = beforem.indexOf(' ');
												while (spaceb > -1) {
													beforem = beforem.substring(spaceb+1);
													spaceb = beforem.indexOf(' ');
												}
												spacea = afterm.indexOf(' ');
												aftermex = spacea == -1 ? afterm : afterm.substring(0,spacea);
												tempexword[d].push ((beforem+gotstring+aftermex).replace(/[‘’“”]/g,'').replace(/<[^>]*>/g,''));								
											}
											else postpara += beforem+gotstring;
											
											texttomatch = texttomatch.substring(endmatch);
											if(document.form.tsoregexp.checked) startmatch = texttomatch.search(perstring);
											else startmatch = texttomatch.indexOf(perstring)

										}
									
										postpara += afterm;
										texttomatch = postpara;
									}
									else break; // missed one term
								}
								if (yesall == stringra.length)
								{								
									for(var t=0; t<tempexword.length; t++) {

										l = tempexword[t].length;
										for(var i=0; i<l; i++) {
											tempexword[t][i] = tempexword[i].replace(/\^e*b\^/g,'');
											while (!G_uniRegExp.exec(tempexword[t][i].charAt(0))) {
											tempexword[t][i] = tempexword[t][i].substring(1);
											}
											while (!G_uniRegExp.exec(tempexword[t][i].charAt(tempexword[t][i].length-1))) {
												tempexword[t][i] = tempexword[t][i].slice(0,-1);
											}
										}
									}

									texnodups = [];
									for(var t=0; t<tempexword.length; t++) {
										texnodups[t] = [];
										l = tempexword[t].length;
										for(var i=0; i<l; i++) {
											for(var j=i+1; j<l; j++) {
												if (tempexword[t][i] === tempexword[t][j])
													j = ++i;
												}
											texnodups[t].push(tempexword[t][i]);
										}
										tagtitle += ('q' + texnodups[t].join('q').replace(/\"/g, 'x') + 'q');
									}
									for(var t=0; t<texnodups.length; t++) {
										if(!exword[t]) exword[t] = [];
										exword[t] = exword[t].concat(texnodups[t]);
									}
				
									finalout += '<div id='+countmatch + tagtitle+'><p><span><b style="color:' + colorcfg['colsel'] + '">' + nikname[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</b>';
									var colt = 0;
									var cola = ['colped', 'coldppn', 'colsel'];
									if(u.length>1) {
										 finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(v.length>1) {
										 finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(w.length>1) {
										 finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }

									if(x.length>1) {
										if(colt == 3) colt = 0;
										 finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(x[s].getElementsByTagName("h3n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(y.length>1) {
										if(colt == 3) colt = 0;
										finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(y[se].getElementsByTagName("h4n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									finalout += '</span>, para. ' + (tmp + 1) + ' <span class="abut obut" onclick="searchgo(\''+hiert+'\',\''+nikaya+'\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',' + tmp + ',\'' + sraout + '\')">go</span> <a href="javascript:void(0)" onclick="document.getElementById(\'sbfbc\').scrollTop = 0;" class="small green">top</a></span></p><p>' + preparepali(postpara,1)[0] + '</p><hr></div>';

									match = 1;
									thiscount++;									
									countmatch++;

								}
								yesall = 0;
							}
							else // single search term
							{
								tempexword = [];
								if(document.form.tsoregexp.checked) startmatch = texttomatch.search(getstring);
								else startmatch = texttomatch.indexOf(getstring)
								postpara = '';
								if (startmatch >= 0)
								{
									while (startmatch >= 0)
									{				
										match = 1;
                                        if(document.form.tsoregexp.checked) gotstring = texttomatch.match(getstring)[0];
                                        else gotstring = getstring;
										endmatch = startmatch + gotstring.length;
										beforem = texttomatch.substring(0,startmatch);
										if (document.form.usearch.value.search(/^[PVMT][0-9]+\.[0-9]+$/) == 0) {  // page search
                                            beforem = beforem.substring(0,beforem.length - 3);
                                            endmatch += 4;
                                        }
                                        afterm = texttomatch.substring(endmatch,texttomatch.length);
										postpara += beforem + (gotstring.charAt(0) == ' ' ? ' ' : '') + '<c0>' + gotstring.replace(/^ /g, '').replace(/ $/g, '').replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>' + (gotstring.charAt(gotstring.length-1) == ' ' ? ' ' : '');
										texttomatch = texttomatch.substring(endmatch);
										
										if(document.form.tsoregexp.checked) startmatch = texttomatch.search(getstring);
										else startmatch = texttomatch.indexOf(getstring)
										
										// get words
										spaceb = beforem.indexOf(' ');
										if (gotstring.charAt(0) != ' ') {
											while (spaceb > -1) {
												beforem = beforem.substring(spaceb+1);
												spaceb = beforem.indexOf(' ');
											}
										}
										else { beforem = ''; }
										if (gotstring.charAt(gotstring.length-1) != ' ') {
											spacea = afterm.indexOf(' ');
											aftermex = spacea == -1 ? afterm : afterm.substring(0,spacea);
										}
										else { 
											aftermex = ''; 
											postpara += ' ';
										}
	                                    //window.dump(beforem+gotstring+aftermex);
										tempexword.push((beforem+gotstring+aftermex).replace(/[‘’“”]/g,''));
									}

									postpara += afterm;

									// word add
									
									l = tempexword.length;
									
									for(var i=0; i<l; i++) {
										tempexword[i] = tempexword[i].replace(/\^e*b\^/g,'');
										while (!G_uniRegExp.exec(tempexword[i].charAt(0))) {
											tempexword[i] = tempexword[i].substring(1);
										}
										while (!G_uniRegExp.exec(tempexword[i].charAt(tempexword[i].length-1))) {
											tempexword[i] = tempexword[i].slice(0,-1);
										}
									}
									
									texnodups = [];
									for(var i=0; i<l; i++) {
										for(var j=i+1; j<l; j++) {
											if (tempexword[i] === tempexword[j]) { j = ++i; }
										}
										texnodups.push(tempexword[i]);
									}
									tagtitle = 'q' + texnodups.join('q') + 'q';
									tagtitle = tagtitle.replace(/\"/g, 'x');
									
									exword = exword.concat(texnodups);


									// titles
																
									finalout += '<div id='+countmatch + tagtitle+'><p><span><b style="color:' + colorcfg['colsel'] + '">' + nikname[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</b>';
									var colt = 0;
									var cola = ['colped', 'coldppn', 'colsel'];
									if(u.length>1) {
										 finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(v.length>1) {
										 finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(w.length>1) {
										 finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(x.length>1) {
										if(colt == 3) colt = 0;
										 finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(x[s].getElementsByTagName("h3n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(y.length>1) {
										if(colt == 3) colt = 0;
										finalout += ', <b style="color:' + colorcfg[cola[colt]] + '">' + toUni(y[se].getElementsByTagName("h4n")[0].textContent.replace(/ *$/, "")) + '</b>';
									 }
									
									// paragraph
									finalout += ', para. ' + (tmp + 1) + ' <span class="abut obut" onclick="searchgo(\''+hiert+'\',\''+nikaya+'\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',' + tmp + ',\'' + sraout + '\')">go</span> <a href="javascript:void(0)" class="small green" onclick="document.getElementById(\'sbfbc\').scrollTop = 0;">top</a></span></p><p>' + preparepali(postpara,1)[0] + '</p><hr></div>';
									
									// mumble mumble
									
									thiscount++;
									countmatch++;
									cmval = '';

								}
							}
						}
						nummatch = 0;
					}
				}
			}
		}
	}
	if (count == 3) {
		document.getElementById('sbfb').appendChild(document.createElement('hr'));
	}
	if (match == 0) {
		finalout = '<div name="xyz" id="xyz"><p><span style="color:' + colorcfg['colped'] + '">' + nikname[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</span> - <span style="color:' + colorcfg['colsel'] + '"><i>No Match</i> <a href="javascript:void(0)" onclick="document.getElementById(\'searchb\').scrollTop = 0;"></span><hr></div>';
		outNode.innerHTML = finalout;
		document.getElementById('sbfb').appendChild(outNode);
	}
	else {
		
		// make word table
		
		if(yesplus >= 0) { // multiple words 
		
			exnodups = [];
			dups = [];

			exwordout = '<table width=100%><tr>';

			for(var t=0; t<exword.length; t++) {
				l = exword[t].length;
				exnodups[t] = [];
				for(var i=0; i<l; i++) {
					for(var j=i+1; j<l; j++) {
						if (exword[t][i] === exword[t][j]) {
							dupsx = exword[t][i];
							if (dups[dupsx]) dups[dupsx]++;
							else dups[dupsx] = 1;
							j = ++i;
						}
					}
					exnodups[t].push(exword[t][i]);
					dupsx = exword[t][i];
					if (dups[dupsx]) dups[dupsx]++;
					else dups[dupsx] = 1;
				}
				exnodups[t] = sortaz(exnodups[t]);
				exwordout += '<td valign="top">';
				for (ex = 0; ex < exnodups[t].length; ex++)
				{
					
					exwordout += '<div><a href="javascript:void(0);" onclick="showonly(\'' + exnodups[t][ex].replace(/\"/g, 'x') + '\')">' + toUni(exnodups[t][ex]) + '</a> (' + dups[exnodups[t][ex]] + ')</div>';
				}
				exwordout += '</td>';
			}								
		}
		else { // single search term
				
			exnodups = [];
			dups = [];
			l = exword.length;
			for(var i=0; i<l; i++) {
				for(var j=i+1; j<l; j++) {
					if (exword[i] === exword[j]) {
						dupsx = exword[i];
						if (dups[dupsx]) dups[dupsx]++;
						else dups[dupsx] = 1;
						j = ++i;
					}
				}
				exnodups.push(exword[i]);
				dupsx = exword[i];
				if (dups[dupsx]) dups[dupsx]++;
				else dups[dupsx] = 1;
			}
			exnodups = sortaz(exnodups);

			findiv = Math.ceil((exnodups.length)/2);
			
			exwordout = '<table width=100%>';

			for (ex = 0; ex < findiv; ex++)
			{
				exwordout += '<tr><td><a href="javascript:void(0)" onclick="showonly(\'' + exnodups[ex].replace(/\"/g, 'x') + '\')">' + toUni(exnodups[ex]) + '</a> (' + dups[exnodups[ex]] + ')</td><td>'+(exnodups[findiv+ex]?'<a href="javascript:void(0)" onclick="showonly(\'' + exnodups[findiv+ex].replace(/\"/g, 'x') + '\')">' + toUni(exnodups[findiv+ex]) + '</a> (' + dups[exnodups[findiv+ex]] + ')':'')+'</td></tr>';
			}
			exwordout += '</table>';
		}
		
		exwordNode.innerHTML = exwordout;
		document.getElementById('sbfab').innerHTML = '';
		document.getElementById('sbfab').appendChild(exwordNode);									
		outNode.innerHTML = finalout;
		document.getElementById('sbfb').appendChild(outNode);
	}
	match = 0;
}

function showonly(string) {

	var da = document.getElementById('sbfb').getElementsByTagName('div');
	if (string == 'xyz') {
		for (x = 0; x < da.length; x++) {
			da[x].style.display = "block";
		}
	}
	else {	
		for (x = 0; x < da.length; x++) {
			if ((da[x].id.indexOf('q' + string + 'q') > -1 || !da[x].id) && da[x].id!='xyz') da[x].style.display = "block";
			else da[x].style.display = "none";
		}
	}
	if (string == 'xyz') { document.getElementById('showing').innerHTML = '';
		scrollToId('search',0);
	}
	else { 
		document.getElementById('showing').innerHTML = '<b style="background-color:'+colorcfg['colbkcp']+'; color:'+colorcfg['colped']+'">' + toUni(string.replace(/xn/g,'"n')) + '&nbsp;<a href="javascript:void(0)" onclick="showonly(\'xyz\');">x</a></b>'; 
		scrollToId('search','sbfb');
	}
}

function atiSearchStart() {

	document.getElementById('sbfb').appendChild(pleasewait);
	
	var getstring = document.form.usearch.value;

	var atiurl = (cfg['catioff'] == 'checked' ? 'file://' + getHomePath().replace(/\\/g, '/') +'/'+cfg['catiloc']+'/html/' : 'http://www.accesstoinsight.org/');

	if(cfg['catioff'] == 'checked') {
		document.getElementById('stfb').innerHTML = '<table><tr id="atiNiks"><td><a href="http://www.accesstoinsight.org" title="Access To Insight Website"><img src="'+atiurl+'favicon.ico"> ATI</a> full-text search for <b style="color:'+colorcfg['colped']+'">'+getstring+'</b> (off-line): </td></tr></table>';
		document.getElementById('stfc').innerHTML = '';
		document.getElementById('sbfab').innerHTML = '<div id="dictList"><p class="huge">Matched Suttas:</p></div><hr class="thick">';
		document.getElementById('sbfb').innerHTML = '<p class="huge">Detailed Results:</p>';
		atiSearchOffline(0,getstring);
		return;
	}

	var bannerDiv = document.createElement('div');
	bannerDiv.innerHTML = '<img style="vertical-align:middle" src="'+atiurl+'favicon.ico" title="Search courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;<a href="http://www.accesstoinsight.org/" target="_blank" style="color:blue">AccessToInsight.org</a> search for <b>'+getstring+'</b>:<br><br>';
	
	document.getElementById('stfb').appendChild(bannerDiv);
	
	getstring = getstring.replace(/^  */g, '').replace(/  *$/g, '').replace(/  */g, '%2B');
	
	var outNode = document.createElement('iframe');
	outNode.setAttribute('frameBorder','0');
	outNode.setAttribute('width','100%');
	outNode.setAttribute('height',document.getElementById('sbfbc').offsetHeight);
	outNode.setAttribute('src','http://www.google.com/cse?cx=015061908441090246348%3Aal1bklhbjbi&cof=FORID%3A9%3BNB%3A1&ie=UTF-8&q='+getstring+'+more:suttas_only&sa=Search&ad=w9&num=10');
	document.getElementById('sbfb').appendChild(outNode);
}


function atiSearchOffline(d, getstring) {

	var nikA = ['d','m','s','a','k'];

	while (!document.getElementById('tsoCO'+nikA[d]).checked) {	
		d++;
		if(d == nikA.length) { // end
			scrollToId('search',0);
			var endtime = new Date;
			var totaltime = Math.round((endtime.getTime() - starttime)*10/6)/1000;
			var outtime = '<span class="small"><b><i>finished in ' + totaltime + 's</b></i></span>';
			document.getElementById('stfc').innerHTML = outtime;
			return;
		}
	}
	
	var nik = nikA[d];
	var finalout = '';
	
	var listout = '';
	
	var counta = [];

	
	var finalout = '';
	var listout = '';
	var count = 0;
	var buffer = 30; // number of letters to add before and after the match
	
	eval('var anik = ati'+nik.toUpperCase()+';');
	for (var c = 0; c < anik.length; c++) {
		var cont = readExtFile(cfg['catiloc']+'/html/tipitaka/'+anik[c]).join('\n');
		var parser=new DOMParser();
		var xmlDoc = parser.parseFromString(cont,'text/xml');
		var title = toUni(xmlDoc.getElementsByTagName('title')[0].textContent);
		var data = xmlDoc.getElementsByTagName('div');
		for (j in data) {
			if(data[j].id == 'H_content') {
			var texttomatch = data[j].textContent;
				if(document.form.tsoregexp.checked) startmatch = texttomatch.search(getstring);
				else startmatch = texttomatch.indexOf(getstring)
				postpara = '';
				if (startmatch >= 0)
				{
					listout += '<a href="javascript:void(0)" onclick="scrollToId(\'search\',\'atio'+nik+c+'\')" style="color:'+colorcfg['colsel']+'">' + title + '</a><br/>'; 
					while (startmatch >= 0)
					{				
						count++;
						if(document.form.tsoregexp.checked) gotstring = texttomatch.match(getstring)[0];
						else gotstring = getstring;
						var endmatch = startmatch + gotstring.length;

						var buffers = buffer;
						var buffere = buffer;
						
						while(startmatch-buffers > 0) { // get first space before buffer
							if(texttomatch.charAt(startmatch-buffers-1) == ' ') break;
							buffers--;
						}
						while(endmatch+buffere < texttomatch.length) { // get first space before buffer
							if(texttomatch.charAt(endmatch+buffere) == ' ') break;
							buffere++;
						}
						beforem = '... '+texttomatch.substring(startmatch-buffers,startmatch);
						afterm = texttomatch.substring(endmatch,endmatch+buffere) + ' ...';
						postpara += beforem + '<c0>' + gotstring.replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>' + afterm + '<br/>';
						texttomatch = texttomatch.substring(endmatch);
						startmatch = texttomatch.search(getstring);
					}

					postpara = postpara.replace(/<c0>/g, '<span style="color:'+colorcfg['colped']+'">').replace(/<xc>/g, '</span>');
					finalout += '<div id=atio'+nik+c+'><p><br><b><a class="green" href="file://' + getHomePath().replace(/\\/g, '/') +'/'+cfg['catiloc']+'/html/tipitaka/'+anik[c]+'" target="_blank">'+title+'</a></b> <a href="javascript:void(0)" onclick="scrollToId(\'search\',0);" class="small" style="color:'+colorcfg['coldppn']+'">top</a></p><p>' + postpara + '</p></div>';
				}
			}
		}
	}
	
	var titleNode = document.createElement('div');
	titleNode.setAttribute('id','atiT'+nik);
	titleNode.innerHTML = '<hr><span class="huge">'+nik+'</span>';
	document.getElementById('sbfb').appendChild(titleNode);

	var titleNode2 = document.createElement('div');
	titleNode2.setAttribute('id','atiL'+nik);
	titleNode2.innerHTML = '<hr><b>'+nik+'</b>';
	document.getElementById('dictList').appendChild(titleNode2);

	
	// word list
	var listNode = document.createElement('div');
	listNode.innerHTML = (count > 0 ? listout : '<i>no match</i>');
	document.getElementById('dictList').appendChild(listNode);
	
	var cellNode = document.createElement('td');
	cellNode.innerHTML = '<a class="green" href="javascript:void(0)"'+(count > 0 ? ' onclick="scrollToId(\'dif\',\'atiL'+nik+'\')"' : '')+'>'+nikname[nik] + '</a>: ' + count + '; ';
	
	document.getElementById('atiNiks').appendChild(cellNode);
	
	
	var outNode = document.createElement('div');
	outNode.innerHTML = (count > 0 ? finalout : '<i>no match</i>');
	document.getElementById('atiT'+nik).appendChild(outNode);

	if(++d == nikA.length) {
		scrollToId('search',0);
		var endtime = new Date;
		var totaltime = Math.round((endtime.getTime() - starttime)*10/6)/1000;
		var outtime = '<span class="small"><b><i>&nbsp;&nbsp;finished in ' + totaltime + 's</b></i></span>';
		document.getElementById('stfc').innerHTML = outtime;
		return;
	}

	setTimeout(function () { atiSearchOffline(d,getstring) }, 10);
}


var TRange=null

function findString (strx,nummatch) {
 var str = toUni(strx)
 if (parseInt(navigator.appVersion)<4) return;
 var strFound;
 if (navigator.appName.indexOf("Microsoft")!=-1) {

  // EXPLORER-SPECIFIC CODE

  if (TRange!=null) {
   TRange.collapse(false)
   strFound=TRange.findText(str)
   if (strFound) TRange.select()
  }
  if (TRange==null || strFound==0) {
   TRange=self.document.body.createTextRange()
   strFound=TRange.findText(str)
   if (strFound) TRange.select()
  }
 }
 else {

  // NAVIGATOR-SPECIFIC CODE

	for (var xz = 0; xz < nummatch; xz ++)
	{
		strFound=find(str);
	}
	
  if (!strFound) {
   strFound=find(str,0,1)
   while (find(str,0,1)) continue
  }
 }
 //if (!strFound) alert ("String '"+str+"' not found!")
}


function searchgo(hiert,nikaya,book,sx,sy,sz,s,se,tmp,stringra)
{

	moves(0);
	var ssect = se;
	document.getElementById('mafbc').innerHTML = '';
	document.getElementById('mafbc').appendChild(pleasewait);
	getplace([niknumber[nikaya],book,sx,sy,sz,s,se,hiert]);
	if (stringra) {
		stringra = stringra.replace(/`/g, '"');
		stringra = stringra.split('#');
		if(document.form.tsoregexp.checked) {
			for (i in stringra) { stringra[i] = new RegExp(stringra[i]); }
		}
		importXML(stringra,tmp);

	}
	else importXML();
				
	getstring = '';
	postpara ='';
	theData = '';
	
	beforem = '';
	afterm = '';
	
	
	texttomatch = '';
	startmatch = 0;
	endmatch = 0;
}
