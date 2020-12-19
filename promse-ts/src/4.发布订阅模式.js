// 发布订阅模式
const fs = require('fs');
const path = require('path');

let events = {
  arr: [], // 用于存放函数 因为我执行了两边on 方法 这个数组里面应该有两个fn [fn,fn]
  on(fn) {
    this.arr.push(fn);
  },
  emit() {
    this.arr.forEach(fn => fn());
  }
}

let person = {};

// on 这个方法中接收一个函数作为参数
events.on(() => {
  // 这个部分当person中的key变成2的时候触发
  if (Object.keys(person).length === 2) {
    console.log(person);
  }
})
// 这里再订阅一次
events.on(() => {
  // 这个部分是每一次都触发
  console.log('触发一次');
})

fs.readFile(path.resolve(__dirname, '../age.txt'), 'utf8', (err, data) => {
  person.age = data;
  events.emit();
})


fs.readFile(path.resolve(__dirname, '../name.txt'), 'utf8', (err, data) => {
  person.name = data;
  events.emit();
})