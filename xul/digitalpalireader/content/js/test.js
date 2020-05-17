function textType(e) {
  e.value=toUni(e.value);
  $('.dect').css('background-color','');
}

function init() {

  src = null;
  options = {
    revert:true,
    /*axis: 'x',*/
    start: function() {
      $(this).css('z-index',100);
      $(this).css('cursor','-moz-grabbing');
      src = $(this).parent();
    }
  };

  $(".drag").draggable(options);
  $(".decr").droppable({
    drop: function(event, ui) {
      src.append(
          $('.drag', this).remove().clone()
          .removeClass().addClass("drag")
          .css({"left": '', "opacity": '',"top":'',"cursor":"-moz-grab","z-index":"1"})
          .draggable(options)
      );
      if(src.attr('id') != $(this).attr('id')) {
        $(this).append(
            ui.draggable.remove().clone()
            .removeClass().addClass("drag")
            .css({"left": '', "opacity": '',"top":'',"cursor":"-moz-grab","z-index":"1"})
            .draggable(options)
        );
      }
    }
  });
}

// vocab

  // pali > eng

function newquiz() {
  $('#mafbc').html('<input type="hidden" id="qno" value="1"><input type="hidden" id="Qran" value="0"><input type="hidden" id="Qwan" value="0"><p></p><div class="quizc" style="background-color:'+DPR_prefs['colbkcp']+'"><p><b>Question #<span id="qn"></span>:</b> What is the meaning of "<font id="qq"></font>"?</p></div><p><i id="Qchecka">Choose the right answer below (or use number keys (1-4) to select an answer):</i></p><p><font id="answers"></font></p><div class="quizc" style="background-color:'+DPR_prefs['colbkcp']+'"><p><table width=100%><tr><td>Right Answers: <b id="Qra" style="color:'+DPR_prefs['green']+'"></b></td><td>Wrong Answers: <b id="Qwa" style="color:'+DPR_prefs['red']+'"></b></td><td>Percent: <b style="color:white" id="Qpa">&nbsp;--%&nbsp;</b></td></tr><tr><td colspan="3"><hr /></td></tr><tr><td>Total Right Answers: <b id="Qrights"></b></td><td>Left to answer: <b id="Qlefts"></b></td><td><span class="abut obut small" onclick="clearrights()">clear</span></td></tr></table></div>');
  $('#Qra').html('&nbsp;0&nbsp;');
  $('#Qwa').html('&nbsp;0&nbsp;');
  quizme();

}

  // eng > pali

function newquizE() {
  $('#mafbc').html('<input type="hidden" id="qno" value="1"><input type="hidden" id="Qran" value="0"><input type="hidden" id="Qwan" value="0"><p></p><div class="quizc" style="background-color:'+DPR_prefs['colbkcp']+'"><p><b>Question #<span id="qn"></span>:</b> What is "<font id="qq"></font>" in Pali?</p></div><p><i id="Qchecka">Choose the right answer below (or use number keys (1-4) to select an answer):</i></p><p><font id="answers"></font></p><div class="quizc" style="background-color:'+DPR_prefs['colbkcp']+'"><p><table width=100%><tr><td>Right Answers: <b id="Qra" style="color:'+DPR_prefs['green']+'"></b></td><td>Wrong Answers: <b id="Qwa" style="color:'+DPR_prefs['red']+'"></b></td><td>Percent: <b style="color:white" id="Qpa">&nbsp;--%&nbsp;</b></td></tr><tr><td colspan="3"><hr /></td></tr><tr><td>Total Right Answers: <b id="Qrights"></b></td><td>Left to answer: <b id="Qlefts"></b></td><td><span class="abut obut small" onclick="clearrights()">clear</span></td></tr></table></div>');
  $('#Qra').html('&nbsp;0&nbsp;');
  $('#Qwa').html('&nbsp;0&nbsp;');
  quizmeE();

}

// nouns

  // full declension

  function newDquiz() {
    resetTable();
  }


  // single declension

  function newDOnequiz() {
    getDeclension();
  }

  // moveable declension

  function newDMquiz() {
    resetMTable();
  }

// verbs

  // full declension

  function newVquiz() {
    resetVTable();
  }

  // single declension

  function newVOnequiz() {
    getVDeclension();
  }
  // moveable declension

  function newMVquiz() {
    resetMVTable();
  }

  // english verbs

  function newVEquiz() {
    resetVETable();
  }

