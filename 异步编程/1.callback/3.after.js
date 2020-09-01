// after 在什么之后

function after(times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  }
}

let fn = after(3, function () {
  console.log('really');
})

fn();
fn();
fn();