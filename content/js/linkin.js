var outwords = new Array();  // the raw output
var shortdefpost = new Array();

var lastcolour = 0;

function postout(input,divclicked,frombox)
{
	outwords = [];
	shortdefpre = [];
	shortdefpost = [];
	
	input = replacevelstandard(input);
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

	var inputm = input.replace(/\u00B4/g, '"').replace(/xn/g, '"n');
	if(!frombox) { 
		document.form.dictin.value = replaceunistandard(inputm); // add to search box for editing
		document.form.manual.value = inputm; // add to search box for editing
	}

// --------------------------- start main function  ---------------------------------


	// ---------- housekeeping ----------
	
	input = input.replace(/\u00B7/g, '');
	input = input.replace(/\u00B4/g, '');
	input = input.replace(/aa['"`]/g, 'a');
	input = input.replace(/ii['"`]/g, 'i');
	input = input.replace(/uu['"`]/g, 'u');
	input = input.replace(/[`',{}?;!"-]/g, '');
	input = input.replace(/xn/g, '`n');
	input = input.toLowerCase();
	input = input.replace(/\.([nmltd])/g, ",$1");
	input = input.replace(/\./g, '');
	input = input.replace(/ .+/g, '');
		
	
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



function analyzeword (oneword, parts, partnames, shortdefpre, lastpart) {
	
	var matchedword;
	var fullmatch;
	var fullnames;
	
	if (!parts) { // first iteration
		parts = [];
		partnames = [];
		shortdefpre = [];
		matchedword = findmatch(oneword); // check for a single match
	}
	else if (oneword.length > 1) { matchedword = findmatch(oneword,lastpart); }  // check for an ending match
	
	if (matchedword) {
		fullmatch = parts.concat(Array(matchedword[1])); // each part is a fake array of alt part defs, seperated by "#"
		fullnames = partnames.concat(Array(matchedword[0]));
		outwords.push(fullnames.join('-') + '$' + fullmatch.join('@')); // only when we match the end of the compound do we add results, making a fake array of partnames and one of parts (if any).  Arrays are seperated by $
		if (matchedword[2]) {shortdefpost.push(shortdefpre.concat(matchedword[2]).join('$')); }
		else { shortdefpost.push(shortdefpre.join('$')); }
	}
	
	var partword;
	var restword;
	
	var nextparts;
	var nextpartnames;
	
	for (var j = 1; j < oneword.length; j++)
	{
		partword = oneword.substring(0,oneword.length-j);
		restword = oneword.substring(oneword.length-j,oneword.length);
		var newpart = findmatch(partword,lastpart,restword); // check for matched part
		if (newpart) {
			nextparts = parts.concat(Array(newpart[1])); // add the part to our list of matched parts
			nextpartnames = partnames.concat(Array(newpart[0])); // add the part name to our list of matched part names
			analyzeword(restword, nextparts, nextpartnames, (newpart[2] ? shortdefpre.concat(newpart[2]) : shortdefpre), partword); // repeat passing the old parts to be added;
		}
		
	}
	// alert(parts + ' | ' + partnames + ' | ' + outwords);
}

// --------------------------- match finding function  ---------------------------------

var notpart = []; // disallowed compound words - 1 means totally, 2 means allowed only at the beginning;
notpart["va"] = 1;
notpart["vaa"] = 1;
notpart["ya"] = 1;
notpart["da"] = 1;
notpart["hi"] = 1;
notpart["ha"] = 1;
notpart["ca"] = 1;
notpart["ma"] = 1;
notpart["la"] = 1;
notpart["nu"] = 1;
notpart["saa"] = 1;
notpart["saz1"] = 1;
notpart["saz2"] = 1;
notpart["saz4"] = 1;
notpart["suz1"] = 1;
notpart["suz2"] = 2;
notpart["suz3"] = 2;
notpart["aa"] = 2;
notpart["na"] = 1;
notpart["maa"] = 1;

var indeclinable = [];
indeclinable["na"] = 1;
//indeclinable["ca"] = 1;

var specsuf = new Array(); // once there is no match, we will cut off some suffixes and try again.
specsuf["~nca"] = '1/1501^~nca^0#ca';
specsuf["iiti"] = '0/3190^iiti^0#iti';
specsuf["pi"] = '2/2866^pi^0#pi';
specsuf["~nhi"] = '4/1234^~nhi^0#hi';
specsuf["va"] = '3/1047^va^0#va';
specsuf["eva"] = '0/4338^eva^0#eva';
specsuf["idha"] = '0/3208^idha^0#idha';

function findmatch(oneword,lastpart,nextpart,trick)
{


	if (notpart[oneword]) { 
		if (notpart[oneword] == 1 && nextpart) { return null; }
		if (lastpart) { return null; }
	}
	
	//alert (oneword+' '+ lastpart);
	
	var cwt = [];

		
	// ---------- create wtr variables for alternative stem matching ----------
	
	
	for (var k = 0; k < oneword.length; k++) //define sub-cut for analysis (length-k,wt[i].length) and remaining string (0,length-k)
	{		
		cwt[k] = oneword.substring(oneword.length-k,oneword.length);				
	}
	
	
	// ---------- stem matching and converting - note the wt doesnt change just we get alternatives ----------
	// this stuff is defined in declension.js
	
	wtr = new Array();
	
	for (var pr = 0;pr < prem.length; pr++)
	{
		preach = prem[pr].split('^');
		pra = preach[0]; // ending to replace
		prb = pra.length; // size of ending
		prc = preach[1]; // find offset (positive means smaller cut)
		prd = preach[2]; // min. length for change
		pre = preach[3]; // new ending if any


		if (cwt[prb] == pra && oneword.length > (parseInt(prb) + parseInt(prd))) 
		{
			if (pre) // if we have a new ending to add
			{
				wtr.push(oneword.substring(0, oneword.length-(prb-prc)) + pre);

			}
			else
			{
				wtr.push(oneword.substring(0, oneword.length-(prb-prc)));
			}
			
			// add long vowel variants
			
			if (wtr[wtr.length-1].charAt(wtr[wtr.length-1].length-1) == 'a' && wtr[wtr.length-1].charAt(wtr[wtr.length-1].length-2) != 'a')
			{
				wtr.push(wtr[wtr.length-1] + 'a');
			}
			else if (wtr[wtr.length-1].charAt(wtr[wtr.length-1].length-1) == 'u' && wtr[wtr.length-1].charAt(wtr[wtr.length-1].length-2) != 'u')
			{
				wtr.push(wtr[wtr.length-1] + 'u');
			}
			else if (wtr[wtr.length-1].charAt(wtr[wtr.length-1].length-1) == 'i' && wtr[wtr.length-1].charAt(wtr[wtr.length-1].length-2) != 'i')
			{
				wtr.push(wtr[wtr.length-1] + 'i');
			}					
		}
		
	}


	var res = [];
	var resn = [];
	var resy;
// exact maches

	if (pedda[oneword])
	{
		res.push(pedda[oneword]); 
	}
	
// multiple exacts
	
	if (res.length == 0) // no exact match, so we try exact matches that have a z# on the end
	{
		for (var a = 1; a < 10; a++) // loop through z1 - z6
		{				
			var temp = oneword + 'z' + a;
			if (pedda[temp]) 
			{
				res.push(pedda[temp]);
			}
			else break;
		}
	}

// concise matches
	
	var resy = null;

	if (yt[oneword]) 
	{					
		resy = oneword; // for matching the dictionary entry in the output
	}




	if(nextpart) { 

// do this if compound part (not end)
	
		if (!lastpart) { // do this if first compound part
			if (!trick) {
				
				// adding the ` for special prefix only words
				
				var trickmatch = findmatch(oneword+'`',lastpart,nextpart,1);
				if (trickmatch) { return trickmatch; }
				
				// removing the 'm'
				
				if (oneword.charAt(oneword.length-1) == 'm') 
				{
					var trickmatch = findmatch(oneword.substring(0,oneword.length-1),lastpart,nextpart,1);
					if (trickmatch) { return Array(trickmatch[0] + '-m', trickmatch[1] + '@0^m^3', (trickmatch[2] ? trickmatch[2] : '') + '$'); } 
				}
			}
		}
	}
	else { 
		
// do this if compound end or non-compound
		
	// declensions			

		if (res.length == 0) 
		{				
			for (var b = 0; b < wtr.length; b++) // check through wtr variants that we set at the beginning
			{			
				var temp = wtr[b];
				if (pedda[temp] != null && indeclinable[temp] == null) 
				{			
					res.push(pedda[temp]);				
				}
			}
		}
			
		if (res.length == 0) // if still no match, look for numbered variants
		{
			for (b = 0; b < wtr.length; b++) // b for alternative types wtr
			{							
				for (var c = 1; c < 10; c++) // c for numbers one to six
				{				
					var temp = wtr[b] + 'z' + c;

					if (pedda[temp]) 
					{
						res.push(pedda[temp]);
					}
					else { break; }
				}
			}
		}

	// concise variants

		if (!resy)
		{
			for (var b = 0; b < wtr.length; b++) // b for alternative types wtr
			{				

				var temp = wtr[b];
				
				if (yt[temp] && !resy && !indeclinable[temp]) 
				{					
					resy = temp; // for matching the dictionary entry in the output
				}						
			}
		}
			
	}
	
	if(lastpart) { 

// do this if compound part or end

	// tricks
		if (res.length == 0 && resn.length == 0 && !resy && !trick) {
			var aiu1 = /[aiu]/.exec(oneword.charAt(0));
			var aiu2 = /[aiu]/.exec(oneword.charAt(1));
			var aiu3 = /[aiu]/.exec(lastpart.charAt(lastpart.length-1));
			

			if (aiu3 && ((!aiu1 && !aiu2) || oneword.charAt(0) == lastpart.charAt(lastpart.length-1)) && lastpart.length > 1) // check for shortened vowels, lengthen
			{
				if (!notpart[aiu3 + oneword]) {
					var trickmatch = findmatch(aiu3 + oneword,lastpart,nextpart,1);
					if (trickmatch) { return trickmatch; } 
				}
			}
			
			if (oneword.charAt(0) == oneword.charAt(1) && oneword.length > 3 && !aiu1 && oneword.charAt(0) != 'y') // check for consonant doubling - for maggappa.tipanno, gives magga-p-pa.tipanno
			{
				var trickmatch = findmatch(oneword.substring(1),lastpart,nextpart,1); // the 'pa.tipanno' in our example
				if (trickmatch) { return Array(oneword.charAt(0) + '-' + trickmatch[0], '0^' + oneword.charAt(0) + '^3@' + trickmatch[1], '$' + (trickmatch[2] ? trickmatch[2] : '')); } 
			}
		}
	}
	else { 

// do this if non-compound

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
				for (var d = 1; d < 10; d++)
				{				
					var temp = wtr[b] + 'f' + d;
					if (nameda[temp]) 
					{					
						resn.push(nameda[temp]);
					}
					else { break; }
				}
			}
		}
		
	// special suffixes

		if (res.length == 0 && resn.length == 0 && !resy)
		{

			for (var tempsuf = 5; tempsuf > 0; tempsuf--) {
				var cutsuf = oneword.substring(oneword.length - tempsuf);
				//
				if (specsuf[cutsuf]) {
					var desuf = findmatch(oneword.substring(0,oneword.length-tempsuf)); // run find function on desuffixed word
					if (desuf) {
						var outsuf =  Array(oneword.substring(0,oneword.length-tempsuf)+'-'+cutsuf, desuf[1] + '@'+ specsuf[cutsuf].split('#')[0], desuf[2]+'$'+specsuf[cutsuf].split('#')[1]); // manually add the two part "compound"
						return outsuf;
					}
				}
			}			
		}
	}
	
	var altarray = [];

	if (res.length == 0 && resn.length == 0 && resy) { // only concise
		altarray.push('0^' + oneword.replace(/`$/,'') + '^2^' + resy);
	}
	else {
		if (res.length != 0) { for (var i in res) { altarray.push(res[i] + '^' + oneword.replace(/`$/,'') + '^0'); } }
		if (resn.length != 0) { for (var j in resn) { altarray.push(resn[j] + '^' + oneword + '^1'); } }
	}
	if(res.length == 0 && resn.length == 0 && !resy) { return null; }
	return(Array(oneword.replace(/`$/,''),altarray.join('#'),resy));  // add oneword to the beginning to let us put the word together later
}		
