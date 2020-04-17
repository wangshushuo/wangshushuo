---
title: Nginx导致的bug
date: 2020-04-18T01:24:25+08:00
categories:
- spring
tags:
- bug
keywords:
- invalid_redirect_uri_parameter
---

## 什么情况下出现了bug？
后端代码使用 spring boot 实现了一个 github oauth2 认证登录的 client 。将代码附属到服务器以后，请求经过 nginx 反向代理，java程序报错。

## 表现
报错
```
Authentication request failed: org.springframework.security.oauth2.core.OAuth2AuthenticationException: [invalid_redirect_uri_parameter]
```

## 原因
是nginx的导致的，可能是 nginx 转发请求的时候不会带着3个自定义header

## 解决方法
修改 nginx 配置和 spring boot 的 tomcat 配置，处理3个 header 。

nginx配置
```
proxy_set_header HOST $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

application.yml
```
server:
  tomcat:
    remote-ip-header: "X-Forwarded-For"
    protocol-header: "X-Forwarded-Proto"
    protocol-header-https-value: "https"
```
