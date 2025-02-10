package main

import "fmt"

func main() {
	// slice := []int{0, 1, 2, 3}
	// m := make(map[int]*int)

	// for key, val := range slice {
	// 	m[key] = &val
	// }
	// for k, v := range m {
	// 	fmt.Println(k, "->", *v)
	// }

	// 定义一个切片
	slice := []int{0, 1, 2, 3}

	// 定义一个map
	m := make(map[int]*int)

	// 遍历切片，将每个元素的地址赋值给map的value
	for key, val := range slice {
		value := val // 创建一个新的变量
		m[key] = &value
	}

	// 遍历map，输出每个元素的key和value
	for k, v := range m {
		fmt.Println(k, "->", *v)
	}
}
