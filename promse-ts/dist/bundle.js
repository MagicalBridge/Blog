'use strict';

// 函数柯里化
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
var curring = function (fn) {
    var exec = function (sumArgs) {
        if (sumArgs === void 0) { sumArgs = []; }
        // 如果当前传入参数的个数，小于函数的参数个数，需要返回一个新的函数，并且保留当前函数传入的参数
        return sumArgs.length >= fn.length ? fn.apply(void 0, sumArgs) : function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return exec(__spreadArrays(sumArgs, args));
        };
    };
    return exec([]);
};
// 参数固定的情况做柯里化
function sum(a, b, c, d) {
    return a + b + c + d;
}
console.log(curring(sum)(1)(2, 3)(4));
