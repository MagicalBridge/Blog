var dynamicFunc = function (cb) {
  setTimeout(function () {
    cb();
  }, 1000)
}

dynamicFunc(function () {
  console.log(123)
})


setTimeout(function () {
  console.log(123);
  setTimeout(function () {
    console.log(234);
  }, 2000)
}, 1000)


function promise1() {
  return new Promise(function (resolve, reject) {
    // 定义异步的内容
    setTimeout(function () {
      console.log('1s 后输出');
      // 输出完成之后，调用函数传入的 resolve 函数，将该 promsie实例标记为
      // 已经完成，当前promise串行继续执行
      resolve();
    }, 1000)
  })
}

function promise2() {
  return new Promise(function (resolve, reject) {
    // 定义异步的内容
    setTimeout(function () {
      console.log('2s 后输出');
      resolve();
    }, 2000)
  })
}


promise1().then(function () {
  return promise2();
})


function promise3() {
  return new Promise(function (resolve, reject) {
    var random = Math.random() * 10;
    setTimeout(function () {
      if (random >= 5) {
        resolve(random);
      } else {
        reject(random);
      }
    }, 1000);
  })
}

var onResolve = function (val) {
  console.log('已经完成: 输出的数字是', val);
}

var onReject = function (val) {
  console.log('已经拒绝: 输出的数字是', val);
}

// promise的then方法可以接收两个参数，这两个参数都是函数
// 第一个函数在resolve后执行，第二个函数在reject后执行。
promise3().then(onResolve, onReject);

// 也可以通过 .catch 方法拦截状态变为已经拒绝时候的promise
promise3().catch(onReject).then(onResolve);

// 也可以通过 try catch 进行拦截状态变为已拒绝的promsie
try {
  promise3().then(onResolve);
} catch (e) {
  onReject(e)
}

