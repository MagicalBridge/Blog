package main

import (
	"fmt"
	"time"
)

func main() {
	go printOdd()
	go printEven()

	// 需要阻塞，不然主进程结束，goroutine 也会结束
	time.Sleep(time.Second * 1)
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
