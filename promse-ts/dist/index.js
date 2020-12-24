// const Promise = require('./bundle');
let promise = new Promise((resolve, reject) => {
  resolve('ok')
}).then((data) => {
  console.log(data);
}, (err) => {
  console.log(err);
})

promise.then((data) => {
  console.log('success ' + data);
}, (error) => {
  console.log('error ' + error);
})