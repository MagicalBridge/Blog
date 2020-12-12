## 为什么需要promise？

JavaScript 是一门单线程的语言，所以早期我们解决异步的场景时，大部分情况都是通过回调函数的形式进行的。

例如在浏览器中发送ajax请求，就是常见的一个异步场景，发送请求之后，一段时间服务端响应之后我们才能拿到结果，如果我们希望在异步结束之后执行某一个操作，就只能通过回调函数这样的方式进行操作。

```js
var dynamicFunc = function (cb) {
  setTimeout(function () {
    cb();
  }, 1000)
}

dynamicFunc(function () {
  console.log(123)
})
```

例如上面这个例子,这里的 dynamicFunc 就是一个异步函数，里面执行的 setTimeout 会在1s之后调用传入的cb函数，按照上面的调用方式，最终1s之后，会打印123这个结果。

同样的，如果后续还有内容需要在异步函数结束时输出的话，就需要多个异步函数进行嵌套，非常不利于后续的维护。

```js
setTimeout(function () {
  console.log(123);
  setTimeout(function () {
    console.log(234);
  }, 2000)
}, 1000)
```

为了能使回调函数以更优雅的方式进行调用，在ES6中js产生了一个名为promise的新的规范，它让异步操作变得近乎「同步化」。

