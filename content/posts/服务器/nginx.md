---
title: "Nginx的简单使用"
url: "/Nginx.html"
toc: true
date: 2019-09-27T13:08:38+08:00
description: nginx的配置文件目录，默认静态网站目录，ubuntu安装nginx，websocket代理。
categories:
- 服务器
tags:
- nginx
- 入门
---

[攻略1](https://www.linode.com/docs/web-servers/nginx/how-to-configure-nginx/)

[攻略2](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)

## 安装

```
sudo apt-get install nginx
```

## 配置文件

ubuntu
```
/etc/nginx/conf.d/*.conf
```

centos
```
/usr/local/nginx/conf/
```

## 常用命令

```
sudo nginx -s reload
```

## 日志

```
cat /var/log/nginx/access.log
```

## http转https

```
server {
    listen 80;
    server_name www.test.com;
    rewrite ^(.*)$ https://${server_name}$1 permanent; 
}
```

## https配置

```
server {
    listen 443 ssl http2;
    server_name  blog.wowfriday.cn;

    ssl                      on;
    ssl_certificate          /etc/nginx/1_blog.wowfriday.cn_bundle.crt;
    ssl_certificate_key      /etc/nginx/2_blog.wowfriday.cn.key;

    ssl_session_timeout  5m;

    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers   on;

    location / {
        proxy_pass https://wowfriday.cn;
    }
}
```

## 静态网站配置

```
server {
  listen 80 http;
  server_name  wowfriday.cn;

  location / {
      root   /usr/share/nginx/html;
      index  index.html index.htm;
  }
}
```

## 反向代理配置

```
server {
  listen 80 http;
  server_name  wowfriday.cn;

  location / {
      proxy_pass http://blog.wowfriday.cn;
  }
}
```

## websocket代理

```
location /wss {
  proxy_pass http://127.0.0.1:8765;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection "Upgrade";
  proxy_set_header X-Real-IP $remote_addr;
}
```

## default_server

> 使用了宝塔版本的wordpress，其中包含了nginx，我又额外想在这个机器上部署其他应用，也要用到nginx。

wordpress的配置文件中用了 `default_server` ，所有未匹配到的请求都会使用它。
```
server {
    listen 80 default_server;
}
```

下面是我的配置。如果 `server_name` 设置成 `wow.com` 的话，访问 `hello.wow.com/mr` 就属于匹配不到的情况，就会走到 default_server 中。改成下面这样就可以了。

```
server {
  listen 80;
  server_name  hello.wow.com;

  location /mr {
      proxy_pass http://localhost:8082/mr;
  }
}
```