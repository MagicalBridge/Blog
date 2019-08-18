我喜欢 react 组件的开发方式，你可以讲一个复杂的用户界面分割为一个个组价，利用组件的可重用和抽象的 dom 操作

基于组件的开发是高效的：一个复杂的系统是由专门的、易于管理的组件构建的，然而，只有设计良好的组件才能确保组合和复用的好处。

尽管应用程序复杂，但是为了满足最后期限和意外变化的需求，你必须不断地走在架构正确的细线上，你必须将组件分离专注于单个任务，并经过良好的测试。

不幸的是，遵循错误的路径总是更加容易，编写具有许多职责的大型组件，紧密耦合组件，忘记单元测试，这些增加技术债务，使得修改现有功能或者创建新的功能变得原来越困难。

> 编写 react 应用的时候，我经常问自己：

- 如何正确构造组件
- 在什么时候，一个大的组件应该拆分成更小的组件？
- 如何设计防止紧密耦合的组件之间的通信？

幸运的是，可靠的组件具有共同的特性，让我们来研究 7 个有用的标准（本文只阐述 srp）.

### 单一职责

> 当一个组件只有一个改变的原因时，它有一个单一的职责。

编写 react 组件的时候需要考虑的基本的原则是单一职责原则，单一职责原则（Simple responsibility pinciple SRP）要求组件有一个且只有一个变更的原因。

组件的职责可以是呈现列表，或者显示日期选择器，或者发出 HTTP 请求，或者绘制图表或者延迟加载图像等等。你的组件应该只选择一个职责并实现它。当你修改组件实现其职责的方式（例如：更改渲染的列表的数量限制），它有一个更改的原因。

为什么只有一个理由很重要呢？ 因为这样组件的修改隔离并且受控，单一职责限制了组件的大小，使其集中在一件事情上面，集中在一件事情上面便于编码，修改，重用和测试。

> 下面我们来举几个例子

- 实例 1：一个组件获取远程数据，相应地，当获取逻辑更改时，它有一个更改的原因。
  发生变化的原因是：
  - 修改服务器 url
  - 修改响应格式
  - 要使用其他的 HTTP 请求库
  - 或仅与获取逻辑相关的任何修改。
- 实例 2：表组件将数据映射到行组件列表，因此在映射逻辑更改时有一个原因需要修改。
  发生变化的原因:
  - 你需要限制渲染行组件的数量 （例如: 最多显示 25 行）
  - 当没有要显示的项目时候，要求显示提示信息为”列表为空“
  - 或仅仅与数组到行组件的映射相关的任何修改

你的组件有很多职责吗？ 如果答案是”是”，则按照每个单独的职责将组件划分为若干块。

如果你发现 SRP 有点模糊，请阅读[本文]()，在项目早期阶段编写的单元经常更改，直到发布阶段，这些更改通常要求组件在隔离状态下需要修改，这也是 SRP 的目标。

#### 1.1 多重职责陷阱

当一个组件有多个职责的时候，就会发生一个常见的问题，乍一看，这种做法似乎是无害的，并且工作量最少：

- 你立即开始编码： 无需识别职责并相应规划结构
- 一个大的组件可以做到这一切：不需要为每个职责创建组成部分
- 无拆分-无开销：无需为拆分组件之间的通信建立 props 和 callback

这种幼稚的结构在开始时很容易编码。但是随着应用程序的增加和变得复杂，在以后的修改中会出现困难。同时实现多个职责的组件有许多更改的原因。现在出现的主要问题是：出于某种原因更改组件会无意中影响同一组件实现的其它职责。

图片：加上去

不要关闭电灯，因为它同样作用于电梯。

这种设计模式很 **脆弱** 意外的副作用是很难预测和控制的。

例如：`<ChartAndForm>`同时有两个职责，绘制图表，并处理为该图表提供数据的表单。`<ChartAndForm>` 就会有两个更改的原因：绘制图表和处理表单。

当你更改表单字段（例如，将 `<input>` 修改为 `<select>` 时）你无意中中断图表的渲染，此外，图表实现是不可重用的，因此它与表单细节耦合在一起。

解决多重职责问题需要将`<ChartAndForm>`分割为两个组价：`<Chart>` 和 `Form`每个组件只有一个职责：绘制图表或者处理表单，组件之间的通信是通过 props 实现。

多重责任问题的最坏情况是所谓额上帝组件（上帝对象的类比） 上帝组价倾向于了解并做所有事情，你可能会看到它名为`<Application>`、`<Manager>`或者`<Page>` 代码超过 500 行。

在组合的帮助下，使得其符合 SRP 从而分解上帝组件，组合（composition） 是一种通过将各种组件联合在一起以创建更大组价的方式，组合是 react 的核心）。

#### 1.2 案例研究：使得组件只有一个职责

设想一个组件向一个专门的服务器发送 HTTP 请求 以获取当前天气。成功获取数据时候，该组件展示天气信息：

