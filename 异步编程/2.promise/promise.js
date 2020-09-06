// 1) 默认是pending状态
// 2）new promise的时候传入的是函数 这个执行器会立即执行
// 3）executor 接收两个函数
// 4）resolve 的时候传递的是成功的值 我们暂定为 value 失败的时候我们会传递出去失败的原因 reason 这两个原因初始化都是 undefined
// 5）如果当前呀，我已经调取了resolve 再去调取reject 不能被允许，因此只有在pending的状态下才真正的去执行
// 6）如果执行的时候抛出来错误，等价于调用了 reject 方法
// 7）总结一下 这是个类,status记录 此时的状态, 成功有一个成功状态，失败有一个失败状态 还有一个then 方法
// 8) then 方法接收两个 方法 一个成功时候执行，一个失败时候执行 onfulfilled onrejected  
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

// 统一处理promise
const resolvePromise = (promise2, x, resolve, reject) => {
  return null
}

class Promise {
  // 1、看这个属性能否在原型上使用
  // 2、看属性是否公用
  constructor(executor) {
    this.status = PENDING // 默认是PEDNDING
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原型
    this.onResolvedCallbacks = []; // 成功回调的数组
    this.onRejectedCallbacks = []; // 失败的回调的数组
    // 成功函数 value 成功的原因
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        // 调用resolve的时候，将放在数组中等待执行的函数执行
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    // 失败函数 reason 失败的原因
    let reject = (reason) => {
      if (this.status === PENDING) {
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
      if (this.status === PENDING) {
        // 如果是异步，就先订阅好 这里在数组中并没有 直接push一个函数，而是
        // 使用面向切面的方式 返回一个函数 这个函数里面再执行这个成功回调
        this.onResolvedCallbacks.push(() => {
          onfulfilled(this.value);
        })

        this.onRejectedCallbacks.push(() => {
          onrejected(this.reason);
        })
      }
    })

    // 链式调用每次都返回一个新的promise 
    return promise2
  }
}

module.exports = Promise