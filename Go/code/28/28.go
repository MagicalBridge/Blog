package main

import "fmt"

func main() {
	fmt.Println([...]int{1} == [2]int{1})
	fmt.Println([]int{1} == []int{1})
}
