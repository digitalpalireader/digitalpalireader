function getSelected() {
	var txt = '';
	if (window.getSelection) {
		txt = window.getSelection();
	}
	else if (document.getSelection)	{
		txt = document.getSelection();
	}
	else if (document.selection) {
		txt = document.selection.createRange().text;
	}
	return txt;
}


function convert()
{
	var spell = document.convertor.inputc.value;

	var Count = document.convertor.conversion1.selectedIndex
	var Counta = document.convertor.conversion2.selectedIndex

	if (Count == 0)
	{
		if (Counta == 1) // Unicode to velthius
		{
            spell = toVel(spell);
		}
		else if (Counta == 2) // Unicode to Thai
		{
			spell = toThai(spell);
		}
		else if (Counta == 3) // Unicode to Deva
		{

			spell = todeva(spell);
		}
		else if (Counta == 4) // Unicode to Myan
		{

			spell = toMyanmar(spell);
		}
		else if (Counta == 5) // Unicode to Sinhala
		{
			spell = toSin(spell);
		}			
	}
	else if (Count == 1)
	{
		if (Counta == 0) // Velthius to unicode
		{
            spell = toUni(spell);
		}
		else if (Counta == 2) // Velthius to Thai
		{
			spell = toThai(toUni(spell));
		}			
		else if (Counta == 3) // Velthius to Deva
		{
			spell = todeva(toUni(spell));
		}			
		else if (Counta == 4) // Velthius to Myan
		{
			spell = toMyanmar(toUni(spell));
		}			
		else if (Counta == 5) // Velthius to Sinhala
		{
			spell = toSin(toUni(spell));
		}			
	}
	document.convertor.outputc.value = spell;	
}



function changeConversion(what,which)
{
	if (what == 0)
	{
		
		if (which == 1 && document.convertor.conversion2.selectedIndex == 0) document.convertor.conversion2.selectedIndex = 1;
		else if (which == 2 && document.convertor.conversion1.selectedIndex == 0) document.convertor.conversion1.selectedIndex = 1;
	}
	else if (what == 1)
	{
		
		if (which == 1 && document.convertor.conversion2.selectedIndex == 1) document.convertor.conversion2.selectedIndex = 0;
		else if (which == 2 && document.convertor.conversion1.selectedIndex == 1) document.convertor.conversion1.selectedIndex = 0;
	}
	convert();
}
function clearboth()
{
	document.convertor.inputc.value = '';
	document.convertor.outputc.value = '';
}

function sendtoconvert(data,shift)
{
	data = data.replace(/” ”/g, '”');
	data = data.replace(/’ ’/g, '’');
	data = data.replace(/\u00B7/g, '\'');
	data = data.replace(/\u00B4/g, '\"');
	data = data.replace(/ M /g, ' ');
	data = data.replace(/ V /g, ' ');
	data = data.replace(/ P /g, ' ');
	data = data.replace(/ T /g, ' ');
	data = data.replace(/☸ */g, '');
	data = data.replace(/ VAR /g, ' ');
	data = data.replace(/  *,/g, ',')
	data = data.replace(/\.\.+/g, '.')

	moveframex(2)
	moveframey('cof');
	document.convertor.conversion1.selectedIndex = 0;
	document.convertor.conversion2.selectedIndex = 1;
	document.convertor.outputc.value = '';
	document.convertor.inputc.value = data;
	convert();
}

function sendtoPad(data,shift)
{
	moveframex(2)
	moveframey('scf');
	
	data = data.replace(/\t/g, ' ');
	data = data.replace(/” ”/g, '”');
	data = data.replace(/’ ’/g, '’');
	data = data.replace(/\u00B7/g, '\'');
	data = data.replace(/\u00B4/g, '\"');
	if(DPR_prefs['showPagesFull']) {
		data = data.replace(/ *[MVPT]\.[0-9]+\.[0-9]+/g, '');
	}
	else{
		data = data.replace(/ *[MVPT]([^āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶA-Za-z])/g, "$1");
		data = data.replace(/ *[MVPT]$/g, "");
	}
	data = data.replace(/☸ */g, '');
	data = data.replace(/VAR/g, ' ');
	data = data.replace(/  *,/g, ',')
	data = data.replace(/\.\.\. pe \.\.\./g, '… pe …')
	data = data.replace(/\.\.+/g, '.')
	data = data.replace(/  +/g, ' ')
	
	document.textpad.pad.value = (shift?document.textpad.pad.value:'') + data + '\n';
}

function clearPad() {

	if(confirm('Are you sure you want to erase all text from the text pad?')) document.textpad.pad.value = '';
}

function savePad() {
	var data = document.textpad.pad.value;
	file = fileSaveDialog('Choose a location to export the text');
//	file = file.replace(/\\/g,'/');
	if(file == '') {
		alertFlash('You must enter a file name', 'red');
		return;
	}
	
	if(writeExtFile(file, data)) alertFlash('Data saved to '+file, 'green');
	else {
		alertFlash('Error saving file', 'red');
	}
}
