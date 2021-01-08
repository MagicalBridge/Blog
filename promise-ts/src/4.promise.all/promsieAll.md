```js
// 1 接收一个数组 values：any 类型 一般是一些异步封装的方法
// 2、可以调用then 方法说明返回一个promise实例
// 3、所有的方法都执行，这种场景下使用循环去做
// 4、对于数组的每一项，需要判断当前是否是promsie，因为如果是普通值，promsie.all 方法会直接返回这个结果
// 5、计数器的使用 是其中的一个小的技巧, 方案统计成功调用次数和传如value中的值是否一致
function isPromise(value) {
  // 根据promsieA+ 规范可知 promise可以是一个对象或者是函数，且必须拥有then方法。
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    if (typeof value.then === 'function') {
      return true
    }
  }
  return false;
}
Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    // 用于将结果收集起来
    let arr = [];
    // 使用计数器，判断是否全部执行完毕
    let times = 0;
    function collectResult(val, key) {
      console.log(times);
      // key 是索引  val 是当前值
      arr[key] = val;
      // 无论是promsie 还是普通值 调用的次数和 数组长度相同
      // 说明已经将所有的任务执行完毕
      if (++times === values.length) {
        // 返回 收集的数组
        resolve(arr);
      }
    }
    for (let i = 0; i < values.length; i++) {
      let value = values[i];
      // 单独封装一个方法，判断当前的值是否是promise
      if (isPromise(value)) {
        // value 是 promsie 执行自身的 then 方法
        // 如果成功 拿到当前的结果
        value && value.then((y) => {
          collectResult(y, i);
        }, reject)
      } else { // 如果是普通值
        collectResult(value, i);
      }
    }
  })
}
Promise.all([read(namePath, 'utf8'), read(agePath, 'utf8'), 0]).then(data => {
  console.log(data);
})
```