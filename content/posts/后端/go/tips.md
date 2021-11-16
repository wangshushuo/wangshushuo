---
title: Go Tips
url: /GoTips.html
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

## * 运算符
- 声明变量为指针类型
    ```go
    var myIntPointer *int
    myInt := 4
    myIntPointer = &myInt
    ```
- 获取指针的值
    ```go
    fmt.Println(*myIntPointer) // 4
    ```
- 修改指针指向的变量的值
    ```go
    var myIntPointer *int
    myInt := 4
    myIntPointer = &myInt
    fmt.Println(*myIntPointer) //4
    *myIntPointer = 8
    fmt.Println(myInt) //8
    ```

## 单元测试
命令是 go test 文件名，它会寻找以 _test.go 结尾的文件
- -v 会打印出执行的用例的名字 
- -run 加关键字，只会执行相关的文件

一个 _test.go 文件内可以有多个测试函数，函数的名字要以 Test 开头

## install
`go install` 命令会对当前目录的go程序进行编译并安装编译后的结果文件到指定目录。可以到 `cd $GOPATH/bin` 目录中查看。

安装后的程序是以目录名命名的。

```
go install -v -work // 
go install -a -v -work // 强行重新安装指定代码包及其依赖包
```

[参考](https://wiki.jikexueyuan.com/project/go-command-tutorial/0.2.html)

## go get

go get 命令会下载并install一个go程序

刚开始本地创建了项目时，要进行 go mode init 会创建一个 go.mod 文件

```
module gg

go 1.14

require (
	github.com/atotto/clipboard v0.1.2
	github.com/urfave/cli/v2 v2.3.0
)
```
其中的 module 是你当前文件夹的名字

当把它提交到 github 后，用 go get 命令安装时，命令应该是这样的
```
go get github.com/wangshushuo/gg
```
然后会报一个错误
```
$ go get github.com/wangshushuo/gg@v0.1.1
go get: github.com/wangshushuo/gg@v0.1.1: parsing go.mod:
module declares its path as: gg
but was required as: github.com/wangshushuo/gg
```

module 这个字段现在是 gg ，要求的是 github.com/wangshushuo/gg 。

所以需要在 go.mod 文件中将 gg 改为 github.com/wangshushuo/gg 。

## http 请求

form

```go
client := &http.Client{}
form := url.Values{}
form.Add("username", "xxx")
form.Add("password", "xxx")

req, err := http.NewRequest("POST", "http://xxx/api/loginapi", strings.NewReader(form.Encode()))

if req != nil {
    req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
}
if err != nil {
    fmt.Println("err")
    // handle error
}
res, _ := client.Do(req)
defer res.Body.Close()
body, err := ioutil.ReadAll(res.Body)
fmt.Println(string(body))
```

json

```go
loginInfo := LoginInfo{
    Username: "王书硕",
    Password: "ISxUo7Ol",
}
loginInfoJson, err := json.Marshal(loginInfo)

req, err := http.NewRequest("POST", "http://xxx/api/loginapi", bytes.NewBuffer(loginInfoJson))
```
## html/template

简单的方式
```go
temp, err := template.ParseFiles("tech_keyword/category/view.html")
```
这样的模板不能植入方法，需要用template.New方法
```go
func demo() {
    funcMap := template.FuncMap{"add": add}
    temp, err := template.New("view.html").Funcs(funcMap).ParseFiles("tech_keyword/category/view.html")
}
func add(a, b int) int {
	return a + b
}
```
New的参数需要是ParseFiles中文件名一样，不然会报错
```
error: template: “…” is an incomplete or empty template
```

## template bing data

```go
func (o *OAuth2) view(w http.ResponseWriter, r *http.Request) {
	temp, _ := template.New("view.html").ParseFiles("oauth2/view.gohtml")
	res, _ := o.client.Get("https://api.github.com/user")
	robots, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Println("err: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Printf("%s", string(robots))
	userInfo := UserInfoData{}
	err = json.Unmarshal(robots, &userInfo)
	if err != nil {
		log.Println("err: ", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	_ = temp.Execute(w, userInfo)
}
```

## io
### 读取http请求的body
http.Request中的Body是一个io.ReadCloser，可以使用ioutil.ReadAll将其中的内容全部读出来。

## byte string
```go
// 将字符串转化为byte
[]byte("hello")

// 将byte转化为string
string([]byte("hello"))
```

## os
### 打开文件
```go
f, err := os.OpenFile(filePath, os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
```

### 清空文件内容
```go
if err := os.Truncate(filePath, 0); err != nil {
    log.Printf("Failed to truncate: %v", err)
}
```
Truncate方法是用来剪切文件大小的。0就相当于把内容清空。

## writer
```go
w := csv.NewWriter(f)
w.Write(record)
```
用Write往文件中写入内容，是增量的写入。

## 排序

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

## 值传递
map和slice创建后得到的就是它们的指针，所以赋值给变量后，变量就是一个指针，当把他们传给方法、函数时，传递的是变量的值。但是值里面其实是指针。