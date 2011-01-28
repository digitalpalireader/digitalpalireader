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

	for (Count = 0; Count < 4; Count++) 
	{
		if (document.convertor.R1[Count].checked)
		break;
	}
	for (Counta = 0; Counta < 4; Counta++) 
	{
		if (document.convertor.R2[Counta].checked)
		break;
	}
	if (Count == 0)
	{
		if (Counta == 1) // Unicode to velthius
		{
            spell = replacevelstandard(spell);
		}
		else if (Counta == 2) // Unicode to Thai
		{
			spell = thaiconv(spell);
		}
		else if (Counta == 3) // Unicode to Deva
		{

			spell = todeva(spell);
		}
		else if (Counta == 4) // Unicode to Myan
		{

			spell = toMyanmar(spell);
		}
	}
	else if (Count == 1)
	{
		if (Counta == 0) // Velthius to unicode
		{
            spell = replaceunistandard(spell);
		}
		else if (Counta == 2) // Velthius to Thai
		{
			spell = thaiconv(replaceunistandard(spell));
		}			
		else if (Counta == 3) // Velthius to Deva
		{
			spell = todeva(replaceunistandard(spell));
		}			
		else if (Counta == 4) // Velthius to Myan
		{
			spell = toMyanmar(replaceunistandard(spell));
		}			
	}
	document.convertor.outputc.value = spell;	
}



function changeit(what,which)
{
	if (what == 'u')
	{
		
		if (which == 1 && document.convertor.R2[0].checked) document.convertor.R2[1].checked = true;
		else if (which == 2 && document.convertor.R1[0].checked) document.convertor.R1[1].checked = true;
	}
	else if (what == 'v')
	{
		
		if (which == 1 && document.convertor.R2[1].checked) document.convertor.R2[0].checked = true;
		else if (which == 2 && document.convertor.R1[1].checked) document.convertor.R1[0].checked = true;
	}
	convert();
}
function clearboth()
{
	document.convertor.inputc.value = '';
	document.convertor.outputc.value = '';
}

function sendtoconvert(data)
{
	data = data.replace(/\u00B7/g, '\'');
	data = data.replace(/\u00B4/g, '\"');
	data = data.replace(/ M /g, ' ');
	data = data.replace(/ V /g, ' ');
	data = data.replace(/ P /g, ' ');
	data = data.replace(/ T /g, ' ');
	data = data.replace(/ VAR /g, ' ');
	data = data.replace(/  *,/g, ',')

	moveframex(2)
	moveframey('cof');
	document.convertor.R1[1].checked = true;
	document.convertor.R2[2].checked = true;
	document.convertor.outputc.value = '';
	document.convertor.inputc.value = data;
	convert();
}
