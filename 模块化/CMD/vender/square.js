/*
 * @Author: your name
 * @Date: 2020-06-17 10:07:17
 * @LastEditTime: 2020-06-17 11:48:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/CMD/vender/square.js
 */
define(function (require, exports, module) {

  console.log('加载了 square 模块')

  var multiplyModule = require('./multiply');

  module.exports = {
    square: function (num) {
      return multiplyModule.multiply(num, num)
    }
  };

});