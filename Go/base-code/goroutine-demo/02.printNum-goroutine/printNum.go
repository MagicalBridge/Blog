package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	wg := sync.WaitGroup{}
	wg.Add(2) // 添加两个等待的 goroutine

	go func() {
		defer wg.Done() // 完成一个 goroutine 调用 Done 方法
		printOdd()
	}()

	go func() {
		defer wg.Done() // 完成一个 goroutine 调用 Done 方法
		printEven()
	}()

	wg.Wait() // 等待所有 goroutine 完成
	fmt.Println("main process exit")
}

func printOdd() {
	for i := 1; i <= 10; i += 2 {
		fmt.Println(i)
		time.Sleep(time.Millisecond * 100)
	}
}

func printEven() {
	for i := 2; i <= 10; i += 2 {
		fmt.Println(i)
		time.Sleep(time.Millisecond * 100)
	}
}
