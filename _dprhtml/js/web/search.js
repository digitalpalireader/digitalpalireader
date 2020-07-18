'use strict';

var DPR_search_mod = (function () {
  function setTitle(title) {
    DPR_G.MD.title = title;
  }

  function showProgressBar() {
    $('#search-current-progress').css('width', '0%');
    $('#search-progress').data('current', 0);
    $('#search-progress').show();
  }

  function makeProgressTable(maxVal) {
    $('#search-progress').data('max', maxVal);
  }

  function updateProgressBar() {
    const max = $('#search-progress').data('max');
    const current = $('#search-progress').data('current') + 1;
    $('#search-progress').data('current', current);
    const percentage = Math.round(current / max * 100);
    if (percentage % 10 === 0) {
      $('#search-current-progress').css('width', `${percentage + 10}%`);
    }
  }

  function hideProgressBar() {
    $('#search-progress').hide();
  }

  function showCancelButton() {
    const html = `
    <button class="btn btn-danger btn-sm m-2" id="cancel-search" icon="cancel" onmouseup="DPR1_search_mod.stopSearch()" title="Abort search">
      <i class="fa fa-stop-circle-o"></i>
    </button>`;

    $('#search-header-context-commands').html(html);
  }

  function hideCancelButton() {
    $('#search-header-context-commands').empty();
  }

  function initializeSectionLinks() {
    $("#search-header-title").text("Results for:");

    const html = `
    <div id="search-header-items">
    <ul id="search-sets"></ul>
    <a id="showing" class="btn btn-outline-secondary m-0" style="display: none; text-align: justify;" onclick="DPR1_search_mod.showonly('xyz');" title="Remove search filter"></a>
    <span id="search-link"></span>
    </div>
    `;
    $("#search-header-contents").html(html);
  }

  function addSearchTermSectionLink(searchTerm) {
    const html = `
  <li>
    <a href="#" onclick="return DPR1_search_mod.scrollSearch()">${searchTerm}</a>
  </li>`;
    DPR_G.MD.getElementById('search-sets').insertAdjacentHTML('beforeend', html);
  }

  function addSectionLink(nik) {
    const scrollTo = `sbfN${nik}`;
    const id = `matches${nik}`;
    const html = `
  <li>
    <a id="${id}" href="#" onclick="return DPR1_search_mod.scrollSearch('${scrollTo}')">${DPR_G.G_nikLongName[nik] + ': 0'}</a>
  </li>`;
    DPR_G.MD.getElementById('search-sets').insertAdjacentHTML('beforeend', html);
  }

  function updateSectionLink(nikayaat, thiscount) {
    var val = $('#matches' + nikayaat).text().replace(/: .+/, ': ');
    $('#matches' + nikayaat).text(val + thiscount);
  }

  function addSearchTermSectionInfo(sectionInfo) {
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

  function updateSearchTermSectionInfo(count) {
    $('#search-sets #search-matches').text(count);
  }

  function fixPluralInSearchTermSectionInfo() {
    var val = parseInt(DPR_G.MD.getElementById('search-matches').innerHTML);
    if(val == 1) {
      var str = DPR_G.MD.getElementById('inter').innerHTML.replace('matches','match');
      DPR_G.MD.getElementById('inter').innerHTML = str;
    }
  }

  function addCopyPermaLinkElement() {
    const html = `
  <a class="btn btn-success btn-light btn-small m-0" onclick="DPR1_format_mod.permalinkClick('${DPR_G.G_searchLink}')" title="Click to copy permalink to clipboard"><i class="fa fa-link" aria-hidden="true"></i></a>
  `;
    DPR_G.MD.getElementById('search-link').insertAdjacentHTML('beforeend', html);
  }

  function removeCopyPermaLinkElement() {
    var element = DPR_G.MD.getElementById("search-link");
    while(element.hasChildNodes()){
    element.removeChild(element.firstChild);
    }
  }

  function createSectionHeader(newnikaya) {
    const id = `sbfN${newnikaya}`;
    const html = `<h4 id='${id}' name='xyz' class="card-title huge">${DPR_G.G_nikLongName[newnikaya]}</h4>`;
    const headingNode = document.createElement('div');
    headingNode.innerHTML = html;
    return headingNode.children[0];
  }

  return {
    addSearchTermSectionLink: addSearchTermSectionLink,
    addCopyPermaLinkElement: addCopyPermaLinkElement,
    addSearchTermSectionInfo: addSearchTermSectionInfo,
    addSectionLink: addSectionLink,
    createSectionHeader: createSectionHeader,
    fixPluralInSearchTermSectionInfo: fixPluralInSearchTermSectionInfo,
    hideCancelButton: hideCancelButton,
    hideProgressBar: hideProgressBar,
    initializeSectionLinks: initializeSectionLinks,
    makeProgressTable: makeProgressTable,
    removeCopyPermaLinkElement: removeCopyPermaLinkElement,
    setTitle: setTitle,
    showCancelButton: showCancelButton,
    showProgressBar: showProgressBar,
    updateProgressBar: updateProgressBar,
    updateSearchTermSectionInfo: updateSearchTermSectionInfo,
    updateSectionLink: updateSectionLink
  }
})()
