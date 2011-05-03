// Tipue 2.1.1
//
//Tipue Copyright (C) 2002-2005 Tri-State Consultants
//Tipue is released under the GNU General Public License


// ---------- script properties ----------


var results_location = 'resultsv.html';
var results_per_page = 100;
var include_num = 0;
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
var s_8 = '<p>Irregular';



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
var summum = fo.length;
for (var bonum = 0; bonum < summum; bonum++)
{
	for (var bon2 = 0; bon2 < 12; bon2++)
	{
		fo[bonum] = fo[bonum].replace(',' , '.');
	}

}

var stem = fo[1];
var type = fo[3];
var decls = fo[5];
var word = fo[7];
var maa = 0;
var mai = 0;
var mau = 0;
var mii = 0;
var muu = 0;
var nta = 0;
var nti = 0;
var ntu = 0;
var faa = 0;
var fei = 0;
var feu = 0;
var fii = 0;
var fuu = 0;



for (var bon2 = 0; bon2 < word.length; bon2++)
{
	word = word.replace(',' , '.');
	word = word.replace('aa', '&#257;');
	word = word.replace('ii', '&#299;');
	word = word.replace('uu', '&#363;');
	word = word.replace('.t', '&#7789;');
	word = word.replace('.d', '&#7693;');
	word = word.replace('.n', '&#7751;');
	word = word.replace('"n', '&#7749;');
	word = word.replace('.m', '&#7745;');
	word = word.replace('~n', '&ntilde;');
	word = word.replace('.l', '&#7735;');

}


for (var bon2 = 0; bon2 < stem.length; bon2++)
{
	stem = stem.replace(',' , '.');
	stem = stem.replace('aa', '&#257;');
	stem = stem.replace('ii', '&#299;');
	stem = stem.replace('uu', '&#363;');
	stem = stem.replace('.t', '&#7789;');
	stem = stem.replace('.d', '&#7693;');
	stem = stem.replace('.n', '&#7751;');
	stem = stem.replace('"n', '&#7749;');
	stem = stem.replace('.m', '&#7745;');
	stem = stem.replace('~n', '&ntilde;');
	stem = stem.replace('.l', '&#7735;');	
}



// ---------- External references ----------

