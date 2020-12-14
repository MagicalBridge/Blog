class CustomPromise {

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
