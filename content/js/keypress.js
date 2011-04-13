document.onkeypress = keyPressed;

function keyPressed(e) {
	if(document.activeElement.type == "text" || document.activeElement.tagName == "TEXTAREA" || e.altKey || e.ctrlKey) { return; }

	if (e.charCode == 49) { // 1
		if(document.getElementById('Qa1')) { f = document.getElementById('Qa1').onclick; f(); }
		else if(document.getElementById('QcheckAns')) { f = document.getElementById('QcheckAns').onclick; f(); }
		else moveframex(1); 
		return; 
	} 
	if (e.charCode == 50) { // 2
		if(document.getElementById('Qa2')) { f = document.getElementById('Qa2').onclick; f(); }
		else if(document.getElementById('Qclear')) { f = document.getElementById('Qclear').onclick; f(); }
		else moveframex(2); 
		return; 
	} 
	if (e.charCode == 51) { // 3
		if(document.getElementById('Qa3')) { f = document.getElementById('Qa3').onclick; f(); }
		else if(document.getElementById('Qshow')) { f = document.getElementById('Qshow').onclick; f(); }
		else moveframex(3); 
		return; 
	} 
	if (e.charCode == 52) { // 4
		if(document.getElementById('Qa4')) { f = document.getElementById('Qa4').onclick; f(); }
		else if(document.getElementById('Qnew')) { f = document.getElementById('Qnew').onclick; f(); }
		return; 
	} 

	if (e.charCode == 120) { moveframec(); return; } // x

	if (e.charCode == 115) {  // s
		if(getSelected() != '') {
			sendtoconvert(getSelected()+'');
		} 
		else if(document.getElementById('convi')) { sendtoconvert(document.getElementById('convi').innerHTML); }
		else alertFlash('You must select some text to send to the convertor','yellow');
		return; 
	}

	if (e.charCode == 101) {  // e
		if(getSelected() != '') {
			sendtoPad(getSelected()+'');
		} 
		else if(document.getElementById('convi')) { sendtoPad(document.getElementById('convi').innerHTML); }
		else alertFlash('You must select some text to send to the textpad','yellow');
		return; 
	}


	if (e.charCode == 103) { importXML(); return; } // g
	if (e.charCode == 112) { createTablep(); return; } // p
	if (e.charCode == 110) { createTablen(); return; } // n

	if (e.charCode == 100) { moveframey('cdif'); return; } // d
	if (e.charCode == 99) { moveframey('cof'); return; } // c
	if (e.charCode == 116) { moveframey('scf'); return; } // t

	if (e.charCode == 33) { eraseOptions(); return; } // !
	if (e.charCode == 35) { newquiz(); return; } // #
	if (e.charCode == 37) { loadOptions(); return; } // %
	if (e.charCode == 42) { bv(); return; } // *
	if (e.charCode == 63) { helpXML(); return; } // ?

	if (e.charCode == 44) { // ,
		if(document.getElementById('tout') || document.getElementById('bout')) { f = document.getElementById('tout').onclick; f(); }
		else createTablep();
		return; 
	} 
	
	if (e.charCode == 46) { // .
		if(document.getElementById('tout') || document.getElementById('bout')) { f = document.getElementById('bout').onclick; f(); } 
		else createTablen(); 
		return; 
	} 
	
	if (e.charCode == 107) { // k
		promptData("DPR Keyboard Shortcuts", G_keysList.join('\n'));
		return; 
	} 
	
	if (e.charCode == 113) { // q

		var check = {value: false};                  // default the checkbox to false

		var input = {value: ""};           

		var result = G_prompts.prompt(null, "Shorthand Link", "Enter link (DN 1.1, etc.)", input, null, check);

		// result is true if OK is pressed, false if Cancel. input.value holds the value of the edit field if "OK" was pressed.
		
		if(!result) return;

		var place = input.value;
		
		if(!/^[DMASKdmask][Nn]-{0,1}[atAT]{0,1} {0,1}[0-9]+\.{0,1}[0-9]*$/.exec(place)) return alertFlash('Syntax Error','yellow');
		
		place = place.replace(/^([DMASKdmask][Nn]-{0,1}[atAT]{0,1})([0-9])/,"$1,$2").replace(/[ .]/g,',');
		
		var outplace = getSuttaFromNumber(place.split(','));
		if(!outplace) return alertFlash('Link not found','yellow');
		//dalert(outplace);
		getplace(outplace);
		importXML();
				
		return; 
	} 

	if (e.charCode == 114) { if(confirm('Reload the reader?')) document.location.href='chrome://digitalpalireader/content/index.htm'; return;} // r
		
	//devO(e.charCode);
}

var G_keysList = [];

G_keysList.push('The following is a current list of all shortcut keys available to the DPR.  Note that these keys will not function if the cursor is located in an input field.'); 

G_keysList.push(''); 

G_keysList.push('1,2,3\tchange layout for reading, analysis, or dictionary'); 

G_keysList.push(''); 

G_keysList.push('p\tdisplay previous section'); 
G_keysList.push('g\tdisplay current section'); 
G_keysList.push('n\tdisplay next section'); 
G_keysList.push('q\tenter quick reference (DN, MN, SN, & AN only)'); 

G_keysList.push(''); 

G_keysList.push('d\tshow dictionary'); 
G_keysList.push('c\tshow convertor'); 
G_keysList.push('t\tshow textpad'); 

G_keysList.push(''); 

G_keysList.push('x\topen/close control panel'); 

G_keysList.push(''); 

G_keysList.push('s\tsend selected text to convertor'); 
G_keysList.push('e\tsend selected text to textpad'); 

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
