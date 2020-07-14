---
title: Go基础一：包、变量和函数
url: /learn-go-1.html
date: 2020-06-29T10:06:01+08:00
description: 
categories:
- 后端
---

## 包

每个Go程序都由包构成，程序从main方法开始执行。

通过下面这段代码来学习「包」相关的几个知识点。
{{< highlight go "linenos=table,linenostart=1" >}}
package main

import (#1#
  "fmt"
  "math/rand"
  "math"
)

func main() {
  fmt.Println("My favorite number is", rand.Intn(10))#2#
  fmt.Println(math.pi)#3#
}
{{< / highlight >}}

- {{< number 1 >}}程序导入了`fmt` `math/rand`两个包。
- {{< number 1 >}}可以用圆括号进行“分组”导入，也可以分别导入。
    ```go
    import "fmt"
    import "math"
    ```
- {{< number 2 >}}程序中以路径中的最后一段为包名。
- {{< number 3 >}}以大写字母开头的变量是导出的，此处用小写的`math.pi`就不会导出，会报错，需要改完大写的`math.Pi`才能正常运行。

## 函数

1. 函数可以没有参数或接收多个参数
```go
func add(x int, y int) int {
	return x + y
}
```

2. 多个相同的类型可用省略写法
```go
func add(x, y int) int {
	return x + y
}
```

3. 可返回任意数量的返回值
```go
func swap(x, y string) (string, string) {
	return y, x
}
```

4. 返回值可以被命名，它们被视为定义在函数的顶部
```go
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}
```
- 无参数的 return 返回已命名的返回值
- 无参数的 return 应该仅在这样短小的函数中使用，否则会影响可读性

## 变量

1. var 用于声明变量列表，类型在最后。可出现在包和函数级别
```go
package main

import "fmt"

var c, python, java bool

func main() {
	var i int
	fmt.Println(i, c, python, java)
}
```

2. 声明可以包含初始值，每个变量对应一个。有初始值的话，可以省略类型。
```go
var i, j int = 1, 2
var c, java, python = true, false, "no!"
```

3. 在..函数中..，且..类型明确..，则可以使用..简洁赋值..语句`:=`代替`var`。在函数外，每个语句都必须以关键字开始（var，func等），因此`:=`不能在函数外使用。
```go
var i, j int = 1, 2
k := 3
c, python, java := true, false, "no!"
```

4. 基本类型
```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // uint8 的别名

rune // int32 的别名
    // 表示一个 Unicode 码点

float32 float64

complex64 complex128
```
`int`, `uint` 和 `uintptr` 在 32 位系统上通常为 32 位宽，在 64 位系统上则为 64 位宽。 当你需要一个整数值时应使用 `int` 类型，除非你有特殊的理由使用固定大小或无符号的整数类型。

5. 没有明确初始值的变量声明会被赋值为它们的「零值」。
```go
var i int		// 数值类型为 0
var f float64	// 数值类型为 0
var b bool		// 布尔类型为 false
var s string	// 字符串为 ""（空字符串）
```

6. 类型转换：表达式 T(v) 将值 v 转换为类型 T
```go
var i int		= 42
var f float64	= float64(i)
u := uint(f)
```

7. 类型推断：声明变量但未指定类型时，类型由右值推导得出。
    - 当右值声明了类型时，新变量的类型与其相同
    - 当右值包含未指定类型的数值常量时，由其精度决定类型
```go
i := 42				// int
f := 3.142			// float64
g := 0.867 + 0.5i	// complex128
fmt.Printf("g is of type %T\n", g)
```

8. 常量使用 const 声明，语法与声明变量类似。常量不能用 := 语法声明
```go
const World = "世界"
```

9. 数值常量：高精度的**值**，未指定类型的常量由上下文决定其类型
```go
const (
	// 将 1 左移 100 位来创建一个非常大的数字
	// 即这个数的二进制是 1 后面跟着 100 个 0
	Big = 1 << 100
	// 再往右移 99 位，即 Small = 1 << 1，或者说 Small = 2
	Small = Big >> 99
)

func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
	return x * 0.1
}

func main() {
	fmt.Println(needInt(Small))		// Small可以作为int
	fmt.Println(needFloat(Small))		// Small可以作为float64
	fmt.Println(needFloat(Big))
}
```