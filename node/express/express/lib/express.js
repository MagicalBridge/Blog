const http = require('http')
const url = require('url')

let routes = [
  {
    path: "*",
    method: "get",
    handler(req, res) {
      res.end(`Cannot ${req.method} ${req.url}`)
    }
  }
]

function createApplication() {
  return {
    get(path, handler) {
      routes.push({
        path,
        method: 'get',
        handler
      })
    },
    listen(...args) {
      const server = http.createServer((req, res) => {
        let { pathname } = url.parse(req.url)  // todo 这里新的api 是什么呀
        let requestMethod = req.method.toLocaleLowerCase();
        for (let i = 1; i < routes.length; i++) {
          let { path, method, handler } = routes[i]
          if (path === pathname && requestMethod === method) {
            return handler(req, res);
          }
        }
        // 匹配不到走0个
        routes[0].handler(req.res)
      })
      // 这是原生的http的用法
      server.listen(...args)
    }
  }
}

module.exports = createApplication