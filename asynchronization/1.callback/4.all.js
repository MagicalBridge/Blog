// fs 文件读写功能,
// 异步方法的特点是并不知道谁先执行完毕

let fs = require('fs')
let path = require('path')
// console.log(path.join(__dirname));

function after(times, cb) {
  let school = {};
  return function (key, value) {
    school[key] = value;
    if (--times === 0) { // 如果达到次数，就执行after方法的回调函数
      cb(school)
    }
  }
}

let out = after(2, function (result) {
  console.log(result);
})

// 读取name
fs.readFile(path.join(__dirname) + '/name.txt', function (err, data) {
  out(name, data);
})
// 读取age
fs.readFile(path.join(__dirname) + '/age.txt', function (err, data) {
  out(age, data);
})
