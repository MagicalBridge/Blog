// 函数柯里化

// 判断一个变量的类型
// 1、typeof 2、 constructor 3、Object.prototype.toString.call();
// 函数柯里化功能 就是让函数的功能更具体些。
// 反柯里化 就是让函数的范围变大

/**
type ReturnFn = (val: unknown) => boolean;
let utils: Record<string, ReturnFn> = {};
function isType(typing: string) {
  return function (val: unknown) {
    return Object.prototype.toString.call(val) === `[object ${typing}]`;
  }
}

['String', 'Number', 'Boolean'].forEach(type => {
  // 这种等号是对象的赋值操作
  utils['is' + type] = isType(type);
})

console.log(utils.isString('hello'));
console.log(utils.isNumber(123));
*/


// 实现一个柯里化函数
const curring = (fn: Function) => {
  const exec = (sumArgs: any[] = []) => {
    // 如果当前传入参数的个数，小于函数的参数个数，需要返回一个新的函数，并且保留当前函数传入的参数
    return sumArgs.length >= fn.length ? fn(...sumArgs) : (...args: any[]) => exec([...sumArgs, ...args]);
  }
  return exec([]);
}

// 参数固定的情况做柯里化
function sum(a, b, c, d) {
  return a + b + c + d;
}

console.log(curring(sum)(1)(2, 3)(4))


