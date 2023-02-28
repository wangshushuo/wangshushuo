---
title: Go基础二：流程控制语句

date: 2020-07-06T12:27:59+08:00
description: 
categories:
- golang
---

## 循环

Go只有一种循环语句：for
```go
func main() {
	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)
}
```