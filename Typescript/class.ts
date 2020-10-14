class Animal {
  name: string; // 在ts中这个方法是必不可少的
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
console.log(snake.run());


class Dog extends Animal {
  bark() {
    return `${this.name} id barking`
  }
}

const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run());
console.log(xiaobao);

