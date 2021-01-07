// 将一个node api 转换成 promsie api
// fs 模块接收三个参数  url  encoding编码  fn回调函数
let fs = require('fs');

// 自定义实现 promise化的函数 这个函数接收一个 函数，返回一个函数 它是一个高阶函数
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}

// 返回一个函数 这个函数内部又返回一个 promsie 
// 因此嫩够调用then方法
let read = promisify(fs.readFile);

// 调用的时候 使用这种方式
read().then();