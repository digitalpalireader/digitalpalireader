var reorder = new Array();
reorder.push('#');
reorder.push('0');
reorder.push('1');
reorder.push('2');
reorder.push('3');
reorder.push('4');
reorder.push('5');
reorder.push('6');
reorder.push('7');
reorder.push('8');
reorder.push('9');

reorder.push('a');
reorder.push('ā');
reorder.push('i');
reorder.push('ī');
reorder.push('u');
reorder.push('ū');
reorder.push('e');
reorder.push('o');
reorder.push('ṃ');
reorder.push('k');
reorder.push('kh');
reorder.push('g');
reorder.push('gh');
reorder.push('ṅ');
reorder.push('c');
reorder.push('ch');
reorder.push('j');
reorder.push('jh');
reorder.push('ñ');
reorder.push('ṭ');
reorder.push('ṭh');
reorder.push('ḍ');
reorder.push('ḍh');
reorder.push('ṇ');
reorder.push('t');
reorder.push('th');
reorder.push('d');
reorder.push('dh');
reorder.push('n');
reorder.push('p');
reorder.push('ph');
reorder.push('b');
reorder.push('bh');
reorder.push('m');
reorder.push('y');
reorder.push('r');
reorder.push('l');
reorder.push('ḷ');
reorder.push('v');
reorder.push('s');
reorder.push('h');

var oldorder = new Array();
oldorder.push('#');
oldorder.push('0');
oldorder.push('1');
oldorder.push('2');
oldorder.push('3');
oldorder.push('4');
oldorder.push('5');
oldorder.push('6');
oldorder.push('7');
oldorder.push('8');
oldorder.push('9');

oldorder.push('A');
oldorder.push('B');
oldorder.push('C');
oldorder.push('D');
oldorder.push('E');
oldorder.push('F');
oldorder.push('G');
oldorder.push('H');
oldorder.push('I');
oldorder.push('J');
oldorder.push('K');
oldorder.push('L');
oldorder.push('M');
oldorder.push('N');
oldorder.push('O');
oldorder.push('P');
oldorder.push('Q');
oldorder.push('R');
oldorder.push('S');
oldorder.push('T');
oldorder.push('a');
oldorder.push('b');
oldorder.push('c');
oldorder.push('d');
oldorder.push('e');
oldorder.push('f');
oldorder.push('g');
oldorder.push('h');
oldorder.push('i');
oldorder.push('j');
oldorder.push('k');
oldorder.push('l');
oldorder.push('m');
oldorder.push('n');
oldorder.push('o');
oldorder.push('p');
oldorder.push('q');
oldorder.push('r');
oldorder.push('s');
oldorder.push('t');
oldorder.push('u');
oldorder.push('v');
oldorder.push('w');
oldorder.push('x');
oldorder.push('y');
oldorder.push('z');

var neworder = new Array();
var roo = '';
for(var w = 0; w < reorder.length; w++) {
	roo = reorder[w];
	neworder[roo] = oldorder[w];
}

