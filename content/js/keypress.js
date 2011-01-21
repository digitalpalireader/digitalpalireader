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
	if(document.activeElement.type || isCtrl == true || isAlt == true) { return; }
		if (e.charCode == 49) { moveframex(1); return; } // 1
		if (e.charCode == 50) { moveframex(2); return; } // 2
		if (e.charCode == 51) { moveframex(3); return; } // 3

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

		if (e.charCode == 35) { newquiz(); return; } // #
		if (e.charCode == 37) { loadOptions(); return; } // %
		if (e.charCode == 42) { bv(); return; } // *
		if (e.charCode == 63) { helpXML(); return; } // ?

		if (e.charCode == 44) { // ,
			if(document.getElementById('tout')) { f = document.getElementById('tout').onclick; f(); }
			else createTablep();
			return; 
		} 
		
		if (e.charCode == 46) { // .
			if(document.getElementById('tout')) { f = document.getElementById('bout').onclick; f(); } 
			else createTablen(); 
			return; 
		} 

		//document.getElementById('mafb').innerHTML += e.charCode + '<br/>';
}
