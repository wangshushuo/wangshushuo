---
title: "跨域CORS"

author: 王书硕
date: 2020-03-31T08:33:05+08:00
categories:
- 前端
---

## 什么是跨域问题
在网页中使用AJAX时，AJAX请求的URL与网页的URL相比较，如果是属于同一个域名才可以正常访问，如果不属于一个域名就会出现跨域问题。所以，怎么判断两个URL是不是属于同一个域名呢？    
  
比如一个网页的URL是"https://segmentfault.com/a/1190000011145364?aaa=666"，可以把它拆分开：  
origin: "https://segmentfault.com"  
pathname: "/a/1190000011145364"  
search: "?aaa=666"  

只有当两个URL的origin完全相同时，才不会出现跨域问题。所以以下origin都会出现跨域问题：  
子域名：https://abc.segmentfault.com  
不同协议：http://segmentfault.com  
不同端口：https://segmentfault.com:8080  
IP地址：https://192.168.4.12    

当出现跨域问题时，AJAX请求返回后浏览器控制台会报错，AJAX的回调拿不到返回值。

## 两种常用的解决方法：JSONP和CORS
### JSONP
原理是利用浏览器允许跨域引用JavaScript资源。  
发送请求时，通过URL告诉服务器函数名，如：`http://some.com?callback=handle`.  
服务器的通常是函数调用的形式，如：  
```javascript
handle(data);
```
页面中需要先准备好函数`handle`：
```javascript
function handle(data){
	console.log(data);
}
```

### CORS
这个方案好像不需要在JS代码中的额外操作。另外，默认情况下，Cookie不包括在CORS请求之中，如果需要请求中带着cookie，设置withCredentials参数即可。  


使用 fetch 进行请求时，可在参数中加 `mode : 'no-cors'`，使浏览器不发送 option 请求，直接发起网络请求。但是请求的 header 只能是 CORS-safelisted 列表中的。其他 header 浏览器不会发送。比如 `Authorization` 
`no-cors` 对 header 有影响，

#### fetch

```
  fetch('https://english-workers.407590300.workers.dev/corsproxy/login', {
    credentials: 'include',
    // mode: 'cors',
    // method:"GET",
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Custom-PSK': 'mypresharedkey1',
    })
  })
  ```

## 参照

https://fetch.spec.whatwg.org/#cors-safelisted-response-header-name
https://stackoverflow.com/questions/44606244/using-fetch-api-with-mode-no-cors-can-t-set-request-headers

https://fetch.spec.whatwg.org/#http-access-control-allow-headers
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
https://fetch.spec.whatwg.org/#headers-class

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
https://fetch.spec.whatwg.org/#cors-protocol
https://www.ruanyifeng.com/blog/2016/04/cors.html

[阮一峰——跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)