function sortaz(mydata){  // sort pali array

	var mydata = mydata.sort(comparePaliAlphabet);
	for (i in mydata) {
		mydata[i] = mydata[i].replace(/^.*###/,''); // remove sorted words, return the rest
	} 
	return mydata;
}

function comparePaliAlphabet(a,b) {
	
	if (a.length == 0 || b.length == 0) return;

	var two = [toUni(a),toUni(b)];
	var nwo = [];
	for(i = 0; i < two.length; i++) {
		var wordval = '';
		for (var c = 0; c < two[i].length; c++) {
			
			var onechar = two[i].charAt(c);
			if(onechar == '#') break;
			
			var twochar = onechar + two[i].charAt(c+1);
			
			if (neworder[twochar]) {
				wordval+=neworder[twochar];
				c++;
			}
			else if (neworder[onechar]) {
				wordval+=neworder[onechar];
			}
			else {
				wordval+=onechar;
			}
		}
		two[i] = wordval;
		nwo[i] = wordval;
	}
	nwo.sort();
	//dalert(a+' '+nwo+' '+b+' ' + two+' '+(nwo[0] == two[0]));
	if(nwo[0] != two[0]) return 1;
	else return -1;
	
}


function findSimilarWords(word,list,min,fuzzy) {

	var simlist = [];
	var count = 0;
	for (i in list) {
//		if(word == list[i]) continue; // don't duplicate

		if(list.length == 0) var inthisword = i; // for associative arrays
		else var inthisword = list[i];
		if(fuzzy) var thisword = toFuzzy(inthisword);
		else var thisword = inthisword;
		
		var start = 0;
		var lstart = thisword.length;
		var sim = 0;
		//ddump([word,thisword]);
		for (x in word) {
			var tsim = 0;
			start = thisword.indexOf(word[x]);
			//ddump(['start',start,word[x],'last start ',lstart]); 
			if (start > -1 && start <= lstart) { // letter occurs before first occurrance of last letter
				lstart = start;
				var k = x;
				while (start < thisword.length && k < word.length) {
					if(thisword.substring(start).indexOf(word[k]) >= 0){
						start += thisword.substring(start).indexOf(word[k])+1;
						//ddump(['yes',k,word[k],start-1,thisword[start-1]]); 
						tsim++;
					}
					//else ddump(['no',k,word[k],start-1,thisword[start-1]]); 
					k++
				}
			}
			if (tsim > sim) sim = tsim;
		}
		var ld = thisword.length-word.length;
		if (ld < 0) ld = ld*(-1);
		if(!min || Math.round((sim-ld)/word.length*100) > min) {
			simlist.push(Math.round((sim-ld)/word.length*100)+'^'+inthisword);
			count++;
		}
		//ddump([word,thisword,ld,Math.round((sim-ld)/word.length*100) + '%']);
	}
	if(count > 0) {
		simlist.sort(function(a,b){ return parseInt(b.replace(/\^.+/,'')) - parseInt(a.replace(/\^.+/,''))});
		return simlist;
	}
	return null;
}

function groupBySimilarity(list,minsim) {

	var simlist = [];
	var listloc = [];
	
	for (f = 0; f < list.length; f++) {
		ddump([f+1,'of',list.length,'groups:',simlist.length]);
		var thisword = list[f]

		var thislist = findSimilarWords(thisword,list.slice(f+1));

		for (j in thislist) {
			var oneword = thislist[j].split('^')[1];
			if(listloc[oneword] == -1) continue;
			//if(f==0) ddump([simpc,'similar ' + thislist[j].split('^')[1] + ' & ' + list[i]]);
			var simpc =thislist[j].split('^')[0];
			if(simpc > minsim) {
				if(listloc[thisword] && !listloc[oneword]) {
					simlist[listloc[thisword]].push(oneword);
					listloc[oneword] = listloc[thisword];
				}
				else if(!listloc[thisword] && listloc[oneword]) {
					simlist[listloc[oneword]].push(thisword);
					listloc[thisword] = listloc[oneword];
				}
				else if (!listloc[thisword] && !listloc[oneword]) { // make new similar group
					simlist.push([thisword,oneword]);
					listloc[oneword] = simlist.length-1;
					listloc[thisword] = listloc[oneword];
				}

				//ddump([simlist.length,thisword,oneword]);
			}
		}
		if (!listloc[thisword]) { // nothing similar
			simlist.push([thisword]);
			listloc[thisword] = -1;
		}
	}
	for (i in simlist) {
		//if(simlist[i].length = 0) continue;
		simlist[i] = sortaz(simlist[i]); // sort groups internally alphabetically
	}
	simlist = simlist.sort(function(a,b){return(b.length - a.length);});  // by number of elements 
	simlist = simlist.sort(function(a,b){if(b.length == a.length) return comparePaliAlphabet(a[0],b[0]);});  // alphabeticcaly by first element
	return simlist;
}

function removeDuplicatesFromArray(list){
	var templist = [];
	var outlist = [];
	for (i in list) {
		templist[i] = 1;
	}
	for (i in templist) {
		outlist.push(i);
	}
	return outlist;
}
