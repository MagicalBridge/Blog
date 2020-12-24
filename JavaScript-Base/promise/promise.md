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


## Promise基础

在支持ES6的高级浏览器中，我们通过new Promise() 即可构造一个promise实例。

这个构造函数接收一个函数，分别接受两个参数，resolve 和 reject 代表着我们需要改变当前实例的状态到`已完成`或者是`已拒绝`。

```js
function promise1() {
  return new Promise(function (resolve, reject) {
    // 定义异步的内容
    setTimeout(function () {
      console.log('1s 后输出');
      // 输出完成之后，调用函数传入的 resolve 函数，将该 promsie实例标记为
      // 已经完成，当前promise串行继续执行
      resolve();
    }, 1000)
  })
}

function promise2() {
  return new Promise(function (resolve, reject) {
    // 定义异步的内容
    setTimeout(function () {
      console.log('2s 后输出');
      resolve();
    }, 2000)
  })
}
```

上面两个promise实例，串联起来即可写成:
```js
promise1().then(function() {
  return promise2();
})
```

浏览器中执行可以看到 1s之后出现 `1s 后输出`字样，再经过 2s出现 `2s 后输出`字样，在这个例子中我们可以看到，当前promise如果状态已完成(执行了resolve方法)，那么就会去执行then方法中下一个promise函数。

同样的，如果我们的promise变为已经拒绝的状态（执行了reject方法），那么就会进入后续的异常处理函数中。

```js
function promise3() {
  return new Promise(function(resolve, reject) {
    var random = Math.random() * 10;
    setTimeout(function() {
      if (random >= 5) {
        resolve(random);
      } else {
        reject(random);
      }
    }, 1000);
  })
}
var onResolve = function (val) {
  console.log('已经完成: 输出的数字是', val);
}

var onReject = function (val) {
  console.log('已经拒绝: 输出的数字是', val);
}
```

promise的then方法可以接收两个参数，这两个参数都是函数,第一个函数在resolve后执行，第二个函数在reject后执行。

```js
promise3().then(onResolve, onReject);
```

也可以通过 .catch 方法拦截状态变为已经拒绝时候的promise
```js
promise3().catch(onReject).then(onResolve);
```

也可以通过 try catch 进行拦截状态变为已拒绝的promsie
```js
try {
  promise3().then(onResolve);
} catch (e) {
  onReject(e)
}
```

这个例子，使用了三种方法拦截最终变为 「已拒绝」状态的promise，分别是使用then的第二个参数，使用.catch方法捕获前面promise抛出的异常，使用try catch 拦截代码块中promise抛出的异常。

同时我们发现，在改变promise状态时候调用resolve 和 reject 函数的时候，也可以给下一步then中执行的函数传递参数。这个例子中我们把随机生成的数字传递给了resolve 和 reject函数，我们也就能在then中执行函数的时候拿到这个值。

稍微总结一下:
* 1 promise会有三种状态 「进行中」 「已完成」 「已拒绝」 进行中状态可以更改为已完成或者已拒绝，已经更改状态之后无法再继续更改
* 2、ES6中的Promise 构造函数，我们构造之后需要传入一个函数，它接收两个函数参数，执行第一个参数之后就会改变当前promise为「已完成」状态，执行第二个参数之后变为「已拒接」状态。
* 3、通过 .then方法，即可在上一个promise达到已完成时候继续执行下一个函数或者promise。同时通过resolve或者reject时传入参数，即可给下一个函数或者promise传入初始值。
* 4、已经拒绝的promise，后续可以通过 .catch 方法或者是 .then方法的第二个参数或是try catch 进行捕获。


## promise有哪些优缺点

* 优点:

1）可以解决异步嵌套问题
2）可以解决多个异步并发问题

* 缺点:
  1) promise是基于回调的
  2) promise没有办法终止异步

* 1）promise其实是一个规范，所有基于这个规范实现的promsie我们都认为是合法的promise
* 2）首先promise是一个类, 这个类里面有三个状态, 等待态、成功态、失败态。
* 3）promise这个类，接收一个函数，这个函数我们叫做executor（执行器），这个函数会立即执行。
* 4) 这个executor函数接收两个函数作为参数，第一个参数是resolve，第二个参数是reject，resolve代表成功，reject代表失败。
* 5) 每一个promise实例都有一个then方法。这个then方法也有参数，一个是onfullfiled, 一个是onrejected。当 resolve执行的时候，走then的成功回调，当执行reject执行的时候，走then的失败回调。
```js
let promise = new Promise((resolve, reject) => {
  resolve('hello')
}).then((data) => {
  console.log(data); // hello
}, (err) => {
  console.log('err' + err);
})
```
上面这段代码中执行了resolve函数，在then的成功回调中，接收到了resolve传递过来的数据，会在控制台打印hello。

如果我们执行reject,则在then的失败回调中打印reject传递出来的信息。

```js
let promise = new Promise((resolve, reject) => {
  reject('错误信息')
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err' + err); // err错误信息
})
```
* 6) 从等待态只要是到了`成功态`或者`失败态`中的任何一个状态,都不能转换成另外一种状态了。
```js
let promise = new Promise((resolve, reject) => {
  reject('错误信息')
  resolve('hello')
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err' + err); // err错误信息
})
```
上述代码中,先执行了reject函数，然后再执行 resolve 最后输出的只有err,因为已经确定的状态，不会改变了。

* 7) 如果promise变成了失败态,就会走reject。（抛出错误也算失败）

```js
let promise = new Promise((resolve, reject) => {
  throw new Error('抛出异常');
  resolve('hello');
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err' + err); // errError: 抛出异常
})
```
如上面的代码所示，当我们抛出异常之后，并不会走成功的resolve了。

* 8) 基于上面所说的这些情况我们来实现第一版代码
```js
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
```

* 9）还有一种情况,如果我们在exector函数中执行的是一个异步函数应该如何处理，比如下面这样
```js
let promise = new Promise((resolve, reject) => {
  setTimeout(()=>{
    resolve('hello');
  },1000)
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err' + err);
})
```

基于这种场景，我们可以思考一红解决方案，就是发布订阅模式，我们知道, then 方法要限于 setTimeout 里面的
resolve 执行，那么我们给then 传递进去的函数，一个是成功回调函数，一个是失败回调函数，需要在知道promise的结果
之后才去执行，因此，我们需要有个空间来存储这些值，等到结果确定之后，依次触发这些函数。

我们想到使用数组来进行这个操作。

来看具体实现的代码：

```js
const PENDING = 'PENDING' // 等待态常量
const FULFILLED = 'FULFILLED'  // 成功态常量
const REJECTED = 'REJECTED' // 失败态常量

class Promise {
  constructor(executor) {
    // 在构造函数中创建这个状态, 每new出来一个 promise 实例 都拥有这些方法
    this.status = PENDING;
    // 一个promsie有一个成功的值和一个失败的原因
    this.value = undefined; // 成功原因
    this.reason = undefined;  // 失败原因

    this.onFulfilledCallback = []; // 成功回调的数组
    this.onRejectedCallback = []; // 失败回调数组

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallback.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallback.forEach(fn => fn());
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }

    if (this.status === PENDING) {
      this.onFulfilledCallback.push(() => { // 切片编程
        onFulfilled(this.value)
      })

      this.onRejectedCallback.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

export default Promise;
```













