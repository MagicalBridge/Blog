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
	// 创建一个带有取消信号的context
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
