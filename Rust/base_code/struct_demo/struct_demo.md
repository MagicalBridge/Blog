# 结构体的使用

```rust
struct Reactangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Reactangle {
        width: 30,
        height: 50,
    };
    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );
}

fn area(rectangle: &Reactangle) -> u32 {
    rectangle.width * rectangle.height
}
```

让我帮你分析这个结构体示例的主要内容：

1. 结构体定义：
```rust
struct Reactangle {
    width: u32,
    height: u32,
}
```
- 定义了一个名为 `Reactangle` 的结构体
- 包含两个字段：`width` 和 `height`
- 两个字段都是 `u32` 类型（无符号32位整数）

2. 结构体实例化：
```rust
let rect1 = Reactangle {
    width: 30,
    height: 50,
};
```
- 创建了一个 `Reactangle` 的实例 `rect1`
- 使用命名字段的方式初始化
- 设置 `width` 为 30，`height` 为 50

3. 结构体作为函数参数：
```rust
fn area(rectangle: &Reactangle) -> u32 {
    rectangle.width * rectangle.height
}
```
- 定义了一个 `area` 函数
- 参数使用引用 `&Reactangle`，避免获取所有权
- 通过点号访问结构体的字段：`rectangle.width` 和 `rectangle.height`
- 返回类型是 `u32`，计算矩形的面积

4. 函数调用和打印：
```rust
println!(
    "The area of the rectangle is {} square pixels.",
    area(&rect1)
);
```
- 调用 `area` 函数时传递 `rect1` 的引用
- 打印计算得到的面积

这个示例展示了 Rust 中结构体的几个重要概念：
- 结构体的定义和字段声明
- 结构体实例的创建和初始化
- 结构体作为函数参数（使用引用）
- 结构体字段的访问
- 基于结构体数据的计算

这是一个很好的面向对象编程的基础示例，展示了如何将数据（宽度和高度）和行为（计算面积）组织在一起。
