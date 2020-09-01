const PEDNDING = 'PEDNDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
  // 1、看这个属性能否在原型上使用
  // 2、看属性是否公用
  constructor(executor) {
    this.state = PEDNDING // 默认是PEDNDING
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原型
    // 成功函数 value 成功的原因
    let resolve = (value) => {
      if (this.state === PEDNDING) {
        this.value = value;
        this.state = RESOLVED;
      }
    }
    // 失败函数 reason 失败的原因
    let reject = (reason) => {
      if (this.state === PEDNDING) {
        this.reason = reason;
        this.state = REJECTED;
      }
    }
    try {
      executor(resolve, reject); // 默认执行器会立即执行
    } catch (e) {
      // 如果执行时发生了错误等价于调用了失败方法
      reject(e)
    }
  }
  // TODO 这个then方法接收两个方法用于成功回调和失败回调。
  then() {}
}

module.exports = Promise