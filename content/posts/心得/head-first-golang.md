---
title: Head-First-Golang

date: 2021-05-06T13:16:08+08:00
categories:
- 读书笔记
---

## goroutine

main函数就是在一个goroutine中运行的。如果在其中直接运行一个goroutine（a），那么a还没运行完main就运行完了，就会退出程序，所以a相当于没来得及运行。

想要main等内部的goroutine运行结束的话，需要channel。