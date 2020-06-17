/*
 * @Author: your name
 * @Date: 2020-06-17 10:07:17
 * @LastEditTime: 2020-06-17 10:18:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dailyWork/myBlog/模块化/AMD/vender/square.js
 */ 
// square 模块依赖于 multiply 其写法类似于 main.js 中的写法
// require.js 会自动的分析依赖关系，将需要加载的模块正确加载
define(['./multiply'], function (multiplyModule) {
  console.log('加载了 square 模块')
  return {
    square: function (num) {
      return multiplyModule.multiply(num, num)
    }
  };
});