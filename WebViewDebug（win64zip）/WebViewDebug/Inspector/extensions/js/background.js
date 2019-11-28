var debugDevTools = false;
var debugDIR = ['180870_dev', '4e20f443aa0e58bee97406223ee47d3ec91879fb_dev'];

function doHookUrl(url) {
    console.log(url);
    var ver = url.match('@[^/]+')[0].substring(1);
    var localUrl = "chrome-extension://" + chrome.runtime.id + "/" + ver;
    var hookUrl = "https://chrome-devtools-frontend.appspot.com/serve_rev/@" + ver;
    var lancherUrl = "chrome-devtools://devtools/remote/serve_rev/@" + ver;
    if (url.indexOf(hookUrl) != -1) {
        var url2 = url.replace(hookUrl, localUrl);
        return url2;
    }
    else if (url.indexOf(lancherUrl) != -1) {
        var url2 = url.replace(lancherUrl, localUrl);
        return url2;
    }
    return url;
}
chrome.webRequest.onBeforeRequest.addListener(
    function (info) {
        return {
            redirectUrl: doHookUrl(info.url)
        };
    }, {
        urls: ["*://devtools/remote/serve_rev/*", "https://chrome-devtools-frontend.appspot.com/*"]
    }, ["blocking"]);
