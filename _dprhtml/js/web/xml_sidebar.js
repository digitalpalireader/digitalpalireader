'use strict';

const DPR_Web_Xml_Sidebar = (function () {
  async function updateHierarchy(depth) { // depth: 4=section, 3=sutta..., 2=vagga..., 1=volume..., 0=all
    if (window.DPR_Globals.NavigationTabViewModel.updatingHierarchy) {
      return;
    }

    window.DPR_Globals.NavigationTabViewModel.updatingHierarchy = true;

    var nikaya = window.DPR_Globals.NavigationTabViewModel.set();
    var book = window.DPR_Globals.NavigationTabViewModel.book();
    var nikbookhier = nikaya + book + DPR_G.G_hier;
    var xmlDoc = await XML_Load.loadXMLFileAsync(nikbookhier, 0);

    var meta = (depth > 0  ? window.DPR_Globals.NavigationTabViewModel.meta() : 0);
    var volume = (depth > 1 ? window.DPR_Globals.NavigationTabViewModel.volume() : 0);
    var vagga = (depth > 2 ? window.DPR_Globals.NavigationTabViewModel.vagga() : 0);
    var sutta = (depth > 3 ? window.DPR_Globals.NavigationTabViewModel.sutta() : 0);

    var axml,name,namea;

    axml = xmlDoc.getElementsByTagName("ha");
    namea = axml[0].getElementsByTagName("han");
    if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/,'').replace(/^  */, '').replace(/  *$/,'');
    else name = this.unnamed;
    var outname = DPR_translit_mod.translit(DPR_translit_mod.toUni(name));
    window.DPR_Globals.NavigationTabViewModel.navTitle(outname);

    var u = xmlDoc.getElementsByTagName("h0");
    var v = u[meta].getElementsByTagName("h1");
    var w = v[volume].getElementsByTagName("h2");
    var x = w[vagga].getElementsByTagName("h3");
    var y = x[sutta].getElementsByTagName("h4");

    switch(true) {
      case (depth < 1): // remake meta list
        window.DPR_Globals.NavigationTabViewModel.meta(0);
        this.updateDepth(u, window.DPR_Globals.NavigationTabViewModel.navMeta, 'h0n');
        // fall through.

      case (depth < 2): // remake volume list
        window.DPR_Globals.NavigationTabViewModel.volume(0);
        this.updateDepth(v, window.DPR_Globals.NavigationTabViewModel.navVolume, 'h1n');
        // fall through.

      case (depth < 3): // remake vaggalist
        window.DPR_Globals.NavigationTabViewModel.vagga(0);
        this.updateDepth(w, window.DPR_Globals.NavigationTabViewModel.navVagga, 'h2n');
        // fall through.

      case (depth < 4): // remake sutta list on depth = 0, 1, 2, or 3
        window.DPR_Globals.NavigationTabViewModel.sutta(0);
        this.updateDepth(x, window.DPR_Globals.NavigationTabViewModel.navSutta, 'h3n');
        // fall through.

      case (depth < 5): // remake section list
        window.DPR_Globals.NavigationTabViewModel.section(0);
        this.updateDepth(y, window.DPR_Globals.NavigationTabViewModel.navSection, 'h4n');
        break;

      default:
        console.error('Unsupported depth', depth);
    }

    window.DPR_Globals.NavigationTabViewModel.updatingHierarchy = false;
  }

  function updateDepth(heir, selectList, tag) {
    const lista = this.makeTitleSelect(heir, tag);
    const entries = lista.map((e, i) => ({ value: i, label: e }));
    selectList.removeAll();
    selectList(entries);
  }

  async function updateSearchHierarchyAfterSetSearchBookList(depth) {
    await DPRNav.setSearchBookList();
    await this.updateSearchHierarchy(depth);
  }

  async function updateSearchHierarchy(depth) { // depth: 4=section, 3=sutta..., 2=vagga..., 1=volume..., 0=all
    document.activeElement.blur();

    var nikaya = $('#tsoSETm').val();
    var book = $('#tsoBOOKm').val();
    var hiert = $('#tsoMAT2m').val();
    var nikbookhier = nikaya + book + hiert;

    var xmlDoc = await XML_Load.loadXMLFileAsync(nikbookhier, 0);

    if (xmlDoc === null){
      console.error('Error loading file', e)
      DPR_prefload_mod.saveSearchSettings(DPR_G.DPR_prefsinfo[DPR_prefload_mod.searchSettingsKeyName].defaultValue);
      return;
    }

    var nik = nikaya;

    var meta = (depth > 0 ? $('#tsoPmeta').prop('selectedIndex') : 0);
    var volume = (depth > 1 ? $('#tsoPvolume').prop('selectedIndex') : 0);
    var vagga = (depth > 2 ? $('#tsoPvagga').prop('selectedIndex') : 0);
    var sutta = (depth > 3 ? $('#tsoPsutta').prop('selectedIndex') : 0);

    var xml, axml, lista, list, name, namea;

    axml = xmlDoc.getElementsByTagName("ha");
    namea = axml[0].getElementsByTagName("han");
    if (namea[0].childNodes[0] && namea[0].textContent.length > 1) name = namea[0].textContent.replace(/\{.*\}/, '').replace(/^  */, '').replace(/  *$/, '');
    else name = this.unnamed;
    var outname = DPR_translit_mod.translit(DPR_translit_mod.toUni(name));

    var u = xmlDoc.getElementsByTagName("h0");
    var v = u[meta].getElementsByTagName("h1");
    var w = v[volume].getElementsByTagName("h2");
    var x = w[vagga].getElementsByTagName("h3");
    var y = x[sutta].getElementsByTagName("h4");

    switch (true) {
      case (depth == 0): // remake meta list
        lista = this.makeTitleSelect(u, 'h0n');

        var listNode = $('#tsoPmeta');
        window.DPR_Globals.SearchTabViewModel.metaList.removeAll();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          window.DPR_Globals.SearchTabViewModel.metaList.push({label: this.unnamed, value: 0});
          $('#tsoP1').hide();
        }

        else {
          for (var idx in lista) {
            window.DPR_Globals.SearchTabViewModel.metaList.push({label: lista[idx], value: idx});
          }
          $('#tsoP1').show();
        }
      case (depth < 2): // remake volume list
        lista = this.makeTitleSelect(v, 'h1n');
        var listNode = $('#tsoPvolume');
        listNode.empty();
        window.DPR_Globals.SearchTabViewModel.volumeList.removeAll();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          window.DPR_Globals.SearchTabViewModel.volumeList.push({label: this.unnamed, value: 0});
          $('#tsoP2').hide();
        } else {
          for (var idx in lista) {
            window.DPR_Globals.SearchTabViewModel.volumeList.push({label: lista[idx], value: idx});
          }
          $('#tsoP2').show();
        }

      case (depth < 3): // remake vaggalist
        lista = this.makeTitleSelect(w, 'h2n');
        var listNode = $('#tsoPvagga');
        window.DPR_Globals.SearchTabViewModel.vaggaList.removeAll();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          window.DPR_Globals.SearchTabViewModel.vaggaList.push({label: this.unnamed, value: 0});
          $('#tsoP3').hide();
        } else {
          for (var idx in lista) {
            window.DPR_Globals.SearchTabViewModel.vaggaList.push({label: lista[idx], value: idx});
          }
          $('#tsoP3').show();
        }
      case (depth < 4): // remake sutta list on depth = 0, 2, or 3
        lista = this.makeTitleSelect(x, 'h3n');
        window.DPR_Globals.SearchTabViewModel.suttaList.removeAll();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          window.DPR_Globals.SearchTabViewModel.suttaList.push({label: this.unnamed, value: 0});
          $('#tsoP4').hide();
        } else {
          for (var idx in lista) {
            window.DPR_Globals.SearchTabViewModel.suttaList.push({label: lista[idx], value: idx});
          }
          $('#tsoP4').show();
        }
      default: // remake section list

        lista = this.makeTitleSelect(y, 'h4n');

        window.DPR_Globals.SearchTabViewModel.sectionList.removeAll();

        if (lista.length == 1 && lista[0] == this.unnamed) {
          window.DPR_Globals.SearchTabViewModel.sectionList.push({label: this.unnamed, value: 0});
          $('#tsoP5').hide();
        } else {
          for (var idx = 0; idx < lista.length; idx++) {
            window.DPR_Globals.SearchTabViewModel.sectionList.push({label: lista[idx], value: idx});
          }
          $('#tsoP5').show();
        }
        break;
    }

    if ($('#tsoPart input[name=tsoPR]:visible').length > 0 && $('#tsoPart input[name=tsoPR]:visible:checked').length == 0) {
      window.DPR_Globals.SearchTabViewModel.partialValue($('#tsoPart input[name=tsoPR]:visible:first')[0].value);
    }

  }

  function makeTitleSelect(xml, tag) { // output menupopup tag with titles in menuitems
    var name, namea;
    var outlist = [];
    for (var a = 0; a < xml.length; a++) {
      name = xml[a].getElementsByTagName(tag);
      if (name[0].childNodes[0] && name[0].textContent.replace(/ /g, '').length > 0) namea = name[0].textContent.replace(/\{.*\}/, '').replace(/^  */, '').replace(/  *$/, '');
      else {
        namea = this.unnamed;
        outlist.push(namea);
        continue;
      }

      namea = DPR_translit_mod.translit(DPR_translit_mod.toUni(namea));

      outlist.push(namea);
    }
    return outlist;
  }

  var unnamed = DPR_G.G_unnamed

  return {
    updateHierarchy,
    updateDepth,
    updateSearchHierarchyAfterSetSearchBookList,
    updateSearchHierarchy,
    makeTitleSelect,
    unnamed,
  }
})()

window.DPRXML = DPR_Web_Xml_Sidebar
