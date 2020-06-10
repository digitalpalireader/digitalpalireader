var DPR_conjugate_mod = (function(){
async function insertConj() {
  var word = $('#word').val();
  var form = $('#form').val();

  appInsights.trackEvent({ name: 'convert',  properties: { word, form, }});


  var conjUrl = 'digitalpalireader/content/conjugate.htm'+(word.length?'?word='+toVel(word):'')+(form.length?(word?'&':'?')+'form='+toVel(form):'');
  DPR_PAL.contentWindow.history.pushState({}, 'Title', conjUrl);
  $('#word').val(toUni(word));
  $('#form').val(toUni(form));
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
