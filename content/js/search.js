var filearray = new Array();
filearray.push("d1"); 
filearray.push("d2");
filearray.push("d3");
filearray.push("m1");
filearray.push("m2");
filearray.push("m3");
filearray.push("s1");
filearray.push("s2");
filearray.push("s3");
filearray.push("s4");
filearray.push("s5");
filearray.push("a1");
filearray.push("a2");
filearray.push("a3");
filearray.push("a4");
filearray.push("a5");
filearray.push("a6");
filearray.push("a7");
filearray.push("a8");
filearray.push("a9");
filearray.push("a10");
filearray.push("a11");
filearray.push("k1");
filearray.push("k2");
filearray.push("k3");
filearray.push("k4");
filearray.push("k5");
filearray.push("k6");
filearray.push("k7");
filearray.push("k8");
filearray.push("k9");
filearray.push("k10");
filearray.push("k11");
filearray.push("k12");
filearray.push("k13");
filearray.push("k14");
filearray.push("k15");
filearray.push("k16");
filearray.push("k17");
filearray.push("k18");
filearray.push("k19");
filearray.push("k20");
filearray.push("k21");
filearray.push("v1");
filearray.push("v2");
filearray.push("v3");
filearray.push("v4");
filearray.push("v5");
filearray.push("v6");
filearray.push("y1");
filearray.push("y2");
filearray.push("y3");
filearray.push("y4");
filearray.push("y5");
filearray.push("y6");
filearray.push("y7");
filearray.push("y8");
filearray.push("y9");
filearray.push("y10");
filearray.push("y11");
filearray.push("y12");
filearray.push("y13");
filearray.push("y14");


var filearraya = new Array();
filearraya.push("d1"); 
filearraya.push("d2");
filearraya.push("d3");
filearraya.push("m1");
filearraya.push("m2");
filearraya.push("m3");
filearraya.push("s1");
filearraya.push("s2");
filearraya.push("s3");
filearraya.push("s4");
filearraya.push("s5");
filearraya.push("a1");
filearraya.push("a2");
filearraya.push("a3");
filearraya.push("a4");
filearraya.push("a5");
filearraya.push("a6");
filearraya.push("a7");
filearraya.push("a8");
filearraya.push("a9");
filearraya.push("a10");
filearraya.push("a11");
filearraya.push("k1");
filearraya.push("k2");
filearraya.push("k3");
filearraya.push("k4");
filearraya.push("k5");
filearraya.push("k6");
filearraya.push("k7");
filearraya.push("k8");
filearraya.push("k9");
filearraya.push("k10");
filearraya.push("k12");
filearraya.push("k13");
filearraya.push("k14");
filearraya.push("k15");
filearraya.push("v1");
filearraya.push("v2");
filearraya.push("v3");
filearraya.push("v4");
filearraya.push("v5");
filearraya.push("v6");


var nikletter = new Array();
nikletter[0] = 'd';
nikletter[1] = 'm';
nikletter[2] = 's';
nikletter[3] = 'a';
nikletter[4] = 'k';
nikletter[5] = 'v';
nikletter[6] = 'y';

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
var bookperm = 0;

var exword = new Array();
var countmatch = 0;

function resetvalues() {
	exword.length=0;
	stopsearch = 0;	
	bookperm = 0;
	rescount = -1;
	qz = 0;
	nikayaat = '';
	newnikaya = '';
	nikcount = 0;
	thiscount = 0;
	bookfile = '';
	countmatch = 0;
    document.getElementById('sbfa').innerHTML = '';
    document.getElementById('sbfb').innerHTML = '';
    document.getElementById('stfb').innerHTML = '';
    document.getElementById('stfc').innerHTML = '';
}

