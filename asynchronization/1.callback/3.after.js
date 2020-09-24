// after 在...什么之后
// 我们希望有这样一个场景, after 返回一个函数暂且叫他fn 在fn 执行三次的时候 回调函数才会执行。

// 执行上下文并没有被销毁
function after(times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  }
}

let fn = after(3, function () {
  console.log('really');
})

fn();
fn();
fn();