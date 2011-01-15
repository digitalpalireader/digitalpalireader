document.onkeypress = keyPressed;

function keyPressed(e) {
	if(document.activeElement.type) { return; }
		if (e.charCode == 49) { moveframex(1); return; } // 1
		if (e.charCode == 50) { moveframex(2); return; } // 2
		if (e.charCode == 51) { moveframex(3); return; } // 3

		if (e.charCode == 96) { moveframec(); return; } // `

		if (e.charCode == 113) { switchTB(); return; } // q


		if (e.charCode == 103) { importXML(); return; } // g
		if (e.charCode == 112) { createTablep(); return; } // p
		if (e.charCode == 110) { createTablen(); return; } // n

		if (e.charCode == 100) { moveframey('dif'); return; } // d
		if (e.charCode == 99) { moveframey('cof'); return; } // c
		if (e.charCode == 116) { moveframey('scf'); return; } // t

		if (e.charCode == 46) { bv(); return; } // t
}
