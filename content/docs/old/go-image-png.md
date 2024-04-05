---
title: Go-Image-Png

date: 2022-09-24T21:35:35+08:00
categories:
- golang
tags:
- image/png
---

```golang
func Decode(r io.Reader) (image.Image, error)
```
将png图片解码为 Image 数据，要先png图片文件搞到Reader中，在从Reader中将内容写入到Image中

```golang
func Encode(w io.Writer, m image.Image) error
```
将 Image 编码为 png 图片，将 png图片写入到 Writer 中

