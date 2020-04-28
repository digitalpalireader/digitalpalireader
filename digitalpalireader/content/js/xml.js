'use strict';

var unnamed = '[unnamed]';

var matButton = 0; // tells us we've clicked an in-section mat button.
var matValue = []; // for storing values from section after clicking mat button in section
matValue['m'] = '';
matValue['a'] = '';
matValue['t'] = '';


var G_compare = 1;
var G_thisPara = null;

const emptyFnStr = `(() => {})()`;

function loadXMLSection(querystring,para,place,isPL,scroll,compare)
{
  __dprViewModel.showMainFeatures();

  G_thisPara = null;

  if(compare)
    G_compare = compare;
  else compare = G_compare;

  for(var i=1;i<7;i++) {
    if(place[i] == 'x') {
      return loadXMLindex(place);
    }
    else place[i] = parseInt(place[i]);
  }


  DPR_PAL.showLoadingMarquee();

  var nikaya = place[0];
  var book = place[1]+1;
  var hier=place[7];
  var nikbookhier = nikaya + book + hier;

    var xmlDoc = loadXMLFile(nikbookhier,place[8]?place[8]:0);


  if(xmlDoc == null) return refreshit();

  var bookno = place[1];
  var meta = place[2];
  var volume = place[3];
  var vagga = place[4];
  var sutta = place[5];
  var section = place[6]

  var t = xmlDoc.getElementsByTagName("ha");
  var u = t[0].getElementsByTagName("h0");
  var v = u[meta]?u[meta].getElementsByTagName("h1"):[];
  var w = v[volume]?v[volume].getElementsByTagName("h2"):[];
  var x = w[vagga]?w[vagga].getElementsByTagName("h3"):[];
  var y = x[sutta]?x[sutta].getElementsByTagName("h4"):[];
  var z = y[section]?y[section].getElementsByTagName("p"):[];

  var hierb = hier;

  // "modern" reference

  var modt = '';
  var modn;

  if(hier == 'm') {
    var modno = getSuttaNumber(nikaya,bookno,meta,volume,vagga,sutta,section,hier,y.length);
    var modt =   (modno ? ' (<b class="small" style="color:'+DPR_prefs['colsel']+'">' + G_nikLongName[nikaya] + (hier == 'm' ? '' : '-'+hier) + '&nbsp;' + modno + '</b>)' : '');
  }


// titles

  var un = t[0].getElementsByTagName("han");
  var vn = u[meta].getElementsByTagName("h0n");
  var wn = v[volume].getElementsByTagName("h1n");
  var xn = w[vagga].getElementsByTagName("h2n");
  var yn = x[sutta].getElementsByTagName("h3n");
  var zn = y[section].getElementsByTagName("h4n");
  var una = (un[0].childNodes[0] ? un[0].textContent : ' ');
  var vna = (vn[0].childNodes[0] ? vn[0].textContent : ' ');
  var wna = (wn[0].childNodes[0] ? wn[0].textContent : ' ');
  var xna = (xn[0].childNodes[0] ? xn[0].textContent : ' ');
  var yna = (yn[0].childNodes[0] ? yn[0].textContent : ' ');
  var zna = (zn[0].childNodes[0] ? zn[0].textContent : ' ');

// permalink

  var bareurl = DPR_PAL.normalizeDprUri('dpr:index?');
  var permalink = `${bareurl}loc=${nikaya}.${bookno}.${meta}.${volume}.${vagga}.${sutta}.${section}.${hier}`;

  // get string from query

  if(querystring) {
    if(typeof(querystring) == 'object'){}
    else if(/^\/.+\/$/.test(querystring)) {
      var queryt = querystring.substring(1,querystring.length-1).split('+');
      var query = [];
      for(var i in queryt) {
        query[i] = new RegExp(queryt[i].replace(/\\/g,'\\'));
      }
    }
    else
      var query = toUni(querystring).split('+');
  }

  var oldurl = DPR_PAL.contentDocument.location.href;

  var newparams = 'loc='+nikaya+'.'+bookno+'.'+meta+'.'+volume+'.'+vagga+'.'+sutta+'.'+section+'.'+hier;

  if(querystring) {
    newparams += '&query='+querystring;
  }
  if(para)
    newparams += '&para='+para;

  if(scroll)
    newparams += '&scroll='+scroll;

  if(place[8])
    newparams += '&alt=1';

  bareurl += newparams;

  var oldparams = oldurl.split('?')[1];
  if(oldparams) {

    // remove bottom stuff

    var bparams = [];
    if(/analysis=[^&]/.test(oldparams)) {
      bparams.push(/(analysis=[^&]+)/.exec(oldparams)[0]);
    }
    if(/ped=[^&]/.test(oldparams)) {
      bparams.push(/(ped=[^&]+)/.exec(oldparams)[0]);
    }
    if(/dppn=[^&]/.test(oldparams)) {
      bparams.push(/(dppn=[^&]+)/.exec(oldparams)[0]);
    }
    if(/frombox=[^&]/.test(oldparams)) {
      bparams.push(/(frombox=[^&]+)/.exec(oldparams)[0]);
    }
    if(bparams.length)
      bparams = '&'+bparams.join('&');
    else
      bparams = '';

    oldparams = oldparams.replace(/\&*(analysis|ped|dppn|frombox)=[^&]+/g,'').replace(/^\&/g,'');

    oldparams = oldparams.split('|');
    oldparams[compare-1] = newparams;
    newparams = oldparams.join('|')+bparams;
  }

  var newurl = `${DPR_PAL.dprHomePage}?${newparams}`;
  if (oldurl != newurl){
    DPR_PAL.contentWindow.history.pushState({}, 'Title', newurl);
  }

  var titleout = convtitle(nikaya,book,una,vna,wna,xna,yna,zna,hier,null,'DPR_PAL.contentDocument.location.href=\''+bareurl+'\'');

// tab title

  if (zna.length > 1) { var bknameme = zna }
  else if (yna.length > 1) { var bknameme  = yna }
  else if (xna.length > 1) { var bknameme  = xna }
  else if (wna.length > 1) { var bknameme  = wna }
  else if (vna.length > 1) { var bknameme  = vna }
  else var bknameme = '';

  bknameme = bknameme.replace(/^ +/, '').replace(/ +$/, '');

  var tabT = 'Pali: ' + G_nikLongName[nikaya] +  (modno ? ' ' + modno : (hierb !='m' ? '-'+hierb:'') + ' ' + (bookno+1)) + ' - ' + bknameme  + '';
  setCurrentTitle(tabT);

  const shortcutFns = createShortcutFns();

// toolbars

  // relative mat

  addJS(['relmul','relatt','reltik']);

  var matButtonCount = 0;
  if (matButton == 1) {  // mat button pushed already, remember the place
    matButtonCount = '1';
    matButton = 0;
  }
  else {
    matValue['m'] = '';
    matValue['a'] = '';
    matValue['t'] = '';
  }
  var relout = '<input type="hidden" id="matButtonCount" value="'+matButtonCount+'">';
  var relouta = [];
  var relwhere = [nikaya+"^"+bookno+"^"+meta+"^"+volume+"^"+vagga+"^"+sutta+"^"+section,
  nikaya+"^"+bookno+"^"+meta+"^"+volume+"^"+vagga+"^"+sutta+"^*",
  nikaya+"^"+bookno+"^"+meta+"^"+volume+"^"+vagga+"^*^*",
  nikaya+"^"+bookno+"^"+meta+"^"+volume+"^*^*^*",
  nikaya+"^"+bookno+"^"+meta+"^*^*^*^*",
  nikaya+"^"+bookno+"^*^*^*^*^*"];
  for (var i in relwhere) {
    var relhere;

    switch(hier) {
      case "m":
        relhere = relm[relwhere[i]];
        break;
      case "a":
        relhere = rela[relwhere[i]];
        break;
      case "t":
        relhere = relt[relwhere[i]];
        break;
    }
    if (relhere) {
      var hi = ['m','a','t'];
      var button_order = ['l','m','r'];
      const cmds = {
        ['m']: DPR_CMD_GOTO_RELM,
        ['a']: DPR_CMD_GOTO_RELA,
        ['t']: DPR_CMD_GOTO_RELT,
      };
      var hic = 0;
      for (var ht = 0; ht < hi.length; ht++) {
        if(hi[ht] == hier) {
          shortcutFns[cmds[hi[ht]]] = {
            canExecuteStr: 'false',
            executeStr: emptyFnStr,
            titleStr: `Currently viewing section in ${G_hTitles[ht]}`,
            visibleStr: 'true',
          };
        } else if (relhere.split('#')[hic] != '') {
          var relherea = relhere.split('#')[hic++].replace(/\*/g,'0').split('^');
          shortcutFns[cmds[hi[ht]]] = {
            canExecuteStr: 'true',
            executeStr: `openPlace(['${relherea[0]}', ${relherea[1]}, ${relherea[2]}, ${relherea[3]}, ${relherea[4]}, ${relherea[5]}, ${relherea[6]}, '${hi[ht]}'], null, null, eventSend(event, 1))`,
            titleStr: null,
            visibleStr: 'true',
          };
          matButton = 0;
        }
        else {
          shortcutFns[cmds[hi[ht]]] = {
            canExecuteStr: 'false',
            executeStr: emptyFnStr,
            titleStr: `No relative section in ${G_hTitles[ht]}`,
            visibleStr: 'true',
          };
        }
      }
      break;
    }
  }

  relout += relouta.join('');

  // prev and next
  var prev, next;

  if(section > 0) {
  }
  else if(sutta > 0) var ym = x[sutta-1].getElementsByTagName("h4");
  else if(vagga > 0) {
    var xm = w[vagga-1].getElementsByTagName("h3");
    var ym = xm[xm.length-1].getElementsByTagName("h4");
  }
  else if(volume > 0)  {
    var wm = v[volume-1].getElementsByTagName("h2");
    var xm = wm[wm.length-1].getElementsByTagName("h3");
    var ym = xm[xm.length-1].getElementsByTagName("h4");
  }
  else if(meta > 0) {
    var vm = u[meta-1].getElementsByTagName("h1");
    var wm = vm[vm.length-1].getElementsByTagName("h2");
    var xm = wm[wm.length-1].getElementsByTagName("h3");
    var ym = xm[xm.length-1].getElementsByTagName("h4");
  }
  else var prevnext = false;

  switch(true) {
    case (prevnext == false):
    break;
    case (section > 0):
      prev = [nikaya,bookno,meta,volume,vagga,sutta,section-1,hier];
    break;
    case (sutta > 0):
      prev = [nikaya,bookno,meta,volume,vagga,sutta-1,ym.length-1,hier];
    break;
    case (vagga > 0):
      prev = [nikaya,bookno,meta,volume,vagga-1,xm.length-1,ym.length-1,hier];
    break;
    case (volume > 0):
      prev = [nikaya,bookno,meta,volume-1,wm.length-1,xm.length-1,ym.length-1,hier];
    break;
    case (meta > 0):
      prev = [nikaya,bookno,meta-1,vm.length-1,wm.length-1,xm.length-1,ym.length-1,hier];
    break;
  }

  switch(true) {
    case (section < y.length-1):
      next = [nikaya,bookno,meta,volume,vagga,sutta,section+1,hier];
    break;
    case (sutta < x.length-1):
      next = [nikaya,bookno,meta,volume,vagga,sutta+1,0,hier];
    break;
    case (vagga < w.length-1):
      next = [nikaya,bookno,meta,volume,vagga+1,0,0,hier];
    break;
    case (volume < v.length-1):
      next = [nikaya,bookno,meta,volume+1,0,0,0,hier];
    break;
    case (meta < u.length-1):
      next = [nikaya,bookno,meta+1,0,0,0,0,hier];
    break;
  }

  // Configure commands
  shortcutFns[DPR_CMD_GOTO_PREV] = {
    canExecuteStr: !!prev ? 'true' : 'false',
    executeStr: !!prev ? `openPlace(['${prev.join("', '")}'${(place[8] ? ', 1' : '')}], null, null, eventSend(event, 1))` : emptyFnStr,
    titleStr: !!prev ? null : 'No previous section',
    visibleStr: 'true',
  };

  shortcutFns[DPR_CMD_GOTO_INDEX] = {
    canExecuteStr: 'true',
    executeStr: `openXMLindex('${nikaya}', ${bookno}, '${hier}', eventSend(event, 1))`,
    titleStr: null,
    visibleStr: 'true',
  };

  shortcutFns[DPR_CMD_GOTO_NEXT] = {
    canExecuteStr: !!next ? 'true' : 'false',
    executeStr: !!next ? `openPlace(['${next.join("', '")}' ${(place[8] ? ', 1' : '')}], null, null, eventSend(event, 1))` : emptyFnStr,
    titleStr: !!next ? null : 'No next section',
    visibleStr: 'true',
  };

  shortcutFns[DPR_CMD_GOTO_MYANMAR] = {
    canExecuteStr: !!place[8] ? 'true' : 'false',
    executeStr: !!place[8] ? `openPlace(['${nikaya}', ${bookno}, ${meta}, ${volume}, ${vagga}, ${sutta}, ${section}, '${hier}'], null, null, eventSend(event, 1))` : emptyFnStr,
    titleStr: !!place[8] ? null : 'Currently viewing Myanmar Tipitaka',
    visibleStr: 'true',
  };

  shortcutFns[DPR_CMD_GOTO_THAI] = {
    canExecuteStr: !place[8] ? 'true' : 'false',
    executeStr: !place[8] ? `openPlace(['${nikaya}', ${bookno}, ${meta}, ${volume}, ${vagga}, ${sutta}, ${section}, '${hier}', 1], null, null, eventSend(event, 1))` : emptyFnStr,
    titleStr: !place[8] ? null : 'Currently viewing Thai Tipitaka',
    visibleStr: 'true',
  };

  shortcutFns[DPR_CMD_COPY_PERMALINK] = {
    canExecuteStr: DPR_prefs['showPermalinks'] ? 'true' : 'false',
    executeStr: DPR_prefs['showPermalinks'] ? `permalinkClick('${permalink}${(querystring ? `&query=` + querystring : '')}${(place[8] ? `&alt=1` : '')}', null)` : emptyFnStr,
    titleStr: null,
    visibleStr: DPR_prefs['showPermalinks'] ? 'true' : 'false',
  };

  shortcutFns[DPR_CMD_BOOKMARK_SECTION] = {
    canExecuteStr: 'true',
    executeStr: `bookmarkSavePrompt('${nikaya}#${bookno}#${meta}#${volume}#${vagga}#${sutta}#${section}#${hier}', '${bknameme}', window.getSelection().toString())`,
    titleStr: null,
    visibleStr: 'true',
  };

  shortcutFns[DPR_CMD_COPY_PLACE_TO_SIDEBAR] = {
    canExecuteStr: 'true',
    executeStr: `sendPlace(['${nikaya}', ${bookno}, ${meta}, ${volume}, ${vagga}, ${sutta}, ${section}, '${hier}'])`,
    titleStr: null,
    visibleStr: 'true',
  };

  const nextprev = '';
  const thaibut = '';
  var bkbut = '';

  // first toolbar row
  var main = '';
  var aux = '<table><tr><td>'+ nextprev + ' ' + relout + ' ' + bkbut + thaibut + '</td><td id="maftrans" align="right"></td></tr><table>';

  // paragraph range
  if(para) {
    para = para.toString().replace(/[^-0-9]/g,'');

    if(/-/.test(para)) {
      var range = para.split('-');
    }
    else {
      var opara = parseInt(para);
      G_thisPara = opara;
    }
  }

// output header

  initializeMainPaneOutput();
  writeNavigationHeaderForSection(titleout[0], modt, range, place[8]);

  $('#mafbc').append('<div id="savetitle">'+G_nikLongName[nikaya] +  (modno ? ' '+modno : (hierb !='m' ? '-'+hierb:'') + ' ' + (bookno+1)) + ' - ' + bknameme  +'</div>');

  $('#mafbc').append('<div id="savei">'+titleout[1]+'</div>');

// output body

  var theData = '';
  // check if there is a search going on and add the labels
  if (query) {
    atlabel:
    for (var tmp = (range?range[0]-1:0); tmp < (range?range[1]:z.length); tmp++)
    {
      var ptype = /^ *\[[0-9]+\] */.exec(z[tmp].textContent);

      var quit = 0;
      var onepar = z[tmp].textContent.replace(/^ *\[[0-9]+\] */,'').replace(/  +/g, ' ');
      if(DPR_prefs['nigahita']) {
        onepar = onepar.replace(/ṃ/g, 'ṁ');
        onepar = onepar.replace(/Ṃ/g, 'Ṁ');
      }
      var onepars = onepar.replace(/ *\{[^}]*\} */g, ' ').replace(/\^a\^[^^]*\^ea\^/g, '').replace(/\^e*b\^/g, '').replace(/  +/g, ' ').toLowerCase();
      for (var tmpl = 0; tmpl < query.length; tmpl++)
      {
        var obj = (typeof(query[tmpl]) == 'object');
        if ((obj ? onepars.search(query[tmpl]) : onepars.indexOf(query[tmpl])) == -1) { // at least one of the strings was not found -> no match
          theData += ' <p|'+(ptype?ptype[0].replace(/[\[\] ]/g,''):'')+'|'+permalink+'&para='+(tmp+1)+'&query='+querystring.replace(/ /g,'_')+'|> ' + onepar;
          //alert(theData);
          continue atlabel;
        }
      }
      theData += ' <p|'+(ptype?ptype[0].replace(/[\[\] ]/g,''):'')+'|'+permalink+'&para='+(tmp+1)+'&query='+querystring.replace(/ /g,'_')+'|> ';
      var tmpdata = onepar;
      for (var i = 0; i < query.length; i++)
      {
        var obj = (typeof(query[i]) == 'object');
        var lt = query[i];
        var ltrg = (obj ? lt : new RegExp(lt, 'g'));
        if (!lt) continue;
        onepar = tmpdata;
        onepars = onepar.replace(/ *\{[^}]*\}/g, '').replace(/\^a\^[^^]*\^ea\^/g, '').replace(/\^e*b\^/g, '').replace(/   */g, ' ');
        tmpdata = '';
        while ((obj ? onepars.search(lt) : onepars.indexOf(lt)) > -1) {
          var matched = (obj ? onepars.match(lt)[0] : lt);
          var matchat = (obj ? onepars.search(lt) : onepars.indexOf(lt));
          if(!onepar.match(ltrg) || (onepars.match(ltrg).length != onepar.match(ltrg).length && (obj ? onepar.search(lt) : onepar.indexOf(lt)) != matchat)) { // something in the way
            var opp = onepar.search(/[{^]/);
            if(opp <= matchat) { // something before the match
              tmpdata += onepar.substring(0,opp+1); // add before thing and first part of thing
              onepar = onepar.substring(opp+1);
              tmpdata += onepar.substring(0,onepar.search(/[}^]/)+1); // add rest of thing
              onepar = onepar.substring(onepar.search(/[}^]/)+1); // after rest of thing
            }
            else { // something inside, maybe two...
              tmpdata += onepar.substring(0,matchat); // add before start of match

              onepar = onepar.substring(matchat); // from start of match on

              var lss = lt.split(' ').length;
              var ops = onepar.replace(/ *\{[^}]*\}/g,'x').replace(/\^e*b\^/g,'x').replace(/ *\^a\^[^^]*\^ea\^/g, 'x').replace(/   */g, ' ').split(' ',lss).join(' '); // same number of words, this one has x's
              var opsm = ops.match(/x/g);
              var xlt = lt;
              var getit;
              for (var j = 0; j < opsm.length; j++) {
                var getit1 = onepar.search(/\{/);
                var getit2 = onepar.search(/\^/);
                if(getit1 < 0) getit = onepar.match(/( *\^a\^[^^]*\^ea\^|\^e*b\^)/)[0];
                else if (getit2 < 0) getit = onepar.match(/ *\{[^}]*\} */)[0];
                else getit = (getit1 < getit2 ? onepar.match(/ *\{[^}]*\} */)[0] : onepar.match(/( *\^a\^[^^]*\^ea\^|\^e*b\^)/)[0]);
                tmpdata += '<c' + i  + '>' + onepar.substring(0,(xlt.length < ops.indexOf('x') ? xlt.length : ops.indexOf('x'))).replace(/ /g,'<xc> <c' + i  + '>') + '<xc>' + (xlt.length < ops.indexOf('x') ? onepar.substring(xlt.length,ops.indexOf('x')) : '') + getit;
                onepar = onepar.substring(ops.indexOf('x')+getit.length);
                xlt = (xlt.substring(ops.indexOf('x')).length > 0 ? xlt.substring(ops.indexOf('x')) : '');
                ops = ops.substring(ops.indexOf('x')+1);
              }
              tmpdata += (xlt.length > 0 ? '<c' + i  + '>' + xlt.replace(/ /g,'<xc> <c' + i  + '>') + '<xc>' : '') + ops.substring(xlt.length) + ' ';

              onepar = onepar.substring(ops.length); // after last x
            }
          }
          else { // nothing blocking
            matchat = obj ? onepar.search(lt) : onepar.indexOf(lt);
            tmpdata += onepar.substring(0,matchat);
            tmpdata += '<c' + i  + '>' + matched.replace(/  */g, '<xc> <c' + i  + '>') + '<xc>';
            onepar = onepar.substring(matchat + matched.length);
          }
          onepars = onepar.replace(/ *\{[^}]*\}/g, '').replace(/\^a\^[^^]*\^ea\^/g, '').replace(/\^e*b\^/g, '').replace(/   */g, ' ');
        }
        tmpdata += onepar;
      }

      theData += tmpdata;
    }
  }
  else {
    if(place[8]) { // thai
      for (var tmp = (range?range[0]-1:0); tmp < (range?range[1]:z.length); tmp++) {
        if(/^-- \^a\^Thai [0-9.]+\^ea\^ --$/.test(z[tmp].textContent) && !DPR_prefs['showPages']) {
          continue;
        }
        theData += ' <p> ' + z[tmp].textContent.replace(/^#[0-9]+#/,'').replace(/  +/g, ' ');
      }
    }
    else {
      for (var tmp = (range?range[0]-1:0); tmp < (range?range[1]:z.length); tmp++) {
        var ptype = /^ *\[[0-9]+\] */.exec(z[tmp].textContent);
        theData += ' <p|'+(ptype?ptype[0].replace(/[\[\] ]/g,''):'')+'|'+permalink+'&para='+(tmp+1)+'|> ' + z[tmp].textContent.replace(/^ *\[[0-9]+\] */,'').replace(/  +/g, ' ');
      }
    }
  }

  var outData = outputFormattedData(theData,0,place,shortcutFns);
  resolveCommands(shortcutFns);
  makeToolbox(shortcutFns, main,aux,titleout[2],true,true,true);

  if(opara) {
    scrollMainPane(document.getElementById('para'+opara).offsetTop - $("#main-content-header").outerHeight());
  }
  else if(scroll) {
    scrollMainPane(scroll - $("#main-content-header").outerHeight());
  }

// add to history

  addHistory(G_nikLongName[nikaya]+(hierb!='m'?'-'+hierb:'')+' '+book+' - '+bknameme+"@"+nikaya+','+bookno+','+meta+','+volume+','+vagga+','+sutta+','+section+','+hierb);

  // refresh history box

  var sidebar = DPRSidebarWindow();

  if (sidebar) {
    sidebar.DPRNav.historyBox();
  }
}

