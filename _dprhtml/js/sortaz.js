'use strict';

DPR_G.reorder = new Array();
DPR_G.reorder.push('#');
DPR_G.reorder.push('0');
DPR_G.reorder.push('1');
DPR_G.reorder.push('2');
DPR_G.reorder.push('3');
DPR_G.reorder.push('4');
DPR_G.reorder.push('5');
DPR_G.reorder.push('6');
DPR_G.reorder.push('7');
DPR_G.reorder.push('8');
DPR_G.reorder.push('9');

DPR_G.reorder.push('a');
DPR_G.reorder.push('ā');
DPR_G.reorder.push('i');
DPR_G.reorder.push('ī');
DPR_G.reorder.push('u');
DPR_G.reorder.push('ū');
DPR_G.reorder.push('e');
DPR_G.reorder.push('o');
DPR_G.reorder.push('ṃ');
DPR_G.reorder.push('k');
DPR_G.reorder.push('kh');
DPR_G.reorder.push('g');
DPR_G.reorder.push('gh');
DPR_G.reorder.push('ṅ');
DPR_G.reorder.push('c');
DPR_G.reorder.push('ch');
DPR_G.reorder.push('j');
DPR_G.reorder.push('jh');
DPR_G.reorder.push('ñ');
DPR_G.reorder.push('ṭ');
DPR_G.reorder.push('ṭh');
DPR_G.reorder.push('ḍ');
DPR_G.reorder.push('ḍh');
DPR_G.reorder.push('ṇ');
DPR_G.reorder.push('t');
DPR_G.reorder.push('th');
DPR_G.reorder.push('d');
DPR_G.reorder.push('dh');
DPR_G.reorder.push('n');
DPR_G.reorder.push('p');
DPR_G.reorder.push('ph');
DPR_G.reorder.push('b');
DPR_G.reorder.push('bh');
DPR_G.reorder.push('m');
DPR_G.reorder.push('y');
DPR_G.reorder.push('r');
DPR_G.reorder.push('l');
DPR_G.reorder.push('ḷ');
DPR_G.reorder.push('v');
DPR_G.reorder.push('s');
DPR_G.reorder.push('h');

DPR_G.oldorder = new Array();
DPR_G.oldorder.push('#');
DPR_G.oldorder.push('0');
DPR_G.oldorder.push('1');
DPR_G.oldorder.push('2');
DPR_G.oldorder.push('3');
DPR_G.oldorder.push('4');
DPR_G.oldorder.push('5');
DPR_G.oldorder.push('6');
DPR_G.oldorder.push('7');
DPR_G.oldorder.push('8');
DPR_G.oldorder.push('9');

DPR_G.oldorder.push('A');
DPR_G.oldorder.push('B');
DPR_G.oldorder.push('C');
DPR_G.oldorder.push('D');
DPR_G.oldorder.push('E');
DPR_G.oldorder.push('F');
DPR_G.oldorder.push('G');
DPR_G.oldorder.push('H');
DPR_G.oldorder.push('I');
DPR_G.oldorder.push('J');
DPR_G.oldorder.push('K');
DPR_G.oldorder.push('L');
DPR_G.oldorder.push('M');
DPR_G.oldorder.push('N');
DPR_G.oldorder.push('O');
DPR_G.oldorder.push('P');
DPR_G.oldorder.push('Q');
DPR_G.oldorder.push('R');
DPR_G.oldorder.push('S');
DPR_G.oldorder.push('T');
DPR_G.oldorder.push('a');
DPR_G.oldorder.push('b');
DPR_G.oldorder.push('c');
DPR_G.oldorder.push('d');
DPR_G.oldorder.push('e');
DPR_G.oldorder.push('f');
DPR_G.oldorder.push('g');
DPR_G.oldorder.push('h');
DPR_G.oldorder.push('i');
DPR_G.oldorder.push('j');
DPR_G.oldorder.push('k');
DPR_G.oldorder.push('l');
DPR_G.oldorder.push('m');
DPR_G.oldorder.push('n');
DPR_G.oldorder.push('o');
DPR_G.oldorder.push('p');
DPR_G.oldorder.push('q');
DPR_G.oldorder.push('r');
DPR_G.oldorder.push('s');
DPR_G.oldorder.push('t');
DPR_G.oldorder.push('u');
DPR_G.oldorder.push('v');
DPR_G.oldorder.push('w');
DPR_G.oldorder.push('x');
DPR_G.oldorder.push('y');
DPR_G.oldorder.push('z');

