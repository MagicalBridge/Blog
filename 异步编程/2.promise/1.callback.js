// promise的特点 
// 承诺 promise是一个类
// 里面有三个状态： 等待态（默认） 成功态 失败态 一旦成功了就不能失败。
// 每个promise实例都有一个 then方法
// new promise 失败了会变成失败态 （抛出错误也算是异常）

let promise = new Promise((resolve, reject) => { // executor 执行器
  console.log(1);
  resolve('hello');
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err', err);
})

console.log(2);

// 如果一个promise的then 方法中的函数（成功和失败）返回的结果是一个promise的话，会自动将这个
// promise 执行 并且采用它的状态，如果成功会将成功的结果向外层的下一个then传递
