const express = require("express")

let app = express();

app.get('/say', function (req, res) {
  let { wd, cb } = req.query;
  console.log(wd);
  res.end(`${cb}('I hate you')`)
})

// app.get('/', function (req, res) {
//   res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});// 设置response编码为utf-8
//   res.end(`我不爱你`)
// })

app.listen(3000,function(){
  console.log("监听了3000端口")
})