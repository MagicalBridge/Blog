// node 中的this是什么？
console.log(this); // {}

// 自执行函数中的this永远指向全局
(function(){
  console.log(this) // global 
})()