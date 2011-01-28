var getsutta = 0;
var prevyes = 0;
var searchsect = 0;
var stop = 0;

var unnamed = '(unnamed)';


var versecheck = 0;
var versestop = 0;
var hier = 'm'; // m = mula, a = atthakatha

function importXML(labelsearch,para)
{
	moves(0); // close search
	
	if (hier == 't' && limitt()) { 
		alert('Ṭīkā not available for '+nikname[document.form.nik.value]+'.');
		return; 
	}
	if (hier == 'a' && document.form.nik.value == 'g') {
		alert('Atthakatha not available for grammar.');
		return;
	}		

	document.getElementById('mafb').innerHTML='<div align = center><br><br><br><br><br><h1>please wait...</h1></div>';

	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';

	document.getElementById('manrem').value = 0;


	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;


	var meta = document.form.meta.selectedIndex;
	var volume = document.form.volume.selectedIndex;
	var vagga = document.form.vagga.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var section = document.form.section.selectedIndex;

	var book = document.form.book.value;
	
	var u = xmlDoc.getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	var z = y[section].getElementsByTagName("p");
	
	//titles

	var nikaya = document.form.nik.value;
	var vn = u[meta].getElementsByTagName("h0n");
	var wn = v[volume].getElementsByTagName("h1n");
	var xn = w[vagga].getElementsByTagName("h2n");
	var yn = x[sutta].getElementsByTagName("h3n");
	var zn = y[section].getElementsByTagName("h4n");
	var vna = (vn[0].childNodes[0] ? vn[0].childNodes[0].nodeValue : ' ');
	var wna = (wn[0].childNodes[0] ? wn[0].childNodes[0].nodeValue : ' ');
	var xna = (xn[0].childNodes[0] ? xn[0].childNodes[0].nodeValue : ' ');
	var yna = (yn[0].childNodes[0] ? yn[0].childNodes[0].nodeValue : ' ');
	var zna = (zn[0].childNodes[0] ? zn[0].childNodes[0].nodeValue : ' ');

	document.getElementById('mafb').innerHTML = '';
	
	convtitle(nikaya,book,vna,wna,xna,yna,zna);

	if (zna.length > 1) { var bknameme = zna }
	else if (yna.length > 1) { var bknameme  = yna }
	else if (xna.length > 1) { var bknameme  = xna }
	else if (wna.length > 1) { var bknameme  = wna }
	else if (vna.length > 1) { var bknameme  = vna }
	else bknameme = '';
	
	bknameme = bknameme.replace(/^ +/, '').replace(/ +$/, '');
	
	document.form.bmname.value = bknameme;
	var hierb = hier;
	
	addHistory(nikname[nikaya]+' '+book+' - '+bknameme+"@"+document.form.nik.selectedIndex+','+document.form.book.selectedIndex+','+meta+','+volume+','+vagga+','+sutta+','+section+','+hierb);
	historyBox();

	var theData = '';
	
	// check if there is a search going on and add the labels
	
	if (labelsearch) {
		for (tmp = 0; tmp < z.length; tmp++)
		{
			var quit = 0;
			var onepar = z[tmp].childNodes[0].nodeValue.substring(4);
			for (tmpl = 0; tmpl < labelsearch.length; tmpl++)
			{
				if (onepar.search(labelsearch[tmpl]) == -1) quit = 1; // at least one of the strings was not found -> no match
			}	
			if (quit == 1) {
				theData += ' <p> ' + onepar;
			}
			else {
				theData += ' <p> ';
				var tmpdata = onepar;
				for (var i = 0; i < labelsearch.length; i++)
				{
					var lt = labelsearch[i];
					if (!lt) continue;
					onepar = tmpdata;
					tmpdata = '';
					while (onepar.match(lt)) {
						var matched = onepar.match(lt)[0];
						var opp = onepar.search(lt);
						tmpdata += onepar.substring(0,opp);
						tmpdata += '<c' + i  + '>' + matched.replace(/  */g, '<xc> <c' + i  + '>') + '<xc>';
						onepar = onepar.substring(opp + matched.length);
					}
					tmpdata += onepar;
				}
				theData += tmpdata;
			} 
		}		
	}	
	else {
		for (tmp = 0; tmp < z.length; tmp++)
		{
			theData += ' <p> ' + z[tmp].childNodes[0].nodeValue.substring(4);
		}
	}
	preout(theData);
	
	document.textpad.pad.value=theData;
	if(para) { 
        document.getElementById('maf').scrollTop = document.getElementById('para'+para).offsetTop;
	}
}

var maxlength = 20;  // change for display purposes, will affect history as well.


