const PEDNDING = 'PEDNDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

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
    if (this.status === RESOLVED) {
      onfulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onrejected(this.reason);
    }
    // 如果是中间状态的话
    if (this.status === PEDNDING) {
      // 如果是异步，就先订阅好
      this.onResolvedCallbacks.push(() => {
        // todo 这里可以做一些事情
        onfulfilled();
      })

      this.onRejectedCallbacks.push(() => {
        onrejected();
      })
    }
  }
}

module.exports = Promise