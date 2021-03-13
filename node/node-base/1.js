// node 中的this是什么？
// console.log(this); // {}

// 自执行函数中的this永远指向全局
// (function () {
//   console.log(this) // global 
// })()

// 一些比较重要的属性
// console.log(global);
// console.log(process);
// console.log(Buffer);

// 打印process
// console.log(Object.keys(process));

// cwd current working directory 当前的工作目录 运行时产生的一个路径 指向在哪里执行
// console.log(process.cwd())


// console.log(process.argv.slice(2));
// 模拟构建的时候拿到参数的过程
// let program = {};
// process.argv.slice(2).forEach((item, index, array) => {
//   // console.log(item);
//   if (item.startsWith('--')) {
//     program[item.slice(2)] = array[index + 1]
//   }
// });
// 执行这个命令 node 1.js --port 3000 --coonfig webpack.config.js
// { port: '3000', config: 'webpack.config.js' }
// console.log(program); 

// 使用commander 解析参数 命令行管家
const program = require('commander');
// 脚手架 工程化工具 解析用户的各种参数
program.option('-p, --port <v>', 'set user port')
program.option('-c, --config <v>', 'set user config file')
program.parse(process.argv)

console.log(process.argv)
