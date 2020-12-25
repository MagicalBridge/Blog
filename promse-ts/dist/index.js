const Promise = require('./bundle');
let promise2 = new Promise((resolve, reject) => {
  reject('ok')
}).then((data) => {
  throw new Error('1111')
}, (err) => {
  throw new Error('2222')
})

promise2.then((data) => {
  console.log('success ' + data);
}, (error) => {
  console.log('error ' + error);
})