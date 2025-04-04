# 异步channel示例

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个缓冲区大小为3的channel
	ch := make(chan int, 3)

	go func() {
		for i := 1; i <= 5; i++ {
			fmt.Printf("Goroutine: 发送数据 %d\n", i)
			ch <- i // 发送数据，当缓冲区未满时不会阻塞
			fmt.Printf("Goroutine: 数据 %d 已发送\n", i)
		}
		close(ch)
	}()

	// 主goroutine等待一段时间，模拟处理其他任务
	time.Sleep(2 * time.Second)

	fmt.Println("Main: 开始接收数据")
	for data := range ch {
		fmt.Printf("Main: 接收到数据 %d\n", data)
		time.Sleep(1 * time.Second) // 模拟处理数据的时间
	}
	fmt.Println("Main: 所有数据接收完成")
}
```

这个示例展示了有缓冲channel的异步特性：

1. 创建了一个缓冲区大小为3的channel `ch`
2. 启动一个goroutine发送5个数据，由于缓冲区存在，前3个发送操作不会阻塞
3. 主goroutine等待2秒后开始接收数据
4. 使用`range`从channel中接收数据，直到channel被关闭
5. 每次接收后等待1秒，模拟数据处理时间

运行这个程序，你会看到类似这样的输出：

```
Goroutine: 发送数据 1
Goroutine: 数据 1 已发送
Goroutine: 发送数据 2
Goroutine: 数据 2 已发送
Goroutine: 发送数据 3
Goroutine: 数据 3 已发送
Goroutine: 发送数据 4
Main: 开始接收数据
Main: 接收到数据 1
Goroutine: 数据 4 已发送
Goroutine: 发送数据 5
Goroutine: 数据 5 已发送
Main: 接收到数据 2
Main: 接收到数据 3
Main: 接收到数据 4
Main: 接收到数据 5
Main: 所有数据接收完成
```

这个输出展示了有缓冲channel的异步特性：发送方可以在接收方准备好之前发送多个数据，只有当缓冲区满时才会阻塞。这种特性在需要解耦生产者和消费者速度的场景中非常有用。