// Tipue 2.1.1
//
//Tipue Copyright (C) 2002-2005 Tri-State Consultants
//Tipue is released under the GNU General Public License


// ---------- script properties ----------


var results_location = 'resultsi.html';
var results_per_page = 2000;
var include_num = 1;
var include_url = 0;
var bold_query = 1;
var bold_title = 0;
var bold_header = 1;
var bold_footer = 1;
var include_images = 0;
var image_height = 0;
var image_width = 0;


// ---------- string properties ----------


var s_1 = 'Your search did not match any documents.<p>Make sure all keywords are spelled correctly.<br>Try different or more general keywords.';
var s_2 = 'Previous';
var s_3 = 'Next';
var s_4 = 'to';
var s_5 = 'of';
var s_6 = 'for';
var s_7 = '<p>Search powered by open source <a href="http://www.tipue.com" target="_blank">Tipue</a>';
var s_8 = '<br>Irregular';



// ---------- end of properties ----------


var fo = new Array(0);
var tid = window.location.search;
tid = tid.substring(1, tid.length);
list = tid.split("&");
for (i=0; i <= list.length - 1; i++)
{
	fot = list[i].split("="); 
	fo.splice(fo.length, 2, fot[0], fot[1]);
}
for (i=0; i <= fo.length - 1; i++)
{
	fo[i] = fo[i].replace(/\+/g," ");
	fo[i] = unescape(fo[i]);
}
var dit = fo[1];
var tn = fo[3];
var sow = fo[5];
var od = dit;
var nr = results_per_page;
tn = parseInt(tn);
var nc = 0;
var nd = 0;
var tr = new Array();
var rt = new Array();
var co = 0;
var tm = 0;
var sso = new Array();
var ssoo = new Array();
var oos = new Array()

var nud = false;
if (dit == '' || dit == ' ') nud = true;




if (dit.charAt(0) == '"' && dit.charAt(dit.length - 1) == '"') tm = 1;
var rn = dit.search(/ or /i);
if (rn >= 0) tm = 2;
rn = dit.search(/-/i);
if (rn >= 0 && tm != 1)
{
	rn = dit.search(/ /i);
	if (rn != 0) dit = dit.replace(/-/gi, ' -');
}
rn = dit.search(/ not /i);
if (rn >= 0 && tm != 1) dit = dit.replace(/ not /gi, ' -');
rn = dit.search(/\+/i);
if (rn >= 0)
{
	rn = dit.search(/ /i);
	if (rn != 0) dit = dit.replace(/\+/gi, ' +');
}


//edit
var summum = 8
for (var bonum = 0; bonum < summum; bonum++)
	{
		dit = dit.replace('.' , ',');
	}
var summum = 8
for (var bonum = 0; bonum < summum; bonum++)
	{
		dit = dit.replace('?' , '.');
	}

