'use strict';

// promise 最核心的点是解决了异步并发问题 第二个是解决地域回调问题
var fs = require('fs');
// after 函数 返回了一个函数 是一个高阶函数
// 这里是个闭包函数
function after(times, callback) {
    var obj = {};
    return function (key, val) {
        obj[key] = val;
        --times === 0 && callback(obj);
    };
}
// 先执行了after
var fn = after(2, function (obj) {
    console.log(obj);
});
fs.readFile('./age.txt', 'utf8', function (err, data) {
    fn('age', data);
});
fs.readFile('./name.txt', 'utf8', function (err, data) {
    fn('name', data);
});
