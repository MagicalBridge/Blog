const Promise = require('./bundle');

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('err');
  }, 1000);
});

promise.then((data) => {
  console.log('success ' + data);
}, (error) => {
  console.log('error ' + error);
})

promise.then((data) => {
  console.log('success ' + data);
}, (error) => {
  console.log('error ' + error);
})