```js
const PENDING = 'PENDING'
const RESOVLED = 'RESOVLE'
const REJECTED = 'REJECTED'
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined
    this.resson = undefined

    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOVLE;
      }
    }

    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED
      }
    }
    
    try {
      executor()
    }catch(e) {
      reject(e)
    }
  }
  // then 方法 接收一个成功回调和一个失败回调，这是可选的
  then(onfulfilled, onrejected) {
    if(this.status === RESOLVED) {
      onfulfilled(this.value);
    }

    if(this.status === REJECTED) {
      onrejected(this.reason);
    }
  }
}
```