# 所有权和函数

```rust
fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1);
    println!("The length of '{}' is {}.", s2, len);

    let s3 = 5;
    let s4 = change(s3);
    println!("s3 = {}, s4 = {}", s3, s4);
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len();
    (s, length)
}

fn change(s: i32) -> i32 {
    s + 1
}
```

让我从所有权的角度分析这两个函数的参数传递差异：

1. `calculate_length` 函数：
```rust
fn calculate_length(s: String) -> (String, usize)
```
- 参数 `s` 的类型是 `String`，这是一个在堆上分配内存的类型
- 当 `s1` 传递给 `calculate_length` 函数时，发生了所有权转移（move）
- `s1` 的所有权被转移到了函数参数 `s` 中，此时 `s1` 在 `main` 函数中就无效了
- 函数通过返回元组 `(String, usize)` 将字符串的所有权又转移回来，被 `s2` 接收
- 这就是为什么我们需要使用 `let (s2, len) = calculate_length(s1)` 这样的模式来接收返回值

2. `change` 函数：
```rust
fn change(s: i32) -> i32
```
- 参数 `s` 的类型是 `i32`，这是一个实现了 `Copy` trait 的基本数据类型
- 当 `s3` 传递给 `change` 函数时，发生的是复制（Copy）而不是移动
- `s3` 的值被复制了一份给函数参数 `s`
- 由于是复制，所以 `s3` 在 `main` 函数中仍然有效，可以继续使用
- 这就是为什么我们可以在调用函数后继续使用 `s3`

主要区别：
- `String` 类型在传递时会转移所有权
- `i32` 类型在传递时会复制值
- 这就是为什么在打印语句中，我们可以同时使用 `s3` 和 `s4`，但是不能直接使用 `s1`（除非像示例中那样通过函数返回值重新获得所有权）

这个例子很好地展示了 Rust 中不同类型在函数参数传递时的所有权行为差异。