package main

import "fmt"

// func main() {
// 	list := new([]int)
// 	list = append(list, 1, 2, 3, 4, 5)
// 	fmt.Println(list)
// }

// func main() {
// 	s1 := []int{1, 2, 3}
// 	s2 := []int{4, 5}
// 	s1 = append(s1, s2)
// 	fmt.Println(s1)
// }


var (
	size := 1024
	maxSize = 1024 * 2
)

func main() {
	fmt.Println(size,maxSize)
}