function pausesall() 
{
	resetvalues();

	var getstring = document.form.usearch.value;
	var stringra = new Array();
	
	var yesplus = getstring.search(/\u002B/);
	if (yesplus >= 0)
	{
		stringra = getstring.split('+');
	}
	if (getstring.length < 3)
	{
		alert("Minimum three letter search length")
		document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
		document.getElementById('sbfa').innerHTML='';
		return;
	}
	if (stringra.length > 3)
	{
		alert("maximum three strings per search")
		document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
		document.getElementById('sbfa').innerHTML='';
		return;
	}
	for (var s = 0; s < stringra.length; s++)
	{
		if (stringra[s].length < 3 && stringra.length > 0)
		{
			alert("Minimum three letter search length")
			document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c">ready</h1></div>';
			document.getElementById('sbfa').innerHTML='';
			return;
		}
	}

	
	
		document.getElementById('sbfab').innerHTML = '';
		document.getElementById('sbfb').innerHTML = '<hr>';
	
		if (hier == "a") document.getElementById('stfb').innerHTML = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="stopsearch=1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td width=1 style="color:'+colorcfg['coltext']+'">Search&nbsp;results&nbsp;for&nbsp;<b>' + getstring.replace(/ /g, '&nbsp;') + ':&nbsp;</b></td><td align=left> <a href="javascript:go_anchor(\'searchb\',\'sbfDN\')">DN:</a> <font id="stfd"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfMN\')">MN:</a> <font id="stfm"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfSN\')">SN:</a> <font id="stfs"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfAN\')">AN:</a> <font id="stfa"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfKN\')">KN:</a> <font id="stfk"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfVin\')">Vin:</a> <font id="stfv"></font></td><td width=1><input type="button" class="btn" value="-" title="minimize search frame" onClick="moves(0); stopsearch=1"></td></tr></table>';
	else document.getElementById('stfb').innerHTML = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="stopsearch=1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td width=1 style="color:'+colorcfg['coltext']+'">Search&nbsp;results&nbsp;for&nbsp;<b>' + getstring.replace(/ /g, '&nbsp;') + ':&nbsp;</b></td><td align=left> <a href="javascript:go_anchor(\'searchb\',\'sbfDN\')">DN:</a> <font id="stfd"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfMN\')">MN:</a> <font id="stfm"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfSN\')">SN:</a> <font id="stfs"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfAN\')">AN:</a> <font id="stfa"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfKN\')">KN:</a> <font id="stfk"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfVin\')">Vin:</a> <font id="stfv"></font>, <a href="javascript:go_anchor(\'searchb\',\'sbfAbhi\')">Abhi:</a> <font id="stfy"></font></td><td width=1><input type="button" class="btn" value="-" title="minimize search frame" onClick="moves(0); stopsearch=1;"></td></tr></table>';
	

	
	var tableout = '<table width=100% id="stftb"><tr>';
	if (hier == "a") var fal = filearraya.length;
	else var fal = filearray.length;
	for (q2 = 0; q2 < fal; q2++)
	{
		tableout += '<td bgcolor=grey width=1%></td>';
	}
	tableout += '</tr></table>';
	document.getElementById('stfc').innerHTML = tableout;
	
	bounce();
}
function pausetwo() {
	resetvalues();
	importXMLs(2);
}
function bounce()
{
	if (stopsearch==1) {
        document.getElementById('stfstop').setAttribute('style','display:none');       
        return;
    }	
	document.getElementById('stftb').getElementsByTagName('td')[qz].setAttribute('bgcolor','lime');
	setTimeout('importXMLs(1)', 10)
}

function bounce2()
{
	setTimeout('importXMLs(2)', 10)
}


function importXMLs(cnt)
{
	count = cnt;
	var bookno = 0;
	var endloop = 0;
	var yellowcount = 0;

	var getstring = document.form.usearch.value;
	var stringra = new Array();
	
	document.getElementById('plus').innerHTML = '<input type="button" class="btn" value="-" title="minimize search frame" onClick="moves(0)">';

	if (count == 3) document.getElementById('sbfb').innerHTML = '';
	var yesplus = getstring.search(/\u002B/);
	if (yesplus >= 0)
	{
		stringra = getstring.split('+');
	}
	if (getstring.length < 3)
	{
		alert("Minimum three letter search length")
		document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c" style="color:'+colorcfg['coltext']+'">ready</h1></div>';
		document.getElementById('sbfa').innerHTML='';
		return;
	}
	if (stringra.length > 3)
	{
		alert("maximum three strings per search")
		document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c" style="color:'+colorcfg['coltext']+'">ready</h1></div>';
		document.getElementById('sbfa').innerHTML='';
		return;
	}
	for (var s = 0; s < stringra.length; s++)
	{
		if (stringra[s].length < 3 && stringra.length > 0)
		{
			alert("Minimum three letter search length")
			document.getElementById('sbfb').innerHTML='<div align = center><br><br><br><br><br><h1 id = "c" style="color:'+colorcfg['coltext']+'">ready</h1></div>';
			document.getElementById('sbfa').innerHTML='';
			return;
		}
	}

	if (cnt == 1) // whole tipitaka
	{
			if (hier == "a") bookfile = filearraya[qz];
			else bookfile = filearray[qz];
			newnikaya = bookfile.charAt(0);
			if (nikayaat != newnikaya)
			{
				document.getElementById('sbfb').innerHTML += '<div id="sbf' + nikname[newnikaya] + '" title="xyz"><h1 style="color:'+colorcfg['coltext']+'">' + nikname[newnikaya] + '</h1><hr></div>';
				thiscount = 0;
				rescount++;
			}
			nikayaat = bookfile.charAt(0);
			bookat = bookfile.substring(1);
			bookperm = bookat;
			nikperm = nikayaat;
			
			bookload = 'xml/' + bookfile + hier + '.xml';
	
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", bookload, false);
            xmlhttp.send(null);
            var xmlDoc = xmlhttp.responseXML.documentElement;
            createTables(xmlDoc);
			            
			nikcount = nikletter[rescount];
            if (rescount < 0) document.getElementById('stf'+nikletter[0]).innerHTML = thiscount;
            else document.getElementById('stf'+nikcount).innerHTML = thiscount;
			if ((hier == "a" && qz < filearraya.length-1) || (hier == "m" && qz < filearray.length-1)) 
			{
				if (hier == "a") nextbookfile = filearraya[qz+1];
				else nextbookfile = filearray[qz+1];
				if (nextbookfile.charAt(0) != nikayaat) document.getElementById('stf'+nikletter[rescount]).setAttribute('class','yellow');
				qz++;
				bounce();
			}
			else {
				qz = 0;
				bookperm = 0;
				document.getElementById('stf'+nikletter[rescount]).setAttribute('class','yellow');
				document.getElementById('stfstop').setAttribute('style','display:none');
			}			
	}	
	else if (cnt == 2) // nikaya
	{
		var nikaya = document.form.nik.value;

		// define number of books in the nikaya at hand
		if (nikaya == 'd' || nikaya == 'm') bookno = 3;
		else if (nikaya == 's') bookno = 5;
		else if (nikaya == 'v') bookno = 6;
		else if (nikaya == 'a') bookno = 11; 
		else if (nikaya == 'k') bookno = 21; 
		else if (nikaya == 'x') bookno = 2; 
		else if (nikaya == 'y') bookno = 14; 
		else if (nikaya == 'g') bookno = 5; 

		if (qz == 0) {
			document.getElementById('sbfab').innerHTML = '';
			document.getElementById('sbfb').innerHTML = '<hr>';
			document.getElementById('stfb').innerHTML = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="stopsearch=1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td width=1 style="color:'+colorcfg['coltext']+'">Search&nbsp;results&nbsp;for&nbsp;<b>' + getstring.replace(/ /g, '&nbsp;') + ':&nbsp;</b></td><td align=left><font id="stfx"></font> matches in ' + nikname[nikaya] + '</td><td width=1><input type="button" class="btn" value="-" title="stop search" onClick="stopsearch=1; moves(0)"></td></tr></table>';
		}

		document.getElementById('sbfb').innerHTML += '<div title="xyz"><h1>' + nikname[nikaya] + ' ' + (qz + 1) + '</h1><hr></div>';

		// loop through the books - now loops through bounce function

		bookfile = nikaya + (qz + 1); // create the name of the xml file without the "
		bookload = 'xml/' + bookfile + hier + '.xml';
		
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", bookload, false);
        xmlhttp.send(null);
        var xmlDoc = xmlhttp.responseXML.documentElement;
        createTables(xmlDoc);
		//alert(bookload);

		document.getElementById('stfx').innerHTML = thiscount;
		if (qz < bookno - 1) 
		{
			qz++;
			bounce2();
		}
		else {
			qz = 0;
			bookperm = 0;
			thiscount = 0;
			document.getElementById('stfstop').setAttribute('style','display:none');
		}
	}
	else if (cnt == 3) // this book
	{
		resetvalues();
		var nikaya = document.form.nik.value;
		var book = document.form.book.value;
		bookfile = nikaya + book;
		
		document.getElementById('sbfab').innerHTML = '';
		//document.getElementById('sbfb').innerHTML = '<hr><div title="xyz"><h1>' + nikname[nikaya] + ' ' + book + '</h1><hr></div>';

		document.getElementById('stfb').innerHTML = '<table width=100%><tr><td width=1><a href="javascript:void(0)" onclick="stopsearch=1" title="click to stop search"><img id="stfstop" src="images/stop.png" width=25></a></td><td align=left style="color:' + colorcfg['coltext'] + '">Search&nbsp;results&nbsp;for&nbsp;<b>' + getstring.replace(/ /g, '&nbsp;') + '</b> in <b>' + nikname[nikaya] + ' ' + book + '</b>: <b id="num">' + countmatch + '</b></td><td width=1><input type="button" class="btn" value="-" title="minimize search frame" onClick="stopsearch=1; moves(0)"></td></tr></table>';
		
		bookload = 'xml/' + bookfile + hier + '.xml';

        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", bookload, false);
        xmlhttp.send(null);
        var xmlDoc = xmlhttp.responseXML.documentElement;
        createTables(xmlDoc);

        
        document.getElementById('stfstop').setAttribute('style','display:none');
	}
	document.getElementById('searchb').scrollTop = 0; //vertical scroll
	buffer = '';
	first = 0;
	nikperm = 0;
	if (count == 3) thiscount = 0;
	
}

function createTables(xmlDoc)
{
	//alert(bookload);
	if (script != 0) chscript(1);				
	var u = xmlDoc.getElementsByTagName("h0");
	
	var getstring = document.form.usearch.value;
	var gotstring;
	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	if (count == 2) book = bookperm + 1;
	else if (count == 1)
	{
		nikaya = nikperm;
		book = bookperm;
	}
	
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
	
	var finalout = '';
	
	var match = 0;
	var nummatch = 0;
	var extranummatch = -1;
	
	var stringra = new Array();
	var perstring = '';
	var yesall = 0;
	
	var yesplus = getstring.search(/\u002B/); // look for multi matches
	if (yesplus >= 0) {
		stringra = getstring.split('+');
	}
	else stringra[0] = getstring;
	
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
							texttomatch = z[tmp].childNodes[0].nodeValue.substring(4);
							texttomatch = texttomatch.replace(/\{[^}]+\}/g, '');
							if (getstring.search(/[0-9]/g) == -1) texttomatch = texttomatch.replace(/\^a\^[^^]*\^ea\^/g, ''); // remove pesky page references unless we're searching for them.
							texttomatch = texttomatch.replace(/   */g, ' ');
							if (yesplus >= 0) // multiple search terms		
							{
								tagtitle = '';
								tempexword = [];
								for (d = 0; d < stringra.length; d++)
								{
									perstring = stringra[d];
									startmatch = texttomatch.search(perstring);
									postpara = '';
									tempexword[d] = [];
									if (startmatch >= 0) 
									{
										yesall++;
										if (d == 0) nummatch++; // will search page for only first term
										while (startmatch >= 0)
										{				
											if (d == 0) extranummatch++;
											endmatch = startmatch + stringra[d].length;
											beforem = texttomatch.substring(0,startmatch);
											afterm = texttomatch.substring(endmatch,texttomatch.length);
											postpara += beforem + '<font style="color:'+colorcfg['colsearch'+d]+'"><b>' + stringra[d] + '</b></font>';
											texttomatch = texttomatch.substring(endmatch,texttomatch.length);
											startmatch = texttomatch.search(stringra[d]);
											
											// get words
											spaceb = beforem.search(' ');
											while (spaceb > -1) {
												beforem = beforem.substring(spaceb+1);
												spaceb = beforem.search(' ');
											}
											spacea = afterm.search(' ');
											aftermex = afterm.substring(0,spacea);
											tempexword[d].push (beforem+perstring+aftermex);								
										}
									
										postpara += afterm;
										texttomatch = postpara;
									}
								}
								if (yesall == stringra.length)
								{								
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
									exnodups = [];
									dups = [];

									exwordout = '<div><a style="color:' + colorcfg['coltext'] + '" href="javascript:void(0);" onclick="showonly(\'xyz\')">Show All</a></div><hr><table width=100%><tr>';

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
											
											exwordout += '<div><a style="color:' + colorcfg['coltext'] + '" href="javascript:void(0);" onclick="showonly(\'' + exnodups[t][ex].replace(/\"/g, 'x') + '\')">' + replaceunistandard(exnodups[t][ex]) + '</a> (' + dups[exnodups[t][ex]] + ')</div>';
										}
										exwordout += '</td>';
									}
									document.getElementById('sbfab').innerHTML = exwordout + '</tr></table><hr>';
								
																
									finalout += '<div id="' + countmatch + tagtitle + '"><p><font size=4 class="green">' + nikname[nikaya] + ' ' + book;
									if(u.length>1) finalout += '.' + (sx+1);
									if(v.length>1) finalout += '.' + (sy+1);
									if(w.length>1) finalout += '.' + (sz+1);
									if(x.length>1) finalout += '.' + (s+1);
									if(y.length>1) finalout += '.' + (se+1);
									finalout += ', Paragraph ' + (tmp + 1) + ' <input type="button" class="btn" value="go" onclick="javascript:searchgo(\'' + bookfile + '\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',' + tmp + ',\'' + sraout + '\',' + nummatch + ')"> <a href="javascript:void(0)" style="color:' + colorcfg['coltext'] + '" onclick="document.getElementById(\'searchb\').scrollTop = 0;">top</a></font></p><p style="color:' + colorcfg['coltext'] + '">' + formatuniout(postpara,1) + '</p><hr></div>';
									nummatch += extranummatch; // add extra matches in this paragraph for next count.
									extranummatch = -1; 					
									match = 1;
									thiscount++;									
									countmatch++;
								}
								yesall = 0;
							}
							else // single search term
							{
								tempexword.length = 0;
								startmatch = texttomatch.search(getstring);
								postpara = '';
								if (startmatch >= 0)
								{
									nummatch++;
									while (startmatch >= 0)
									{				
										match = 1;
										extranummatch++;
                                        gotstring = texttomatch.match(getstring)[0];
										endmatch = startmatch + gotstring.length;
										beforem = texttomatch.substring(0,startmatch);
										if (getstring.search(/^[PVMT][0-9]+\.[0-9]+$/) == 0) {  // page search
                                            beforem = beforem.substring(0,beforem.length - 3);
                                            endmatch += 4;
                                        }
                                        afterm = texttomatch.substring(endmatch,texttomatch.length);
										postpara += beforem + '<font style="color:' + colorcfg['colsearch1'] + '"><b>' + gotstring + '</b></font>';
										texttomatch = texttomatch.substring(endmatch);
										startmatch = texttomatch.search(getstring);
										
										// get words
										spaceb = beforem.search(' ');
										if (gotstring.charAt(0) != ' ') {
											while (spaceb > -1) {
												beforem = beforem.substring(spaceb+1);
												spaceb = beforem.search(' ');
											}
										}
										else { beforem = ''; }
										if (gotstring.charAt(gotstring.length-1) != ' ') {
											spacea = afterm.search(' ');
											aftermex = afterm.substring(0,spacea);
										}
										else { 
											aftermex = ''; 
											postpara += ' ';
										}
										tempexword.push (beforem+gotstring+aftermex);
									}

									// word add
									
									l = tempexword.length;
									texnodups.length = 0;
									for(var i=0; i<l; i++) {
										for(var j=i+1; j<l; j++) {
											if (tempexword[i] === tempexword[j])
												j = ++i;
											}
										texnodups.push(tempexword[i]);
									}
									tagtitle = 'q' + texnodups.join('q') + 'q';
									tagtitle = tagtitle.replace(/\"/g, 'x');
									
									exword = exword.concat(texnodups);
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
									findiv = ((exnodups.length)/3);
									ctab = 0;
									exwordout = '<div style="color:' + colorcfg['coltext'] + '"><a style="color:' + colorcfg['coltext'] + '" href="#" onclick="showonly(\'xyz\')">Show All</a></div><hr><table width=100%><tr><td valign="top">';
									for (ex = 0; ex < findiv; ex++)
									{
										
										exwordout += '<div style="color:' + colorcfg['coltext'] + '"><a style="color:' + colorcfg['coltext'] + '" href="#" onclick="showonly(\'' + exnodups[ex].replace(/\"/g, 'x') + '\')">' + replaceunistandard(exnodups[ex]) + '</a> (' + dups[exnodups[ex]] + ')</div>';
										ctab++;
									}
									if(exnodups.length > 1)
									{
										exwordout += '</td><td valign="top">';
										for (ex = ctab; ex < (ctab*2); ex++)
										{
										exwordout += '<div style="color:' + colorcfg['coltext'] + '"><a style="color:' + colorcfg['coltext'] + '" href="#" onclick="showonly(\'' + exnodups[ex].replace(/\"/g, 'x') + '\')">' + replaceunistandard(exnodups[ex]) + '</a> (' + dups[exnodups[ex]] + ')</div>';
										}	
										
										exwordout += '</td><td valign="top">';
										for (ex = (ctab*2); ex < exnodups.length; ex++)
										{
										exwordout += '<div style="color:' + colorcfg['coltext'] + '"><a style="color:' + colorcfg['coltext'] + '" href="#" onclick="showonly(\'' + exnodups[ex].replace(/\"/g, 'x') + '\')">' + replaceunistandard(exnodups[ex]) + '</a> (' + dups[exnodups[ex]] + ')</div>';
										}	
									}
									document.getElementById('sbfab').innerHTML = exwordout + '</td></tr></table>';
									
									postpara += afterm;

									// titles
									
									finalout += '<div id="' + countmatch + tagtitle + '"><p><font size=4 class="green">' + nikname[nikaya] + ' ' + book;
									if(u.length>1) finalout +=  '.' + (sx+1);
									if(v.length>1) finalout += '.' + (sy+1);
									if(w.length>1) finalout += '.' + (sz+1);
									if(x.length>1) finalout += '.' + (s+1);
									if(y.length>1) finalout += '.' + (se+1);
									
									// paragraph
									
									finalout += ', Paragraph ' + (tmp + 1) + ' <input type="button" class="btn" value="go" onclick="javascript:searchgo(\'' + bookfile + '\',' + (book - 1) + ',' + sx + ',' + sy + ',' + sz + ',' + s + ',' + se + ',' + tmp + ',\'' + sraout + '\',' + nummatch + ')"> <a href="javascript:void(0)" style="color:' + colorcfg['coltext'] + '" onclick="document.getElementById(\'searchb\').scrollTop = 0;">top</a></font></p><p style="color:' + colorcfg['coltext'] + '">' + formatuniout(postpara,1) + '</p><hr></div>';
									
									// mumble mumble
									
									nummatch += extranummatch; // add extra matches in this paragraph for next count.
									extranummatch = -1; 
									thiscount++;
									countmatch++;
									cmval = '';
								}
							}
							if (count == 3) document.getElementById('num').innerHTML = '<font class=yellow>' + thiscount + '</font>';
						}
						nummatch = 0;
					}
				}
			}
		}
	}
	if (count == 3) document.getElementById('sbfb').innerHTML += '<hr>';
	if (match == 0) document.getElementById('sbfb').innerHTML += '<div title="xyz"><p><font size=4 class="green">' + nikname[nikaya] + ' ' + book + '</font> - <font class="yellow" size=3><i>No Match</i> <a href="javascript:void(0)" style="color:' + colorcfg['coltext'] + '" onclick="document.getElementById(\'searchb\').scrollTop = 0;"></font><hr></div>';
	else document.getElementById('sbfb').innerHTML += finalout;
	
	match = 0;

	

	if (count == 2) // forward to next book
	{
		if (nikaya == 'd' || nikaya == 'm') bookno = 3;
		else if (nikaya == 's') bookno = 5;
		else if (nikaya == 'v') bookno = 6;
		else if (nikaya == 'a') bookno = 11; 
		else if (nikaya == 'k') bookno = 21; 
		else if (nikaya == 'x') bookno = 2; 
		else if (nikaya == 'y') bookno = 14; 
		else if (nikaya == 'g') bookno = 5; 
		bookperm++;
	}

}

