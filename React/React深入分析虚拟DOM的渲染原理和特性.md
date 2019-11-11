## 导读：

react的虚拟dom 和diff算法是react 非常核心的特性，这部分的源码也非常的复杂，理解这部分的知识原理对于更加深入的掌握react是非常必要的。

## 开发中遇到的问题：
* 为何必须引用react
* 自定义的react组件为何需要大写
* react 是如何防止xss攻击的
* react的diff 算法和其他diff 算法的区别
* key 在react 中的作用
* 如何写出高性能的react 组件

如果你对上面的几个问题还存在疑问，说明你对react的虚拟dom和diff算法实现还有欠缺，那么请好好的阅读这篇文章吧。

首先我们看什么是虚拟dom:

## 虚拟DOM
 虚拟dom的图片

在原生的JavaScript程序中，我们直接对DOM进行创建和更改，而dom元素通过我们监听的事件和我们的应用程序进行通讯。

而react会将你的代码转换为一个JavaScript对象，然后这个JavaScript对象再转换为真实的dom，这个JavaScript对象就是所谓的虚拟dom。

比如下面一段代码：
```html
<div class="title">
  <span>Hello ConardLi</span>
  <ul>
    <li>苹果</li>
    <li>橘子</li>
  </ul>
</div>
```
在react可能存储这样的JS代码
```js
const VitrualDom = {
  type: 'div',
  props: { class: 'title' },
  children: [
    {
      type: 'span',
      children: 'Hello ConardLi'
    },
    {
      type: 'ul',
      children: [
        { type: 'li', children: '苹果' },
        { type: 'li', children: '橘子' }
      ]
    }
  ]
}
```
当我们需要创建或者更新元素的时候，react首先会将这个virtualdom对象进行创建和更改，然后再将virtualdom对象渲染成真实的dom；

当我们需要对 dom 进行事件监听的时候，首先对virtualdom进行事件监听，virtualdom会代理原生的dom事件从而做出响应。

## 为何使用虚拟DOM

react为何采用virtualdom这种方案呢？

### 提高开发效率

使用JavaScript，我们在编写应用的时候关注点在如何更新dom。

使用react，你只需要告诉react你想要试图处于什么状态，react则通过virtualdom来确保dom与这个状态相匹配。你不必自己去完成属性操作、事件处理，dom更新，react 会替你完成这一切。

这让我们更加关注我们的业务逻辑而非dom操作，这一点可以大大提高我们的开发效率。

### 关于提升性能

很多文章说，virtualdom 可以提升性能，这一点是片面的。

直接操作dom是非常耗费性能的，这一点毋庸置疑，但是react使用virtualdom也是无法避免操作dom的。

如果是首次渲染，virtualdom不具备任何的优势，甚至它要进行更多的计算，消耗更多的内存。

virtualdom的优势在于react的diff 算法和批处理策略，react 在更新页面之前，提前计算好了如何进行更新和渲染dom。实际上，这个计算过程在直接操作dom时候，也是可以自己判断和实现的，但是这样会非常耗费精力，而且我们自己的实现不如react的好，所以在这个过程中react帮助我们提升了性能。

所以，我更倾向于说，virtualdom帮助我们提升了开发效率，在重复渲染的时候它帮助我们计算如何更加高效的更新，而不是它比dom操作更快。

### 跨浏览器兼容
图片的


react基于 virtualdom自己实现了一套自己的事件机制，自己模拟了事件冒泡和事件捕获的过程，采用了事件代理，批量更新等方法，抹平了各个浏览器的兼容性问题。

### 跨平台兼容
virtualdom 为react 带来了跨平台的渲染的能力，以react Native为例子， react 根据virtualdom画出相应平台的UI层，只不过不同平台画的姿势不同而已。

## 虚拟dom的实现原理
如果你不想看复杂的源码，或者没有足够的时间，可以跳过这一章，直接看后面的特性总结

图片

在上面图上，我们继续扩展，按照图中的流程，我们依次来分析虚拟dom的实现原理

### jsx和createElement

我们在实现一个react组件的时候可以选择两种编码方式，第一种是 jsx编写：
```js
class Hello extends Component {
  render() {
    return <div>Hello ConardLi</div>;
  }
}
```
第二种是直接使用react.createElement 编写：
```js
class Hello extends Component {
  render() {
    return React.createElement('div', null, `Hello ConardLi`);
  }
}
```
实际上，上面两种写法是等价的，JSX只是为 `React.createElement(component, props, ...children)`方法提供的语法糖。也就是说所有的JSX代码最后都会转换成`React.createElement(...)`，Babel帮助我们完成了这个转换的过程。

如下面的 jsx；
```js
<div>
  <img src="avatar.png" className="profile" />
  <Hello />
</div>
```
将会被Babel转换为
```js
React.createElement("div", null, React.createElement("img", {
  src: "avatar.png",
  className: "profile"
}), React.createElement(Hello, null));
```

注意，babel 在编译时候回判断jsx中的组件的首字母,当首字母为小写的时候，其被认定是原生的DOM标签，`createElement`的第一个变量被编译为字符串,当首字母为大写时候，其被认定为自定义组件，createElement的第一个变量被编译为对象。

另外，由于jsx提前要被 Babel 编译，所以jsx是不能在运行时候动态选择类型的，比如下面的代码：

```js
function Story(props) {
  // Wrong! JSX type can't be an expression.
  return <components[props.storyType] story={props.story} />;
}
```
需要变成下面的写法：
```js
function Story(props) {
  // Correct! JSX type can be a capitalized variable.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```
所以，使用JSX你需要安装Babel插件babel-plugin-transform-react-jsx
```js
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "React.createElement"
    }]
  ]
}
```



