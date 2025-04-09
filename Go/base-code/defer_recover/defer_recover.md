# defer_recover 使用示例

让我为你详细解释 Go 语言中 defer 和 recover 联合使用处理异常的机制和原理：

1. **工作机制**：
```go
func test() {
    // 1. defer 注册延迟调用，会在函数返回前执行
    defer func() {
        // 3. recover() 捕获 panic，恢复正常执行流程
        if err := recover(); err != nil {
            fmt.Println("err=", err)
        }
    }()

    // 2. 这里会触发 panic
    num1 := 10
    num2 := 0
    res := num1 / num2  // 除以零，会触发 panic
}
```

2. **执行流程**：
   - 当函数开始执行时，defer 语句会被注册，但不会立即执行
   - 程序继续正常执行，直到遇到 panic
   - panic 发生时，程序会立即停止当前函数的正常执行
   - 开始执行 defer 队列中的函数（后进先出顺序）
   - recover() 在 defer 函数中被调用，捕获 panic 信息
   - 程序恢复正常执行流程

3. **重要特点**：
   - recover 只在 defer 函数中有效
   - 必须在 panic 之前注册 defer
   - 一个函数可以注册多个 defer
   - defer 函数会逆序执行（栈的方式）

4. **使用场景**：
```go
func example() {
    // 文件操作的错误处理
    file, err := os.Open("file.txt")
    if err != nil {
        panic(err)
    }
    defer func() {
        file.Close()
        if err := recover(); err != nil {
            log.Printf("发生错误：%v", err)
        }
    }()
    
    // 数据库操作的错误处理
    db, err := sql.Open("mysql", "connection_string")
    if err != nil {
        panic(err)
    }
    defer func() {
        db.Close()
        if err := recover(); err != nil {
            log.Printf("数据库操作错误：%v", err)
        }
    }()
}
```

5. **最佳实践**：
   - 在关键代码段使用 defer-recover
   - 记录错误信息而不是简单打印
   - 合理处理资源清理
   - 避免在普通错误处理中使用 panic

6. **优点**：
   - 保证资源正确释放
   - 避免程序完全崩溃
   - 提供了优雅的错误处理机制
   - 可以在恢复后继续执行

7. **注意事项**：
   - recover 只能恢复当前 goroutine 的 panic
   - 不要在不必要的地方使用 panic
   - defer 语句的性能开销
   - 确保 defer 语句在可能发生 panic 的代码之前注册

这种机制使得 Go 程序能够优雅地处理运行时错误，同时保证资源的正确释放。