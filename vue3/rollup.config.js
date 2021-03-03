// 这个是rollup的配置文件

import path from "path";

// 根据环境变量中的target属性，获取对应模块中的package.json 
const packagesDir = path.resolve(__dirname, "packages"); // 找到packages

// packageDir 代表的是打包的基准目录
const packageDir = path.resolve(packagesDir, process.env.TARGET) // 找到要打哪一个包

// 永远针对的是某一个模块
const resolve = (p) => path.resolve(packageDir, p)

const pkg = require(resolve('package.json'))

console.log(pkg);