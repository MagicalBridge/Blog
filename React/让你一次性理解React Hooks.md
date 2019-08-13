### 
你还在为该使用无状态组件(Function) 还是有状态组件（Class）而烦恼吗？ -- 拥有了Hooks,再也不需要写class了，所有的组件都将是function。

你还在为搞不清楚使用哪个生命周期钩子函数而日夜难眠吗？——拥有了Hooks,生命周期的钩子函数可以丢在一遍了。

你还在为组件中this指向而晕头转向吗？--既然class都不用了，哪里还有this，简直不能更爽。

这样看来，React Hooks 是今年最劲爆的新特性一点也不夸张，如果你也对react感兴趣，或者正在使用react的项目开发，答应我，请一定要抽出至少30分钟的时间来阅读本文。

### 一个最简单的Hooks

首先让我们看一下一个简单的有状态组件：
```js
class Example extends React.Component {
  construtor(props){
    super(props);
    this.state = {
      count:0
    }
  }
  render(){
    return(
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    )
  }
}
```

我们再来看看Hooks的版本：
```js
import {useState} from 'react';

function Example(){
  const [count,setCount] = useState(0)
  return(
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

我们看到，Example 变成了一个函数，但是这个函数有着自己的状态（count），同时它还可以更新自己的状态 （setCount）。这个函数之所以厉害就是因为注入了一个 hook -- `useState`,就是这个hook 让我们的函数变成了一个有状态的函数。

除了`useState`这个hook 之外，还有很多别的hook，比如useEffect 提供了类似于 `componentDidMount`等生命周期钩子的功能，`useContext`提供了上下文（context）的功能等等。

Hooks 本质上就是一类特殊的函数，他们可以为你的函数性组件（function component） 注入一些特殊的功能。这听起来比较像什么呢？是不是像已经消失的Mixins,其实还是有些区别的，后面会说，总之，这些Hooks的目标就是让你不再写class 让function 一统江湖。

### React 为什么要搞一个Hooks?

#### 想要复用一个有状态的组价太麻烦了！

我们知道react的核心思想就是，将一个页面拆成一堆独立的，可复用的组件，并且用自上而下的单向数据流的形式将这些组件串联起来，但是假如你在大型的工作项目中用react，你会发现的项目中实际很多的react组件冗长且难以复用，尤其是那些写成class的组件，他们本身包含了状态（state）所以复用这类组件就变得非常的麻烦。

那之前，官方推荐怎么解决这个问题呢？答案是：渲染属性（Render Props）和高阶组件（Higher-Order Components）。我们可以稍微跑下题简单看一下这两种模式。

渲染属性指的是使用一个值为函数的prop来传递需要动态渲染的nodes或者组件，例如下面的代码可以看到我们的`DataProvider`组件包含了所有跟状态相关的代码，而Cat组件则可以是一个单纯的展示型组件，这样一来 DataProvider 就可以复用了。

```js
import Cat from 'components/cat';

class DataProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      target:'zac'
    }
  }

  render(){
    return(
      <div>
        {this.props.render(this.state)}
      </div>
    )
  }
}

<DataProvider render={ data => {
  <Cat target={data.target}
}}/>
```

虽然这个模式叫做Render Props 但不是说非用一个叫render 的props不可，习惯上大家更常写成下面这种：
```js
 <DataProvider>
  {data => (
    <Cat target={data.target} />
  )}
</DataProvider>
```
高阶组件这个概念就更加好理解了，说白了就是一个函数接收一个组件作为参数，经过一系列的加工，后最后返回一个新的组件，看下面的代码示例，withUser函数就是一个高阶组件，它返回一个新的组件，这个组件具有了它提供的获取用户信息的功能。

```js
const withUser = WrappedComponent =>{
  const user = sessionStorage.getItem("user");
  return props => {
    <WrappedComponent user={user} {...props}
  }
}

const UserPage = props => {
  <div class="user-container">
    <p>My name is{props.user}</p>
  <</div>
}

export default withUser(UserPage);
```

以上的两种模式看上去都还不错，很多库也都采用了这种模式，比如我们熟悉的React Router 但我们仔细看看这两种模式，会发现他们很增加我们代码的层级关系，最直观的体现，打开devtool看看你的组件层级就会觉得很夸张，这个时候我们给出一个hooks的例子是不是很简洁，没有多余的嵌套，把各种功能写成一个个可以复用的hooks 当你的组件想用什么功能的时候直接在组件中调用这个hooks就可以了。









