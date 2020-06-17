/*
 * @Author: your name
 * @Date: 2020-06-17 10:05:30
 * @LastEditTime: 2020-06-17 11:47:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/CMD/vender/main.js
 */ 
define(function(require, exports, module) {
  var addModule = require('./add');
  console.log(addModule.add(1, 1))

var squareModule = require('./square');
console.log(squareModule.square(3))
});