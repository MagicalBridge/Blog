// promise 最核心的点是解决了异步并发问题 第二个是解决地域回调问题
const fs = require('fs');
const path = require('path');
let Promise = require('../index'); // 引用自己的promsie
// 在promsie 上面添加一个方法 这个方法是个延迟对象
Promise.defer = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

function read(url) {
  // 这dfd 存储的就是 一个promsie对象和对应这个对象的 resolve 和reject 
  let dfd = Promise.defer();
  fs.readFile(path.resolve(__dirname, url), 'utf8', (err, data) => {
    if (err) {
      dfd.reject(err)
    }
    dfd.resolve(data)
  })
  // 返回的是一个promsie实例
  return dfd.promise
}

read('../../name.txt').then((data) => {
  return read('../../' + data);
}).then((data) => {
  console.log(data);
})