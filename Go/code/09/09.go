package main

import "fmt"

type person struct {
	name string
}

func hello(num ...int) {
	num[0] = 18
}

func main() {
	var m map[person]int
	p := person{"mike"}
	fmt.Println(m[p])

	i := []int{5, 6, 7}
	hello(i...)
	fmt.Println(i[0])
}
