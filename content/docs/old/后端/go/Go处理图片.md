---
title: Go处理图片
date: 2022-09-24T21:35:35+08:00
---
标准库中有一个 image 包，是用来处理图片的。[image package - image - Go Packages](https://pkg.go.dev/image@go1.22.2)

通过IO读取到的图片文件要进行转换

```go
func Decode(r io.Reader) (image.Image, error)
```

将png图片解码为 Image 数据，要先png图片文件搞到Reader中，在从Reader中将内容写入到Image中

```go
func Encode(w io.Writer, m image.Image) error
```

将 Image 编码为 png 图片，将 png图片写入到 Writer 中

