1、koa 是对于http的一个封装 实现了一个node 框架 根据这个框架去实现自己的mvc框架

2、每个人使用koa的方式不太一样 无法做到约定性 因此出现了egg这个基于koa封装的约定性框架

3、在node_modules文件中查找koa的相关源码，首先查看 package.json 里面的main字段
链接的就是lib下面的application.js 文件。
  lib
    application  创建应用
    context  上下文
    request  自己实现的request的对象
    response koa中的自己实现的response的对象

4、在使用koa的时候，会用到ctx执行上下文，这其实是 koa中封装的一个对象
ctx 中有两对属性 (req res  原生 http 上的)  (request response  是 koa 封装的 )

5、在原生的请求中是没有 path这个属性的
ctx.req.path
ctx.request.req.path

ctx.request.path
ctx.path

再次强调一下, 
req res 是原生提供的  request response 是koa封装的
ctx.path 就是一个代理 取值的时候就是从 ctx.request.path 上取值。

6、对于每个应用来说，应该有自己独立的上下文环境 这样才能做到互相不会干扰。








