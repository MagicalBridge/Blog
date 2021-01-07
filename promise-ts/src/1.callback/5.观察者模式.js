class Subject {
  constructor(name) {
    this.name = name;
    this.state = '我现在很开心'
    this.observers = [];
  }
  // 传入 观测我的人
  attach(o) {
    this.observers.push(o);
  }
  setState(newVal) {
    this.state = newVal;
    this.observers.forEach(o => o.update(this));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(baby) {
    console.log(baby.name + '对' + this.name + '说' + baby.state)
  }
}

// 我家有个小宝宝 我和我媳妇就是观察者
let baby = new Subject('小宝宝')

// 两个实例
let o1 = new Observer('爸爸')
let o2 = new Observer('妈妈')

baby.attach(o1)
baby.attach(o2)

baby.setState('我不开心了')

