package main

import (
	"fmt"
	"runtime"
	"time"
)

func main() {
	go func() {
		for {
			fmt.Println("NumGoroutine: ", runtime.NumGoroutine())
		}
	}()

	for {
		go func() {
			time.Sleep(time.Second * 100)
		}()
	}
}
