package main

import "fmt"

type Person struct {
	age int
}

func main() {
	person := &Person{28}
	defer fmt.Println(person.age)

	defer func(p *Person) {
		fmt.Println(p.age)
	}(person)

	defer func() {
		fmt.Println(person.age)
	}()

	person.age = 29
}
