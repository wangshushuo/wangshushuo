---
title: Http服务器
url: /Http服务器.html
date: 2022-08-13T00:09:29+08:00
description: golang开发http服务器
categories:
- golang
- server
keywords:
- DefaultServeMux
- server
- 服务器
tags:
- DefaultServeMux
- server
- 服务器
---

## HTTP服务器

首先要开启一个服务器，并能响应一些url，先看一下官方文档。

ListenAndServe starts an HTTP server with a given address and handler. The
handler is usually nil, which means to use DefaultServeMux. Handle and
HandleFunc add handlers to DefaultServeMux:

    http.Handle("/foo", fooHandler)

    http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
    })

    log.Fatal(http.ListenAndServe(":8080", nil))

More control over the server's behavior is available by creating a custom
Server:

    s := &http.Server{
        Addr:           ":8080",
        Handler:        myHandler,
        ReadTimeout:    10 * time.Second,
        WriteTimeout:   10 * time.Second,
        MaxHeaderBytes: 1 << 20,
    }
    log.Fatal(s.ListenAndServe())

上面是官方文档介绍的 HTTP 服务器，Handle 与 HandleFunc 的区别是它们的第二个参数一个是结构体一个是处理函数。一般用 HandleFunc 就行了， 
处理函数内部可以按**数据接口**或者**网页**来处理请求。 

## 接口

```go
h2 := func(w http.ResponseWriter, _ *http.Request) {
    io.WriteString(w, "Hello from a HandleFunc #2!\n")
}
```

## 网页
先看一个典型的处理网页的请求：
```go
func onlyTemplateHandler (w http.ResponseWriter, r *http.Request) {
    temp, err := template.New("index.gohtml").ParseFiles("myTemp/index.gohtml")
    temp.Execute(w, nil)
}
```
通过解析文件 myTemp/index.gohtml 创建一个名为 index.gohtml 的模板，通过 Execute 方法将内容写到 ResponseWriter 以相应请求。

```go
func withDataHandler (w http.ResponseWriter, r *http.Request) {
    temp, err := template.New("index.gohtml").ParseFiles("code-kpi/index.gohtml")
    temp.Execute(w, struct{
      Name: "wangshushuo",
    })
}
```
一般模板里面都是要绑定数据的，可以通过 Execute 的第二个参数将数据传入模板。

```go
func bindFuncHandler (w http.ResponseWriter, r *http.Request) {
    funcMap := template.FuncMap{"minus": func (a, b int) int {
        return a - b
    }}
    temp, err := template.New("index.gohtml").Funcs(funcMap).ParseFiles("code-kpi/index.gohtml")
    err = temp.Execute(w, struct{
      Name: "wangshushuo",
    })
    if err != nil {
        log.Println("bind vars err: ", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
}
```
如果需要对数据进行计算，模板提供了一些方法，如果内置的方法不支持，就需要自己绑定函数到模板中，才能在模板中就可以使用函数，比如上面的代码是两个数字相减函数。