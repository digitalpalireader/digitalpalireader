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
reorder.push('aa');
reorder.push('i');
reorder.push('ii');
reorder.push('u');
reorder.push('uu');
reorder.push('e');
reorder.push('o');
reorder.push('.m');
reorder.push('k');
reorder.push('kh');
reorder.push('g');
reorder.push('gh');
reorder.push('"n');
reorder.push('c');
reorder.push('ch');
reorder.push('j');
reorder.push('jh');
reorder.push('~n');
reorder.push('.t');
reorder.push('.th');
reorder.push('.d');
reorder.push('.dh');
reorder.push('.n');
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
reorder.push('.l');
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


function sortaz(mydata){  // sort velthius pali array
	var outarray = new Array();
	var z=0;

	var onestring = "";
	var onechar = '';
	var twochar = '';
	var threechar = '';
	var badoutdata = '';
	var outdata = new Array();
	var preoutdata = '';
	var wordval = 0;
	var badarray = new Array();
	var badis = 0;
	
	for (var a = 0; a < mydata.length; a++) {
		wordval = '';

		onestring = mydata[a].toLowerCase();
		if (onestring.length > 0) {
			badis = 0;
			for (var b = 0; b < onestring.length; b++) {
				onechar = onestring.charAt(b);
				twochar = onestring.substring(b,b+2);
				threechar = onestring.substring(b,b+3);
				if (neworder[threechar]) {
					wordval+=neworder[threechar];
					b++;
					b++;
			}
				else if (neworder[twochar]) {
					wordval+=neworder[twochar];
					b++;
				}
				else if (neworder[onechar]) {
					wordval+=neworder[onechar];
				}
				else {
					wordval+=onechar;
				}
			}
			if (badis == 0) outarray[wordval] =  mydata[a];
		}
	}

	var keys = new Array();
	for(k in outarray)
	{
		 keys.push(k);
	}
	keys.sort( function (a, b){return (a > b) - (a < b);} );
	var sVal = '';
	for (var sKey in keys) {
		sVal = keys[sKey];
		outdata.push(outarray[sVal]);
	}
	return outdata;
}

function loadedx() {

	var x = [];

	for (i in nameda) {
		x.push(i.replace(/`n/g, '"n').replace(/,/g, '.')+'#'+nameda[i]);
	}
	var y = sortaz(x);
	document.getElementById('pad').innerHTML = y.join('\n');
}
