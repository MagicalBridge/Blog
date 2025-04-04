# 无缓冲channel的同步特性

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个无缓冲的channel
	ch := make(chan int)

	go func() {
		fmt.Println("Goroutine 1: 准备发送数据")
		ch <- 42 // 发送数据，会阻塞直到主goroutine接收
		fmt.Println("Goroutine 1: 数据发送完成")
	}()

	// 主goroutine等待一段时间，模拟处理其他任务
	time.Sleep(2 * time.Second)

	fmt.Println("Main: 准备接收数据")
	data := <-ch // 接收数据，此时发送方可以继续执行
	fmt.Printf("Main: 接收到数据 %d\n", data)

	// 给goroutine一些时间完成输出
	time.Sleep(1 * time.Second)
}
```

这个示例展示了无缓冲channel的同步特性：

1. 创建了一个无缓冲的channel `ch`
2. 启动一个goroutine尝试发送数据，此时会阻塞，直到主goroutine准备好接收
3. 主goroutine等待2秒后接收数据，此时发送方可以继续执行
4. 最后等待1秒确保goroutine完成输出

运行这个程序，你会看到类似这样的输出：

```
Goroutine 1: 准备发送数据
Main: 准备接收数据
Main: 接收到数据 42
Goroutine 1: 数据发送完成
```

这个输出顺序清楚地展示了无缓冲channel的同步特性：发送操作会一直阻塞，直到接收方准备好接收数据。这种特性在需要确保goroutine之间同步执行的场景中非常有用。