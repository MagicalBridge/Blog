## 对React组件做单元测试

前端开发的一个特点是更多的会涉及用户界面，当开发规模达到一定程度后，几乎注定了其复杂度会成倍的增长。

无论是在代码的初始化搭建过程中，还是之后难以避免的重构和修正bug的过程中，常常会陷入逻辑难以梳理，无法掌握全局关联的境地。

而单元测试作为一种维护开发质量的基础手段，可以有效的改善这些问题。

### 单元测试简介

> 单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证

简单来说，单元就是人为规定的最小的被测功能模块，单元测试是在软件开发过程中要进行的最低级别的测试活动，软件的独立单元将在与程序的其他部分相互隔离的情况下进行测试。

#### 测试框架

测试框架的作用是提供一些方便的语法来描述测试用例，以及对用例进行分组。

#### 断言(assertions)
断言是单元测试框架中核心的部分，断言失败会导致测试通不过，或者报告错误信息。

对于常见的断言，举一些例子如下:
  * 同等性断言 Equality Asserts
    * expect(sth).toEqual(value)
    * expect(sth).not.toEqual(value)
  * 比较性断言 Comparison Asserts
    * expect(sth).toBeGreaterThan(number)
    * expect(sth).toBeLessThanOrEqual(number)
  * 类型性断言 Type Asserts
    * expect(sth).toBeInstanceOf(Class)
  * 条件性测试 Condition Test
    * expect(sth).toBeTruthy()
    * expect(sth).toBeFalsy()
    * expect(sth).toBeDefined() 

#### 断言库
断言库主要提供上述断言的语义化方法，用于对参与测试的值做各种各样的判断，这些语义化方法会返回测试的结果，要么成功，要么失败。常见的断言库有 should.js chai.js 等等

#### test case
为某一特殊目标而编制的一组测试输入、执行条件以及预期结果，以便测试某个程序路径或者核实是否满足某个特定需求

一般的形式为：
```js
it('should ...', function() {
	...
	expect(sth).toEqual(sth);
});
```

#### 测试套件
通常将一组相关的测试称之为测试套件

一般形式为:
```js
describe('test ...', function() {
	
	it('should ...', function() { ... });
	
	it('should ...', function() { ... });
	...
});
```
#### spy

> 正如spy字面意思一样，我们用这种间谍来监视函数的调用情况

通过对监视的函数进行包装，可以通过它清楚的知道该函数被调用过几次，传入什么参数，返回什么结果，甚至是抛出什么异常情况。

```js
var spy = sinon.spy(MyComp.prototype, 'componentDidMount');

...

expect(spy.callCount).toEqual(1);
```

#### stub 

> 有时候会使用 stub 来嵌入或者直接 替换掉一些代码，达到隔离的目的

一个stub
