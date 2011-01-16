function newquiz() {
	document.getElementById('mafb').innerHTML = '<input type="hidden" id="qno" value="1"><input type="hidden" id="ran" value="0"><input type="hidden" id="wan" value="0"><p><b>Pali Quiz</b> <i id="checka">(click on the button corresponding to the right answer below)</i></p><p>Question #<font id="qn"></font>: What is the meaning of "<font id="qq"></font>"?</p><p><font id="answers"></font></p><p><table width=100%><tr><td>Right Answers: <b id="ra" style="color:'+colorcfg['green']+'"></b></td><td>Wrong Answers: <b id="wa" style="color:'+colorcfg['red']+'"></b></td><td>Percent: <b id="pa"></b></td></tr></table><p>Total Right Answers: <b id="rights"></b> <input type="button" class="btn" value="clear" onclick="clearrights()>';
	document.getElementById('ra').innerHTML = '0';
	document.getElementById('wa').innerHTML = '0';
	quizme();
}

function quizme() {
	
	// remember rights
	var rights = readFile("DPTEST");
	if(rights) {
		rights=rights.split(',');
		if (rights.length == 1 && rights[0] == "") rights = [];
		document.getElementById('rights').innerHTML = rights.length;
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
	
	var formatanswerwrong = '';
	var formatanswer = yt[quiza[quizrandomright]].replace(/\&comma/g, ',').split('#')[0].replace(/,$/, "").replace(/,/g, '.').replace(/\'/g, '\\\'');
	var formatanswerout = yt[quiza[quizrandomright]].replace(/\&comma/g, ',').split('#')[0].replace(/,$/, "").replace(/,/g, '.').replace(/\'/g, '\\\'');
	if (yt[quiza[quizrandomright]].split('#').length > 1) formatanswerout += ' (' + yt[quiza[quizrandomright]].replace(/\&comma/g, ',').split('#')[1].replace(/,/g, '.') + ')';
	for (qtmp = 0; qtmp < 4; qtmp++) {
		if (qtmp == quizrightorder) {
			quizanswersout += '<p><input type="button" class="btn" onclick="answerquiz(1,\'' + questionout + ' = ' + formatanswerout + '\',' + quizrandomright + ')" value="&gt"> '+formatanswer+'</p>';
		}
		else {
			formatanswerwrong = yt[quiza[quizeachwrong[qtmp2]]].replace(/\&comma/g, ',').split('#')[0].replace(/,$/, "").replace(/,/g, '.').replace(/\'/g, '\\\'');
			quizanswersout += '<p><input type="button" class="btn" onclick="answerquiz(0,\'' + questionout + ' = ' + formatanswerout + '\')" value="&gt"> '+formatanswerwrong+'</p>';
			qtmp2++;
		}
	}
	document.getElementById('answers').innerHTML = quizanswersout;
}

function answerquiz(right,answer,numb) {
	document.getElementById('qn').innerHTML = ++document.getElementById('qno').value;
	if (right == 1) {
		document.getElementById('checka').innerHTML = '<font color=green>Right! &nbsp;' + answer + '</font>';
		document.getElementById('ra').innerHTML = ++document.getElementById('ran').value;
		
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
		document.getElementById('checka').innerHTML ='<font color=red>Wrong! &nbsp;' + answer + '</font>';
		document.getElementById('wa').innerHTML = ++document.getElementById('wan').value;
	}

	var percentr = Number(document.getElementById('ran').value) / (Number(document.getElementById('ran').value) + Number(document.getElementById('wan').value))*100;

	var colorpc = 0;
	if (percentr <= 50) {
		colorpc = Math.round(percentr/50*255);
		colorpc = colorpc.toString(16).toUpperCase();
		if (colorpc.length == 1) colorpc = '0'+colorpc;
		document.getElementById('pa').setAttribute('style','color:#'+ 'FF' + colorpc + '00');
	}
	else {
		colorpc = Math.round((percentr - 50)/50*255)*(-1)+255;
		colorpc = colorpc.toString(16).toUpperCase();
		if (colorpc.length == 1) colorpc = '0'+colorpc;
		document.getElementById('pa').setAttribute('style','color:#' + colorpc +'FF' + '00');
	}
	document.getElementById('pa').innerHTML = Math.round(percentr) + '%';
	quizme();
}

function clearrights() {
    document.getElementById('ra').innerHTML = 0;
    document.getElementById('ran').value = 0;
    document.getElementById('wa').innerHTML = 0;
    document.getElementById('wan').value = 0;
    document.getElementById('pa').innerHTML = "";
	document.getElementById('rights').innerHTML = 0;
    
	writeFile("DPTEST","","UTF-8");
}
