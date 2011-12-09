function refreshit()
{
	try {
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'news.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		var newsx = xmlDoc.getElementsByTagName('news');
		var news = [];
		for(i=0;i<5;i++) {
			if(!newsx[i])
				break;
			news.push(newsx[i].textContent);
		}
	}
	catch(ex) {
		var news = null;
	}
	document.getElementById('mafbc').innerHTML='<div id="mafrefresh" align=center><p class="huge" style="margin-bottom:10px;">Welcome&nbsp;to&nbsp;the&nbsp;Digital&nbsp;Pali&nbsp;Reader&nbsp;'+version+(news?' <a class="tiny" style="color:green" onclick="$(\'#newsc\').toggle(\'fast\')">NEW!</a><div class="tiny" id="newsc" style="margin:auto;text-align:left;display:none"><div align="center">What\'s&nbsp;new:</div><ul id="news"><li>'+news.join('</li><li>').replace(/ /g,'&nbsp;')+'</li></ul></div>':'')+'<p>To&nbsp;start,&nbsp;simply&nbsp;choose&nbsp;a&nbsp;set,&nbsp;book&nbsp;and&nbsp;section&nbsp;on&nbsp;the&nbsp;right&nbsp;side&nbsp;of&nbsp;the&nbsp;screen.</p><p>For&nbsp;detailed&nbsp;instructions,&nbsp;click&nbsp;<b><a style="color:green" href="javascript:void(0)" onclick="openDPRTab(\'chrome://digitalpalireader/content/help.htm\',\'DPR-help\',1);">here&nbsp;for&nbsp;the&nbsp;help&nbsp;page</a></b>.</p><p>For&nbsp;information&nbsp;on&nbsp;updates,&nbsp;visit&nbsp;<b><a style="color:green"href="http://pali.sirimangalo.org/" target="_blank" >the&nbsp;project&nbsp;site</a></b>.</p><p>If&nbsp;you&nbsp;have&nbsp;questions&nbsp;or&nbsp;feedback,&nbsp;please&nbsp;use&nbsp;<b><a style="color:green" href="javascript:" onclick="openDPRTab(\'chrome://digitalpalireader/content/contact.htm\',\'DPR-contact\',1);">the&nbsp;feedback&nbsp;form.</a></b></p></div><div id="mafd" align=center></div><div id="mafe" align=center></div>';
	document.getElementById('mafrefresh').style.height = document.getElementById('mafrefresh').offsetHeight + 'px';
	document.getElementById('mafrefresh').style.marginTop = (document.getElementById('mafrefresh').offsetHeight/(-2)) + 'px';
	document.getElementById('mafrefresh').style.width = document.getElementById('mafrefresh').offsetWidth + 'px';
	document.getElementById('mafrefresh').style.marginLeft = (document.getElementById('mafrefresh').offsetWidth/(-2)) + 'px';
	if($('#newsc').length) $('#newsc').css('width',Math.round(document.getElementById('mafrefresh').offsetWidth*2/3) + 'px');
	//document.getElementById('mafrefresh').style.marginBottom = document.getElementById('mafrefresh').offsetHeight/(-2);
    
}
