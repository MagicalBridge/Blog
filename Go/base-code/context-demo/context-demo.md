# Go 中的 context 包
在 Go 中，`context` 包提供了一种在 goroutine 之间传递上下文信息的机制。它可以用于控制 goroutine 的生命周期、取消操作、超时控制等。

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func worker(ctx context.Context, id int) {
	for {
		select {
		case <-ctx.Done():
			fmt.Printf("Worker %d received cancel signal, stopping...\n", id)
			return
		default:
			fmt.Printf("Worker %d is working...\n", id)
			time.Sleep(500 * time.Millisecond)
		}
	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())

	// 启动3个worker goroutine
	for i := 1; i <= 3; i++ {
		go worker(ctx, i)
	}

	// 让workers运行一段时间
	time.Sleep(2 * time.Second)

	// 发送取消信号
	fmt.Println("Sending cancel signal...")
	cancel()

	// 给goroutines一些时间来处理取消
	time.Sleep(1 * time.Second)
	fmt.Println("Main function exiting")
}
```

这个示例的工作原理：

1. 使用`context.WithCancel`创建了一个可取消的context
2. 启动了3个 `worker goroutine`，每个worker都会持续工作直到收到取消信号
3. 主goroutine在2秒后调用`cancel()`函数发送取消信号
4. 每个worker在`select`语句中监听`ctx.Done()`，收到信号后就会停止工作
5. 主goroutine等待1秒以确保所有worker都有时间处理取消信号

运行这个程序，你会看到类似这样的输出：

```
Worker 1 is working...
Worker 2 is working...
Worker 3 is working...
...
Sending cancel signal...
Worker 1 received cancel signal, stopping...
Worker 2 received cancel signal, stopping...
Worker 3 received cancel signal, stopping...
Main function exiting
```

这个模式在实际开发中非常有用，特别是在需要优雅地停止多个goroutine的场景中。