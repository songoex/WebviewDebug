'use strict';

/*
 * 日志整理
 * @Last Modified by:   aprilxue
 */

let moment = require('../lib/moment.js');
let config = require('./config');
let Win = require('../../win-project');
let fs = require('fs');


/**
  * 记录日志
  */
function log(type, message, filename){
	type = type || 'info';

	let userCachePath = Win.getDataPath();
	let logName = (filename || config.name) + '.log';

	let logInfo = ['\n',moment().format('YYYY-MM-DD HH:mm:ss'),'|',type.toUpperCase(),'|',message].join('');
	fs.writeFile(userCachePath + '/' + logName,  logInfo, {flag: 'a'}, function(err){
		if(!err){
		}
	})
}

/**
  * 获取默认日志
  */
log.getDefaultLogFilePath = function(){
	let userCachePath = Win.getDataPath();
	let logName = config.name + '.log';
	return userCachePath + '/' + logName;
}

log.getLogDate = function(){
	return moment().format('YYYY-MM-DD')
}

log.isLogExist = function(logName, callback){
	let userCachePath = Win.getDataPath();
	fs.stat(userCachePath + '/' + logName + '.log', (err, stat)=>{
		callback(stat && stat.size);
	})
}

module.exports =  log;