function showonly(string) {
	var da = document.getElementById('sbfb').getElementsByTagName('div');
	for (x = 0; x < da.length; x++) {
		if (string == 'xyz') da[x].style.display = "block";
		else {		
			if (da[x].id.search('q' + string + 'q') > -1) da[x].style.display = "block";
			else da[x].style.display = "none";
		}
	}
}

function searchgo(xml,book,sx,sy,sz,s,se,tmp,stringra,nummatch)
{
	moves(0);
	if (stringra) document.getElementById('plus').innerHTML = '<input type="button" class="btn" value="+" title="maximize search frame" onClick="moves(1)">';
	var ssect = se;
	document.getElementById('mafb').innerHTML='<div align = center><br><br><br><br><br><h1>please wait...</h1></div>';
	var hierse = document.getElementById('hierv').value;
	var temp = Array(niknumber[xml.charAt(0)],book,sx,sy,sz,s,se,hierse);
	getplace(temp);
	if (stringra) {
		stringra = stringra.replace(/`/g, '"');
		stringra = stringra.split('#');
		importXML('s',stringra);
		findString (stringra[0],nummatch);
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

var TRange=null

function findString (strx,nummatch) {
 var str = replaceunistandard(strx)
 if (parseInt(navigator.appVersion)<4) return;
 var strFound;
 if (navigator.appName=="Netscape") {

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
 //if (!strFound) alert ("String '"+str+"' not found!")
}

