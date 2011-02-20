function newquiz() {
	moveframex(1);
	document.getElementById('mafbc').innerHTML = '<div style="background-color:'+colorcfg['colbkcp']+'" class="quizb"><button disabled>Pali Vocab Quiz</button> <button onclick="newDquiz()">Pali Declension Quiz</button></div><input type="hidden" id="qno" value="1"><input type="hidden" id="Qran" value="0"><input type="hidden" id="Qwan" value="0"><p></p><div class="quizc" style="background-color:'+colorcfg['colbkcp']+'"><p><b>Question #<span id="qn"></span>:</b> What is the meaning of "<font id="qq"></font>"?</p></div><p><i id="Qchecka">Choose the right answer below (or use number keys (1-4) to select an answer):</i></p><p><font id="answers"></font></p><div class="quizc" style="background-color:'+colorcfg['colbkcp']+'"><p><table width=100%><tr><td>Right Answers: <b id="Qra" style="color:'+colorcfg['green']+'"></b></td><td>Wrong Answers: <b id="Qwa" style="color:'+colorcfg['red']+'"></b></td><td>Percent: <b style="color:white" id="Qpa">&nbsp;--%&nbsp;</b></td></tr><tr><td colspan="3"><hr /></td></tr><tr><td>Total Right Answers: <b id="Qrights"></b></td><td>Left to answer: <b id="Qlefts"></b></td><td><input type="button" class="btn" value="clear" onclick="clearrights()"></td></tr></table></div>';
	document.getElementById('Qra').innerHTML = '&nbsp;0&nbsp;';
	document.getElementById('Qwa').innerHTML = '&nbsp;0&nbsp;';
	quizme();

}

function newDquiz() {
document.getElementById('mafbc').innerHTML = '<div style="background-color:'+colorcfg['colbkcp']+'" class="quizb"><button onclick="newquiz()">Pali Vocab Quiz</button> <button disabled>Pali Declension Quiz</button></div><input type="hidden" id="QwhichS"><p class="txt" id="QwhichT">Masculine Nouns with "-A" Stem</p><p class="cite" id="QwhichC">dhamma; noun masc.; "the teaching"</p><table class="dec" id="Qdeclension"><tr><th class="dec"></th><th colspan=2 class = "toprow">SINGULAR</th><th colspan=2 class = "toprow">PLURAL</th></tr><tr><th class="dec">NOM</th><td class="dec"><span id="nomSins"></span></td><td class="decr"><input class="dect" type="text" value="" id="nomSint" onkeyup="this.value=replaceunistandard(this.value);"></td><td class="dec"><span id="nomPls"></span></td><td class="decr"><input class="dect" type="text" value="" id="nomPlt" onfocus="this.value=this.value;" onkeyup="this.value=replaceunistandard(this.value);"></td></tr><tr><th class="dec">ACC</th><td class="dec"><span id="accSins"></span></td><td class="decr"><input class="dect" type="text" value="" id="accSint" onkeyup="this.value=replaceunistandard(this.value);"></td><td class="dec"><span id="accPls"></span></td><td class="decr"><input class="dect" type="text" value="" id="accPlt" onkeyup="this.value=replaceunistandard(this.value);"></td></tr><tr><th class="dec">INST</th><td class="dec"><span id="instSins"></span></td><td class="decr"><input class="dect" type="text" value="" id="instSint" onkeyup="this.value=replaceunistandard(this.value);"></td><td class="dec"><span id="instPls"></span></td><td class="decr"><input class="dect" type="text" value="" id="instPlt" onkeyup="this.value=replaceunistandard(this.value);"></td></tr><tr><th class="dec">DAT</th><td class="dec"><span id="datSins"></span></td><td class="decr"><input class="dect" type="text" value="" id="datSint" onkeyup="this.value=replaceunistandard(this.value);"></td><td class="dec"><span id="datPls"></span></td><td class="decr"><input class="dect" type="text" value="" id="datPlt" onkeyup="this.value=replaceunistandard(this.value);"></td></tr><tr><th class="dec">ABL</th><td class="dec"><span id="ablSins"></span></td><td class="decr"><input class="dect" type="text" value="" id="ablSint" onkeyup="this.value=replaceunistandard(this.value);"></td><td class="dec"><span id="ablPls"></span></td><td class="decr"><input class="dect" type="text" value="" id="ablPlt" onkeyup="this.value=replaceunistandard(this.value);"></td></tr><tr><th class="dec">GEN</th><td class="dec"><span id="genSins"></span></td><td class="decr"><input class="dect" type="text" value="" id="genSint" onkeyup="this.value=replaceunistandard(this.value);"></td><td class="dec"><span id="genPls"></span></td><td class="decr"><input class="dect" type="text" value="" id="genPlt" onkeyup="this.value=replaceunistandard(this.value);"></td></tr><tr><th class="dec">LOC</th><td class="dec"><span id="locSins"></span></td><td class="decr"><input class="dect" type="text" value="" id="locSint" onkeyup="this.value=replaceunistandard(this.value);"></td><td class="dec"><span id="locPls"></span></td><td class="decr"><input class="dect" type="text" value="" id="locPlt" onkeyup="this.value=replaceunistandard(this.value);"></td></tr><tr><th class="dec">VOC</th><td class="dec"><span id="vocSins"></span></td><td class="decr"><input class="dect" type="text" value="" id="vocSint" onkeyup="this.value=replaceunistandard(this.value);"></td><td class="dec"><span id="vocPls"></span></td><td class="decr"><input class="dect" type="text" value="" id="vocPlt" onkeyup="this.value=replaceunistandard(this.value);"></td></tr></table><p class="controls"><button title="Check your answers (1)" onclick="checkAnswers()" class="control" id="QcheckAns" type="button">Check</button><button title="Clear table (2)" onclick="clearAnswers()" class="control" id="Qclear" type="button">Clear</button><button title="Show correct answers (3)" onclick="showAnswers()" class="control" id="Qshow" type="button">Show</button><button title="Get a new declension (4)" onclick="resetTable()" class="control" id="Qnew" type="button">New</button></p><hr /><h2 align=center>Correct Answers:</h2><p id="Qcorrects"></p>';
resetTable();
}

