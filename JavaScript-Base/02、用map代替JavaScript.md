
JavaScript 普通对象 {key:'value'} 可用于保存结构化数据

但是我发现很烦人的一件事，对象的键必须是字符串（或者很少使用的符号）。

如果用数字作为键会怎么样呢？在这种情况下没有错误：

```js
const names = {
  1: 'One',
  2: 'Two'
}
Object.keys(names); // ['1','2']
```

JavaScript 只是对象的键隐式转换为字符串。这是一件棘手的事情，因为你失去了类型的一致性。在本文中，我将介绍ES2015中提供的JavaScript`Map`对象如何解决许多普通对象的问题，包括将键转换为字符串。

### 1、map可接受任意类型的键

如上所述，如果对象的键不是字符串或者符号，则js会将其隐式转换为字符串。
幸运的是，map在键类型上不存在问题：
```js
const numbersMap = new Map();
numbersMap.set(1,'one');
numbersMap.set(2,'two');

[...numbersMap.key()] // => [1,2]
```
1 和 2 是numbersMap 中的键，这些键的类型number保持不变
你可以在map中使用任何键类型：数字，布尔以及经典的字符串和符号。

```js
const booleansMap = new Map();
booleansMap.set(true,'Yep');
booleansMap.set(false,'Nope');
[...booleansMap.key()] // [true,fasle]
```

booleansMap 用布尔值作为键没有问题。

同样，布尔键在普通对象中不起作用。
让我们超越解界限：你能把整个对象用作map中的键吗？ 当然可以!

#### 1.1 把对象作为键

假设你需要存储一些与对象相关的数据，但是不能把这些数据附加到对象本身。

不能用普通对象这样做。

一种解决办法就是用一组对象值元组：
```js
const foo = {name:'foo'}
const bar = {name:'bar'}

const kindOfMap = [
  [foo,'Foo related data'],
  [bar,'Bar related data']
]
```
kindOfMap 是一个包含一对对象和关联值的数组。

这种方式的最大的问题在于通过键访问值的时间复杂度是O(n),必须遍历整个数组才能通过键获得所需要的值
```js
function getByKey(kindOfMap,key){
  for(const [k,v] of kindOfMap){
    if(key === k){
      return v
    }
  }
  return undefined
}
getByKey(kindOfMap,foo); // 'Foo related data'
```
使用 `WeakMap`（Map）的专用版本，无需为此烦恼，它接收把对象作为键。

Map 和 WeakMap 之间的主要区别是后者允许对作为键的对象进行垃圾回收，从而防止内存泄漏。

把上面的代码重构使用`WeakMap`的代码付出的代价微不足道
```js
const foo = {name: 'foo'}
const bar = {name: 'bar'}

const mapOfObject = new WeakMap();

mapOfObject.set(foo,'Foo related data')
mapOfObject.set(bar,'Bar related data')

mapOfObject.get(foo) // => 'Foo related data'
```

与Map 相对，WeapMap 仅仅接受把对象作为键。

### 2、map对键名没有限制

JavaScript中的任何对象都从其原型对象继承属性。普通的JavaScript 对象也是如此。

如果覆盖从原型继承的属性，则可能会破坏依赖于这些原型属性的代码；

```js
function isPlainObject(value){
  return value.toString() === '[object Object]'
}
const actor = {
  name: 'Harrison Ford',
  toString: 'Actor: Harrison Ford'
}

// Does not work!
isPlainObject(actor); // TypeError: value.toString is not a function
```
在对象 actor 上定义的属性 `toString` 覆盖了从原型上面继承的 toString() 方法，因为它依赖于`toString()`
方法，所以这破坏了 `isObject()`;

检查普通对象从原型继承的属性和方法列表 要避免使用这些名称定义自定义属性。

Map 没有这个限制键的名称不受限制：
```js
function isMap(value){
  return value.toSring() === '[object Map]'
}
const actorMap = new Map();

actorMap.set('name', 'Harrison Ford');
actorMap.set('toString', 'Actor: Harrison Ford');

// Works!
isMap(actorMap); // => true
```
不管 `actorMap` 是否具有 名称为 toString的属性，方法 toString() 都能正常工作。

### 3、map是可以迭代的

为了遍历普通对象的属性，你必须使用其他的辅助的静态函数 例如object.key()或者Object.entries()
```js
const colorsHex = {
  'white': '#FFFFFF',
  'black': '#000000'
};

for (const [color, hex] of Object.entries(colorsHex)) {
  console.log(color, hex);
}
// 'white' '#FFFFFF'
// 'black' '#000000'
```
`Object.entries(colorsHex)` 返回从对象提取的键值对数组。

但是map 本身就是可以迭代的：
```js
const colorsHexMap = new Map();

colorsHexMap.set('white', '#FFFFFF');
colorsHexMap.set('black', '#000000');

for (const [color, hex] of colorsHexMap) {
  console.log(color, hex);
}
// 'white' '#FFFFFF'
// 'black' '#000000'
```
`colorsHexMap` 是可以迭代的，你可以在任何可迭代的地方使用它：`for()`循环、展开运算符`[...map]`等。

`map`还提供了返回迭代的其他方法，`map.key()`遍历键 `map.values()` 遍历值。

### 4、map的大小
普通对象的另一个问题是你无法轻松确定其拥有的属性数量：

```js
const exams = {
  'John Smith': '10 points',
  'Jane Doe': '8 points',
};

Object.keys(exams).length; // => 2
```
要确定 exams 的大小，你必须通过它所有键来确定它们的数量。

map 提供了一种替代方法，通过它的访问器属性 size 计算键值对：
```js
const examsMap = new Map([
  ['John Smith', '10 points'],
  ['Jane Doe', '8 points'],
]);
  
examsMap.size; // => 2
```
### 5、总结
普通的 JavaScript 对象通常可以很好地保存结构化数据。但是它们有一些限制：

+ 1、只能用字符串或符号用作键
+ 2、自己的对象属性可能会与从原型继承的属性键冲突（例如，toString，constructor 等）。
+ 3、对象不能用作键

所有这些问题都可以通过 map 轻松解决。而且它们提供了诸如迭代器和易于进行大小查找之类的好处。

不要将 map 视为普通对象的替代品，而应视为补充。





