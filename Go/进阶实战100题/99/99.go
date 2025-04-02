package main

import "fmt"

type T struct {
	n int
}

func getT() T {
	return T{}
}

func main() {
	// getT().n = 1
	t := getT()
	t.n = 1

	fmt.Println(t) // {1}
}
