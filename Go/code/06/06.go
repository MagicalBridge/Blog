package main

import "fmt"

func main() {
	var name string = "Alice"
	var p *string = &name // p 现在指向 name 的内存地址
	fmt.Println(p)

	var name2 string = "louis"
	var p2 *string = &name2
	fmt.Println(*p2) // 输出: louis
}
