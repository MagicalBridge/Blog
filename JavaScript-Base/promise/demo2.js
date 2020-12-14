let promise = new Promise((resolve, reject) => {
  throw new Error('抛出异常');
  resolve('hello')
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log('err' + err); // err错误信息
})