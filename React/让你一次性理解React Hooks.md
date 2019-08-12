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



