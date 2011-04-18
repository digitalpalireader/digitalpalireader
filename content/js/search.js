var G_searchStartTime;

var G_uniRegExp = /[AIUEOKGCJTDNPBMYRLVSHaiueokgcjtdnpbmyrlvshāīūṭḍṅṇṃñḷĀĪŪṬḌṄṆṂÑḶ]/;

var G_searchType;
var G_searchString;
var G_searchMAT;
var G_searchSet;
var G_searchBook;
var G_searchRX;

function searchTipitaka(searchType,searchString,searchMAT,searchSet,searchBook,searchRX) {
	
	clearDivs('search');

	if(searchType) { // update url
		G_searchType = searchType;
		G_searchString = searchString;
		G_searchMAT = searchMAT;
		G_searchSet = searchSet;
		G_searchBook = ','+searchBook+',';
		G_searchRX = searchRX;	

		var permalink = 'chrome://digitalpalireader/content/search.htm' + '?type='+searchType+'&query=' + searchString + '&MAT=' + searchMAT + '&set=' + searchSet + '&book=' + searchBook + '&rx=' + searchRX;
		try {
			window.history.replaceState('Object', 'Title', permalink);
		}
		catch(ex) {
		}
	}
	else {
		// get options from URL
		
		var options = document.location.href.split('?')[1].split('#')[0].split('&');

		// parse options

		for (i in options) {

			var option = options[i].split('=');
			switch(option[0]) {
				case 'type':
					G_searchType = parseInt(option[1]);
				break;
				case 'query':
					G_searchString = toUni(option[1]);
				break;
				case 'MAT':
					G_searchMAT = option[1];
				break;
				case 'set':
					G_searchSet = option[1];
				break;
				case 'book':
					G_searchBook = ','+option[1]+','; // add commas so each will be findable with comma at end and beginning
				break;
				case 'rx':
					G_searchRX = (option[1] == 'false' ? false : true);
				break;
			}
		}
	}

	var st = [];
	var matst = [];
	for (i in G_searchMAT) matst.push(G_searchMAT[i]);
	
	st[0] = 'The Tipitaka';
	st[1] = G_nikLongName[G_searchSet];
	st[2] = G_nikLongName[G_searchSet] + ' ' + G_searchBook.slice(1,-1);
	st[3] = '---';
	st[4] = 'Multiple Sets (' + G_hTitles[G_searchMAT] + ')';
	st[5] = 'Multiple Books (' + G_hTitles[G_searchMAT] + ')';
	st[6] = '---';
	st[7] = 'The Tipitaka (' + matst.join(',') + ')';
	st[8] = G_nikLongName[G_searchSet] + ' (' + matst.join(',') + ')';
	st[9] = G_nikLongName[G_searchSet] + ' ' + G_searchBook.slice(1,-1) + ' (' + matst.join(',') + ')';
	st[10] = '---';
	st[11] = 'Multiple Sets (' + matst.join(',') + ')';
	st[12] = 'Multiple Books (' + matst.join(',') + ')';
	st[13] = '---';
	st[14] = 'ATI Translations';


	// tab title

	var tabT = 'Search: \'' + G_searchString + '\' in ' + st[G_searchType];
	
	document.getElementsByTagName('title')[0].innerHTML = tabT;
	
	
	// start timer

	starttime = new Date;
	starttime = starttime.getTime();

	switch(G_searchType) {
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

var G_searchFileArray = [];

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
	G_searchFileArray = [];
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
	var fal = G_searchFileArray.length;
	for (q2 = 0; q2 < fal; q2++)
	{
		tableout += '<td bgcolor="'+G_prefs['colbkcp']+'" width=1 class="bordered"></td>';
	}
	tableout += '</tr></table>';
	document.getElementById('stfc').innerHTML = tableout;
}

function pausesall() 
{
	// make G_searchFileArray
	var which = G_searchType;

	for(w in G_XMLFileArray) {
		if ((which == 0 || which == 7) && /[xbg]/.exec(w.charAt(0))) continue; // don't add extracanonical texts for tipitaka match 
		if ((which == 4 || which == 11) && G_searchSet.indexOf(w.charAt(0)) == -1) continue; // don't add unchecked collections

		if(which > 6) { // multiple hier
			for (x = 0; x < 3; x++) {
				if(G_searchMAT.indexOf(G_hLetters[x]) > -1 && G_XMLFileArray[w][x] == 1) { // this hier is checked and the file exists in this hier
					G_searchFileArray.push(w+G_hLetters[x]);
				}
			}
		}
		else { // single hier
			if (G_searchMAT == "m" && G_XMLFileArray[w][0] == 1 || G_searchMAT == "a" && G_XMLFileArray[w][1] == 1 || G_searchMAT == "t" && G_XMLFileArray[w][2] == 1) G_searchFileArray.push(w+G_searchMAT);
		}
	}

	if(G_searchFileArray.length == 0) {
		alertFlash('No books in selection');
		return;
	}

	var getstring = G_searchString;

	
	
	document.getElementById('sbfab').innerHTML = '';
	document.getElementById('sbfb').innerHTML = '<hr>';
	
	var toplist = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="this.blur(); stopsearch = 1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td width=1 style="color:'+G_prefs['colsel']+'">Search&nbsp;results&nbsp;for&nbsp;<b style="color:'+G_prefs['colsel']+'">' + getstring.replace(/ /g, '&nbsp;') + ':&nbsp;</b></td><td align=left> '
	
	var toplista = [];
	for (i = 0; i < G_numberToNik.length; i++) {
		if ((which == 0 || which == 7) && /[xbg]/.exec(G_numberToNik[i])) continue; // don't add extracanonical texts for tipitaka match 
		if ((which == 4 || which == 11) && G_searchSet.indexOf(G_numberToNik[i]) == -1) continue; // don't add unchecked collections
		toplista.push('<span id="sdf'+G_numberToNik[i]+'"><a href="javascript:void(0)" onclick="document.getElementById(\'sbfbc\').scrollTop = document.getElementById(\'sbfN'+G_numberToNik[i]+'\').offsetTop;">'+G_nikLongName[G_numberToNik[i]]+':</a> <span id="stfH'+G_numberToNik[i]+'"></span></span>');
	}
	
	toplist += toplista.join(', ');
	
	toplist += '</td><td width=1><span class="abut obut" title="minimize search frame" onClick="moves(0); this.blur(); stopsearch = 1;">‒</span></td></tr></table>';
	
	document.getElementById('stfb').innerHTML = toplist;
	makeProgressTable();

	
	importXMLs(1);
}
function pausetwo() { // init function for single collection

	// make G_searchFileArray
	var which = G_searchType;
	var nikaya = G_searchSet;
	
	for(w in G_XMLFileArray) {
		if (w.charAt(0) != nikaya) continue; // only this collection
		if ((which == 5 || which == 12) && G_searchBook.indexOf(','+w.substring(1)+',') == -1) continue; // skip unchecked books 

		if(which > 6) { // multiple hier
			for (x = 0; x < 3; x++) {
				if(G_searchMAT.indexOf(G_hLetters[x]) > -1 && G_XMLFileArray[w][x] == 1) { // this hier is checked and the file exists in this hier
					G_searchFileArray.push(w+G_hLetters[x]);
				}
			}
		}
		else { // single hier
			if (G_searchMAT == "m" && G_XMLFileArray[w][0] == 1 || G_searchMAT == "a" && G_XMLFileArray[w][1] == 1 || G_searchMAT == "t" && G_XMLFileArray[w][2] == 1) G_searchFileArray.push(w+G_searchMAT);
		}
	}

	if(G_searchFileArray.length == 0) {
		alert('No books in selection');
		return;
	}

	makeProgressTable();

	var getstring = G_searchString;

	document.getElementById('sbfab').innerHTML = '';
	document.getElementById('sbfb').innerHTML = '<hr>';
	document.getElementById('stfb').innerHTML = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="this.blur(); stopsearch = 1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td width=1>Search&nbsp;results&nbsp;for&nbsp;<b style="color:'+G_prefs['colsel']+'">' + getstring.replace(/ /g, '&nbsp;') + ':&nbsp;</b></td><td align=left><span id="stfx"></span> matches in ' + G_nikLongName[nikaya] + '</td><td width=1><span class="abut obut" title="stop search" onClick="this.blur(); stopsearch = 1; moves(0)">↙</span></td></tr></table>';

	importXMLs(2);
}

function pausethree() {
	
	var which = G_searchType;
	var nikaya = G_searchSet;
	var book = G_searchBook.slice(1,-1);

	var nikbook = nikaya+book;
	var getstring = G_searchString;

	if(which == 9) { // single book, multiple hier
		for (x = 0; x < 3; x++) {
			if(G_searchMAT.indexOf(G_hLetters[x]) > -1 && G_XMLFileArray[w][x] == 1) { // this hier is checked and the file exists in this hier
				G_searchFileArray.push(nikbook+G_hLetters[x]);
			}
		}
	}		
	else { // single book
		G_searchFileArray = [nikbook+G_searchMAT];
	}
	
	if(G_searchFileArray.length == 0) {
		alert('No books in selection');
		return;
	}

	makeProgressTable();


	document.getElementById('stfb').innerHTML = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="this.blur(); stopsearch = 1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td align=left>Search&nbsp;results&nbsp;for&nbsp;<b style="color:'+G_prefs['colsel']+'">' + getstring.replace(/ /g, '&nbsp;') + '</b> in <b>' + G_nikLongName[nikaya] + ' ' + book + '</b>: <span id="stfx"></span></td><td width=1><span class="abut obut" title="stop search" onClick="this.blur(); stopsearch = 1; moves(0)">↙</span></td></tr></table>';

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
	
	var which = G_searchType;

	count = cnt;
	var bookno = 0;
	var endloop = 0;
	var yellowcount = 0;

	var getstring = G_searchString;
	var stringra = new Array();
	
	if (cnt == 1) // whole tipitaka or multiple collections
	{
		bookfile = G_searchFileArray[qz];
		newnikaya = bookfile.charAt(0);
		if (nikayaat != newnikaya)
		{
			var headingNode = document.createElement('div');
			headingNode.setAttribute('id', 'sbfN' + newnikaya);
			headingNode.setAttribute('name', 'xyz');
			headingNode.setAttribute('class', 'huge');
			headingNode.innerHTML = G_nikLongName[newnikaya] + '<hr>';
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
		if (qz < G_searchFileArray.length-1) 
		{
			nextbookfile = G_searchFileArray[qz+1];
			if (nextbookfile.charAt(0) != nikayaat) document.getElementById('stfH'+nikayaat).style.color=G_prefs['colsel'];
			qz++;
			bounce(1);
		}
		else {
			qz = 0;
			bookperm = 0;
			document.getElementById('stfH'+nikayaat).style.color=G_prefs['colsel'];
			finishSearch();
		}			
	}	
	else if (cnt == 2) // nikaya
	{
		var nikaya = G_searchSet;

		
		bookfile = G_searchFileArray[qz];
		bookat = bookfile.substring(1,bookfile.length-1);
		bookperm = bookat;
		hiert = bookfile.charAt(bookfile.length-1);

/*		var headingNode = document.createElement('div');
		headingNode.setAttribute('name', 'xyz');
		headingNode.setAttribute('id', 'xyz');
		headingNode.setAttribute('class', 'large');
		headingNode.innerHTML = G_nikLongName[nikaya] + (hier == 'm' ? '' : '-'+hier) + ' ' + getBookName(nikaya, hiert, parseInt(bookat)-1) + '<hr>';
		document.getElementById('sbfb').appendChild(headingNode);
*/		
		bookload = 'xml/' + bookfile + '.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		createTables(xmlDoc,hiert);
					
		document.getElementById('stfx').innerHTML = thiscount;
		
		if (qz < G_searchFileArray.length-1) 
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
		var nikaya = G_searchSet;
		var book = G_searchBook.slice(1,-1);
		
		bookfile = G_searchFileArray[qz];
		hiert = bookfile.charAt(bookfile.length-1);

		bookload = 'xml/' + bookfile + '.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", bookload, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		createTables(xmlDoc,hiert);
					
		document.getElementById('stfx').innerHTML = thiscount;
		
		if (qz < G_searchFileArray.length-1) 
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
	
	var getstring = G_searchString;

	var gotstring;
	var nikaya = G_searchSet;
	var book = G_searchBook.slice(1,-1);

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
		if(G_searchRX == 'true') getstring = new RegExp(getstring);
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
							if (!/[0-9]/.exec(G_searchString)) texttomatch = texttomatch.replace(/\^a\^[^^]*\^ea\^/g, ''); // remove pesky page references unless we're searching for them.

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
									if(G_searchRX == 'true') perstring = new RegExp(perstring);

									if(G_searchRX == 'true') startmatch = texttomatch.search(perstring);
									else startmatch = texttomatch.indexOf(perstring)
									postpara = '';
									tempexword[d] = [];
									if (startmatch >= 0) 
									{
										yesall++;


										while (startmatch >= 0)
										{				
											if(G_searchRX == 'true') gotstring = texttomatch.match(perstring)[0];
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
											if(G_searchRX == 'true') startmatch = texttomatch.search(perstring);
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
				
									finalout += '<div id='+countmatch + tagtitle+'><p><span><b style="color:' + G_prefs['colsel'] + '">' + G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</b>';
									var colt = 0;
									var cola = ['colped', 'coldppn', 'colsel'];
									if(u.length>1) {
										 finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(v.length>1) {
										 finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(w.length>1) {
										 finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }

									if(x.length>1) {
										if(colt == 3) colt = 0;
										 finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(x[s].getElementsByTagName("h3n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(y.length>1) {
										if(colt == 3) colt = 0;
										finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(y[se].getElementsByTagName("h4n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									finalout += '</span>, para. ' + (tmp + 1) + ' <span class="abut obut" onclick="openPlace([\''+nikaya+'\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',\''+hiert+'\'],' + tmp + ',\'' + sraout + '\')">go</span> <a href="javascript:void(0)" onclick="document.getElementById(\'sbfbc\').scrollTop = 0;" class="small green">top</a></span></p><p>' + preparepali(postpara,1)[0] + '</p><hr></div>';

									match = 1;
									thiscount++;									
									countmatch++;

								}
								yesall = 0;
							}
							else // single search term
							{
								tempexword = [];
								if(G_searchRX == 'true') startmatch = texttomatch.search(getstring);
								else startmatch = texttomatch.indexOf(getstring)
								postpara = '';
								if (startmatch >= 0)
								{
									while (startmatch >= 0)
									{				
										match = 1;
                                        if(G_searchRX == 'true') gotstring = texttomatch.match(getstring)[0];
                                        else gotstring = getstring;
										endmatch = startmatch + gotstring.length;
										beforem = texttomatch.substring(0,startmatch);
										if (/[0-9]/.exec(G_searchString)) {  // page search
                                            beforem = beforem.substring(0,beforem.length - 3);
                                            endmatch += 4;
                                        }
                                        afterm = texttomatch.substring(endmatch,texttomatch.length);
										postpara += beforem + (gotstring.charAt(0) == ' ' ? ' ' : '') + '<c0>' + gotstring.replace(/^ /g, '').replace(/ $/g, '').replace(/(.) (.)/g, "$1<xc> <c0>$2") + '<xc>' + (gotstring.charAt(gotstring.length-1) == ' ' ? ' ' : '');
										texttomatch = texttomatch.substring(endmatch);
										
										if(G_searchRX == 'true') startmatch = texttomatch.search(getstring);
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
																
									finalout += '<div id='+countmatch + tagtitle+'><p><span><b style="color:' + G_prefs['colsel'] + '">' + G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</b>';
									var colt = 0;
									var cola = ['colped', 'coldppn', 'colsel'];
									if(u.length>1) {
										 finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(v.length>1) {
										 finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(w.length>1) {
										 finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(x.length>1) {
										if(colt == 3) colt = 0;
										 finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(x[s].getElementsByTagName("h3n")[0].textContent.replace(/ *$/, "")) + '</b>';
										 colt++;
									 }
									if(y.length>1) {
										if(colt == 3) colt = 0;
										finalout += ', <b style="color:' + G_prefs[cola[colt]] + '">' + toUni(y[se].getElementsByTagName("h4n")[0].textContent.replace(/ *$/, "")) + '</b>';
									 }
									
									// paragraph
									finalout += ', para. ' + (tmp + 1) + ' <span class="abut obut" onclick="openPlace([\''+nikaya+'\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',\''+hiert+'\'],' + tmp + ',\'' + sraout + '\')">go</span> <a href="javascript:void(0)" class="small green" onclick="document.getElementById(\'sbfbc\').scrollTop = 0;">top</a></span></p><p>' + preparepali(postpara,1)[0] + '</p><hr></div>';
									
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
		finalout = '<div name="xyz" id="xyz"><p><span style="color:' + G_prefs['colped'] + '">' + G_nikLongName[nikaya] + (hiert == 'm' ? '' : '-'+hiert) + ' ' + bookname + '</span> - <span style="color:' + G_prefs['colsel'] + '"><i>No Match</i> <a href="javascript:void(0)" onclick="document.getElementById(\'searchb\').scrollTop = 0;"></span><hr></div>';
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
		document.getElementById('showing').innerHTML = '<b style="background-color:'+G_prefs['colbkcp']+'; color:'+G_prefs['colped']+'">' + toUni(string.replace(/xn/g,'"n')) + '&nbsp;<a href="javascript:void(0)" onclick="showonly(\'xyz\');">x</a></b>'; 
		scrollToId('search','sbfb');
	}
}

function atiSearchStart() {

	document.getElementById('sbfb').appendChild(pleasewait);

	var getstring = G_searchString;

	var atiurl = (G_prefs['catioff'] ? 'file://' + G_prefs['catioff']+'html/' : 'http://www.accesstoinsight.org/');

	if(G_prefs['catioff']) {
		document.getElementById('stfb').innerHTML = '<table><tr id="atiNiks"><td><a href="http://www.accesstoinsight.org" title="Access To Insight Website"><img src="'+atiurl+'favicon.ico"> ATI</a> full-text search for <b style="color:'+G_prefs['colped']+'">'+getstring+'</b> (off-line): </td></tr></table>';
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

	while (G_searchSet.indexOf(nikA[d]) == -1) {	
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
		var cont = readExtFile(G_prefs['catiloc']+'html/tipitaka/'+anik[c]).join('\n');
		var parser=new DOMParser();
		var xmlDoc = parser.parseFromString(cont,'text/xml');
		var title = toUni(xmlDoc.getElementsByTagName('title')[0].textContent);
		var data = xmlDoc.getElementsByTagName('div');
		for (j in data) {
			if(data[j].id == 'H_content') {
			var texttomatch = data[j].textContent;
				if(G_searchRX == 'true') startmatch = texttomatch.search(getstring);
				else startmatch = texttomatch.indexOf(getstring)
				postpara = '';
				if (startmatch >= 0)
				{
					listout += '<a href="javascript:void(0)" onclick="scrollToId(\'search\',\'atio'+nik+c+'\')" style="color:'+G_prefs['colsel']+'">' + title + '</a><br/>'; 
					while (startmatch >= 0)
					{				
						count++;
						if(G_searchRX == 'true') gotstring = texttomatch.match(getstring)[0];
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

					postpara = postpara.replace(/<c0>/g, '<span style="color:'+G_prefs['colped']+'">').replace(/<xc>/g, '</span>');
					finalout += '<div id=atio'+nik+c+'><p><br><b><a class="green" href="file://'+G_prefs['catiloc']+'html/tipitaka/'+anik[c]+'" target="_blank">'+title+'</a></b> <a href="javascript:void(0)" onclick="scrollToId(\'search\',0);" class="small" style="color:'+G_prefs['coldppn']+'">top</a></p><p>' + postpara + '</p></div>';
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
	cellNode.innerHTML = '<a class="green" href="javascript:void(0)"'+(count > 0 ? ' onclick="scrollToId(\'dif\',\'atiL'+nik+'\')"' : '')+'>'+G_nikLongName[nik] + '</a>: ' + count + '; ';
	
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
