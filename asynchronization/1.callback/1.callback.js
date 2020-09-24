/**
 * 回调函数是高阶函数的一种
 *   高阶函数： 
 *      1） 如果函数的参数是一个函数 
 *      2） 如果一个函数返回了一个函数
 *   常见的高级函数的应用
 * 
 * 1、将before方法挂载在原型上面，所有函数都可以使用.
 * 2、before方法接收一个函数作为参数，又返回一个函数，这是高阶函数的典型用法。
 * 3、返回使用箭头函数，会从上下文中获取this指向此时调用这是 say this指向say
 * 4、这是一种AOP的编程思想
 * 5、如果想要给say函数传递参数需要使用扩展运算符和剩余运算符 https://juejin.im/post/6844904065139212295
 * 6、箭头函数的特点: 箭头函数没有this 没有arguments对象 没有原型
 */

function say(who) {
  console.log(who + '说话');
}
// before 是一个高阶函数参数是一个函数 返回值也是一个函数
Function.prototype.before = function (beforeFunc) {
  // 剩余运算符：将剩余的参数组合成一个数组，只能在最后一个参数里用
  return (...args) => {
    beforeFunc();
    // 扩展运算符：在函数调用的时候叫做展开
    this(...args);
  }
}

var newFn = say.before(function () {
  console.log('说话前');
})

newFn('我');

// 0901复习
// say 方法接收一个参数, 主语是who, 
function say(who) {
  console.log(who + '说话');
}

// 想要实现的需求是,在执行say之前，首先执行另一个函数,我们将这个函数称之为before
// 挂载在原型上面,任何函数都可以调用
Function.prototype.before = function (callbackFn) {
  // 这里使用了剩余运算符和扩展运算符
  return (...args) => {
    callbackFn();
    // 谁调用before 函数谁就是 this 换句话说 this 就指向谁
    this(...args)
  }
}

var newFn = say.before(function () {
  console.log('说话前');
});

newFn('我')

// vue2.0的时候,里面也会使用函数劫持操作 将push方法进行重写
let oldPush = Array.prototype.push;

function push(...args) { // 剩余运算符，用于最后一个参数
  console.log('数据更新中');
  console.log(args);  // [ 4 ]
  // this = [1,2,3]
  // 这里使用展开运算符,又回到了call的使用方法中那样
  oldPush.call(this, ...args);
}

// 这里调用的时候this指向的是数组[1,2,3]
let arr = [1, 2, 3]
push.call(arr, 4, 5, 6, 7)

// react 中的setState 中有一个事务的概念 其实就是 before / after 类似的操作，在之前做一些事情，在之后做一些事情。
