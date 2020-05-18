async function bv(rnd,static) {
  let url = `${DPR_PAL.contentFolder}etc/dbv.xml`;
  const xmlDoc = await XML_Load.xhrGetAsync({ url }, xhr => xhr.responseXML.documentElement);

  var divs = xmlDoc.getElementsByTagName('div');
  if(static) {
    var no = rnd-1;
  }
  else if(rnd) {
    var no = Math.floor(Math.random()*divs.length);
  }
  else {
    var today = new Date();
    var first = new Date(today.getFullYear(), 0, 1);
    var theDay = Math.round(((today - first) / 1000 / 60 / 60 / 24) + .5, 0);
    var no = theDay-1;
  }

  var verse = divs[no];
  var head = verse.getElementsByTagName('h2')[0].textContent;
  var text = [];
  var cite = '';
  var link = '';
  var ps = verse.getElementsByTagName('p');
  for(var i in ps) {
    if (ps[i].className == 'text') {
      text.push(ps[i].innerHTML);
    }
    else if (ps[i].className == 'citation') {
      if(ps[i].getElementsByTagName('a')[0])
        link = ps[i].getElementsByTagName('a')[0].href;
      cite = ps[i].getElementsByTagName('a')[0].innerHTML;
    }
  }
  return [head,text,cite,link,no];
}

async function showBv(rnd) {
  var abv = await bv(rnd);
  var today = '';
  if(!rnd) {
    var date = new Date();
    var day = date.getDate().toString();
    switch (day.charAt(day.length-1)) {
      case '1':
        day+='st';
        break;
      case '2':
        day+='nd';
        break;
      case '3':
        day+='rd';
        break;
      default:
        day+='th';
        break;
    }
    var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December' ];
    var today = '<p style="font-style:italic" name="changecolor">'+monthNames[date.getMonth()] + ' ' + day+'</p>';
  }

  var rd = '<span style="padding:2px 10px;margin-bottom:2px;" title="get random quote" onclick="showBv(true)" class="green small pointer">Random</span>';
  var dd = '';
  if(rnd)
    dd = '<span style="padding:2px 10px;" title="get today\'s quote" onclick="showBv()" class="green small pointer">Today</span>';

  $('#bvb, #paliquote-dialog-content').html('<div style="position:absolute;top:5px;right:5px;">'+rd+dd+'</div>'+'<p><b class="text">'+(rnd?'Random':'Daily')+' Buddha Vacana</b></p>'+today+'<p name="changecolor">' + abv[1].join('</p><p name="changecolor">') + '</p>'+(abv[2] ? '<p>-- '+(abv[3]?'<span class="green pointer" onclick="citation(\''+abv[3].replace(/^[^?]+\?/,'')+'\',event); return false">' + abv[2] +'</span>':abv[2])+'</p>':''));
}

function citation(cite,event) {
  var paramsa = cite.split('&');
  var param = [];
  for(var i in paramsa) {
    var tp = paramsa[i].split('=');
    param[tp[0]] = tp[1];
  }
  var loc = param['loc'].split('.');
  for (var i = 1; i < loc.length -1;i++) {
    loc[i] = parseInt(loc[i]);
  }
  if (DPR_PAL.isWeb) {
    openPlace(loc,param['para'],null,eventSend(event));
  } else {
    mainWindow.gBrowser.selectedTab.linkedBrowser.contentDocument.getElementById('dpr-tops').getElementsByTagName('browser')[0].contentWindow.openPlace(loc,param['para'],null,eventSend(event));
  }

}

function bvAlert(bva) {
  var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
    .getService(Components.interfaces.nsIPromptService);

  var check = {value: false};  // default the checkbox to false

  var flags = prompts.BUTTON_POS_0 * prompts.BUTTON_TITLE_IS_STRING
    + prompts.BUTTON_POS_1 * prompts.BUTTON_TITLE_IS_STRING;

  var button = prompts.confirmEx(null, "Buddhavacana Passage #"+bva[4], bva[1].join('\n').replace(/<br[^>]*>/g,'').replace(/[\t ]+/g,' ').replace(/\n +\n/g,'\n')+'\n\n-- '+bva[2],
  flags, "Go", "Close", "", null, check);

  if(button == 0)
    openDPRTab(bva[3],"DPR-main",true);
}
