package main

import "fmt"

func hello() []string {
	return nil
}

func GetValue() int {
	return 1
}

func main() {
	h := hello
	if h == nil {
		fmt.Println("nil")
	} else {
		fmt.Println("not nil")
	}

	// 编译失败
	i := GetValue()
	switch i.(type) {

	case int:
		fmt.Println("int")

	case string:
		fmt.Println("string")

	case interface{}:
		fmt.Println("interface")
	default:
		fmt.Println("unknown")
	}
}
