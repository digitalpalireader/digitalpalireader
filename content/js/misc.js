var moveat = 2;

function moveframex(a) //read, etc
{
    getconfig();
    document.getElementById('left').style.right = (parseInt(confmove[2])-4) + 'px';
    document.getElementById('search').style.right = (parseInt(confmove[2])-4) + 'px';
    document.getElementById('right').style.width = confmove[2] + 'px';
    document.getElementById('anf').style.height = confmove[0] + 'px';
    document.getElementById('searcht').style.height = confmove[3] + 'px';
    moves(0);
    switch (a) {
        case 1: //read
			document.getElementById('RM').src="images/R1.jpg";
			document.getElementById('AM').src="images/A0.jpg";
			document.getElementById('DM').src="images/D0.jpg";
            moveat = 1;
            document.getElementById('maf').style.display = 'block';
            document.getElementById('leftbot').style.display = 'none';
            document.getElementById('maf').style.bottom = (parseInt(confmove[0])+16) + 'px';
            document.getElementById('anf').style.bottom = '-0px';
            document.getElementById('anf').style.top = '';
            break;
        case 2:  //normal view
			document.getElementById('RM').src="images/R0.jpg";
			document.getElementById('AM').src="images/A1.jpg";
			document.getElementById('DM').src="images/D0.jpg";
            moveat = 2;
            document.getElementById('maf').style.display = 'block';
            document.getElementById('leftbot').style.display = 'block';

            document.getElementById('maf').style.bottom = (parseInt(confmove[0]) + parseInt(confmove[1]) + 16) + 'px';
            document.getElementById('leftbot').style.bottom = '0px';
            document.getElementById('leftbot').style.height = confmove[1] + 'px';
            document.getElementById('anf').style.bottom = (parseInt(confmove[1])-4) + 'px';
            document.getElementById('anf').style.top = '';

            document.getElementById('leftbot').style.top = '';
            break;
        case 3: // dict
			document.getElementById('RM').src="images/R0.jpg";
			document.getElementById('AM').src="images/A0.jpg";
			document.getElementById('DM').src="images/D1.jpg";
            moveat = 3;
            moveframey('dif'); // switch to dict
            
            document.getElementById('maf').style.display = 'none';
            document.getElementById('leftbot').style.display = 'block';

            document.getElementById('leftbot').style.height = 'auto';
            document.getElementById('leftbot').style.top = (parseInt(confmove[0])+16) + 'px';
            document.getElementById('leftbot').style.bottom = '0px';
            

            
            document.getElementById('anf').style.top = '0px';
            document.getElementById('anf').style.bottom = '';
            break;
    }
}

function moveframey(a) //dict, conv, or scratch
{
	if (moveat == 1) moveframex(2);
	if (a=='dif') a = 'cdif';
    document.getElementById('cdif').style.display="none";
	document.getElementById('cof').style.display="none";
	document.getElementById('scf').style.display="none";
	document.getElementById(a).style.display="block";
}

function moveframet(a) // open close control panel
{
	if (a == 0) { // close
		document.getElementById('right').style.display="none";
		document.getElementById('left').style.right='0px';
	}
	else { // open
		document.getElementById('right').style.display='block';
		document.getElementById('left').style.right=confmove[2]+'px';	
	}
}

function moves(a) // search open
{
	if (a == 1) {
		moveframet(1);
		document.getElementById('plus').innerHTML = '<input type="button" class="btn" class="btn" value="-" title="minimize search frame" onClick="moves(0)">';
		document.getElementById('search').style.display="block";
	}
	else {
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
