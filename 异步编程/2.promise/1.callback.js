// promise 有哪些优缺点:
// 优点：
//  (1) 可以解决异步嵌套的问题，避免回调地域的出现。
//  (2) 可以解决多个异步并问题

// 缺点：
//  (1) promise内部还是基于回调
//  (2) promise无法终止异步

// 引入自己手写的库
let Promise = require('./promise');

// promise的特点：
// 1）promise是一个类，或者是构造函数
// 2）类里面有三个状态： 等待态（默认） 成功态 失败态 一旦成功了就不能失败。
// 3）每个promise实例都有一个then方法
// 4）类里面传入一个函数 这个函数叫做 executor 执行器，这个执行器会立即执行，
//   下面代码中, 在 executor 中打印1 在外面打印 2 打印的顺序就是 1和2 顺序执行的
let promise1 = new Promise(() => { // executor 执行器
  console.log(1);
})
console.log(2);

// 5) 这个 executor 里面接收两个函数 一个函数是resolve 一个函数是 reject
// 6) 一旦调用resolve 方法表示当前状态是成功态, 
// 7）每个promise 实例都有一个then方法，这个then 方法里面有两个回调函数，一个是 成功需要执行的逻辑，一个是失败需要执行的逻辑
// 8） 一旦执行resolve 方法就就就执行 then的成功回调 并且将 resolve的data传递给成功回调的形参 一旦执行reject方法就执行 reject 方法
// 9）这个resolve 和 reject 是我们自己定义的，希望走成功还是失败看自己
let promise2 = new Promise((resolve, reject) => {
  resolve('hello') // 执行
  // reject('我出错了')
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err' + err);
})

// 10）一旦成功了就不能失败 一旦失败了就不能成功 如果new Promise 抛出错误 会变成失败态
let promise3 = new Promise((resolve, reject) => {
  throw new Error('我出错了');
  // resolve('hello') // 一旦抛出异常 下面的 resolve 也不会走
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err' + err);
})

// 11) then 方法每一个实例都可以调用，那写出来就是一个实例方法