if (tm == 0)
{
	if (sow == 'sow') dit = '^' + dit;
	if (sow == 'exm') dit = '^' +  dit + '\$';
	var woin = new Array();
	dit = dit.replace(/ and /gi, ' ');
	var wt = dit.split(' ');
	for (var a = 0; a < wt.length; a++)
	{
		woin[a] = 0;
		if (wt[a].charAt(0) == '-') woin[a] = 1;
	}
	for (var a = 0; a < wt.length; a++)
	{
		wt[a] = wt[a].replace(/^\-|^\+/gi, '');
	}
	a = 0;
	for (var c = 0; c < s.length; c++) {
		var es = s[c].split('^');
		var rk = 100;
		var pa = 0;
		var nh = 0;
		for (var i = 0; i < woin.length; i++)
		{
			if (woin[i] == 0)
			{
				nh++;
				var nt = 0;
				var pat = new RegExp(wt[i], 'i');
				rn = es[0].search(pat);
				if (rn >= 0)
				{
					rk = rk - 11;
					nt = 1;
				}
				if (nt == 1) pa++;
			}
			if (woin[i] == 1)
			{
				var pat = new RegExp(wt[i], 'i');
				rn = es[0].search(pat);
				if (rn >= 0) pa = 0;
			}
		}
		if (pa == nh)
		{
			tr[a] = '0^' + s[c];
			a++;
			sso[a - 1] = es[0];
		}
	}
	co = a;
}
if (tm == 1)
{
	dit = dit.replace(/"/gi, '');
	var a = 0;
	var pat = new RegExp(dit, 'i');
	for (var c = 0; c < s.length; c++)
	{
		var es = s[c].split('^');
		var rk = 100;
		rn = es[0].search(pat);
		if (rn >= 0)
		{
			rk = rk - 11;
		}
		if (rk < 100)
		{
			tr[a] = rk + '^' + s[c];
			a++;
			sso[a - 1] = es[0];
			ssoo[a - 1] = es[6];

		}
	}
	co = a;
}

if (tm == 2)
{
	dit = dit.replace(/ or /gi, ' ');
	var wt = dit.split(' ');
	var a = 0;
	for (var i = 0; i < wt.length; i++)
	{
		var pat = new RegExp(wt[i], 'i');
		for (var c = 0; c < s.length; c++)
		{
			var es = s[c].split('^');
			var rk = 100;
			var pa = 0;
			var rn = es[0].search(pat);
			if (rn >= 0)
			{
				rk = rk - 11;
				if (rn >= 0)
				{
					for (var e = 0; e < rt.length; e++) {
						if (s[c] == rt[e]) pa = 1;
					}
				}
			}
			if (rk < 100 && pa == 0)
			{
				rt[a] = s[c];
				tr[a] = rk + '^' + s[c];
				a++;
				co++;
				sso[a - 1] = es[0];
				ssoo[a - 1] = es[6];
			}
		}
	}
	tr.sort();
}


// ---------- External references ----------


function tip_query()
{
	if (od != 'undefined' && od != null) document.tip_Form.d.value = od;
}

function tip_header()
{
	if (co > 0)
	{
		var ne = nr + tn;
		if (ne > co) ne = co;
		//document.write('Results ', s_6 , ' ');
		document.write('Results ', tn + 1, ' ', s_4, ' ', ne, ' ', s_5, ' ', co, ' ', s_6 , ' ');

		if (bold_header == 1) document.write('<b>', od, '</b>'); else document.write(od);
	}
}

function tip_out()
{
	if (co == 0)
	{
		document.write(s_1);
		return;
	}
	if (tn + nr > co) nd = co; else nd = tn + nr;
	for (var a = tn; a < nd; a++)
	{
		var os = tr[a].split('^');

				//edit

		var ss = tr[a].split('^');
		var ddiv = tr[a].split('^');
		var wtr = wt;
		var sposma = 0;
		if (wtr[0].charAt(0) == '^') wtr[0] = wtr[0].slice(1);
		
		if (bold_query == 1 && tm == 0)
		{
			var wtr = wt;
			if (wtr[0].charAt(0) == '^') wtr[0] = wtr[0].slice(1);
			
			for (var i = 0; i < wtr.length; i++)
			{
				
				var lw = wtr[i].length;
				var tw = new RegExp(wtr[i], 'i');
				rn = os[1].search(tw);
				if (rn >= 0)
				{
					var o1 = os[1].slice(0, rn);
					var o2 = os[1].slice(rn, rn + lw);
					var o3 = os[1].slice(rn + lw);
					os[1] = o1 + '<b>' + o2 + '</b>' + o3; 
				}
			}
		}
		if (bold_query == 1 && tm == 1)
		{
			var lw = dit.length;
			var tw = new RegExp(dit, 'i');
			rn = os[1].search(tw);
			if (rn >= 0)
			{
				var o1 = os[1].slice(0, rn);
				var o2 = os[1].slice(rn, rn + lw);
				var o3 = os[1].slice(rn + lw);
				os[1] = o1 + '<b>' + o2 + '</b>' + o3;
			}
		}
		if (include_num == 1) document.write('<hr><p><font size="5">', a + 1, '. ', os[1], ' (', os[4], ')</font><br><br><i>', os[5], '</i><br>'); else document.write('<hr><p><font size="5">', os[1], ' (', os[4], ')</font><br><br><i>', os[5], '</i><br>');
		if (os[12] == 'N') 
		{
			if (os[7] == 'N')
			{
			document.write('<a href="resultsn.html?d=', ss[1], '&n=0&R1=exm">Irregular Noun</a>');
			}
			if (os[7] == 'V')
			{
			document.write('<a href="resultsv.html?d=', ss[1], '&n=0&R1=exm">Irregular Verb</a>');
			}

		}
		else
		{ 
			var summum = os.length;
			for (var bonum = 0; bonum < summum; bonum++)
			{
				for (var bon2 = 0; bon2 < summum; bon2++)
				{
					os[bonum] = os[bonum].replace(',' , '.');
				}
			}
			var spos = os[8].split('&comma;')
			for (var coos = 0; coos < spos.length; coos++)
			{
				if (spos[coos] == 'm.a')
				{
				sposma++;
				}
			}
			if (sposma > 0)
			{
				document.write('<br>Declension (m. in <b>a</b>):<br><table border="1" cellpadding="10" cellspacing="0" id="table1"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', os[11], 'o</td><td align="center" width="45%">', os[11], 'aa</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', os[11], 'a.m</td><td align="center" width="45%">', os[11], 'e</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', os[11], 'ena</td><td align="center" width="45%">', os[11], 'ehi, ', os[11], 'ebhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', os[11], 'assa</td><td align="center" width="45%">', os[11], 'aana.m</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', os[11], 'asmaa, ', os[11], 'amhaa, ', os[11], 'aa</td><td align="center" width="45%">', os[11], 'ehi, ', os[11], 'ebhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', os[11], 'assa</td><td align="center" width="45%">', os[11], 'aana.m</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', os[11], 'asmi.m, ', os[11], 'amhi, ', os[11], 'e</td><td align="center" width="45%">', os[11], 'esu</td></tr></table>');
			}
			else document.write('<br><font color="red">Sorry, no Inflection available yet.</font>')
		}
	}
		document.write('<hr><p>');
}

function tip_footer()
{	
	if (co > nr)
	{
		var np = Math.ceil(co / nr);
		nc = co - (tn + nr);
		if (tn > 0) var na = Math.ceil(tn / nr) + 1; else var na = 1;
			
		if (tn > 1) document.write('<a href="', results_location, '?d=', od, '&n=', tn - nr, '">', s_2, '</a> &nbsp;');
		if (np < 10)
		{
			for (var i = 0; i < np; i++)
			{
				var nb = nr * i;
				if (nb == tn)
				{
					if (bold_footer == 1) document.write('<b>', i + 1, '</b> &nbsp;'); else document.write(i + 1, ' &nbsp;');
				}
				else document.write('<a href="', results_location, '?d=', od, '&n=', nb, '">', i + 1, '</a> &nbsp;');
			}
		}
		if (np > 9)
		{
			if (na < 8)
			{
				for (var i = 0; i < 9; i++)
				{
					var nb = nr * i;
					if (nb == tn)
					{
						if (bold_footer == 1) document.write('<b>', i + 1, '</b> &nbsp;'); else document.write(i + 1, ' &nbsp;');
					}
					else document.write('<a href="', results_location, '?d=', od, '&n=', nb, '">', i + 1, '</a> &nbsp;');
				}
			}
			else
			{
				var ng = na - 5;
				if (np > ng + 9) var nf = ng + 9; else nf = np; 
				for (var i = ng; i < nf; i++)
				{
					var nb = nr * i;
					if (nb == tn)
					{
						if (bold_footer == 1) document.write('<b>', i + 1, '</b> &nbsp;'); else document.write(i + 1, ' &nbsp;');
					}
					else document.write('<a href="', results_location, '?d=', od, '&n=', nb, '">', i + 1, '</a> &nbsp;');
				}				
			}
		}
		if (nc > 0) document.write('<a href="', results_location, '?d=', od, '&n=', tn + nr, '">', s_3, '</a>');
	}
	document.write(s_7);
}
