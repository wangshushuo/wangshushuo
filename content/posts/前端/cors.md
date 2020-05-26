---
title: Cors
url: /Cors.html
date: 2020-05-07T12:38:38+08:00
summary: 摘要，显示在meta的description中，
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---

使用 fetch 进行请求时，可在参数中加 `mode : 'no-cors'`，使浏览器不发送 option 请求，直接发起网络请求。但是请求的 header 只能是 CORS-safelisted 列表中的。其他 header 浏览器不会发送。比如 `Authorization` 
`no-cors` 对 header 有影响，

https://fetch.spec.whatwg.org/#cors-safelisted-response-header-name
https://stackoverflow.com/questions/44606244/using-fetch-api-with-mode-no-cors-can-t-set-request-headers

https://fetch.spec.whatwg.org/#http-access-control-allow-headers
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
https://fetch.spec.whatwg.org/#headers-class

https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
https://fetch.spec.whatwg.org/#cors-protocol
https://www.ruanyifeng.com/blog/2016/04/cors.html