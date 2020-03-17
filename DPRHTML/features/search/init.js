var searchType = 0;
var searchString = '';
var searchMAT = '';
var searchSet = '';
var searchBook = 0;
var searchPart = 0;
var searchRX = false;

const setSearchParams = () => {
  //DPRNav.setSearchBookList();
  //DPROpts.tipitakaOptions();
  const urlParams = window.location.search.substring(1, window.location.search.length).split('&');
  urlParams.forEach(parameter => {
    parameterSections = parameter.split('=');
    switch (parameterSections[0]) {
      case 'type':
        searchType = parseInt(parameterSections[1], 10);
        __dprViewModel.searchTab.searchType(searchType);
        break;
      case 'query':
        searchString = decodeURIComponent(parameterSections[1]);
        __dprViewModel.searchTab.searchString(searchString);
        break;
      case 'MAT':
        searchMAT = parameterSections[1];
        __dprViewModel.searchTab.searchMAT(searchMAT);
        break;
      case 'set':
        searchSet = parameterSections[1];
        __dprViewModel.searchTab.searchSet(searchSet);
        break;
      case 'book':
        searchBook = parameterSections[1];
        __dprViewModel.searchTab.searchBookString(searchBook);
        break;
      case 'part':
        searchPart = parameterSections[1];
        __dprViewModel.searchTab.searchPart(searchPart);
        break;
      case 'rx':
        searchRX = parameterSections[1];
        __dprViewModel.searchTab.searchRX(searchRX);
        break;
    }
  });
}

searchHandler = event => {
  DPRSend.sendSearch(DPRSend.eventSend(event));
  //setSearchParams();
  //DPROpts.tipitakaOptions();
  //DPRNav.setSearchBookList();
}

const initializeSearchSidebarTab = () => {
  const sidebarTab = $(`#${searchFeatureName}TabContent`)[0];
  setSearchParams();
  ko.applyBindings(__dprViewModel.searchTab, sidebarTab);
  DPROpts.tipitakaOptions();
  DPRNav.setSearchBookList();
  DPR_PAL.enablePopover('#isearchInfo', 'click', 'bottom');
}

const initializeSearchFeature = () => {
  getconfig();
  searchTipitaka(searchType,searchString,searchMAT,searchSet,searchBook,searchPart,searchRX);
}
