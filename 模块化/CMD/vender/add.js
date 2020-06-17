/*
 * @Author: your name
 * @Date: 2020-06-17 10:05:02
 * @LastEditTime: 2020-06-17 11:47:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/CMD/vender/add.js
 */
define(function (require, exports, module) {

  console.log('加载了 add 模块')

  var add = function (x, y) {
    return x + y;
  };

  module.exports = {
    add: add
  };

});