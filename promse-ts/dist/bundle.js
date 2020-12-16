'use strict';

// 函数柯里化
var utils = {};
function isType(typing) {
    return function (val) {
        return Object.prototype.toString.call(val) === "[object " + typing + "]";
    };
}
['String', 'Number', 'Boolean'].forEach(function (type) {
    // 这种等号是对象的赋值操作
    utils['is' + type] = isType(type);
});
console.log(utils.isString('hello'));
console.log(utils.isNumber(123));
