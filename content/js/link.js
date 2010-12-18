var tr = new Array();  // the raw output
var checksum1 = 0; // variable for number of words in the input
var checksum2 = 0; // variable for number of words in the output

var multiple = 0;
var altadd = 0; // add curly or not
var lastcolour = 0;

var shortdefpre = new Array();
var shortdefpost = new Array();

function postout(dit,b)
{
	dit = replacevelstandard(dit);
	document.form.dictin.value=dit;
	document.form.lastsearch.value=dit;
	document.form.sped.selectedIndex=0;
	document.getElementById('anfs').innerHTML = '';

	var fcx = 0;
	var cfx = 0;
	var fmx = 0;
	var mfx = 0;

	var aa = 0;
	var bb = 0;
	var cc =0;
	var dd = 0;
	var ddtip = 0;
	var findstop = 0;
	var wtpre = 0;
	var stopzero = 0;
	var stoptwo = 0;
	var mancheck = 0;
	var sdpv = 0;
	var s2 = 0;
	var i = 0;
	var mansp = new Array(); // arrays for manually adding
	var manadd = new Array(); //
	manadd["devamanussaana,m"] = 'deva#1#manussaana,m';
	manadd["ukkaasitasaddo"] = 'ukkaasita#1#saddo';
	manadd["yaava~ncida,m"] = 'yaava#1#~nc#1#ida,m';
	var indeclinable = new Array();
	indeclinable["na"] = 1;

	var addsuf = 0;
	var cutsuff = "";
	var remembersuf = "";
	var dictsuf = '';

	var specsuf = new Array(); // once there is no match, we will cut off some suffixes and try again.
	specsuf["~nca"] = '5832^\'ca^3^0^2^and; then; now,xxxcopulative or disjunctive particle#2#ca';
	specsuf["iiti"] = '3125^\'iti^3^0^2^thus, (used to point out something just mentioned or about to be mentioned&comma; and to show that a sentence is finished), Very often its former i is elided and ti only is remaining,xxxind,#3#iti';

	specsuf["pi"] = '2/2866^\'pi^3^0^2^(the enclitic form of api,) also: and also; even so; but; however; probably; perhaps,xxxind,#2#pi';
	specsuf["~nhi"] = '4/1234^\'hi^3^0^2^because; indeed,xxxind,#2#hi';
	specsuf["va"] = '3/1047^\'va^3^0^2^(emphatic particle)&comma; only,xxxind,#2#eva';
	specsuf["eva"] = '0/4338^\'eva^3^0^2^(emphatic particle)&comma; only,xxxind,#3#eva';
	specsuf["idha"] = '0/3208^\'idha^3^0^2^here; in this world or existence,xxxadv,#4#idha';

	// ------------- variables for matching declensions -----------------------------

	var cwt = new Array(); //  alternatives below
	var wtr = new Array(); // alternatives below

	// compound variables

	var comps = new Array(); //compound split
	var comppart = new Array(); //compound split tr output
	var compcountparts = 0; // for compounds inside of compounds
	var compcparray = new Array(); // parts of compounds inside of compounds
	var comppartraw = new Array(); // parts of compound wanting to add tr in comppart (use for moving back and forth)
	var compsn = new Array(); //special for numbers z1 - 6
	var speccomp = 0; // special compound words
	var con = 0; //yes, this is a compound (or we think it is, anyway :) )
	var confound = 0;
	var compcount = 0;
	var compdouble = 0;
	var compnumbertemp = 0;
	var confirst = 0; // signifies first part of compound
	var jj = 0;
	var jjj = 0;
	var jjparray = new Array();  // adding special ` for prefix
	var jjprefixa = 0;
	var jjp2 = 0;
	var compprefixa = 0;
	var conchoice = new Array();// array for various choices
	var ccvar = 0;
	var constop = 0;
	var conhalt = 0;
	var conyut = 0;
	var arraysuf = new Array();
	var ctemp2 = 0;
	var complastmatch = 0;

	var ycout = new Array(); // disallowed compound words
	ycout["va"] = 1;
	ycout["ya"] = 1;
	ycout["da"] = 1;
	ycout["hi"] = 1;
	ycout["ha"] = 1;
	ycout["ma"] = 1;
	ycout["la"] = 1;
	ycout["nu"] = 1;
//	ycout["na"] = 1;
	ycout["saa"] = 1;
	ycout["saz1"] = 1;
	ycout["saz2"] = 1;


	// intermediate variables

	var wtwt = '';
	var wtxac = 0;	
	var wtnum = 0;	
	var wtalt = 0;
	var wtaln = 0;
	var wtanm = 0;
	var wttip = 0;

	//number matching variables (because PED has multiple matches for words like buddha)

	var wtn = new Array();
	wtn[0] = "z1";	
	wtn[1] = "z2";
	wtn[2] = "z3";
	wtn[3] = "z4";
	wtn[4] = "z5";				
	wtn[5] = "z6";

	// proper name matching variables - all DPPN results have been given an f# ending to differentiate

	var wtp = new Array();
	wtp[0] = "f1";	
	wtp[1] = "f2";
	wtp[2] = "f3";
	wtp[3] = "f4";
	wtp[4] = "f5";				
	wtp[5] = "f6";
	wtp[6] = "f7";				
	wtp[7] = "f8";

	var mancheck = 0;

	var altcheck = 0;

	var curly = 0;

	var wt = '';
	
	var cdoubled = new Array(); // check for consonant doubling

// -----------------------------------   Main Function   ----------------------------


	
	//var framezero = top.document.getElementById('fs3').rows.split(',')[0];
	//if (parent.inFrame.document.getElementById('autoalg').checked != true && framezero == '0') parent.inFrame.movexspec(0,'*');
	if (document.getElementById(b))
	{
		if (document.getElementById(lastcolour))
		{
			document.getElementById(lastcolour).style.color = colorcfg['coltext'];
			document.getElementById(lastcolour).style.fontWeight = 'normal';
		}
		document.getElementById(b).style.color = colorcfg['colsel'];
		document.getElementById(b).style.fontWeight = 'bold';
		lastcolour = b;
	}
	var ditm = dit.replace(/\u00B4/g, '"');
	document.form.manual.value = ditm; // add to search box for editing

	shortdefpre = new Array();
	shortdefpost = new Array();
	aa = 0;
	bb = 0;
	cc =0;
	dd = 0;
	ddtip = 0;
	findstop = 0;
	wtpre = 0;
	stopzero = 0;
	stoptwo = 0;
	mancheck = 0;
	sdpv = 0;
	s2 = 0;
	checksum1 = 0;
	checksum2 = 0;
	
	mansp = new Array(); // arrays for manually adding
	manadd = new Array(); //
	manadd["devamanussaana,m"] = 'deva#1#manussaana,m';
	manadd["ukkaasitasaddo"] = 'ukkaasita#1#saddo';
	manadd["yaava~ncida,m"] = 'yaava#1#~nc#1#ida,m';
	indeclinable = new Array();
	indeclinable["na"] = 1;
	
	addsuf = 0;
	cutsuff = "";
	remembersuf = "";
	dictsuf = '';
	
	specsuf = new Array(); // once there is no match, we will cut off some suffixes and try again.
	specsuf["~nca"] = '1/1501^\'ca^3^0^2^and; then; now,xxxcopulative or disjunctive particle#2#ca';
	specsuf["iiti"] = '0/3190^\'iti^3^0^2^thus, (used to point out something just mentioned or about to be mentioned&comma; and to show that a sentence is finished), Very often its former i is elided and ti only is remaining,xxxind,#3#iti';
	
	specsuf["pi"] = '2/2866^\'pi^3^0^2^(the enclitic form of api,) also: and also; even so; but; however; probably; perhaps,xxxind,#2#pi';
	specsuf["~nhi"] = '4/1234^\'hi^3^0^2^because; indeed,xxxind,#2#hi';
	specsuf["va"] = '3/1047^\'va^3^0^2^(emphatic particle)&comma; only,xxxind,#2#eva';
	specsuf["eva"] = '0/4338^\'eva^3^0^2^(emphatic particle)&comma; only,xxxind,#3#eva';
	specsuf["idha"] = '0/3208^\'idha^3^0^2^here; in this world or existence,xxxadv,#4#idha';
	
// ------------- variables for matching declensions -----------------------------

	cwt = new Array(); //  alternatives below
	wtr = new Array(); // alternatives below

// compound variables

	comps = new Array(); //compound split
	comppart = new Array(); //compound split tr output
	compcountparts = 0; // for compounds inside of compounds
	compcparray = new Array(); // parts of compounds inside of compounds
	comppartraw = new Array(); // what's left after cutting off comp (use for moving between sub compound levels)
	compsn = new Array(); //special for numbers z1 - 6
	speccomp = 0; // special compound words
	con = 0; //yes, this is a compound (or we think it is, anyway :) )
	confound = 0;
	compcount = 0;
	compdouble = 0;
	compnumbertemp = 0;
	confirst = 0; // signifies first part of compound
	jj = 0;
	jjj = 0;
	jjparray = new Array();  // adding special ` for prefix
	jjprefixa = 0;
	jjp2 = 0;
	compprefixa = 0;
	conchoice = new Array();// array for various choices
	cc= 0;
	constop = 0;
	conhalt = 0;
	conyut = 0;
	arraysuf = new Array();
	ctemp2 = 0;
	complastmatch = 0;
	
	
// intermediate variables

	wtwt = '';
	wtxac = 0;	
	wtnum = 0;	
	wtalt = 0;
	wtaln = 0;
	wtanm = 0;
	wttip = 0;

//number matching variables (because PED has multiple matches for words like buddha)

	wtn = new Array();
	wtn[0] = "z1";	
	wtn[1] = "z2";
	wtn[2] = "z3";
	wtn[3] = "z4";
	wtn[4] = "z5";				
	wtn[5] = "z6";

// proper name matching variables - all DPPN results have been given an f# ending to differentiate

	wtp = new Array();
	wtp[0] = "f1";	
	wtp[1] = "f2";
	wtp[2] = "f3";
	wtp[3] = "f4";
	wtp[4] = "f5";				
	wtp[5] = "f6";
	wtp[6] = "f7";				
	wtp[7] = "f8";


// --------------------------- start main function  ---------------------------------


	// ---------- housekeeping ----------
	
	dit = dit.replace(/\u00B7/g, '\'');
	dit = dit.replace(/\u00B4/g, '\"');
	dit = dit.replace(/aa\'\'ti/g, 'a (a)\'ti');
	dit = dit.replace(/ii\'\'ti/g, 'i (i)\'ti');	
	dit = dit.replace(/uu\'\'ti/g, 'u (u)\'ti');	
	dit = dit.replace(/aa\'ti/g, 'a (a)\'ti');
	dit = dit.replace(/ii\'ti/g, 'i (i)\'ti');	
	dit = dit.replace(/uu\'ti/g, 'u (u)\'ti');
	dit = dit.replace(/\'\'\'/g, ' \' ');
	dit = dit.replace(/\'\'/g, ' \' ');
	dit = dit.replace(/\,/g, ' q '); 
	dit = dit.replace(/{/g, ' { ');
	dit = dit.replace(/}/g, ' } ');
	dit = dit.replace(/\.\./g, ' , ');
	dit = dit.replace(/\. /g, ' , ');
	dit = dit.replace(/\.$/g, ' , ');
	dit = dit.replace(/\.\.\./g, ' ...');
	dit = dit.replace(/\./g, ',');
	dit = dit.replace(/\?/g, ' ? ');
	dit = dit.replace(/\;/g, ' ; ');
	dit = dit.replace(/\!/g, ' ! ');
	dit = dit.replace(/\"n/g, 'xn');
	dit = dit.replace(/\"/g, ' " ');
	dit = dit.replace(/\-\-/g, ' - ');
	dit = dit.replace(/\-/g, ' - ');
	dit = dit.replace(/\u201C/g, ' " ');
	dit = dit.replace(/\u201D/g, ' " ');
	dit = dit.replace(/\u2018/g, ' \' ');	
	dit = dit.replace(/\u2019/g, ' \' ');
	dit = dit.replace(/\u0060\u0060/g, ' \\ ');
	dit = dit.replace(/\u0060/g, ' \' ');
	dit = dit.replace(/\u2013/g, ' - ');
	dit = dit.replace(/\xn/g, '`n');
	dit = dit.replace(/A/g, 'a');
	dit = dit.replace(/B/g, 'b');
	dit = dit.replace(/C/g, 'c');
	dit = dit.replace(/D/g, 'd');
	dit = dit.replace(/E/g, 'e');
	dit = dit.replace(/G/g, 'g');
	dit = dit.replace(/H/g, 'h');
	dit = dit.replace(/I/g, 'i');
	dit = dit.replace(/J/g, 'j');
	dit = dit.replace(/K/g, 'k');
	dit = dit.replace(/L/g, 'l');
	dit = dit.replace(/M/g, 'm');
	dit = dit.replace(/N/g, 'n');
	dit = dit.replace(/O/g, 'o');
	dit = dit.replace(/P/g, 'p');
	dit = dit.replace(/R/g, 'r');
	dit = dit.replace(/S/g, 's');
	dit = dit.replace(/T/g, 't');
	dit = dit.replace(/U/g, 'u');
	dit = dit.replace(/V/g, 'v');
	dit = dit.replace(/Y/g, 'y');
	dit = dit.replace(/  +/g, ' ');
		
	// ---------- variables - I still do not understand where they should best go but here they are  ----------
	

	aa = 0;
	bb = 0;
	cc =0;
	dd = 0;
	ddtip = 0;
	jj = 0;
	jjj = 0;
	wtpre = '';
	tr = new Array();
	addsuf = 0;
	mancheck = 0;
	
	altcheck = 0;

	if (altcheck == true) altadd = 1;
	else altadd = 0;


	// compound variables

	comps = new Array(); //compound split
	compsn = new Array(); //special for numbers z1 - 6
	speccomp = 0; // special compound words
	con = 0; //yes, this is a compound (or we think it is, anyway :) )
	comppart = new Array();
	compcount = 0;
	conhalt = 0;
	ccvar = 0;
	
	// intermediate variables

	wtwt = '';
	wtxac = 0;	
	wtnum = 0;	
	wtalt = 0;
	wtaln = 0;
	wtanm = 0;
	wttip = 0;
	curly = 0;

	wt = dit.split(' '); // wt will be an array of each word, and we will make a loop to check each word (wt[i])for a match
	checksum1 = wt.length;
	
	for (i = 0; i < wt.length; i++)  // ---------- go through the input word by word ----------
	{
		addsuf = 0;
		ccvar = 0;
		wtpre = wt[i];
		compsn = new Array();
		con = 0;
		confirst = 0;
		confound = 0;
		conhalt = 0;
		conyut = 0;
		comppart.length = 0;
		comppart = new Array();
		conchoice = new Array();
		conchoice.length = 0;
		findstop = 0;
		stoptwo = 0;
		mancheck = 0;
		mfx = 0;
		fmx = 0;
		
		wtwt = wt[i];	// wtwt will be used for most of the code, not wt[i] - I'm not sure if this is still a necessary step, but it was when I started coding.
		//alert(wt[i] + ' ' + wtwt);
		

		if (wt[i].length > 1)  // ---------- dont waste time with periods and commas ----------
		{
			// ---------- Manual Add Routine ----------
			
			if (manadd[wtwt])
			{
				mansp = manadd[wtwt].split('#');
				for (var manr = 0; manr < mansp.length; manr++)
				{
					if (manr < mansp.length - 1)
					{
						mancheck = 1;
						comps = mansp[manr];
						manr++
						con = mansp[manr];
						compoundfound();
						//alert('one: ' + comppart);
						for (var ctemp = 0; ctemp < comppart.length; ctemp++)
						{
							if (comppart[ctemp])
							{
								tr[dd] = comppart[ctemp];
								dd++;
								comppart = new Array();
							}
							//alert(tr);
						}
					}
					else
					{
						wtwt = mansp[manr];
						findmatch();
						addresults();
					}
				}
			}
			else
			{
			
				cwt = new Array(); //  alternatives below
				wtr = new Array(); // alternatives below
				
				aa = 0;
				bb = 0;
				cc = 0;
				findmatch(); // run find function
				if (aa == 0 && bb == 0 && cc == 0) 
				{
					//alert ('fc');
					findcompound();// no match, so look for compounds
				}
				else { addresults(); }
			}
		}
		else
		{
			tr[dd] = '0^' + wt[i] + '^2^0';
			dd++;
			
		}
/*		else // for single digit words (punctuation)
		{
		tr[dd] = '0^' + wtwt + '^2^0';
		dd++;
		}
		*/
	}
	//alert(shortdefpost);
	//alert(tr);
	output(shortdefpost); // perform the function in linkout.js







// --------------------------- match finding function  ---------------------------------

	
	function findmatch()
	{
		fmx++;
		//document.getElementById('c').innerHTML = 'fc: ' + fcx + 'cf: ' + cfx + 'fm: ' + fmx + 'mf: ' + mfx;
		
		//alert('fm' + ' ' + wtwt);
		//alert(shortdefpre + ' 1');
		
		// ---------- create wtr variables for alternative stem matching ----------
		
		
		for (var k = 0; k < wtwt.length; k++) //define sub-cut for analysis (length-k,wt[i].length) and remaining string (0,length-k)
		{		
			cwt[k] = wtwt.substring(wtwt.length-k,wtwt.length);				
		}
		
		
		// ---------- stem matching and converting - note the wt doesnt change just we get alternatives ----------
		prcount = 0;
		wtr = new Array();
		
		for (var pr = 0;pr < prem.length; pr++)
		{
			preach = prem[pr].split('^');
			pra = preach[0]; // ending to replace
			prb = preach[1]; // size of old ending
			prc = preach[2]; // size of cut
			prd = preach[3]; // min. length for change
			pre = preach[4]; // new ending if any
			if (prd == 0) prd = 3;
			if (cwt[prb] == pra && wtwt.length > prd) 
			{
					
					if (pre)
					{
						wtr[prcount] = wtwt.substring(0, wtwt.length-prc) + pre;
						prcount++;
					}
					else
					{
						wtr[prcount] = wtwt.substring(0, wtwt.length-prc);
						prcount++;
					}
					if (wtr[prcount-1].charAt(wtr[prcount-1].length-1) == 'a' && wtr[prcount-1].charAt(wtr[prcount-1].length-2) != 'a')
					{
						wtr[prcount] = wtr[prcount-1] + 'a';
						prcount++;
					}
					else if (wtr[prcount-1].charAt(wtr[prcount-1].length-1) == 'u' && wtr[prcount-1].charAt(wtr[prcount-1].length-2) != 'u')
					{
						wtr[prcount] = wtr[prcount-1] + 'u';
						prcount++;
					}
					else if (wtr[prcount-1].charAt(wtr[prcount-1].length-1) == 'i' && wtr[prcount-1].charAt(wtr[prcount-1].length-2) != 'i')
					{
						wtr[prcount] = wtr[prcount-1] + 'i';
						prcount++;
					}					
					//////alert(wtr);
			}
			
		}
	

		
		
		res = new Array();
		resn = new Array();
	// exacts
	
	// exact maches
	
		if (mainda[wtwt] != null)
		{
			res[0] = mainda[wtwt]; 
			aa++

		}
		
		if (aa == 0) // no exact match, so we try exact matches that have a z# on the end
		{
			for (var a = 0; a < wtn.length; a++) // loop through z1 - z6
			{				
				wtxac = wtwt + wtn[a];
				if (mainda[wtxac] != null) 
				{
					res[aa] = mainda[wtxac];
					aa++;
				}
			}
		}
	
	// alts				
	
		if (aa == 0) 			// if still no match, we look at variants
		{				
			for (var b = 0; b < wtr.length; b++) // check throuhg wtr variants that we set at the beginning
			{			
				wtalt = wtr[b];
				if (mainda[wtalt] != null && indeclinable[wtalt] == null) 
				{
					
					res[aa] = mainda[wtalt];				
					aa++;
				}
			}
		}
			
		if (aa == 0) // if still no match, look for numbered variants
		{
			for (b = 0; b < wtr.length; b++) // b for alternative types wtr
			{							
				
					for (var c = 0; c < wtn.length; c++) // c for numbers one to six
					{				
						wtaln = wtr[b] + wtn[c];
	
						if (mainda[wtaln] != null) 
						{
							res[aa] = mainda[wtaln];
							aa++;
						}
					}
			}
		}
		
	// whether there is a match or not, we look for DPPN matches, because they are different from PED definitions
	
		bb = 0;
		for (var d = 0; d < wtp.length; d++)
		{				
			wtnum = wtwt + wtp[d]; // remember that we have added f# to the end of all DPPN entries.  Here we add it to come up with wtnum
			if (mainda[wtnum] != null && wtwt.length > 2) 
			{					
				resn[bb] = mainda[wtnum];
				bb++;
			}
		}
		
		if (bb == 0)
		{
			for (var b = 0; b < wtr.length; b++) // b for alternative types wtr
			{				
				for (var d = 0; d < wtp.length; d++)
				{				
					wtnum = wtr[b] + wtp[d];
					if (mainda[wtnum] != null && wtwt.length > 2) 
					{					
						resn[bb] = mainda[wtnum];
						bb++;
					}
				}
			}
		}
		
	// for tooltips, we don't yet care whether the PED has a match or not, but when we output, we will.
		
		cc = 0;
		resy = 0;
		wttip = wtwt;
		if (yt[wttip] != null) 
		{					
			resy = yt[wttip];
			cc++;
			shortdefpre[sdpv] = wttip; // for matching the dictionary entry in the output
			sdpv++;
		}
	
		
		if (cc == 0)
		{
			for (var b = 0; b < wtr.length; b++) // b for alternative types wtr
			{				
	
				wttip = wtr[b];
				
				if (yt[wttip] != null && cc == 0 && indeclinable[wttip] == null) 
				{					
					resy = yt[wttip];
					cc++;
					
					shortdefpre[sdpv] = wttip; // for matching the dictionary entry in the output
					sdpv++;
				}						
	
			}
		}
		
		if (aa == 0 && bb == 0 && cc == 0 && stoptwo != 1)
		{
			for (var tempsuf = 5; tempsuf > 0; tempsuf--)
			{
				cutsuf = wt[i].substring(wt[i].length - tempsuf);
				//
				if (specsuf[cutsuf]) // if it finds a special suffix as plugged in at the start
				{
					//alert(cutsuf);
					addsuf = 1;
					arraysuf = specsuf[cutsuf].split('#');
					remembersuf = arraysuf[0];
					dictsuf = arraysuf[2];
					wtwt = wt[i].substring(0,wt[i].length - arraysuf[1]);
					//alert(wtwt);
					compsn = new Array();
					con = 0;
					confirst = 0;
					confound = 0;
					comppart.length = 0;
					comppart = new Array();
					conchoice = new Array();
					conchoice.length = 0;
					ccvar = 0;
					cwt = new Array(); //  alternatives below
					wtr = new Array(); // alternatives below
					stoptwo = 1; // patches the error of double results
					findmatch(); // run find function
				}
			}			
		}
		
	}		



// --------------------------- compound finding function  (no match for entire word) ---------------------------------


	function findcompound()
	{
		//alert('checkno ' + checkno + 'test ' + comppart);
		fcx++;
		//document.getElementById('c').innerHTML = 'fc: ' + fcx + 'cf: ' + cfx + 'fm: ' + fmx + 'mf: ' + mfx;
		//document.getElementById('c').innerHTML += conchoice + 'wtwt: ' + wtwt + ' comppart: ' + comppart[0] + ' | ';
		//alert('fc' + wtwt);
		//////alert(conhalt);
		//alert(shortdefpre + ' clear');
		compsn = new Array();
		compsn.length = 0;
		con = 0;
		confound = 0;
		constop = 0;
		//alert('wtwt: ' + wtwt + ' comppart: ' + comppart[0]);
				
		for (var j = 1; j < wtwt.length; j++)
		{
			constop = 0;
			//if (confirst > 0) j++; // doesn't allow to find single letter words after the first part
			for (var h = 0; h < conchoice.length; h++) // loop for stopping repeat matches
			{
				//if (h == 0) alert(conchoice + ' ' + j);
				if (conchoice[h] == wtwt.substring(0,j) + compcountparts)
				{
					//alert('lengths: ' + wt[i].length + ',' + wtwt.length);
					//alert('out: ' + conchoice[h] + ' ' + wtwt.substring(0,j) + ' ' + compcountparts);
					constop = 1; 
				}
				/*if (conchoice[h] == wt[i].length - wtwt.length + j - 1)
				{
					complastmatch = 1; 
				}*/
			}
			////alert('pre1: ' + wtwt.substring(0,j));
			//if (confirst == 1 && j<3) constop = 1;
			if (constop != 1)
			{
				jjparray.length = 0;
				jj = wtwt.substring(0,j); // will find hetu in hetupaccaya at j = 4
				jjparray[0] = jj + '`'; // specifically prefixes
				//alert(jj + ' ' + j);
				////alert('pre2: ' + jj);
				
				if (jj.charAt(jj.length-1) == 'm' && complastmatch == 0)
				{
					jjparray[1] = jj.substring(0,jj.length-1);
					////alert(jjparray);
				}
				for (var v = 0; v < jjparray.length; v++)
				{
					var jjprefix = jjparray[v];
					if (mainda[jj]) // if PED match 
					{
						//alert(jj + ' ' + j);
						comps = jj; // will be 'hetu' in our example
		
						confound = j;
						con=1; // yes a match
						
						//if (jj == "su") constop = 1;
					}
					else if (mainda[jjprefix] && compcount < 1) // prefix match 
					{
						//alert(jj + ' ' + j);
						////alert(jjprefix);
						comps = jjprefix; // will be 'evam`' or 'eva'
						compsn = new Array();
						compsn[0] = jj;
						confound = j;
						con = 4; // yes a match
						//if (jj == "su") constop = 1;   apariyaadinna.m
						
					}
					
					if (confound != j)
					{
						ctempa = 0;
						for (var ctemp = 0; ctemp < wtn.length; ctemp++) // number match - loop through z1 - z6
						{				
							jjj = jj + wtn[ctemp];
							
							if (mainda[jjj] && !ycout[jjj]) 
							{
								//alert(jj + ' ' + j);
								
								////alert('1');
								compsn[ctempa] = jj;
								ctempa++;
								//alert(compsn);
								con = 3;
								comps = jj;
								confound = j;
								
								//if (jj == "su") constop = 1;
							}
						}
						if (confound != j && compcount < 1) // prefixes in the number items
						{
							ctempa = 0;
							for (var ctemp = 0; ctemp < wtn.length; ctemp++) // loop through z1 - z6
							{				
								jjj = jjprefix + wtn[ctemp];
								//document.getElementById('c').innerHTML += jjj + ' ' + confound + ' ' + (j-1) + ' | ';
								if (mainda[jjj] && !ycout[jjj]) // && confound != j-1 
								{
									//document.getElementById('c').innerHTML += ' yes | ';
									comps = jj;
									compsn[ctempa] = jjprefix;
									ctempa++;
									
									////alert(compsn);
									con = 3;
									confound = j;
									
									//if (jj == "su") constop = 1;
								}
							}
						}
					}
					if (confound != j)
					{
						
						if (yt[jj] != null && constop == 0) // if tooltip match only
						{
							////alert('noe' + confound + j);
							//////alert(ctemp);
							comps = jj;
							confound = j;
							con=2; // yes a tooltip only match
							//if (jj == "su") constop = 1;
						}
					}
					if (con > 0) v++;
				}
			}
		//if (comps == jj) alert('per: ' + comps + ' / ' + confound);	
		}
		//if (con == 1) alert('after: ' + comps + ' / ' + confound);
		if (confirst >= 1 && comps == 'aa') con = 0; // problem with aa in the middle
		confirst++;	// tells us this we've already gone through the loop once
		var wtleft = wtwt.substring(confound);
		
		//alert(con);
		if (con != 0) 
		{
			//////alert('wti' + wt[i].length);
			//////alert('wtwt' + wtwt.length);
		    ////alert(comps);
			conchoice[ccvar] = wtwt.substring(0,confound) + compcountparts; // take note of the recognized part to avoid repeats
			//alert('conchoice: ' + conchoice + ' ' + comps);
			ccvar++;
			
			//alert('conchoice: ' + conchoice + ' ' + comps);
			
			if (ycout[comps] || ycout[wtleft]) // check for disallowed words in compound
			{
				//alert(comps);
				con = 0;
				checkno = 1;
				findcompound(); 
			}
			else 
			{
				//alert(con);
				//alert(comps + ' ' + wtleft + ' ' + wtwt);
				compoundfound();
			}
		}		
		else 
		{
				conyut++;
				if (comppartraw.length > 0 && comppart.length > 0 && conyut < 100 && conhalt < 5)
				{
						wtwt = comppartraw[comppartraw.length-1];
						
						comppartraw.length--;
						comppart.length--;
						compcountparts--;// tells us we've finished with this subcompound e.g. maggappa,tipanno, and are going back to the previous subcompound (if any) or the whole word (if no subcompound).  this is for distinguishing the conchoices for each compound				
						if (shortdefpre.length > 0) shortdefpre.length--; sdpv--; // cut off the last tooltip
						//alert('test ' + comppart);
						checkno = 2;
						findcompound();
				}
				else
				{
					shortdefpre = new Array();
					shortdefpre.length=0;
					sdpv = 0;							
					if (mfx == 0) tr[dd] = '0^' + wt[i] + '^2^0'; dd++;

				}

		}
	}

// --------------------------- compound function  pt 2 ---------------------------------
						
	function compoundfound()
	{
		cfx++;
		//document.getElementById('c').innerHTML += 'cf ' + comps + ' wtwt ' + wtwt + ' con ' + con + '; ';
		
		comppartraw[comppartraw.length] = wtwt;
		//alert('cf' + comps + ' ' + wtwt + ' ' + con);
		if (con == 1) 
		{
			comppart[compcount] = mainda[comps] + '^' + comps + '-' + '^0^0'; // add the first part of the compound to the results (eg 'hetu')
			//alert(comppart[0]);
			if (yt[comps])
			{
				comppart[compcount] += '^2^' + yt[comps]; // add a tooltip 
				shortdefpre[sdpv] = comps;
				sdpv++;
			}
			else shortdefpre[sdpv] = 'x';
		}
		if (con == 2)
		{
			comppart[compcount] = 'javascript:void(0);' + '^' + comps + '-' + '^0^0^1^' + yt[comps]; // add a tooltip if that's all found
			shortdefpre[sdpv] = comps;
			sdpv++;
		}
		if (con == 3)
		{
			compnumbertemp = compsn[0] + wtn[0];
			
			if (compsn[0].charAt(compsn[0].length-1) == '`') // remove the ` for aesthetics
			{
				compsn[0] = compsn[0].substring(0,compsn[0].length-1);
				//alert(comps);
			}
			comppart[compcount] = mainda[compnumbertemp] + '^' + comps + '-' + '^0^0'; // add the first part of the compound to the results (eg 'hetu')
			if (yt[comps] || yt[comps+'`'])
			{
				comppart[compcount] += '^2^' + yt[comps]; // add a tooltip 
				shortdefpre[sdpv] = comps;
				sdpv++;
			}
			else shortdefpre[sdpv] = 'x';
		
			compcount++;
			//alert(comppart);
			var cadd = 0;
			for (var ctemp = 1; ctemp < compsn.length; ctemp++)
			{	
				//alert (compsn.length);
				compnumbertemp = compsn[ctemp] + wtn[ctemp];
				cadd = ctemp+1;
				//alert(compnumbertemp);
				comppart[compcount] = mainda[compnumbertemp] + '^' + cadd + '^1^0'; // add the first part of the compound to the results (eg 'hetu')
				compcount++;
			}
			compcount--; //to counteract the one below.

		}
		if (con == 4) 
		{
			comppart[compcount] = mainda[comps] + '^' + compsn[0] + '-' + '^0^0'; // add the first part of the compound to the results (eg 'hetu')
			if (yt[comps])
			{
				comppart[compcount] += '^2^' + yt[comps]; // add a tooltip 
				shortdefpre[sdpv] = comps;
				sdpv++;				
			}
			else shortdefpre[sdpv] = 'x';
		}
		compcount++;
		wtwt = wtwt.substring(confound); // the 'ppa.tipanno' in our example
		//alert(shortdefpre);
		
		if (mancheck == 0 && fmx < 50)
		{
			
		// now do our search again on the 'ppa.tipanno'
			aa = 0;
			bb = 0;
			cc = 0;
			findmatch();
			var aiu1 = /[aiu]/.exec(wtwt.charAt(0));
			var aiu2 = /[aiu]/.exec(wtwt.charAt(1));
			var aiu3 = /[aiu]/.exec(comps.charAt(comps.length-1));
			
			if (aa == 0 && bb == 0 && cc == 0)
			{
				
				////alert('yes');
				if (((aiu3 && aiu1 == null && aiu2 == null) || wtwt.charAt(0) == comps.charAt(comps.length-1))) // check for shortened vowels, lengthen
				{
					wtwt = aiu3 + wtwt;
					////alert('1' + wtwt);
					findmatch();
					wtwt = wtwt.substring(1);
				}
				if (aa == 0 && bb == 0 && cc == 0 && wtwt.charAt(0) == wtwt.charAt(1) && wtwt.length > 3 && wtwt.charAt(0) != 'a' && wtwt.charAt(0) != 'i' && wtwt.charAt(0) != 'u' && wtwt.charAt(0) != 'y' && cdoubled[comppartraw.length] != 'yes') // check for consonant doubling - for maggappa.tipanno, gives magga-p-pa.tipanno
				{
					comppart[compcount] = '0^' + wtwt.charAt(0) + '-' + '^0^0'; // the 'p' in our example
					cdoubled[comppartraw.length] = 'yes'; // tells it there was a doubling at this point
					comppartraw[comppartraw.length] = wtwt;
					compcountparts++;
					wtwt = wtwt.substring(1); // the 'pa.tipanno' in our example
					compcount++;
					findmatch();
				}

				if (aa == 0 && bb == 0 && cc == 0)
				{

					//alert('yes' + wtwt);
					compcountparts++;
					checkno = 3;
					findcompound();

					//else addresults();

					////alert('3' + wtwt);
				}
				else
				{
					////alert('yes')
					conhalt++;
					if (conhalt > 1)
					{
						tr[dd] = 'in';
						dd++;
					}
						//////alert(comppart);
					for (var ctemp = 0; ctemp < comppart.length; ctemp++)
					{
						if (comppart[ctemp])
						{
							tr[dd] = comppart[ctemp];
							dd++;
						}
					}
					for (var s = 0; s < shortdefpre.length; s++)
					{
						s2 = shortdefpost.length;
						shortdefpost[s2] = shortdefpre[s];
					}
					shortdefpre = new Array();
					shortdefpre.length=0;
					sdpv = 0;				
					//alert('add from cf1')
					
					shortdefpost.push('q');
					addresults();
				
					wt[i] = wtpre;
					wtwt = wt[i];
					compcountparts = 0;
					confirst = 0;
					comppart = new Array();
					comppartraw = new Array();
					comppart.length = 0;
					comppartraw.length = 0;
					cdoubled = new Array();
					cdoubled.length = 0;
					aa = 0;
					bb = 0;
					cc = 0;
					compcount = 0;
					checkno = 4;
					findcompound();
					return null;
				}
			}
			if (aa != 0 || bb != 0 || cc != 0)
			{
				
				for (var s = 0; s < shortdefpre.length; s++)
				{
					if (shortdefpre[s] != 'x') {
						s2 = shortdefpost.length;
						shortdefpost[s2] = shortdefpre[s];
					}
				}
				shortdefpre = new Array();
				shortdefpre.length=0;
				sdpv = 0;				
					
				conhalt ++;
				if (findstop != 1)
				{
					////alert('yes')
					
					if (conhalt > 1)
					{
						tr[dd] = 'in';
						dd++;
					}
						//////alert(comppart);
					for (var ctemp = 0; ctemp < comppart.length; ctemp++)
					{
						if (comppart[ctemp])
						{
							tr[dd] = comppart[ctemp];
							dd++;
						}
					}
		
				//alert('add from cf2' + wtpre + wtwt)
				shortdefpost.push('q');
				addresults();
					
				}
				wt[i] = wtpre;
				wtwt = wt[i];
				
				
				
				comppart = new Array();
				comppartraw = new Array();
				comppart.length = 0;
				comppartraw.length = 0;
				cdoubled = new Array();
				cdoubled.length = 0;
				compcount = 0;
				confirst = 0;
				aa = 0;
				bb = 0;
				cc = 0;
				compcountparts = 0;
				//document.getElementById('mafb').innerHTML += '; 5';
				findcompound();
			}
			else compcountparts--;
		}
        return null;
	}


// --------------------------- add results function  ---------------------------------

	function addresults()
	{
		mfx++;
		//document.getElementById('c').innerHTML = 'fc: ' + fcx + 'cf: ' + cfx + 'fm: ' + fmx + 'mf: ' + mfx;
		ddtip = dd; // since we will keep track of where we are at in the sequence of results by adding 1 to dd every time we add a match, this var ddtip allows us to mark where the original result stays in the order.  Later we will add a tooltip on to the end of that entry
		
	// adding PED results
	
		if (aa > 0)
		{
						
			tr[dd] = res[0] + '^' + wtwt + '^0^0'; // tr is the results.  Here we have added the first match (called 'upper', because it will stay in the main line of our output text).  We use '^' to seperate parts of an entry, and these will become valuable later when we perform a split function in linkout.js  Note that the second part is set at wtwt, whereas in the rest of the matches it will be set at 'g', and will thus be displayed as a clickable number in the lower line of the output.  For info on the other parts of tr, please see linkout.js  
			dd++; // bump the queue for the next match.

			for (var f = 1; f < res.length; f++)
			{
				g = f + 1;
				tr[dd] = res[f] + '^' + g + '^1^0';
				dd++;		
			}
			if (conhalt > 1) // extra compound matches
			{
				tr[dd] = 'out';
				dd++;
			}	
		}
	
	// adding DPPN results
	
		if (bb > 0)
		{
			if (aa == 0) // if no other match
			{
				tr[dd] = resn[0] + '^' + wtwt + '^0^1'; // if this is the first match, it is put as the upper and displayed in full.  The rest are displayed as 'n'.
				dd++;
				if (conhalt > 1) // extra compound matches
				{
					tr[dd] = 'out';
					dd++;
				}
				for (var h = 1; h < resn.length; h++)
				{
	
					tr[dd] = resn[h] + '^' + 'n' + '^1^1';
					dd++;		
				}
				if (cc == 0) { // only name match, so check for compounds.
					tr[dd] = 'newrow';
					dd++;
					shortdefpost.push('q');
					findcompound();
				}
	
			}
			else // if other match, give all results as 'n'
			{
				for (var h = 0; h < resn.length; h++)
				{
	
					tr[dd] = resn[h] + '^' + 'n' + '^1^1';
					dd++;		
				}
			}					
		}	
	
	// tooltips: marker at 5 - if 1, then javascript:void is the link; if 2, then figure the link out based on the results
		if (cc > 0)
		{
			for (var s = 0; s < shortdefpre.length; s++)
			{
				s2 = shortdefpost.length;
				shortdefpost[s2] = shortdefpre[s];
			}
			shortdefpre = new Array();
			shortdefpre.length=0;
			sdpv = 0;
		}
		
		if (aa == 0 && bb == 0) // if no PED or DPPN match 
		{
			if (cc > 0) // but there is a CPED match, then give the link as javascript:void, to allow for tooltips onhover.
			{
				tr[dd] = 'javascript:void(0);^' + wtwt + '^0^0^1^' + resy;
				dd++;
			}
			if (conhalt > 1) // extra compound matches
			{
				tr[dd] = 'out';
				dd++;
			}
		}
		else if (cc > 0) // otherwise just append a tooltip marker to the result
		{
			tr[ddtip] = tr[ddtip] + '^2^' + resy;
		}
		if (addsuf == 1)
		{
			tr[dd] = remembersuf;
			dd++
			addsuf = 0;
			if (yt[dictsuf])
			{
				s2 = shortdefpost.length;
				shortdefpost[s2] = dictsuf;
			}
		}

		
	}
}

