let promise = new Promise((resolve, reject) => {
  reject('错误信息')
  resolve('hello')
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err' + err); // err错误信息
})