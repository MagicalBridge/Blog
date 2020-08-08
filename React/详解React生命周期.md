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


## React 16.4的生命周期

变更缘由

原来 react16.0之前的生命周期在react16 推出的 Fiber 之后就不合适了，因为如果要开启 async rendering 在render函数之前的所有函数，都有可能执行多次。

componentWillMount、componentWillReceiveProps shouldComponentUpdate componentWillUpdate

如果开发者开了async rendering 而且又在以上这些 render 前执行的生命周期方法做ajax请求的话，那ajax将被无谓的多次调用，明显不是我们期望的结果，而且在 componentWillMount 里面发起请求不管多快得到结果也赶不上首次render，所以IO操作 放在 componentDidMount 中是更为合适的。

除了 shouldComponentUpdate 其他在render函数之前的函数 (`componentWillMount componentWillReceiveProps componentWillUpdate`) 都将被 getDerivedStateFromProps 替代。

也就是说，使用一个静态函数 getDerivedStateFromProps 来取代即将被废弃的这几个生命周期函数，就是强制开发者在render之前只做无副作用的操作。

react16 刚推出的时候 增加了一个 componentDidCatch 生命周期函数，这只是一个增量式的修改，完全不影响原有的生命周期函数，但是到了 react16.3 版本 推出了大改动，引入了两个新的生命周期函数：

getDerivedStateFromProps， getSnapshotBeforeUpdate

在16.4版本中 让 getDerivedStateFromProps 无论是挂载(mounting）还是 更新(updating)也无论是什么引起的更新，全部都会被调用。

这个生命周期就是为了替代 componentWillReceiveProps存在的，所以在你需要使用componentWillReceiveProps的时候，就可以考虑使用getDerivedStateFromProps来进行替代了。

两者的参数是不相同的，而getDerivedStateFromProps是一个静态函数，也就是这个函数不能通过this访问到class的属性，也并不推荐直接访问属性。而是应该通过参数提供的nextProps以及prevState来进行判断，根据新传入的props来映射到state。

react16.4之后 getDerivedStateFromProps(nextProps,prevState) 在组件创建时和更新时的render 方法之前被调用，值得注意的是，如果props传入的内容不需要影响你的state，那么你就返回一个null，这个返回值是必须的，所以尽量写在函数末尾。

```js
static getDerivedStateFromProps(nextProps, prevState) {
  const {type} = nextProps;
  // 当传入的type发生变化的时候，更新state
  if (type !== prevState.type) {
    return {
      type,
    };
  }
  // 否则，对于state不进行任何操作
  return null;
}
```

总结一下，getDerivedStateFromProps 的作用就是为了让 props 能更新到组件内部 state 中，它的可能使用场景大概有两个:

* 无条件的根据props来更新内部state，也就是只要有传入 prop 值， 就更新 state

我们来看一个例子：

假设我们有个一个表格组件，它会根据传入的列表数据来更新视图。

```js
class Table extends React.Component {
  state = {
    list: []
  }
  static getDerivedStateFromProps (props, state) {
    return {
      list: props.list
    }
  }
  render () {
    .... // 展示 list
  }
}
```
上面的例子就是第一种使用场景，但是无条件从 prop 中更新 state，我们完全没必要使用这个生命周期，直接对 prop 值进行操作就好了，无需用 state 进行一个值的映射。


* 只有 prop 值和 state 值不同时才更新 state 值
再看一个例子，这个例子是一个颜色选择器，这个组件能选择相应的颜色并显示，同时它能根据传入 prop 值显示颜色。

```js
Class ColorPicker extends React.Component {
  state = {
    color: '#000000'
  }
  static getDerivedStateFromProps (props, state) {
    if (props.color !== state.color) {
      return {
        color: props.color
      }
    }
    return null
  }
  ... // 选择颜色方法
  render () {
    .... // 显示颜色和选择颜色操作
  }
}
```

现在我们可以这个颜色选择器来选择颜色，同时我们能传入一个颜色值并显示。但是这个组件有一个 bug，如果我们传入一个颜色值后，再使用组件内部的选择颜色方法，我们会发现颜色不会变化，一直是传入的颜色值。

这是使用这个生命周期的一个常见 bug。为什么会发生这个 bug 呢？在开头有说到，在 React 16.4^ 的版本中 setState 和 forceUpdate 也会触发这个生命周期，所以内部 state 变化后，又会走 getDerivedStateFromProps 方法，并把 state 值更新为传入的 prop。

```js
Class ColorPicker extends React.Component {
  state = {
    color: '#000000',
    prevPropColor: ''
  }
  static getDerivedStateFromProps (props, state) {
    if (props.color !== state.prevPropColor) {
      return {
        color: props.color
        prevPropColor: props.color
      }
    }
    return null
  }
  ... // 选择颜色方法
  render () {
    .... // 显示颜色和选择颜色操作
  }
}
```

> 注意 getDerivedStateFromProps 前面要添加static保留字，声明为静态方法，否则会被react忽略掉。

getDerivedStateFromProps 中的this指向为 `undefined`

静态方法只能被构造函数调用，而不能被实例调用。

getSnapshotBeforeUpdate

getSnapshotBeforeUpdate() 被调用于render之后，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给componentDidUpdate（）。

```js
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否要添加新的 items 到列表?
    // 捕捉滚动位置，以便我们可以稍后调整滚动.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们有snapshot值, 我们已经添加了 新的items.
    // 调整滚动以至于这些新的items 不会将旧items推出视图。
    // (这边的snapshot是 getSnapshotBeforeUpdate方法的返回值)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```








