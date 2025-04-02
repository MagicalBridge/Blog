package main

import "fmt"

type Direction int

const (
	North Direction = iota
	South
	East
	West
)

func (d Direction) String() string {
	return [...]string{"North", "South", "East", "West"}[d]
}

type Math struct {
	x, y int
}

var m = map[string]Math{
	"foo": Math{2, 3},
}

func main() {
	fmt.Println(South)

	m["foo"].x = 4
	fmt.Println(m["foo"].x)
}
