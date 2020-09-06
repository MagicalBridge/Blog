// 观察者模式 vue
// 观察者模式观察者和被观察者是有关系的
// 重新梳理一下整个流程，观察者和被观察者是两个类
// 观察者作为实例传入被观察者者中。被观察者状态更新的时候会通知 观察者的状态更新。
class Subject { // 我家宝宝
  constructor() {
    // 这是宝宝的自己的状态
    this.state = '很开心'
    this.arr = [];
  }
  // 注册 
  attach(o) {
    // 将所有的观察者存起来
    this.arr.push(o);
  }
  setState(newState) {
    // 更细自己的状态
    this.state = newState;
    // 让自己接收的观察者，调用自己的更新状态的方法
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

// 建立关系,被观察者 接收观察者的实例对象
s.attach(o1)
s.attach(o2)

// 设置自己的状态
s.setState('不开心');

// promise 有哪些优缺点
// 优点： 可以解决异步嵌套的问题  可以解决多个异步并发问题
// 缺点:  promise是基于回调的  promise 无法终止异步

