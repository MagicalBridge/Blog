/*
 * @Author: your name
 * @Date: 2020-06-17 12:11:54
 * @LastEditTime: 2020-06-17 12:12:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/CommonJS/vender/square.js
 */ 
console.log('加载了 square 模块')

var multiply = require('./multiply.js');


var square = function (num) {
  return multiply.multiply(num, num);
};

module.exports.square = square;