// 发布订阅模式 发布 订阅
// 其实思路还是很简单的，就是每次
// 发布订阅模式有一个特点是，发布和订阅模式之间没有任何关系
// 只发布不订阅也是可以的，只订阅不发布也是可以的
let fs = require('fs')
let path = require('path')

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
// 在定义的时候这个on就接收一个函数，然后函数执行 
// 先执行订阅逻辑,将函数存入数组中。
event.on(function () {
  console.log('读取一个');
})

// 当school 有两个属性的时候打印属性
event.on(function () {
  if (Object.keys(school).length === 2) {
    console.log(school);
  }
})

console.log(event._arr.length); // 2 先执行订阅逻辑 

// 发布的时候 再将存入数组中的函数执行
// 读取name
fs.readFile(path.join(__dirname) + '/name.txt', function (err, data) {
  school.name = data.toString();
  event.emit();
})

// 读取age
fs.readFile(path.join(__dirname) + '/age.txt', function (err, data) {
  school.age = data.toString();
  event.emit();
})