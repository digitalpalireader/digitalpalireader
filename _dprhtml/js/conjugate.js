var DPR_conjugate_mod = (function(){
async function insertConj() {
  var word = $('#word').val();
  var form = $('#form').val();

  appInsights.trackEvent({ name: 'convert',  properties: { word, form, }});


  var conjUrl = 'digitalpalireader/content/conjugate.htm'+(word.length?'?word='+DPR_translit_mod.toVel(word):'')+(form.length?(word?'&':'?')+'form='+DPR_translit_mod.toVel(form):'');
  DPR_PAL.contentWindow.history.pushState({}, 'Title', conjUrl);
  $('#word').val(DPR_translit_mod.toUni(word));
  $('#form').val(DPR_translit_mod.toUni(form));
  var out = await conjugateWord(word,form);
  $('#conjugation').html(out?out:'<span class="red">no conjugation found</span>');
}

function clearText() {
  $('#conjugation').empty();
  $('#word').val('');
  $('#form').val('');
}
return{
  insertConj:insertConj
}
}())
