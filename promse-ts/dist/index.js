Function.prototype.before = function (fn) {
  // this 指向当前的实例
  return () => {
    fn();
    this();
  }
}

// 核心函数逻辑
function core() {
  console.log('core...');
}

let fn = core.before(() => {
  console.log('before core...');
})

fn();