function quizme() {

  // remember rights
  var rights = [];
  var srights;
  if(fileExists('DPTEST')) {
    srights = readFile("DPTEST");
    if(srights) {
      if(/,/.exec(srights[0])) rights=srights.join(',').split(',');
      else rights = srights;
      if(srights.join('') == '') $('#Qrights').html(0);
      else $('#Qrights').html(rights.length);
    }
  }

  var quiza = new Array();
  var quizeachwrong = new Array();
  var quizanswersout = '';
  var quizrandomright=Math.floor(Math.random()*20926);
  if (rights.length >= 20926) {
    alertFlash('Congratulations, you\'ve completed the entire dictionary!','RGBa(0,255,0,0.8)');
    clearrights();
  }
  else while (("|" + rights.join("|") + "|").indexOf('|'+quizrandomright+'|') > -1) { // in case we got it right before
    quizrandomright=Math.floor(Math.random()*20926);
  }
  var qtmp2 = 0;

  var quizrightorder=Math.floor(Math.random()*4);
  for (var quizcpd in yt){
    quiza.push(quizcpd);
  }
  $('#Qlefts').html(quiza.length - rights.length);
  for (var qtmp = 0; qtmp < 3; qtmp++) {
    quizeachwrong[qtmp]=Math.floor(Math.random()*20926);
    while (quizeachwrong[qtmp] == quizrandomright) { // in case we got the same one again!
      quizeachwrong[qtmp]=Math.floor(Math.random()*20926);
    }
  }

  var questionout =  quiza[quizrandomright].replace(/,/g, '.');
  questionout =  toUni(questionout.replace(/`n/g, '"n'));

  $('#qn').html(document.getElementById('qno').value);
  $('#qq').html(questionout);

  var ytthis = yt[quiza[quizrandomright]];

  var formatanswerwrong = '';
  var formatanswer = ytthis[2];
  var formatanswerout = ytthis[2];
  if (ytthis[1].length > 0) formatanswerout += ' (' + ytthis[1] + ')';
  for (var qtmp = 0; qtmp < 4; qtmp++) {
    if (qtmp == quizrightorder) {
      quizanswersout += '<p><span class="abut obut" id="Qa'+(qtmp+1)+'" onclick="answerquiz(1,\'' + questionout + ' = ' + formatanswerout + '\',' + quizrandomright + ')">'+(qtmp+1)+'</span> '+formatanswer+'</p>';
    }
    else {
      ytthis = yt[quiza[quizeachwrong[qtmp2]]];
      formatanswerwrong = ytthis[2];
      quizanswersout += '<p><span class="abut obut" id="Qa'+(qtmp+1)+'" onclick="answerquiz(0,\'' + questionout + ' = ' + formatanswerout + '\')">'+(qtmp+1)+'</span> '+formatanswerwrong+'</p>';
      qtmp2++;
    }
  }
  $('#answers').html(quizanswersout);
}

function answerquiz(right,answer,numb) {
  $('#qn').html(++document.getElementById('qno').value);
  if (right == 1) {
    $('#Qchecka').html('<span style="color:green">Right! &nbsp;' + answer + '</span>');
    $('#Qra').html('&nbsp;'+ (++document.getElementById('Qran').value) + '&nbsp;');

    // add right to list of rights
    if(fileExists('DPTEST')) {
      var rightfile = readFile('DPTEST');
      if(rightfile.join('') == '') rightfile = [numb];
            else rightfile.push(numb);
            var outfile = rightfile.join('\n');
            if(/,/.exec(outfile)) outfile = outfile.split(',').join('\n');
            writeFile('DPTEST', outfile , "UTF-8");
        }
    else {
            writeFile('DPTEST', ""+numb + '\n', "UTF-8");
        }
  }
  else {
    $('#Qchecka').html('<span style="color:red">Wrong! &nbsp;' + answer + '</span>');
    $('#Qwa').html('&nbsp;'+(++document.getElementById('Qwan').value) + '&nbsp;');
  }

  var percentr = Number(document.getElementById('Qran').value) / (Number(document.getElementById('Qran').value) + Number(document.getElementById('Qwan').value))*100;

  var colorpc = 0;
  if (percentr <= 50) {
    colorpc = Math.round(percentr/50*255);
    colorpc = colorpc.toString(16).toUpperCase();
    if (colorpc.length == 1) colorpc = '0'+colorpc;
    document.getElementById('Qpa').style.color = '#'+ 'FF' + colorpc + '00';
  }
  else {
    colorpc = Math.round((percentr - 50)/50*255)*(-1)+255;
    colorpc = colorpc.toString(16).toUpperCase();
    if (colorpc.length == 1) colorpc = '0'+colorpc;
    document.getElementById('Qpa').style.color = '#' + colorpc +'FF' + '00';
  }
  $('#Qpa').html('&nbsp;'+Math.round(percentr) + '%&nbsp;');
  quizme();
}

function clearrights() {
    $('#Qra').html(0);
    document.getElementById('Qran').value = 0;
    $('#Qwa').html(0);
    document.getElementById('Qwan').value = 0;
    $('#Qpa').html("");
  $('#Qrights').html(0);

  writeFile("DPTEST","","UTF-8");
}


// eng > pali

function quizmeE() {

  // remember rights
  var rights = [];
  var srights;
  if(fileExists('DPTESTE')) {
    srights = readFile("DPTESTE");
    if(srights) {
      if(/,/.exec(srights[0])) rights=srights.join(',').split(',');
      else rights = srights;
      if(srights.join('') == '') $('#Qrights').html(0);
      else $('#Qrights').html(rights.length);
    }
  }

  var quiza = new Array();
  var quizeachwrong = new Array();
  var quizanswersout = '';
  var quizrandomright=Math.floor(Math.random()*epd.length);
  if (rights.length >= epd.length) {
    alertFlash('Congratulations, you\'ve completed the entire dictionary!','RGBa(0,255,0,0.8)');
    clearrightsE();
  }
  else while (("|" + rights.join("|") + "|").indexOf('|'+quizrandomright+'|') > -1) { // in case we got it right before
    quizrandomright=Math.floor(Math.random()*epd.length);
  }
  var qtmp2 = 0;

  var quizrightorder=Math.floor(Math.random()*4);
  $('#Qlefts').html(epd.length - rights.length);
  for (var qtmp = 0; qtmp < 3; qtmp++) {
    quizeachwrong[qtmp]=Math.floor(Math.random()*epd.length);
    while (quizeachwrong[qtmp] == quizrandomright) { // in case we got the same one again!
      quizeachwrong[qtmp]=Math.floor(Math.random()*epd.length);
    }
  }
  var ytthis = epd[quizrandomright].split('^');

  var questionout =  ytthis[0];

  $('#qn').html(document.getElementById('qno').value);
  $('#qq').html(questionout);


  var formatanswerwrong = '';
  var formatanswer = ytthis[1];
  var formatanswerout = ytthis[1];
  for (var qtmp = 0; qtmp < 4; qtmp++) {
    if (qtmp == quizrightorder) {
      quizanswersout += '<p><span class="abut obut" id="Qa'+(qtmp+1)+'" onclick="answerquizE(1,\'' + questionout + ' = ' + formatanswerout + '\',' + quizrandomright + ')">'+(qtmp+1)+'</span> '+formatanswer+'</p>';
    }
    else {
      var thisyt = epd[quizeachwrong[qtmp2]].split('^');
      formatanswerwrong = thisyt[1];
      quizanswersout += '<p><span class="abut obut" id="Qa'+(qtmp+1)+'" onclick="answerquizE(0,\'' + questionout + ' = ' + formatanswerout + '\')">'+(qtmp+1)+'</span> '+formatanswerwrong+'</p>';
      qtmp2++;
    }
  }
  $('#answers').html(quizanswersout);
}

function answerquizE(right,answer,numb) {
  $('#qn').html(++document.getElementById('qno').value);
  if (right == 1) {
    $('#Qchecka').html('<span style="color:green">Right! &nbsp;' + answer + '</span>');
    $('#Qra').html('&nbsp;'+ (++document.getElementById('Qran').value) + '&nbsp;');

    // add right to list of rights
    if(fileExists('DPTESTE')) {
      var rightfile = readFile('DPTESTE');
      if(rightfile.join('') == '') rightfile = [numb];
            else rightfile.push(numb);
            var outfile = rightfile.join('\n');
            if(/,/.exec(outfile)) outfile = outfile.split(',').join('\n');
            writeFile('DPTESTE', outfile , "UTF-8");
        }
    else {
            writeFile('DPTESTE', ""+numb + '\n', "UTF-8");
        }
  }
  else {
    $('#Qchecka').html('<span style="color:red">Wrong! &nbsp;' + answer + '</span>');
    $('#Qwa').html('&nbsp;'+(++document.getElementById('Qwan').value) + '&nbsp;');
  }

  var percentr = Number(document.getElementById('Qran').value) / (Number(document.getElementById('Qran').value) + Number(document.getElementById('Qwan').value))*100;

  var colorpc = 0;
  if (percentr <= 50) {
    colorpc = Math.round(percentr/50*255);
    colorpc = colorpc.toString(16).toUpperCase();
    if (colorpc.length == 1) colorpc = '0'+colorpc;
    document.getElementById('Qpa').style.color = '#'+ 'FF' + colorpc + '00';
  }
  else {
    colorpc = Math.round((percentr - 50)/50*255)*(-1)+255;
    colorpc = colorpc.toString(16).toUpperCase();
    if (colorpc.length == 1) colorpc = '0'+colorpc;
    document.getElementById('Qpa').style.color = '#' + colorpc +'FF' + '00';
  }
  $('#Qpa').html('&nbsp;'+Math.round(percentr) + '%&nbsp;');
  quizmeE();
}

function clearrightsE() {
    $('#Qra').html(0);
    document.getElementById('Qran').value = 0;
    $('#Qwa').html(0);
    document.getElementById('Qwan').value = 0;
    $('#Qpa').html("");
  $('#Qrights').html(0);

  writeFile("DPTESTE","","UTF-8");
}

var decls = [];
decls.push('nomSin');
decls.push('nomPl');
decls.push('accSin');
decls.push('accPl');
decls.push('insSin');
decls.push('insPl');
decls.push('datSin');
decls.push('datPl');
decls.push('ablSin');
decls.push('ablPl');
decls.push('genSin');
decls.push('genPl');
decls.push('locSin');
decls.push('locPl');
decls.push('vocSin');
decls.push('vocPl');

var declsToNo = [];
declsToNo['nomSin'] = [0,0];
declsToNo['nomPl'] = [0,1];
declsToNo['accSin'] = [1,0];
declsToNo['accPl'] = [1,1];
declsToNo['insSin'] = [2,0];
declsToNo['insPl'] = [2,1];
declsToNo['datSin'] = [3,0];
declsToNo['datPl'] = [3,1];
declsToNo['ablSin'] = [4,0];
declsToNo['ablPl'] = [4,1];
declsToNo['genSin'] = [5,0];
declsToNo['genPl'] = [5,1];
declsToNo['locSin'] = [6,0];
declsToNo['locPl'] = [6,1];
declsToNo['vocSin'] = [7,0];
declsToNo['vocPl'] = [7,1];

var declNo = [];
declNo.push(['nomSin','nomPl']);
declNo.push(['accSin','accPl']);
declNo.push(['insSin','insPl']);
declNo.push(['datSin','datPl']);
declNo.push(['ablSin','ablPl']);
declNo.push(['genSin','genPl']);
declNo.push(['locSin','locPl']);
declNo.push(['vocSin','vocPl']);


var declb = ['nom','acc','ins','dat','abl','gen','loc','voc'];
var numba = ['Sin','Pl'];

/*

var out='';

for (var i in words) {
  out+= "words.push(['"+words[i][0]+"','"+words[i][1]+"','"+allT[i]+"','"+allC[i]+"']);<br/>";
}
*/

// noun common function

function getRandomNoun() {
  $('.dect').css('background-color','');
  $('.drag').css('background-color','');
  DPR_G.G_quiza = [];

  var reg = $('#reg').prop('checked');
  var irreg = $('#irreg').prop('checked');

  for (var j in yt){
    if(yt[j][4] != 'N')
      continue;
    if(!reg && yt[j][9] == 'Y')
      continue;
    if(!irreg && yt[j][9] == 'N')
      continue;
    if(!/[tmf]\./.test(yt[j][5]))
      continue;
    DPR_G.G_quiza.push([yt[j],j]);
  }
  if(!DPR_G.G_quiza.length)
    return;

  var rn=Math.floor(Math.random()*DPR_G.G_quiza.length);
  while(DPR_G.G_oneNoun[3] == rn)
    var rn=Math.floor(Math.random()*DPR_G.G_quiza.length);

  var yto = DPR_G.G_quiza[rn][0];
  var word = DPR_G.G_quiza[rn][1];
  var stem = yto[8];

  var yto5 = yto[5].split(',');
  for(var i in yto5) {
    if(/[tmf]\./.test(yto5[i])) {
      yto[5] = yto5[i];
      break;
    }
  }


  var type1 = yto[4]+'#'+yto[5];
  var type2 = DPR_G.iI[type1];
  if(type2[1] == '--') { // irreg
    yto[8] = '';
    var noun = DPR_G.iNI[toUni(word)][yto[5].replace(/\..+/,'')];
  }
  else if(type2[1])
    var noun = DPR_G.iN[type2[1]];
  else if(type2[2])
    var noun = DPR_G.iN[type2[2]];
  else if(type2[3])
    var noun = DPR_G.iN[type2[3]];
  else {
    return getRandomNoun();
  }


  DPR_G.G_oneNoun = [word,yto,noun,rn];

}


// noun declension

DPR_G.G_oneNoun = [];
DPR_G.G_quiza = [];

function resetTable()  {
  if ($('#Qshow').html() == 'Hide') hideAnswers();

  getRandomNoun();

  var word = DPR_G.G_oneNoun[0];
  var yto = DPR_G.G_oneNoun[1];

  var meaning = yto[2].replace(/\`/g, '"');
  meaning = meaning + ' (' + yto[1] + ')';
  meaning = toUni(meaning);

  //if(/[tmf]\.[aiuāīū]$/.test(yto[5])) word = word+word.charAt(word.length-1);


  $('#QwhichT').html(toUni(word));
  $('#QwhichC').html(meaning);

  addStems();
  clearAnswers();
  //showRights();
}

function addStems() {
  var stem = DPR_G.G_oneNoun[1][8];
  var noun = DPR_G.G_oneNoun[2];
  for (var i in decls) {
    document.getElementById(decls[i]+'s').innerHTML = stem;
    if (!noun[declsToNo[decls[i]][1]] || !noun[declsToNo[decls[i]][1]][declb[declsToNo[decls[i]][0]]]) {
      $('#'+decls[i]+'t').attr('disabled','true');
    }
    else $('#'+decls[i]+'t').removeAttr('disabled');
  }
}

var Drights = [];

function checkAnswers() {
  var wrong = 0;
  var stem = DPR_G.G_oneNoun[1][8];
  var noun = DPR_G.G_oneNoun[2];
  for (var i in decls) {
    var onn = null;
    if(noun[declsToNo[decls[i]][1]])
      onn = noun[declsToNo[decls[i]][1]][declb[declsToNo[decls[i]][0]]];
    var right = 0;
    var thisa =$('#'+decls[i]+'t');

    if (!onn) {
      thisa.css('background-color','');
      right = 1;
      continue;
    }
    for (var j in onn) {
      onn[j] = onn[j].replace(/[()]/g,'');
      if (onn[j] == '') {
        thisa.css('background-color','');
        right = 1;
        break;
      }
      if (thisa.val() == onn[j]) {
        thisa.css('background-color','#5F5');
        right = 1;
        break;
      }
      else {
        thisa.css('background-color','#F55');
      }
    }
    if (right == 0) wrong = 1;
  }
  if (wrong == 0) {
    alertFlash("Well done!",'green');
    //Drights[rn] = 1;
    resetTable();
  }
  //showRights();
}

function showRights() {
  $('#Qcorrects').html('');
  for (var i in Drights) {
    document.getElementById('Qcorrects').innerHTML += DPR_G.G_oneNoun[1][8]+'-<br />';
  }
  if ($('#Qcorrects').html() != '') {
    $('#corrects').show();
    $('#Qcorrects').html($('#Qcorrects').html()+'<br /><span class="abut obut tiny" title="Reset right answers" onclick="rights = []; showRights();" id="resetRights">Reset</span>');
    return;
  }
  $('#corrects').hide();
}

function clearAnswers() {
  for (var i in decls) {
    document.getElementById(decls[i]+'t').value = '';
    document.getElementById(decls[i]+'t').style.backgroundColor = '';
  }
}

function showAnswers() {

  $('#Qshow').html('Hide');
  document.getElementById('Qshow').onclick = function () { hideAnswers() };
  var stem = DPR_G.G_oneNoun[1][8];
  var noun = DPR_G.G_oneNoun[2];
  for (var i in decls) {
    var onn = null;
    if(noun[declsToNo[decls[i]][1]])
      onn = noun[declsToNo[decls[i]][1]][declb[declsToNo[decls[i]][0]]];
    if (!onn) {
      document.getElementById(decls[i]+'t').style.backgroundColor = '';
      document.getElementById(decls[i]+'t').style.display = 'none';
      document.getElementById(decls[i]+'s').innerHTML = '';
      continue;
    }
    document.getElementById(decls[i]+'t').style.backgroundColor = '';
    document.getElementById(decls[i]+'t').style.display = 'none';
    document.getElementById(decls[i]+'s').innerHTML = stem+onn.join(', '+stem);
  }
}
function hideAnswers() {
  $('#Qshow').html('Show');
  document.getElementById('Qshow').onclick = function() { showAnswers() };
  for (var i in decls) {
    document.getElementById(decls[i]+'t').style.backgroundColor = 'white';
    document.getElementById(decls[i]+'t').style.display = 'block';
    document.getElementById(decls[i]+'s').innerHTML = '';
  }
  addStems();
}

DPR_G.G_oneDec = [0,0,0];

function getDeclension() {
  $('#declension')[0].selectedIndex = -1;
  $('#number')[0].selectedIndex = -1;

  getRandomNoun();

  var yto = DPR_G.G_oneNoun[1];
  var stem = yto[8];
  var noun = DPR_G.G_oneNoun[2];

  var rn=Math.floor(Math.random()*declb.length);
  var rn2=Math.floor(Math.random()*2);
  var alts = noun[rn2][declb[rn]];
  var rn3=Math.floor(Math.random()*alts.length);
  var oneWord = alts[rn3];
  if(!oneWord) {
    return getDeclension();
  }
  DPR_G.G_oneDec = [stem,oneWord,rn,rn2];

  var word = DPR_G.G_oneNoun[0];
  var meaning = yto[2].replace(/\`/g, '"');
  meaning = meaning + ' (' + yto[1] + ')';
  meaning = toUni(meaning);

  $('#QwhichT').html(toUni(word));
  $('#QwhichC').html(meaning);

  $('#oneDec').html(stem+alts[rn3]);
}


function checkAnswer2() {
  var dec = $('#declension')[0].selectedIndex;
  var num = $('#number')[0].selectedIndex;
  var noun = DPR_G.G_oneNoun[2];
  var alts = noun[num][declb[dec]];
  for(var i in alts) {
    if(alts[i] == DPR_G.G_oneDec[1]) {
      alertFlash("That's correct!",'green');
      getDeclension();
      return
    }
  }
  alertFlash("That is incorrect.",'red');
}

function showAnswer2(cnt){
  $('#declension')[0].selectedIndex = -1;
  $('#number')[0].selectedIndex = -1;

  if(!cnt)
    cnt = 0;
  if(cnt == 3)
    return getDeclension();

  setTimeout(function(){showAnswerBounce(cnt)},500);
}

function showAnswerBounce(cnt) {
  cnt++;
  var d = declsToNo[decls[DPR_G.G_oneDec[2]]];
  $('#declension')[0].selectedIndex = d[0];
  $('#number')[0].selectedIndex = d[1];
  setTimeout(function(){showAnswer2(cnt)},500);
}

// moveable

function resetMTable()  {

  getRandomNoun();
  var word = DPR_G.G_oneNoun[0];
  var stem = DPR_G.G_oneNoun[1][8];
  var noun = DPR_G.G_oneNoun[2];
  var yto = DPR_G.G_oneNoun[1];

  var meaning = yto[2].replace(/\`/g, '"');
  meaning = meaning + ' (' + yto[1] + ')';
  meaning = toUni(meaning);

  $('#QwhichT').html(toUni(word));
  $('#QwhichC').html(meaning);

  for (var i in decls) {
    if(noun[declsToNo[decls[i]][1]] && noun[declsToNo[decls[i]][1]][declb[declsToNo[decls[i]][0]]])
      var alts = noun[declsToNo[decls[i]][1]][declb[declsToNo[decls[i]][0]]];
    else {
      $('#drag'+i).html('&nbsp;');
      continue;
    }
    if(alts)
      var rn=Math.floor(Math.random()*alts.length);
    $('#drag'+i).html(alts?stem+alts[rn].replace(/[()]/g,''):'&nbsp;');
  }

  var top = decls.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));

    var src = $('#drag'+top).parent();
    var dest = $('#drag'+current).parent();

    src.append(
      $('#drag'+current).remove().clone()
    );

    dest.append(
      $('#drag'+top).remove().clone()
    );

  }
  init();

  //showRights();
}

function checkMAnswers() {
    var wrong = 0;
  var stem = DPR_G.G_oneNoun[1][8];
  var noun = DPR_G.G_oneNoun[2];

  loop:
    for (var i in decls){
    var thisa = $('#decr'+i+' div');

    if(noun[declsToNo[decls[i]][1]] && noun[declsToNo[decls[i]][1]][declb[declsToNo[decls[i]][0]]])
      var narr = noun[declsToNo[decls[i]][1]][declb[declsToNo[decls[i]][0]]];
    else {
      thisa.css('background-color','');
      continue loop;
    }
    if(!narr) {
        thisa.css('background-color','');
        continue loop;
    }
    for(var j in narr) {
      var thisRight = (narr?stem+narr[j].replace(/[()]/g,''):'&nbsp;');
      if(thisa.html() === thisRight) {
        thisa.css('background-color','#5F5');
        continue loop;
      }
    }
    thisa.css('background-color','#F55');
    wrong = 1;
  }
  if (wrong == 0) {
    alertFlash("Well done!",'green');
    //Drights[DPR_G.G_oneNoun[0]] = 1;
    resetMTable();
    resetMColors();
  }
  else
    $(".drag").mousedown(function(){resetMColors();});
}

function resetMColors() {
    for (var i in decls){
    var thisa = $('#decr'+i+' div');
    thisa.css('background-color','#EEE');
  }
}













// verbs

// verb common function

function getRandomVerb() {
  $('.dect').css('background-color','');
  $('.drag').css('background-color','');
  DPR_G.G_quiza = [];

  var reg = $('#reg').prop('checked');
  var irreg = $('#irreg').prop('checked');
  var pres = $('#pres').prop('checked');
  var imp = $('#imp').prop('checked');
  var opt = $('#opt').prop('checked');
  var fut = $('#fut').prop('checked');

  if(!reg && !irreg)
    return alert('No verbs in list!');
  if(!pres && !imp && !opt && !fut)
    return alert('No verbs in list!');

  for (var j in yt){
    if(yt[j][4] != 'V')
      continue;
    if(!/^ac\.pres/.test(yt[j][5]))
      continue;
    if(!reg && yt[j][9] != 'N')
      continue;
    if(!irreg && yt[j][9] == 'N')
      continue;
    DPR_G.G_quiza.push([yt[j],j]);
  }

  if(!DPR_G.G_quiza.length)
    return alert('No verbs in list!');

  var rn=Math.floor(Math.random()*DPR_G.G_quiza.length);
  while(DPR_G.G_oneVerb[3] == rn)
    var rn=Math.floor(Math.random()*DPR_G.G_quiza.length);

  var yto = DPR_G.G_quiza[rn][0];
  var word = DPR_G.G_quiza[rn][1];
  var stem = yto[8];
/*
  var yto5 = yto[5].split(',');
  for(var i in yto5) {
    if(/^ac\.pres/.test(yto5[i])) {
      yto[5] = yto5[i];
      break;
    }
  }
*/
  DPR_G.G_verbTenses = [];
  if(pres) DPR_G.G_verbTenses.push('pres');
  if(imp) DPR_G.G_verbTenses.push('imp');
  if(opt) DPR_G.G_verbTenses.push('opt');
  if(fut) DPR_G.G_verbTenses.push('fut');

  var rn2=Math.floor(Math.random()*DPR_G.G_verbTenses.length);

  $('#QwhichT').html(toUni(DPR_G.G_quiza[rn][1])+(yto[1]?' ('+yto[1]+')':''));
  $('#QwhichC').html(yto[2]);

  var type = yto[5].replace(/.+\./,'');
  if(yto[9] == 'N') { // irreg
    yto[8] = '';
    var verb = getRandomIVerbTense(DPR_G.G_verbTenses[rn2],toUni(word),DPR_G.iVI[toUni(DPR_G.G_quiza[rn][1])]?DPR_G.iVI[toUni(DPR_G.G_quiza[rn][1])]:DPR_G.iVI[yto[6]]);
    if(!verb)
      return getRandomVerb();
  }
  else {
    var verb = getRandomVerbTense(DPR_G.G_verbTenses[rn2],type);
    if(!verb)
      return getRandomVerb();
  }


  DPR_G.G_oneVerb = [word,yto,verb,rn,rn2,type];
}

DPR_G.G_verbTenses = [];

function getRandomVerbTense(tense,type) {
  switch(tense) {
    case 'pres':
      if(DPR_G.iV['ac.pres.'+type])
        return DPR_G.iV['ac.pres.'+type];
    case 'imp':
      if(DPR_G.iV['ac.impv.'+type])
        return DPR_G.iV['ac.impv.'+type];
    default:
      if(DPR_G.iV['ac.'+tense])
        return DPR_G.iV['ac.'+tense];
  }
}
function getRandomIVerbTense(tense,word,verb) {
  switch(tense) {
    case 'pres':
      if(verb[word]['65535'])
        return verb[word]['65535'];
      else if(verb['def']['65535'])
        return verb['def']['65535'];
    case 'imp':
      if(verb['def'] && verb['def']['1'])
        return verb['def']['1'];
    case 'opt':
      if(verb['def'] && verb['def']['4'])
        return verb['def']['4'];
    case 'fut':
      if(verb['def'] && verb['def']['3'])
        return verb['def']['3'];
  }
}

var verbs = [];
verbs.push(['bhū','bhava','being']);
verbs.push(['gam','gaccha','going']);
verbs.push(['rudh','rundha','closing']);
verbs.push(['budh','bujjha','awakening']);
verbs.push(['ji','jinaa','conquering']);
verbs.push(['su','su.naa','listening']);
verbs.push(['kii','kiinaa','buying']);
verbs.push(['gah','ga.nhaa','taking']);
verbs.push(['kar','karo','doing']);
verbs.push(['cur','core','stealing']);

var vdtypes = ['thirds','thirdp','seconds','secondp','firsts','firstp'];

var vdtypesNo = [];
vdtypesNo.push([0,0]);
vdtypesNo.push([0,1]);
vdtypesNo.push([1,0]);
vdtypesNo.push([1,1]);
vdtypesNo.push([2,0]);
vdtypesNo.push([2,1]);

var vPersons = ['3rd','2nd','1st'];

var vdNames = [];
vdNames['pres'] = 'present';
vdNames['imp'] = 'imperative';
vdNames['opt'] = 'optative';
vdNames['fut'] = 'future';

DPR_G.G_oneVerb = [];

DPR_G.G_VRights = [];

function resetVTable()  {
  if ($('#Qshow').html() == 'Hide') hideVAnswers();
  getRandomVerb();

  var stem = DPR_G.G_oneVerb[1][8];

  $('#oneDec').html(vdNames[DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]]]);

  addVStems(stem);

  clearVAnswers();

}
function clearVAnswers() {
  for (var i in vdtypes) {
    $('#'+vdtypes[i]+'t').val('');
    $('#'+vdtypes[i]+'t').css('background-color','');
  }
}
function addVStems() {
  for (var i in vdtypes) {
    $('#'+vdtypes[i]).html(DPR_G.G_oneVerb[1][8]);
  }
}
function showVAnswers() {

  $('#Qshow').html('Hide');
  document.getElementById('Qshow').onclick = function () { hideVAnswers() };

  var stem = DPR_G.G_oneVerb[1][8];
  if(yto[9] != 'N') { // not irreg
    if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'opt')
      stem += 'eyy';
    else if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'fut')
      stem += 'iss';
  }

  for (var i in vdtypes) {
    $('#'+vdtypes[i]+'t').css('background-color','');
    $('#'+vdtypes[i]+'t').hide();

    var forms = '';
    if( DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]] && DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]][vdtypesNo[i][1]]) {
      var alts = DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]][vdtypesNo[i][1]];
      forms = stem+alts.join(', '+stem);
    }
    $('#'+vdtypes[i]).html(forms);
  }
}

function hideVAnswers() {
  $('#Qshow').html('Show');
  document.getElementById('Qshow').onclick = function () { showVAnswers() };
  for (var i in decls) {
    $('#'+vdtypes[i]+'t').css('background-color','white');
    $('#'+vdtypes[i]+'t').show();
    $('#'+vdtypes[i]).html('');
  }
  addVStems();
}

function checkVAnswers() {
  var wrong = 0;
  var suff = '';
  if(yto[9] != 'N') { // not irreg
    if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'opt')
      suff = 'eyy';
    else if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'fut')
      suff = 'iss';
  }
  for (var i in vdtypes) {
    var right = 0;
    var thisa = $('#'+vdtypes[i]+'t');
    var onn = null;
    if( DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]] && DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]][vdtypesNo[i][1]])
      onn = DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]][vdtypesNo[i][1]];
    if (!onn) {
      thisa.css('background-color','');
      right = 1;
      continue;
    }
    for (var j in onn) {
      onn[j] = onn[j].replace(/[()]/g,'');
      if (onn[j] == '') {
        thisa.css('background-color','');
        right = 1;
        break;
      }
      if (thisa.val() == onn[j]+suff) {
        thisa.css('background-color','#5F5');
        right = 1;
        break;
      }
      else {
        thisa.css('background-color','#F55');
      }
    }
    if (right == 0) wrong = 1;
  }
  if (wrong == 0) {
    alertFlash("Well done!",'green');
    resetVTable();
  }
}

DPR_G.G_oneVDec = -1;

function getVDeclension() {
  $('#tense')[0].selectedIndex = -1;
  $('#declension')[0].selectedIndex = -1;
  $('#number')[0].selectedIndex = -1;

  getRandomVerb();

  var stem = DPR_G.G_oneVerb[1][8];

  if(DPR_G.G_oneVerb[1][9] != 'N') { // not irreg
    if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'opt')
      stem += 'eyy';
    else if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'fut')
      stem += 'iss';
  }
  var verb = DPR_G.G_oneVerb[2];

  var rn3=Math.floor(Math.random()*vdtypesNo.length);

  var alts = verb[vPersons[vdtypesNo[rn3][0]]][vdtypesNo[rn3][1]];

  var rn4=Math.floor(Math.random()*alts.length);

  var oneWord = stem+alts[rn4].replace(/[()]/g,'');
  if(!oneWord) {
    return getVDeclension();
  }

  DPR_G.G_oneVDec = [alts[rn4],rn3];

  $('#oneDec').html(oneWord);
}

function checkVAnswer2() {
  var tense = $('#tense')[0].selectedIndex;
  var dec = $('#declension')[0].selectedIndex;
  var num = $('#number')[0].selectedIndex;
  if(tense < 0 || dec < 0 || num < 0)
    return alertFlash("You must select all three fields.",'red');

  if(DPR_G.G_oneVerb[5].charAt(0) == 'x') { // irreg
    var verb = getRandomIVerbTense(DPR_G.G_verbTenses[tense],toUni(word),DPR_G.iVI[toUni(word)]);
  }
  else {
    var verb = getRandomVerbTense(DPR_G.G_verbTenses[tense],DPR_G.G_oneVerb[5]);
  }

  var alts = verb[vPersons[dec]][num];
  for(var i in alts) {
    if(alts[i] == DPR_G.G_oneVDec[0]) {
      alertFlash("That's correct!",'green');
      getVDeclension();
      return
    }
  }
  alertFlash("That is incorrect.",'red');
}

function showVAnswer2(cnt){
  $('#tense')[0].selectedIndex = -1;
  $('#declension')[0].selectedIndex = -1;
  $('#number')[0].selectedIndex = -1;

  if(!cnt) {
    return showVAnswerBounce(0);
  }
  if(cnt == 3)
    return getVDeclension();

  setTimeout(function(){showVAnswerBounce(cnt)},500);
}

function showVAnswerBounce(cnt) {
  cnt++;

  $('#tense')[0].value = DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]];
  $('#declension')[0].selectedIndex = vdtypesNo[DPR_G.G_oneVDec[1]][0];
  $('#number')[0].selectedIndex = vdtypesNo[DPR_G.G_oneVDec[1]][1];
  setTimeout(function(){showVAnswer2(cnt)},500);
}


// moveable

function resetMVTable()  {
  getRandomVerb();

  var stem = DPR_G.G_oneVerb[1][8];

  $('#oneDec').html(vdNames[DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]]]);

  if(DPR_G.G_oneVerb[1][9] != 'N') { // not irreg
    if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'opt')
      stem += 'eyy';
    else if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'fut')
      stem += 'iss';
  }

  for (var i in vdtypes) {
    if( DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]] && DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]][vdtypesNo[i][1]])
      var alts = DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]][vdtypesNo[i][1]];
    else {
      $('#drag'+i).html('&nbsp;');
      continue;
    }
    if(alts)
      var rn=Math.floor(Math.random()*alts.length);
    $('#drag'+i).html(alts?stem+alts[rn].replace(/[()]/g,''):'&nbsp;');
  }

  var top = vdtypes.length;
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));

    var src = $('#drag'+top).parent();
    var dest = $('#drag'+current).parent();

    src.append(
      $('#drag'+current).remove().clone()
    );

    dest.append(
      $('#drag'+top).remove().clone()
    );

  }
  init();

  //showVRights();
}

function checkMVAnswers() {
    var wrong = 0;

  var stem = DPR_G.G_oneVerb[1][8];

  if(DPR_G.G_oneVerb[1][9] != 'N') { // not irreg
    if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'opt')
      stem += 'eyy';
    else if(DPR_G.G_verbTenses[DPR_G.G_oneVerb[4]] == 'fut')
      stem += 'iss';
  }

  loop:
    for (var i in vdtypes){
    var thisa = $('#decr'+i+' div');

    if( DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]] && DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]][vdtypesNo[i][1]])
      var narr = DPR_G.G_oneVerb[2][vPersons[vdtypesNo[i][0]]][vdtypesNo[i][1]];
    else {
      thisa.css('background-color','');
      continue loop;
    }
    if(!narr) {
        thisa.css('background-color','');
        continue loop;
    }
    for(var j in narr) {
      var thisRight = (narr?stem+narr[j].replace(/[()]/g,''):'&nbsp;');
      if(thisa.html() === thisRight) {
        thisa.css('background-color','#5F5');
        continue loop;
      }
    }
    thisa.css('background-color','#F55');
    wrong = 1;
  }
  if (wrong == 0) {
    alertFlash("Well done!",'green');
    //Drights[DPR_G.G_oneNoun[0]] = 1;
    resetMVTable();
    resetMVColors();
  }
  else
    $(".drag").mousedown(function(){resetMVColors();});
}

function resetMVColors() {
    for (var i in vdtypes){
    var thisa = $('#decr'+i+' div');
    thisa.css('background-color','#EEE');
  }
}





var engVDec = ['he/she/it','they','you','you all','I','we'];
var ises = ['is','are','are','are','am','are'];
var tenseAdd = [];
tenseAdd['pres'] = '';
tenseAdd['imp'] = 'should';
tenseAdd['opt'] = 'may';
tenseAdd['fut'] = 'will';

function resetVETable() {
  clearVEAnswers();
  DPR_G.G_quiza = [];
  DPR_G.G_oneVerb = [];

  //~ var reg = $('#reg').prop('checked');
  //~ var irreg = $('#irreg').prop('checked');
  //~ var pres = $('#pres').prop('checked');
  //~ var imp = $('#imp').prop('checked');
  //~ var opt = $('#opt').prop('checked');
  //~ var fut = $('#fut').prop('checked');
  //~
  //~ if(!reg && !irreg)
    //~ return alert('No verbs in list!');
  //~ if(!pres && !imp && !opt && !fut)
    //~ return alert('No verbs in list!');
  //~
  //~ for (var j in yt){
    //~ if(yt[j][4] != 'V')
      //~ continue;
    //~ if(!/^ac\.pres/.test(yt[j][5]))
      //~ continue;
    //~ DPR_G.G_quiza.push([yt[j],j]);
  //~ }
//~
  //~ if(!DPR_G.G_quiza.length)
    //~ return;
  //~ var out = '', out2 = '',outa = [], outa2 = [];
  //~ for (var i in DPR_G.G_quiza) {
    //~ out2 = '';
    //~ out = 'engVerbs[\''+toUni(DPR_G.G_quiza[i][1]) +'\'] = \'';
    //~ if(/^is [a-zA-Z ]+’[a-zA-Z ]+/.test(DPR_G.G_quiza[i][0][2]))
      //~ out+=DPR_G.G_quiza[i][0][2].replace(/^(is [a-zA-Z]+)\b([ a-zA-Z]*’[a-zA-Z ]+).*/,"$1$2");
    //~ else if(/^[a-zA-Z]+s\b[a-zA-Z ]+’[a-zA-Z ]+/.test(DPR_G.G_quiza[i][0][2]) && !/this/.test(DPR_G.G_quiza[i][0][2]))
      //~ out+=DPR_G.G_quiza[i][0][2].replace(/(^[a-zA-Z]+s)\b([a-zA-Z ]+’[ a-zA-Z]+).*/,"$1$2");
    //~ else if(/^to be [a-zA-Z ]+’[a-zA-Z ]+/.test(DPR_G.G_quiza[i][0][2]))
      //~ out+=DPR_G.G_quiza[i][0][2].replace(/^to be ([a-zA-Z ]+)\b([ a-zA-Z]+’[a-zA-Z ]+).*/,"is $1$2");
    //~ else if(/\b[a-zA-Z]+ing\b[a-zA-Z ]+’[a-zA-Z ]+/.test(DPR_G.G_quiza[i][0][2]))
      //~ out+=DPR_G.G_quiza[i][0][2].replace(/.*(\b[a-zA-Z]+)ing\b([ a-zA-Z]+’[a-zA-Z ]+).*/,"$1$2");
    //~ else
      //~ continue;
    //~ out +='\';<br/>';
    //~ if(out2)
      //~ outa2.push(out2);
    //~ else
      //~ outa.push(out);
  //~ }
  //~ $('#mafbc').html(outa.join("\n")+'<hr/><hr/><hr/>'+outa2.join("\n"));
//~ return;
  var reg = $('#reg').prop('checked');
  var irreg = $('#irreg').prop('checked');
  var pres = $('#pres').prop('checked');
  var imp = $('#imp').prop('checked');
  var opt = $('#opt').prop('checked');
  var fut = $('#fut').prop('checked');
  if(!reg && !irreg)
    return alert('No verbs in list!');
  if(!pres && !imp && !opt && !fut)
    return alert('No verbs in list!');

  for (var i in engVerbs){
    var j = toVel(i);
    if(yt[j][4] != 'V')
      continue;
    if(!/^ac\.pres/.test(yt[j][5]))
      continue;
    if(!reg && yt[j][9] != 'N')
      continue;
    if(!irreg && yt[j][9] == 'N')
      continue;

    DPR_G.G_quiza.push(i);
  }
  if(!DPR_G.G_quiza.length)
    return alert('No verbs in list!');

  var rn = Math.floor(Math.random()*DPR_G.G_quiza.length);
  while(DPR_G.G_oneVerb[3] == rn)
    var rn=Math.floor(Math.random()*DPR_G.G_quiza.length);

  var ev = engVerbs[DPR_G.G_quiza[rn]];

  var yto = yt[toVel(DPR_G.G_quiza[rn])];
  $('#QwhichT').html(DPR_G.G_quiza[rn]+(yto[1]?' ('+yto[1]+')':''));
  $('#QwhichC').html(yto[2]);

  DPR_G.G_verbTenses = [];
  if(pres) DPR_G.G_verbTenses.push('pres');
  if(imp) DPR_G.G_verbTenses.push('imp');
  if(opt) DPR_G.G_verbTenses.push('opt');
  if(fut) DPR_G.G_verbTenses.push('fut');

  var rn2=Math.floor(Math.random()*DPR_G.G_verbTenses.length);

  var tense = DPR_G.G_verbTenses[rn2];

  var type = yto[5].replace(/.+\./,'');
  if(yto[9] == 'N') { // irreg
    yto[8] = '';
    var verb = getRandomIVerbTense(tense,DPR_G.G_quiza[rn],DPR_G.iVI[DPR_G.G_quiza[rn]]?DPR_G.iVI[DPR_G.G_quiza[rn]]:DPR_G.iVI[yto[6]]);
  }
  else {
    var verb = getRandomVerbTense(tense,type);
  }
  if(!verb)
    return resetVETable();

  var stem = yto[8];
  if(yto[9] != 'N') { // not irreg
    if(DPR_G.G_verbTenses[rn2] == 'opt')
      stem += 'eyy';
    else if(DPR_G.G_verbTenses[rn2] == 'fut')
      stem += 'iss';
  }

  var rn3 = Math.floor(Math.random()*engVDec.length);

  if(!verb[vPersons[vdtypesNo[rn3][0]]] || !verb[vPersons[vdtypesNo[rn3][0]]][vdtypesNo[rn3][1]])
    return resetVETable();

  DPR_G.G_oneVerb = [stem,verb[vPersons[vdtypesNo[rn3][0]]][vdtypesNo[rn3][1]]];

  if(/^is /.test(ev)) {
    if(tense != 'pres')
      ev = ev.replace(/^is/,'be');
    else
      ev = ev.replace(/^is/,ises[rn3]);
  }
  if(tense != 'pres' || rn3 !=0) {
    ev = ev.replace(/^(\S\S+)ies\b/,"$1y");
    ev = ev.replace(/^(\S+)(ss|[sc]h|zz|[xo])es\b/,"$1$2");
    ev = ev.replace(/^(\S+)s\b/,"$1");
  }

  $('#oneDec').html(engVDec[rn3]+' '+tenseAdd[DPR_G.G_verbTenses[rn2]]+' '+ev);
}
function checkVEAnswers(){
  var val = $('#answert').val();
  for (var i in DPR_G.G_oneVerb[1]) {
    if(val == DPR_G.G_oneVerb[0]+DPR_G.G_oneVerb[1][i].replace(/[()]/g,'')) {
      alertFlash("That's correct!",'green');
      return resetVETable();
    }
  }
  alertFlash("That is incorrect.",'red');
}
function clearVEAnswers(){
  $('#answert').val('');
}
function showVEAnswers(){
  var right = DPR_G.G_oneVerb[0]+DPR_G.G_oneVerb[1].join(', '+DPR_G.G_oneVerb[0]).replace(/[()]/g,'');
  $('#answert').hide();
  $('#answer').append('<span id="righta" class="red">'+right+'</span>');
  setTimeout(function(){$('#righta').remove(); $('#answert').show('fast');},3000);
}
