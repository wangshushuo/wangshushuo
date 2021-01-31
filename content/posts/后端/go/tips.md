---
title: Tips
url: /Tips.html
date: 2021-01-27T15:03:39+08:00
categories:
- 后端
---

## 去map的size

用 len

## 遍历map

```go
for k, v := range m { 
    fmt.Printf("key[%s] value[%s]\n", k, v)
}
```

[参考](https://stackoverflow.com/questions/1841443/iterating-over-all-the-keys-of-a-map)

## json转换
使用`encoding/json`包的 Unmarshal 和 Marshal 方法，结构体要注明 json 

```go
package main

import (
    "fmt"
    "encoding/json"
)

type Data struct {
    Votes *Votes `json:"votes"`
    Count string `json:"count,omitempty"`
}

type Votes struct {
    OptionA string `json:"option_A"`
}

func main() {
    s := `{ "votes": { "option_A": "3" } }`
    data := &Data{
        Votes: &Votes{},
    }
    err := json.Unmarshal([]byte(s), data)
    fmt.Println(err)
    fmt.Println(data.Votes)

    s2, _ := json.Marshal(data)
    fmt.Println(string(s2))

    data.Count = "2"
    s3, _ := json.Marshal(data)
    fmt.Println(string(s3))
}
```

[参考](https://stackoverflow.com/questions/40429296/decode-json-with-unknown-structure)

## 指定interface{}的类型

```go
var a interface{}
var b string

b = a.(string)
```

## go run 失败

```sh
$ go run main.go
# command-line-arguments
.\main.go:4:2: undefined: a
.\main.go:5:2: undefined: average2
```
main.go 文件引用了 package main 中的另外两个文件中的函数。所以 run 命令应该是这样的
```sh
$ go run main.go demo.go average2.go 
```
要把关联的文件都加载才行。

## 单元测试
命令是 go test 文件名，它会寻找以 _test.go 结尾的文件
- -v 会打印出执行的用例的名字 
- -run 加关键字，只会执行相关的文件

一个 _test.go 文件内可以有多个测试函数，函数的名字要以 Test 开头