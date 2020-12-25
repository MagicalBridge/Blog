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
        try {
          // 在then方法执行完之后 会有一个返回值
          let x = onFulfilled(this.value);
          // 这个resolve 是promise2的resolve 这样resolve出去之后
          // 在promsie2的then方法中就能拿到这个返回的结果值。
          resolve(x);
        } catch (e) {
          reject(e);
        }
      }

      if (this.status === REJECTED) {
        try {
          let x = onRejected(this.reason);
          // 在第一个promsie 中执行reject的时候
          // 会走到这个失败会回调 当这个回调返回普通值的时候
          // 依然会传递给下一个的成功值
          resolve(x);
        } catch (e) {
          reject(e)
        }
      }

      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => { // 切片编程
          try {
            let x = onFulfilled(this.value)
            resolve(x);
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallback.push(() => {
          try {
            let x = onRejected(this.reason)
            resolve(x);
          } catch (e) {
            reject(e)
          }
        })
      }
    })
    return promsie2;
  }
}

export default Promise;