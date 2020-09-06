// then的用法
// 目前有一个场景 name.txt 中 包含 想要查看的另一个文件的名称，然后再将文件

// 1）(then中传递的函数)判断成功和失败函数的返回结果
// 2）判断是不是promise 如果是promise 就采用它的状态
// 3）如果不是promise 直接将结果传递下去即可

// 我们实际上要将第一个函数的返回值,返回出去传递给下一个then函数 那 onfulfilled 需要一个返回值
// 我们是如果使得then方法，能够拿到这个结果的呢，其实调用的是 resolve 方法将data传递进去的
// 同样的，我们也可以调用 promise2的 resolve 方法将data继续传递出去。
// promise 具有发布订阅模式的功能

// let Promise = require('./promise')
let fs = require('fs')
let path = require('path')

let promsie = new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname + '/name.txt'), (err, data) => {
    resolve(data.toString())
  })
})
// 下面的代码中promise then 了3次，每一次都能成功的打印出来对应的值。
// 一旦成功了，所有的成功回调都会走，一旦失败所有的失败回调都会走，这就是说明
// 内部是使用发布订阅模式实现的
promsie.then((data) => {
  console.log(data);
}, (err) => {
  console.log(err);
})

promsie.then((data) => {
  console.log(data);
}, (err) => {
  console.log(err);
})

promsie.then((data) => {
  console.log(data);
}, (err) => {
  console.log(err);
})

// 现在还要考虑一种异步的场景,当then 中的状态是 pending这种
// 状态的时候，我们可以先将函数存起来，等到resolve 或者 reject时候 执行
// 也就是将成功的存在一起，失败的存在一起。
let promsie2 = new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname + '/name.txt'), (err, data) => {
    setTimeout(() => {
      resolve(data.toString())
    }, 1000);
  })
})

// 
promsie2.then((data) => {
  console.log(data);
}, (err) => {
  console.log(err);
})
