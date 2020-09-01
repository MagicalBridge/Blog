let fs = require('fs')

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
fs.readFile('./name.txt', function (err, data) {
  out('name', 'louis');
})
// 读取age
fs.readFile('./age.txt', function (err, data) {
  out('age', 10);
})
