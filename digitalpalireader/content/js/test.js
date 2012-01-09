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


function newquiz() {
	moveframex(1);
	document.getElementById('mafbc').innerHTML = '<input type="hidden" id="qno" value="1"><input type="hidden" id="Qran" value="0"><input type="hidden" id="Qwan" value="0"><p></p><div class="quizc" style="background-color:'+DPR_prefs['colbkcp']+'"><p><b>Question #<span id="qn"></span>:</b> What is the meaning of "<font id="qq"></font>"?</p></div><p><i id="Qchecka">Choose the right answer below (or use number keys (1-4) to select an answer):</i></p><p><font id="answers"></font></p><div class="quizc" style="background-color:'+DPR_prefs['colbkcp']+'"><p><table width=100%><tr><td>Right Answers: <b id="Qra" style="color:'+DPR_prefs['green']+'"></b></td><td>Wrong Answers: <b id="Qwa" style="color:'+DPR_prefs['red']+'"></b></td><td>Percent: <b style="color:white" id="Qpa">&nbsp;--%&nbsp;</b></td></tr><tr><td colspan="3"><hr /></td></tr><tr><td>Total Right Answers: <b id="Qrights"></b></td><td>Left to answer: <b id="Qlefts"></b></td><td><span class="abut obut small" onclick="clearrights()">clear</span></td></tr></table></div>';
	document.getElementById('Qra').innerHTML = '&nbsp;0&nbsp;';
	document.getElementById('Qwa').innerHTML = '&nbsp;0&nbsp;';
	quizme();

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

function quizme() {
	
	// remember rights
	var rights = [];
	var srights;
	if(fileExists('DPTEST')) {
		srights = readFile("DPTEST");
		if(srights) {
			if(/,/.exec(srights[0])) rights=srights.join(',').split(',');
			else rights = srights;
			if(srights.join('') == '') document.getElementById('Qrights').innerHTML = 0;
			else document.getElementById('Qrights').innerHTML = rights.length;
		}
	}
    
	var quiza = new Array();
	var quizeachwrong = new Array();
	var quizanswersout = '';
	var quizrandomright=Math.floor(Math.random()*20926);
	if (rights.length > 20925) {
		alertFlash('Congratulations, you\'ve completed the entire dictionary!','RGBa(0,255,0,0.8)');
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
	questionout =  toUni(questionout.replace(/`n/g, '"n'));

	document.getElementById('qn').innerHTML = document.getElementById('qno').value;
	document.getElementById('qq').innerHTML = questionout;
	
	var ytthis = yt[quiza[quizrandomright]];
	
	var formatanswerwrong = '';
	var formatanswer = ytthis[2];
	var formatanswerout = ytthis[2];
	if (ytthis[1].length > 0) formatanswerout += ' (' + ytthis[1] + ')';
	for (qtmp = 0; qtmp < 4; qtmp++) {
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
	document.getElementById('answers').innerHTML = quizanswersout;
}

function answerquiz(right,answer,numb) {
	document.getElementById('qn').innerHTML = ++document.getElementById('qno').value;
	if (right == 1) {
		document.getElementById('Qchecka').innerHTML = '<span style="color:green">Right! &nbsp;' + answer + '</span>';
		document.getElementById('Qra').innerHTML = '&nbsp;'+ (++document.getElementById('Qran').value) + '&nbsp;';
		
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
correctDec['ma']['vocSin'] = [''];
correctDec['ma']['vocPl'] = [''];

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
correctDec['tva']['vocSin'] = [''];
correctDec['tva']['vocPl'] = [''];

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
correctDec['sa']['vocSin'] = [''];
correctDec['sa']['vocPl'] = [''];

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
correctDec['so']['vocSin'] = [''];
correctDec['so']['vocPl'] = [''];

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
correctDec['ta']['vocSin'] = [''];
correctDec['ta']['vocPl'] = [''];


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

var declsToNo = [];
declsToNo['nomSin'] = [0,0];
declsToNo['nomPl'] = [0,1];
declsToNo['accSin'] = [1,0];
declsToNo['accPl'] = [1,1];
declsToNo['instSin'] = [2,];
declsToNo['instPl'] = [2,1];
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
declNo.push(['instSin','instPl']);
declNo.push(['datSin','datPl']);
declNo.push(['ablSin','ablPl']);
declNo.push(['genSin','genPl']);
declNo.push(['locSin','locPl']);
declNo.push(['vocSin','vocPl']);


var words = [];
words.push(['ratt','ratt','Feminine Nouns with "-I" Stem','ratti; noun fem.; "night"']);
words.push(['sāl','sāl','Feminine Nouns with "-Ā" Stem','sāla; noun fem.; "public hall"']);
words.push(['nad','nad','Feminine Nouns with "-Ī" Stem','nadī; noun fem.; "river"']);
words.push(['dhamm','dhamm','Masculine Nouns with "-A" Stem','dhamma; noun masc.; "the teaching"']);
words.push(['mun','mun','Masculine Nouns with "-I" Stem','muni; noun masc.; "sage"']);
words.push(['bandh','bandh','Masc Nouns with "-U" Stem','bandhu; noun masc.; "kinsman, relative"']);
words.push(['rūp','rūp','Neuter Nouns with "-A" Stem','rūpa; noun neut.; "material form"']);
words.push(['cakkh','cakkh','Neuter Nouns with "-U" Stem','cakkhu; noun neut.; "eye"']);
words.push(['ma','','1st Person Pronoun','1st Person Pronoun']);
words.push(['tva','','2nd Person Pronoun','2nd Person Pronoun']);
words.push(['sa','','Demonstrative Pronoun','3rd person feminine']);
words.push(['so','','Demonstrative Pronoun','3rd person masculine']);
words.push(['ta','','Demonstrative Pronoun','3rd person neuter']);

/*

var out='';

for (i in words) {
	out+= "words.push(['"+words[i][0]+"','"+words[i][1]+"','"+allT[i]+"','"+allC[i]+"']);<br/>";
}
*/

G_oneNoun = -1;

function resetTable()  {
	if (document.getElementById('Qshow').innerHTML == 'Hide') hideAnswers();
	if(Drights.length == words.length) {
		Drights = [];
		alertFlash("Congratulations for completing all declensions!",'green');
	}
		
	var rn=Math.floor(Math.random()*words.length);
	while(Drights[rn] || (G_oneNoun == rn))
		var rn=Math.floor(Math.random()*words.length);
	G_oneNoun = rn
	document.getElementById('QwhichT').innerHTML = words[rn][2];
	document.getElementById('QwhichC').innerHTML = words[rn][3];
	var stem = words[rn][0];
	addStems(stem,rn);
	clearAnswers();
	showRights();
}

function addStems(stem,rn) {
	for (i in decls) {
		document.getElementById(decls[i]+'s').innerHTML = words[rn][1];
		if (correctDec[stem][decls[i]][0] == '') document.getElementById(decls[i]+'t').disabled = 'true';
		else document.getElementById(decls[i]+'t').disabled = ''; 
	}
}

var Drights = [];

function checkAnswers() {
	var wrong = 0;
	var rn = G_oneNoun;
	var stem = words[rn][0];
	for (i in decls) {
		var right = 0;
		var thisa = document.getElementById(decls[i]+'t');

		if(/,/.test(thisa.value)) {
			var vals = thisa.value.replace(/ /g,'').split(',');
			for(k in vals) {
				vals[k] = words[rn][1]+vals[k];
			}
			if(vals.join(',') == correctDec[stem][decls[i]].join(',')) {
				thisa.style.backgroundColor = '#5F5';
				right=1;
			}
			else {
				right = 0;
				thisa.style.backgroundColor = '#F55';
			}
		}
		else {
			for (j in correctDec[stem][decls[i]]) {
				if (correctDec[stem][decls[i]][j] == '') {
					thisa.style.backgroundColor = '';
					right = 1;
					break;
				}
				if (words[rn][1]+thisa.value == correctDec[stem][decls[i]][j]) {
					thisa.style.backgroundColor = '#5F5';
					right = 1;
					break;
				}
				else {
					thisa.style.backgroundColor = '#F55';
				}
			}
		}
		if (right == 0) wrong = 1;
	}
	if (wrong == 0) {
		alertFlash("Well done!",'green');
		Drights[rn] = 1;
		resetTable();
	}
	showRights();
}

function showRights() {
	$('#Qcorrects').html('');
	for (i in Drights) {
		document.getElementById('Qcorrects').innerHTML += words[i][0]+'-<br />';
	}
	if ($('#Qcorrects').html() != '') {
		$('#corrects').show();
		$('#Qcorrects').html($('#Qcorrects').html()+'<br /><span class="abut obut tiny" title="Reset right answers" onclick="rights = []; showRights();" id="resetRights">Reset</span>');
		return;
	}
	$('#corrects').hide();
}

function clearAnswers() {
	for (i in decls) {
		document.getElementById(decls[i]+'t').value = '';
		document.getElementById(decls[i]+'t').style.backgroundColor = '';
	}
}			

function showAnswers() {
	
	document.getElementById('Qshow').innerHTML = 'Hide';
	document.getElementById('Qshow').onclick = function () { hideAnswers() };
	var rn = document.getElementById('QwhichS').value;
	var stem = words[rn][0];
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
	var rn = G_oneNoun;
	var stem = words[rn][0];
	addStems(stem,rn);
}

var G_oneDec = [0,0,0];

function getDeclension() {
	$('#declension')[0].selectedIndex = -1;
	$('#number')[0].selectedIndex = -1;
	var rn=Math.floor(Math.random()*words.length);
	var rn2=Math.floor(Math.random()*decls.length);
	var stem = words[rn][0];
	var alts = correctDec[stem][decls[rn2]];
	var rn3=Math.floor(Math.random()*alts.length);
	var oneWord = alts[rn3];
	if(!oneWord) {
		return getDeclension();
	}
	G_oneDec = [stem,oneWord,rn2];
	$('#QwhichT').html(words[rn][2]);
	$('#QwhichC').html(words[rn][3]);
	$('#oneDec').html(alts[rn3]);
}


function checkAnswer2() {
	var dec = $('#declension')[0].selectedIndex;
	var num = $('#number')[0].selectedIndex;
	var alts = correctDec[G_oneDec[0]][declNo[dec][num]];
	for(i in alts) {
		if(alts[i] == G_oneDec[1]) {
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
	var d = declsToNo[decls[G_oneDec[2]]];
	$('#declension')[0].selectedIndex = d[0];
	$('#number')[0].selectedIndex = d[1];
	setTimeout(function(){showAnswer2(cnt)},500);
}

// moveable



function resetMTable()  {
	if(Drights.length == words.length) {
		Drights = [];
		alertFlash("Congratulations for completing all declensions!",'green');
	}
		
	var rn=Math.floor(Math.random()*words.length);
	while(Drights[rn] || (G_oneNoun == rn))
		var rn=Math.floor(Math.random()*words.length);
	document.getElementById('QwhichT').innerHTML = words[rn][2];
	document.getElementById('QwhichC').innerHTML = words[rn][3];
	var stem = words[rn][0];

	G_oneNoun = [rn,stem];

    for (i in decls){
		var html = correctDec[stem][decls[i]].join(', ');
        $('#drag'+i).html(html?html:'&nbsp;');
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
    for (i in decls){
		var right = 0;
		var thisa = $('#decr'+i+' div');

        if(thisa.html().replace(/&nbsp;/g,'') == correctDec[G_oneNoun[1]][decls[i]].join(', ')) {
			thisa.css('background-color','#5F5');
			right=1;
		}
		else {
			right = 0;
			thisa.css('background-color','#F55');
		}
		if (right == 0) wrong = 1;
	}
	if (wrong == 0) {
		alertFlash("Well done!",'green');
		//Drights[G_oneNoun[0]] = 1;
		resetMTable();
		resetMColors();
	}
	else
		$(".drag").mousedown(function(){resetMColors();});
}

function resetMColors() {
    for (i in decls){
		var thisa = $('#decr'+i+' div');
		thisa.css('background-color','#EEE');
	}	
}

// verbs

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

var vdecs = [];
vdecs.push([['ti'],['nti'],['si'],['tha'],['ami'],['ama'],1,'present']);  // last one is 0 for non-present system, 1 for pres system
vdecs.push([['tu'],['ntu'],['','hi'],['tha'],['ami'],['ama'],1,'imperative']);
vdecs.push([['eyya'],['eyyu.m'],['eyyaasi'],['eyyaatha'],['eyyaami'],['eyyaama'],1,'optative']);
//vdecs.push([['issati'],['issanti'],['issasi'],['issatha'],['issaami'],['issaama'],0,'future']);

var G_oneVerb = [];

var G_VRights = [];

function resetVTable()  {
	if ($('#Qshow').html() == 'Hide') hideVAnswers();
	
	// get rights length
	
	var rl = 0;
	for (i in G_VRights) {
		rl+=G_VRights[i].length;
	}
	
	if(rl == verbs.length*vdecs.length) {
		G_VRights = [];
		alertFlash('Congratulations, you have completed the declension quiz!','green');
	}
	var rn=Math.floor(Math.random()*verbs.length);
	var rn1=Math.floor(Math.random()*vdecs.length);
	//var rn = 4;
	if(G_VRights[rn]) {
		while(G_VRights[rn][rn1] || (G_oneVerb[0] == rn && G_oneVerb[1] == rn1)) {
			var rn=Math.floor(Math.random()*verbs.length);
			var rn1=Math.floor(Math.random()*vdecs.length);
		}
	}

	var stem = verbs[rn][vdecs[rn1][6]];

	G_oneVerb = [rn,rn1,stem];

	$('#QwhichT').html('√'+verbs[rn][0]);
	$('#QwhichC').html('in regards to '+verbs[rn][2]);

	$('#oneDec').html(vdecs[rn1][7]);

	//addVStems(stem,rn);

	clearVAnswers();
	//showVRights();
}
function clearVAnswers() {
	for (i in vdtypes) {
		$('#'+vdtypes[i]+'t').val('');
		$('#'+vdtypes[i]+'t').css('background-color','');
	}
}			
function addVStems() {
	for (i in vdtypes) {
		document.getElementById(vdtypes[i]).innerHTML = G_oneVerb[2];
	}
}
function showVAnswers() {
	
	$('#Qshow').html('Hide');
	document.getElementById('Qshow').onclick = function () { hideVAnswers() };
	var rn = G_oneVerb[0];
	var rn1 = G_oneVerb[1];
	var stem = G_oneVerb[2];
	for (i in vdtypes) {
		$('#'+vdtypes[i]+'t').css('background-color','');
		$('#'+vdtypes[i]+'t').hide();
		
		var stems = '';
		for (j in vdecs[rn1][i])
			stems = (stems?stems+', ':'')+convertVerb(stem,vdecs[rn1][i][j]);
			
		$('#'+vdtypes[i]).html(stems);
	}
}

function hideVAnswers() {
	$('#Qshow').html('Show');
	document.getElementById('Qshow').onclick = function () { showVAnswers() };
	for (i in decls) {
		$('#'+vdtypes[i]+'t').css('background-color','white');
		$('#'+vdtypes[i]+'t').show();
		$('#'+vdtypes[i]).html('');
	}
}

function checkVAnswers() {
	var wrong = 0;
	
	var rn = G_oneVerb[0];
	var rn1 = G_oneVerb[1];
	var stem = G_oneVerb[2];

	for (i in vdtypes) {
		var right = 0;
		var thisa = $('#'+vdtypes[i]+'t');
		if(/,/.test(thisa.val())) {
			if(vdecs[rn1][i].length == 1)
				right = 0;
			else {
				var vals = thisa.val().replace(/ /g,'').split(',');
				var rvals = vdecs[rn1][i];
				for(k in rvals) {
					rvals[k] = convertVerb(stem,rvals[k]);
				}
				if(vals.join(',') == rvals.join(',')) {
					thisa.css('background-color','#5F5');
					right=1;
				}
				else {
					right = 0;
					thisa.css('background-color','#F55');
				}
			}
		}
		else {
			for (j in vdecs[rn1][i]) {
				if (thisa.val() == convertVerb(stem,vdecs[rn1][i][j])) {
					thisa.css('background-color','#5F5');
					right = 1;
					break;
				}
				else {
					thisa.css('background-color','#F55');
				}
			}
		}
		if (right == 0) wrong = 1;
	}
	if (wrong == 0) {
		if(!G_VRights[rn]) G_VRights[rn] = [];
		G_VRights[rn][rn1] = 1;
		alertFlash("Well done!",'green');
		resetVTable();
	}	
	showVRights();
}

function showVRights() {
	$('#Qcorrects').html('');
	if(G_VRights.length == 0) {
		$('#corrects').hide();
		return;
	}
	for (i in G_VRights) {
		var rn = i;
		for (j in G_VRights[i]) {
			var rn1 = j;
			$('#Qcorrects').html($('#Qcorrects').html()+ '√'+verbs[rn][0]+' - '+vdecs[rn1][7]+'<br />');
		}
	}
	if ($('#Qcorrects').html() != '') {
		$('#corrects').show();
		$('#Qcorrects').html($('#Qcorrects').html()+'<br /><span class="abut obut tiny" title="Reset right answers" onclick="rights = []; showRights();" id="resetRights">Reset</span>');
		return;
	}
	$('#corrects').hide();
}

var G_oneVDec = [];

function getVDeclension() {
	$('#tense')[0].selectedIndex = -1;
	$('#declension')[0].selectedIndex = -1;
	$('#number')[0].selectedIndex = -1;
	var rn=Math.floor(Math.random()*verbs.length);
	var rn1=Math.floor(Math.random()*vdecs.length);
	var rn2=Math.floor(Math.random()*vdtypes.length);
	var stem = verbs[rn][vdecs[rn1][6]];
	
	var alts = vdecs[rn1][rn2];
	var rn3=Math.floor(Math.random()*alts.length);
	var oneWord = convertVerb(stem,alts[rn3]);
	if(!oneWord) {
		return getVDeclension();
	}
	G_oneVDec = [rn,rn1,rn2,stem,oneWord,alts[rn3]];
	$('#QwhichT').html('√'+verbs[rn][0]);
	$('#QwhichC').html('in regards to '+verbs[rn][2]);

	$('#oneDec').html(oneWord);
}

function checkVAnswer2() {
	var tense = $('#tense')[0].selectedIndex;
	var dec = $('#declension')[0].selectedIndex;
	var num = $('#number')[0].selectedIndex;
	
	var alts = vdecs[tense][(dec*2+num)];
	for(i in alts) {
		if(alts[i] == G_oneVDec[5]) {
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
	
	$('#tense')[0].selectedIndex = G_oneVDec[1];
	$('#declension')[0].selectedIndex = vdtypesNo[G_oneVDec[2]][0];
	$('#number')[0].selectedIndex = vdtypesNo[G_oneVDec[2]][1];
	setTimeout(function(){showVAnswer2(cnt)},500);
}


// moveable

function resetMVTable()  {
	// get rights length
	
	var rl = 0;
	for (i in G_VRights) {
		rl+=G_VRights[i].length;
	}
	
	if(rl == verbs.length*vdecs.length) {
		G_VRights = [];
		alertFlash('Congratulations, you have completed the declension quiz!','green');
	}
	var rn=Math.floor(Math.random()*verbs.length);
	var rn1=Math.floor(Math.random()*vdecs.length);
	//var rn = 4;
	if(G_VRights[rn]) {
		while(G_VRights[rn][rn1] || (G_oneVerb[0] == rn && G_oneVerb[1] == rn1)) {
			var rn=Math.floor(Math.random()*verbs.length);
			var rn1=Math.floor(Math.random()*vdecs.length);
		}
	}
	

	var stem = verbs[rn][vdecs[rn1][6]];

	G_oneVerb = [rn,rn1,stem];

	$('#QwhichT').html('√'+verbs[rn][0]);
	$('#QwhichC').html('in regards to '+verbs[rn][2]);

	$('#oneDec').html(vdecs[rn1][7]);

    for (i in vdtypes){
		var html = '';
		for (j in vdecs[rn1][i])
			html=(html?html+', ':'')+convertVerb(stem,vdecs[rn1][i][j]);
        $('#drag'+i).html(html?html:'&nbsp;');
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
    var stem = G_oneVerb[2];
    var rn1 = G_oneVerb[1];
    for (i in vdtypes){
		var right = 0;
		var thisa = $('#decr'+i+' div');
		
		var cor = '';
		for (j in vdecs[rn1][i])
			cor=(cor?cor+', ':'')+convertVerb(stem,vdecs[rn1][i][j]);
			
        if(thisa.html().replace(/&nbsp;/g,'') == cor) {
			thisa.css('background-color','#5F5');
			right=1;
		}
		else {
			right = 0;
			thisa.css('background-color','#F55');
		}
		if (right == 0) wrong = 1;
	}
	if (wrong == 0) {
		alertFlash("Well done!",'green');
		//Drights[G_oneNoun[0]] = 1;
		resetMVTable();
		resetMVColors();
	}
	else
		$(".drag").mousedown(function(){resetMVColors();});
}

function resetMVColors() {
    for (i in vdtypes){
		var thisa = $('#decr'+i+' div');
		thisa.css('background-color','#EEE');
	}	
}


function convertVerb(stem,suf) {
	var e = stem.charAt(stem.length-1);
	var e1 = stem.charAt(stem.length-2);
	var s = suf.charAt(0);
	var s1 = suf.charAt(1);
	if(/[aiu]/.test(e) && e==e1 && s && s1 && !/[aiueo]/.test(s) && !/[aiueoh]/.test(s1)) {
		return toUni(stem.substring(0,stem.length-1)+suf);
	}
	
	if(!/[aiueo]/.test(s) || !/[aiueo]/.test(e))
		return toUni(stem+suf);
	if(e==e1) {
		if(s=='e')
			return toUni(stem.substring(0,stem.length-2)+suf);
		return toUni(stem+suf.substring(1));
	}
	if(e==s) {
		if(s=='e')
			return toUni(stem.substring(0,stem.length-1)+suf);
		return toUni(stem+suf);
	}
	if(e=='a' || s=='e')
		return toUni(stem.substring(0,stem.length-1)+suf);
	if(s=='a')
		return toUni(stem+suf.substring(1));
		
	return toUni(stem+suf);
}
