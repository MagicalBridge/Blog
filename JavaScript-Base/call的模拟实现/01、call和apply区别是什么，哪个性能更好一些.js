/**
 * call 和apply 有什么区别, 哪个性能更好一些？
 * 
 * 1、call和apply都是可以改变this指向的，都是定义在Function.prototype上面的方法，
 * 2、每个函数实例都可以调用call和apply方法。
 * 3、不同点在于call的除了this之外的参数是一个个传递的，而apply除了this之外的参数是以数组的形式传递的。
 * 4、性能方面，我之前看过相关的文章，也在一个评测网站上评测过，当传递的参数小于等于3的时候两者差距不大，参数再多一些的话
 * call的性能会好一些，所以在实际开发中也尽量的使用call, 在ES6 中引入了展开运算符，因此call也可以传递数组，只需要
 * 将数组展开即可，进一步抹平了这两个api的差异。
 */
function fn(x, y, z) {
  console.log(x, y, z);
}
obj = {};
let arr = [10, 20, 30];
fn.call(obj, 10, 20, 30);
fn.apply(obj, arr);

// 使用展开运算符，实现和apply一样的效果
fn.call(obj, ...arr);


/**
 * 自己实现性能测试 （任何的性能测试都是和测试的环境有关系的，cpu 内存 GPU）
 * 使用console.time 可以测试出一段程序的运行时间
 */
console.time('a');
for (let i = 0; i < 1000000; i++) {

}
console.timeEnd('a');

// 模拟实现call
Function.prototype.call = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for (let i = 1; len = arguments.length, i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args + ')')
  delete context.fn;

  return result;
}





