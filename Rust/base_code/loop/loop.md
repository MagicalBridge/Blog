# 演示loop的用法

## 代码示例：
```rust
fn main() {
  let mut counter = 0;
  let result = loop {
    counter += 1;
    if counter == 10 {
      break counter * 2;
    }
  };
  println!("The result is {}", result);
}
```

## 代码解析：
在 Rust 中，`break` 语句不仅可以用来跳出循环，还可以返回一个值。**这是 Rust 的一个特殊语法特性**。

让我们分析这段代码：
```rust
let result = loop {
    counter += 1;
    if counter == 10 {
        break counter * 2;  // 这里的 break 会返回 counter * 2 的值
    }
};
```

这里需要注意几点：
1. `break` 后面的表达式 `counter * 2` 不是"继续执行"，而是作为循环的返回值
2. 这个返回值会被赋给 `result` 变量
3. 当 `counter` 等于 10 时，`break counter * 2` 会：
   - 跳出循环
   - 计算 `10 * 2`
   - 返回计算结果 `20`
   - 将这个值赋给 `result`

所以最终 `result` 的值是 20，这就是为什么最后打印 `The result is 20`。

这是 Rust 的一个语法糖，让我们可以在跳出循环的同时返回一个值。如果用更传统的写法，可能需要这样写：
```rust
let mut counter = 0;
let mut result = 0;
loop {
    counter += 1;
    if counter == 10 {
        result = counter * 2;
        break;
    }
};
```
Rust 的这种设计使代码更加简洁和表达力更强。