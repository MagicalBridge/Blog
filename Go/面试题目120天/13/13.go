package main

import "fmt"

func hello(i int) {
	fmt.Println(i)
}

// 定义一个结构体
type Person struct{}

// 给结构体绑定一个方法 showA
func (p *Person) ShowA() {
	fmt.Println("showA")
	p.ShowB()
}

// 给结构体绑定一个方法 showB
func (p *Person) ShowB() {
	fmt.Println("showB")
}

type Teacher struct {
	Person
}

func (t *Teacher) ShowB() {
	fmt.Println("teacher showB")
}

func main() {
	i := 5
	defer hello(i)
	i = i + 10

	t := Teacher{}
	t.ShowA()
}
