package main

import "fmt"

func incrreaseA() int {
	var i int
	defer func() {
		i++
	}()
	return i
}

func incrreaseB() (r int) {
	defer func() {
		r++
	}()
	return r
}

func main() {
	fmt.Println(incrreaseA())
	fmt.Println(incrreaseB())
}
