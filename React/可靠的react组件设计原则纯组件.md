### 纯组件和几乎纯组件

> 纯组件总是为相同的属性值渲染相同的内容。几乎纯的组件总是为相同的属性值呈现相同的元素，但是会产生副作用。

在函数式编程中，对于给定的相同输入，纯函数总是返回相同的输出，并且不会对外界产生副作用。

```js
function sum(a, b) {
  return a + b;
}
sum(5,10) // => 15
```

对于给定的两个数字，sum() 函数总是会返回相同的结果。

当一个函数输入相同，而输出不同的时候，它就不是一个纯函数组件，当这个函数依赖于全局状态的时候，就不是一个纯函数，例如：

```js
let said  = false;

function sayOnce(message){
  if(said){
    return null;
  }
  said = true;
  return message;
}
sayOnce('Hello World!'); // => 'Hello World!'
sayOnce('Hello World!'); // => null
```

`sayOnce('Hello World!')` 第一次调用时，返回 `Hello World`.

即使输入参数相同，都是 `Hello World`，但是第二次调用 `sayOnce('Hello World!')`，返回的结果是 `null` 。这里有一个非纯函数的特征：依赖全局状态 `said`

`sayOnce()` 的函数体内，`said = true` 修改了全局状态，对外界产生的副作用，这也是非纯函数的特征之一。

而纯函数没有副作用且不依赖于全局状态。只要输入相同，输出一定相同。因此，纯函数的结果是可预测的，确定的，可以复用，并且易于测试。

`React` 组件也应该考虑设计为纯组件，当 `prop` 的值相同时， 纯组件(注意区分`React.PureComponent`)渲染的内容相同，一起来看例子:

```js
function Message({text}){
  return <div className="message">{tetx}</div>
}

<Message text="Hello World!>

// => <div class="message">Hello World</div>
```

当传递给 `Message` 的 `prop` 值相同时，其渲染的元素也相同。

