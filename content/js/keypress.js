document.onkeypress = keyPressed;

var isCtrl = false;
var isAlt = false;

document.onkeyup=function(e){
	if(e.which == 17) isCtrl=false;
	if(e.which == 18) isAlt=false;
}
document.onkeydown=function(e){
	if(e.which == 17) isCtrl=true;
	if(e.which == 18) isAlt=true;
}

function keyPressed(e) {
	if((document.activeElement.type && document.activeElement.type != "button" && document.activeElement.type != "submit") || isCtrl == true || isAlt == true) { return; }
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
			else {
				if(document.getElementById('convi')) { sendtoconvert(document.getElementById('convi').innerHTML); }
			}
			return; } // .

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

		//document.getElementById('mafb').innerHTML += e.charCode + '<br/>';
}
