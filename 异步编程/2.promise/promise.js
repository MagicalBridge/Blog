const PEDNDING = 'PEDNDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

// 统一处理promise
const resolvePromise = (promise2, x, resolve, reject) {

}

class Promise {
  // 1、看这个属性能否在原型上使用
  // 2、看属性是否公用
  constructor(executor) {
    this.status = PEDNDING // 默认是PEDNDING
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原型
    this.onResolvedCallbacks = []; // 成功回调的数组
    this.onRejectedCallbacks = []; // 失败的回调的数组
    // 成功函数 value 成功的原因
    let resolve = (value) => {
      if (this.status === PEDNDING) {
        this.value = value;
        this.status = RESOLVED;
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    // 失败函数 reason 失败的原因
    let reject = (reason) => {
      if (this.status === PEDNDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject); // 默认执行器会立即执行
    } catch (e) {
      // 如果执行时发生了错误等价于调用了失败方法
      reject(e)
    }
  }
  then(onfulfilled, onrejected) {
    // 这里相当于自己new自己 
    let promise2 = new Promise((resolve, reject) => { // executor 立即执行
      if (this.status === RESOLVED) {
        // 在实际调用的时候会有这样一个返回值 我调用完then 方法之后，会返回另一个promise(这个真的是精髓)
        let x = onfulfilled(this.value);
        // x可能是普通值，也可能是promise 
        // 判断x的值 => promise2的状态
        // 这里写一个公共的方法，这个方法用于解析x 和 promise2之间的关系
        resolvePromise(promise2, x, resolve, reject);
      }
      if (this.status === REJECTED) {
        onrejected(this.reason);
      }
      // 如果是中间状态的话
      if (this.status === PEDNDING) {
        // 如果是异步，就先订阅好
        this.onResolvedCallbacks.push(() => {
          onfulfilled();
        })

        this.onRejectedCallbacks.push(() => {
          onrejected();
        })
      }
    })

    // 链式调用每次都返回一个新的promise 
    return promise2
  }
}

module.exports = Promise