package main

import (
	"bytes"
	"fmt"
	"log"
	"os/exec"
)

func main() {
	// 定义要执行的PHP脚本路径
	phpScript := "./test.php"
	// 创建一个新的命令对象，用于执行PHP脚本
	cmd := exec.Command("php", phpScript)

	// 用于存储命令执行过程中的标准输出
	var out bytes.Buffer
	// 用于存储命令执行过程中的标准错误输出
	var stderr bytes.Buffer
	// 将命令的标准输出和标准错误输出分别重定向到out和stderr变量
	cmd.Stdout = &out
	cmd.Stderr = &stderr

	// 执行命令
	err := cmd.Run()
	if err != nil {
		// 若执行命令出错，打印错误信息和标准错误输出
		log.Fatalf("命令执行失败: %v: %s", err, stderr.String())
	}

	// 打印命令执行的标准输出
	fmt.Println("PHP脚本的输出:", out.String())
}
