document.onkeypress = keyPressed;

function keyPressed(e) {
	var dTop = document.getElementById('dpr-index-top').contentDocument;
	var dBot = document;

	var wTop = document.getElementById('dpr-index-top').contentWindow;
	var wBot = window;
	if(document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || document.activeElement.tagName == "html:textarea" || e.altKey || e.ctrlKey) { return; }

	if (e.charCode == 115) {  // s
		if(wTop.getSelection().toString() != '') {
			wBot.sendtoconvert(wTop.getSelection().toString()+'');
		} 
		else if(wBot.getSelection().toString() != '') {
			wBot.sendtoconvert(wBot.getSelection().toString()+'');
		} 
		else if(dTop.getElementById('convi')) { wBot.sendtoconvert(dTop.getElementById('convi').innerHTML); }
		else alertFlash('You must select some text to send to the convertor','yellow');
		return; 
	}

	if (e.charCode == 101) {  // e
		if(wTop.getSelection().toString() != '') {
			wBot.sendtoPad(wTop.getSelection().toString()+'');
		} 
		else if(wBot.getSelection().toString() != '') {
			wBot.sendtoPad(wBot.getSelection().toString()+'');
		} 
		else if(dTop.getElementById('convi')) { wBot.sendtoPad(dTop.getElementById('convi').innerHTML); }
		else alertFlash('You must select some text to send to the textpad','yellow');
		return; 
	}
	if (e.charCode == 69) {  // E
		if(wTop.getSelection().toString() != '') {
			wBot.sendtoPad(wTop.getSelection().toString()+'',true);
		} 
		else if(wBot.getSelection().toString() != '') {
			wBot.sendtoPad(wBot.getSelection().toString()+'',true);
		} 
		else if(dTop.getElementById('convi')) { wBot.sendtoPad(dTop.getElementById('convi').innerHTML,true); }
		else alertFlash('You must select some text to send to the textpad','yellow');
		return; 
	}


	if (e.charCode == 112) { if(dTop.getElementById('pSect')) dTop.getElementById('pSect').onmouseup(); return }  // p
	if (e.charCode == 110) { if(dTop.getElementById('nSect')) dTop.getElementById('nSect').onmouseup(); return } // n

	if(e.charCode > 48 && e.charCode < 55) { // 1-6 
		wBot.moveFrame(e.charCode - 48); return; 
	}

//	if (e.charCode == 35) { newquiz(); return; } // #
//	if (e.charCode == 33) { eraseOptions(); return; } // !
	if (e.charCode == 37) {  window.open('chrome://digitalpalireader/content/prefs.xul', 'DPR_prefs', 'chrome'); return; } // %
	if (e.charCode == 118) { wBot.showBv(); return; } // v
	if (e.charCode == 63) { openDPRTab('chrome://digitalpalireader/content/help.htm','DPR-help',1); return; } // ?
	if (e.charCode == 98) { dTop.getElementById('bkButton').onmousedown(); return; } // b

	if (e.charCode == 44) { // ,
		if(dBot.getElementById('tout') || dBot.getElementById('bout')) { dBot.getElementById('tout').onclick(); }
		else if(dTop.getElementById('pSect')) dTop.getElementById('pSect').onmouseup();
		return; 
	} 
	
	if (e.charCode == 46) { // .
		if(dBot.getElementById('tout') || dBot.getElementById('bout')) dBot.getElementById('bout').onclick(); 
		else if(dTop.getElementById('nSect')) dTop.getElementById('nSect').onmouseup();
		return; 
	} 
	
	if (e.charCode == 107) { // k
		promptData("DPR Keyboard Shortcuts", G_keysList.join('\n'));
		return; 
	} 
	
	if (e.charCode == 113) { // q
		
		var check = {value: false};                  // default the checkbox to false

		var input = {value: ""};           

		var result = G_prompts.prompt(null, "Shorthand Link", "Enter link (DN 1.1, etc.)", input, 'open in new tab', check);

		// result is true if OK is pressed, false if Cancel. input.value holds the value of the edit field if "OK" was pressed.
		
		if(!result) return;

		var place = input.value;
		outplace = convertShortLink(place);
		
		if(!outplace) return;
		
		wTop.openPlace(outplace,null,null,check.value);
				
		return; 
	} 

	if (e.charCode == 114) { if(confirm('Reload the reader?')) document.location.href='chrome://digitalpalireader/content/index.xul'; return;} // r
		
	//alert(e.charCode);
}

