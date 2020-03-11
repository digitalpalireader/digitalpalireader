const initializeNavigationFeature = () => {
  const urlParams = window.location.search.substring(1, window.location.search.length).split('&');
  let bookList = 'd';
  let place = [];
  let query = '';
  let para = '';
  urlParams.forEach(parameter => {
    parameterSections = parameter.split('=');
    switch (parameterSections[0]) {
      case 'loc':
        place = makeLocPlace(parameterSections[1]);
        if (place.length == 8) {
          bookList = place[0];
        }
        break;
      case 'para':
        para = parameterSections[1];
        break;
      case 'query':
        query = parameterSections[1];
        break;
    }
  });

  switch(place.length){
    case 3:
      loadXMLindex(place,false);
      break;
    case 8:
      loadXMLSection(query, para, place);
      break;
    default:
      break;
  }
}

const initializeNavigationSidebarTab = () => {
  let bookList = 'd';
  var navset = $("#nav-set");
  for (var i in G_nikFullNames) {
    navset.append($("<option />").val(i).text(G_nikFullNames[i]));
  }
  navset.val(bookList);
  digitalpalireader.setBookList(bookList);
  digitalpalireader.changeSet();
  navset.change(function () {
    digitalpalireader.changeSet();
  });
  $("#nav-book").change(function () {
    digitalpalireader.updateSubnav(0);
  });

  $('#nav-title').prop('title', 'View index for this book');

  DPR_PAL.enablePopover('#quicklinks-info', 'hover', 'right');

  DPR_PAL.enablePopover('#navigate-book-hierarchy-info', 'hover', 'right');
}
