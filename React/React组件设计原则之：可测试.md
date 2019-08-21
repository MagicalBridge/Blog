### 可测试和经过测试

> 经过测试的组件验证了其给定输入的情况下，输出是否符合预期。可测试的组件寓意着，便于测试

如何确保组件按照预期工作？你可以不以为然的说：”我通过手动验证其正确性“。

如果你计划手动验证每一个组件的更改，那么迟早，你会跳过这个繁琐的环节，进而导致你的组件迟早会出现缺陷。

这就是为什么自动化测试组价验证很重要：进行单元测试。单元测试确保每次进行修改时，组件都能正常工作。

单元测试不仅涉及早期错误检验。另一个重要的方面是能够验证组件架构是否合理。

我发现以下几点特别重要：

> 一个不可测试或者难以测试的组件可能设计的很糟糕

组件很难测试往往是因为他有很多的 props 依赖项、需要原型和访问全局变量，而这些都是设计糟糕的标志。

当组件的架构涉及脆弱时，就会变得难以测试，而当组件难以测试的时候，你大概会跳过编写单元测试的过程，最终的结果是：**组件未测试**

图片：

总之，需要应用程序未经过测试的原因是因为设计不当，即使你想测试这样的应用，你也做不到。

#### 案例学习：可测试意味着良好的设计

我们来测试一个[封装章节]()的两个版本的 `<Controls>` 组件。

```js
import assert from "assert";
import { shallow } from "enzyme";

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <button onClick={() => this.updateNumber(+1)}>Increase</button>
        <button onClick={() => this.updateNumber(-1)}>Decrease</button>
      </div>
    );
  }
  updateNumber(toAdd) {
    this.props.parent.setState(prevState => ({
      number: prevState.number + toAdd
    }));
  }
}

class Temp extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  render() {
    return null;
  }
}

describe("<Controls />", function() {
  it("should update parent state", function() {
    const parent = shallow(<Temp />);
    const wrapper = shallow(<Controls parent={parent} />);

    assert(parent.state("number") === 0);

    wrapper
      .find("button")
      .at(0)
      .simulate("click");
    assert(parent.state("number") === 1);

    wrapper
      .find("button")
      .at(1)
      .simulate("click");
    assert(parent.state("number") === 0);
  });
});
```

从上面的代码我们可以看到，`<Controls />`测试起来很复杂，因为它依赖父组件的实现细节。

测试时，需要一个额外的组件 `<Temp>`，它模拟父组件，验证 `<Controls>` 是否正确修改了父组件的状态。

当 `<Controls>` 独立于父组件的实现细节时，测试会变得更加容易。现在我们来看看正确封装的版本是如何测试的:

```js
import assert from "assert";
import { shallow } from "enzyme";
import { spy } from "sinon";

function Controls({ onIncrease, onDecrease }) {
  return (
    <div className="controls">
      <button onClick={onIncrease}>Increase</button>
      <button onClick={onDecrease}>Decrease</button>
    </div>
  );
}

describe("<Controls />", function() {
  it("should execute callback on buttons click", function() {
    const increase = sinon.spy();
    const descrease = sinon.spy();
    const wrapper = shallow(
      <Controls onIncrease={increase} onDecrease={descrease} />
    );

    wrapper.find("button").at(0).simulate("click");
    assert(increase.calledOnce);
    
    wrapper.find("button").at(1).simulate("click");
    assert(descrease.calledOnce);
  });
});
```

良好的封装，测试起来简单明了，相反，没有正确封装的组件难以测试。

可测试性是确定组件结构良好程度的实用标准。


