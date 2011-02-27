function refreshit(which)
{
	document.getElementById('mafbc').innerHTML='<div id="mafrefresh" align=center><h1>Welcome&nbsp;to&nbsp;the&nbsp;Digital&nbsp;Pali&nbsp;Reader&nbsp;'+version+'</h1><p>To&nbsp;start,&nbsp;simply&nbsp;choose&nbsp;a&nbsp;book,&nbsp;section&nbsp;and&nbsp;passage&nbsp;on&nbsp;the&nbsp;right&nbsp;side&nbsp;of&nbsp;the&nbsp;screen.</p><p>For&nbsp;detailed&nbsp;instructions,&nbsp;click&nbsp;<b><a style="color:green" href="javascript:void(0)" onclick="helpXML()">here&nbsp;for&nbsp;the&nbsp;help&nbsp;page</a></b>.</p><p>For&nbsp;information&nbsp;on&nbsp;updates,&nbsp;visit&nbsp;<b><a style="color:green"href="http://pali.sirimangalo.org/" target="_blank" >the&nbsp;project&nbsp;site</a></b>.</p><p>If&nbsp;you&nbsp;have&nbsp;questions&nbsp;or&nbsp;feedback,&nbsp;you&nbsp;can&nbsp;try&nbsp;to&nbsp;contact&nbsp;me&nbsp;at&nbsp;<b><a style="color:green" href="mailto:yuttadhammo@gmail.com">yuttadhammo@gmail.com</a></b></p></div><div id="mafd" align=center></div><div id="mafe" align=center></div>';
	document.getElementById('mafrefresh').style.height = document.getElementById('mafrefresh').offsetHeight + 'px';
	document.getElementById('mafrefresh').style.marginTop = (document.getElementById('mafrefresh').offsetHeight/(-2)) + 'px';
	document.getElementById('mafrefresh').style.width = document.getElementById('mafrefresh').offsetWidth + 'px';
	document.getElementById('mafrefresh').style.marginLeft = (document.getElementById('mafrefresh').offsetWidth/(-2)) + 'px';
	//document.getElementById('mafrefresh').style.marginBottom = document.getElementById('mafrefresh').offsetHeight/(-2);
	bv();
    changenikaya(1);
    if (which == 1) { // coming from reset options.
		document.getElementById('mafe').innerHTML='<b style="color:'+colorcfg['colsel']+'">Options reset.</b>';
	}
}
