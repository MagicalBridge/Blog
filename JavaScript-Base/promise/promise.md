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

* 10) promise 中比较难以理解的就是链式调用了

1、promsie的then方法，无论成功还是失败都可以返回结果，换句话说 then成功回调可以有返回值，then的失败回调也可以有返回值。
2、这个结果我们一般分为三种类型
  1、出错了 只要是出错了就走到错误里面 
  2、返回一个普通值 所谓的普通值，指的是不是promsie的值。就会作为下一次then的成功结果。
  3、返回了一个新的 promise **会采用返回的 promsie 的状态** 用promise解析后的结果传递给下一个。

从上面的描述中可以看出，promise 只有两种情况会失败，第一种情况是 我返回的promise中调用了 reject，
第二种情况是，方法中有一个throw new Error() 这种抛出错误的场景。


根据规范中的描述:
  * 1、每调用一次then方法，就会返回一个新的promise。为什么不能像jq那样返回this呢，因为当第一个promise失败之后，状态已经变了
  上文说道，抛出异常之后走第一个promsie，之后还可以走入第二个promsie的成功。规范:2.2.7

  * 2、这个promise 我们暂且叫他promise2,这个promsie2 中也是嫩够接收到上一次promsie的executor方法, 如果executor中执行了resolve那么 会走自己then方法的成功回调，在这个成功回调中同样会返回一个值,如果这个值是普通值，会传递给promise2的then方法的成功回调。为了实现这个效果，

```js
let promise = new Promise((resolve,reject) => {
  resolve('ok')
}).then((data) => {
  console.log(data)
},(err) => {
  console.log('err' + err)
})

//生成的promise实例
promise.then((data)=>{
  console.log(data)
},err => {
  console.log(err)
})
```

* 11) 在第一个promise的then方法中，无论在成功回调还是失败回调，都有可能抛出错误。
只要是抛出异常这种情况，直接走 promise2的reject方法。所以这里需要使用 try catch 来同步捕获异常
```js
const PENDING = 'PENDING'; // 中间态
const ONFULFILLED = 'ONFULFILLED'; // 成功
const ONREJECTED = 'ONREJECTED' // 失败

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallback = []; // 成功回调的数组
    this.onRejectedCallback = []; // 失败回调的数组 

    // 成功状态执行的函数
    let resolve = (value) => {
      if (this.state === PENDING) {
        this.value = value;
        this.state = ONFULFILLED;
        this.onFulfilledCallback.forEach(fn => fn());
      }
    }
    // 失败状态执行的函数
    let reject = (reason) => {
      if (this.state === PENDING) {
        this.reason = reason;
        this.state = ONREJECTED;
        this.onRejectedCallback.forEach(fn => fn());
      }
    }
    // 立即执行函数
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e)
    }
  }
  // then方法接收两个函数onFulfilled 和 另一个函数
  then(onFulfilled, onRejected) {
    // 根据规范2.2.7中的表述可以知道,每调用一个then方法都会返回一个新的promsie
    // 这样我们就能不停的进行then的链式调用
    // 如何调用promsie的成功回调呢？
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === ONFULFILLED) {
        try {
          // 用then的返回值 作为下一次的 then的 成功结果。
          let x = onFulfilled(this.value);
          resolve(x)
        } catch (e) {
          reject(e)
        }
      }

      if (this.state === ONREJECTED) {
        try {
          let x = onRejected(this.reason);
          resolve(x)
        } catch (e) {
          reject(e)
        }
      }
      // 如果是处于中间状态; 则将函数收集起来
      if (this.state === PENDING) {
        this.onFulfilledCallback.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolve(x)
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallback.push(() => {
          try {
            let x = onRejected(this.reason);
            resolve(x)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    // 将这个promsie2返回出去
    return promise2;
  }
}

module.exports = Promise;
```

* 12）onfulfilled 和 onrejected 还有可能返回一个promsie

参见规范 2.2.7.1 

这个函数传递4个参数，规范中传递的是两个参数, 这里我们不妨将 promsie2的
resolve 和 reject 方法也传递给它,  主要的目的是 判断x 是不是一个普通的值

如果 x 是一个普通值，直接调用 promsie2的resolve方法，如果是一个promsie就要采用它的状态

```js
const PENDING = 'PENDING' // 等待态常量
const FULFILLED = 'FULFILLED'  // 成功态常量
const REJECTED = 'REJECTED' // 失败态常量

function resolvePromise(promise2, x, resolve, reject) {

}

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
    let promsie2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (e) {
            reject(e)
          }
        }, 0);
      }

      if (this.status === PENDING) {
        this.onFulfilledCallback.push(() => { // 切片编程
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promsie2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0);
        })

        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promsie2, x, resolve, reject);
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
      }
    })
    return promsie2;
  }
}

export default Promise;
```

* 13）在规范中的 2.2.4 中说了一个事情, onFulfilled 和 onRejected 不能被调用在当前的执行上下文栈中

对于是promsie的情况我们需要新添加一个resolvePromsie函数进行处理，并且规范中说了
onfulfilled 和 onrejected 必须是异步的。所以还需要抽出来一个定时器。包裹着这段代码。

如何让这个 onFulfilled 和 onRejected 异步执行呢？这里使用一个 定时器去解决。

























