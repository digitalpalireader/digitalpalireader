'use strict';

if (DPR_PAL.isWeb) {
    console.log('Loading DPR_PAL_Sidebar...');
} else {
    console.log('Cannot DPR_PAL_Sidebar for the wrong platform', DPR_PAL);
}

var digitalpalireader = {
  changeSet() {
    var nik = $('#nav-set').val();
    if (G_hier == 't' && (nik == 'k' || nik == 'x' || nik == 'g' || nik == 'b')) {
      alert('Ṭīkā not available for '+G_nikLongName[nik]+'.');
      $('#nav-set').val(oldnikaya);
      return;
    }
    if (G_hier == 'a' && nik == 'g') {
      alert('Atthakatha not available for Gram.');
      $('#nav-set').val(oldnikaya);
      return;
    }
    if (G_hier == 'a' && nik == 'b') {
      alert('Atthakatha not available for Abhidh-s.');
      $('#nav-set').val(oldnikaya);
      return;
    }
    oldnikaya = nik;
    this.setBookList(nik);
  },

  setBookList(nik,book){
    var titles;
    if (nikvoladi[nik]) titles = nikvoladi[nik];
    else titles = nikvoladi[nik+G_hier];
    var bookNode = $('#nav-book');
    bookNode.empty();
    for (var i = 0; i < titles.length; i++) {
      var title;
      var val;
      if(nik == 'k' || nik == 'y') {
        title = G_kynames[nik][titles[i]];
        val = titles[i]+1;
      }
      else {
        title = titles[i];
        val = i+1;
      }
      bookNode.append($("<option />").val(val).text(translit(title)));
    }
    bookNode.val(book?book:1);
    this.updateSubnav(0);
  },

  updateDepth(heir, n, tag, id, navShown) {
    const lista = this.makeTitleSelect(heir, tag);

    const listNode = $(`#${id}`);
    listNode.empty();
    const listNodeButton = $(`#${id}-button`)

    if (lista.length == 1 && lista[0] == this.unnamed ) {
      navShown[n] = false;
      listNode.hide();
      listNodeButton.hide();
      listNode.append($("<option />").val(0).text(this.unnamed));
    }
    else {
      navShown[n] = true;
      for(var idx in lista){
        listNode.append($("<option />").val(idx).text(lista[idx]));
      }
      listNode.show();
      listNodeButton.show();
    }
    listNode.val(0);
  },

  updateSubnav:function (depth,event){ // depth: 4=section, 3=sutta..., 2=vagga..., 1=volume..., 0=all

    var navShown = [$('#nav-meta-button').is(":visible"),$('#nav-volume-button').is(":visible"),
      $('#nav-vagga-button').is(":visible"),$('#nav-sutta-button').is(":visible"),
      $('#nav-section-button').is(":visible")];

    document.activeElement.blur();

    var nikaya = $('#nav-set').val();
    var book = $('#nav-book').val();
    var nikbookhier = nikaya + book + G_hier;
    var xmlDoc = loadXMLFile(nikbookhier,0);

    var meta = (depth > 0  ? $("#nav-meta option:selected").index() : 0);
    var volume = (depth > 1 ? $("#nav-volume option:selected").index() : 0);
    var vagga = (depth > 2 ? $("#nav-vagga option:selected").index() : 0);
    var sutta = (depth > 3 ? $("#nav-sutta option:selected").index() : 0);

    var nik = nikaya;

    var xml,axml,lista,list,name,namea;

    axml = xmlDoc.getElementsByTagName("ha");
    namea = axml[0].getElementsByTagName("han");
    if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,'');
    else name = this.unnamed;
    var outname = translit(toUni(name));
    $('#nav-title').text(outname);

    var u = xmlDoc.getElementsByTagName("h0");
    var v = u[meta].getElementsByTagName("h1");
    var w = v[volume].getElementsByTagName("h2");
    var x = w[vagga].getElementsByTagName("h3");
    var y = x[sutta].getElementsByTagName("h4");

    switch(true) {
      case (depth == 0): // remake meta list
        this.updateDepth(u, 0, 'h0n', 'nav-meta', navShown);

      case  (depth < 2): // remake volume list
        this.updateDepth(v, 1, 'h1n', 'nav-volume', navShown);

      case  (depth < 3): // remake vaggalist
        this.updateDepth(w, 2, 'h2n', 'nav-vagga', navShown);

      case  (depth < 4): // remake sutta list on depth = 0, 1, 2, or 3
        this.updateDepth(x, 3, 'h3n', 'nav-sutta', navShown);

      default: // remake section list
        this.updateDepth(y, 4, 'h4n', 'nav-section', navShown);

      break;
    }

    $('.navbutton').hide();
    $('#nav-quicklinks-button').show().prop('title', 'Open Quick Link');
    $('#nav-title-button').show().text('≡').prop('title', 'Combine all sub-sections');
    if (navShown[4]) {
      $('#nav-section-button').show().text('\u21D2').prop('title', 'View this section').attr("onclick","digitalpalireader.loadSection(2)");
    }

    if (navShown[3]) {
      navShown[4] ?
        $('#nav-sutta-button').show().text('≡').prop('title', 'Combine all sub-sections').attr("onclick","digitalpalireader.loadSection(2,5)") :
        $('#nav-sutta-button').show().text('\u21D2').prop('title', 'View this section').attr("onclick","digitalpalireader.loadSection(2)");
    }

    if (navShown[2]) {
      navShown[3] || navShown[4] ?
        $('#nav-vagga-button').show().text('≡').prop('title', 'Combine all sub-sections').attr("onclick","digitalpalireader.loadSection(2,4)") :
        $('#nav-vagga-button').show().text('\u21D2').prop('title', 'View this section').attr("onclick","digitalpalireader.loadSection(2)");
    }

    if (navShown[1]) {
      navShown[2] || navShown[3] || navShown[4] ?
        $('#nav-volume-button').show().text('≡').prop('title', 'Combine all sub-sections').attr("onclick","digitalpalireader.loadSection(2,3)") :
        $('#nav-volume-button').show().text('\u21D2').prop('title', 'View this section').attr("onclick","digitalpalireader.loadSection(2)");
    }

    if (navShown[0]) {
      navShown[1] || navShown[2] || navShown[3] || navShown[4] ?
        $('#nav-meta-button').show().text('≡').prop('title', 'Combine all sub-sections').attr("onclick","digitalpalireader.loadSection(2,2)") :
        $('#nav-meta-button').show().text('\u21D2').prop('title', 'View this section').attr("onclick","digitalpalireader.loadSection(2)");
    }
  },

  changeHier:function(htmp) {

    if(G_hier == htmp) return;

    var himg = ['l','m','r'];

    if (htmp == 't' && this.limitt(document.getElementById('nav-set').selectedIndex)) {
      var MAT = G_hier == 'm'?'mul':'att';
      alert('Ṭīkā not available for ' + G_nikLongName[document.getElementById('nav-set').value]+'.');
      return;
    }
    if (htmp == 'a' && document.getElementById('nav-set').selectedIndex > 7) {
      alert('Aṭṭhakathā not available for ' + G_nikLongName[document.getElementById('nav-set').value]+'.');
      return;
    }
    if (document.getElementById('nav-set').value == 'k' && htmp == 'a' && kudvala[document.getElementById('nav-book').value] == undefined) {
      alert('Aṭṭhakathā not available for '+this.getBookName(document.getElementById('nav-set').value,htmp,document.getElementById('nav-book').selectedIndex)+'.');
      return;
    }

    G_hier = htmp;


    var book = document.getElementById('nav-book').value;
    if (document.getElementById('nav-set').value == 'k') {
      if (htmp == 'm') {
        book = parseInt(book) - 1;
      }
      else {
        book = kudvala[book];
      }
    }
    else if (document.getElementById('nav-set').value == 'y') {
      var book = document.getElementById('nav-book').value;
      if (htmp == 'm') {
        book = parseInt(book) - 1;
      }
      else {
        book = abhivala[book];
      }
    }
    else
      book = parseInt(book) - 1;

    this.changeSet();
  },

  getSubNavArray:function(){
    return [$('#nav-set').val(),$('#nav-book option:selected').index(),$('#nav-meta option:selected').index(),$('#nav-volume option:selected').index(),$('#nav-vagga option:selected').index(),$('#nav-sutta option:selected').index(),$('#nav-section option:selected').index(),G_hier];
  },

  makeTitleSelect:function(xml,tag) { // output menupopup tag with titles in menuitems
    var name, namea;
    var outlist = [];
    for (var a = 0; a < xml.length; a++)
    {
      name = xml[a].getElementsByTagName(tag);
      if (name[0].childNodes[0] && name[0].textContent.replace(/ /g,'').length > 0) namea = name[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,'');
      else {
        namea = this.unnamed;
        outlist.push(namea);
        continue;
      }
      namea = translit(toUni(namea));

      outlist.push(namea);
    }
    return outlist;
  },
  unnamed:'[unnamed]',

  limitt:function(nikn) {
    if (nikn == 5 || nikn > 6) { return true; }
    else { return false };
  },

  loadIndex:function(context){
    switch(context) {
      case 1:
        importXMLindex("");
        break;
      case 2:
        DPRSend.importXML(false,null,null,null,'internal',null,1);
        break;
    }
  },

  loadSection:function(context,category=6){
    var aplace;
    switch(context) {
      case 1: // quick links
        if($.trim($('#nav-quicklinks').val()) == ''){
          alert('Input can not be left blank.');
        } else
          try {
            DPRSend.sendQuickLink("", $('#nav-quicklinks').val());
          }
          catch(err) {
            alert("Invalid quick link.");
            aplace = this.getSubNavArray();
            loadXMLSection("","",aplace);
          }
        break;
      case 2: // book hierarchy
        aplace = this.getSubNavArray().map((x,y)=>(y<(category+1) || y>6 )?x:"x");
        loadXMLSection("","",aplace);
        break;
    }
  },

  makeWebAppropriate:(data)=>{ return data.replace(/openPlace\(\[(.*?)\],([^,]+),([^,]+),eventSend\(event,1\)\)/g,'loadXMLSection($2,$3,[$1])');}
}
