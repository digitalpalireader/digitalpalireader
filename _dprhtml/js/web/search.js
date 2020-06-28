//'use strict';

if (DPR_PAL.isWeb) {
  console.log('Loading DPR_PAL_Search...');
} else {
  console.log('Cannot DPR_PAL_Search for the wrong platform', DPR_PAL);
}

function DPR_PAL_Search_SetTitle(title) {
  DPR_G.MD.title = title;
}

function DPR_PAL_Search_ShowProgressBar() {
  $('#search-progress').show();
  $('#search-progress').data('current', 0);
  $('#search-current-progress').css('width', '0%');
}

function DPR_PAL_Search_MakeProgressTable(maxVal) {
  $('#search-progress').data('max', maxVal);
}

function DPR_PAL_Search_UpdateProgressBar() {
  const max = $('#search-progress').data('max');
  const current = $('#search-progress').data('current') + 1;
  $('#search-progress').data('current', current);
  const percentage = Math.round(current / max * 100);
  if (percentage % 10 === 0) {
    $('#search-current-progress').css('width', `${percentage + 10}%`);
  }
}

function DPR_PAL_Search_HideProgressBar() {
  $('#search-progress').hide();
}

function DPR_PAL_Search_ShowCancelButton() {
  const html = `
  <button class="btn btn-danger btn-sm m-2" id="cancel-search" icon="cancel" onmouseup="stopSearch()" title="Abort search">
    <i class="fa fa-stop-circle-o"></i>
  </button>`;

  $('#search-header-context-commands').html(html);
}

function DPR_PAL_Search_HideCancelButton() {
  $('#search-header-context-commands').empty();
}

function DPR_PAL_Search_InitializeSectionLinks() {
  $("#search-header-title").text("Results for:");

  const html = `
  <div id="search-header-items">
  <ul id="search-sets"></ul>
  <a id="showing" class="btn btn-outline-secondary m-0" style="display: none; text-align: justify;" onclick="showonly('xyz');" title="Remove search filter"></a>
  <span id="search-link"></span>
  </div>
  `;
  $("#search-header-contents").html(html);
}

function DPR_PAL_SearchAddSearchTermSectionLink(searchTerm) {
  const html = `
<li>
  <a href="#" onclick="return scrollSearch()">${searchTerm}</a>
</li>`;
  DPR_G.MD.getElementById('search-sets').insertAdjacentHTML('beforeend', html);
}

function DPR_PAL_Search_AddSectionLink(nik) {
  const scrollTo = `sbfN${nik}`;
  const id = `matches${nik}`;
  const html = `
<li>
  <a id="${id}" href="#" onclick="return scrollSearch('${scrollTo}')">${DPR_G.G_nikLongName[nik] + ': 0'}</a>
</li>`;
  DPR_G.MD.getElementById('search-sets').insertAdjacentHTML('beforeend', html);
}

function DPR_PAL_Search_UpdateSectionLink(nikayaat, thiscount) {
  var val = $('#matches' + nikayaat).text().replace(/: .+/, ': ');
  $('#matches' + nikayaat).text(val + thiscount);
}

function DPR_PAL_Search_AddSearchTermSectionInfo(sectionInfo) {
  const html = `
<li>
  <label class="m-0" id="search-term" style="font-weight: bold;">${(DPR_G.G_searchRX?DPR_G.G_searchString:DPR_translit_mod.toUni(DPR_G.G_searchString))+': '}</label>
</li>
<li>
  <label class="m-0" id="search-matches" style="font-weight: bold;">0</label>
</li>
<li>
  <label class="m-0" id="inter">matches in </label>
</li>
<li>
  <label class="m-0" style="font-weight: bold;">${sectionInfo}</label>
</li>
`;
  DPR_G.MD.getElementById('search-sets').insertAdjacentHTML('beforeend', html);
}

function DPR_PAL_Search_UpdateSearchTermSectionInfo(count) {
  $('#search-sets #search-matches').text(count);
}

function DPR_PAL_Search_FixPluralInSearchTermSectionInfo() {
  var val = parseInt(DPR_G.MD.getElementById('search-matches').innerHTML);
  if(val == 1) {
    var str = DPR_G.MD.getElementById('inter').innerHTML.replace('matches','match');
    DPR_G.MD.getElementById('inter').innerHTML = str;
  }
}

function DPR_PAL_Search_AddCopyPermaLinkElement() {
  const html = `
<a class="btn btn-success btn-light btn-small m-0" onclick="permalinkClick('${DPR_G.G_searchLink}')" title="Click to copy permalink to clipboard"><i class="fa fa-link" aria-hidden="true"></i></a>
`;
  DPR_G.MD.getElementById('search-link').insertAdjacentHTML('beforeend', html);
}

function DPR_PAL_Search_RemoveCopyPermaLinkElement() {
  var element = DPR_G.MD.getElementById("search-link");
  while(element.hasChildNodes()){
  element.removeChild(element.firstChild);
  }
}

function DPR_PAL_Search_CreateSectionHeader(newnikaya) {
  const id = `sbfN${newnikaya}`;
  const html = `<h4 id='${id}' name='xyz' class="card-title huge">${DPR_G.G_nikLongName[newnikaya]}</h4>`;
  const headingNode = document.createElement('div');
  headingNode.innerHTML = html;
  return headingNode.children[0];
}
