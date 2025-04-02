package main

import "fmt"

type A interface {
	ShowA() int
}

type B interface {
	ShowB() int
}

type Work struct {
	i int
}

func (w Work) ShowA() int {
	return w.i + 10
}

func (w Work) ShowB() int {
	return w.i + 20
}

func main() {
	var m map[string]int
	m = make(map[string]int) // A: 初始化 map
	m["a"] = 1
	if v, exists := m["b"]; exists { // B: 检查键是否存在
		fmt.Println(v)
	}

	c := Work{3}
	var a A = c
	var b B = c
	fmt.Println(a.ShowB())
	fmt.Println(b.ShowA())
}
