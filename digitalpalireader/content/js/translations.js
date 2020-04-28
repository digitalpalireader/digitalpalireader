'use strict';

var DPR_Translations = (function () {

const trProps = {
  ati: {
    id: 0,
    baseUrl: `${DPR_PAL.toUrl(DPR_prefs['catiloc'])}/tipitaka`,
    icon: `ati.ico`,
    background: 'white',
  },
  abt: {
    id: 1,
    baseUrl: `https://www.ancient-buddhist-texts.net/Texts-and-Translations`,
    icon: `abt.gif`,
    background: 'rgb(255, 248, 240)',
  },
  bt: {
    id: 2,
    baseUrl: DPR_PAL.toUrl(DPR_prefs['btloc']),
    icon: `wisdom.png`,
    background: 'transparent',
  },
  dpr: {
    id: 3,
    baseUrl: `Not yet implemented`,
    icon: `?`,
    background: 'red',
  },
}

const resolveUri = sInfo => `${trProps[sInfo.type].baseUrl}/${sInfo.place}`;

const makeUri = sInfo => `${sInfo.type}://${Array.isArray(sInfo.place) ? sInfo.place.join('.') : sInfo.place}`;

const parsePlace = inplace => {
  const pparts = /^((ati|abt|bt):\/\/)?(.*)$/.exec(inplace);
  return pparts[2]
    ? { type: pparts[2], place: pparts[3], }
    : { type: 'dpr', place: makeLocPlace(pparts[3]), };
}

function transLink(which,where,url,title) {
  const type = Object
    .keys(trProps)
    .find(k => trProps[k].id === where);

  if (!type) {
    console.error('Unable to find id', where, 'in', trProps);
  }

  return `
    &nbsp;
    <span class="hoverShow pointer">
      <img width="16" style="vertical-align:middle" src="/digitalpalireader/content/images/${trProps[type].icon}" title="${title}" onmouseup="DPR_Send.openTranslation('${type}://${url}', eventSend(event))">
    </span>`;
}

function addtrans(hier,which,nikaya,book,meta,volume,vagga,sutta,section) {
  if (!DPR_prefs["ctrans"] || typeof(atiD) == 'undefined') return;

  var cnt = 0;
  var output = [];
  var a,b,c,d,e,j,k,l,m,w,x,y,z;

  var autha = [];
  autha['amar'] = "Amaravati";
  autha['bodh'] = "Bodhi";
  autha['bpit'] = "Burma&nbsp;Pitaka&nbsp;Assoc.";
  autha['budd'] = "Buddharakkhita";
  autha['harv'] = "Harvey";
  autha['hekh'] = "Hecker&nbsp;and&nbsp;Khema";
  autha['horn'] = "Horner";
  autha['irel'] = "Ireland";
  autha['kell'] = "Kelly";
  autha['khan'] = "Khantipalo";
  autha['ksw0'] = "Kelly,&nbsp;et&nbsp;al";
  autha['kuma'] = "Kumara";
  autha['mend'] = "Mendis";
  autha['nana'] = "Ñanananda";
  autha['nara'] = "Narada";
  autha['norm'] = "Norman";
  autha['ntbb'] = "Ñanamoli&nbsp;&&nbsp;Bodhi";
  autha['nymo'] = "Ñanamoli";
  autha['nypo'] = "Nyanaponika";
  autha['nysa'] = "Nyanasatta";
  autha['olen'] = "Olendzki";
  autha['piya'] = "Piyadassi";
  autha['rhyc'] = "C.&nbsp;Rhys-Davids";
  autha['soma'] = "Soma";
  autha['soni'] = "Soni";
  autha['than'] = "Thanissaro";
  autha['vaji'] = "Vajira&nbsp;&&nbsp;Story";
  autha['vaka'] = "Ñanavara&nbsp;and&nbsp;Kantasilo";
  autha['wlsh'] = "Walshe";
  autha['wood'] = "Woodward";
  autha['yaho'] = "Yahoo!&nbsp;Pali";

  switch (nikaya) {
    case 'v':

      if(hier != 'm')
        break;

      switch (book) {
        case 3:
          if (which == 3 && vagga == 0) {
            var surl = 'index.htm';
            var ssect = '';
          }
          else if (which == 0){
            switch (section) {
              case 0:
                var surl="01-Awakening-Tree.htm";
                break;
              case 1:
                var surl="02-Grumbling-Brahmana.htm";
                break;
              case 2:
                var surl="03-Mucalinda.htm";
                break;
              case 3:
                var surl="04-Tapussa-Bhallika.htm";
                break;
              case 4:
                var surl="05-Brahmas-Request.htm";
                break;
              case 5:
                var surl="06-Deciding.htm";
                break;
              case 6:
                var surl="12-Yasas-Going-Forth.htm";
                break;
              case 7:
                var surl="17-Mara.htm";
                break;
              case 8:
                var surl="18-Ordination-Three-Refuges.htm";
                break;
              case 9:
                var surl="19-Second-Mara.htm";
                break;
              case 10:
                var surl="20-Good-Group.htm";
                break;
              case 11:
                var surl="21-First-Miracle-Prose.htm";
                break;
              case 12:
                var surl="39-King-Bimbisara.htm";
                break;
              case 13:
                var surl="41-Sariputta-Moggallana.htm";
                break;
              case 14:
                var surl="42-Sons.htm";
                break;
            }
          }
          if (surl) {
            output.push(transLink(which,1,'Mahakhandhako/'+surl,'Translation of Mahakhandhako by Anandajoti'));
            cnt++;
          }
          break;
        break;
      }
    break;
    case 'd':

      if(hier != 'm')
        break;

      if (which == 1) return null;
      switch (book) {
        case 0:
          book = 1;
          break;
        case 1:
          book = 14;
          break;
        case 2:
          book = 24;
          break;
      }
      var mysn = book+vagga;

      // BuddhistTexts
      if(DPR_prefs['buddhist_texts'] && (which == 3 || which == 0)) {
        output.push(transLink(which,2,'dn/dn_e_'+mysn+'.htm','Translation of DN '+mysn+' by Walshe'));
        cnt++;
      }

      // ATI
      if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {
        var mys = mysn + "";
        if (mys.length < 2) { mys = '0'+mys; }
        var atid = 'dn/dn.'+mys;
        for (var x = 0;x < atiD.length; x++) {
          if (atiD[x].indexOf(atid)==0) {
            var auth = atiD[x].split('.')[3];
            if (autha[auth]) {auth = autha[auth];}
            output.push(transLink(which,0,atiD[x],'Translation of DN '+mysn+' by '+auth));
            cnt++;
          }
        }
      }
      // abt

      if (mysn == 16) {
        if (which > 0) {
            var surl = [ 'index.htm' ];
            var ssect = '';
          }
        else {
          var ssect = '.' + (section+1);
          switch (section) {
            case 0: case 1:
              var surl = [ '01-King-Ajatasattu.htm' ];
              break;
            case 2:
              var surl = [ '02-Prevent-Vajji-Decline.htm' ];
              break;
            case 3:
              var surl = [ '03-Prevent-Community-Decline-1.htm', '04-Prevent-Community-Decline-2.htm', '05-Prevent-Community-Decline-3.htm', '06-Prevent-Community-Decline-4.htm', '07-Prevent-Community-Decline-5.htm', '08-Prevent-Community-Decline-6.htm', '09-Ambalatthika.htm' ];
              break;
            case 4:
              var surl = [ '10-Sariputta.htm' ];
              break;
            case 5:
              var surl = [ '11-Virtue.htm' ];
              break;
            case 6:
              var surl = [ '11-Virtue.htm' ];
              break;
            case 7:
              var surl = [ '12-Building.htm' ];
              break;
            case 8:
              var surl = [ '13-Truths.htm' ];
              break;
            case 9:
              var surl = [ '14-Mirror.htm' ];
              break;
            case 10:
              var surl = [ '14-Mirror.htm', '15-Ambapali.htm' ];
              break;
            case 11:
              var surl = [ '15-Ambapali.htm' ];
              break;
            case 12:
              var surl = [ '16-Sickness.htm' ];
              break;
            case 13:
              var surl = [ '17-Ananda%27s-Failure.htm' ];
              break;
            case 14: case 15:
              var surl = [ '18-Relinquishment.htm' ];
              break;
            case 16:
              var surl = [ '19-Earthquakes.htm' ];
              break;
            case 17:
              var surl = [ '20-Assemblies.htm' ];
              break;
            case 18:
              var surl = [ '21-Mind-Mastery.htm' ];
              break;
            case 19:
              var surl = [ '22-Liberations.htm', '23-Ananda%27s-Fault.htm' ];
              break;
            case 20:
              var surl = [ '23-Ananda%27s-Fault.htm', '24-Ananda-at-Rajagaha.htm', '25-Ananda-at-Vesali.htm', '26-Thirty-Seven-Things.htm' ];
              break;
            case 21:
              var surl = [ '27-Noble-Things.htm' ];
              break;
            case 22:
              var surl = [ '28-References.htm' ];
              break;
            case 23:
              var surl = [ '29-Last-Meal.htm' ];
              break;
            case 24:
              var surl = [ '30-Drinking-Water.htm' ];
              break;
            case 25:
              var surl = [ '31-Pukkusa.htm', '32-Cunda.htm' ];
              break;
            case 26:
              var surl = [ '33-Worshipping.htm' ];
              break;
            case 27:
              var surl = [ '34-Divinities.htm' ];
              break;
            case 28: case 29: case 30:
              var surl = [ '35-Four-Places.htm' ];
              break;
            case 31:
              var surl = [ '36-Ananda%27s-Qualities.htm' ];
              break;
            case 32:
              var surl = [ '37-Kusinara.htm' ];
              break;
            case 33:
              var surl = [ '38-Mallas.htm' ];
              break;
            case 34:
              var surl = [ '39-Subhadda.htm' ];
              break;
            case 35:
              var surl = [ '40-Last-Instructions.htm' ];
              break;
            case 36:
              var surl = [ '41-Final-Emancipation.htm', '42-Preperation-of-Body.htm' ];
              break;
            case 37:
              var surl = [ '42-Preperation-of-Body.htm' ];
              break;
            case 38:
              var surl = [ '43-Mahakassapa.htm' ];
              break;
            case 39: case 40:
              var surl = [ '44-Distribution.htm' ];
              break;
          }
        }
        surl.forEach(x => {
          output.push(transLink(which,1,'Mahaparinibbanasuttam/'+x,'Translation of DN 16'+ssect+' by Anandajoti'));
          cnt++;
        });
      }
      if (mysn == 22) {
        if (which > 0) {
            var surl = 'index.htm';
            var ssect = '';
          }
        else {
          var ssect = '.' + (section+1);
          var surl = 'Satipatthana-';
          var sect0;
          switch (true) {
            case (section <= 6):
              sect0 = '0' + (section+1);
              break;
            case (section > 6):
              sect0 = section + 9;
              break;
          }
          surl += sect0 + '.htm';
        }
        output.push(transLink(which,1,'Satipatthana/'+surl,'Translation of DN 22'+ssect+' by Anandajoti'));
        cnt++;
      }
      break;
    case 'm':

      if(hier != 'm')
        break;

      if (which == 3 || which == 1) return null;
      var mysn = ((book)*50)+(vagga*10)+(sutta+1)
      if (mysn > 141 && vagga == 4) mysn += 2;

      // BuddhistTexts

      if(DPR_prefs['buddhist_texts'] && which < 3) {
        output.push(transLink(which,2,'mn/mn_e_'+mysn+'.htm','Translation of MN '+mysn+' by Bodhi'));
        cnt++;
      }

      if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {
        mys = mysn + "";
        while (mys.length < 3) { mys = '0'+mys; }
        var atim = 'mn/mn.'+mys;
        for (var x = 0;x < atiM.length; x++) {
          var auth = atiM[x].split('.')[2];
          if (autha[auth]) {auth = autha[auth];}
          if (atiM[x].indexOf(atim)==0) {
            output.push(transLink(which,0,atiM[x],'Translation of MN '+mysn+' by '+auth));
            cnt++;
          }
        }
      }
    break;
    case 'a':

      if(hier != 'm')
        break;

      var bookn = book+1;
      if (!section) section = 0;

      // BuddhistTexts
      if(DPR_prefs['buddhist_texts'] && (which == 6 || which == 0)) {
        var n = which == 0 ? getSuttaNumber(nikaya,book,meta,volume,vagga,sutta,section,hier,0,0).replace(/^[^.]*\./,'') : '';

        output.push(transLink(which,2,'an/an_e_'+(book+1)+'.htm'+(which == 0?'#s'+n:''),'Translation of AN '+(book+1)+(which == 0?'.'+n:'')+' by Bodhi'));
        cnt++;
      }
      if (which > 1) return null;

      //ATI

      if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {


        var z = amlist[book][vagga][sutta][section];
        out:
        for (var a = 0;a < atiA.length; a++) {
          if(parseInt(atiA[a].split('/')[1].substring(2),10) == bookn) {
            var atiAs = atiA[a].split('.');
            if(atiAs[1].indexOf('-')>=0) b=atiAs[1].split('-');
            else {b=null;}
            for (var aa = 0;aa < z.length; aa++) {

              var bb = z[aa];

              var atiNo = atiAs[1];

              c=parseInt(bb,10);
              d=''+bb;
              while (d.length < 3) { d = '0'+d; }

              // fudges

              if (bookn == 3) {
                atiNo = parseInt(atiNo,10);
                if(atiNo >= 33) { // sāriputtasutta
                  atiNo++;
                }
                if(atiNo >= 40) { // sāriputtasutta
                  atiNo--;
                }
                if(atiNo >= 48) { // asankhata sutta
                  atiNo++;
                }
                if (atiNo >= 81) { // gadrabha sutta
                  atiNo++;
                }
                if (atiNo == 102 && atiAs[2] == '11-15' || atiNo > 102) { // nimitta sutta
                  atiNo++;
                }

                atiNo = atiNo+'';
                while(atiNo.length < 3) { atiNo='0'+atiNo; }
              }
              else if (bookn == 4) {
                atiNo = parseInt(atiNo,10);
                atiNo = atiNo+'';
                while(atiNo.length < 3) { atiNo='0'+atiNo; }
              }
              else if (bookn == 7) {
                atiNo = parseInt(atiNo,10);
                if(atiNo >= 31) { // parābhava sutta
                  atiNo++;
                }
                if(atiNo >= 41) { // paṭhamaniddasasuttaṃ
                  atiNo++;
                }
                if(atiNo >= 42) { // dutiyaniddasasuttaṃ
                  atiNo++;
                }
                if (atiNo == 62 && atiAs[2] == 'b' || atiNo > 62) { // bhariyā sutta
                  atiNo++;
                }

                atiNo = atiNo+'';
                while(atiNo.length < 3) { atiNo='0'+atiNo; }
              }
              else if (bookn == 11) {
                atiNo = parseInt(atiNo,10);
                if(atiNo == 7 || atiNo == 8) { // saññāsutta - DPR has both in one sutta, ATI (PTS) split them
                  atiNo = 7;
                }
                if(atiNo > 8) { // saññāsutta
                  atiNo--;
                }

                atiNo = atiNo+'';
                while(atiNo.length < 3) { atiNo='0'+atiNo; }
              }

              if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiNo.indexOf(d)==0)) {
                if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                else {var sno = c;}
                if(atiAs[4] == 'html') { var auth = atiAs[3]; }
                else { var auth = atiAs[2]; }
                if (autha[auth]) {auth = autha[auth];}
                output.push(transLink(which,0,atiA[a],'Translation of AN '+ (book+1) +'.'+bb+' by '+auth));
                cnt++;
                continue out;
              }
            }
          }
        }
      }
    break;
    case 's':

      if(hier != 'm')
        break;

      var bookn = book+1;

      if (bookn > 1) {vagga+=11;}
      if (bookn > 2) {vagga+=10;}
      if (bookn > 3) {vagga+=13;}
      if (bookn > 4) {vagga+=10;}

      // BuddhistTexts


      if(DPR_prefs['buddhist_texts'] && (which == 3 || which == 0)) {
        output.push(transLink(which,2,'sn/sn_e_'+(vagga+1)+'.htm','Translation of SN '+(vagga+1)+' by Bodhi'));
        cnt++;
      }

      if (which > 1) return null;

      //ATI

      if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {

        var countc = smlist[vagga][sutta][section];

        //if(bookn == 5) document.getElementById('mafbc').innerHTML += vagga+' '+sutta+'|';

        //document.getElementById('difb').innerHTML += countc;

        out:
        for (var a = 0;a < atiS.length; a++) {
          if(parseInt(atiS[a].split('/')[1].substring(2),10) == (vagga+1)) {
            if(atiS[a].split('.')[1].indexOf('-')>=0) b=atiS[a].split('.')[1].split('-');
            else {b=null;}
            var bb = countc;
            c=parseInt(bb,10);
            d=bb+"";
            while (d.length < 3) { d = '0'+d; }
            if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiS[a].split('.')[1].indexOf(d)==0)) {
              if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
              else {var sno = c;}
              var auth = atiS[a].split('.')[2];
              if (autha[auth]) {auth = autha[auth];}
              output.push(transLink(which,0,atiS[a],'Translation of SN '+ (vagga+1) +'.'+bb+' by '+auth));
              cnt++;
              continue out;
            }
          }
        }
      }
    break;
    case 'k':
      if (which > 0) return null;
      var bookn = book+1;

      switch (bookn) {
        case 1: // kp

          if(hier != 'm')
            break;


          if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {
          // kn/khp/khp.1-9.than.html
            out:
            for (var a = 0;a < atiK.length; a++) {
              if(atiK[a].split('/')[1] == 'khp') {
                if(atiK[a].split('.')[1].indexOf('-')>=0) b=atiK[a].split('.')[1].split('-');
                else {b=null;}
                c=section+1;
                if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[1].indexOf(c)==0)) {
                  if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                  else {var sno = c;}
                  var auth = atiK[a].split('.')[2];
                  if (autha[auth]) {auth = autha[auth];}
                  output.push(transLink(which,0,atiK[a],'Translation of Khp '+sno+' by '+auth));
                  cnt++;
                  continue out;
                }
              }
            }
          }
          output.push(transLink(which,1,'Khuddakapatha/Khuddakapatha.htm','Translation of KhP by Anandajoti'));
          cnt++;
        break;
        case 2: // dhp

          if(hier == 'm') {

            if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {

              // kn/dhp/dhp.24.budd.html
              //alert(vagga + ' ' + sutta + ' ' + section);
              out:
              for (var a = 0;a < atiK.length; a++) {
                if(atiK[a].split('/')[1] == 'dhp') {
                  d=(vagga+1)+"";
                  if (d.length < 2) { d = '0'+d; }
                  if(atiK[a].split('.')[1].indexOf(d)==0) {
                    var sno = vagga+1;
                    var auth = atiK[a].split('.')[2];
                    if (autha[auth]) {auth = autha[auth];}
                    output.push(transLink(which,0,atiK[a],'Translation of Dhp '+sno+' by '+auth));
                    cnt++;
                    continue out;
                  }
                }
              }
            }
          }

          // BuddhistTexts
          if(DPR_prefs['buddhist_texts'] && hier == 'a') {

            var dhpVaggas = [1,14,9,9,12,15,11,10,14]; // stories per vagga (first section)

            var dhpVaggas2 = [12,11,9,10,11,9,8,9,8,12,10,12,9,9,8,12,12,40,1]; // stories per vagga (second section)

            var story = 0;

            if(volume == 1) { // second section
              for(var i = 0; i < dhpVaggas.length; i++) {
                story += dhpVaggas[i];
              }
              dhpVaggas = dhpVaggas2;
            }

            for(var i = 0; i < vagga; i++) {
              story += dhpVaggas[i];
            }

            story += sutta;

            output.push(transLink(which,2,'dhpa/dhpa_e_'+(parseInt(story)+1)+'.htm','Translation of Dhp-A '+story+' by Burlingame'));
            cnt++;
          }


        break;
        case 3: // uda

          if(hier != 'm')
            break;

          // ATI

          if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {


            // kn/ud/ud.2.01.irel.html
            out:
            for (var a = 0;a < atiK.length; a++) {
              if(atiK[a].split('/')[1] == 'ud' && (vagga+1) == atiK[a].split('.')[1]) {
                if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
                else {b=null;}
                c=section+1;
                d=c+"";
                if (d.length < 2) { d = '0'+d; }
                if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
                  if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                  else {var sno = c;}
                  var auth = atiK[a].split('.')[3];
                  if (autha[auth]) {auth = autha[auth];}
                  if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                  output.push(transLink(which,0,atiK[a],'Translation of Uda '+(vagga+1)+'.'+sno+' by '+auth));
                  cnt++;
                  continue out;
                }
              }
            }
          }

          // Anandajoti

          if (which > 0) {
              var surl = 'index.htm';
              var ssect = '';
            }
          else {
            var ssect = (vagga+1) + '.' + (section+1);
            switch (vagga) {
              case 0:
              var surl = '1-Bodhivaggo-';
              break;
              case 1:
              var surl = '2-Mucalindavaggo-';
              break;
              case 2:
              var surl = '3-Nandavaggo-';
              break;
              case 3:
              var surl = '4-Meghiyavaggo-';
              break;
              case 4:
              var surl = '5-Sonavaggo-';
              break;
              case 5:
              var surl = '6-Jaccandhavaggo-';
              break;
              case 6:
              var surl = '7-Cullavaggo-';
              break;
              case 7:
              var surl = '8-Pataligamiyavaggo-';
              break;
            }
            var sect0 = (section+1);
            if (sect0 < 10) { sect0 = '0'+sect0; }
            surl += sect0 + '.htm';
          }
          output.push(transLink(which,1,'Udana/'+surl,'Translation of Udana '+ssect+' by Anandajoti'));
          cnt++;
        break;
        case 4: // iti

          if(hier != 'm')
            break;

          if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {


            // kn/iti/iti.1.001-027.than.html
            section += (sutta*10);
            switch (vagga) {
              case 1:
                section += 27;
                break;
              case 2:
                section += 49;
                break;
              case 3:
                section += 99;
                break;
            }
            out:
            for (var a = 0;a < atiK.length; a++) {
              if(atiK[a].split('/')[1] == 'iti' && (vagga+1) == atiK[a].split('.')[1]) {
                if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
                else {b=null;}
                c=section+1;
                d=c+"";
                if (d.length < 3) { d = '0'+d; }
                if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
                  if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                  else {var sno = c;}
                  var auth = atiK[a].split('.')[3];
                  if (autha[auth]) {auth = autha[auth];}
                  output.push(transLink(which,0,atiK[a],'Translation of Iti '+sno+' by '+auth));
                  cnt++;
                  continue out;
                }
              }
            }
          }
        break;
        case 5: // sn

          if(hier != 'm')
            break;


          if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {

            // kn/snp/snp.4.16.than.html
            if (vagga == 4) section--;

            out:
            for (var a = 0;a < atiK.length; a++) {
              if(atiK[a].split('/')[1] == 'snp' && (vagga+1) == atiK[a].split('.')[1]) {
                if(atiK[a].split('.')[2].indexOf('-')>=0) b=atiK[a].split('.')[2].split('-');
                else {b=null;}
                c=section+1;
                d=c+"";
                if (d.length < 2) { d = '0'+d; }
                if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
                  if (b) {var sno = b[0].replace(/^0/g,'') +"-"+ b[1].replace(/^0/g,'');}
                  else {var sno = c;}
                  var auth = atiK[a].split('.')[3];
                  if (autha[auth]) {auth = autha[auth];}
                  output.push(transLink(which,0,atiK[a],'Translation of Sn '+(vagga+1)+'.'+sno+' by '+auth));
                  cnt++;
                  continue out;
                }
              }
            }
          }

          if (vagga == 4) {
            output.push(transLink(which,1,'Parayanavagga/index.htm','Translation of Sn 5 by Anandajoti'));
            cnt++;
          }
        break;
        case 6: // Vv

          if(hier != 'm')
            break;

          if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {


            // kn/ud/ud.2.01.irel.html
            if (vagga == 1) {sutta +=4;}
            out:
            for (var a = 0;a < atiK.length; a++) {
              if(atiK[a].split('/')[1] == 'vv' && (sutta+1) == atiK[a].split('.')[1]) {
                if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
                else {b=null;}
                c=section+1;
                d=c+"";
                if (d.length < 2) { d = '0'+d; }
                if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
                  if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                  else {var sno = c;}
                  var auth = atiK[a].split('.')[3];
                  if (autha[auth]) {auth = autha[auth];}
                  if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                  output.push(transLink(which,0,atiK[a],'Translation of Vv '+(sutta+1)+'.'+sno+' by '+auth));
                  cnt++;
                  continue out;
                }
              }
            }
          }
        break;
        case 7: // Pv

          if(hier != 'm')
            break;

          if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {
            // kn/ud/ud.2.01.irel.html
            out:
            for (var a = 0;a < atiK.length; a++) {
              if(atiK[a].split('/')[1] == 'pv' && (vagga+1) == atiK[a].split('.')[1]) {
                if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
                else {b=null;}
                c=section+1;
                d=c+"";
                if (d.length < 2) { d = '0'+d; }
                if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
                  if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                  else {var sno = c;}
                  var auth = atiK[a].split('.')[3];
                  if (autha[auth]) {auth = autha[auth];}
                  if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                  output.push(transLink(which,0,atiK[a],'Translation of Pv '+(vagga+1)+'.'+sno+' by '+auth));
                  cnt++;
                  continue out;
                }
              }
            }
          }
        break;
        case 8: // Tha

          if(hier != 'm')
            break;

          if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {

            // kn/ud/ud.2.01.irel.html
            section += (sutta*10);
            //alert(vagga + ' ' + sutta + ' ' + section);
            out:
            for (var a = 0;a < atiK.length; a++) {
              if(atiK[a].split('/')[1] == 'thag' && vagga == atiK[a].split('.')[1]) {
                if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
                else {b=null;}
                c=section+1;
                d=c+"";
                if (d.length < 2) { d = '0'+d; }
                if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
                  if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                  else {var sno = c;}
                  var auth = atiK[a].split('.')[3];
                  if (autha[auth]) {auth = autha[auth];}
                  if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                  output.push(transLink(which,0,atiK[a],'Translation of Thag '+vagga+'.'+sno+' by '+auth));
                  cnt++;
                  continue out;
                }
              }
            }
          }
        break;
        case 9: // Thi

          if(hier != 'm')
            break;

          if(DPR_prefs['catioff'] && typeof(atiD) != 'undefined') {
            // kn/ud/ud.2.01.irel.html
            //alert(vagga + ' ' + sutta + ' ' + section);
            out:
            for (var a = 0;a < atiK.length; a++) {
              if(atiK[a].split('/')[1] == 'thig' && (vagga+1) == atiK[a].split('.')[1]) {
                if(atiK[a].split('.')[2].indexOf('-')>=0) {b=atiK[a].split('.')[2].split('-');}
                else {b=null;}
                c=section+1;
                d=c+"";
                if (d.length < 2) { d = '0'+d; }
                if((b && c >= parseInt(b[0].replace(/(^0*|x)/g,''),10) && c <= parseInt(b[1].replace(/(^0*|x)/g,''),10)) || (!b && atiK[a].split('.')[2].indexOf(d)==0)) {
                  if (b) {var sno = b[0].replace(/^0*/g,'') +"-"+ b[1].replace(/^0*/g,'');}
                  else {var sno = c;}
                  var auth = atiK[a].split('.')[3];
                  if (autha[auth]) {auth = autha[auth];}
                  if (atiK[a] == 'kn/ud/ud.6.09.olen.html') { atiK[a] = 'kn/ud/ud.6.09-olen.html';}
                  output.push(transLink(which,0,atiK[a],'Translation of Thig '+(vagga+1)+'.'+sno+' by '+auth));
                  cnt++;
                  continue out;
                }
              }
            }
          }
        break;
        case 14: // Jat
          // BuddhistTexts
          if(DPR_prefs['buddhist_texts']) {
            var jat = getSuttaNumber(nikaya,book,meta,volume,vagga,sutta,section,'m',1,false).replace(/^[^.]+\./,'');
            output.push(transLink(which,2,'ja/ja_e_'+(parseInt(jat)+6)+'.htm','Translation of Jat '+jat+' by Cowell'));
            cnt++;
          }
        break
        case 15: // Jat
          // BuddhistTexts
          if(DPR_prefs['buddhist_texts']) {
            var jat = getSuttaNumber(nikaya,book,meta,volume,vagga,sutta,section,'m',1,false).replace(/^[^.]+\./,'');
            output.push(transLink(which,2,'ja/ja_e_'+(parseInt(jat)+6)+'.htm','Translation of Jat '+jat+' by Cowell'));
            cnt++;
          }
        break;
        case 16: // MNi
        break;
        case 19: // Mil
        break;
      }
    break;
    case 'x': // vism

      if(hier != 'm')
        break;

      // BuddhistTexts
      if(DPR_prefs['buddhist_texts']) {
        if(book == 1)
          meta += 12;

        output.push(transLink(which,2,'vi/vi_e_'+(parseInt(meta)+1)+'.htm','Translation of Vism '+meta+' by Nyanamoli'));
        cnt++;
      }

    break;
  }
  if (cnt > 0) { return output; }
}

return {
  trProps: Object.freeze(trProps),
  parsePlace: parsePlace,
  addtrans: addtrans,
  resolveUri: resolveUri,
  makeUri: makeUri,
};

})();
