var gui = require('nw.gui');
global.gui = gui;

var AdbTbsKit = require('./lib/adb-tbs-project');
global.AdbTbsKit = AdbTbsKit;
function goto(href) {
    gui.Shell.openExternal(href);
}

var win = nw.Window.get();
// win.showDevTools();
handleInspector = function () {
    // 打开调试页面
    try {
        global.AdbTbsKit.openInspector();
        global.gui.Window.open('chrome://inspect', {
            title: 'soft17.taobao.com',
            position: 'center',
            width: Math.round(screen.availWidth * 2 / 3),
            height: Math.round(screen.availHeight * 2 / 3)
        })
    } catch (err) {
        alert(err);
    }
}
author = function () {
    document.getElementById("author").style.display = "inline";
}
var chooser = document.querySelector('#fileDialog');

chooser.addEventListener("change", function (evt) {
    var path = require('path');
    var toPath=path.join(process.cwd(),"../Inspector/extensions");
    var adm_zip = require('adm-zip'); 
    var unzip = new adm_zip(chooser.files[0].path);
    unzip.extractAllTo(toPath, true);
    console.log(toPath);
    alert("导入成功");
}, false);
