class CustomPromise {
  // 这个类里面是需要接受一个回调函数的
  constructor(handleFunc) {
    this.state = 'pending';
    this.value = undefined;

    this.fulfilledList = [];
    handleFunc(this.triggerResolve.bind(this));
  }
  
  triggerResolve(val) {

  }
}


// 实例化自己的promise
const createPromise = function (time) {
  return new CustomPromise(function (resolve, reject) {
    return setTimeout(resolve, time);
  })
}

const promiseInstance = createPromise(1000);

promiseInstance.then(function () {
  console.log('hello world');
})
