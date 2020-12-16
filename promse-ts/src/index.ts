// 函数柯里化

// 判断一个变量的类型
// 1、typeof 2、 constructor 3、Object.prototype.toString.call();
// 函数柯里化功能 就是让函数的功能更具体些。
// 反柯里化 就是让函数的范围变大
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


