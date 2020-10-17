class Animal {
  name: string; // 在ts中这个方法是必不可少的
  static list: string[] = ['mammal', 'bird']; // 这里定义了静态的属性可以直接通过类来访问
  static isAnimal(a) { // 这个静态方法的作用是判断静态方法是否是实例
    return a instanceof Animal;
  }
  constructor(name: string) {
    this.name = name;
  }
  // 
  run() {
    return `${this.name} is running`
  }
}
// 这是类的写法
const snake = new Animal('lily');
 
console.log(Animal.isAnimal(snake)); // true

console.log(snake.run());

// 打印类的静态方法, 静态方法不需要实例化调用
console.log(Animal.list); // [ 'mammal', 'bird' ]

class Dog extends Animal {
  bark() {
    return `${this.name} id barking`
  }
}

const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run());
console.log(xiaobao);


// 录音接口
interface Radio {
  switchRadio(): void;
}

// 电池接口
interface Battery {
  checkBatteryStatus();
}

// 定义一个car类 继承 录音接口
class Car implements Radio{
  // 必须实现内部方法
  switchRadio() {

  }
}
// 手机类 也拥有一个和car类相同的特性方法
class CellPhone implements Radio, Battery{
  switchRadio() {}
  // 既然继承了某一个接口就要能够实现它。
  checkBatteryStatus() {}
}

