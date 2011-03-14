var moveat = 2;

function moveframex(a,temp) //read, etc
{
    if(!temp) getconfig();

	// adjust control panel based on cpout variable

    if(cfg['cpanel'] == '1') { document.getElementById('right').style.left = confmove[2] + 'px'; }
    else {document.getElementById('right').style.left = '0px'; }

    document.getElementById('left').style.width = confmove[2] + 'px';
//    document.getElementById('anf').style.height = confmove[0] + 'px';
    document.getElementById('searcht').style.height = confmove[3] + 'px';
    moves(0);
    switch (a) {
        case 1: //read
			
			if (document.getElementById('toolframebutton')) { 
				document.getElementById('toolframebutton').value = 'A'; 
				document.getElementById('toolframebutton').title = 'Restore Frames';
			}

			document.getElementById('RM').style.backgroundImage='url(images/lb1.png)';
			document.getElementById('AM').style.backgroundImage='url(images/mb0.png)';
			document.getElementById('DM').style.backgroundImage='url(images/rb0.png)';
            moveat = 1;
            document.getElementById('maf').style.display = 'block';
            document.getElementById('rightbot').style.display = 'none';
            document.getElementById('anf').style.bottom = '-4px';
            document.getElementById('anf').style.top = 'auto';
            break;
        case 2:  //normal view

			if (document.getElementById('toolframebutton')) { 
				document.getElementById('toolframebutton').value = 'R'; 
				document.getElementById('toolframebutton').title = 'Maximize Read Frame';
			}
			document.getElementById('RM').style.backgroundImage='url(images/lb0.png)';
			document.getElementById('AM').style.backgroundImage='url(images/mb1.png)';
			document.getElementById('DM').style.backgroundImage='url(images/rb0.png)';
            moveat = 2;
            document.getElementById('maf').style.display = 'block';
            document.getElementById('rightbot').style.display = 'block';

            document.getElementById('anf').style.bottom = (parseInt(confmove[1])-4) + 'px';
            document.getElementById('anf').style.top = 'auto';

            document.getElementById('rightbot').style.bottom = '0px';
            document.getElementById('rightbot').style.height = parseInt(confmove[1]) + 'px';

            document.getElementById('rightbot').style.top = '';
            break;
        case 3: // dict
			document.getElementById('RM').style.backgroundImage='url(images/lb0.png)';
			document.getElementById('AM').style.backgroundImage='url(images/mb0.png)';
			document.getElementById('DM').style.backgroundImage='url(images/rb1.png)';
            moveat = 3;
           // moveframey('dif'); // switch to dict
            
            document.getElementById('maf').style.display = 'none';
            document.getElementById('rightbot').style.display = 'block';

            document.getElementById('anf').style.top = '-1px';
            document.getElementById('anf').style.bottom = 'auto';
            
            document.getElementById('rightbot').style.height = 'auto';
            document.getElementById('rightbot').style.top = (document.getElementById('anf').offsetTop + document.getElementById('anf').offsetHeight - 4)+ 'px';
            document.getElementById('rightbot').style.bottom = '0px';

            
            break;
    }
	document.getElementById('maf').style.bottom = (window.innerHeight-document.getElementById('anf').offsetTop) + 'px';
}

function moveframey(a) //dict, conv, or scratch
{
	if(a == 'dif') a = 'cdif';
	moves(0); // close search

	if (moveat == 1) moveframex(2);
	
	var fimg = [];
	fimg['cdif'] = 'l';
	fimg['cof'] = 'm';
	fimg['scf'] = 'r';
	
	var fa = ['cdif','cof','scf'];

	for (i in fa) {
		if (a == fa[i]) {
			document.getElementById(a+'M').style.backgroundImage='url(images/'+fimg[a]+'b1.png)';
		}
		else {
			document.getElementById(fa[i]+'M').style.backgroundImage='url(images/'+fimg[fa[i]]+'b0.png)';
		}
	}

    document.getElementById('cdif').style.display="none";
	document.getElementById('cof').style.display="none";
	document.getElementById('scf').style.display="none";

	document.getElementById(a).style.display="block";
}

var cpout = 1;


function moveframec() // open close control panel
{
	if (cpout == 1) { // is open, close
		document.getElementById('cpa').title='open control panel (x)'; 
		document.getElementById('cpa').innerHTML="o";

		closeCP(parseInt(confmove[2]));
	}
	else { // is closed, open
		document.getElementById('cpa').title='close control panel (x)'; 
		document.getElementById('cpa').innerHTML="x";

		openCP(0);
	}
}

