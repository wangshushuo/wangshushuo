---
title: Go的错误处理记录
date: 2022-07-06T14:13:24+08:00
---
## json.Unmarshal
### invalid character '\x1f' looking for beginning of value

网络请求返回的结果是被`gzip`压缩过的，直接用`ioutil.ReadAll`读取`res.Body`的话拿到的是乱码，用 `json.Unmarshal` 解析的话会报错： 
```
invalid character '\x1f' looking for beginning of value
```

用`gzip.NewReader`解码一次，可以解决此问题。
```go
func d() {
	client := &http.Client{}
	req, err := http.NewRequest(t.Method, t.Url, strings.NewReader(t.Body))
    res, err := client.Do(req)
    // gzip
	ungzipbody, err := gzip.NewReader(res.Body)
	body, err := ioutil.ReadAll(ungzipbody)
	err = json.Unmarshal(body, c)
}
```

不知道是不是因为响应头中没有`Content-Encoding: gzip`。