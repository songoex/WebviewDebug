"use strict";function t(t,n,r){t=t||"info";let u=o.getDataPath(),g=(r||i.name)+".log",f=["\n",e().format("YYYY-MM-DD HH:mm:ss"),"|",t.toUpperCase(),"|",n].join("");a.writeFile(u+"/"+g,f,{flag:"a"},function(t){})}let e=require("../lib/moment.js"),i=require("./config"),o=require("../../win-project"),a=require("fs");t.getDefaultLogFilePath=function(){return o.getDataPath()+"/"+(i.name+".log")},t.getLogDate=function(){return e().format("YYYY-MM-DD")},t.isLogExist=function(t,e){let i=o.getDataPath();a.stat(i+"/"+t+".log",(t,i)=>{e(i&&i.size)})},module.exports=t;