function gettitles(altget,stop,prev,ssect)
{
	var newload = 0;
	
	if (altget == 3) getsutta = 4; // only remake section lists
	if (altget == 4) getsutta = 3; // remake section and sutta lists only, not vagga, volume or meta lists
	if (altget == 5) getsutta = 2; // remake section, sutta and vagga lists only, not volume or meta lists
	if (altget == 6) getsutta = 1; // remake all but meta lists
	if (ssect) searchsect = ssect;
	if (stop == 0) newload = 0; // load xml data
	if (stop == 1) newload = 1; // don't load xml data
	if (stop == 2) newload = 2; // don't load xml data, load index instead
	if (stop == 3) { switchhier(prev); newload = 2 };
	if (prev) prevyes = 1;
	   
	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;
 
	/*var divh = document.getElementById('topdiv').offsetHeight;
	var toth = window.innerHeight;
	var pos = (toth - divh)/2 - 25; 
	if (pos < 0) pos = 0;
	document.getElementById('botdiv').setAttribute('style','position:absolute; left:50%; margin-left:-75px; top:' + pos + 'px');*/

	var unamea = 0;
	var vnamea = 0;
	var xnamea = 0;
	var ynamea = 0;
	
	var meta = (getsutta > 0  ? document.form.meta.selectedIndex : 0);
	var volume = (getsutta > 1 ? document.form.volume.selectedIndex : 0);
	var vagga = (getsutta > 2 ? document.form.vagga.selectedIndex : 0);
	var sutta = (getsutta > 3 ? document.form.sutta.selectedIndex : 0);

	var metalist = '';
	var volumelist = '';
	var vaggalist = '';
	var suttalist = '';
	var sectionlist = '';

	var nik = document.form.nik.value;
	var book = document.form.book.value;


	var t = xmlDoc.getElementsByTagName("ha");
	var tname = t[0].getElementsByTagName("han");
	if (tname[0].childNodes[0]) var tnamea = tname[0].childNodes[0].nodeValue; else tnamea = unnamed;
	var countt = tnamea;
	countt = countt.replace(/aa/g, 'a');
	countt = countt.replace(/ii/g, 'i');
	countt = countt.replace(/uu/g, 'u');
	countt = countt.replace(/\./g, '');
	countt = countt.replace(/\~/g, '');
	countt = countt.replace(/\"/g, '');

	var difft = tnamea.length - countt.length;

	if (countt.length > maxlength + 3) 
	{
	tnamea = tnamea.substring(0,maxlength+difft);
	tnamea += '...';
	}
	tnamea = replaceunistandard(tnamea);
	document.getElementById('title').innerHTML = '<input type="button" value="'+translit(tnamea)+'" title="click to return to index" onclick="importXMLindex();">';
		
	var u = xmlDoc.getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	
	var ap = 0;
	var bp = 0;
	var countu = '';
	var countv = '';
	var countx = '';
	var county = '';
	
	var uname = new Array();
	var vname = new Array();
	var xname = new Array();
	var yname = new Array();

	if (getsutta == 0) // remake meta list
	{
		for (var a = 0; a < u.length; a++)
		{
			ap = a + 1;
			uname = u[a].getElementsByTagName("h0n");
			if (uname[0].childNodes[0]) unamea = uname[0].childNodes[0].nodeValue; else unamea = unnamed;
			countu = unamea;
			countu = countu.replace(/aa/g, 'a');
			countu = countu.replace(/ii/g, 'i');
			countu = countu.replace(/uu/g, 'u');
			countu = countu.replace(/\./g, '');
			countu = countu.replace(/\~/g, '');
			countu = countu.replace(/\"/g, '');
			
			var diffu = unamea.length - countu.length;
			
			if (countu.length > maxlength + 3) 
			{
				unamea = unamea.substring(0,maxlength+diffu);
				unamea += '...';
			}
			unamea = replaceunistandard(unamea);
			unamea = translit(unamea);

			metalist += '<option';
			if (a == 0) metalist += ' selected';
			metalist += '>' + unamea + '</option>'
		}
		if (u.length < 2 && (unamea == ' ' || unamea == unnamed)) {
			metalist = '<select size="1" name="meta" class="hide">' + metalist;

		}
		else {
			metalist = '<select size="1" name="meta" onChange="gettitles(6)">' + metalist;

		}	
		metalist += '</select>'
		document.getElementById('meta').innerHTML=metalist;
	}
	
	if (getsutta < 2) // remake volume list
	{
		for (var a = 0; a < v.length; a++)
		{
			ap = a + 1;
			vname = v[a].getElementsByTagName("h1n");
			if (vname[0].childNodes[0]) vnamea = vname[0].childNodes[0].nodeValue; else vnamea = unnamed;
			countv = vnamea;
			countv = countv.replace(/aa/g, 'a');
			countv = countv.replace(/ii/g, 'i');
			countv = countv.replace(/uu/g, 'u');
			countv = countv.replace(/\./g, '');
			countv = countv.replace(/\~/g, '');
			countv = countv.replace(/\"/g, '');
			
			var diffv = vnamea.length - countv.length;
			
			if (countv.length > maxlength + 3) 
			{
				vnamea = vnamea.substring(0,maxlength+diffv);
				vnamea += '...';
			}
			vnamea = replaceunistandard(vnamea);
			vnamea = translit(vnamea);

			volumelist += '<option';
			if (a == 0) volumelist += ' selected';
			volumelist += '>' + vnamea + '</option>'
		}
		if (v.length < 2 && (vnamea == ' ' || vnamea == unnamed)) {
			volumelist = '<select size="1" name="volume" class="hide">' + volumelist;
		}
		else {
			volumelist = '<select size="1" name="volume" onChange="gettitles(5)">' + volumelist;
		}	
		volumelist += '</select>'
		document.getElementById('volume').innerHTML=volumelist;
	}
	if (getsutta < 3) // remake vaggalist
	{
		for (var a = 0; a < w.length; a++)
		{
			wname = w[a].getElementsByTagName("h2n");
			if (wname[0].childNodes[0]) wnamea = wname[0].childNodes[0].nodeValue; else wnamea = unnamed;
			countw = wnamea;
			countw = countw.replace(/aa/g, 'a');
			countw = countw.replace(/ii/g, 'i');
			countw = countw.replace(/uu/g, 'u');
			countw = countw.replace(/\./g, '');
			countw = countw.replace(/\~/g, '');
			countw = countw.replace(/\"/g, '');
			
			var diffw = wnamea.length - countw.length;
			
			if (countw.length > maxlength + 3) 
			{
				wnamea = wnamea.substring(0,maxlength+diffw);
				wnamea += '...';
			}
			wnamea = replaceunistandard(wnamea);
			wnamea = translit(wnamea);

			vaggalist += '<option';
			if (a == 0) vaggalist += ' selected';
			vaggalist += '>' + wnamea + '</option>'
		}
		if (w.length < 2 && (wnamea == ' ' || wnamea == unnamed)) {
			vaggalist = '<select size="1" name="vagga" class="hide">' + vaggalist;
		}
		else {
			vaggalist = '<select size="1" name="vagga" onChange="gettitles(4)">' + vaggalist;
		}
		vaggalist += '</select>'
		document.getElementById('vagga').innerHTML=vaggalist;
	}

	if (getsutta < 4) // remake sutta list on getsutta = 0, 2, or 3
	{
		for (var a = 0; a < x.length; a++)
		{
			ap = a + 1;
			xname = x[a].getElementsByTagName("h3n");
			if (xname[0].childNodes[0]) xnamea = xname[0].childNodes[0].nodeValue; else xnamea = unnamed;
			countx = xnamea;
			countx = countx.replace(/aa/g, 'a');
			countx = countx.replace(/ii/g, 'i');
			countx = countx.replace(/uu/g, 'u');
			countx = countx.replace(/\./g, '');
			countx = countx.replace(/\~/g, '');
			countx = countx.replace(/\"/g, '');
			
			var diffx = xnamea.length - countx.length;
			
			if (countx.length > maxlength + 3) 
			{
				xnamea = xnamea.substring(0,maxlength+diffx);
				xnamea += '...';
			}
			xnamea = replaceunistandard(xnamea);
			xnamea = translit(xnamea);

		
			suttalist += '<option';
			if (a == 0) suttalist += ' selected';
			suttalist += '>' + xnamea + '</option>'
		}
		if (x.length < 2 && (xnamea == ' ' || xnamea == unnamed)) {
			suttalist = '<select size="1" name="sutta" class="hide">' + suttalist;
		}
		else {
			suttalist = '<select size="1" name="sutta" onChange="gettitles(3)">' + suttalist;
		}
		suttalist += '</select>'
		document.getElementById('sutta').innerHTML=suttalist;
	}
	for (var d = 0; d < y.length; d++)
	{
		bp = d + 1;
		yname = y[d].getElementsByTagName("h4n");
		if (yname[0].childNodes[0]) ynamea = yname[0].childNodes[0].nodeValue; else ynamea = unnamed;
		
			county = ynamea;
			county = county.replace(/aa/g, 'a');
			county = county.replace(/ii/g, 'i');
			county = county.replace(/uu/g, 'u');
			county = county.replace(/\./g, '');
			county = county.replace(/\~/g, '');
			county = county.replace(/\"/g, '');
			
			var diffy = ynamea.length - county.length;
			
			if (county.length > maxlength+3) 
			{
				ynamea = ynamea.substring(0,maxlength+diffy);
				ynamea += '...';
			}
			
			ynamea = replaceunistandard(ynamea);
			ynamea = translit(ynamea);
	
		sectionlist += '<option';
		if (d == 0) sectionlist += ' selected';
		sectionlist += '>' + ynamea + '</option>';
	}
	if (y.length < 2 && (ynamea == ' ' || ynamea == unnamed)) {
		sectionlist = '<select size="1" name="section" class="hide">' + sectionlist;
	}
	else {
		sectionlist = '<select size="1" name="section" onChange="importXML()">' + sectionlist;
	}

	sectionlist += '</select>'
	document.getElementById('section').innerHTML=sectionlist
	if (prevyes == 1) document.form.section.selectedIndex = y.length - 1;
	if (searchsect > 0) document.form.section.selectedIndex = searchsect;
	if (newload == 0) importXML();
	else if (newload == 2) importXMLindex();
	getsutta = 0;
	prevyes = 0;
	searchsect = 0;
	stop = 0;
}


function importXMLindex() {
	if (hier == 't' && limitt()) { 
		alert('Ṭīkā not available for '+nikname[document.form.nik.value]+'.');
		return; 
	}	
	document.getElementById('mafb').innerHTML='<div align = center><br><br><br><br><br><h1>please wait...</h1></div>';

	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var z = xmlDoc.getElementsByTagName("ha");
	var y = '';
	var x = '';
	var w = '';
	var v = '';
	var u = '';
	
	var theData = "";
	var theDatao = "";

	bookfile = nikaya + book;
	
	document.getElementById('mafb').innerHTML = '';
	
	var tmp = 0;
	var tmp1 = 0;
	var tmp2 = 0;
	var tmp3 = 0;
	var tmp4 = 0;
	var tmp5 = 0;
	var tmp6 = 0;

	var col = ['coltext','colsel','colped','coldppn','colcpd'];
	var whichcol = [0,0,0,0,0];
	var wcs = 0;
	
	for (tmp = 0; tmp < z.length; tmp++)
	{
		if (z[tmp].getElementsByTagName("han")[0].childNodes[0]) theData = z[tmp].getElementsByTagName("han")[0].childNodes[0].nodeValue; else theData = ' ';
		if (z.length > 1 && theData == ' ') { theData = unnamed; } 
		if (theData != ' ') {

			whichcol[0] = 1; // bump up to let the second color know

			theDatao += '<a href="#" onclick="searchgo(\''+bookfile+'\','+book+',0,0,0,0,0);"/><font color="'+colorcfg[col[wcs]]+'"><b>' + translit(replaceunistandard(theData)) + '</b></font></a><br />';
		}
		y = z[tmp].getElementsByTagName("h0");
		for (tmp2 = 0; tmp2 < y.length; tmp2++)
		{
			if (y[tmp2].getElementsByTagName("h0n")[0].childNodes[0]) theData = y[tmp2].getElementsByTagName("h0n")[0].childNodes[0].nodeValue; else theData = ' ';
			if (y.length > 1 && theData == ' ') { theData = unnamed; }
			if (theData != ' ') {
				
				wcs = whichcol[0]; // either 0 or 1
				whichcol[1] = 1; // bump up for the next color, if no data, this will still be 0, next color will get 0
				
				theDatao += '&nbsp;&nbsp;<a href="#" onclick="searchgo(\''+bookfile+'\','+book+','+tmp2+',0,0,0,0);"/><font color="'+colorcfg[col[wcs]]+'">' + translit(replaceunistandard(theData)) + '</font></a>';

				var transin;
				var transout='';
				if (hier == "m") { 
					transin = addtrans(5,nikaya,book,tmp2);
					if (transin) {
						if (transin[0].charAt(0) != '&') transout += '<img style="vertical-align:middle" src="http://www.accesstoinsight.org/favicon.ico" title="Translations courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;'
						transout += transin.join('');
						theDatao += transout; 
					}
				}
				theDatao += '<br />';
			}
			x = y[tmp2].getElementsByTagName("h1");
			for (tmp3 = 0; tmp3 < x.length; tmp3++)
			{
				if (x[tmp3].getElementsByTagName("h1n")[0].childNodes[0]) theData = x[tmp3].getElementsByTagName("h1n")[0].childNodes[0].nodeValue; else theData = ' ';
				if (x.length > 1 && theData == ' ') { theData = unnamed; }
				if (theData != ' ') {
					
					wcs = whichcol[0] + whichcol[1]; // 0, 1 or 2 - if 0,1 are still 0, this will get 0
					whichcol[2] = 1; // bump up for the next color, if no data, this will still be -1, next color will get 0
				
					theDatao += '&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="searchgo(\''+bookfile+'\','+book+','+tmp2+','+tmp3+',0,0,0);"/><font color="'+colorcfg[col[wcs]]+'">' + translit(replaceunistandard(theData)) + '</font></a>';

					var transin;
					var transout='';
					if (hier == "m") { 
						transin = addtrans(4,nikaya,book,tmp2,tmp3);
						if (transin) {
							if (transin[0].charAt(0) != '&') transout += '<img style="vertical-align:middle" src="http://www.accesstoinsight.org/favicon.ico" title="Translations courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;'
							transout += transin.join('');
							theDatao += transout; 
						}
					}
					theDatao += '<br />';
				}
				w = x[tmp3].getElementsByTagName("h2");
				for (tmp4 = 0; tmp4 < w.length; tmp4++)
				{
					if (w[tmp4].getElementsByTagName("h2n")[0].childNodes[0]) theData = w[tmp4].getElementsByTagName("h2n")[0].childNodes[0].nodeValue; else theData = ' ';
					if (w.length > 1 && theData == ' ') { theData = unnamed; }
					if (theData != ' ') {
						
						wcs = whichcol[0] + whichcol[1] + whichcol[2]; // 0, 1, 2, or 3
						whichcol[3] = 1; // bump
						
                        theDatao += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="searchgo(\''+bookfile+'\','+book+','+tmp2+','+tmp3+','+tmp4+',0,0);"/><font color="'+colorcfg[col[wcs]]+'">' + translit(replaceunistandard(theData)) + '</font></a>';
                        var transin;
                        var transout='';
                        if (hier == "m") { 
                            transin = addtrans(3,nikaya,book,tmp2,tmp3,tmp4);
                            if (transin) {
                                if (transin[0].charAt(0) != '&') transout += '<img style="vertical-align:middle" src="http://www.accesstoinsight.org/favicon.ico" title="Translations courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;'
                                transout += transin.join('');
                                theDatao += transout; 
                            }
                        }
                        theDatao += '<br />';
                    }

					v = w[tmp4].getElementsByTagName("h3");
					for (tmp5 = 0; tmp5 < v.length; tmp5++)
					{
						if (v[tmp5].getElementsByTagName("h3n")[0].childNodes[0]) theData = v[tmp5].getElementsByTagName("h3n")[0].childNodes[0].nodeValue; else theData = ' ';
						if (v.length > 1 && theData == ' ') { theData = unnamed; }
						if (theData != ' ') {

							wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3]; // 0, 1, 2, 3, or 4
							whichcol[4] = 1; // bump

                            theDatao += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="searchgo(\''+bookfile+'\','+book+','+tmp2+','+tmp3+','+tmp4+','+tmp5+',0);"/><font color="'+colorcfg[col[wcs]]+'">' + translit(replaceunistandard(theData)) + '</font></a>';
                            var transin;
                            var transout='';
                            if (hier == "m") { 
                                transin = addtrans(2,nikaya,book,tmp2,tmp3,tmp4,tmp5);
                                if (transin) {
                                    if (transin[0].charAt(0) != '&') transout += '<img style="vertical-align:middle" src="http://www.accesstoinsight.org/favicon.ico" title="Translations courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;'
                                    transout += transin.join('');
                                    theDatao += transout; 
                                }
                            }
                            theDatao += '<br />';
                        }


						u = v[tmp5].getElementsByTagName("h4");
						for (tmp6 = 0; tmp6 < u.length; tmp6++)
						{
							if (u[tmp6].getElementsByTagName("h4n")[0].childNodes[0]) theData = u[tmp6].getElementsByTagName("h4n")[0].childNodes[0].nodeValue; else theData = ' ';
							if (z.length > 1 && theData == ' ') { theData = unnamed; }
							if (theData != ' ') {

								wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3] + whichcol[4]; // 0, 1, 2, 3, 4 or 5
								if (wcs == 5) wcs = 0;

                                theDatao += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onclick="searchgo(\''+bookfile+'\','+book+','+tmp2+','+tmp3+','+tmp4+','+tmp5+','+tmp6+');"/><font color="'+colorcfg[col[wcs]]+'">' + translit(replaceunistandard(theData)) + '</font></a>';
                                var transin;
                                var transout='';
                                if (hier == "m") { 
                                    transin = addtrans(1,nikaya,book,tmp2,tmp3,tmp4,tmp5,tmp6);
                                    if (transin) {
                                        if (transin[0].charAt(0) != '&') transout += '<img style="vertical-align:middle" src="http://www.accesstoinsight.org/favicon.ico" title="Translations courtesy of http://www.accesstoinsight.org/" onclick="window.open(\'http://www.accesstoinsight.org/\')">&nbsp;'
                                        transout += transin.join('');
                                        theDatao += transout; 
                                    }
                                }
                                theDatao += '<br />';
                            }
						}
					}
				}
			}
		}
	}

	document.getElementById('mafb').innerHTML = theDatao;  // ---------- return output ----------

	document.getElementById('maf').scrollTop = 0; // horizontal and vertical scroll targets
}

function importXMLraw()
{
	if (hier == 't' && limitt()) { 
		alert('Ṭīkā not available for '+nikname[document.form.nik.value]+'.');
		return; 
	}
	document.getElementById('mafb').innerHTML='<div align = center><br><br><br><br><br><h1>please wait...</h1></div>';

	var nikaya = document.form.nik.value;
	var book = document.form.book.value;
	var bookload = 'xml/' + nikaya + book + hier + '.xml';
	//alert(bookload);

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var book = document.form.book.value;
	
	var meta = document.form.meta.selectedIndex;
	var volume = document.form.volume.selectedIndex;
	var vagga = document.form.vagga.selectedIndex;
	var sutta = document.form.sutta.selectedIndex;
	var section = document.form.section.selectedIndex;
	var u = xmlDoc.getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	var z = y[section].getElementsByTagName("p");

	//titles

	var nikaya = document.form.nik.value;
	var vn = u[meta].getElementsByTagName("h0n");
	var wn = v[volume].getElementsByTagName("h1n");
	var xn = w[vagga].getElementsByTagName("h2n");
	var yn = x[sutta].getElementsByTagName("h3n");
	var zn = y[section].getElementsByTagName("h4n");
	var vna = vn[0].childNodes[0].nodeValue;
	var wna = wn[0].childNodes[0].nodeValue;
	var xna = xn[0].childNodes[0].nodeValue;
	var yna = yn[0].childNodes[0].nodeValue;
	var zna = zn[0].childNodes[0].nodeValue;

	convtitle(nikaya,book,vna,wna,xna,yna,zna);
	
	var theData = "";
	
	document.getElementById('mafb').innerHTML = '';


	for (tmp = 0; tmp < z.length; tmp++)
	{
		theData = z[tmp].childNodes[0].nodeValue;
		theData = theData.replace(/\^b\^/g, ' <b> ');
		theData = theData.replace(/\^eb\^/g, ' </b> ');
		theData = theData.replace(/\^a\^/g, '<!--');
		theData = theData.replace(/\^ea\^/g, '-->');
		document.getElementById('mafb').innerHTML += '<p>' + theData + '</p>';  // ---------- return output ----------
	}

	document.getElementById('maf').scrollTop = 0; // horizontal and vertical scroll targets
}


function xmlrefget()
{
	var mark = document.form.selref.value;

	var bookload = 'marks/' + mark + '.xml';
	xmlDoc.async = false;
	xmlDoc.load(bookload);

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var precode = xmlDoc.getElementsByTagName("xml"); 	
	var lumpcode = precode[0].childNodes[0].nodeValue;
	var codea = lumpcode.split(',');
	var nik = codea[0];
	var book = codea[1];
	var sutta = codea[2];
	var sect = codea[3];
	document.form.nik.selectedIndex = nik
	changenikaya(1);
	document.form.book.selectedIndex = book;
	if (document.form.nik.value == 'k') kudpreXML(1);
	else gettitles(0,1);
	document.form.sutta.selectedIndex = sutta;
	gettitles(1,1);
	document.form.section.selectedIndex = sect;
	importXML();
}

var setplace = new Array();

function getplace(temp) { // standard function to get a place from an array 0=nik,1=book,2=meta,3=vol,4=vagga,5=sutta,6=section,7=hier

	setplace = temp;

	switchhier(setplace[7],1);

	var sp0 = setplace[0];
	var nikaya = document.form.nik[sp0].value;
	document.form.nik.selectedIndex = sp0;

	var nik = document.form.nik.value;
	var booknumber = setplace[1];
	if (nikvoladi[nik]) {document.getElementById('book').innerHTML=nikvoladi[nik]; }
	
	else { document.getElementById('book').innerHTML=nikvoladi[nik+hier]; }
	
	document.form.book.selectedIndex = setplace[1];
	var book = document.form.book.value;

	var bookload = 'xml/' + nikaya + book + hier + '.xml';

	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", bookload, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var uname = new Array();
	var vname = new Array();
	var xname = new Array();
	var yname = new Array();

	var unamea = 0;
	var vnamea = 0;
	var xnamea = 0;
	var ynamea = 0;
	
	var meta = setplace[2];
	var volume = setplace[3];
	var vagga = setplace[4];
	var sutta = setplace[5];	
	var section = setplace[6];	

	var metalist = '';
	var volumelist = '';
	var vaggalist = '';
	var suttalist = '';
	var sectionlist = '';

	var t = xmlDoc.getElementsByTagName("ha");
	var tname = t[0].getElementsByTagName("han");
	if (tname[0].childNodes[0]) var tnamea = tname[0].childNodes[0].nodeValue; else tnamea = unnamed;
	var countt = tnamea;

	var maxlength = 15;  // change for display purposes

	countt = countt.replace(/aa/g, 'a');
	countt = countt.replace(/ii/g, 'i');
	countt = countt.replace(/uu/g, 'u');
	countt = countt.replace(/\./g, '');
	countt = countt.replace(/\~/g, '');
	countt = countt.replace(/\"/g, '');

	var difft = tnamea.length - countt.length;

	if (countt.length > maxlength + 3) 
	{
	tnamea = tnamea.substring(0,maxlength+difft);
	tnamea += '...';
	}
	tnamea = replaceunistandard(tnamea);
	document.getElementById('title').innerHTML = '<input type="button" onclick="importXMLindex();" value="' + translit(tnamea) + '" title="click to return to index">';
		
	var u = xmlDoc.getElementsByTagName("h0");
	var v = u[meta].getElementsByTagName("h1");
	var w = v[volume].getElementsByTagName("h2");
	var x = w[vagga].getElementsByTagName("h3");
	var y = x[sutta].getElementsByTagName("h4");
	
	var ap = 0;
	var bp = 0;
	var countu = '';
	var countv = '';
	var countx = '';
	var county = '';
	
	// meta

	for (var a = 0; a < u.length; a++)
	{
		ap = a + 1;
		uname = u[a].getElementsByTagName("h0n");
		if (uname[0].childNodes[0]) unamea = uname[0].childNodes[0].nodeValue; else unamea = unnamed;
		countu = unamea;
		countu = countu.replace(/aa/g, 'a');
		countu = countu.replace(/ii/g, 'i');
		countu = countu.replace(/uu/g, 'u');
		countu = countu.replace(/\./g, '');
		countu = countu.replace(/\~/g, '');
		countu = countu.replace(/\"/g, '');
		
		var diffu = unamea.length - countu.length;
		
		if (countu.length > maxlength + 3) 
		{
			unamea = unamea.substring(0,maxlength+diffu);
			unamea += '...';
		}
		unamea = replaceunistandard(unamea);

		metalist += '<option';
		if (a == meta) metalist += ' selected';
		metalist += '>' + translit(unamea) + '</option>'
	}
	if (ap == 1 && (unamea == ' ' || unamea == unnamed)) {
		metalist = '<select size="1" name="meta" class="hide">' + metalist;

	}
	else {
		metalist = '<select size="1" name="meta" onChange="gettitles(6)">' + metalist;

	}	
	metalist += '</select>'
	document.getElementById('meta').innerHTML=metalist;

	// volume

	for (var a = 0; a < v.length; a++)
	{
		ap = a + 1;
		vname = v[a].getElementsByTagName("h1n");
		if (vname[0].childNodes[0]) vnamea = vname[0].childNodes[0].nodeValue; else vnamea = unnamed;
		countv = vnamea;
		countv = countv.replace(/aa/g, 'a');
		countv = countv.replace(/ii/g, 'i');
		countv = countv.replace(/uu/g, 'u');
		countv = countv.replace(/\./g, '');
		countv = countv.replace(/\~/g, '');
		countv = countv.replace(/\"/g, '');
		
		var diffv = vnamea.length - countv.length;
		
		if (countv.length > maxlength + 3) 
		{
			vnamea = vnamea.substring(0,maxlength+diffv);
			vnamea += '...';
		}
		vnamea = replaceunistandard(vnamea);

		volumelist += '<option';
		if (a == volume) volumelist += ' selected';
		volumelist += '>' + translit(vnamea) + '</option>'
	}
	if (ap == 1 && (vnamea == ' ' || vnamea == unnamed)) {
		volumelist = '<select size="1" name="volume" class="hide">' + volumelist;

	}
	else {
		volumelist = '<select size="1" name="volume" onChange="gettitles(5)">' + volumelist;

	}	
	volumelist += '</select>'
	document.getElementById('volume').innerHTML=volumelist;

	// vagga

	for (var a = 0; a < w.length; a++)
	{
		ap = a + 1;
		wname = w[a].getElementsByTagName("h2n");
		if (wname[0].childNodes[0]) wnamea = wname[0].childNodes[0].nodeValue; else wnamea = unnamed;
		countw = wnamea;
		countw = countw.replace(/aa/g, 'a');
		countw = countw.replace(/ii/g, 'i');
		countw = countw.replace(/uu/g, 'u');
		countw = countw.replace(/\./g, '');
		countw = countw.replace(/\~/g, '');
		countw = countw.replace(/\"/g, '');
		
		var diffw = wnamea.length - countw.length;
		
		if (countw.length > maxlength + 3) 
		{
			wnamea = wnamea.substring(0,maxlength+diffw);
			wnamea += '...';
		}
		wnamea = replaceunistandard(wnamea);

		vaggalist += '<option';
		if (a == vagga) vaggalist += ' selected';
		vaggalist += '>' + translit(wnamea) + '</option>'
	}
	if (ap == 1 && (wnamea == ' ' || wnamea == unnamed)) {
		vaggalist = '<select size="1" name="vagga" class="hide">' + vaggalist;

	}
	else {
		vaggalist = '<select size="1" name="vagga" onChange="gettitles(4)">' + vaggalist;


	}
	vaggalist += '</select>'
	document.getElementById('vagga').innerHTML=vaggalist;

	// sutta

	for (var a = 0; a < x.length; a++)
	{
		ap = a + 1;
		xname = x[a].getElementsByTagName("h3n");
		if (xname[0].childNodes[0]) xnamea = xname[0].childNodes[0].nodeValue; else xnamea = unnamed;
		countx = xnamea;
		countx = countx.replace(/aa/g, 'a');
		countx = countx.replace(/ii/g, 'i');
		countx = countx.replace(/uu/g, 'u');
		countx = countx.replace(/\./g, '');
		countx = countx.replace(/\~/g, '');
		countx = countx.replace(/\"/g, '');
		
		var diffx = xnamea.length - countx.length;
		
		if (countx.length > maxlength + 3) 
		{
			xnamea = xnamea.substring(0,maxlength+diffx);
			xnamea += '...';
		}
		xnamea = replaceunistandard(xnamea);

	
		suttalist += '<option';
		if (a == sutta) suttalist += ' selected';
		suttalist += '>' + translit(xnamea) + '</option>'
	}
	if (ap == 1 && (xnamea == ' ' || xnamea == unnamed)) {
		suttalist = '<select size="1" name="sutta" class="hide">' + suttalist;

	}
	else {
		suttalist = '<select size="1" name="sutta" onChange="gettitles(3)">' + suttalist;
	}
	suttalist += '</select>'
	document.getElementById('sutta').innerHTML=suttalist;

	// section

	for (var d = 0; d < y.length; d++)
	{
		bp = d + 1;
		yname = y[d].getElementsByTagName("h4n");
		if (yname[0].childNodes[0]) ynamea = yname[0].childNodes[0].nodeValue; else ynamea = unnamed;
		
			county = ynamea;
			county = county.replace(/aa/g, 'a');
			county = county.replace(/ii/g, 'i');
			county = county.replace(/uu/g, 'u');
			county = county.replace(/\./g, '');
			county = county.replace(/\~/g, '');
			county = county.replace(/\"/g, '');
			
			var diffy = ynamea.length - county.length;
			
			if (county.length > maxlength+3) 
			{
				ynamea = ynamea.substring(0,maxlength+diffy);
				ynamea += '...';
			}
			
			ynamea = replaceunistandard(ynamea);

	
		sectionlist += '<option';
		if (d == section) sectionlist += ' selected';
		sectionlist += '>' + translit(ynamea) + '</option>';
	}
	if (bp == 1 && (ynamea == ' ' || ynamea == unnamed)) {
		sectionlist = '<select size="1" name="section" class="hide">' + sectionlist;

	}
	else {
		sectionlist = '<select size="1" name="section" onChange="importXML()">' + sectionlist;
	}

	sectionlist += '</select>'
	document.getElementById('section').innerHTML=sectionlist
        
	setplace = new Array();
	setplace.length = 0;
}


function helpXML(file)
{
	if (!file) file = 'help.xml';
	moves(0);
	if(moveat == 3) { moveframex(2); }
	
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", file, false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var outputit = '';
	document.getElementById('mafb').setAttribute('align','justify');
	document.getElementById('mafb').innerHTML = '';
	var data = xmlDoc.getElementsByTagName('data')
	for (ippp in data) {
		if(data[ippp].childNodes) outputit += data[ippp].childNodes[0].nodeValue;
	}		
	document.getElementById('mafb').innerHTML = outputit;
    document.getElementById('maf').scrollTop = 0;
}


function getatt(num,type) { // get atthakatha or tika word 
    moveframex(2);
    if(type == 'a') {
		var word = attlist[num].split('#')[0];
		var loc = attlist[num].substring(attlist[num].indexOf('#')+1);
	}
	else {
		var word = tiklist[num].split('#')[0];
		var loc = tiklist[num].substring(tiklist[num].indexOf('#')+1);
	}
    var loca = loc.split('#');
	document.getElementById('mafb').innerHTML='<div align=center><br><h1><img src="images/ajax-loader.gif" /> please wait...</h1></div>';
    var finout = '';
    for (i in loca) {
        var pca = loca[i].split('^');
        var nikaya = pca[0];
        var book = pca[1];
        
        var bookload = 'xml/' + nikaya + book + type + '.xml';

        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET", bookload, false);
        xmlhttp.send(null);
        var xmlDoc = xmlhttp.responseXML.documentElement;

        var meta = pca[2];
        var volume = pca[3];
        var vagga = pca[4];
        var sutta = pca[5];	
        var section = pca[6];	
        var para = pca[7];	

        var metalist = '';
        var volumelist = '';
        var vaggalist = '';
        var suttalist = '';
        var sectionlist = '';
        
        if (nikaya == 'k') {
			book = knames[book];
			 pca[1] = kudvala['k'+(pca[1])];
		}
		else pca[1] = parseInt(pca[1])-1;
        var placen = nikname[nikaya] + ' ' + book;

        var u = xmlDoc.getElementsByTagName("h0");
        if (u.length > 1) placen += '.' + (parseInt(meta)+1);
        var v = u[meta].getElementsByTagName("h1");
        if (v.length > 1) placen += '.' + (parseInt(volume)+1);
        var w = v[volume].getElementsByTagName("h2");
        if (w.length > 1) placen += '.' + (parseInt(vagga)+1);
        var x = w[vagga].getElementsByTagName("h3");
        if (x.length > 1) placen += '.' + (parseInt(sutta)+1);
        var y = x[sutta].getElementsByTagName("h4");
        if (y.length > 1) placen += '.' + (parseInt(section)+1);
        var z = y[section].getElementsByTagName("p")[para].childNodes[0].nodeValue.substring(4);
        
        var wordr = new RegExp('\\^b\\^\([^a-zA-Z\\.~^]*' + word + '[^a-zA-Z^]*\)\\^eb\\^','gi');
        var wordr2 = new RegExp('\\^b\\^[^a-zA-Z\\.~^]*' + word + '[^a-zA-Z^]*\\^eb\\^','gi');
        z = z.replace(wordr, "<c0><@>$1</@><xc>");
        
        placen += ' Para. ' + (parseInt(para)+1);
        finout += '<p><input type="button" onclick="getplace([\''+niknumber[nikaya]+'\',\''+(parseInt(pca[1]))+'\',\''+pca[2]+'\',\''+pca[3]+'\',\''+pca[4]+'\',\''+pca[5]+'\',\''+pca[6]+'\',\''+type+'\']); importXML(['+wordr2+'],'+pca[7]+')" value="'+placen+'" /> '+preparepali(z,1)[0]+'</p>';
    }
    document.getElementById('mafb').innerHTML = '<b style="text-size:'+(parseInt(colorcfg['colsize'])*2)+'px">'+replaceunistandard(word)+'</b> in the '+(type == 'a' ? 'Aṭṭhakathā:' : 'Ṭīka:');
    document.getElementById('mafb').innerHTML += finout;
    document.getElementById('maf').scrollTop = 0;
}
 
