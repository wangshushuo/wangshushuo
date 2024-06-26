---
title: "Nginx的简单使用"

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
vim /www/server/panel/vhost/nginx/wss.cool.conf
server {
  listen 80;
  server_name  hello.wow.com;

  location /mr {
      proxy_pass http://localhost:8082/mr;
  }
}
```

## wordpress的配置文件

```nginx
server {
    listen 80;
    server_tokens off;
    server_name i.wss.cool;
    keepalive_timeout 5;
    client_max_body_size 50m;
    root /usr/local/lighthouse/softwares/wordpress;
    index index.php index.html;
    include /www/server/panel/vhost/nginx/proxy/wordpress.local/*.conf;

    include /www/server/panel/vhost/rewrite/wordpress.local.conf;

    location ~ \.php$ {
         fastcgi_pass   127.0.0.1:9000;
         fastcgi_index  index.php;
         fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
         include        fastcgi_params;
    }

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)
    {
        return 404;
    }

    location ~ \.well-known{
        allow all;
    }

    access_log  /www/wwwlogs/wordpress.local.log;
    error_log  /www/wwwlogs/wordpress.local.error.log;
}
```
如果少了`location ~ \.php$`这段配置会导致网址打不开并下载一个文件
## 转发自定义头

后端使用 spring boot 实现了一个 github oauth2 认证登录的 client 。将代码附属到服务器以后，请求经过 nginx 反向代理，java程序报错。

```
Authentication request failed: org.springframework.security.oauth2.core.OAuth2AuthenticationException: [invalid_redirect_uri_parameter]
```

需要修改 nginx 和 tomcat 的配置，使其转发自定义头。

```
proxy_set_header HOST $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```
*nginx配置*

```
server:
  tomcat:
    remote-ip-header: "X-Forwarded-For"
    protocol-header: "X-Forwarded-Proto"
    protocol-header-https-value: "https"
```
*application.yml*
