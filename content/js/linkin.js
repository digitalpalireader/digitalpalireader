var G_outwords = new Array();  // the raw output
var G_shortdefpost = new Array();


var G_lastcolour = 0;

function postout(input,divclicked,frombox)
{
	G_outwords = [];
	shortdefpre = [];
	G_shortdefpost = [];
	
	if(divclicked) divclicked = 'W'+divclicked;
	
	input = toVel(input);
	document.form.lastsearch.value=input;
	document.form.sped.selectedIndex=0;
	document.getElementById('anfs').innerHTML = '';

	if (divclicked && document.getElementById(divclicked))
	{
		if (document.getElementById(G_lastcolour))
		{
			document.getElementById(G_lastcolour).style.color = colorcfg['coltext'];
			document.getElementById(G_lastcolour).style.fontWeight = 'normal';
		}
		document.getElementById(divclicked).style.color = colorcfg['colsel'];
		document.getElementById(divclicked).style.fontWeight = 'bold';
		G_lastcolour = divclicked;
	}

	var inputm = input.replace(/\u00B4/g, '"').replace(/xn/g, '"n');
	if(!frombox) { 
		document.form.dictin.value = toUni(inputm); // add to search box for editing
		document.form.manual.value = inputm; // add to search box for editing
	}

// --------------------------- start main function  ---------------------------------


	// ---------- housekeeping ----------
	
	input = input.replace(/\u00B7/g, '');
	input = input.replace(/\u00B4/g, '');
	input = input.replace(/"n/g, 'xn');
	//~ input = input.replace(/aa['"`]/g, 'a');
	//~ input = input.replace(/ii['"`]/g, 'i');
	//~ input = input.replace(/uu['"`]/g, 'u');
	input = input.replace(/([aiu])[aiu][’”]/g, "$1");
	input = input.replace(/n[’”]/g, ".m");
	input = input.replace(/[‘“’”`',{}?;!"-]/g, '');
	input = input.replace(/xn/g, '"n');
	input = input.toLowerCase();
	input = input.replace(/\.([^nmltd])/g, "$1");
	input = input.replace(/\.$/g, "");
	input = input.replace(/ .+/g, '');
	shortdefpre = [];

	if (input.length > 1)  // ---------- dont waste time with periods and commas ----------
	{
		if(typeof(G_manualCompoundInd[input]) == 'object' || typeof(G_manualCompoundDec[input]) == 'object') manualCompound(input); // let it tell us what is the match
		else analyzeword(input);  // will populate G_outwords, which is nested array - 1) full alternative compounds/words seperated by array entry "space", 2) parts of the alt. compounds seperated by "@", 3) alt. defs of the parts, seperated by "#", 4) info for each alt. def. seperated by "^" 
	}
	if (G_outwords.length == 0)
	{
		G_outwords.push(input + '$0^' + input + '^3');
	}
	outputDef(0,1,frombox); // perform the function in linkout.js; 0 means first match, 1 means this is coming from linkin.js as opposed to the select box,frombox tells the output that we're coming from the input box.
}


var G_illegalCompoundBreak = /[^aiueomn][^aiueo]/; // this assumes that a compound has to break at a vowel, nigahita or n.

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
	else if (oneword.length > 1) { matchedword = findmatch(oneword,lastpart,null,parts.length); }  // check for an ending match
	
	if (matchedword) {
		fullnames = partnames.concat([matchedword[0]]);
		fullmatch = parts.concat([matchedword[1]]); // each part is a fake array of alt part defs, seperated by "#"
		G_outwords.push(fullnames.join('-') + '$' + fullmatch.join('@')); // only when we match the end of the compound do we add results, making a fake array of partnames and one of parts (if any).  Arrays are seperated by $
		if (matchedword[2]) {
			G_shortdefpost.push(shortdefpre.concat([matchedword[2]]).join('$')); 
		}
		else { G_shortdefpost.push(shortdefpre.join('$')); }
	}
	
	var partword;
	var restword;
	
	var nextparts;
	var nextpartnames;
	out:
	for (var j = 1; j < oneword.length; j++)
	{
		partword = oneword.substring(0,oneword.length-j);
		restword = oneword.substring(oneword.length-j,oneword.length);

		if ((partword.length == 1 && (lastpart || !/[anh]/.exec(partword))) || G_illegalCompoundBreak.exec(partword.charAt(partword.length-1)+restword.charAt(0)) != null) continue out;

		var newpart = findmatch(partword,lastpart,restword,parts.length); // check for matched part
		if (newpart) {
			nextparts = parts.concat(Array(newpart[1])); // add the part to our list of matched parts
			nextpartnames = partnames.concat(Array(newpart[0])); // add the part name to our list of matched part names
			analyzeword((newpart[3] ? newpart[3] : restword), nextparts, nextpartnames, (newpart[2] ? shortdefpre.concat(newpart[2]) : shortdefpre), partword); // repeat passing the old parts to be added;  newpart[3] is a modified version of the rest of the word
		}
		
	}
	// alert(parts + ' | ' + partnames + ' | ' + G_outwords);
}

// --------------------------- match finding function  ---------------------------------

var notpart = []; // disallowed compound words - 1 means totally, 2 means allowed only at the beginning, 3 means allowed only at the end;
notpart['a'] = 2;
notpart['ko'] = 1;
notpart['ka'] = 2;
notpart['ya'] = 2;
notpart['ta'] = 2;
notpart['va'] = 1;
notpart['vaa'] = 1;
notpart['da'] = 1;
notpart['hi'] = 1;
notpart['ha'] = 3;
//notpart['ca'] = 2;
notpart['ba'] = 1;
notpart['ma'] = 1;
notpart['la'] = 1;
notpart['nu'] = 3;
notpart['saa'] = 1;
notpart['saz1'] = 1;
notpart['saz2'] = 1;
notpart['saz4'] = 1;
notpart['suz1'] = 1;
notpart['suz2'] = 2;
notpart['suz3'] = 2;
notpart['aa'] = 2;
notpart['na'] = 2;
notpart['maa'] = 2;

var indeclinable = [];
indeclinable['na'] = 1;
//indeclinable["ca"] = 1;

var specsuf = new Array(); // once there is no match, we will cut off some suffixes and try again.  Seperated by #, 0=suff def., 1=suf to add, 2=ending to add for analysis, 3 = ending to add for output
specsuf["~nca"] = '1/1501^ca^0#ca#.m#~n';
specsuf["nti"] = '0/3190^ti^0#ti#.m#n'; 
specsuf["iiti"] = '0/3190^ti^0#ti#i#ii';  // these won't work with verb conjugations...
specsuf["aati"] = '0/3190^ti^0#ti#a#aa';
specsuf["uuti"] = '0/3190^ti^0#ti#u#uu';
specsuf["oti"] = '0/3190^ti^0#ti#o#o';
specsuf["pi"] = '2/2866^pi^0#pi#';
specsuf["mpi"] = '2/2866^pi^0#pi#.m#m';
specsuf["~nhi"] = '4/1234^hi^0#hi#.m#~n';
specsuf["va"] = '3/1047^va^0#va#';
specsuf["eva"] = '0/4338^eva^0#eva#';
specsuf["idha"] = '0/3208^idha^0#idha#';


function findmatch(oneword,lastpart,nextpart,partslength,trick)
{
	if ((notpart[oneword] == 2 && lastpart) || (notpart[oneword] == 1 && (lastpart || nextpart)) || (notpart[oneword] == 3 && nextpart)) { return null; }

	if(!nextpart) { // don't do stem matching on compound parts

		var pra,prb,prc,prd,pre,prf;
		var cwt = [];

			
		// ---------- create wtr variables for alternative stem matching ----------
		
		
		for (var k = 0; k < oneword.length; k++) //define sub-cut for analysis (length-k,wt[i].length) and remaining string (0,length-k)
		{		
			cwt[k] = oneword.substring(oneword.length-k,oneword.length);				
		}
		
		
		// ---------- stem matching and converting ----------
		// this stuff is defined in declension.js
		
		var wtrN = []; // nouns, can be in compound
		var wtrV = []; // verbs, can't
		
		for (var pr = 0;pr < prem.length; pr++)
		{
			preach = prem[pr];
			pra = preach[0]; // ending to replace
			prb = pra.length; // size of ending
			prc = preach[1]; // find offset (positive means smaller cut)
			prd = preach[2]; // min. length for change
			pre = preach[3]; // new ending if any
			prf = preach[4]; // is a verb?


			if (cwt[prb] == pra && oneword.length > (prb + prd)) 
			{
				var wtrone = oneword.substring(0, oneword.length-(prb-prc)) + pre;

				if ((notpart[wtrone] == 2 && lastpart) || (notpart[wtrone] == 1 && (lastpart || nextpart))) { continue; }

				if (prf) { wtrV.push(wtrone); }
				else { 
					wtrN.push(wtrone); 
					if(/[aiu]/.exec(wtrone.charAt(wtrone.length-1))) { // long vowels
						wtrN.push(wtrone+wtrone.charAt(wtrone.length-1));
					}
				}
			}
			
		}
	}

	var res = [];
	var resn = [];
	var resy;

// exact maches

	if (typeof(mainda[oneword]) == 'object')
	{
		for (i in mainda[oneword]) {
			res.push([oneword,mainda[oneword][i]]); 
		}
	}
	else if (typeof(irregda[oneword]) == 'string') {
		for (i in mainda[irregda[oneword]]) {
			res.push([oneword,mainda[irregda[oneword]][i]]); 
		}
	}

// concise matches
	
	var resy = '';

	if (yt[oneword]) 
	{					
		resy = oneword; // for matching the dictionary entry in the output
	}
	else if (irregda[oneword] && yt[irregda[oneword]]) {
		resy = irregda[oneword];
	}

	if(!lastpart && !nextpart) {
		 
// do this if non-compound

		// verbal & nominal declensions			

		var wtr = wtrN.concat(wtrV);

		if (res.length == 0) 
		{				
			for (var b = 0; b < wtr.length; b++) // check through wtr variants that we set at the beginning
			{			
				var temp = wtr[b];
				if (mainda[temp] && !indeclinable[temp]) 
				{			
					for (i in mainda[temp]) {
						res.push([temp,mainda[temp][i]]); 
					}
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


	// DPPN matches

		if (nameda[oneword]) 
		{					
			resn.push([oneword,nameda[oneword]]);
		}

		if (resn.length == 0)
		{
			for (var b = 0; b < wtr.length; b++) // b for alternative types wtr
			{				
				if (nameda[wtr[b]]) 
				{					
					resn.push([wtr[b],nameda[wtr[b]]]);
				}
			}
		}
		if(res.length == 0 && resn.length == 0 && !resy) {
			for (var b = 0; b < wtr.length; b++) // b for alternative types wtr
			{				
				if (G_manualCompoundDec[wtr[b]]) 
				{					
					manualCompound(wtr[b]);
					return;
				}
			}
		}
	}

	if(nextpart) { 

// do this if compound part (not end)

		// tricks

		if (res.length == 0 && resn.length == 0 && !resy && !trick) {
			var aiu1 = /[aiu]/.exec(oneword.charAt(oneword.length-1));
			var aiu2 = /[aiu]/.exec(nextpart.charAt(0));
			
			var aiu3 = /[aiu]/.exec(oneword.charAt(0));
			var aiu4 = /[aiu]/.exec(oneword.charAt(1));

			var aiueo1 = /[aiueo]/.exec(oneword.charAt(oneword.length-1));
			
			if (aiu1 && !aiu2) // check for shortened vowels, lengthen
			{
				if (!notpart[oneword+aiu1]) {
					var trickmatch = findmatch(oneword+aiu1,lastpart,nextpart,partslength,1);
					if (trickmatch) { 
						return [oneword, trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$']; 
					} 
				}
			}				

			if (aiueo1 && !aiu2) 
			{
				// check for lost this vowel because next vowel, add 'a,i,u' (bhaddekarattassa, pa~ncupaadaanakkhandhaa)
				
				if (!notpart[oneword.slice(0,-1)+'a']) {
					var trickmatch = findmatch(oneword.slice(0,-1)+'a',lastpart,oneword.charAt(oneword.length-1)+nextpart,partslength,2);
					if (trickmatch) { 
						return [oneword.slice(0,-1), trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$',oneword.charAt(oneword.length-1)+nextpart]; 
					} 
				}
				if (!notpart[oneword.slice(0,-1)+'i']) {
					var trickmatch = findmatch(oneword.slice(0,-1)+'i',lastpart,oneword.charAt(oneword.length-1)+nextpart,partslength,2);
					if (trickmatch) { 
						return [oneword.slice(0,-1), trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$',oneword.charAt(oneword.length-1)+nextpart]; 
					} 
				}
				if (!notpart[oneword.slice(0,-1)+'u']) {
					var trickmatch = findmatch(oneword.slice(0,-1)+'u',lastpart,oneword.charAt(oneword.length-1)+nextpart,partslength,2);
					if (trickmatch) { 
						return [oneword.slice(0,-1), trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$',oneword.charAt(oneword.length-1)+nextpart]; 
					} 
				}
			}
			if (oneword.charAt(oneword.length-1) == 'u' && nextpart.charAt(0) == 'u') // check for doubled nextpart, removed this part (mohu-upasa.mhitaapi)
			{
				if (!notpart[oneword.slice(0,-1)+'a']) {
					var trickmatch = findmatch(oneword.slice(0,-1)+'a',lastpart,'u'+nextpart,partslength,2);
					if (trickmatch) { 
						return [oneword.slice(0,-1), trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$','u'+nextpart]; 
					} 
				}
			}				

			if (oneword.charAt(oneword.length-1) == 'a' && nextpart.charAt(0) == 'a') // check for doubled nextpart, removed this part (vuccata-avuso)
			{
				if (!notpart[oneword.slice(0,-1)+'i']) {
					var trickmatch = findmatch(oneword.slice(0,-1)+'i',lastpart,'a'+nextpart,partslength,2);
					if (trickmatch) { 
						return [oneword.slice(0,-1), trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$','a'+nextpart]; 
					} 
					if (!notpart[oneword.slice(0,-1)+'u']) {
						var trickmatch = findmatch(oneword.slice(0,-1)+'u',lastpart,'a'+nextpart,partslength,2);
						if (trickmatch) { 
							return [oneword.slice(0,-1), trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$','a'+nextpart]; 
						} 
					}

				}
			}				

			// compounded conjugations, sandhi
			
			if (oneword.charAt(oneword.length-1) == 'm' && oneword.charAt(oneword.length-2) != '.' && oneword.length > 2) 
			{
				var trickmatch = findmatch(oneword.substring(0,oneword.length-1),lastpart,nextpart,partslength,1);
				if (trickmatch) { return Array(oneword, trickmatch[1], (trickmatch[2] ? trickmatch[2] : '')); } 
			}
			else if (/..[aiu][aiu]nam$/.exec(oneword)) // aana.m as in devaanamindo
			{
				var trickmatch = findmatch(oneword.replace(/[aiu]nam$/,''),lastpart,nextpart,partslength,1);
				if (trickmatch) { return Array(trickmatch[0] + trickmatch[0].charAt(trickmatch[0].length-1)+'nam', trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$'); } 
			}
			else if (oneword.substring(oneword.length-2,oneword.length) == '~n') 
			{
				var trickmatch = findmatch(oneword.substring(0,oneword.length-2),lastpart,nextpart,partslength,1);
				if (trickmatch) { return [oneword, trickmatch[1], (trickmatch[2] ? trickmatch[2] : '')]; } 
				else { // try indeclinables
					trickmatch = findmatch(oneword.substring(0,oneword.length-2)+'.m',lastpart,nextpart,partslength,1);
					if (trickmatch) { return [oneword, trickmatch[1], (trickmatch[2] ? trickmatch[2] : '')]; } 
				}
			}
			
		}
		
	
		if (!lastpart) { 
		
		// do this if first compound part
		
			if (res.length == 0 && !trick) {
				// adding the ` for special prefix only words
				
				var trickmatch = findmatch(oneword+'`',lastpart,nextpart,partslength,1);
				if (trickmatch) { return [oneword, trickmatch[1], (resy ? resy : (trickmatch[2] ? trickmatch[2] : ''))];  }

			}
		}
		else { 
			
		// do this if not first compound part


		}
		
	}
	else { 
		
// do this if compound end or non-compound

	// special suffixes

		if (res.length == 0 && resn.length == 0 && !resy)
		{

			for (var tempsuf = 5; tempsuf > 0; tempsuf--) {
				var cutsuf = oneword.substring(oneword.length - tempsuf);
				//
				if (specsuf[cutsuf]) {
					var desuf = findmatch(oneword.substring(0,oneword.length-tempsuf)+specsuf[cutsuf].split('#')[2],lastpart,null,partslength);  // run find function on desuffixed word, with optional addition (specsuf[cutsuf].split('#')[2])
					if (desuf) {
						var outsuf =  [oneword.substring(0,oneword.length-tempsuf)+(specsuf[cutsuf].split('#')[3] ? specsuf[cutsuf].split('#')[3] : '') +'-'+specsuf[cutsuf].split('#')[1], desuf[1] + '@'+ specsuf[cutsuf].split('#')[0], (desuf[2] ? desuf[2] + '$' : '') + specsuf[cutsuf].split('#')[1]]; // manually add the two part "compound"
						return outsuf;
					}
				}
			}			
		}		
			
	}
	
	if(!lastpart && nextpart) {

// do this if compound beginning
	

	}
	
	if(lastpart && !nextpart) {

// do this if compound end
	
		// nominal declensions			

		if (res.length == 0) 
		{				
			for (var b = 0; b < wtrN.length; b++) // check through wtrN variants that we set at the beginning
			{			
				var temp = wtrN[b];
				if (mainda[temp] && !indeclinable[temp]) 
				{			
					for (i in mainda[temp]) {
						res.push([temp,mainda[temp][i]]); 
					}
				}
			}
		}

	// concise variants

		if (!resy)
		{
			for (var b = 0; b < wtrN.length; b++) // b for alternative types wtrN
			{				

				var temp = wtrN[b];
				
				if (yt[temp] && !resy && !indeclinable[temp]) 
				{					
					resy = temp; // for matching the dictionary entry in the output
				}						
			}
		}
		
		if(partslength == 1) { // verbs in "compounds"
			if (res.length == 0) 
			{				
				for (var b = 0; b < wtrV.length; b++) // check through wtrV variants that we set at the beginning
				{			
					var temp = wtrV[b];
					if (mainda[temp] && !indeclinable[temp]) 
					{			
						for (i in mainda[temp]) {
							res.push([temp,mainda[temp][i]]); 
						}
					}
				}
			}

		// concise variants

			if (!resy)
			{
				for (var b = 0; b < wtrV.length; b++) // b for alternative types wtrV
				{				

					var temp = wtrV[b];
					
					if (yt[temp] && !resy && !indeclinable[temp]) 
					{					
						resy = temp; // for matching the dictionary entry in the output
					}						
				}
			}
		}
		
		// do this if first compound part
		
			if (res.length == 0 && !trick) {
				// adding the ` for special suffix only words
				var trickmatch = findmatch('`'+oneword,lastpart,nextpart,partslength,1);
				if (trickmatch) { 
					return [oneword, trickmatch[1], (resy ? resy : (trickmatch[2] ? trickmatch[2] : '')) + '$'];  
				}

			}

	
	}	
	
	if(lastpart) { 

// do this if compound part or end

	// tricks
		if (res.length == 0 && resn.length == 0 && !resy && trick != 1) { // allow from certain tricks
			var aiu1 = /[aiu]/.exec(oneword.charAt(0));
			if (aiu1 && oneword.charAt(0) == oneword.charAt(1)) // check for lengthened vowels, shorten
			{
				if (!notpart[oneword.substring(1)]) {
					var trickmatch = findmatch(oneword.substring(1),lastpart,nextpart,partslength,1);
					if (trickmatch) {
						return [oneword, trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$']; 
					} 
				}
			}				
		}

		if (res.length == 0 && resn.length == 0 && !resy && !trick) {

			var aiu1 = /[aiu]/.exec(oneword.charAt(0));
			var aiu2 = /[aiu]/.exec(oneword.charAt(1));
			var aiu3 = /[aiu]/.exec(lastpart.charAt(lastpart.length-1));
			

			if (aiu3 && (!aiu1 || oneword.charAt(0) == lastpart.charAt(lastpart.length-1)) && lastpart.length > 1)
			{
						
				// check for lost this vowel because of last vowel, add 'a,i,u' (cakkhundriya.m)
				
				if (!notpart['a'+oneword]) {
					var trickmatch = findmatch('a'+oneword,lastpart,nextpart,partslength,2);
					if (trickmatch) { 
						return [oneword, trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$',nextpart]; 
					} 
				}
				if (!notpart['i'+oneword]) {
					var trickmatch = findmatch('i'+oneword,lastpart,nextpart,partslength,2);
					if (trickmatch) { 
						return [oneword, trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$',nextpart]; 
					} 
				}
				if (!notpart['u'+oneword]) {
					var trickmatch = findmatch('u'+oneword,lastpart,nextpart,partslength,2);
					if (trickmatch) { 
						return [oneword, trickmatch[1], (trickmatch[2] ? trickmatch[2] : '') + '$',nextpart]; 
					} 
				}
			}				



			if (oneword.charAt(0) == oneword.charAt(1) && oneword.length > 3 && !aiu1 && oneword.charAt(0) != 'y') // check for consonant doubling - for maggappa.tipanno, gives magga-p-pa.tipanno
			{
				var trickmatch = findmatch(oneword.substring(1),lastpart,nextpart,partslength,1); // the 'pa.tipanno' in our example
				if (trickmatch) { return Array(oneword.charAt(0) + '-' + trickmatch[0], '0^' + oneword.charAt(0) + '^3@' + trickmatch[1], '$' + (trickmatch[2] ? trickmatch[2] : '')); } 
			}
		}
	}

	
	var altarray = [];

	if (res.length == 0 && resn.length == 0 && resy) { // only concise
		altarray.push('0^' + oneword.replace(/`$/,'') + '^2^' + resy);
	}
	else {
		if (res.length != 0) { for (var i in res) { altarray.push(res[i][1] + '^' + res[i][0] + '^0' + (resy ? '^'+resy : '')); } }
		if (resn.length != 0) { for (var j in resn) { altarray.push(resn[j][1] + '^' + resn[j][0] + '^1' + (resy ? '^'+resy : '')); } }
	}
	if(res.length == 0 && resn.length == 0 && !resy) { return null; }
	return(Array(oneword.replace(/`$/,''),altarray.join('#'),resy));  // add oneword to the beginning to let us put the word together later
}		

var G_manualCompoundInd = [];
G_manualCompoundInd["yaava~ncida.m"] = [['yaava~n','yaava'],['c','ca'],['ida.m','ida']]; // first is what appears, second is the dict entry
G_manualCompoundInd['ceva'] = [['c','ca'],['eva','eva']]; 
G_manualCompoundInd['meta.m'] = [['m','me'],['eta.m','eta']];
G_manualCompoundInd['paneta.m'] = [['pan','pana'],['eta.m','eta']];
G_manualCompoundInd['sabbeheva'] = [['sabbeh','sabba'],['eva','eva']];
G_manualCompoundInd['esohamasmi'] = [['eso','eta'],['ham','aha.m'],['asmi','atthi']];
G_manualCompoundInd['nesohamasmi'] = [['n','na'],['eso','eta'],['ham','aha.m'],['asmi','atthi']];
G_manualCompoundInd['mayha.mpatthi'] = [['mayha.m','aha.m'],['p','pi'],['atthi','atthi']];

var G_manualCompoundDec = [];
G_manualCompoundDec['vi~n~naa.na~ncaayatana'] = [['vi~n~naa.na','vi~n~naa.na'],['~nca','aana~nca'],['ayatana','aayatana']];

function manualCompound(fullword) {
	var i = (G_manualCompoundInd[fullword] ? G_manualCompoundInd[fullword] : G_manualCompoundDec[fullword]);
	var parta = []
	var infoa = [];
	var shorta = [];
	for(j in i) {
		var da = [];
		var oneword = i[j][1];
		for (k in mainda[oneword]) {
			da.push(mainda[oneword][k] + '^' + oneword + '^0' + (yt[oneword] ? '^'+oneword : ''));
		}
		if(typeof(nameda[oneword]) == 'object') {
			for (k in nameda[oneword]) {
				da.push(nameda[oneword][k] + '^' + oneword + '^0' + (yt[oneword] ? '^'+oneword : ''));
			}
		}
		parta.push(i[j][0]);
		infoa.push(da.join('#'));
		shorta.push(yt[oneword] ? oneword : '');
	}
	G_outwords = [parta.join('-') + '$' + infoa.join('@')];
	G_shortdefpost = [shorta.join('$')]; 
}
