### 1、定义
filter为数组中的每一个元素调用一次callback函数，并利用所有使得 callback返回true或者等价于true的值的元素创建一个新的数组

```js
var new_array = arr.filter(callback[,thisArray])
```

### 2、基础用法

```js
var spread = [12, 5, 8, 130, 44]
// 筛选条件符合大于10的新数组
var filtered = spread.filter(n => n >= 10)
console.log('filtered', filtered) // => [12, 130, 44]
```

### 3、进阶用法
```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false },
  { 'user': 'ared',   'age': 24, 'active': false },
  { 'user': 'ered',   'age': 80, 'active': false },
  { 'abc': 'ered',   'age': 80, 'active': false }
]
// 筛选 age等于40或者age等于24的 数组对象
var filtered = users.filter(n => n.age===40 || n.age===24)
console.log('filter后的键名', filtered)   // => [{user: "fred", age: 40, active: false}，{user: "ared", age: 24, active: false}]

```

### 4、高阶用法
  
#### 4.1 数组去重

```js
var spread = [12, 5, 8, 8, 130, 44,130]
var filtered = spread.filter((item, idx, arr) => {
  return arr.indexOf(item) === idx;
})
// 筛选符合条件找到的第一个索引值等于当前索引值的数组
console.log('数组去重结果', filtered)
```

数组去重使用set 方法实现模式
```js
var spread = [12, 5, 8, 8, 130, 44,130]
var setFun = [...new Set(spread)]
console.log('数组去重结果', setFun)
```

顺便写一个字符串去重的方法
```js
var arr=[12, 5, 8, 8, 130, 44,130,'a','b','a']
var obj={};
arr.forEach(function(item){
  obj[item]=item;
})
Object.keys(obj)
console.log(Object.keys(obj))
```

#### 4.2 数组中去掉空字符串

```js
var spread = ['A', '', 'B', null, undefined, 'C', '  ']
var filtered = spread.filter((item, idx, arr) => {
  return item && item.trim()
})
console.log('数组中的空字符串删掉', filtered) // => ["A", "B", "C"]
```

### 5、一句话总结
充分利用callback 返回true的特点 当做过滤条件生产新的数组。
