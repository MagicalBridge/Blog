function add(x: number, y: number, z?: number): number {
  return x + y;
}
let res = add(2, 3);
// 上面这个函数声明了返回值 每个参数都规定了类型，强制定义。
// 可选参数只能放在最后一个位置。

// const add2: (x: number, y: number) => number
const add2 = function (x: number, y: number): number {
  return x + y
}

// 这个add3 是一个函数类型
const add3: (x: number, y: number) => number = add2