DPR_G.neworder = new Array();
DPR_G.roo = '';
for(var w = 0; w < DPR_G.reorder.length; w++) {
  DPR_G.roo = DPR_G.reorder[w];
  DPR_G.neworder[DPR_G.roo] = DPR_G.oldorder[w];
}

function sortaz(mydata){  // sort pali array
  mydata = mydata.sort(comparePaliAlphabet);
  for (var i in mydata) {
    mydata[i] = mydata[i].replace(/^.*###/,''); // remove sorted words, return the rest
  }
  return mydata;
}

function sortStrip(word) {
  if(DPR_G.DPR_prefs['nigahita']) {
    word = word.replace(/ṁ/g, 'ṃ');
    word = word.replace(/Ṁ/g, 'Ṃ');
  }
  word = DPR_translit_mod.toUni(word.toLowerCase()).replace(/[^a-zāīūṃṅñṭḍṇḷ#]/g,'');
  return word;
}

function comparePaliAlphabet(a,b) {

  if (a.length == 0 || b.length == 0) return;

  var two = [sortStrip(a),sortStrip(b)];
  var nwo = [];
  for(var i = 0; i < two.length; i++) {
    var wordval = '';
    for (var c = 0; c < two[i].length; c++) {

      var onechar = two[i].charAt(c);
      if(onechar == '#') break;

      var twochar = onechar + two[i].charAt(c+1);

      if (DPR_G.neworder[twochar]) {
        wordval+=DPR_G.neworder[twochar];
        c++;
      }
      else if (DPR_G.neworder[onechar]) {
        wordval+=DPR_G.neworder[onechar];
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
  for (var i in list) {
//    if(word == list[i]) continue; // don't duplicate

    if(list.length == 0) {
      var inthisword = i; // for associative arrays
    }
    else var inthisword = list[i];

    if(!inthisword) continue;

    if(fuzzy) var thisword = DPR_translit_mod.toFuzzy(inthisword);
    else var thisword = inthisword;

    var start = 0;
    var lstart = thisword.length;
    var sim = 0;
    //ddump([word,thisword]);
    for (var x in word) {
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
    var percent = Math.round((sim-ld)/word.length*100);
    if(!min || percent > min) {
      if(percent < 0) percent = 0;
      simlist.push([percent,inthisword]);
      count++;
    }
    //ddump([word,thisword,ld,Math.round((sim-ld)/word.length*100) + '%']);
  }
  if(count > 0) {
    simlist.sort(function(a,b){ return parseInt(b[0]) - parseInt(a[0])});
    return simlist;
  }
  return null;
}

function groupBySimilarity(list,minsim) {

  var simlist = [];
  var listloc = [];

  for (var f = 0; f < list.length; f++) {
    if(DPR_G.devCheck) ddump([f+1,'of',list.length,'words,',simlist.length,'groups']);
    var thisword = list[f]

    var thislist = findSimilarWords(thisword,list.slice(f+1));

    for (var j in thislist) {
      var oneword = thislist[j][1];
      if(listloc[oneword] == -1) continue;
      //if(f==0) ddump([simpc,'similar ' + thislist[j].split('^')[1] + ' & ' + list[i]]);
      var simpc =thislist[j][0];
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
  for (var i in simlist) {
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
  for (var i in list) {
    templist[i] = 1;
  }
  for (var i in templist) {
    outlist.push(i);
  }
  return outlist;
}
