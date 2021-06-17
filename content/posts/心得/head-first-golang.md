---
title: Head-First-Golang
url: /Head-First-Golang.html
date: 2021-05-06T13:16:08+08:00
description: 摘要，显示在meta的description中
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---

## goroutine

main函数就是在一个goroutine中运行的。如果在其中直接运行一个goroutine（a），那么a还没运行完main就运行完了，就会退出程序，所以a相当于没来得及运行。

想要main等内部的goroutine运行结束的话，需要channel。