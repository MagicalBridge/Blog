// 发布订阅模式
let fs = require('fs')

let event = {
  _arr: [],
  on(fn) {
    this._arr.push(fn)
  },
  emit() {
    this._arr.forEach(fn => fn())
  }
}

let school = {};

event.on(function () {
  console.log('读取一个');
})

event.on(function () {
  if (Object.keys(school).length === 2) {
    console.log(school);
  }
})

// 读取name
fs.readFile('./name.txt', function (err, data) {
  school.name = 'louis'
  event.emit();
})

// 读取age
fs.readFile('./age.txt', function (err, data) {
  school.age = 10;
  event.emit();
})