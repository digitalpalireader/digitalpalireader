var PaliWord = function(hyperlink, spell, category, isProperName, isToolTip, toolTipDef)
{
  spell = spell.replace(/aa/g, '&#257;');
  spell = spell.replace(/ii/g, '&#299;');
  spell = spell.replace(/uu/g, '&#363;');
  spell = spell.replace(/\,t/g, '&#7789;');
  spell = spell.replace(/\,d/g, '&#7693;');
  spell = spell.replace(/\`n/g, '&#7749;');
  spell = spell.replace(/\,n/g, '&#7751;');
  spell = spell.replace(/\,m/g, '&#7747;');
  spell = spell.replace(/\~n/g, '&ntilde;');
  spell = spell.replace(/\,l/g, '&#7735;');
  spell = spell.replace(/AA/g, '&#256;');
  spell = spell.replace(/II/g, '&#298;');
  spell = spell.replace(/UU/g, '&#362;');
  spell = spell.replace(/\,T/g, '&#7788;');
  spell = spell.replace(/\,D/g, '&#7692;');
  spell = spell.replace(/\,N/g, '&#7750;');
  spell = spell.replace(/\,M/g, '&#7746;');
  spell = spell.replace(/\~N/g, '&Ntilde;');
  spell = spell.replace(/\,L/g, '&#7734;');

       // periods are regular expressions
       // so we changed them to commas
       // for velthius match - here we change them back
  spell = spell.replace(/,/g, '.');
  spell = spell.replace(/q/g, ',');

  this.hyperlink = hyperlink;
  this.spell = spell;
  this.category = category;
  this.isProperName = isProperName;
  this.isToolTip = isToolTip;
  this.toolTipDef = toolTipDef;
};
