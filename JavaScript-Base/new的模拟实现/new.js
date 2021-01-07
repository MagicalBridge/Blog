function objFactory() {
  let obj = new Object();
  // 构造函数
  let Constructor = [].shift.call(arguments);
  // 将obj 挂载到原型链上
  obj.__proto__ = Constructor.prototype;
  let ret = Constructor.apply(obj, arguments);
  return typeof ret === 'object' ? ret : obj;
}