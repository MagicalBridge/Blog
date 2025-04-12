# goroutine 随机打印数字

```go
package main

import (
	"sync"
)

func main() {
	wg := sync.WaitGroup{}
	wg.Add(10)
	for i := 0; i < 10; i++ {
		go func(i int) {
			defer wg.Done()
			println(i)
		}(i)
	}
	wg.Wait()
}
```

## 代码解释:

这段代码使用 goroutine 并发打印数字，我们来看看具体的执行过程：

1. 代码创建了一个 `sync.WaitGroup` 实例 `wg`，用于等待所有 goroutine 执行完成。

2. `wg.Add(10)` 设置了计数器为 10，表示需要等待 10 个 goroutine 完成。

3. 在 for 循环中，会启动 10 个 goroutine，每个 goroutine 打印一个数字。

4. 每个 goroutine 执行完后通过 `defer wg.Done()` 将计数器减 1。

5. `wg.Wait()` 会阻塞主 goroutine，直到所有的子 goroutine 都执行完成。

输出结果：
- 会打印 0 到 9 这 10 个数字
- 由于 goroutine 的并发特性，这些数字的打印顺序是随机的
- 每次运行程序，打印顺序可能都不一样

示例可能的输出：

```text
3
7
1
4
0
9
2
5
6
8
```

或者：
```text
0
2
1
3
4
5
6
7
8
9
```
关键点说明：
1. 这里使用了闭包，但通过参数传递的方式 `go func(i int){}(i)` 避免了常见的闭包陷阱
2. 如果不传参，直接在闭包中使用 i，可能会导致所有 goroutine 打印相同的数字
3. `sync.WaitGroup` 确保了所有 goroutine 都执行完成后程序才会退出
