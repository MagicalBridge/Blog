// 观察者模式 vue
class Subject { // 我家宝宝
  constructor() {
    this.state = '很开心'
    this.arr = [];
  }
  attach(o) {
    this.arr.push(o);
  }
  setState(newState) {
    this.state = newState;
    this.arr.forEach(o => o.update(newState));
  }
}

/**
 * 观察者
 */
class Observer { // 我
  constructor(name) {
    this.name = name
  }
  update(newState) {
    console.log(this.name + ':' + '小宝宝的状态' + newState);
  };
}

let s = new Subject('小宝宝');
let o1 = new Observer('我');
let o2 = new Observer('媳妇');

// 建立关系
s.attach(o1)
s.attach(o2)

s.setState('不开心');

// promise 有哪些优缺点
// 优点： 可以解决异步嵌套的问题  可以解决多个异步并发问题
// 缺点:  promise是基于回调的  promise 无法终止异步

