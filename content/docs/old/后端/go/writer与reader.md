---
title: 了解Golang的writer/reader接口
date: 2022-06-21T18:48:11+08:00
---
## 是什么

首先writer/reader都是接口

```go
type Writer interface {
  Write(p []byte) (n int, err error)
}
type Reader interface {
  Read(p []byte) (n int, err error)
}
```

他们各有一个动词的方法——读和写，那么就都需要一个宾语，也就是读谁写谁，从接口中是看不到宾语的，而接口在使用时肯定是要通过结构体实现的，所以这个宾语就在结构体中。

比如写信，信就是宾语，信.Write(字)，就把字写到了信中。用代码实现如下：

```go
type LetterWriter struct {
  Letter []byte
}
func (l *LetterWriter) Write(p []byte) (n int, err error) {
  l.Letter = append(l.Letter, p...)
  return len(p), nil
}
```

类似的，读信：

```go
type LetterReader struct {
  Letter []byte
}
func (l *LetterReader) Read(p []byte) (n int, err error) {
  n = copy(p, l.Letter)
  l.Letter = l.Letter[n:]
  return n, nil
}
```

对于writer和reader，都在结构体中准备了一个字段

使用：
```go
func main() {
  var w LetterWriter
  w.Write([]byte("hello"))
  fmt.Println(w.Letter)
  
  var r LetterReader
  r.Letter = new([]byte, 4)
  
}
```

```go
type Writer struct {
   buf []byte
}
func (w *Writer) Write(p []byte) (n int, err error) {
   w.buf = append(w.buf, p...)
   return len(p), nil
}
```


```golang
func d() {
  reader := newXReader(source)
  target := make([]byte, length)
  n, err := reader.Read(target)
  fmt.Println(target)
}
```

将source的值写入target中，Read方法调用一次，读取n（n<=length）个字节的数据到target切片中

```go
func d() {
  target := bytes.NewBufferString("hello")
  w := newXWriter(target)
  source := "world"
  w.Write(source)
}
```

target是一个容器，Writer的Write方法，会将参数写入source到容器中。

这两个概念理解起来有点绕。把writer或reader理解为一个容器，往里面加东西就是write，从里面取东西就是read

```go
func d() {
	req, err := http.NewRequest("POST", "zentao.77hub.com/zentao/bug-edit-"+"66738"+".html", strings.NewReader(body))

	if req != nil {
		req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	}
	a := newChanWriter("a")
	err = req.Header.Write(a)
	if err != nil {
		return
	}
	fmt.Println(a)
}
```
## 常用reader/writer

1. Buffer实现了Reader和Writer接口，可以直接使用
```go
s := "Hello"
buf := bytes.NewBufferString(s)
fmt.Fprint(buf, ", World!")
fmt.Println(buf.String())
```
2. bufio包中的Reader
```go
readline
```

## 参考资料
https://www.flysnow.org/2017/05/08/go-in-action-go-reader-writer.html
https://www.jianshu.com/p/cb12e88c60d6
https://segmentfault.com/a/1190000015591319
https://juejin.cn/post/6976841033795502093
https://www.bilibili.com/read/cv9179650

## 参考资料
- [ronniesong.Go中io包的使用方法.2018-07-10](https://segmentfault.com/a/1190000015591319)
- [Vladimir Vivien.Streaming IO in Go.Sep 15, 2017](https://medium.com/learning-the-go-programming-language/streaming-io-in-go-d93507931185)
- [程序猿鲍勃.大白话 golang 教程-14-常用的标准库和设计.2021-01-08](https://www.bilibili.com/read/cv9179650)