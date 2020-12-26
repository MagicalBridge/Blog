const EventEmitter = require('events'); // 这是原生的node模块中的events模块
const http = require('http'); // 需要http模块
const context = require('./context'); // 这个就是koa自己实现的context对象
const request  = require('./request');
const response = require('./response'); 


class Application extends EventEmitter {
  // use 函数是一个普通的方法 每个实例上都拥有这个方法
  // 接收一个中间件函数 提前将这个函数收集起来 请求进来的时候执行这个函数
  use(middleware) {
    // 使用use时候 传递进来的函数，我们就可以认为是中间件
    this.middleware = middleware;
  }

  createContext(req,res) {

  }
  // 这里将处理请求的方法封装成一个函数而不是使用回调
  // 在调用 处理函数的时候 会有两个 参数一个是 req res
  // 都会传递进入这个函数 这里使用类的 空间做了一个变量的中转
  handleRequest(req, res) {
    // 在这个函数中可以将传递进来的中间件函数执行

    let ctx = this.createContext(req, res); // 根据原生的请求和响应创建上下文
    this.middleware(ctx);
  }

  // 在调取listen方法的时候 实际是在内部使用http模块创建了一个服务
  listen() {
    const server = http.createServer(this.handleRequest.bind(this));
    // 调用时候传递的参数通过 ...arguments 传递给了 listen 函数
    server.listen(...arguments);
  }
}

module.exports = Application;