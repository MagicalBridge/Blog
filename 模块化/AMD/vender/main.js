/*
 * @Author: your name
 * @Date: 2020-06-17 10:05:30
 * @LastEditTime: 2020-06-17 10:13:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/AMD/vender/main.js
 */
// main.js require 的第一个参数表示依赖的模块的路径 第二个参数表示此模块的内容
// 由此看出主模块依赖于 add 模块和 square 模块
// 我们看下 add 模块和 add.js的内容
require(['./add', './square'], function (addModule, squareModule) {
  console.log(addModule.add(1, 1))
  console.log(squareModule.square(3))
});