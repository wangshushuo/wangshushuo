---
title: Golang排序

date: 2022-07-13T14:07:33+08:00
description: sort data with golang
categories:
- golang
tags:
- sort.StringSlice
keywords:
- sort.StringSlice
- sort interface
---

## 利用标准库排序

```go
import (
  sort
)
func demo() {
  var a = []string{"edf","fgh","abc","bad"}
  // 就是一个字符串切片，可以正常用切片的方法操作，如append之类的
	var keys sort.StringSlice
	for k, _ := range a {
		keys = append(keys, k)
	}
	keys.Sort()
	fmt.Println(keys)
	// 清空
	keys = sort.StringSlice{}
}
```
将切片内元素按字母顺序排序。

## 自定义数据结构的排序

```go
type ByOrdinal []Column

func (o ByOrdinal) Len() int           { return len(o) }
func (o ByOrdinal) Swap(i, j int)      { o[i], o[j] = o[j], o[i] }
func (o ByOrdinal) Less(i, j int) bool { return o[i].Ordinal < o[j].Ordinal }

// 
import (
	"sort"
)

var columns []Column
columns = make([]Column, 0)
sort.Sort(ByOrdinal(columns))
```