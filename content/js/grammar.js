// uses inflect.js, english.js

function conjugate(word) {

	moveframey('dif');

	var yto = yt[word];
	
	if(yto == undefined) {
		alert('Word not found!');
		return;
	}

	clearDivs('dif');
	
	if(yto[4] == 'V') { // verb
		if(yto[9] == 'N') conjugateIrrVerb(word);
		else conjugateVerb(word);
	}
	else {
		if(yto[9] == 'N') conjugateIrrNoun(word);
		else conjugateNoun(word);
	}
}

var decNames = ['nom','voc','acc','ins','dat','abl','gen','loc'];
var gendNames = ['m','nt','f'];

function conjugateNoun(word) {

	var yto = yt[word];
	var yto5 = yto[5].split(',');
	var out = '';

	var outword = word.replace(/\`/g, '"');
	outword = outword.replace(/,/g, '.');
	if(yto[5].search(/\.[āīū],/) > -1 || yto[5].search(/\.[āīū]$/) > -1) outword = outword+outword.charAt(outword.length-1);
	outword = replaceunistandard(outword);
	
	var stem = yto[8]; 

	for (q in yto5) {
		var type1 = yto[4]+'#'+yto5[q];
		var type2 = infI[type1];
		if(type2 == undefined) {
			alert('No declension available.');
			return;
		}
		out += '<div align=center><b>' + outword + ': ' + type2[0] + '</b></div>'; // description

		var gender = yto[1];
		switch(gender) {
			case 'm.':
				if(type2[1] != '') {
					out += '<table class="dec"><tr><td class="toprow">Case</td><td class="toprow">s.</td><td class="toprow">pl.</td></tr>';
					var noun = infN[type2[1]];
					for (i in decNames) { // per number
						
						var di = decNames[i];

						out += '<tr><td class="sidecol"><b>'+di + '</b></td>';
						
						for(j in noun) {
							out+='<td class="decb small">'+stem+noun[j][di] + '</td>';
						}
						out += '</tr>';
					}
				}
			break;
			case 'nt.':
				if(type2[2] != '') {
					out += '<table class="dec"><tr><td class="toprow">Case</td><td class="toprow">s.</td><td class="toprow">pl.</td></tr>';
					var noun = infN[type2[2]];
					for (i in decNames) { // per number
						
						var di = decNames[i];

						out += '<tr><td class="sidecol"><b>'+di + '</b></td>';
						
						for(j in noun) {
							out+='<td class="decb small">'+stem+noun[j][di] + '</td>';
						}
						out += '</tr>';
					}
				}
			break;
			case 'f.':
				out += '<table class="dec"><tr><td class="toprow">Case</td><td class="toprow">s.</td><td class="toprow">pl.</td></tr>';
				if(type2[3] != '') {
					var noun = infN[type2[3]];
					for (i in decNames) { // per number
						
						var di = decNames[i];

						out += '<tr><td class="sidecol"><b>'+di + '</b></td>';
						
						for(j in noun) {
							out+='<td class="decb small">'+stem+noun[j][di] + '</td>';
						}
						out += '</tr>';
					}
				}
			break;
			default:
				var cnt = 0;
				var outt = '';
				out += '<table class="dec"><tr><td class="toprow">Case</td>';
				for (i in decNames) { // per number
					var di = decNames[i];
					outt += '<tr><td class="sidecol"><b>'+di + '</b></td>';
					cnt = 0;
					for (k = 1; k <= 3; k++) {
						if(type2[k] != '') {
							cnt++;
							if(i==0)out += '<td class="toprow">'+gendNames[k-1]+'.s.</td><td class="toprow">'+gendNames[k-1]+'.pl.</td>';
							var noun = infN[type2[k]];
							
							for(j in noun) {
								outt+='<td class="decb small '+ ((cnt == 1 || cnt == 3) ? 'greyb' : 'whiteb') + '">' + (noun[j][di] == undefined ? '-' : stem+noun[j][di]) + '</td>';
							}
						}
					}
					outt += '</tr>';
				}
				out += outt;
			break;
		}
	}
	out += '</table>';
	document.getElementById('difb').innerHTML = out;
	document.getElementById('cdif').scrollTop = 0;
}

var personNames = ['3rd','2nd','1st'];

function conjugateVerb(word) {

	var yto = yt[word];
	var out = '';

	var outword = word.replace(/\`/g, '"');
	outword = outword.replace(/,/g, '.');
	if(yto[5].search(/\.[āīū],/) > -1 || yto[5].search(/\.[āīū]$/) > -1) outword = outword+outword.charAt(outword.length-1);
	outword = replaceunistandard(outword);
	
	var stem = yto[8]; 

	var type1 = yto[4]+'#'+yto[5];
	var type2 = infI[type1];
	if(type2 == undefined) {
		return;
	}
	
	out += '<div align=center><b>' + outword + ': ' + type2[0] + '</b></div>'; // description
	out += '<table class="dec"><tr><td class="toprow">person</td><td class="toprow">s.</td><td class="toprow">pl.</td></tr>';
	var verb = infV[yto[5]];
	//alert(verb['3rd'][0]);
	for(j =0; j < 3; j++) { // 3 persons
		var pi = personNames[j];
		out += '<tr><td class="sidecol"><b>'+pi + '</b></td>';
		for (i = 0; i <= 1; i++) {
			out+='<td class="decb small">'+ (verb[pi] == undefined ? '-' : stem+verb[pi][i]) + '</td>';
		}
		out += '</tr>';
	}
	out += '</table>';
	document.getElementById('difb').innerHTML = out;
	document.getElementById('cdif').scrollTop = 0;
}

function conjugateIrrNoun(word) {
	var yto = yt[word];
	var out = '';

	var outword = word.replace(/\`/g, '"');
	outword = outword.replace(/,/g, '.');
	if(yto[5].search(/\.[āīū],/) > -1 || yto[5].search(/\.[āīū]$/) > -1) outword = outword+outword.charAt(outword.length-1);
	outword = replaceunistandard(outword);
	
	var stem = yto[8]; 

	var type1 = yto[4]+'#'+yto[5];
	var type2 = infI[type1];
	if(type2 == undefined) {
		alert('Verb not found');
		return;
	}
	
	out += '<div align=center><b>' + outword + ': ' + type2[0] + '</b></div>'; // description
	
	var noun = infNI[outword];
	if(noun == undefined) {
		alert('Noun not found');
		return;
	}
	var cnt = 0;
	var outt = '';
	out += '<table class="dec"><tr><td class="toprow">Case</td>';
	for (i in decNames) { // per number
		var di = decNames[i];
		outt += '<tr><td class="sidecol"><b>'+di + '</b></td>';
		cnt = 0;
		for (h = 0; h < gendNames.length; h++) {
			if(noun[gendNames[h]] == undefined) continue;
			cnt++;
			if(i==0)out += '<td class="toprow">'+gendNames[h]+'.s.</td><td class="toprow">'+gendNames[h]+'.pl.</td>';

			for(j = 0; j <=1; j++) {
				outt+='<td class="decb small '+ ((cnt == 1 || cnt == 3) ? 'greyb' : 'whiteb') + '">' + (noun[gendNames[h]][j][di] == undefined ? '-' : noun[gendNames[h]][j][di]) + '</td>';
			}
		}
		outt += '</tr>';
	}
	out += outt;
	out += '</table>';
	document.getElementById('difb').innerHTML = out;
	document.getElementById('cdif').scrollTop = 0;
	
}

function conjugateIrrVerb(word) {
	var yto = yt[word];
	var out = '';

	var outword = word.replace(/\`/g, '"');
	outword = outword.replace(/,/g, '.');
	if(yto[5].search(/\.[āīū],/) > -1 || yto[5].search(/\.[āīū]$/) > -1) outword = outword+outword.charAt(outword.length-1);
	outword = replaceunistandard(outword);
	
	var stem = yto[8]; 

	var type1 = yto[4]+'#'+yto[5];
	var type2 = infI[type1];
	if(type2 == undefined) {
		alert('Verb not found');
		return;
	}
	
	out += '<div align=center><b>' + outword + ': ' + type2[0] + '</b></div>'; // description
	out += '<table class="dec"><tr><td class="toprow">person</td><td class="toprow">s.</td><td class="toprow">pl.</td></tr>';
	var verb = infVI[yto[6]+'#'+outword]['65535']; // present
	if(verb == undefined) {
		alert('Verb not found');
		return;
	}
	
	//alert(verb['3rd'][0]);
	for(j =0; j < 3; j++) { // 3 persons
		var pi = personNames[j];
		out += '<tr><td class="sidecol"><b>'+pi + '</b></td>';
		for (i = 0; i <= 1; i++) {
			out+='<td class="decb small">'+ ((verb[pi] == undefined || verb[pi][i] == undefined) ? '-' : verb[pi][i]) + '</td>';
		}
		out += '</tr>';
	}
	out += '</table>';
	document.getElementById('difb').innerHTML = out;
	document.getElementById('cdif').scrollTop = 0;
}

