// then的用法
// 目前有一个场景 name.txt 中 包含 想要查看的另一个文件的名称，然后再将文件

// 我们实际上要将第一个函数的返回值,返回出去传递给下一个then函数 那 onfulfilled 需要一个返回值
// 我们是如果使得then方法，能够拿到这个结果的呢，其实调用的是 resolve 方法将data传递进去的
// 同样的，我们也可以调用 promise2的 resolve 方法将data继续传递出去。
// promise 具有发布订阅模式的功能

let Promise = require('./promise')
let fs = require('fs')
let path = require('path')

// let promsie = new Promise((resolve, reject) => {
//   fs.readFile(path.join(__dirname + '/name.txt'), (err, data) => {
//     resolve(data.toString())
//   })
// })
// 下面的代码中promise then 了3次，每一次都能成功的打印出来对应的值。
// 一旦成功了，所有的成功回调都会走，一旦失败所有的失败回调都会走，这就是说明
// 内部是使用发布订阅模式实现的
// promsie.then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// })

// promsie.then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// })

// promsie.then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// })

// --------------------------------------------------------------------------------------------


// 现在还要考虑一种异步的场景,当then 中的状态是 pending这种
// 状态的时候，我们可以先将函数存起来，等到resolve 或者 reject时候 执行
// 也就是将成功的存在一起，失败的存在一起
// let promsie2 = new Promise((resolve, reject) => {
//   fs.readFile(path.join(__dirname + '/name.txt'), (err, data) => {
//     setTimeout(() => {
//       resolve('成功')
//     }, 1000);
//   })
// })


// promsie2.then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// })

// promsie2.then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// })

// promsie2.then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// })
// -----------------------------------------------------------------------------------------------------

// 使用read方法
// function read(url) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path.join(__dirname + url), (err, data) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(data.toString())
//       }
//     })
//   })
// }

// read('/name.txt').then((data) => {
//   console.log(data);
// }, (err) => {
//   console.log(err);
// })

// 如果一个promise的then方法中的函数（成功和失败） 返回的的结果是一个promise的话
// 会自动将这个promise执行,并且采用它的状态。如果成功的话，会将成功的结果向外层的下一个then传递
// read('/name.txt').then((data) => {
//   return read('/age.txt')
// }, (err) => {
//   console.log(err);
// }).then((data) => {
//   console.log(data);
//   return 123  // 如果返回的是一个普通值,那么会将这个值作为下一次的成功的结果
// }, err => {
//   console.log(err);
// }).then((data) => {
//   console.log(data); // 会将上次成功或者失败的返回结果打印出来
//   // 希望在这里不要向下走then 终止promise可以返回一个pending状态的 promsie
//   return new Promise(() => { });
// }).then((data) => {

// }, err => {

// })

// then的特点：只有两种情况会失败
// 1）返回一个失败的promise 或者 就是抛出异常 其他状态都是成功
// 每次执行promise的时候都会返回一个新的promise实例

// 1）(then中传递的函数)判断成功和失败函数的返回结果
// 2）判断是不是promise 如果是promise 就采用它的状态，传递给下一个then
// 3）如果不是promise 直接将结果传递下去即可
// 4）在返回1000之后, 还可以继续调用then方法，说明每次执行then 方法之后还会返回一个新的promise
// --------------------------------------------------------------------------------------------
let p = new Promise((resolve, reject) => { // promise1
  resolve();
})

// 不断地then 如何将1000传递出去的呢 需要调用promise2的resolve方法
let promise2 = p.then(() => {
  return 1000
})

promise2.then((data) => {
  console.log(data);
})

// try catch 只能捕获同步异常
// 为了能在then 方法之后继续调用 then 方法，我们在 then 方法之内又new了一个promsie2
// 又因为这个promise2 也是promise的实例，所以就是可以不断地then 这样就解释的通了。
// 在规范中 onfulfilled onrejected 都是异步调用的。

