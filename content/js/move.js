var moveat = 2;

function moveframex(a,temp) //read, etc
{
    if(!temp) getconfig();

	// adjust control panel based on cpout variable

    if(cfg['cpanel'] == '1') { document.getElementById('right').style.left = confmove[2] + 'px'; }
    else {document.getElementById('right').style.left = '0px'; }

    document.getElementById('left').style.width = confmove[2] + 'px';
    document.getElementById('anf').style.height = confmove[0] + 'px';
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
            document.getElementById('maf').style.bottom = (parseInt(confmove[0])+16) + 'px';
            document.getElementById('anf').style.bottom = '-4px';
            document.getElementById('anf').style.top = '';
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

            document.getElementById('maf').style.bottom = (parseInt(confmove[0]) + parseInt(confmove[1]) + 16) + 'px';
            document.getElementById('rightbot').style.bottom = '0px';
            document.getElementById('rightbot').style.height = parseInt(confmove[1]) + 'px';
            document.getElementById('anf').style.bottom = (parseInt(confmove[1])-4) + 'px';
            document.getElementById('anf').style.top = '';

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

            document.getElementById('rightbot').style.height = 'auto';
            document.getElementById('rightbot').style.top = (parseInt(confmove[0])+16) + 'px';
            document.getElementById('rightbot').style.bottom = '0px';
            

            
            document.getElementById('anf').style.top = '-1px';
            document.getElementById('anf').style.bottom = '';
            break;
    }
}

function moveframey(a) //dict, conv, or scratch
{
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

cpout = 1;


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
