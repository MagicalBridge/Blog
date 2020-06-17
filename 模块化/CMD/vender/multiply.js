/*
 * @Author: your name
 * @Date: 2020-06-17 10:06:04
 * @LastEditTime: 2020-06-17 11:47:51
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/CMD/vender/multiply.js
 */
define(function (require, exports, module) {

  console.log('加载了 multiply 模块')

  var multiply = function (x, y) {
    return x * y;
  };

  module.exports = {
    multiply: multiply
  };

});