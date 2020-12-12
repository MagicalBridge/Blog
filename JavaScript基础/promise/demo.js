var dynamicFunc = function (cb) {
  setTimeout(function () {
    cb();
  }, 1000)
}

dynamicFunc(function () {
  console.log(123)
})


setTimeout(function () {
  console.log(123);
  setTimeout(function () {
    console.log(234);
  }, 2000)
}, 1000)