package main

import (
	"sync"
)

func main() {
	wg := sync.WaitGroup{}
	workNum := 10

	wg.Add(workNum)

	for i := 0; i < workNum; i++ {
		go func(i int) {
			defer wg.Done()
			println(i)
		}(i)
	}
	wg.Wait()

}
