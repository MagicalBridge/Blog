const PENDING = 'PENDING'; // 等待
const RESOLVED = 'RESOLVED'; // 成功
const REJECTED = 'REJECTED'; // 失败

class Promise {
  constructor(executor) {
    // 初始化时候状态是pending状态
    this.status = PENDING;
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;

    // 成功函数(这种写法保证thiis指向)
    let resolve = (value) => {
      // 为了防止调取reject之后再调取resolve 需要屏蔽
      if (this.status === PENDING) {
        this.value = value;
        // 将当前的状态更改为 成功态
        this.status = RESOLVED;
      }
    }

    // 失败函数
    let reject = (reason) => {
      // 为了防止调取resolve之后再调取reject 需要屏蔽
      if (this.status === PENDING) {
        this.reason = reason;
        // 将当前的状态更改为失败态
        this.status = REJECTED;
      }
    }
    // 在执行构造器的时候有可能的情况是直接抛出错误，这种情况下，我们视为
    // 失败，直接reject即可
    try {
      // 构造promise实例的时候传入立即执行函数
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  // 每个promise实例都有一个then方法
  // then方法我们在调用的时候传递进去了两个函数
  // 一个是 onfulfilled onrejected
  then(onfulfilled, onrejected) {
    if (this.status === RESOLVED) {
      onfulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onrejected(this.reason);
    }
  }
}

module.exports = Promise;