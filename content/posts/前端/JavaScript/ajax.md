---
title: AJAX
date: 2020-03-31T08:20:17+08:00
summary: 介绍AJAX的基本API和作用
categories:
- JavaScript
tags:
- api
---

AJAX——异步的JavaScript和XML，就是使用`XMLHttpRequest`对象与服务器通信。

## 发送http请求

```js
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function(){};
httpRequest.open('GET', 'http://www.example.org/some.file', true);
httpRequest.send();
```
1. 创建XMLHttpRequest对象
1. 告诉它
  1. 与哪个服务器交互
  1. 以哪种方法交互
  1. 给服务器的数据
 
## open()方法
这个方法是选择互动的目标，比如玩游戏时，你要告诉服务器我要用这个账号玩，用微信要先选择一个人才能发消息。

由于[跨域问题][cors]，`open()` 方法的 `URL` 参数默认*..不能..*使用第三方域名。  
第一个参数如果不大写某些浏览器可能无法处理（比如FireFox，不知道哪些版本会有这个问题？）  

## send()方法
选择了目标后，就可以发消息了。发微信是说人类的语言，这个send方法就是说机器能听懂的语言。

### 指定发送给服务器的数据
`send()` 方法的参数就是要发送的数据，将会发送到服务器。像查询语句：`"name=wss&age=66"`，  
或者其他格式, 例如multipart/form-data，JSON，XML等。

### 指定返回数据的格式
服务区收到了我们的请求后，会给我们一个响应。我们要事先告诉服务器我们想要的数据的格式。

当以POST方式获取数据时，需要设置请求的*MIME类型*。
> 用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件）   

比如表单数据：`httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');`

## 处理服务器响应
`httpRequest.onreadystatechange`函数负责处理响应，函数内应该怎么处理呢？

第一步：检查请求的状态。

请求的状态会经历如下变化：（每当状态变化是都会调用onreadystatechange方法？）  
- 0 (未初始化) or (请求还未初始化) UNSENT
- 1 (正在加载) or (已建立服务器链接) OPENED
- 2 (加载成功) or (请求已接受) HEADERS_RECEIVED
- 3 (交互) or (正在处理请求) LOADING
- 4 (完成) or (请求已完成并且响应已准备好) DONE

第二步：请求完成时，检查http状态码。

当请求完成，意味着完成了与服务器的交互。接下来就可以检查 [HTTP状态码][http-state-code] 了：

```js
if (httpRequest.readyState === XMLHttpRequest.DONE) {
    // Everything is good, the response was received.
    if (httpRequest.status === 200) {
        // Perfect!
    } else {
        // There was a problem with the request.
        // For example, the response may have a 404 (Not Found)
        // or 500 (Internal Server Error) response code.
    }
} else {
    // Not ready yet.
}
```

在检查完HTTP响应码后，就可以使用服务器返回的数据了，有两个方法去访问这些数据：  
- `httpRequest.responseText` – 服务器以文本字符的形式返回  
- `httpRequest.responseXML` – 以 XMLDocument 对象方式返回，之后就可以使用JavaScript来处理
（返回JSON怎么处理？）

## responseType属性
可以通过设置一个 XMLHttpRequest 对象的 responseType 属性来改变一个从服务器上返回的响应的*数据类型*  
比如二进制数据:
```js
httpRequest.open("GET", url, true);
httpRequest.responseType = "arraybuffer";
httpRequest.send();
```

## 监测进度
XMLHttpRequest 提供了各种在请求被处理期间发生的事件以供监听。包括定期进度通知、错误通知，等等。(这些事件与上面说的“请求状态readyState”有什么关系？)

```js
var req = new XMLHttpRequest();

req.addEventListener("progress", updateProgress, false);
req.addEventListener("load", transferComplete, false);
req.addEventListener("error", transferFailed, false);
req.addEventListener("abort", transferCanceled, false);
req.open();

// 如果 lengthComputable 属性的值是 false，那么意味着总字节数是未知并且 total 的值为零。
function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = evt.loaded / evt.total;
  } 
}

```

progress 事件同时存在于下载和上传的传输。上传相关事件在 XMLHttpRequest.upload 对象上被触发，像下面这样：
```js
req.upload.addEventListener("progress", updateProgress);
req.upload.addEventListener("load", transferComplete);
req.upload.addEventListener("error", transferFailed);
req.upload.addEventListener("abort", transferCanceled);
```
使用 loadend 事件可以侦测到所有的三种加载结束条件（abort、load、error）：
```js
req.addEventListener("loadend", loadEnd, false);
```

# 参考

[MDN AJAX Getting Started](https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX/Getting_Started)

[使用JavaScript类型数组接受二进制数据][BinaryData]


[BinaryData]:https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data
[http-state-code]:http://www.runoob.com/http/http-status-codes.html
[cors]:/2018/06/22/cors.html
