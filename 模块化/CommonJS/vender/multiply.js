/*
 * @Author: your name
 * @Date: 2020-06-17 12:11:54
 * @LastEditTime: 2020-06-17 12:12:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/CommonJS/vender/multiply.js
 */
console.log('加载了 multiply 模块')

var multiply = function (x, y) {
  return x * y;
};

module.exports.multiply = multiply;