const Koa = require('koa');
const app = new Koa();

// 请求来了会走这个use 方法
app.use(async (ctx, next) => {
  // throw new Error('错误');
  ctx.body = 'hello world'
})

// 可以监听错误事件
app.on('error', (err) => {
  console.log(err);
})

app.listen(9090);