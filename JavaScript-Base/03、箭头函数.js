/**
 * 箭头函数与普通函数 （function）的区别是什么？
 * 构造函数 （function）可以使用new 生成实例，
 * 那么箭头函数可以吗？为什么？
 */

/**
 * 箭头函数和普通函数的区别
 *   1、箭头函数语法上比普通函数更加简洁。ES6下，每一种函数都可以使用形参默认值和 ...剩余运算符。
 *   2、箭头函数中没有自己的this，它里面的this是继承函数所处山下文中的this （使用call和 apply等任何方法都无法改变this的指向）
 *   3、箭头函数中没有arguments（类数组） 只能基于 ...ags 获取传递参数集合（数组）
 *   4、箭头函数不能当做构造函数使用，不能使用new操作符调用。（箭头函数没有prototype属性）
 */
// 1、说明简洁性的问题
function fn(x) {
  return function (y) {
    return x + y
  }
}

let fn1 = (x) => {
  return (y) => {
    return x + y
  }
}


// 2 说明箭头函数的问题
let obj = {
  name: 'OBJ'
}

function fn2() {
  console.log(this);
}

let fn3 = () => {
  console.log(this);
}

fn2.call(obj) // { name: 'OBJ' }

fn3.call(obj) // 在node 环境中打印的是 {}而不是window。

document.body.onclick = () => {
  // => THIS window 不是当前的操作的body了
}

document.body.onclick = function () {
  // => THIS body 
  // sort 方法中的this指向是 arr,我只是将一个方法传递给了sort
  // 这个方法在sort里面执行了,回调函数中的this指向window
  arr.sort(function (a, b) {
    // => THIS window 回调函数中的this指向window
    return a - b
  })
}

// => each 方法的源码实现 回调函数，把一个函数B作为实参传递给另外一个函数 A 
// 函数A在执行的时候，可以把传递进来的函数B 去执行（执行N次）
function each(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i],
      index = i;
    callback(item, index)
  }
}
each([10, 20, 30, 40], function (item, index) {

})








