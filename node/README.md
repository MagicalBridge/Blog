## node 是什么？ 能做什么？

- node不是语言，它是能让js可以运行在服务器端的一个运行时（内置模块 文件读写 操作系统api）

- js 语言的组成部分 BOM DOM  ECMASCRIPT node 中只包含了  ECMASCRIPT + 模块

- node 做中间层 解决跨域问题 ssr的实现  工具  企业级的后台项目 egg nest

- 高并发 （单线程 js 中主线程是单线程的）

## 非阻塞 异步 i/o 特性

- 非阻塞  异步 单线程 和多线程的区别  i/o
- java 多线程同步 

## 单线程 和 多线程
- 多线程可能多条线程操作同一个文件 （锁的概念） 单线程没有锁的问题的
- 切换线程执行时候会有消耗 
- 多线程占用内存 （可以通过线程池解决）
- 同步阻塞 + 多线程    异步非阻塞 + 主线是单线程
- node 自己实现了异步非阻塞 libuv  核心是异步

> 多线程好处  可以做压缩合并 大量计算相关 cpu密集型  node 适合i/o密集型

## 阻塞非阻塞 、异步同步

- 我调用一个方法，此时我的状态是**阻塞**还是**非阻塞**  服务端会决定是同步给我结果还是异步给我结果
- 同步阻塞 异步非阻塞

## node 中的this是什么？
- 在文件中this指向的是 module.exports 默认是一个空的 {}
- 这实际上是一个commonjs规范 表示所有的代码写到文件中，文件内部会自带一个函数 这个函数执行的时候改变了this
- 无论是node环境还是浏览器环境中 自执行函数中的this永远指向全局。
```js
(function(){
  console.log(this) // global 在自执行函数中 指向的是 global 对象
})()
```

- global对象 

```js 
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  }
}
```

## 5个虽然不是全局但是可以直接访问的属性
- __dirname __filename  require module exports 

## process 属性中常用的

- 所谓的工作目录指的是在哪一层路径中执行的命令，那么这个工作目录就是哪。

- cwd 运行时候产生的一个路径, 指向在哪里执行。
```js
console.log(process.cwd())
```
- chdir 可以改变 目录
```js
console.log(process.chdir("../../../"))
```
- dirname 指代的是当前文件所在的目录 这个目录是固定不变的，是死的。

- env 会默认读取全局的 可以使用cross-env 跨端存储变量，在代码中配置。

- argv 用户执行时候传递的参数。
```js
console.log(process.argv)  // node 1.js --port 3000 --coonfig webpack.config.js
```
argv[0]; // node的可执行文件
argv[1]; // node执行的文件是谁
...other  就是用户传递的参数  => 进行参数传递

```js
let program = {};
process.argv.slice(2).forEach((item, index, array) => {
  // console.log(item);
  if (item.startsWith('--')) {
    program[item.slice(2)] = array[index + 1]
  }
});
// 执行这个命令 node 1.js --port 3000 --coonfig webpack.config.js
// { port: '3000', config: 'webpack.config.js' }
console.log(program); 
```

## 有一个commander工具可以可以进行非常方便的配置。
```js
const program = require('commander');
// 脚手架 工程化工具 解析用户的各种参数
program.option('-p, --port <v>', 'set user port')
program.option('-c, --config <v>', 'set user config file')
program.parse(process.argv)

console.log(process.argv);
[
  '/Users/louis/.nvm/versions/node/v12.18.3/bin/node',
  '/Users/louis/Documents/dailyWork/myBlog/node/node-base/1.js',
  '--port',
  '3000',
  '--config',
  'webpack.config.js'
]
```


  







