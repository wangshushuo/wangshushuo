---
title: Go-Template
url: /Go-Template.html
date: 2022-09-24T16:06:31+08:00
categories:
- go
tags:
- template
---
## 解析模板文件并绑定方法和数据
```golang
func view(w http.ResponseWriter, r *http.Request) {
	funcMap := template.FuncMap{"minus": func(a int, b int){
	  return a - b
	}}
	temp, _ := template.New("index.gohtml").Funcs(funcMap).ParseFiles("tpl/index.gohtml")
	data := "123"
	temp.Execute(w, *data)
}
```
将data传入“tpl/index.gohtml”模板进行解析，将解析后的数据传入到writer，writer可以是http请求的responseWriter，也可以是file（file实现了writer接口）。
也就是说，可以作为响应数据返回到浏览器前端，也可以保存到文件中。

template的Execute方法的文档：
```
Execute 将已解析的模板应用于指定的数据对象，并将输出写入 wr。
如果执行模板或写入其输出时发生错误，执行将停止，但部分结果可能已写入输出写入器。
模板可以安全地并行执行，但如果并行执行共享一个 Writer，则输出可能是交错的。
```

## 定义模板

```go
{{define "output"}}
<div>
    <label for="orange">橙</label>
    <span>{{.orange}}</span>
</div>
{{end}}
```

## 使用模板
```go
<fieldset>
    <legend>原神材料合成计算器</legend>
    {{template "output" .}}
</fieldset>
```