function tip_out()
{
	var dsp = decls.split(';')
	for (var dcnt = 0; dcnt < dsp.length; dcnt++)
	{
		if (dsp[dcnt] == 'm.a') maa=1;
		if (dsp[dcnt] == 'm.i') mai=1;
		if (dsp[dcnt] == 'm.u') mau=1;
		if (dsp[dcnt] == 'm.ii') mii=1;
		if (dsp[dcnt] == 'm.uu') muu=1;
		if (dsp[dcnt] == 'nt.a') nta=1;
		if (dsp[dcnt] == 'nt.i') nti=1;
		if (dsp[dcnt] == 'nt.u') ntu=1;
		if (dsp[dcnt] == 'f.aa') faa=1;
		if (dsp[dcnt] == 'f.i') fei=1;
		if (dsp[dcnt] == 'f.u') feu=1;
		if (dsp[dcnt] == 'f.ii') fii=1;
		if (dsp[dcnt] == 'f.uu') fuu=1;
		if (dsp[dcnt] == 'adj.a') adja=1; 
		if (dsp[dcnt] == 'adj.i') adji=1;
		if (dsp[dcnt] == 'adj.u') adju=1;
		if (dsp[dcnt] == 'verb') verb=1;

		
	}
	if (maa == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (m. in <b>a</b>):<br><br><table border="1" cellpadding="10" cellspacing="0"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, 'o</td><td align="center" width="45%">', stem, '&#257;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'a&#7745;</td><td align="center" width="45%">', stem, 'e</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'ena</td><td align="center" width="45%">', stem, 'ehi, ', stem, 'ebhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'assa, ', stem, '&#257;ya</td><td align="center" width="45%">', stem, '&#257;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'asm&#257;, ', stem, 'amh&#257;, ', stem, '&#257;</td><td align="center" width="45%">', stem, 'ehi, ', stem, 'ebhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'assa</td><td align="center" width="45%">', stem, '&#257;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'asmi&#7745;, ', stem, 'amhi</td><td align="center" width="45%">', stem, 'esu</td></tr><tr><td align="center"><b>A</b></td><td align="center" width="45%">', stem, 'a</td><td align="center" width="45%">', stem, '&#257;</td></tr></table>');
  	}	
	else if (mai == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (m. in <b>i</b>):<br><br><table border="1" cellpadding="10" cellspacing="0"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, 'i</td><td align="center" width="45%">', stem, 'iyo,', stem, '&#299;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'i&#7745;</td><td align="center" width="45%">', stem, 'iyo,', stem, '&#299;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'in&#257;</td><td align="center" width="45%">', stem, '&#299;hi,', stem, '&#299;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'ino,', stem, 'issa</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'in&#257;,', stem, 'ism&#257;,', stem, 'imh&#257;</td><td align="center" width="45%">', stem, '&#299;hi,', stem, '&#299;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'ino,issa</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'ismi&#7745;,imhi</td><td align="center" width="45%">', stem, '&#299;su</td></tr></table>');
	}
	else if (mau == 1)
	{
  document.write('<div align="center"><br>Declension of <b>', word, '</b> (m. in <b>u</b>):<br><br><table border="1" cellpadding="10" cellspacing="0"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, 'u</td><td align="center" width="45%">', stem, 'avo, ', stem, '&#363;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'u&#7745;</td><td align="center" width="45%">', stem, 'avo, ', stem, '&#363;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'un&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'uno</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'un&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'uno, ', stem, 'ussa</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'usmi&#7745;</td><td align="center" width="45%">', stem, '&#363;su</td></tr></table>');  
	}
	else if (mii == 1)
	{ 
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (m. in <b>&#299;</b>):<br><br><table border="1" cellpadding="10" cellspacing="0"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, '&#299;</td><td align="center" width="45%">', stem, 'ino</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'ina&#7745;</td><td align="center" width="45%">', stem, 'ino</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'in&#257;</td><td align="center" width="45%">', stem, '&#299;hi, ', stem, '&#299;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'ino</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'in&#257;</td><td align="center" width="45%">', stem, '&#299;hi, ', stem, '&#299;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'ino</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'ini</td><td align="center" width="45%">', stem, '&#299;su</td></tr><tr><td align="center"><b>A</b></td><td align="center" width="45%">', stem, 'i</td><td align="center" width="45%">', stem, 'ino;</td></tr></table>');
	}
	else if (muu == 1)
	{ 
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (m. in <b>&#363;</b>):<br><br><table border="1" cellpadding="10" cellspacing="0"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, '&#363;</td><td align="center" width="45%">', stem, 'uno, ', stem, '&#363;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'u&#7745;</td><td align="center" width="45%">', stem, 'uno, ', stem, '&#363;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'un&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'uno</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'un&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'uno, ', stem, 'ussa</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'usmi&#7745;</td><td align="center" width="45%">', stem, '&#363;su</td></tr><tr><td align="center"><b>A</b></td><td align="center" width="45%">', stem, 'u</td><td align="center" width="45%">', stem, 'uno, ', stem, '&#363;</td></tr></table>'); 
	}
	else if (nta == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (nt. in <b>a</b>):<br><br><table border="1" cellpadding="10" cellspacing="0"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, 'a&#7745;</td><td align="center" width="45%">', stem, '&#257;ni</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'a&#7745;</td><td align="center" width="45%">', stem, '&#257;ni</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'ena</td><td align="center" width="45%">', stem, 'ehi, ', stem, 'ebhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'assa, ', stem, '&#257;ya</td><td align="center" width="45%">', stem, '&#257;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'asm&#257;, ', stem, 'amh&#257;, ', stem, '&#257;</td><td align="center" width="45%">', stem, 'ehi, ', stem, 'ebhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'assa</td><td align="center" width="45%">', stem, '&#257;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'asmi&#7745;, ', stem, 'amhi</td><td align="center" width="45%">', stem, 'esu</td></tr><tr><td align="center"><b>A</b></td><td align="center" width="45%">', stem, 'a</td><td align="center" width="45%">', stem, '&#257;ni</td></tr></table>');
  	}	
	else if (nti == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (nt. in <b>i</b>):<br><br><table border="1" cellpadding="10" cellspacing="0"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, 'i, ', stem, 'i&#7745;</td><td align="center" width="45%">', stem, '&#299;ni, ', stem, '&#299;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'i, ', stem, 'i&#7745;</td><td align="center" width="45%">', stem, '&#299;ni, ', stem, '&#299;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'in&#257;</td><td align="center" width="45%">', stem, '&#299;hi, ', stem, '&#299;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'ino, ', stem, 'issa</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'in&#257;, ', stem, 'ism&#257;, ', stem, 'imh&#257;</td><td align="center" width="45%">', stem, '&#299;hi, ', stem, '&#299;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'ino,issa</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'ismi&#7745;,imhi</td><td align="center" width="45%">', stem, '&#299;su</td></tr></table>');
	}
	else if (ntu == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (nt. in <b>u</b>):<br><br><table border="1" cellpadding="10" cellspacing="0"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, 'u, ', stem, 'u&#7745;</td><td align="center" width="45%">', stem, '&#363;ni, ', stem, '&#363;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'u&#7745;</td><td align="center" width="45%">', stem, '&#363;ni, ', stem, '&#363;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'un&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'uno</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'un&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'uno, ', stem, 'ussa</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'usmi&#7745;</td><td align="center" width="45%">', stem, '&#363;su</td></tr></table>');  
	}
		else if (faa == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (f. in <b>&#257;</b>):<br><br><table border="1" cellpadding="10" cellspacing="0" id="table1"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, '&#257;</td><td align="center" width="45%">', stem, '&#257;yo, ', stem, '&#257;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'a&#7745;</td><td align="center" width="45%">', stem, '&#257;yo, ', stem, '&#257;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, '&#257;ya</td><td align="center" width="45%">', stem, '&#257;hi, ', stem, '&#257;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, '&#257;ya</td><td align="center" width="45%">', stem, '&#257;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, '&#257;ya</td><td align="center" width="45%">', stem, '&#257;hi, ', stem, '&#257;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, '&#257;ya</td><td align="center" width="45%">', stem, '&#257;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, '&#257;ya, ', stem, '&#257;ya&#7745;</td><td align="center" width="45%">', stem, '&#257;su</td></tr><tr><td align="center"><b>A</b></td><td align="center" width="45%">', stem, 'e</td><td align="center" width="45%">', stem, '&#257;yo, ', stem, '&#257;</td></tr></table>');
	}
	else if (fei == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (f. in <b>i</b>):<br><br><table border="1" cellpadding="10" cellspacing="0" id="table1"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, 'i</td><td align="center" width="45%">', stem, 'iyo, ', stem, '&#299;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'i&#7745;</td><td align="center" width="45%">', stem, 'iyo, ', stem, '&#299;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'iy&#257;</td><td align="center" width="45%">', stem, '&#299;hi, ', stem, '&#299;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'iy&#257;</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'iy&#257;</td><td align="center" width="45%">', stem, '&#299;hi, ', stem, '&#299;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'iy&#257;</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'iy&#257;, ', stem, 'iya&#7745;</td><td align="center" width="45%">', stem, '&#299;su</td></tr></table>'); 
	}
	else if (feu == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (f. in <b>u</b>):<br><br><table border="1" cellpadding="10" cellspacing="0" id="table1"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, 'u</td><td align="center" width="45%">', stem, 'uyo, ', stem, '&#363;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'u&#7745;</td><td align="center" width="45%">', stem, 'uyo, ', stem, '&#363;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'uy&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'uy&#257;</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'uy&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'uy&#257;</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'uy&#257;, ', stem, 'uya&#7745;</td><td align="center" width="45%">', stem, '&#363;su</td></tr></table>'); 
	}
	else if (fii == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (f. in <b>&#299;</b>):<br><br><table border="1" cellpadding="10" cellspacing="0" id="table1"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, '&#299;</td><td align="center" width="45%">', stem, 'iyo, ', stem, '&#299;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'i&#7745;</td><td align="center" width="45%">', stem, 'iyo, ', stem, '&#299;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'iy&#257;</td><td align="center" width="45%">', stem, '&#299;hi, ', stem, '&#299;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'iy&#257;</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'iy&#257;</td><td align="center" width="45%">', stem, '&#299;hi, ', stem, '&#299;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'iy&#257;</td><td align="center" width="45%">', stem, '&#299;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'iy&#257;, ', stem, 'iy&#7745;</td><td align="center" width="45%">', stem, '&#299;su</td></tr><tr><td align="center"><b>A</b></td><td align="center" width="45%">', stem, 'i</td><td align="center" width="45%">', stem, 'iyo, ', stem, '&#299;</td></tr></table>'); 
	}
	else if (fuu == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (f. in <b>&#363;</b>):<br><br><table border="1" cellpadding="10" cellspacing="0" id="table1"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>1</b></td><td align="center" width="45%">', stem, '&#363;</td><td align="center" width="45%">', stem, 'uyo, ', stem, '&#363;</td></tr><tr><td align="center"><b>2</b></td><td align="center" width="45%">', stem, 'u&#7745;</td><td align="center" width="45%">', stem, 'uyo, ', stem, '&#363;</td></tr><tr><td align="center"><b>3</b></td><td align="center" width="45%">', stem, 'uy&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>4</b></td><td align="center" width="45%">', stem, 'uy&#257;</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>5</b></td><td align="center" width="45%">', stem, 'uy&#257;</td><td align="center" width="45%">', stem, '&#363;hi, ', stem, '&#363;bhi</td></tr><tr><td align="center"><b>6</b></td><td align="center" width="45%">', stem, 'uy&#257;</td><td align="center" width="45%">', stem, '&#363;na&#7745;</td></tr><tr><td align="center"><b>7</b></td><td align="center" width="45%">', stem, 'uy&#257;, ', stem, 'uya&#7745;</td><td align="center" width="45%">', stem, '&#363;su</td></tr><tr><td align="center"><b>A</b></td><td align="center" width="45%">', stem, 'u</td><td align="center" width="45%">', stem, 'uyo, ', stem, '&#363;</td></tr></table>');
	}
		else if (verb == 1)
	{
		document.write('<div align="center"><br>Declension of <b>', word, '</b> (v., <b>pres.</b>):<br><br><table border="1" cellpadding="10" cellspacing="0" id="table1"><tr><td align="center">&nbsp;</td><td align="center" width="45%"><b>singular</b></td><td align="center" width="45%"><b>plural</b></td></tr><tr><td align="center"><b>3rd</b></td><td align="center" width="45%">', stem, 'ati</td><td align="center" width="45%">', stem, 'anti</td></tr><tr><td align="center"><b>2nd</b></td><td align="center" width="45%">', stem, 'asi</td><td align="center" width="45%">', stem, 'atha</td></tr><tr><td align="center"><b>1st</b></td><td align="center" width="45%">', stem, '&#257;mi</td><td align="center" width="45%">', stem, '&#257;mi</td></tr></table>');
	}
	else document.write('<br><font color="red">Sorry, no Inflection available yet. </font> code: ', dsp, ' ', ntu);
}

function tip_title()
{
document.write('<title>&quot;', word, '&quot;</title>')
}