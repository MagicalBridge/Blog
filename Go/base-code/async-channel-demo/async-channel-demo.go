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
