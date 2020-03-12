if (DPR_PAL.isXUL) {
    console.log('Loading DPR_PAL_Search...');
} else {
    console.log('Cannot DPR_PAL_Search for the wrong platform', DPR_PAL);
}

function DPR_PAL_Search_SetTitle(title) {
  MD.getElementById('DPR').setAttribute('title', title);
}

function DPR_PAL_Search_ShowProgressBar() {
  MD.getElementById('search-progress').removeAttribute('collapsed');
  MD.getElementById('search-progress').setAttribute('value',0);
}

function DPR_PAL_Search_ShowCancelButton() {
  MD.getElementById('cancel-search').removeAttribute('collapsed');
}

function DPR_PAL_Search_MakeProgressTable(maxVal) {
  MD.getElementById('search-progress').setAttribute('max', maxVal);
}

function DPR_PAL_Search_UpdateProgressBar() {
  const val = parseInt(MD.getElementById('search-progress').getAttribute('value'));
  MD.getElementById('search-progress').setAttribute('value',val+1);
}

function DPR_PAL_Search_HideProgressBar() {
  MD.getElementById('search-progress').setAttribute('collapsed',true);
}

function DPR_PAL_Search_HideCancelButton() {
  MD.getElementById('cancel-search').setAttribute('collapsed',true);
}

function DPR_PAL_Search_InitializeSectionLinks() {
  var element = MD.getElementById("search-sets");
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

function DPR_PAL_SearchAddSearchTermSectionLink(searchTerm) {
  var thisterm = MD.createElement('toolbarbutton');
  thisterm.setAttribute('id', 'search-term');
  thisterm.setAttribute('onmouseup', 'scrollSearch()');
  thisterm.setAttribute('class', 'search-set');

  var setlabel = MD.createElement('label');
  setlabel.setAttribute('value', searchTerm);
  setlabel.setAttribute('id', 'search-term');
  setlabel.setAttribute('crop', 'center');
  setlabel.setAttribute('class', 'search-button-label');
  thisterm.appendChild(setlabel);

  var tsep = MD.createElement('toolbarseparator');
  MD.getElementById('search-sets').appendChild(thisterm);
  MD.getElementById('search-sets').appendChild(tsep);
}

function DPR_PAL_Search_AddSectionLink() {
  var thisset = MD.createElement('toolbarbutton');
  thisset.setAttribute('class', 'search-set');
  thisset.setAttribute('onmouseup', 'scrollSearch(\'sbfN' + G_numberToNik[i] + '\')');
  var setlabel = MD.createElement('label');
  setlabel.setAttribute('value', G_nikLongName[G_numberToNik[i]] + ': 0');
  setlabel.setAttribute('id', 'matches' + G_numberToNik[i]);
  setlabel.setAttribute('class', 'search-button-label');
  thisset.appendChild(setlabel);
  var sep = MD.createElement('toolbarseparator');
  MD.getElementById('search-sets').appendChild(thisset);
  if (i < G_searchSet.length)
    MD.getElementById('search-sets').appendChild(sep);
}

function DPR_PAL_Search_UpdateSectionLink(nikayaat, thiscount) {
  var val = MD.getElementById('matches' + nikayaat).getAttribute('value').replace(/: .+/, ': ');
  MD.getElementById('matches' + nikayaat).setAttribute('value', val + thiscount);
}

function DPR_PAL_Search_AddSearchTermSectionInfo(sectionInfo) {
  var thisterm = MD.createElement('label');
  thisterm.setAttribute('value',(G_searchRX?G_searchString:toUni(G_searchString))+': ');
  thisterm.setAttribute('id','search-term');
  thisterm.setAttribute('class','search-bold');
  thisterm.setAttribute('crop','center');

  var thismatches = MD.createElement('label');
  thismatches.setAttribute('value','0');
  thismatches.setAttribute('id','search-matches');
  thismatches.setAttribute('class','search-bold');

  var thisinter = MD.createElement('label');
  thisinter.setAttribute('value',' matches in ');
  thisinter.setAttribute('class','search-label');
  thisinter.setAttribute('id','inter');

  var thisset = MD.createElement('label');
  thisset.setAttribute('value',sectionInfo);
  thisset.setAttribute('class','search-bold');

  MD.getElementById('search-sets').appendChild(thisterm);
  MD.getElementById('search-sets').appendChild(thismatches);
  MD.getElementById('search-sets').appendChild(thisinter);
  MD.getElementById('search-sets').appendChild(thisset);
}

function DPR_PAL_Search_UpdateSearchTermSectionInfo(count) {
  var val = parseInt(MD.getElementById('search-matches').getAttribute('value'));
  MD.getElementById('search-matches').setAttribute('value',count);
}

function DPR_PAL_Search_FixPluralInSearchTermSectionInfo() {
  var val = parseInt(MD.getElementById('search-matches').getAttribute('value'));
  if(val == 1) {
    var str = MD.getElementById('inter').getAttribute('value').replace('matches','match');
    MD.getElementById('inter').setAttribute('value',str);
  }
}

function DPR_PAL_Search_AddCopyPermaLinkElement() {
  var mlink = MD.createElement('toolbarbutton');
  mlink.setAttribute('class','search-button');
  mlink.setAttribute('label','♦');
  mlink.setAttribute('onmouseup','permalinkClick(\''+G_searchLink+'\',1)');
  mlink.setAttribute('tooltiptext','Click to copy permalink to clipboard');

  MD.getElementById('search-link').appendChild(mlink);
}

function DPR_PAL_Search_RemoveCopyPermaLinkElement() {
  var element = MD.getElementById("search-link");
  while(element.hasChildNodes()){
    element.removeChild(element.firstChild);
  }
}

function DPR_PAL_Search_CreateSectionHeader(newnikaya) {
  const headingNode = document.createElement('div');
  headingNode.setAttribute('id', 'sbfN' + newnikaya);
  headingNode.setAttribute('name', 'xyz');
  headingNode.setAttribute('class', 'huge');
  headingNode.innerHTML = G_nikLongName[newnikaya] + '<hr>';
  return headingNode;
}

