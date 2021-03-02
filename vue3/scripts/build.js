// 把package 中的所有文件打包

// 引入fs模块
const fs = require('fs')
// 引入子进程
const execa = require('execa'); // 开启一个字进程
// 使用readdirSync读取文件夹目录
const targetArr = fs.readdirSync('packages')

// 为了只找到目录，这里对于target做一个过滤操作
const target = targetArr.filter(f => {
  // 如果发现不是一个文件夹直接return false
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  return true
})

// 我想要进行依次打包，并行打包
async function build(target) {
  console.log(target);
}

function runParallel(targets, iteratorFn) {
  const res = [];
  for (const item of targets) {
    // 每次执行迭代函数返回的都是一个promise
    const p = iteratorFn(item);
    // 将所有的promise 放入数组中
    res.push(p);
  }
  // 执行promsie all 方法，等待所有的promise 执行完毕输出结果
  return Promise.all(res);
}

runParallel(target, build)