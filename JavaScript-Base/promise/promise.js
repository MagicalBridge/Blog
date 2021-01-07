const PENDING = 'PENDING'; // 中间态
const ONFULFILLED = 'ONFULFILLED'; // 成功
const ONREJECTED = 'ONREJECTED' // 失败

function resovlePromise(promise2, x, resolve, reject) {
  // 自己等待完成是错误的实现，用一个类型错误结束掉promsie 2.3.1
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 只能调用一次
  let called = false;
  // 需要严格判断保证代码的一致性
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      // 如果x是一个promise 是具有then方法的
      let then = x.then;
      // 如果 then 属性是个函数 这里我们就认为它是一个promsiel
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return;
          called = true;
          resovlePromise(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r)
        })
      } else {
        // 如果then不是函数 还是普通值 那么 就直接resolve作为结果 2.3.3.4
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果 2.3.4
    resolve(x)
  }
}

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallback = []; // 成功回调的数组
    this.onRejectedCallback = []; // 失败回调的数组 

    // 成功状态执行的函数
    let resolve = (value) => {
      if (this.state === PENDING) {
        this.value = value;
        this.state = ONFULFILLED;
        this.onFulfilledCallback.forEach(fn => fn());
      }
    }
    // 失败状态执行的函数
    let reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason;
        this.state = ONREJECTED;
        this.onRejectedCallback.forEach(fn => fn());
      }
    }
    // 立即执行函数
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }
  // then方法接收两个函数onFulfilled 和 另一个函数
  then(onFulfilled, onRejected) {
    // 根据规范2.2.7中的表述可以知道,每调用一个then方法都会返回一个新的promsie
    // 这样我们就能不停的进行then的链式调用
    // 如何调用promsie的成功回调呢？
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === ONFULFILLED) {
        setTimeout(() => {
          try {
            // 用then的返回值 作为下一次的 then的 成功结果。
            let x = onFulfilled(this.value);
            resovlePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      }

      if (this.state === ONREJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resovlePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      }
      // 如果是处于中间状态; 则将函数收集起来
      if (this.state === PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resovlePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resovlePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
      }
    })
    // 将这个promsie2返回出去
    return promise2;
  }
}

// 在promsie 上面添加一个方法
Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

module.exports = Promise;