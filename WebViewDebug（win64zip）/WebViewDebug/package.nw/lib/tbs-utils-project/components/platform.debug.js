'use strict';

/*
 * 平台整理
 * @Last Modified by:   aprilxue
 */
let os = require('os');

// 获取版本号，判断win8版本
function isOfMinimumVersion(minVersion){
	let actVersions = os.release().split('.');
	let minVersions = minVersion.split('.');

	let actVersionNum = 0;
	let minVersionNum = 0;
	for(let i = 0; i < minVersions.length; i++){
		actVersionNum += parseInt(actVersions[i] || 0) * Math.pow(10, 3*(minVersions.length-i));
		minVersionNum += parseInt(minVersions[i] || 0) * Math.pow(10, 3*(minVersions.length-i));
	}

	return actVersionNum >= minVersionNum;
}

let name = os.platform();
// 初始化平台
let platform = {
	name: {'darwin': 'mac', 'linux': 'linux', 'windows': 'win', 'win32': 'win'}[name] || 'win',
	isLinux: name === 'linux',
    isMac: name === 'darwin',
    isWindows: name != 'linux' && name != 'darwin',
    isWindows8: name != 'linux' && name != 'darwin' && isOfMinimumVersion('6.2.9200'),
    version: os.release()
}

module.exports =  platform;