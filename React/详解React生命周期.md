## React16.0前面的生命周期
简单来说，react16.0之前的生命周期可以分为四个阶段:

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d06a29b8c47940fbaef96cb0a7a805cf~tplv-k3u1fbpfcp-zoom-1.image)

### 一、组件初始化阶段（Initialization）

也就是以下代码中类的构造方法`（constructor）`,`Test`类继承了 `react Component` 这个基类，也是因为继承了这个基类，才能拥有 `render()`,生命周期等方法可以使用，这也说明了为什么函数组件不能使用这些方法的原因。

`super(props)` 用来调用基类的构造方法`constructor()`,也将父组件的`props`注入给子组件，供子组件读取。组件中的`props`只读不可变，`state`可变。

而`constructor()`用来做一些组件的初始化工作，如定义`this.state`的初始内容。

```js
import React, {Component} from 'react';

class Test extends Comonent {
  constructor(props) {
    super(props)
  }
}
```

### 二、组件的挂载阶段（Mounting）

此阶段分为 `componentWillMount`,`render`,`componentDidMount` 三个时期。

* `componentWillMount`: 

在组件挂载到DOM前调用，且只会被调用一次,在这个生命周期函数中调用 `this.setState()`不会引起组件重新渲染，也可以把写在这里面的内容提前到 `constructor()`中，所以项目中很少使用。**这个生命周期钩子将被废弃**。

* `render`:

根据组件的`props`和`state`变化来执行渲染工作, **render是纯函数, 所谓的纯函数指的是函数的返回结果只依赖于它的参数，函数执行的过程中没有副作用产生。**

* `componentDidMount`:

组件挂载到DOM后调用，且只会调用一次。

### 三、组件的更新阶段（Update）

>**首先要明确react组件更新机制，setState引起的state更新或者父组件重新render引起的props更新，更新后的state和props相对之前无论是否有变化，都将引起子组件的重新render**

造成组件更新有**两类**（三种）情况:

第一类、父组件重新render

父组件重新render引起子组件重新render的情况有**两种**:

**a.直接使用父组件传递进来的props**

这种方式，父组件改变props后，子组件重新渲染，由于直接使用的props，所以我们不需要做什么就可以正常显示最新的props

每当父组件重新`render`导致的重新传递`props`，子组件将直接跟着重新渲染，无论`props`是否有变化。**可以通过`shouldComponentUpdate`方法优化。**

```js
class Child extends Component {
  // 应该使用这个方法，否则无论props是否有变化都
  // 会导致组件跟着重新渲染
  shouldComponentUpdate(nextProps) {
    if (nextProps.someThings === this.props.someThings) {
      return false
    }
  }

  render() {
    return (
      <div>
        {this.props.someThings}
      </div>
    )
  }
}
```

**b.在componentWillReceiveProps 方法中，将props转换成自己的state**

这种方式，我们使用的是state，所以每当父组件每次重新传递props时，我们需要重新处理下，将props转换成自己的state，这里就用到了 `componentWillReceiveProps`。

```js
class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someThings: props.someThings
    }
  }

  // 父组件重传props时候就会调用这个方法
  componentWillReceiveProps(nextProps) {
  	// 将父组件传入进来的props赋值给state
    this.setState({
      someThings: nextProps.someThings
    });
  }

  render() {
    return (
      <div>
        {this.state.someThings}
      </div>
    )
  } 
}
```

根据官方描述
> 在该函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染。

因为`componentWillReceiveProps`中判断props是否变化了，若变化了，`this.setState()` 将引起state的变化，从而引起render，此时就没有必要再做第二次因重传props引起的render了，不然重复做一样的渲染。

第二类、组件本身调用 `setState` 无论`state`有没有变化，都会引起重新渲染，可以通过 `shouldComponentUpdate` 方法优化。

```js
class Child extends Component {
  constructor(props) {
    super(props)
    this.state = {
      someThings: 1
    }
    // 应该使用这个方法，否则无论state是否有变化都将会引起组件的重新渲染
    shouldComponentUpdate(nextStates) {
      // 如果更新后的state和当前的state对比没有变化，阻止重新渲染
      if(nextStates.someThings === this.state.someThings) {
        return false
      }
    }
    // 虽然调用了setState，但是state并没有变化
    handleClick = () => {
      const preSomeThings = this.state.someThings;
      this.setState({
        someThings: preSomeThings
      })
    }

    render() {
      return (
        <div onClick = {this.handleClick}>
          {this.state.someThings}
        </div>
      )
    }
  }
}
```

弄清楚了react组件的更新机制，我们回归正题，继续梳理更新阶段。

此阶段分为:
`componentWillReceiveProps`, 
`shouldComponentUpdate`, 
`componentWillUpdate`, 
`render`, 
`componentDidUpdate`

* **componentWillReceiveProps(nextProps)**

此方法只调用于`props`引起的组件更新过程中，响应props变化之后进行更新的唯一方式，参数`nextProps`是父组件传递给当前组件的新的`props`。
但是父组件render方法的调用不能保证重传给当前组件props是有变化的，所以在此方法中根据`nextProps`和`this.props`来查明重传的`props`是否有改变，以及如果改变了要执行什么操作，比如根据新的props调用`this.setState`来触发当前组件的重新`render`。

* **shouldComponentUpdate(nextProps,nextState)**

此方法通过比较`nextProps`，`nextState` 以及当前组件的`this.props`, `this.state` 返回true时当前组件将继续执行更新操作，返回false则当前组件更新停止，借助此特性来减少组件的不必要渲染，优化组件的性能。

这里也可以看出，就算`componentWillReceiveProps()`中执行了`this.setState`,更新了state, 但是在render之前 比如在 `shouldshouldComponentUpdate` 和 `componentWillUpdate` `this.state` 依然指向更新前的`state`，不然`nextState`以及当前组件的`this.state`的对比就一直是true了。

如果`shouldComponentUpdate`返回false 那就一定不用 `rerender`(重新渲染)这个组件了，组件的React elements(组件元素)也不用去对比。但是如果 `shouldComponentUpdate` 返回true 会进行组件的React elements（组件元素）的对比，如果相同，则不用rerender这个组件，如果不同，会调用render函数进行rerender。

* ** componentWillUpdate**

此方法在调用render方法前执行，在这边可以执行一些组件的更新发生前的工作，一般比较少用

* ** render**

render方法触发组件的重新渲染

* **componentDidUpdate(prevProps,preState)**

此方法在组件更新后被调用，可以操作更新的DOM,prevProps 和  preState 这两个参数指向组件更新前的 props 和 state

### 四、组件的卸载阶段

此阶段只有一个生命周期方法： `componentWillUnmount`

* **componentWillUnmount**

此方法在组价被卸载时候调用，可以在这里执行一些清理工作，比如清除组件中使用的定时器，清除`componentDidMount`中手动创建的DOM元素等等，避免内存泄露。


