if (DPR_PAL.isWeb) {
    console.log('Loading DPR_PAL_Search...');
} else {
    console.log('Cannot DPR_PAL_Search for the wrong platform', DPR_PAL);
}

function DPR_PAL_Search_SetTitle(title) {
    MD.title = title;
}

function DPR_PAL_Search_ShowProgressBar() {
    $('#search-progress').show();
    $('#search-progress').data('current', 0);
    $('#search-current-progress').css('width', '0%');
}

function DPR_PAL_Search_ShowCancelButton() {
    $('#cancel-search').show();
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

function DPR_PAL_Search_HideCancelButton() {
    $('#cancel-search').hide();
}

function DPR_PAL_Search_ClearSectionLinks() {
	var element = MD.getElementById("search-sets");
	while (element.hasChildNodes()) {
		element.removeChild(element.firstChild);
	}
}

function DPR_PAL_SearchAddSearchTermSectionLink(searchTerm) {
    const html = `
<li class="nav-item">
    <a class="nav-link" href="#" onclick="scrollSearch()">${searchTerm}</a>
</li>`;
    MD.getElementById('search-sets').insertAdjacentHTML('beforeend', html);
}

function DPR_PAL_Search_AddSectionLink() {
    const scrollTo = `sbfN${G_numberToNik[i]}`;
    const id = `matches${G_numberToNik[i]}`;
    const html = `
<li class="nav-item">
	<a id="${id}" class="nav-link" href="#" onclick="scrollSearch('${scrollTo}')">${G_nikLongName[G_numberToNik[i]] + ': 0'}</a>
</li>`;
    MD.getElementById('search-sets').insertAdjacentHTML('beforeend', html);
}

function DPR_PAL_Search_UpdateSectionLink(nikayaat, thiscount) {
    var val = $('#matches' + nikayaat).text().replace(/: .+/, ': ');
    $('#matches' + nikayaat).text(val + thiscount);
}

function DPR_PAL_Search_AddSearchTermSectionInfo(sectionInfo) {
    const html = `
<li class="nav-item">
	<label id="search-term" class="nav-link" style="font-weight: bold;">${(G_searchRX?G_searchString:toUni(G_searchString))+': '}</label>
</li>
<li class="nav-item">
	<label id="search-matches" class="nav-link" style="font-weight: bold;">0</label>
</li>
<li class="nav-item">
	<label id="inter" class="nav-link">matches in </label>
</li>
<li class="nav-item">
	<label class="nav-link" style="font-weight: bold;">${sectionInfo}</label>
</li>
`;
    MD.getElementById('search-sets').insertAdjacentHTML('beforeend', html);
}

function DPR_PAL_Search_UpdateSearchTermSectionInfo(count) {
    $('#search-matches').text(count);
}

function DPR_PAL_Search_FixPluralInSearchTermSectionInfo() {
    var val = parseInt(MD.getElementById('search-matches').innerHTML);
    if(val == 1) {
        var str = MD.getElementById('inter').innerHTML.replace('matches','match');
        MD.getElementById('inter').innerHTML = str;
    }
}

function DPR_PAL_Search_AddCopyPermaLinkElement() {
    const html = `
<a class="btn btn-outline-light btn-small my-2 my-sm-0" onclick="permalinkClick('${G_searchLink}')" title="Click to copy permalink to clipboard">♦</a>
`;
    MD.getElementById('search-link').insertAdjacentHTML('beforeend', html);
}

function DPR_PAL_Search_RemoveCopyPermaLinkElement() {
	var element = MD.getElementById("search-link");
	while(element.hasChildNodes()){
		element.removeChild(element.firstChild);
	}
}

function DPR_PAL_Search_CreateSectionHeader(newnikaya) {
    const id = `sbfN${newnikaya}`;
    const html = `<h4 id='${id}' name='xyz' class="card-title huge">${G_nikLongName[newnikaya]}</h4>`;
    const headingNode = document.createElement('div');
    headingNode.innerHTML = html;
    return headingNode.children[0];
}
