// console.log(1);

// setTimeout(() => {
//   console.log('time1');
// }, 0)

// Promise.resolve().then(date => {
//   console.log('成功1');
//   setTimeout(() => {
//     console.log('定时器');
//   }, 0);
// })

// Promise.resolve().then(date => {
//   console.log('成功2');
// })

// console.log(3);
// 先执行主栈任务，主栈任务执行完毕之后，先清空一轮微任务，然后再从宏任务队列中拿出一个宏任务开始执行，执行完毕之后再清空一轮微任务。
// 主栈任务 log(1) 和 log(3)  两个微任务 log('成功1') log('成功2') 两个宏任务 log('time1') log('定时器')


// 增加难度 我在第一个time1中添加再添加一个微任务 成功3 应该如何执行
console.log(1);

setTimeout(() => {
  console.log('time1');
  Promise.resolve().then((data) => {
    console.log('成功3');
  })
}, 0)

Promise.resolve().then(date => {
  console.log('成功1');
  setTimeout(() => {
    console.log('定时器');
  }, 0);
})

Promise.resolve().then(date => {
  console.log('成功2');
})

console.log(3);

// 先执行主栈任务, 然后清空一轮微任务，然后执行宏任务，然后再清空一轮微任务，然后再执行一轮宏任务。 
// 1 3 成功1 成功2 time1 成功3 定时器