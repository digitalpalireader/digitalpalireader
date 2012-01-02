const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;

const nsIProtocolHandler = Ci.nsIProtocolHandler;

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

function DPRProtocol() {
    this.wrappedJSObject = this;
}

DPRProtocol.prototype = {
    scheme: "dpr",

    defaultPort: -1,
    protocolFlags: nsIProtocolHandler.URI_LOADABLE_BY_ANYONE,
    getURIFlags: function(aURI)
    {
        return Ci.nsIProtocolHandler.ALLOW_SCRIPT;
    },
    allowPort: function(port, scheme)
    {
        return false;
    },
    newURI: function(aSpec, aOriginCharset, aBaseURI)
    {
        var uri = Cc["@mozilla.org/network/simple-uri;1"].createInstance(Ci.nsIURI);
        uri.spec = aSpec;
        return uri;
    },
    newChannel: function(aURI)
    {
        try {
            var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
            
            var loc = 'chrome://digitalpalireader/content/load.htm';;
            var channel = ios.newChannel(loc, null, null).QueryInterface(Ci.nsIChannel);

            channel.contentType = 'text/html';
            var uri = Cc["@mozilla.org/network/simple-uri;1"].createInstance(Ci.nsIURI);
            uri.spec = loc;
            channel.originalURI = uri;
            return channel;

/*
            // var params = aURI.spec.split(":")[1];
            //dump(uri.spec+'\n');
            //var ch = ios.newChannelFromURI(uri, null, null);
            //dump(ch+'\n');
            //ch = ch.QueryInterface(Ci.nsIHTTPChannel);
            //dump(ch+'\n');
            //channel.setRequestHeader("X-Moz-Is-Feed", "1", false);
            var ch = ios.newChannel('chrome://digitalpalireader/content/load.htm', null, null);
            dump(ch+'\n');
            dump(channel+'\n');
            dump(ch.contentType+'\n');
            var ch = ios.newChannelFromURI(uri, null);
            dump(ch+'\n');
            var channel = ch.QueryInterface(Ci.nsIChannel);
            dump(channel+'\n');
            channel.originalURI = aURI;
            return channel;
*/
        }
        catch (e) {
            dump(e.toString());
        }        
    },
    classDescription: "DPR Protocol Handler",
    contractID: "@mozilla.org/network/protocol;1?name=dpr",
    classID: Components.ID('{458e5760-342b-11e1-b86c-0800200c9a66}'),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIProtocolHandler])
}

function openDialog(parentWindow, url, windowName, features)
{
    var array = Components.classes["@mozilla.org/array;1"]
                          .createInstance(Components.interfaces.nsIMutableArray);
    for (var i=4; i<arguments.length; i++)
    {
        var variant = Components.classes["@mozilla.org/variant;1"]
                                .createInstance(Components.interfaces.nsIWritableVariant);
        variant.setFromVariant(arguments[i]);
        array.appendElement(variant, false);
    }

    var watcher = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
                            .getService(Components.interfaces.nsIWindowWatcher);
    return watcher.openWindow(parentWindow, url, windowName, features, array);
}

if (XPCOMUtils.generateNSGetFactory)
  var NSGetFactory = XPCOMUtils.generateNSGetFactory([DPRProtocol]);
else
  var NSGetModule = XPCOMUtils.generateNSGetModule([DPRProtocol]);

function chromeToPath (aPath) {

   if (!aPath || !(/^chrome:/.test(aPath)))
      return; //not a chrome url
   var rv;
   
      var ios = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces["nsIIOService"]);
        var uri = ios.newURI(aPath, "UTF-8", null);
        var cr = Components.classes['@mozilla.org/chrome/chrome-registry;1'].getService(Components.interfaces["nsIChromeRegistry"]);
        rv = cr.convertChromeURL(uri).spec;

        if (/^file:/.test(rv))
          rv = this.urlToPath(rv);
        else
          rv = this.urlToPath("file://"+rv);

      return rv;
}

function urlToPath (aPath) {

    if (!aPath || !/^file:/.test(aPath))
      return ;
    var rv;
   var ph = Components.classes["@mozilla.org/network/protocol;1?name=file"]
        .createInstance(Components.interfaces.nsIFileProtocolHandler);
    rv = ph.getFileFromURLSpec(aPath).path;
    return rv;
}