const getTitleStr = (id, cmdCfg) =>
  cmdCfg.titleStr ? cmdCfg.titleStr : __dprCommandsMap[id].title;

const getCmdIcon = (cmdCfg) =>
  cmdCfg.icon ? `'${cmdCfg.icon}'` : null;

const resolveCommand = (id, cmdCfg) => `
  __dprViewModel.updateCommand(
    '${id}',
    {
      canExecute: ${cmdCfg.canExecuteStr},
      execute: () => ${cmdCfg.executeStr},
      visible: ${cmdCfg.visibleStr},
      title: '${getTitleStr(id, cmdCfg)}',
      icon: ${getCmdIcon(cmdCfg)},
    });
`;

function resolveCommands(shortcutFns) {
  const cmdCfgs = Object.entries(shortcutFns).filter(x => x[1].executeStr).map(x => resolveCommand(x[0], x[1]));
  const scriptStr = `
<script data-type="XMLJS">
  /* Inserted by XML.JS */
  ${cmdCfgs.join('')}
</script>
  `;

  $('script[data-type="XMLJS"]').remove();
  $("body").append(scriptStr);
}

function loadXMLindex(place,compare) {
  __dprViewModel.showMainFeatures();

  var isDev = false; // dev tool
  var DshowH = false; // dev tool
  //var devCheck = 1; // dev tool

  if(compare)
    G_compare = compare;
  else
    compare = G_compare;

  var isPlace = place.length > 3?true:false;

  var x0 = !isPlace?'x':0;
  var x1 = !isPlace?"'x'":0;

  var convout = '';
  var saveout = '';
  var headcount = 1;

  document.activeElement.blur();

  var hier = isPlace?place[7]:place[2];
  if(isPlace && place[8] == 'd') {
    isDev = true;
    var xset = 0;
  }
  else
    var xset = isPlace?(place[8]?place[8]:0):0;

  DPR_PAL.showLoadingMarquee();

  var nikaya = place[0];
  var bookno = parseInt(place[1]);
  var book = bookno+1;
  var nikbookhier = nikaya + book + hier;

    var xmlDoc = loadXMLFile(nikbookhier,xset);

  var z = xmlDoc.getElementsByTagName("ha");
  var y = '';
  var x = '';
  var w = '';
  var v = '';
  var u = '';

  var tt, dEI,namen;

  var theData = "";
  var theDatao = '';
  var tmpData = '';

  bookfile = nikaya + book;

  var tmp = 0;
  var tmp1 = 0;
  var tmp2 = 0;
  var tmp3 = 0;
  var tmp4 = 0;
  var tmp5 = 0;
  var tmp6 = 0;

  var col = ['coltext','colsel','colped','coldppn','colcpd'];
  var whichcol = [0,0,0,0,0];
  var wcs = 0;

  // counting for links
  var whichheir = [0,0,0,0,0];
  var saveheader = '';
  var lowest = 0;

  if (z[tmp].getElementsByTagName("han")[0].childNodes[0]) {
    theData = z[tmp].getElementsByTagName("han")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,'');
  }
  else theData = '';
  if (z.length > 1 && theData == '') { theData = unnamed; }

  if (theData != '') {

    namen = '';
    if (DPR_prefs['showNames']) {
      // dppn title 'n'

      tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
      if(tt.length > 1) {
        dEI = getDppnEntry(tt);
        if (dEI.length > 0) {
          namen = getNameHTML(dEI,tt);
        }
      }
    }

    // permalink

    var permalink = `${DPR_PAL.dprHomePage}?`;

    var oldurl = DPR_PAL.contentDocument.location.href;

    var bareurl = DPR_PAL.normalizeDprUri('dpr:index?');

    var newparams = 'loc='+place.slice(0,8).join('.');

    bareurl += newparams;

    var oldparams = oldurl.split('?')[1];
    if(oldparams) {
      oldparams = oldparams.split('|');
      oldparams[compare-1] = newparams;
      newparams = oldparams.join('|');
    }
    var newurl = `${DPR_PAL.dprHomePage}?${newparams}`;

    if (oldurl != newurl){
      DPR_PAL.contentWindow.history.pushState({}, 'Title', newurl);
    }

    whichcol[0] = 1; // bump up to let the second color know

    theDatao += (devCheck == 1 && DshowH ? '[a]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+x0+'.'+x0+'.'+x0+'.'+x0+'.'+x0+'.'+hier+'\');" title="Click to copy permalink to clipboard">&diams;&nbsp;</span>&nbsp;' :'')+'<span onmouseup="openPlace([\''+nikaya+'\','+bookno+','+x1+','+x1+','+x1+','+x1+','+x1+',\''+hier+'\'],null,null,eventSend(event,1));" class="pointer'+(isPlace?' placeIndex':'')+' index1" style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</span>'+namen;

    // translations

    transin = DPR_Translations.addtrans(hier,6,nikaya,bookno);
    if (transin) {
      theDatao += transin.join('&nbsp;');
    }

    theDatao += '<br />';

    if (lowest < wcs)
      lowest = wcs;

    saveout += '<h'+(wcs+1)+'><a name="ab" href="#a">'+translit(toUni(theData))+'</a></h'+(wcs+1)+'>';
    saveheader += '<c'+(wcs+1)+'><a name="a" href="#ab">'+translit(toUni(theData))+'</a></c'+(wcs+1)+'>';

  }
  y = z[tmp].getElementsByTagName("h0");
  for (var tmp2 = 0; tmp2 < y.length; tmp2++) // meta
  {
    if(isPlace && place[2] != 'x' && tmp2 != place[2])
      continue;

    if (y[tmp2].getElementsByTagName("h0n")[0].childNodes[0]) theData = y[tmp2].getElementsByTagName("h0n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
    if (y.length > 1 && theData == '') { theData = unnamed; }
    if (theData != '') {
      namen = '';
      if (DPR_prefs['showNames']) {

        // dppn title 'n'

        tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
        if(tt.length > 1) {
          dEI = getDppnEntry(tt);
          if (dEI.length > 0) {
            namen = getNameHTML(dEI,tt);
          }
        }
      }

      wcs = whichcol[0]; // either 0 or 1
      whichcol[1] = 1; // bump up for the next color, if no data, this will still be 0, next color will get 0
      var spaces = '';
      for(var f = 0; f < wcs; f++) {
        spaces += '&nbsp;&nbsp;';
      }

      theDatao += spaces+(devCheck == 1 && DshowH ? '[0]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+x0+'.'+x0+'.'+x0+'.'+x0+'.'+hier+'\');" title="Click to copy permalink to clipboard">&diams;&nbsp;</span>&nbsp;' :'')+'<span onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+x1+','+x1+','+x1+','+x1+',\''+hier+'\'],null,null,eventSend(event,1));" class="pointer'+(isPlace?' placeIndex':'')+' index2" style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</span>'+namen;

      // translations

      var transin;
      var transout='';

      transin = DPR_Translations.addtrans(hier,5,nikaya,bookno,tmp2);
      if (transin) {
        theDatao += transin.join('&nbsp;');
      }
      theDatao += '<br />';

      whichheir[0] = tmp2+1;
      var whs = whichheir[0];

      if (lowest < wcs)
        lowest = wcs;

      saveout += '<h'+(wcs+1)+'><a name="'+whs+'b" href="#'+whs+'">'+translit(toUni(theData))+'</a></h'+(wcs+1)+'>';
      saveheader += '<c'+(wcs+1)+'><a name="'+whs+'" href="#'+whs+'b">'+translit(toUni(theData))+'</a></c'+(wcs+1)+'>';


    }
    x = y[tmp2].getElementsByTagName("h1");
    for (var tmp3 = 0; tmp3 < x.length; tmp3++) // volume
    {
      if(isPlace && place[3] != 'x' && tmp3 != place[3])
        continue;
      if (x[tmp3].getElementsByTagName("h1n")[0].childNodes[0]) theData = x[tmp3].getElementsByTagName("h1n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
      if (x.length > 1 && theData == '') { theData = unnamed; }
      if (theData != '') {

        namen = '';
        if (DPR_prefs['showNames']) {

          // dppn title 'n'

          tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
          if(tt.length > 1) {
            dEI = getDppnEntry(tt);
            if (dEI.length > 0) {
              namen = getNameHTML(dEI,tt);
            }
          }
        }

        wcs = whichcol[0] + whichcol[1]; // 0, 1 or 2 - if 0,1 are still 0, this will get 0
        whichcol[2] = 1; // bump up for the next color, if no data, this will still be -1, next color will get 0

        spaces = '';
        for(var f = 0; f < wcs; f++) {
          spaces += '&nbsp;&nbsp;';
        }

        theDatao += spaces+(devCheck == 1 && DshowH ? '[1]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+x0+'.'+x0+'.'+x0+'.'+hier+'\');" title="Click to copy permalink to clipboard">&diams;&nbsp;</span>&nbsp;' :'')+'<span onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+x1+','+x1+','+x1+',\''+hier+'\'],null,null,eventSend(event,1));" class="pointer'+(isPlace?' placeIndex':'')+' index3" style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + '</span>'+namen;

        // translations

        var transin;
        var transout='';

        transin = DPR_Translations.addtrans(hier,4,nikaya,bookno,tmp2,tmp3);
        if (transin) {
          theDatao += transin.join('&nbsp;');
        }

        theDatao += '<br />';

        whichheir[1] = tmp3+1;
        var whs = whichheir[0]+'.'+whichheir[1];

        if (lowest < wcs)
          lowest = wcs;

        saveout += '<h'+(wcs+1)+'><a name="'+whs+'b" href="#'+whs+'">'+translit(toUni(theData))+'</a></h'+(wcs+1)+'>';
        saveheader += '<c'+(wcs+1)+'><a name="'+whs+'" href="#'+whs+'b">'+translit(toUni(theData))+'</a></c'+(wcs+1)+'>';

      }
      w = x[tmp3].getElementsByTagName("h2");
      for (var tmp4 = 0; tmp4 < w.length; tmp4++) // vagga
      {
        if(isPlace && place[4] != 'x' && tmp4 != place[4])
          continue;
        if (w[tmp4].getElementsByTagName("h2n")[0].childNodes[0]) theData = w[tmp4].getElementsByTagName("h2n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
        if (w.length > 1 && theData == '') { theData = unnamed; }
        if (theData != '') {


          namen = '';
          if (DPR_prefs['showNames']) {
            // dppn title 'n'

            tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
            if(tt.length > 1) {
              dEI = getDppnEntry(tt);
              if (dEI.length > 0) {
                namen = getNameHTML(dEI,tt);
              }
            }
          }



          wcs = whichcol[0] + whichcol[1] + whichcol[2]; // 0, 1, 2, or 3
          whichcol[3] = 1; // bump

          spaces = '';
          for(var f = 0; f < wcs; f++) {
            spaces += '&nbsp;&nbsp;';
          }

          var suno = getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,0,0,hier,0,4);  // short reference


          theDatao += spaces+(devCheck == 1 && DshowH ? '[2]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+x0+'.'+x0+'.'+hier+'\');" title="Click to copy permalink to clipboard">&diams;&nbsp;</span>&nbsp;' :'')+'<span onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+x1+','+x1+',\''+hier+'\'],null,null,eventSend(event,1));" class="pointer '+(isPlace?' placeIndex':'')+' index4" style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData))+(suno?'&nbsp;<d class="small">('+G_nikLongName[nikaya]+'&nbsp;'+suno + ')</d>' : '') + '</span>'+namen;

          // translations

          var transin;
          var transout='';

          transin = DPR_Translations.addtrans(hier,3,nikaya,bookno,tmp2,tmp3,tmp4);
          if (transin) {
            theDatao += transin.join('&nbsp;');
          }

          theDatao += '<br />';

          whichheir[2] = tmp4+1;
          var whs = whichheir[0]+'.'+whichheir[1]+'.'+whichheir[2];

          if (lowest < wcs)
            lowest = wcs;

          saveout += '<h'+(wcs+1)+'><a name="'+whs+'b" href="#'+whs+'">'+translit(toUni(theData))+'</a></h'+(wcs+1)+'>';
          saveheader += '<c'+(wcs+1)+'><a name="'+whs+'" href="#'+whs+'b">'+translit(toUni(theData))+'</a></c'+(wcs+1)+'>';
        }
        v = w[tmp4].getElementsByTagName("h3");
        for (var tmp5 = 0; tmp5 < v.length; tmp5++) // sutta
        {
          if(isPlace && place[5] != 'x' && tmp5 != place[5])
            continue;
          if (v[tmp5].getElementsByTagName("h3n")[0].childNodes[0]) theData = v[tmp5].getElementsByTagName("h3n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
          if (v.length > 1 && theData == '') { theData = unnamed; }
          if (theData != '') {

            namen = '';
            if (DPR_prefs['showNames']) {
              // dppn title 'n'

              tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
              if(tt.length > 1) {
                dEI = getDppnEntry(tt);
                if (dEI.length > 0) {
                  namen = getNameHTML(dEI,tt);
                }
              }
            }


            wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3]; // 0, 1, 2, 3, or 4
            whichcol[4] = 1; // bump

            spaces = '';
            for(var f = 0; f < wcs; f++) {
              spaces += '&nbsp;&nbsp;';
            }

            theDatao += spaces+(devCheck == 1 && DshowH ? '[3]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.'+x0+'.'+hier+'\');" title="Click to copy permalink to clipboard">&diams;&nbsp;</span>&nbsp;' :'')+'<span onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+tmp5+','+x1+',\''+hier+'\'],null,null,eventSend(event,1));" class="pointer '+(isPlace?' placeIndex':'')+' index5" style="color:'+DPR_prefs[col[wcs]]+'">' + translit(toUni(theData)) + (nikaya == 'm' && hier == 'm' ? '&nbsp;<d class="small">(MN&nbsp;'+getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,0,hier,0) + ')</d>' : '') + '</span>'+namen;

            // translations

            var transin;
            var transout='';
            transin = DPR_Translations.addtrans(hier,2,nikaya,bookno,tmp2,tmp3,tmp4,tmp5);
            if (transin) {
              theDatao += transin.join('&nbsp;');
            }

            theDatao += '<br />';

            whichheir[3] = tmp5+1;
            var whs = whichheir[0]+'.'+whichheir[1]+'.'+whichheir[2]+'.'+whichheir[3];

            if (lowest < wcs)
              lowest = wcs;

            saveout += '<h'+(wcs+1)+'><a name="'+whs+'b" href="#'+whs+'">'+translit(toUni(theData))+'</a></h'+(wcs+1)+'>';
            saveheader += '<c'+(wcs+1)+'><a name="'+whs+'" href="#'+whs+'b">'+translit(toUni(theData))+'</a></c'+(wcs+1)+'>';

          }

          u = v[tmp5].getElementsByTagName("h4");

          for (var tmp6 = 0; tmp6 < u.length; tmp6++) // section
          {


            if(isPlace && place[6] != 'x' && tmp6 != place[6])
              continue;
            if (u[tmp6].getElementsByTagName("h4n")[0].childNodes[0]) theData = u[tmp6].getElementsByTagName("h4n")[0].textContent.replace(/([a-z])0/g,"$1.").replace(/\{(.*)\}/,"<a  class=\"tiny\" style=\"color:"+DPR_prefs['grey']+"\" href=\"javascript:void(0)\" title=\"$1\">VAR</a>").replace(/^  */, '').replace(/  *$/,''); else theData = '';
            if (u.length > 1 && theData == '') { theData = unnamed; }
            if (theData != '') {

              namen = '';
              if (DPR_prefs['showNames']) {
                // dppn title 'n'

                tt = toVel(theData).replace(/^[ 0-9.]+ /,'').replace(/[-0-9 ()]+$/,'').replace(/[- ]/g,'');
                if(tt.length > 1) {
                  dEI = getDppnEntry(tt);
                  if (dEI.length > 0) {
                    namen = getNameHTML(dEI,tt);
                  }
                }
              }



              wcs = whichcol[0] + whichcol[1] + whichcol[2] + whichcol[3] + whichcol[4]; // 0, 1, 2, 3, 4 or 5
              spaces = '';
              for(var f = 0; f < wcs; f++) {
                spaces += '&nbsp;&nbsp;';
              }

              var suno = getSuttaNumber(nikaya,bookno,tmp2,tmp3,tmp4,tmp5,tmp6,hier,0,6);  // short reference

              theDatao += spaces+(devCheck == 1 && DshowH ? '[4]':'')+(DPR_prefs['showPermalinks'] ? '<span class="pointer hoverShow" onmouseup="permalinkClick(\''+permalink+'loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.'+tmp6+'.'+hier+'\');" title="Click to copy permalink to clipboard">&diams;&nbsp;</span>&nbsp;' :'')+'<span onmouseup="openPlace([\''+nikaya+'\','+bookno+','+tmp2+','+tmp3+','+tmp4+','+tmp5+','+tmp6+',\''+hier+'\'],null,null,eventSend(event,1));" class="pointer '+(isPlace?' placeIndex':'')+' index6" style="color:'+DPR_prefs[col[(wcs == 5 ? 0 : wcs)]]+'">' + translit(toUni(theData)) + (suno?'&nbsp;<d class="small">('+G_nikLongName[nikaya]+'&nbsp;'+suno + ')</d>' : '') + '</span>'+namen;

              // translations

              var transin;
              var transout='';

              transin = DPR_Translations.addtrans(hier,1,nikaya,bookno,tmp2,tmp3,tmp4,tmp5,tmp6);
              //if(bookno == 4) document.getElementById('mafbc').innerHTML += theData;
              if (transin) {
                theDatao += transin.join('&nbsp;');
              }

              theDatao += '<br />';

              whichheir[4] = tmp6+1;
              var whs = whichheir[0]+'.'+whichheir[1]+'.'+whichheir[2]+'.'+whichheir[3]+'.'+whichheir[4];

              if (lowest < wcs)
                lowest = wcs;

              saveout += '<h'+(wcs+1)+'><a name="'+whs+'b" href="#'+whs+'">'+translit(toUni(theData))+'</a></h'+(wcs+1)+'>';
              saveheader += '<c'+(wcs+1)+'><a name="'+whs+'" href="#'+whs+'b">'+translit(toUni(theData))+'</a></c'+(wcs+1)+'>';
            }
            if(isPlace) {
              var link =  DPR_PAL.normalizeDprUri('dpr:index') + '?loc='+nikaya+'.'+bookno+'.'+tmp2+'.'+tmp3+'.'+tmp4+'.'+tmp5+'.'+tmp6+'.'+hier;
              var t = u[tmp6].getElementsByTagName("p");
              for (var tmp7 = 0; tmp7 < t.length; tmp7++) {
                if(xset) { // thai
                  if(/^-- \^a\^Thai [0-9.]+\^ea\^ --$/.test(t[tmp7].textContent) && !DPR_prefs['showPages']) {
                    continue;
                  }
                  //~ function replaceme(str,p1) {
                    //~ p1 = parseInt(p1)+1;
                    //~ return p1;
                  //~ }
                  var para = formatuniout('<p> ' + t[tmp7].textContent.replace(/#([0-9]+)#/,'').replace(/  +/g, ' ') + ' </p>');
                }
                else {
                  var ptype = /^ *\[[0-9]+\] */.exec(t[tmp7].textContent);
                  var para = formatuniout('<p|'+(ptype?ptype[0].replace(/[\[\] ]/g,''):'')+'|'+link+'&para='+(tmp7+1)+'|> ' + t[tmp7].textContent.replace(/^ *\[[0-9]+\] */,'').replace(/  +/g, ' ') + '</p>');
                }
                theDatao += '<div style="margin-left:'+(spaces.length+5)+'px">'+para[0]+'</div>';
                convout += para[1].replace(/  *,/g, ',');
                saveout += para[2].replace(/  *,/g, ',');
              }
            }
          }
        }
      }
    }
  }

  if(DPR_prefs['nigahita']) {
    theDatao = theDatao.replace(/ṃ/g, 'ṁ');
    theDatao = theDatao.replace(/Ṃ/g, 'Ṁ');
  }

  const shortcutFns = createShortcutFns();

  shortcutFns[DPR_CMD_SEARCH_IN_BOOK] = {
    canExecuteStr: 'true',
    executeStr: `sidebarSearch('${nikaya}', ${book}, '${hier}')`,
    titleStr: null,
    visibleStr: 'true',
  };
  var main = '';

  $('#mafbc').html('');

  // toolbox

  if(isPlace) {

  // history

    var bknameme = '';

    if (place[6] != 'x' && u[place[6]].getElementsByTagName("h4n")[0].childNodes[0]) { var bknameme = u[place6].getElementsByTagName("h4n")[0].childNodes[0].textContent }
    else if (place[5] != 'x' && v[place[5]].getElementsByTagName("h3n")[0].childNodes[0]) { var bknameme = v[place[5]].getElementsByTagName("h3n")[0].childNodes[0].textContent }
    else if (place[4] != 'x' && w[place[4]].getElementsByTagName("h2n")[0].childNodes[0]) { var bknameme = w[place[4]].getElementsByTagName("h2n")[0].childNodes[0].textContent }
    else if (place[3] != 'x' && x[place[3]].getElementsByTagName("h1n")[0].childNodes[0]) { var bknameme = x[place[3]].getElementsByTagName("h1n")[0].childNodes[0].textContent }
    else if (place[2] != 'x' && y[place[2]].getElementsByTagName("h0n")[0].childNodes[0]) { var bknameme = y[place[2]].getElementsByTagName("h0n")[0].childNodes[0].textContent }
    else if (z[0].getElementsByTagName("han")[0].childNodes[0]) { var bknameme = z[tmp].getElementsByTagName("han")[0].childNodes[0].textContent }
    else bknameme = '';

    bknameme = bknameme.replace(/^ +/, '').replace(/ +$/, '');
    var places = (place[2]+','+place[3]+','+place[4]+','+place[5]+','+place[6]).replace(/x/g,"'x'");
    addHistory(G_nikLongName[nikaya]+(hier!='m'?'-'+hier:'')+' '+book+' (comb) - '+bknameme+"@"+nikaya+','+bookno+','+places+','+hier);

    var tabT = G_nikLongName[nikaya] + (hier !='m' ? '-'+hier:'') + ' ' + book + (bknameme? ' - ' + bknameme:'') ;

    if(!isDev)
      makeToolbox(shortcutFns, main,'',tabT,true,true,true);
  }
  else {
    if (z[0].getElementsByTagName("han")[0].childNodes[0]) { var bknameme = z[tmp].getElementsByTagName("han")[0].childNodes[0].textContent }
    else bknameme = '';
    bknameme = bknameme.replace(/^ +/, '').replace(/ +$/, '');
    addHistory(G_nikLongName[nikaya]+(hier!='m'?'-'+hier:'')+' '+book+' (idx) - '+bknameme+"@"+nikaya+','+bookno+','+hier);
    makeToolbox(shortcutFns, main?main:false);

    var tabT = G_nikLongName[nikaya] + (hier !='m' ? '-'+hier:'') + ' ' + book + ' index (' + z[tmp].getElementsByTagName("han")[0].textContent.replace(/([a-z])0/g,"$1.").  replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,'') + ')';
    makeToolbox(shortcutFns, main,'',tabT,true,true,true);

  }

  resolveCommands(shortcutFns);

  // add header to saveout

  var clinner = new RegExp('(<\\/c'+(lowest+1)+'>)(<c[^'+(lowest+1)+'])','g');
  var clfirst = new RegExp('(<\\/c[0-9]>)(<c'+(lowest+1)+')','g');
  var cllast = new RegExp('(<\\/c'+(lowest+1)+'>)$');

  saveout = '<div id="menu">'+saveheader.replace(clfirst,"$1<div class=\"csection\">$2").replace(clinner,"$1</div>$2").replace(cllast,"$1</div>")+'</div>'+saveout;

  if(isDev)
    return [tabT,saveout];

  if (DPR_PAL.isWeb){
    initializeMainPaneOutput();
    writeNavigationHeader(tabT);
  }
  $('#mafbc').append('<div id="savetitle">'+tabT+'</div>');
  $('#mafbc').append('<div id="savei">'+saveout+'</div>');
  $('#mafbc').append('<div id="convi">'+convout+'</div>');

  // title, tab, link

  document.getElementsByTagName('title')[0].innerHTML = tabT;

  // permalink
  var permalink = `${DPR_PAL.dprHomePage}?`;
  var oldurl = DPR_PAL.contentDocument.location.href;
  var bareurl = DPR_PAL.normalizeDprUri('dpr:index?');
  var newparams = 'loc='+place.slice(0,8).join('.');
  bareurl += newparams;
  var oldparams = oldurl.split('?')[1];
  if(oldparams) {
    oldparams = oldparams.split('|');
    oldparams[compare-1] = newparams;
    newparams = oldparams.join('|');
  }
  var newurl = `${DPR_PAL.dprHomePage}?${newparams}`;

  DPR_PAL.contentWindow.history.replaceState({}, 'Title', newurl);
  $('#mafbc').append(`<div id="paliTextContent">${theDatao}</div>`);
  document.getElementById('maf').scrollTop = 0;

  // refresh history box

  var sidebar = DPRSidebarWindow();

  if (sidebar) {
    sidebar.DPRNav.historyBox();
  }
}

function createShortcutFns() {
  const shortcutFns = {};
  dprCommandList.forEach(x => shortcutFns[x.id] = { executeStr: emptyFnStr, visibleStr: 'false', });
  return shortcutFns;
}

function saveCompilation() {
  var title=$('#savetitle').html();
  var data = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n<head>\n\t<title>'+title+'</title>\n\t<meta http-equiv="content-type" content="text/html;charset=utf-8" />\n<style>.varc{font-size:60%; color:'+DPR_prefs['grey']+'} .var{display:none; font-size: 100%; color:black; background-color:silver;} .pageno {font-size:60%; color:blue} .paratype06 {font-style:italic;  color:#999999;} p[class*="paratype2"]{ margin: 0 0 0 24px;} c1,c2,c3,c4,c5 { display:block; font-weight:bold; padding:10px 0 0;} c2 { margin-left:10px; font-size:90% } c3 { margin-left:20px; font-size:80% } c4 { margin-left:30px; font-size:70% } c5 { margin-left:40px; font-size:60% }  </style></head>\n<body>';
  data += $('#savei').html().replace(/ *<([hp])/g,"\n\t<$1");
  data += '\n</body>\n</html>';
  var file = fileSaveDialog('Choose a location to export the HTML file');
//  file = file.replace(/\\/g,'/');

  if(file == '') {
    alertFlash('You must enter a file name', 'red');
    return;
  }
  if(writeExtFile(file, data)) alertFlash('Data saved to '+file, 'green');
  else {
    alertFlash('Error saving file', 'red');
  }
}


function compareVersions([nikaya,book,meta,volume,vagga,sutta,section,hier,alt],para,stringra,add) {

  var nikbookhier = nikaya + (book+1) + hier;

    var xmlDoc = [loadXMLFile(nikbookhier,0),loadXMLFile(nikbookhier,1)];

  var myanA = xmlDoc[0].getElementsByTagName("ha")[0].getElementsByTagName("h0")[meta].getElementsByTagName("h1")[volume].getElementsByTagName("h2")[vagga].getElementsByTagName("h3")[sutta].getElementsByTagName("h4")[section].getElementsByTagName("p");
  var thaiA = xmlDoc[1].getElementsByTagName("ha")[0].getElementsByTagName("h0")[meta].getElementsByTagName("h1")[volume].getElementsByTagName("h2")[vagga].getElementsByTagName("h3")[sutta].getElementsByTagName("h4")[section].getElementsByTagName("p");

  var myan = '', thai = '';

  for (var i in myanA) {
    myan += (myan?' ':'')+myanA[i].textContent;
  }
  for (var i in thaiA) {
    thai += (thai?' ':'')+thaiA[i].textContent;
  }

  myan = 'evaṃ ^a^M1.0001^ea^ ^a^V1.0001^ea^ ^a^P1.0001^ea^ ^a^T1.0001^ea^ me sutaṃ -- ekaṃ  samayaṃ bhagavā antarā ca  rājagahaṃ antarā ca nāḷandaṃ addhānamaggappaṭipanno hoti mahatā  bhikkhusaṅghena saddhiṃ pañcamattehi bhikkhusatehi.';
  thai = 'Evamme sutaṁ. Ekaṁ samayaṁ bhagavā antarā ca rājagahaṁ #7# antarā ca nāḷandaṁ addhānamaggapaṭipanno hoti mahatā bhikkhusaṁghena #8# saddhiṁ pañcamattehi bhikkhusatehi.';

  myan = myan.toLowerCase();
  myan = myan.replace(/\^[ab]\^[^^]+\^e[ab]\^/g,'');
  myan = myan.replace(/\{[^}]\}/g,'');
  myan = myan.replace(/[^āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ aiueokgcjtdnpbmyrlvsh]/g,'');
  myan = myan.replace(/  +/g,' ');

  thai = thai.toLowerCase();
  thai = thai.replace(/#[0-9]+#/g,'');
  thai = thai.replace(/\{[^}]\}/g,'');
  thai = thai.replace(/ṁ/g,'ṃ');
  thai = thai.replace(/[^āīūṭḍṅṇṃṃñḷĀĪŪṬḌṄṆṂÑḶ aiueokgcjtdnpbmyrlvsh]/g,'');
  thai = thai.replace(/ṁ([gk])/g,"ṅ$1");
  thai = thai.replace(/  +/g,' ');

  myan = myan.split(' ');
  thai = thai.split(' ');

  var out = iterCompare(0,0,0,myan,thai);
  alert(out);
  for(var i in myan) {
    var oldpercent = [0,''];
    for (var j in thai) {
      var percent = findSimilarWords(myan[i],[thai[j]]);
      if(percent == 100) break;
      if(percent[0] > oldpercent[0])
        oldpercent = percent;
    }
  }

  $('#mafbc').html(out);
}


function iterCompare(p1,p2,iter, one, two) {
  one = ['one','two','three'];
  two = ['one','two','three'];
  var oldv = 0, outa = [];
  var thisi,ina, newv;
  while(p1 < one.length) {
    thisi = findSimilarWords(one[p1++],[two[p2++]]);
    if(p2 < two.length) {
      ina = iterCompare(p1,p2,(parseInt(iter)+1),one,two);
      alert('in '+ina);
      ina.unshift(thisi);
    }
    else
      ina = thisi;

    newv = countVals(ina);
    if(newv > oldv) {
      outa = ina.slice(0);
      oldv = newv;
    }
    else
      p2--;
    if (newv == 100)
      break;
  }
  return outa;
}

function countVals(a) {
  var count = 0;
  for (var i=0;i<a.length;i++) {
    count+=a[i][0];
  }
  return count;
}
