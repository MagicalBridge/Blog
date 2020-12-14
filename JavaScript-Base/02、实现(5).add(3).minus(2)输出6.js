(function () {
  // => 每一个方法执行完毕，都要返回NUMBER这个类的实例，这样才能继续调用NUMBER类原型中的方法（这是链式写法）
  function check(n) {
    n = Number(n);
    return isNaN(n) ? 0 : n
  }

  function add(n) {
    n = check(n)
    return this + n;
  }
  function minus(n) {
    n = check(n)
    return this - n;
  }

  Number.prototype.add = add;
  Number.prototype.minus = minus;
})()

console.log((5).add(3).minus(2));