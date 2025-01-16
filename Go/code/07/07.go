package main

import "fmt"

func main() {
	var x interface{} = nil
	fmt.Println(x)

	var y error = nil
	fmt.Println(y)

	//  下面这种写法是错误的
	// var z = nil
	// fmt.Println(z)
}
