## 同源策略
协议 域名 端口 这三种相同才相同

## 为什么浏览器不支持跨域
cookie localStorage sessionStorage 都是不支持跨域的。
DOM元素也有同源策略  iframe 
ajax也不支持跨域

## 实现跨域
- jsonp
- cors 纯后端提供的
- postMessage
- document.domain
- window.name
- location.hash
- http-proxy
- nginx
- websocket