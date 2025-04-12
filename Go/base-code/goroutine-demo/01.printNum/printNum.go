package main

import (
	"fmt"
	"time"
)

func main() {
	printOdd()
	printEven()
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
