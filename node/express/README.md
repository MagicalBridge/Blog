## express package.json的包的查找过程
- 对于node包来说，首先查找 main 入口，如果找不到的话，就会去找 index.js 这是npm包的安装机制

## 模拟构造express文件目录 
- express
  - server.js  // 这个文件里面 使用的是 const express = require('./express') 去找package.json
  - express // 文件夹 package.json 有一个main入口
    - lib 文件夹 express.js


## 所谓的路由匹配指的是路径和方法都匹配的到

