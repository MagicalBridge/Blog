type Callback = () => void;
type ReturnFn = (...args: any[]) => void;

declare global {
  interface Function {
    before(fn: Callback): ReturnFn;
  }
}

Function.prototype.before = function (fn) {
  // 这里使用箭头函数 this 指向调用before函数
  // ...args 剩余运算符 将传入的参数变成数组
  return (...args) => {
    fn();
    // ...args
    this(...args);
  }
}

// 核心函数逻辑
function core(...args) {
  console.log('core...', ...args);
}
// before 函数返回一个函数
let fn = core.before(() => {
  console.log('before core...');
})

// 返回的函数执行 也可以传递参数
fn(1, 2, 3);

export {};