function quizme() {
	
	// remember rights
	var rights = readFile("DPTEST");
	if(rights) {
		rights=rights.split(',');
		if (rights.length == 1 && rights[0] == "") rights = [];
		document.getElementById('Qrights').innerHTML = rights.length;
	}
	else { rights = []; }
    
	var quiza = new Array();
	var quizeachwrong = new Array();
	var quizanswersout = '';
	var quizrandomright=Math.floor(Math.random()*20926);
	if (rights.length > 20925) {
		alert('Congratulations, you\'ve completed the entire dictionary!');
		clearrights();
	}
	else while (("|" + rights.join("|") + "|").indexOf('|'+quizrandomright+'|') > -1) { // in case we got it right before
		quizrandomright=Math.floor(Math.random()*20926);
	}	
	var qtmp2 = 0;
	
	var quizrightorder=Math.floor(Math.random()*4);
	for (quizcpd in yt){
		quiza.push(quizcpd);
	}
	document.getElementById('Qlefts').innerHTML = quiza.length - rights.length;
	for (qtmp = 0; qtmp < 3; qtmp++) {
		quizeachwrong[qtmp]=Math.floor(Math.random()*20926);
		while (quizeachwrong[qtmp] == quizrandomright) { // in case we got the same one again!
			quizeachwrong[qtmp]=Math.floor(Math.random()*20926);
		}
	}
	
	var questionout =  quiza[quizrandomright].replace(/,/g, '.');
	questionout =  replaceunistandard(questionout.replace(/`n/g, '"n'));

	document.getElementById('qn').innerHTML = document.getElementById('qno').value;
	document.getElementById('qq').innerHTML = questionout;
	
	var ytthis = yt[quiza[quizrandomright]];
	
	var formatanswerwrong = '';
	var formatanswer = ytthis[3];
	var formatanswerout = ytthis[3];
	if (ytthis[2].length > 0) formatanswerout += ' (' + ytthis[2] + ')';
	for (qtmp = 0; qtmp < 4; qtmp++) {
		if (qtmp == quizrightorder) {
			quizanswersout += '<p><input type="button" id="Qa'+(qtmp+1)+'" class="btn" onclick="answerquiz(1,\'' + questionout + ' = ' + formatanswerout + '\',' + quizrandomright + ')" value="'+(qtmp+1)+'"> '+formatanswer+'</p>';
		}
		else {
			ytthis = yt[quiza[quizeachwrong[qtmp2]]];
			formatanswerwrong = ytthis[3];
			quizanswersout += '<p><input type="button" id="Qa'+(qtmp+1)+'" class="btn" onclick="answerquiz(0,\'' + questionout + ' = ' + formatanswerout + '\')" value="'+(qtmp+1)+'"> '+formatanswerwrong+'</p>';
			qtmp2++;
		}
	}
	document.getElementById('answers').innerHTML = quizanswersout;
}

function answerquiz(right,answer,numb) {
	document.getElementById('qn').innerHTML = ++document.getElementById('qno').value;
	if (right == 1) {
		document.getElementById('Qchecka').innerHTML = '<span style="color:green">Right! &nbsp;' + answer + '</span>';
		document.getElementById('Qra').innerHTML = '&nbsp;'+ (++document.getElementById('Qran').value) + '&nbsp;';
		
		// add right to list of rights
        var rightfile = readFile('DPTEST');
        if (rightfile) {
            rightfile += ',' + numb;
            writeFile('DPTEST', rightfile, "UTF-8");
        }
		else {
            writeFile('DPTEST', ""+numb, "UTF-8");
        }
	}	
	else {
		document.getElementById('Qchecka').innerHTML ='<span style="color:red">Wrong! &nbsp;' + answer + '</span>';
		document.getElementById('Qwa').innerHTML = '&nbsp;'+(++document.getElementById('Qwan').value) + '&nbsp;';
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
	document.getElementById('Qpa').innerHTML = '&nbsp;'+Math.round(percentr) + '%&nbsp;';
	quizme();
}

function clearrights() {
    document.getElementById('Qra').innerHTML = 0;
    document.getElementById('Qran').value = 0;
    document.getElementById('Qwa').innerHTML = 0;
    document.getElementById('Qwan').value = 0;
    document.getElementById('Qpa').innerHTML = "";
	document.getElementById('Qrights').innerHTML = 0;
    
	writeFile("DPTEST","","UTF-8");
}

var correctDec = [];

correctDec['ratt'] = [];
correctDec['ratt']['nomSin'] = ['ratti'];
correctDec['ratt']['nomPl'] = ['rattiyo','rattī'];
correctDec['ratt']['accSin'] = ['rattiṃ'];
correctDec['ratt']['accPl'] = ['rattiyo','rattī'];
correctDec['ratt']['instSin'] = ['rattiyā'];
correctDec['ratt']['instPl'] = ['rattīhi'];
correctDec['ratt']['datSin'] = ['rattiyā'];
correctDec['ratt']['datPl'] = ['rattīnaṃ'];
correctDec['ratt']['ablSin'] = ['rattiyā'];
correctDec['ratt']['ablPl'] = ['rattīhi'];
correctDec['ratt']['genSin'] = ['rattiyā'];
correctDec['ratt']['genPl'] = ['rattīnaṃ'];
correctDec['ratt']['locSin'] = ['rattiyā','rattiyaṃ'];
correctDec['ratt']['locPl'] = ['rattīsu'];
correctDec['ratt']['vocSin'] = ['ratti'];
correctDec['ratt']['vocPl'] = ['rattiyo','rattī'];
	
correctDec['sāl'] = [];
correctDec['sāl']['nomSin'] = ['sālā'];
correctDec['sāl']['nomPl'] = ['sālā','sālāyo'];
correctDec['sāl']['accSin'] = ['sālaṃ'];
correctDec['sāl']['accPl'] = ['sālā','sālāyo'];
correctDec['sāl']['instSin'] = ['sālāya'];
correctDec['sāl']['instPl'] = ['sālāhi'];
correctDec['sāl']['datSin'] = ['sālāya'];
correctDec['sāl']['datPl'] = ['sālānaṃ'];
correctDec['sāl']['ablSin'] = ['sālāya'];
correctDec['sāl']['ablPl'] = ['sālāhi'];
correctDec['sāl']['genSin'] = ['sālāya'];
correctDec['sāl']['genPl'] = ['sālānaṃ'];
correctDec['sāl']['locSin'] = ['sālāya','sālāyaṃ'];
correctDec['sāl']['locPl'] = ['sālāsu'];
correctDec['sāl']['vocSin'] = ['sāle'];
correctDec['sāl']['vocPl'] = ['sālā','sālāyo'];

correctDec['nad'] = [];
correctDec['nad']['nomSin'] = ['nadī'];
correctDec['nad']['nomPl'] = ['nadiyo','nadī'];
correctDec['nad']['accSin'] = ['nadiṃ'];
correctDec['nad']['accPl'] = ['nadiyo','nadī'];
correctDec['nad']['instSin'] = ['nadiyā'];
correctDec['nad']['instPl'] = ['nadīhi'];
correctDec['nad']['datSin'] = ['nadiyā'];
correctDec['nad']['datPl'] = ['nadīnaṃ'];
correctDec['nad']['ablSin'] = ['nadiyā'];
correctDec['nad']['ablPl'] = ['nadīhi'];
correctDec['nad']['genSin'] = ['nadiyā'];
correctDec['nad']['genPl'] = ['nadīnaṃ'];
correctDec['nad']['locSin'] = ['nadiyā','nadiyaṃ'];
correctDec['nad']['locPl'] = ['nadīsu'];
correctDec['nad']['vocSin'] = ['nadi'];
correctDec['nad']['vocPl'] = ['nadiyo','nadī'];

correctDec['dhamm'] = [];
correctDec['dhamm']['nomSin'] = ['dhammo'];
correctDec['dhamm']['nomPl'] = ['dhammā'];
correctDec['dhamm']['accSin'] = ['dhammaṃ'];
correctDec['dhamm']['accPl'] = ['dhamme'];
correctDec['dhamm']['instSin'] = ['dhammena'];
correctDec['dhamm']['instPl'] = ['dhammehi'];
correctDec['dhamm']['datSin'] = ['dhammāya','dhammassa'];
correctDec['dhamm']['datPl'] = ['dhammānaṃ'];
correctDec['dhamm']['ablSin'] = ['dhammā','dhammasmā','dhammamhā'];
correctDec['dhamm']['ablPl'] = ['dhammehi'];
correctDec['dhamm']['genSin'] = ['dhammassa'];
correctDec['dhamm']['genPl'] = ['dhammānaṃ'];
correctDec['dhamm']['locSin'] = ['dhamme','dhammasmiṃ','dhammamhi'];
correctDec['dhamm']['locPl'] = ['dhammesu'];
correctDec['dhamm']['vocSin'] = ['dhamma'];
correctDec['dhamm']['vocPl'] = ['dhammā'];

correctDec['mun'] = [];
correctDec['mun']['nomSin'] = ['muni'];
correctDec['mun']['nomPl'] = ['munayo','munī'];
correctDec['mun']['accSin'] = ['muniṃ'];
correctDec['mun']['accPl'] = ['munayo','munī'];
correctDec['mun']['instSin'] = ['muninā'];
correctDec['mun']['instPl'] = ['munīhi'];
correctDec['mun']['datSin'] = ['munino','munissa'];
correctDec['mun']['datPl'] = ['munīnaṃ'];
correctDec['mun']['ablSin'] = ['muninā','munismā','munimhā'];
correctDec['mun']['ablPl'] = ['munīhi'];
correctDec['mun']['genSin'] = ['munino','munissa'];
correctDec['mun']['genPl'] = ['munīnaṃ'];
correctDec['mun']['locSin'] = ['munismiṃ','munimhi'];
correctDec['mun']['locPl'] = ['munīsu'];
correctDec['mun']['vocSin'] = ['muni'];
correctDec['mun']['vocPl'] = ['munayo','munī'];

correctDec['bandh'] = [];
correctDec['bandh']['nomSin'] = ['bandhu'];
correctDec['bandh']['nomPl'] = ['bandhavo','bandhū'];
correctDec['bandh']['accSin'] = ['bandhuṃ'];
correctDec['bandh']['accPl'] = ['bandhavo','bandhū'];
correctDec['bandh']['instSin'] = ['bandhunā'];
correctDec['bandh']['instPl'] = ['bandhūhi'];
correctDec['bandh']['datSin'] = ['bandhuno','bandhussa'];
correctDec['bandh']['datPl'] = ['bandhūnaṃ'];
correctDec['bandh']['ablSin'] = ['bandhunā','bandhusmā','bandhumhā'];
correctDec['bandh']['ablPl'] = ['bandhūhi'];
correctDec['bandh']['genSin'] = ['bandhuno','bandhussa'];
correctDec['bandh']['genPl'] = ['bandhūnaṃ'];
correctDec['bandh']['locSin'] = ['bandhusmiṃ','bandhumhi'];
correctDec['bandh']['locPl'] = ['bandhūsu'];
correctDec['bandh']['vocSin'] = ['bandhu'];
correctDec['bandh']['vocPl'] = ['bandhavo','bandhū'];

correctDec['rūp'] = [];
correctDec['rūp']['nomSin'] = ['rūpaṃ'];
correctDec['rūp']['nomPl'] = ['rūpāni','rūpā'];
correctDec['rūp']['accSin'] = ['rūpaṃ'];
correctDec['rūp']['accPl'] = ['rūpāni','rūpe'];
correctDec['rūp']['instSin'] = ['rūpena'];
correctDec['rūp']['instPl'] = ['rūpehi'];
correctDec['rūp']['datSin'] = ['rūpāya','rūpassa'];
correctDec['rūp']['datPl'] = ['rūpānaṃ'];
correctDec['rūp']['ablSin'] = ['rūpā','rūpasmā','rūpamhā'];
correctDec['rūp']['ablPl'] = ['rūpehi'];
correctDec['rūp']['genSin'] = ['rūpassa'];
correctDec['rūp']['genPl'] = ['rūpānaṃ'];
correctDec['rūp']['locSin'] = ['rūpe','rūpasmiṃ','rūpamhi'];
correctDec['rūp']['locPl'] = ['rūpesu'];
correctDec['rūp']['vocSin'] = ['rūpa'];
correctDec['rūp']['vocPl'] = ['rūpāni','rūpā'];

correctDec['cakkh'] = [];
correctDec['cakkh']['nomSin'] = ['cakkhu','cakkhuṃ'];
correctDec['cakkh']['nomPl'] = ['cakkhūni','cakkhū'];
correctDec['cakkh']['accSin'] = ['cakkhu','cakkhuṃ'];
correctDec['cakkh']['accPl'] = ['cakkhūni','cakkhū'];
correctDec['cakkh']['instSin'] = ['cakkhunā'];
correctDec['cakkh']['instPl'] = ['cakkhūhi'];
correctDec['cakkh']['datSin'] = ['cakkhuno','cakkhussa'];
correctDec['cakkh']['datPl'] = ['cakkhūnaṃ'];
correctDec['cakkh']['ablSin'] = ['cakkhunā','cakkhusmā','cakkhumhā'];
correctDec['cakkh']['ablPl'] = ['cakkhūhi'];
correctDec['cakkh']['genSin'] = ['cakkhuno','cakkhussa'];
correctDec['cakkh']['genPl'] = ['cakkhūnaṃ'];
correctDec['cakkh']['locSin'] = ['cakkhusmiṃ','cakkhumhi'];
correctDec['cakkh']['locPl'] = ['cakkhūsu'];
correctDec['cakkh']['vocSin'] = ['cakkhu','cakkhuṃ'];
correctDec['cakkh']['vocPl'] = ['cakkhūni','cakkhū'];

correctDec['ma'] = [];
correctDec['ma']['nomSin'] = ['ahaṃ'];
correctDec['ma']['nomPl'] = ['mayaṃ','amhe'];
correctDec['ma']['accSin'] = ['maṃ','mamaṃ'];
correctDec['ma']['accPl'] = ['amhe','asme','asmākaṃ','amhākaṃ','amhaṃ'];
correctDec['ma']['instSin'] = ['mayā'];
correctDec['ma']['instPl'] = ['amhehi'];
correctDec['ma']['datSin'] = ['mama','mayhaṃ','mamaṃ','amhaṃ'];
correctDec['ma']['datPl'] = ['amhākaṃ','asmākaṃ','amhaṃ'];
correctDec['ma']['ablSin'] = ['mayā'];
correctDec['ma']['ablPl'] = ['amhehi'];
correctDec['ma']['genSin'] = ['mama','mayhaṃ','mamaṃ','amhaṃ'];
correctDec['ma']['genPl'] = ['amhākaṃ','asmākaṃ','amhaṃ'];
correctDec['ma']['locSin'] = ['mayi'];
correctDec['ma']['locPl'] = ['amhesu'];
correctDec['ma']['vocSin'] = ['N/A'];
correctDec['ma']['vocPl'] = ['N/A'];

correctDec['tva'] = [];
correctDec['tva']['nomSin'] = ['tvaṃ','tuvaṃ'];
correctDec['tva']['nomPl'] = ['tumhe'];
correctDec['tva']['accSin'] = ['tvaṃ','taṃ','tuvaṃ'] ;
correctDec['tva']['accPl'] = ['tumhe','tumhākaṃ'];
correctDec['tva']['instSin'] = ['tvayā','tayā'];
correctDec['tva']['instPl'] = ['tumhehi','tumhebhi'];
correctDec['tva']['datSin'] = ['tava','tuyhaṃ','tavaṃ','tumhaṃ'];
correctDec['tva']['datPl'] = ['tumhākaṃ','tumhaṃ'];
correctDec['tva']['ablSin'] = ['tvayā'];
correctDec['tva']['ablPl'] = ['tumhehi','tumhebhi'];
correctDec['tva']['genSin'] = ['tava','tuyhaṃ','tavaṃ','tumhaṃ'];
correctDec['tva']['genPl'] = ['tumhākaṃ','tumhaṃ'];
correctDec['tva']['locSin'] = ['tvayi','tayi'];
correctDec['tva']['locPl'] = ['tumhesu'];
correctDec['tva']['vocSin'] = ['N/A'];
correctDec['tva']['vocPl'] = ['N/A'];

correctDec['sa'] = [];
correctDec['sa']['nomSin'] = ['sā'];
correctDec['sa']['nomPl'] = ['tā'];
correctDec['sa']['accSin'] = ['taṃ'];
correctDec['sa']['accPl'] = ['tā'];
correctDec['sa']['instSin'] = ['tāya'];
correctDec['sa']['instPl'] = ['tāhi'];
correctDec['sa']['datSin'] = ['tāya','tassā','tissā','tissāya'];
correctDec['sa']['datPl'] = ['tāsaṃ','tāsānaṃ'];
correctDec['sa']['ablSin'] = ['tāya'];
correctDec['sa']['ablPl'] = ['tāhi'];
correctDec['sa']['genSin'] = ['tāya','tassā','tissā','tissāya'];
correctDec['sa']['genPl'] = ['tāsaṃ','tāsānaṃ'];
correctDec['sa']['locSin'] = ['tāya','tayaṃ','tissaṃ'];
correctDec['sa']['locPl'] = ['tāsu'];
correctDec['sa']['vocSin'] = ['N/A'];
correctDec['sa']['vocPl'] = ['N/A'];

correctDec['so'] = [];
correctDec['so']['nomSin'] = ['so','sa'];
correctDec['so']['nomPl'] = ['te'];
correctDec['so']['accSin'] = ['taṃ'];
correctDec['so']['accPl'] = ['te'];
correctDec['so']['instSin'] = ['tena'];
correctDec['so']['instPl'] = ['tehi','tebhi'];
correctDec['so']['datSin'] = ['tassa'];
correctDec['so']['datPl'] = ['tesaṃ','tesānaṃ'];
correctDec['so']['ablSin'] = ['tasmā','tamhā'];
correctDec['so']['ablPl'] = ['tehi','tebhi'];
correctDec['so']['genSin'] = ['tassa'];
correctDec['so']['genPl'] = ['tesaṃ','tesānaṃ'];
correctDec['so']['locSin'] = ['tasmiṃ','tamhi'];
correctDec['so']['locPl'] = ['tesu'];
correctDec['so']['vocSin'] = ['N/A'];
correctDec['so']['vocPl'] = ['N/A'];

correctDec['ta'] = [];
correctDec['ta']['nomSin'] = ['taṃ'];
correctDec['ta']['nomPl'] = ['tāni'];
correctDec['ta']['accSin'] = ['taṃ'];
correctDec['ta']['accPl'] = ['tāni'];
correctDec['ta']['instSin'] = ['tena'];
correctDec['ta']['instPl'] = ['tehi','tebhi'];
correctDec['ta']['datSin'] = ['tassa'];
correctDec['ta']['datPl'] = ['tesaṃ','tesānaṃ'];
correctDec['ta']['ablSin'] = ['tasmā','tamhā'];
correctDec['ta']['ablPl'] = ['tehi','tebhi'];
correctDec['ta']['genSin'] = ['tassa'];
correctDec['ta']['genPl'] = ['tesaṃ','tesānaṃ'];
correctDec['ta']['locSin'] = ['tasmiṃ','tamhi'];
correctDec['ta']['locPl'] = ['tesu'];
correctDec['ta']['vocSin'] = ['N/A'];
correctDec['ta']['vocPl'] = ['N/A'];


var decls = [];
decls.push('nomSin');
decls.push('nomPl');
decls.push('accSin');
decls.push('accPl');
decls.push('instSin');
decls.push('instPl');
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


var stems = [];
stems.push('ratt');
stems.push('sāl');
stems.push('nad');
stems.push('dhamm');
stems.push('mun');
stems.push('bandh');
stems.push('rūp');
stems.push('cakkh');
stems.push('ma');
stems.push('tva');
stems.push('sa');
stems.push('so');
stems.push('ta');

var rstems = [];
rstems['ratt'] = 'ratt';
rstems['sāl'] = 'sāl';
rstems['nad'] = 'nad';
rstems['dhamm'] = 'dhamm';
rstems['mun'] = 'mun';
rstems['bandh'] = 'bandh';
rstems['rūp'] = 'rūp';
rstems['cakkh'] = 'cakkh';
rstems['ma'] = '';
rstems['tva'] = '';
rstems['sa'] = '';
rstems['so'] = '';
rstems['ta'] = '';

var allT = [];
var allC = [];

allT.push('Feminine Nouns with "-I" Stem');
allC.push('ratti; noun fem.; "night"');
allT.push('Feminine Nouns with "-Ā" Stem');
allC.push('sāla; noun fem.; "public hall"');
allT.push('Feminine Nouns with "-Ī" Stem');
allC.push('nadī; noun fem.; "river"');
allT.push('Masculine Nouns with "-A" Stem');
allC.push('dhamma; noun masc.; "the teaching"');
allT.push('Masculine Nouns with "-I" Stem');
allC.push('muni; noun masc.; "sage"');
allT.push('Masc Nouns with "-U" Stem');
allC.push('bandhu; noun masc.; "kinsman, relative"');
allT.push('Neuter Nouns with "-A" Stem');
allC.push('rūpa; noun masc.; "material form"');
allT.push('Neuter Nouns with "-U" Stem');
allC.push('cakkhu; noun neut..; "eye"');
allT.push('1st Person Pronoun');
allC.push('1st Person Pronoun');
allT.push('2nd Person Pronoun');
allC.push('2nd Person Pronoun');
allT.push('Demonstrative Pronoun');
allC.push('3rd person feminine');
allT.push('Demonstrative Pronoun');
allC.push('3rd person masculine');
allT.push('Demonstrative Pronoun');
allC.push('3rd person neuter');

function resetTable()  {
	if(Drights.length == stems.length) {
		alert('done'); 
		rights = [];
	}
	if (document.getElementById('Qshow').innerHTML == 'Hide') hideAnswers();
	var rn=Math.floor(Math.random()*12);
	while(Drights[rn] == 1) {
		rn=Math.floor(Math.random()*12);
	}
	document.getElementById('QwhichS').value = rn
	document.getElementById('QwhichT').innerHTML = allT[rn];
	document.getElementById('QwhichC').innerHTML = allC[rn];
	var stem = stems[rn];
	for (i in decls) {
		document.getElementById(decls[i]+'s').innerHTML = rstems[stem];
		if (correctDec[stem][decls[i]][0] == 'N/A') document.getElementById(decls[i]+'t').disabled = 'true';
		else document.getElementById(decls[i]+'t').disabled = ''; 
	}
	clearAnswers();
	showRights();
}

var Drights = [];

function checkAnswers() {
	var wrong = 0;
	for (i in decls) {
		var right = 0;
		var rn = document.getElementById('QwhichS').value;
		var stem = stems[rn];
		var thisa = document.getElementById(decls[i]+'t');
		for (j in correctDec[stem][decls[i]]) {
			if (correctDec[stem][decls[i]][j] == 'N/A') {
				thisa.style.backgroundColor = '';
				right = 1;
				break;
			}
			if (rstems[stem]+thisa.value == correctDec[stem][decls[i]][j]) {
				thisa.style.backgroundColor = '#5F5';
				right = 1;
				break;
			}
			else {
				thisa.style.backgroundColor = '#F55';
			}
		}
		if (right == 0) wrong = 1;
	}
	if (wrong == 0) {
		Drights[rn] = 1;
	}
	showRights();
}

function showRights() {
	document.getElementById('Qcorrects').innerHTML = '';
	for (i in Drights) {
		document.getElementById('Qcorrects').innerHTML += stems[i]+'-<br />';
	}
	if (document.getElementById('Qcorrects').innerHTML != '') document.getElementById('Qcorrects').innerHTML += '<br /><button title="Reset right answers" onclick="rights = []; showRights();" class="control" id="resetRights" type="button">Reset</button>';
}

function clearAnswers() {
	var rn = document.getElementById('QwhichS').value;
	var stem = stems[rn];
	for (i in decls) {
		document.getElementById(decls[i]+'t').value = '';
		document.getElementById(decls[i]+'t').style.backgroundColor = '';
	}
}			

function showAnswers() {
	
	document.getElementById('Qshow').innerHTML = 'Hide';
	document.getElementById('Qshow').onclick = function () { hideAnswers() };
	var rn = document.getElementById('QwhichS').value;
	var stem = stems[rn];
	for (i in decls) {
		document.getElementById(decls[i]+'t').style.backgroundColor = '';
		document.getElementById(decls[i]+'t').style.display = 'none';
		document.getElementById(decls[i]+'s').innerHTML = correctDec[stem][decls[i]].join(', ');
	}
}
function hideAnswers() {
	document.getElementById('Qshow').innerHTML = 'Show';
	document.getElementById('Qshow').onclick = function() { showAnswers() };
	for (i in decls) {
		document.getElementById(decls[i]+'t').style.backgroundColor = 'white';
		document.getElementById(decls[i]+'t').style.display = 'block';
		document.getElementById(decls[i]+'s').innerHTML = '';
	}
}	
