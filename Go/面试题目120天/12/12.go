package main

import "fmt"

type Person struct{}

func (p *Person) ShowA() {
	fmt.Println("showA")
	p.ShowB()
}

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
	i := -5
	j := +5
	fmt.Printf("%+d %+d", i, j)

	t := Teacher{}
	t.ShowB()
}
