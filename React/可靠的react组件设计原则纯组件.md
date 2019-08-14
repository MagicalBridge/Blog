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

想要确保所有的组件都是纯组件是不可能的，有时候，你需要知道与外界交互，例如下面的例子：

```js
class InputField extends Component{
  constructor(props){
    super(props)
    this.state = {value:''}
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({target:{value}}){
    this.setState({value})
  }

  render(){
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        You typed: {this.state.value}
      </div>
    );
  }
}
```
`<InputField>` 组件，不接受任何 `props`，而是根据用户的输入内容渲染输出。`<InputField>` 必须是非纯组件，因为它需要通过 `input` 输入框与外界交互。

非纯组件是必要的，大多数应用程序中都需要全局状态，网络请求，本地存储等。你所能做的就是将 纯组件和非纯组件隔离，也就是说将你的组件进行提纯。

非纯代码显式的表明了它有副作用，或者是依赖全局状态。在隔离状态下，不纯代码对系统其它部分的不可预测的影响较小。

让我们详细介绍一下提纯的例子。

#### 案例研究：从全局变量中提取纯组件

我们并不喜欢全局变量，因为它们破坏了封装，创造了不可预测的行为，并且让测试变的困难。

全局变量可以作为可变对象或者不可变对象使用。

可变全局变量让组件的行为变得难以控制，数据可以随意的注入和修改，这显然是错误的。

如果你需要可变的全局状态，那么你可以使用`Redux`来管理你的程序状态。

不可变的全局变量通常是应用程序的配置对象，这个对象中包含站点名称、登录用户名或者其它的配置信息。

以下代码定义一个包含站点名称的配置对象：
```js
export const globalConfig = {
  siteName: "Animals in Zoo"
}
```

`<Header>` 组件渲染应用的头部，包括展示站点名称: `Animals in Zoo`

```js
import { globalConfig } from './config';

export default function Header({ children }) {
  const heading = globalConfig.siteName ? <h1>{globalConfig.siteName}</h1> : null;
  return (
    <div>
      {heading}
      {children}
    </div>
  );
}
```
`<Header>` 组件使用 `globalConfig.siteName` 来展示站点名称，当 `globalConfig.siteName` 未定义时，不显示。

首先需要注意的是 `<Header>` 是非纯组件。即使传入的 `children` 值相同，也会因为 `globalConfig.siteName` 值的不同返回不同的结果。

```js
// globalConfig.siteName is 'Animals in Zoo'
<Header>Some content</Header>

// Renders:
<div>
  <h1>Animals in Zoo</h1>
  Some content
</div>
```
或者：
```js
// globalConfig.siteName is `null`
<Header>Some content</Header>

// Renders:
<div>
  Some content
</div>
```

其次，测试变得困难重重，为了测试组件如何处理站点名为`null`，我们不得不手动的设置
`globalConfig.siteName = null`

```js
import assert from 'assert';
import { shallow } from 'enzyme';
import { globalConfig } from './config';
import Header from './Header';

describe('<Header />', function () {
  it('should render the heading', function () {
    const wrapper = shallow(
        <Header>Some content</Header>
    );
    assert(wrapper.contains(<h1>Animals in Zoo</h1>));
  });

  it('should not render the heading', function () {
    // Modification of global variable:
    globalConfig.siteName = null;
    const wrapper = shallow(
      <Header>Some content</Header>
    );
    assert(appWithHeading.find('h1').length === 0);
  });
});
```

为了测试而修改 `globalConfig.siteName = null` 是很不方便的，发生这种情况是因为 <Heading> 
对全局变量有很强的依赖性。

为了解决这个问题，可以将全局变量作为组件的输入，而非注入到组件的作用域中。

我们来修改一下`<Header>`组件，使其多接受一个`siteNmae` 的`props`， 然后使用 `recompose` 库中的 `defaultProps` 高阶组件来包装组件，`defaultProps` 可以保证在没有传入`props`时，使用默认值。

```js
import { defaultProps } from 'recompose';
import { globalConfig } from './config';

export function Header({ children, siteName }) {
  const heading = siteName ? <h1>{siteName}</h1> : null;
  return (
    <div className="header">
      {heading}
      {children}
    </div>
  );
}
export default defaultProps({
  siteName: globalConfig.siteName
})(Header);
```





