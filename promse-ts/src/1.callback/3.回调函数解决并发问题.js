// promise 最核心的点是解决了异步并发问题 第二个是解决地域回调问题
const fs = require('fs');
const path = require('path');

console.log(path.resolve(__dirname));
// after 函数 返回了一个函数 是一个高阶函数
// 这里是个闭包函数
function after(times, callback) {
  let obj = {};
  return function (key, val) {
    obj[key] = val;
    --times === 0 && callback(obj)
  }
}
// 先执行了after
let fn = after(2, (obj) => {
  console.log(obj);
})

fs.readFile(path.resolve(__dirname, '../age.txt'), 'utf8', (err, data) => {
  fn('age', data)
})


fs.readFile(path.resolve(__dirname, '../name.txt'), 'utf8', (err, data) => {
  fn('name', data)
})

