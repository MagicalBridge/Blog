/*
 * @Author: your name
 * @Date: 2020-06-17 12:11:54
 * @LastEditTime: 2020-06-17 12:12:06
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/CommonJS/vender/add.js
 */
console.log('加载了 add 模块')

var add = function (x, y) {
  return x + y;
};

module.exports.add = add;