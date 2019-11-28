'use strict';

/*
 * 统计Util工具
 * @Last Modified by:   aprilxue
 */
let Mac = require('getmac');
let Md5 = require('md5');
let Config = require('./config');
let fs = require('fs');

// 初始化统计配置
var Statistics = function() {

}

// 设置安卓设备id
Statistics.prototype.setAndroidId = function(id){
	global.analysis.android_id = id;
}

// 设置设备信息
Statistics.prototype.setDeviceModel = function(model){
	global.analysis.model = model;
}

// 设置设备系统
Statistics.prototype.setAndroidSystem = function(system){
	global.analysis.android_system = system;
}

// 设置mac地址
Statistics.prototype.setMac = function(){
	Mac.getMac(function(err, macAddress){
		global.analysis.m = Md5(macAddress || 'other');
	})
}

// 设置TBS Studio工具版本
Statistics.prototype.setVersion = function(){
	global.analysis.version = Config.version;
}

// 设置PC端os
Statistics.prototype.setOs = function(){
	var ua = navigator.userAgent.toLowerCase();
	var os = '';
	if(ua.indexOf('win')>-1){
		os = 'win';
	}else if(ua.indexOf('mac')>-1){
		os = 'mac';
	}else if(ua.indexOf('linux')>-1){
		os = 'linux';
	}else{
		os = 'other';
	}
	global.analysis.platform = os;
}

// 设置adb链接状态
Statistics.prototype.setAdbConnectState = function(val){
	global.analysis.adb_connect_state = val;
}

// 设置adb链接状态Code 
// 0 检测连接  1 adb检测异常  2 offline
Statistics.prototype.setAdbConnectStateCode = function(val){
	global.analysis.adb_connect_state_code = val;
}

// 设置下载包成功 0 正常 1失败
Statistics.prototype.setDownloadCode = function(val){
	global.analysis.download_code = val;
}

// 设置安装包成功 0 正常 1失败
Statistics.prototype.setInstallCode = function(val){
	global.analysis.install_code = val;
}

//  设置调试包名
Statistics.prototype.setPackage = function(val){
	global.analysis.package = val;
}

//  设置调试包名异常
Statistics.prototype.setPackageCode = function(val){
	global.analysis.package_code = val;
}

// 设置调试按钮
Statistics.prototype.setInspectorBtn = function(val){
	global.analysis.inspect_btn = val;
}

// 设置统计变量
Statistics.prototype.setBeaconAction = function(val){
	global.analysis.BeaconAction = val;
}


Statistics.prototype.sendInspectorStat = function(){
	let statisticsPath = ['180870', '4e20f443aa0e58bee97406223ee47d3ec91879fb'];

	statisticsPath.map((v)=>{
		let path = '../x5Inspector/extensions/'+v+'/statistics.json';
		fs.writeFile(path,  JSON.stringify(global.getAnalysis()), function(err){
			if(err){
				console.log(err);
			}
		})
	})
}

module.exports = Statistics;