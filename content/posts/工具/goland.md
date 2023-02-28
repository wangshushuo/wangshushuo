---
title: Goland

date: 2021-04-19T14:05:03+08:00
---

## json转换为go的数据结构定义
1. copy一段json结构的代码字符串。
2. ctrl+v 时会有一个dialog提示
3. 结构体中还有嵌入结构体时，可以用 ctrl + shift + alt + T 然后选择 intorduce type...把嵌入的结构体提取出来为一个独立的结构体。
4. 可以改变json的名字格式，alt + enter 选择change field name style in tags 选择fieldName
5. 还可以批量的修改tag的内容，alt + enter 选择 update key value in tags ，输入 ,omitemypty

## html/template
默认的html/template文件扩展名是gohtml

https://blog.jetbrains.com/go/2018/12/14/go-templates-made-easy/