```js
import axios from "axios";
// 问题: 一个组件有多个职责
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "N/A", windSpeed: "N/A" };
  }

  render() {
    const { temperature, windSpeed } = this.state;
    return (
      <div className="weather">
        <div>Temperature: {temperature}°C</div>
        <div>Wind: {windSpeed}km/h</div>
      </div>
    );
  }

  componentDidMount() {
    axios.get("http://weather.com/api").then(function(response) {
      const { current } = response.data;
      this.setState({
        temperature: current.temperature,
        windSpeed: current.windSpeed
      });
    });
  }
}
```

在处理类似的情况时候，问问自己，是否必须将组件拆分为更小的组件？通过确定组件可能会如何根据职责进行更改，可以最好的回答这个问题。

- 这个天气组件有两个改变的原因：
- 1、componentDidMount() 中的 fetch 逻辑： 服务器 URL 或者响应格式可能会改变。
- 2、render() 中的天气显示：组件显示天气的方式可以多次更改。

解决的方案是将 `<Weather/>` 分为两个组件：每一个组件只有一个职责。命名为 `<WeatherFetch/>`和`<WeatherInfo/>`

`<WeatherFetch/>` 组件负责渲染天气，提取响应数据并将其保存在 `state` 中 它改变原因只有一个就是获取数据逻辑改变。

```js
import axios from "axios";
// 解决措施: 组件只有一个职责就是请求数据
class WeatherFetch extends Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "N/A", windSpeed: "N/A" };
  }

  render() {
    const { temperature, windSpeed } = this.state;
    return <WeatherInfo temperature={temperature} windSpeed={windSpeed} />;
  }

  componentDidMount() {
    axios.get("http://weather.com/api").then(function(response) {
      const { current } = response.data;
      this.setState({
        temperature: current.temperature,
        windSpeed: current.windSpeed
      });
    });
  }
}
```

这种结构有什么好处？

例如：你想要使用 `async/await` 语法替代 `promise` 去服务器获取响应，更改原因：修改获取逻辑

```js
// 改变原因: 使用 async/await 语法
class WeatherFetch extends Component {
  // ..... //
  async componentDidMount() {
    const response = await axios.get("http://weather.com/api");
    const { current } = response.data;
    this.setState({
      temperature: current.temperature,
      windSpeed: current.windSpeed
    });
  }
}
```

因为 `<WeatherFetch/>` 只有一个更改的原因，修改 fetch 逻辑，所以对该组件的任何修改都是隔离的，使用 `async/await`不会直接影响天气的显示。

`<WeatherFetch/>` 渲染 `<WeatherInfo/>` 后者只负责显示天气，改变原因只可能是视觉显示改变。

```js
// 解决方案: 组件只有一个职责，就是显示天气
function WeatherInfo({ temperature, windSpeed }) {
  return (
    <div className="weather">
      <div>Temperature: {temperature}°C</div>
      <div>Wind: {windSpeed} km/h</div>
    </div>
  );
}
```

让我们更改<WeatherInfo>，如不显示 “wind:0 km/h” 而是显示 “wind:calm”。这就是天气视觉显示发生变化的原因：

```js
// 改变原因: 无风时的显示
function WeatherInfo({ temperature, windSpeed }) {
  const windInfo = windSpeed === 0 ? "calm" : `${windSpeed} km/h`;
  return (
    <div className="weather">
      <div>Temperature: {temperature}°C</div>
      <div>Wind: {windInfo}</div>
    </div>
  );
}
```

同样，对 `<WeatherInfo>` 的修改是隔离的，不会影响 `<WeatherFetch>`组件。

`<WeatherFetch>`和 `<WeatherInfo>` 有各自的职责，一种组件的变化对另外一种组件的影响很小，这就是单一职责的作用：修改隔离，对系统的其他组件产生很轻微并且可以预测。

#### 1.3 案例研究：HOC 偏好单一责任原则

按职责使用分块组件的组合并不总是遵循单一职责原则，另一中有效实践是高阶组件（缩写 HOC）

> 高阶组件是一个接受一个组件并且返回一个新组件的函数。

HOC 的一个常见用法是为封装的组件增加新属性或者修改现有的属性值。这种技术称之为 **属性代理**：

```js
function withNewFunctionality(WrappedComponent) {
  return class NewFunctionality extends Component {
    render() {
      const newProp = "Value";
      const propsProxy = {
        ...this.props,
        // 修改现有属性:
        ownProp: this.props.ownProp + " was modified",
        // 增加新属性:
        newProp
      };
      return <WrappedComponent {...propsProxy} />;
    }
  };
}
const MyNewComponent = withNewFunctionality(MyComponent);
```

你还可以通过控制输入组件的渲染过程从而控制渲染结果，这种 HOC 技术称之为渲染劫持：

```js
function withModifiedChildren(WrappedComponent) {
  return class ModifiedChildren extends WrappedComponent {
    render() {
      const rootElement = super.render();
      const newChildren = [
        ...rootElement.props.children,
        // 插入一个元素
        <div>New child</div>
      ];
      return cloneElement(rootElement, rootElement.props, newChildren);
    }
  };
}
const MyNewComponent = withModifiedChildren(MyComponent);
```

