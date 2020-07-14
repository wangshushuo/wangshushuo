---
title: Go基础三：方法和接口
url: /learn-go-3.html
date: 2020-07-06T12:27:59+08:00
description: 
categories:
- 后端
---

## 方法

1. 定义

Go中没有类，不过可以为结构体类型定义方法。方法就是一类带有特殊「接收器」参数的函数。
```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	v := Vertex{3, 4}
	fmt.Println(v.Abs())
}
```
方法接收者，在func与方法名之间。这里是`(v Vertex)`。相当于为`Vertex`类型定义类方法`Abs`

2. 非结构体类型的方法
```go
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

func main() {
	f := MyFloat(-math.Sqrt2)
	fmt.Println(f.Abs())
}
```
接收者的类型定义和方法声明必须在同一包内；不能为内建类型声明方法。