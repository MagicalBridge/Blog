package main

import "fmt"

func main() {
	var i interface{}
	if i == nil {
		fmt.Println("nil")
	} else {
		fmt.Println("not nil")
	}
}
