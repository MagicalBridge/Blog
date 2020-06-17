/*
 * @Author: your name
 * @Date: 2020-06-17 10:05:02
 * @LastEditTime: 2020-06-17 10:16:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/AMD/vender/add.js
 */ 

//  add.js
// require.js 为全局加载了 define 函数 你只要按照这种约定的方式写模块即可
// 我们在看看 主模块依赖的 square 模块
define(function () {

  console.log('加载了 add 模块')

  var add = function (x, y) {
    return x + y;
  };

  return {
    add: add
  };
});