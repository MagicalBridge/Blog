// 1）(then中传递的函数)判断成功和失败函数的返回结果
// 2）判断是不是promise 如果是promise 就采用它的状态
// 3）如果不是promise 直接将结果传递下去即可

// 我们实际上要将第一个函数的返回值,返回出去传递给下一个then函数 那 onfulfilled 需要一个返回值
// 我们是如果使得then方法，能够拿到这个结果的呢，其实调用的是 resolve 方法将data传递进去的
// 同样的，我们也可以调用 promise2的 resolve 方法将data继续传递出去。

let Promise = require('./promise')

let p = new Promise((resolve, reject) => {
  resolve();
})

p.then(data => { // onfulfilled
  return 1000;
}).then(data => { // onrejected
  console.log(data);
})