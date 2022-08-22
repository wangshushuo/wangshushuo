---
title: Go基础三：方法和接口
url: /learn-go-3.html
date: 2020-07-06T12:27:59+08:00
description: 
categories:
- golang
---

## 方法

1. 定义

Go中没有类，不过可以为结构体类型定义方法。方法就是一类带有特殊「接收者」参数的函数。
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
方法接收者，在func与方法名之间。这里是`(v Vertex)`。相当于为`Vertex`类型定义了方法`Abs`

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

3. 指针接收者

前面定义的方法，是「值接收者」
```go
func (v Vertex) Abs() float64 {}
func (f MyFloat) Abs() float64 {}
```
还有一种「指针接收者」，多了一个「*」星号
```go
func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}
```

「指针接收者」可以修改指针，「值接收者」则不能修改。
```go
type Vertex struct {
	X, Y float64
}

func (v Vertex) Abs() float64 {
	return v.X + v.Y
}

// 可以对v进行修改。如果去掉「*」则不会修改。
func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(10)
	fmt.Println(v.Abs())
}
```

4. 指针与函数
函数定义的参数如果是指针，那么传的参数就要求是指针，如果传值就会报错。
```go
func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	ScaleFunc(v, 5)  // 编译错误！
	ScaleFunc(&v, 5) // OK
}
```

5. 方法与指针重定向
以指针为接收者的方法被调用时，接收者既能为值又能为指针：
```go
var v Vertex
v.Scale(5)  // OK
p := &v
p.Scale(10) // OK
```

反过来，接受一个值作为参数的函数必须接受一个指定类型的值
```go
var v Vertex
fmt.Println(AbsFunc(v))  // OK
fmt.Println(AbsFunc(&v)) // 编译错误！
```
而以值为接收者的方法被调用时，接收者既能为值又能为指针。

使用指针接收者能避免在调用时复制值，尤其是大型构造体，会更加高效。

一般不混用两者。

## 接口

1. 接口类型是由一组方法签名定义的结合。

接口类型的变量可以保存任意实现了这些方法的值。

```go
// 定义接口
type Abser interface {
	Abs() float64
}

// 定义结构体，并实现接口
type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

// 定义结构体，并实现结构
type Vertex struct {
	X, Y float64
}

// 指针的方法
func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat 实现了 Abser
	a = &v // a *Vertex 实现了 Abser

	// 下面一行，v 是一个 Vertex（而不是 *Vertex）
	// 所以没有实现 Abser。
	a = v
	>=
	fmt.Println(a.Abs())
}
```

2. 接口与隐式实现

类型通过实现接口的所有方法实现接口，无需专门的声明。

隐式接口从接口的实现中解藕了定义，这样接口的实现可以出现在任何包中，无需提前准备。

3. 接口值

接口也是值。它们可以像其它值一样传递。接口值可以用作函数的参数或返回值。凡是这个接口的类型都可以使用这个方法或作为返回值。

```go
type I interface {
	M()
}
func describe(i I) {
	fmt.Printf("(%v, %T)\n", i, i)
}
func main() {
	var i I

	i = &T{"Hello"}
	describe(i)
	i.M()

	i = F(math.Pi)
	describe(i)
	i.M()
}
```