var G_keysList = [];

G_keysList.push('The following is a current list of all shortcut keys available to the DPR.  Note that these keys will not function if the cursor is located in an input field.'); 

G_keysList.push(''); 

G_keysList.push('p\tdisplay previous section'); 
G_keysList.push('g\tdisplay current section'); 
G_keysList.push('n\tdisplay next section'); 

G_keysList.push(''); 

G_keysList.push('q\tenter quick reference (DN, MN, SN, & AN only)'); 

G_keysList.push(''); 

G_keysList.push('1-6\tswitch between bottom frames'); 

G_keysList.push(''); 

G_keysList.push('s\tsend selected text to convertor'); 
G_keysList.push('e\tsend selected text to textpad'); 
G_keysList.push('E\tappend selected text to textpad'); 

G_keysList.push(''); 

G_keysList.push(',\tdisplay previous PED or DPPN entry'); 
G_keysList.push('.\tdisplay next PED or DPPN entry'); 

G_keysList.push(''); 

G_keysList.push('%\tdisplay options configuration'); 
G_keysList.push('!\treset options'); 
G_keysList.push('#\tdisplay Pali quiz'); 
G_keysList.push('*\tdisplay Pali quote'); 
G_keysList.push('?\tdisplay help'); 
G_keysList.push('@\tdisplay feedback form'); 

G_keysList.push(''); 

G_keysList.push('r\treload the reader'); 

G_keysList.push(''); 

G_keysList.push('k\tshow this list of shortcuts'); 


function convertShortLink(place) {
	var wTop = document.getElementById('dpr-index-top').contentWindow;
	// kn subs
	var arr = [];
	arr['khp'] = 1;
	arr['dhp'] = 2;
	arr['ud'] = 3;
	arr['it'] = 4;
	arr['sn'] = 5;
	arr['vv'] = 6;
	arr['pv'] = 7;
	arr['th'] = 8;
	arr['thi'] = 9;
	arr['apa'] = 10;
	arr['api'] = 11;
	arr['bv'] = 12;
	arr['cp'] = 13;
	arr['ja'] = [14,520];

	if(!/^[A-Za-z]{1,3}-{0,1}[atAT]{0,1} {0,1}[0-9]*\.{0,1}[0-9]*$/.test(place)) return wTop.alertFlash('Syntax Error','yellow');  // loose syntax
	
	if(/^[A-Za-z]+\.*([\d]+)$/.test(place)) {
		for(i in arr) {
			var ai = new RegExp('^'+i);
			if(ai.test(place)) {
				var no = place.replace(/^[A-Za-z]+\.*([\d]+)$/,"$1");
				if(typeof(arr[i]) == 'object') { // multiple
					if(parseInt(no) > arr[i][1]) {
						no = parseInt(no) - arr[i][1];
						place = place.replace(/^([A-Za-z]+\.*)[\d]+$/,"$1"+no);
					}
					place = place.replace(/^[A-Za-z]+/,'kn'+arr[i][0]+'.'+no);
				}
				else
					place = 'kn'+arr[i]+'.'+no;
			}
		}
	}

	if(!/^[DMASKdmask][Nn]{0,1}-{0,1}[atAT]{0,1} {0,1}[0-9]+\.{0,1}[0-9]*$/.exec(place)) return wTop.alertFlash('Syntax Error','yellow');
	
	place = place.replace(/^([DMASKdmask][Nn]{0,1}-{0,1}[atAT]{0,1})([0-9])/,"$1,$2").replace(/[ .]/g,',');
	
	var outplace = wTop.getSuttaFromNumber(place.split(','));
	if(!outplace) return wTop.alertFlash('Link not found','yellow');
	return outplace;
}