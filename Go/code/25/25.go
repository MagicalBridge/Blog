package main

import "fmt"

type MyInt int

func (i MyInt) PrintInt() {
	fmt.Println(i)
}

func main() {
	var i MyInt = 1
	i.PrintInt()
}