function closeCP(wR) {
		if(wR > 30) {
			wR-=30;
			document.getElementById('right').style.left=wR+'px';
			document.getElementById('left').style.left=(0-(parseInt(confmove[2])-wR))+'px';
			setTimeout(function () { closeCP(wR); },10);
		}
		else {
			document.getElementById('right').style.left='0px';
			document.getElementById('left').style.left=(0-parseInt(confmove[2]))+'px';
			cpout = 0;
			setMiscPref('cpanel','0')
		}
}
function openCP(wR) {
		if(wR < (parseInt(confmove[2]) - 30)) {
			wR+=30;
			document.getElementById('right').style.left=wR+'px';
			document.getElementById('left').style.left=(0-(parseInt(confmove[2])-wR))+'px';
			setTimeout(function () { openCP(wR); },10);
		}
		else {
			document.getElementById('right').style.left=confmove[2] + 'px';
			document.getElementById('left').style.left = '0px';
			cpout = 1;
			setMiscPref('cpanel','1')
		}
}

function cpFlatten(cpin) {
	var cpt = document.getElementById(cpin);
	if(cpt.style.display=='none') {
		cpt.style.display='block';
		setMiscPref(cpin,'1');
	}
	else {
		cpt.style.display='none';
		setMiscPref(cpin,'0');
	}
}

function toggleSearchOpts(a) {
	var sopts = document.getElementById(a);
	if(sopts.style.display=='block') {
		sopts.style.display='none';
	}
	else {
		sopts.style.display='block';
	}
}

function moves(a) // search open / close
{
	if (a == 1) { // open search
		document.getElementById('plus').innerHTML = '<input type="button" class="btn" class="btn" value="-" title="minimize search frame" onClick="moves(0)">';
		document.getElementById('search').style.display="block";
	}
	else { // close search
		document.getElementById('plus').innerHTML = '<input type="button" class="btn" class="btn" value="+" title="maximize search frame" onClick="moves(1)">';
		document.getElementById('search').style.display="none";
	}
}

function moveanf(which) {
return;
	document.getElementById('anf').style.height = confmove[0] + 'px';
	document.getElementById('anft').scrollTop = 0;
	if (which == 1) {
		//alert(document.getElementById('anfb').offsetHeight + ' ' + document.getElementById('anf').offsetHeight);
		var anfh = document.getElementById('anfb').offsetHeight+32;
		if (anfh > confmove[0]) document.getElementById('anf').style.height = (anfh) + 'px';
	}
}

function scrolldown(much)
{
	if (much == 'alert')
	{
		//alert('Scroll distance = ' + document.getElementById('maf').scrollTop);
		scrollmuch=document.getElementById('maf').scrollTop;
	}
	else document.getElementById('maf').scrollTop=much;
}

function getlink(which)
{
	var linkfile = which + '.htm';
	parent.mainFrame.location = linkfile;
	scrollmuch = bookmarklink[which-1];
}

function changelang(lang) {
	var langc = document.getElementById('lang').value;
	parent.mainFrame.yt = eval('parent.mainFrame.'+langc+'t');
}

function go_anchor(mydiv,n){
    document.getElementById(mydiv).scrollTop = document.getElementById(n).offsetTop;
}

function clearDivs(which) { // place divs to be cleared here
	if (!which || which.indexOf('dif') > -1) { // dictionary frame stuff
		document.getElementById('difb').innerHTML = '';
		document.getElementById('lt').innerHTML = '';
		document.getElementById('lb').innerHTML = '';
	}
	if (!which || which.indexOf('anf') > -1) { // analyze frame stuff
		document.getElementById('anfs').innerHTML='';
		document.getElementById('anfsd').innerHTML='';
		document.getElementById('anfb').innerHTML='<div align=left id="anfc"></div><div align=right id="anfd"></div>';
		moveframex(moveat);
	}
	if (!which || which.indexOf('maf') > -1) { // analyze frame stuff
		document.getElementById('mafbc').innerHTML='';
		document.getElementById('matrelc').innerHTML='';
	}
}

function scrollToId(a,b) {
	if(a=='search') a = 'sbfbc';
	if(a=='dif') a = 'cdif';
	document.getElementById(a).scrollTop=document.getElementById(b).offsetTop;
}
