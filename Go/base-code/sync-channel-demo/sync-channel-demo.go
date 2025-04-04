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
