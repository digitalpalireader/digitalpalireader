var outwords = new Array();  // the raw output
var shortdefpre = new Array();
var shortdefpost = new Array();

var lastcolour = 0;

function postout(input,divclicked)
{
	outwords = [];
	shortdefpre = [];
	shortdefpost = [];
	
	input = replacevelstandard(input);
	document.form.dictin.value=input;
	document.form.lastsearch.value=input;
	document.form.sped.selectedIndex=0;
	document.getElementById('anfs').innerHTML = '';

	if (document.getElementById(divclicked))
	{
		if (document.getElementById(lastcolour))
		{
			document.getElementById(lastcolour).style.color = colorcfg['coltext'];
			document.getElementById(lastcolour).style.fontWeight = 'normal';
		}
		document.getElementById(divclicked).style.color = colorcfg['colsel'];
		document.getElementById(divclicked).style.fontWeight = 'bold';
		lastcolour = divclicked;
	}

	var inputm = input.replace(/\u00B4/g, '"');
	document.form.manual.value = inputm; // add to search box for editing

// --------------------------- start main function  ---------------------------------


	// ---------- housekeeping ----------
	
	input = input.replace(/\u00B7/g, '\'');
	input = input.replace(/\u00B4/g, '\"');
	input = input.replace(/aa\'\'ti/g, 'a (a)\'ti');
	input = input.replace(/ii\'\'ti/g, 'i (i)\'ti');	
	input = input.replace(/uu\'\'ti/g, 'u (u)\'ti');	
	input = input.replace(/aa\'ti/g, 'a (a)\'ti');
	input = input.replace(/ii\'ti/g, 'i (i)\'ti');	
	input = input.replace(/uu\'ti/g, 'u (u)\'ti');
	input = input.replace(/\'\'\'/g, ' \' ');
	input = input.replace(/\'\'/g, ' \' ');
	input = input.replace(/\,/g, ' q '); 
	input = input.replace(/{/g, ' { ');
	input = input.replace(/}/g, ' } ');
	input = input.replace(/\.\./g, ' , ');
	input = input.replace(/\. /g, ' , ');
	input = input.replace(/\.$/g, ' , ');
	input = input.replace(/\.\.\./g, ' ...');
	input = input.replace(/\./g, ',');
	input = input.replace(/\?/g, ' ? ');
	input = input.replace(/\;/g, ' ; ');
	input = input.replace(/\!/g, ' ! ');
	input = input.replace(/\"n/g, 'xn');
	input = input.replace(/\"/g, ' " ');
	input = input.replace(/\-\-/g, ' - ');
	input = input.replace(/\-/g, ' - ');
	input = input.replace(/\u201C/g, ' " ');
	input = input.replace(/\u201D/g, ' " ');
	input = input.replace(/\u2018/g, ' \' ');	
	input = input.replace(/\u2019/g, ' \' ');
	input = input.replace(/\u0060\u0060/g, ' \\ ');
	input = input.replace(/\u0060/g, ' \' ');
	input = input.replace(/\u2013/g, ' - ');
	input = input.replace(/\xn/g, '`n');
	input = input.toLowerCase();
	input = input.replace(/  +/g, ' ');
		
	
	var manadd = [];
	
	manadd["devamanussaana,m"] = 'deva#1#manussaana,m';
	manadd["ukkaasitasaddo"] = 'ukkaasita#1#saddo';
	manadd["yaava~ncida,m"] = 'yaava#1#~nc#1#ida,m';

	shortdefpre = [];

	if (input.length > 1)  // ---------- dont waste time with periods and commas ----------
	{
		// ---------- Manual Add Routine ----------
		
		if (manadd[input]) { outwords.push(input + '$' + manadd[input]); }
		else { analyzeword(input); } // will populate outwords, which is nested array - 1) full alternative compounds/words seperated by array entry "space", 2) parts of the alt. compounds seperated by "@", 3) alt. defs of the parts, seperated by "#", 4) info for each alt. def. seperated by "^" 
	}
	if (outwords.length == 0)
	{
		outwords.push(input + '$0^' + input + '^3');
	}
	output(0,1); // perform the function in linkout.js; 0 means first match, 1 means this is coming from linkin.js as opposed to the select box
}



function analyzeword (oneword, parts, partnames) {
	
	var matchedword;
	var fullmatch;
	var fullnames;
	
	if (!parts) { // first iteration
		parts = [];
		partnames = [];
		matchedword = findmatch(oneword); // check for a single match
	}
	else { matchedword = findmatch(oneword,1); }  // check for an ending match
	
	if (matchedword) {
		fullmatch = parts.concat(Array(matchedword[1])); // each part is a fake array of alt part defs, seperated by "#"
		fullnames = partnames.concat(Array(matchedword[0]));
		outwords.push(fullnames.join('-') + '$' + fullmatch.join('@')); // only when we match the end of the compound do we add results, making a fake array of partnames and one of parts (if any).  Arrays are seperated by $
		shortdefpost.push(shortdefpre.join('$'));
		//alert(parts + ' | ' + partnames + ' | ' + outwords);
	}
	
	var partword;
	var restword;
	
	var nextparts;
	var nextpartnames;
	
	for (var j = 1; j < oneword.length; j++)
	{
		partword = oneword.substring(0,oneword.length-j);
		restword = oneword.substring(oneword.length-j,oneword.length);
		var newpart = findmatch(partword,1); // check for matched part
		if (newpart) {
			nextparts = parts.concat(Array(newpart[1])); // add the part to our list of matched parts
			nextpartnames = partnames.concat(Array(newpart[0])); // ad the part name to our list of matched part names
			analyzeword(restword, nextparts, nextpartnames); // repeat passing the old parts to be added;
		}
		
	}
	// alert(parts + ' | ' + partnames + ' | ' + outwords);
}

// --------------------------- match finding function  ---------------------------------

	
function findmatch(oneword,ispart)
{
	var cwt = [];
	
	var indeclinable = [];
	indeclinable["na"] = 1;
		
	// ---------- create wtr variables for alternative stem matching ----------
	
	
	for (var k = 0; k < oneword.length; k++) //define sub-cut for analysis (length-k,wt[i].length) and remaining string (0,length-k)
	{		
		cwt[k] = oneword.substring(oneword.length-k,oneword.length);				
	}
	
	
	// ---------- stem matching and converting - note the wt doesnt change just we get alternatives ----------
	// this stuff is defined in declension.js
	
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
		if (cwt[prb] == pra && oneword.length > prd) 
		{
				
			if (pre)
			{
				wtr[prcount] = oneword.substring(0, oneword.length-prc) + pre;
				prcount++;
			}
			else
			{
				wtr[prcount] = oneword.substring(0, oneword.length-prc);
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
		}
		
	}


	var res = [];
	var resn = [];
	var resy;
// exact maches

	if (mainda[oneword] != null)
	{
		res.push(mainda[oneword]); 
	}
	
// multiple exacts
	
	if (res.length == 0) // no exact match, so we try exact matches that have a z# on the end
	{
		for (var a = 1; a < 6; a++) // loop through z1 - z6
		{				
			var temp = oneword + 'z' + a;
			if (mainda[temp] != null) 
			{
				res.push(mainda[temp]);
			}
		}
	}

// declensions			

	if (res.length == 0) 			// if still no match, we look at variants
	{				
		for (var b = 0; b < wtr.length; b++) // check through wtr variants that we set at the beginning
		{			
			var temp = wtr[b];
			if (mainda[temp] != null && indeclinable[temp] == null) 
			{			
				res.push(mainda[temp]);				
			}
		}
	}
		
	if (res.length == 0) // if still no match, look for numbered variants
	{
		for (b = 0; b < wtr.length; b++) // b for alternative types wtr
		{							
			for (var c = 1; c < 6; c++) // c for numbers one to six
			{				
				var temp = wtr[b] + 'z' + c;

				if (mainda[temp] != null) 
				{
					res.push(mainda[temp]);
				}
			}
		}
	}
	
	if (res.length == 0) // if still no match, look for numbered variants
	

// concise matches
	
	var resy = null;

	if (yt[oneword] != null) 
	{					
		resy = yt[oneword];
		shortdefpre.push(oneword); // for matching the dictionary entry in the output
	}

	
	if (!resy)
	{
		for (var b = 0; b < wtr.length; b++) // b for alternative types wtr
		{				

			var temp = wtr[b];
			
			if (yt[temp] && !resy && !indeclinable[temp]) 
			{					
				resy = yt[temp];
				shortdefpre.push(temp); // for matching the dictionary entry in the output
			}						
		}
	}

	if(ispart) { // do this if compound
	// insert funky part matching here
	}
	else {
// DPPN matches
		for (var d = 1; d < 8; d++)
		{				
			var temp = oneword + 'f' + d; // remember that we have added f# to the end of all DPPN entries.  Here we add it to come up with wtnum
			if (nameda[temp] && oneword.length > 2) 
			{					
				resn.push(nameda[temp]);
			}
		}
		
		if (resn.length == 0)
		{
			for (var b = 0; b < wtr.length; b++) // b for alternative types wtr
			{				
				for (var d = 1; d < 8; d++)
				{				
					var temp = wtr[b] + 'f' + d;
					if (nameda[temp]) 
					{					
						resn.push(nameda[temp]);
					}
				}
			}
		}
		
// special suffixes

		if (res.length == 0 && resn.length == 0 && !resy)
		{

			var specsuf = new Array(); // once there is no match, we will cut off some suffixes and try again.
			specsuf["~nca"] = '5832^\'ca^3^2^and; then; now,xxxcopulative or disjunctive particle#2#ca';
			specsuf["iiti"] = '3125^\'iti^3^2^thus, (used to point out something just mentioned or about to be mentioned&comma; and to show that a sentence is finished), Very often its former i is elided and ti only is remaining,xxxind,#3#iti';

			specsuf["pi"] = '2/2866^\'pi^3^2^(the enclitic form of api,) also: and also; even so; but; however; probably; perhaps,xxxind,#2#pi';
			specsuf["~nhi"] = '4/1234^\'hi^3^2^because; indeed,xxxind,#2#hi';
			specsuf["va"] = '3/1047^\'va^3^2^(emphatic particle)&comma; only,xxxind,#2#eva';
			specsuf["eva"] = '0/4338^\'eva^3^2^(emphatic particle)&comma; only,xxxind,#3#eva';
			specsuf["idha"] = '0/3208^\'idha^3^2^here; in this world or existence,xxxadv,#4#idha';

			for (var tempsuf = 5; tempsuf > 0; tempsuf--)
			{
				var cutsuf = oneword.substring(oneword.length - tempsuf);
				//
				if (specsuf[cutsuf]) // if it finds a special suffix as plugged in at the start
				{
					var desuf = findmatch(oneword.substring(0,tempsuf)); // run find function on desuffixed word
					if (desuf) {
						outwords.push(desuf+'@'+specsuf[cutsuf]); // manually add the two part "compound"
					}
				}
			}			
		}
	}
	
	var altarray = [];

	if (res.length == 0 && resn.length == 0 && resy) { // only concise
		altarray.push('0^' + oneword + '^2^' + resy);
	}
	else {
		if (res.length != 0) { for (var i in res) { altarray.push(res[i] + '^' + oneword + '^0'); } }
		if (resn.length != 0) { for (var j in resn) { altarray.push(resn[j] + '^' + oneword + '^1'); } }
	}
	if(res.length == 0 && resn.length == 0 && !resy) { return null; }
	return(Array(oneword,altarray.join('#')));  // add oneword to the beginning to let us put the word together later
}		
