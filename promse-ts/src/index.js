// promsie 里面最重要的还是链式调用 
// promsie 在调取then方法之后，这个then方法会返回一个新的promise
// 这个新的promise也拥有then方法。
// 理解then方法 无论成功还是失败 都可以返回结果
// 1、出错了  
// 2、返回一个普通值 所谓的普通值 指的是不是promise。
// 3、是promsie的情况  会采用promsie解析后的结果传递给下一个人

const PENDING = 'PENDING' // 等待态常量
const FULFILLED = 'FULFILLED'  // 成功态常量
const REJECTED = 'REJECTED' // 失败态常量
// 因为在执行onfilfilled的时候 返回的x不一定是 普通值 还有可能是一个promsie
// 所以这里面单独抽离出来这个函数进行处理。
function resolvePromise(promise2, x, resolve, reject) {
  // 判断x的值决定promie2的关系 来判断x 可能是别人的promsie
  // 根据规范来说，这个x不能是promise2自己 这样就相当于自己等待自己的结果
  if (x === promise2) {
    return reject(new TypeError('出错了'))
  }
  // x 必须是对象 并且 x 不是null x 可能是个函数呢（这是promiseA+ 规范中的内容）
  if ((typeof x === 'object' && x !== null) && typeof x === 'function') {
    // 这里为什么要取then方法呢，很显然根据规范来说 拥有then方法的才能称之为promise
    // 但是在取then方法的时候可能会抛出异常

    // 添加一个标识 调用标识
    let called = false; // 表示既没有调用过成功和失败

    try {
      let then = x.then;
      // 如果then是一个函数
      if (typeof then === 'function') {
        // 执行这个then 并绑定this指向 x 
        then.call(x, y => {
          // 这个部分就涉及到递归解析的部分了 反复琢磨和理解
          if (called) {
            return
          }
          called = true;
          resolvePromise(promsie2, y, resolve, reject);
        }, r => {
          if (called) {
            return
          }
          called = true;
          // 失败了不需要递归解析了
          reject(r)
        })
      }
    } catch (e) {
      if (called) {
        return
      }
      called = true;
      reject(e);
    }
  } else { // 如果不是，那一定是一个普通值 promise 必须要有then方法
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    // 在构造函数中创建这个状态, 每new出来一个 promise 实例 都拥有这些方法
    this.status = PENDING;
    // 一个promsie有一个成功的值和一个失败的原因
    this.value = undefined; // 成功原因
    this.reason = undefined;  // 失败原因

    this.onFulfilledCallback = []; // 成功回调的数组
    this.onRejectedCallback = []; // 失败回调数组

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallback.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallback.forEach(fn => fn());
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    // 每次执行then方法的时候都会产生一个全新的promise
    // 这里涉及的是递归调用方式, 同样的接收 一个立即执行函数
    // 立即执行函数中 接收两个 函数
    let promsie2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // 在then方法执行完之后 会有一个返回值
            let x = onFulfilled(this.value);
            // 这个resolve 是promise2的resolve 这样resolve出去之后
            // 在promsie2的then方法中就能拿到这个返回的结果值。
            // resolve(x);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            // 在第一个promsie 中执行reject的时候
            // 会走到这个失败会回调 当这个回调返回普通值的时候
            // 依然会传递给下一个的成功值
            // resolve(x);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => { // 切片编程
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              // resolve(x);
              resolvePromise(promsie2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0);
        })

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              // resolve(x);
              resolvePromise(promsie2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
      }
    })
    return promsie2;
  }
}

export default Promise;