package main

import "fmt"

func main() {
	test()
	fmt.Println("继续执行")
}

func test() {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println("err=", err)
		}
	}()

	num1 := 10
	num2 := 0
	res := num1 / num2
	fmt.Println("res=", res)
}
