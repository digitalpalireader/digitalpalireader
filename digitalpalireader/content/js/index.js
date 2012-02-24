function onLoad() {
	giveIDtoTabs();
	var link = document.location.href.split('?')[1];
	var linkt = [];
	var linkb = [];
	if (link) {
		
		// get bottom stuff out first
		
		if(/analysis=/.test(link)) {
			linkb.push(/(analysis=[^&]+)/.exec(link)[0]);
		}
		if(/ped=/.test(link)) {
			linkb.push(/(ped=[^&]+)/.exec(link)[0]);
		}
		if(/dppn=/.test(link)) {
			linkb.push(/(dppn=[^&]+)/.exec(link)[0]);
		}
		if(/frombox=/.test(link)) {
			linkb.push(/(frombox=[^&]+)/.exec(link)[0]);
		}
		if(linkb.length)
			linkb = '?'+linkb.join('&');
		else 
			linkb = '';
			
		// now remove
				
		link = link.replace(/\&*(analysis|ped|dppn|frombox)=[^&]+/g,'').replace(/^\&/g,'');
		
		if(link) {
			linkt = link.split('|');
			for(var i = 0; i<linkt.length;i++) {
				createTopPanel('?'+linkt[i]);
			}
		}
		else
			createTopPanel('');
	}
	else
		createTopPanel('');
	
	// top
	
	document.getElementById('dpr-tops').getElementsByTagName('splitter')[0].setAttribute('collapsed','true');
	
	// bottom
	
	document.getElementById('dict').contentDocument.location.href = 'chrome://digitalpalireader/content/bottom.htm'+linkb;

	if(!linkb.length) {
		moveFrame(6);
	}
	
}
function getconfig() {
	var x = 1;
	while(document.getElementById('dpr-index-top-'+x)) {
		document.getElementById('dpr-index-top-'+(x++)).contentWindow.getconfig();
	}
	document.getElementById('dict').contentWindow.getconfig();
}

function citation(cite) {
	document.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.makeLinkPlace(cite,false);
}

function reindexPanels() {
	var tops = document.getElementById('dpr-tops').getElementsByTagName('browser');
	for(var x = 0;x< tops.length;x++) {
		tops[x].contentWindow.G_compare = x+1;
	}
}
function getBrowserCount() {
	var count = document.getElementById('dpr-tops').getElementsByTagName('browser').length;
	return count;
}
function createTopPanel(params) {
	var elem = document.getElementById('dpr-tops');
	if(/loc=/.test(params))
		var permalink = 'chrome://digitalpalireader/content/top.htm'+params;
	else if(/ati=/.test(params))
		var permalink = 'chrome://digitalpalireader/content/ati.xul'+params;
	else 
		var permalink = 'chrome://digitalpalireader/content/top.htm';

	var node = createBrowser(permalink);
	var splitter = document.createElement('splitter');

	elem.appendChild(splitter);
	elem.appendChild(node);
}
function createBrowser(url){
	var browser = document.createElement('browser');
	browser.setAttribute('disablehistory','true');
	browser.setAttribute('type','content');
	browser.setAttribute('src',url);
	browser.setAttribute('style','max-height:99%');
	browser.setAttribute('flex','1');
	browser.setAttribute('persist','height');
	//browser.setAttribute('id','dpr-index-top-'+count);
		
	return browser;
}
	
