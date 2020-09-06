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

// 统一处理promise 所有的promsie 都遵循这个规范
const resolvePromise = (promise2, x, resolve, reject) => {
  // 核心就是判断 x 的值是不是promise 如果是promise 就采用状态调用成功或者失败
  // 如果是普通的值 调用resolve 
  if (promise2 === x) {
    return reject(new TypeError('循环引用问题'))
  }
  // 判断x的类型
  if (typeof x === 'object' && x !== null || typeof x === 'function') {
    let called
    // 在取值的时候可能抛出异常
    try {
      let then = x.then
      // 如果then是函数，说明x 包含then 方法 我就认为x 就是一个promise
      if (typeof x === 'function') {
        then.call(x, y => {
          if (called) {
            return
          }
          called = true // 防止多次调用成功和失败
          resolvePromise(y) // 采用promsie的成功结果，将值向下传递 y可能还是一个promsie 递归调用直到 解析出来的是一个普通值
        }, r => {
          if (called) {
            return
          }
          called = true
          reject(r) // 采用失败结果向下传递
        }) // 这样能保证不用重复取then的值
      } else { // 就认为x是是个普通对象
        resolve(x)
      }
    } catch (error) {
      // 失败了 还有可能调用成功
      if (called) {
        return
      }
      called = true
      reject(error)
    }
  } else {
    // 说明 x 是一个普通值 直接让promsie2 成功即可
    resolve(x)
  }
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
    // 这里相当于自己new自己，通过梳理promise调用then 方法之后还可以不断的调用新的
    // promise， 
    let promise2 = new Promise((resolve, reject) => { // executor 立即执行
      if (this.status === RESOLVED) {
        // 这里强制异步 为了能够在下一次的循环中拿到promise2 
        setTimeout(() => {
          // 如果在调用promsie2的时候直接抛出异常了这个时候为了能够处理内部异常
          // 需要在定时器中添加try catch 捕获异常
          try {
            // 在实际调用的时候会有这样一个返回值 我调用完then 方法之后，会返回另一个promise(这个真的是精髓)
            let x = onfulfilled(this.value);
            // x可能是普通值，也可能是promise 
            // 判断x的值 => promise2的状态
            // 这里写一个公共的方法，这个方法用于解析x 和 promise2之间的关系
            // 如果x 是 promsie 我们就让它直接执行 如果 x 是一个普通的值 直接调用 resolve 方法
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      // 如果是中间状态的话
      if (this.status === PENDING) {
        // 如果是异步，就先订阅好 这里在数组中并没有 直接push一个函数，而是
        // 使用面向切面的方式 返回一个函数 这个函数里面再执行这个成功回调
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
        // 将所有的失败回调函数都放进这个数组里面 等到reject的时候依次执行
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0);
        })
      }
    })

    // 链式调用每次都返回一个新的promise
    return promise2
  }
}

module.exports = Promise