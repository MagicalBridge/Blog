// 回调函数是高阶函数的一种
//高阶函数： 1）如果函数的参数是一个函数 2） 如果一个函数返回了一个函数
// 常见的高级函数的应用


/**
 * 1、将before挂载在原型上面，所有函数都可以使用
 * 2、before 方法接收一个函数作为参数，又返回一个函数，这是高阶函数的典型用法
 * 3、返回使用箭头函数，会从上下文中获取this指向此时调用这是 say this指向say
 * 4、这是一种AOP的编程思想
 * 5、如果想要给say函数传递参数需要使用扩展运算符和剩余运算符 https://juejin.im/post/6844904065139212295
 * 6、箭头函数的特点: 箭头函数没有this 没有arguments对象 没有原型
 */
function say(who) {
  console.log(who + '说话');
}

Function.prototype.before = function (beforeFunc) {
  // 剩余运算符：将剩余的参数组合成一个数组，只能在最后一个参数里用
  return (...args) => {
    beforeFunc();
    // 扩展运算符：在函数调用的时候叫做展开
    this(...args);
  }
}

let newFn = say.before(function () {
  console.log('说话前');
})

newFn('我');


/**
 * 1、作用域产生根据函数定义的位置
 */