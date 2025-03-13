package main

import (
	"fmt"
	"time"
)

func main() {
	// 创建一个每2秒触发一次的定时器
	ticker := time.NewTicker(2 * time.Second)

	// 创建一个10秒后触发的定时器，用于结束程序
	done := time.After(10 * time.Second)

	count := 1
	for {
		select {
		case <-ticker.C:
			// 每2秒执行一次
			fmt.Printf("第 %d 次执行任务, 时间: %s\n", count, time.Now().Format("15:04:05"))
			count++

		case <-done:
			// 10秒后程序结束
			fmt.Println("程序结束")
			return
		}
	}
}
