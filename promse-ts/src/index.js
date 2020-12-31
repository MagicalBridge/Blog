// 1、promsise 是一个函数或者对象
// 2、promsie 具有三种状态  等待态 成功态 失败态
const PENDING = 'PENDING'
const ONFUNFILLED = 'ONFUNFILLED'
const ONREJECTED = 'ONREJECTED'

// 3、当我们在new Promsie的时候 会传递进去一个函数这个函数会立即执行
class Promsie {
  constructor(executor) {
    this.state = 'PEDDING';
    this.value = undefined;
    this.reason = undefined;

    // 成功状态下执行的函数
    let resolve = (value) => {
      // 这里需要判断一个状态 只有pending的时候才能才能执行这个函数
      if (this.state === PENDING) {
        this.value = value; // 将resolve函数执行时候
        this.state = ONFUNFILLED;
      }
    }

    // 失败状态下执行的函数
    let reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason;   // 将失败的原因赋值给reason
        this.state = ONREJECTED; // 将状态修改为 失败状态
      }
    }
    // new 执行的时候可能会出错，这里捕获异常
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }
  // promise 拥有一个then方法 这个then方法接收两个函数
  // onFulfilled onRejected
  then(onfulfilled) {

  }
}

module.exports = Promsie;