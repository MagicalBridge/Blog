package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	ch := make(chan int)

	for i := 1; i <= 10; i++ {
		wg.Add(1)
		go func(n int) {
			defer wg.Done()
			ch <- n
		}(i)
	}

	go func() {
		wg.Wait()
		close(ch)
	}()

	for n := range ch {
		fmt.Println(n)
	}
}
