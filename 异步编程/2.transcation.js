// AOP面向切面编程的主要作用是把一些核心的业务抽离出来。
/**
 * @param {*} anyMethod 
 * @param {*} wrappers 
 */
// 这里是个高阶函数
function perform(anyMethod, wrappers) {
  return function () {
    wrappers.forEach(wrapper => wrapper.initialize());
    anyMethod();
    wrappers.forEach(wrapper => wrapper.close());
  }
}

let newFn = perform(function () {
  console.log('say');
}, [
  { // wrap1
    initialize() {
      console.log('wrapper1 beforeSay');
    },
    close() {
      console.log('wrapper1 close');
    }
  }, {
    initialize() { // wrap2
      console.log('wrapper2 beforeSay');
    },
    close() {
      console.log('wrapper2 close');
    }
  }
])

newFn();