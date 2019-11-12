## 前言
不知道大家有没有过这样的疑问，React中的setState() 为什么是异步的？我一直认为setState() 是同步的，知道它是异步的之后非常困惑，甚至期待React能出一个 setStateSync() 之类的api，同样有此困惑的还有MboX的作者，他向社区提出这个疑问，并最终得到了react官方开发团队成员Dan Abramov的解答，说这并不是一个历史性的包袱，而是经过深思熟虑设计的。

## 正文
Dan 在回复中表示为什么setState() 是异步的，这并没有一个明显的答案（obvious answer），每一种方案都有它的权衡，但是React的设计有以下几点考量：

### 一：保证内部的数据一致性

首先，我想我们都同意推迟并批量处理重渲染是有益处的而且对于性能优化很重要，无论setState() 是同步的，还是异步的，那么就算是让state 同步更新，props也不行，因为当父组件重新渲染（re-render）了你才知道props。

现在这样的设计是为了保证React提供的objects (state,props,refs)的行为和表现都是一致的，为什么这很重要？Dan举了一个例子：

假设state 是同步更新的，那么下面的代码是可以按照预期工作的：

```js
console.log(this.state.value) // 0
this.setState({
  value: this.state.value+1
});
console.log(this.state.value) // 1
this.setState({
  value: this.state.value+1
});
console.log(this.state.value) // 2
```
然而，这个时候需要将状态提升带父组件，以供多个兄弟组件共享：
```diff
-this.setState({ value: this.state.value + 1 });
+this.props.onIncrement(); // 在父组件中做同样的事
```

需要指出的是，在react应用中，这是一个非常常见的重构，几乎每天都会发生。
