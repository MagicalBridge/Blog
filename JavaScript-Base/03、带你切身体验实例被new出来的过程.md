## new
一句话介绍new
> new 运算符创建一个用户自定义的对象类型的实例或具有构造函数的内置对象类型之一

也许有点难懂, 我们在模拟new之前，先看看 new 实现了哪些功能。

举一个例子：

```js
// 构造函数 宅
function Otaku(name,age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games'
}

// 因为缺乏锻炼 身体强度让人担忧
Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function() {
  console.log(' I am ' + this.name)
}

var person = new Otaku ('Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName() // I am Kevin

```
从这个例子中 我们可以看到 实例 person 可以：
* 1、访问到 Otaku 构造函数里面的属性
* 2、访问到 Otaku.prototype 中的属性

接下来 我们尝试着模拟一下。

因为new是关键字，不能像 bind函数 一样直接覆盖，所以我们可以写一个函数，命名为 objectFactory 来模拟new的效果，用的时候是这样的
```js
function Otaku() {
  ……
}
// 使用new
var person  = new Otaku(……)
// 使用objectFactory
var person = objectFactory(Otaku,……)
```
## 初步实现

分析：
因为new 的结果是一个新的对象，所以在模拟实现的过程中，我们也要创建一个对象，假设这个对象叫做 obj 因为这个obj会具有 Otaku 构造函数里面的属性，想想经典继承的例子，我们可以使用 Otaku.apply(obj,arguments)来给obj添加新的属性。

我们知道实例的 __proto__ 属性会指向构造函数的 prototype 也正是因为建立起这样的关系, 实例可以访问原型上的属性。

尝试写第一版:
```js
function objectFactory() {
  var obj =  new Object();
  // [].shift.call(arguments)  删除并拿到arguments 第一项 
  // 调用的时候回第一个参数会传入构造函数 这里面拿到的就是构造函数
  Constructor = [].shift.call(arguments);
  // 这里使用的技巧就是 实例对象的 __proto__ 指向构造函数的 prototype 
  obj.__proto__ = Constructor.prototype;
  // 借用外部的构造方法 给obj 传递参数
  Constructor.apply(obj,arguments);
  // 返回这个参数
  return obj
}
```
在第一版中 我们：
  1、用new Object() 的方式新建了一个obj
  2、取出第一个参数，就是我们要传入的构造函数，此外因为shift会改变原数组，所以arguments会被去掉第一个参数。
  3、将obj的原型指向构造函数，这样object就可以访问构造函数原型中的属性
  4、使用apply，改变构造函数的this指向到新建的对象 这样obj 就可以访问 到构造函数中的属性
  5、返回obj


复制以下代码 到浏览器中 我们可以做一下测试
```js
function Otaku(name,age) {
  this.name = name;
  this.age = age;

  this.habit = 'Games'
}

Otaku.prototype.sayYourName = function() {
  console.log('I am '+ this.name)
}

function objectFactory () {
  var obj = new Object()
  console.log(arguments) // 这里打印的参数 包含 第一个参数fn 
  Constructor = [].shift.call(arguments)
  console.log(arguments) // 这里打印的参数 已经被shift 方法去除了 第一个参数
  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);
  return obj
}
```

## 返回值效果实现

接下来 我们再来看一种情况，假如构造函数有返回值 举一个例子:

```js
function Otaku(name,age) {
  this.strength = 60;
  this.age = age;

  return {
    name: name,
    habit:'Game'
  }
}

var person = new Otaku ('Kevin', 18)
console.log(person.name) // kevin
console.log(person.habit) // Games
console.log(person.strength)  // undefined
console.log(person.age) // undefined
```
在这个例子中 构造函数返回了一个对象 在实例person 中只能访问返回对象中的属性.
而且还要注意一点，在这里我们是返回了一个对象，加入我们返回一个基本类型的值呢？

再举一个例子:

```js
function Otaku (name, age) {
  this.strength = 60;
  this.age = age;

  return 'handsome boy';
}

var person = new Otaku('Kevin', '18');

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18
```

结果完全是颠倒过来,这次尽管有返回值，但是相当于 没有返回值进行处理。
所以我们还需要判断返回值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有我们该返回什么就返回什么

再来看看第二版的代码，也是最后一版的代码:
```js
function objectFactory() {
  var obj = new Object(),
  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj,arguments);
  return typeof ret === 'object' ? ret : obj;
}
```







