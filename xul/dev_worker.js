importScripts('js/xml_load.js','js/navigation_common.js"></script>
<script language="JavaScript1.3" type="text/javascript" src="js/navigation.js');

// ATT & TIK Creation


onmessage = function(event) {

  self.postMessage(DMakeAttArrayWork(event.data));

};

function DMakeAttArrayWork(xmlDoc)
{
  var getstring = /\^b\^[^^]+\^eb\^/;

  var u = xmlDoc.getElementsByTagName("h0");

  var gotstring;

  var outa = [];

  var intext = '';

  var finalout = '';

  var match = 0;

  for (var a = 0; a < u.length; a++) // per h0
  {
    var v = u[a].getElementsByTagName("h1");

    for (var b = 0; b < v.length; b++) // per h1
    {
      var w = v[b].getElementsByTagName("h2");

      for (var c = 0; c < w.length; c++) // per h2
      {


        var x = w[c].getElementsByTagName("h3");


        for (var d = 0; d < x.length; d++) // per h3
        {


          var y = x[d].getElementsByTagName("h4");

          for (var e = 0; e < y.length; e++) // per h4
          {
            window.dump(a+','+b+','+c+','+d+','+e+'\n');

            var z = y[e].getElementsByTagName("p");

            for (var f = 0; f < z.length; f++) // per paragraph
            {


              intext = z[f].textContent.substring(4);

              startmatch = intext.search(getstring);

              if (startmatch >= 0)
              {
                while (startmatch >= 0)
                {
                  match = 1;
                  gotstring = intext.match(getstring)[0];

                  var os = gotstring.replace(/\^e*b\^/g,'');
                  os = os.replace(/\{[^}]+\}/g, '');
                  os = os.replace(/\^a\^[^^]*\^ea\^/g, '');
                  os = os.replace(/[-)(,;`'"0-9]/g, ' ');
                  os = os.replace(/\.\.\.* *pe0* *\.*\.\./g, ' pe ');
                  os = os.replace(/\.\./g, '.');
                  os = os.replace(/ +/g, ' ');
                  os = os.replace(/^ +/g, '');
                  os = os.replace(/ +$/g, '');
                  os = os.replace(/\.$/g, '');

                  if(os.length > 1) {
                    if(/\. /.exec(os)) {
                      var ss = os.split(/ *\. /);
                      outa.push([a,b,c,d,e,f,ss[0]]);
                      outa.push([a,b,c,d,e,f,ss[1]]);
                    }
                    else outa.push([a,b,c,d,e,f,os]);
                  }
                  intext = intext.substring(intext.indexOf(gotstring)+gotstring.length);
                  startmatch = intext.search(getstring);
                }

              }
            }
          }
        }
      }
    }
  }
  return outa;
}

