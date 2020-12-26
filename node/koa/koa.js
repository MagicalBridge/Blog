const Koa = require('./koa/lib/application');
// const Koa = require('koa');

// console.log(Koa);
const app = new Koa();

// 请求来了会走这个use 方法
app.use(async (ctx, next) => {
  console.log(ctx.req.url);
  console.log(ctx.request.url);
})

// 可以监听错误事件
app.on('error', (err) => {
  console.log(err);
})

app.listen(9090);