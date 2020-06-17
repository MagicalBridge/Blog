/*
 * @Author: your name
 * @Date: 2020-06-17 10:06:04
 * @LastEditTime: 2020-06-17 10:16:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/AMD/vender/multiply.js
 */ 
// multiply.js
define(function () {

  console.log('加载了 multiply 模块')

  var multiply = function (x, y) {
    return x * y;
  };

  return {
    multiply: multiply
  };
});