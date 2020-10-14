// interface 接口
// 1、对对象的形状 (shape) 进行描述
// 2、对类 (class) 进行抽象
// 3、Duck Typing (鸭子类型)
// 定义一个接口，这个接口的作用是约束对象本身
interface Person {
  readonly id: number;
  name: string;
  age?: number; // age 后面添加一个问号 说明是可选的
}

let man: Person = {
  id: 1234, // 这个id就是固定的 如果对这个id进行赋值就会报错
  name: 'louis',
  age: 20
}



