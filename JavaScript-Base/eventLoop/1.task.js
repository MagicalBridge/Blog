setTimeout(() => {
  console.log('ok1');
}, 1000);

setTimeout(() => {
  console.log('ok2');
}, 1000);

Promise.resolve().then(() => { // 微任务
  console.log('then')
})

// 这部分是典型的主线程代码
function a() {
  function b() {
    function c() {
      console.log('c');
    }
    c();
  }
  b();
}
a();