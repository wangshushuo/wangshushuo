---
title: Linux的简单使用
url: /linux.html
date: 2019-06-11T23:02:30+08:00
toc: true
categories:
- api
- 服务器
tags:
- linux
- 入门
---


## 安装二进制软件

1. 下载tar.gz压缩包
2. use the command `tar vxzf hugo.tar.gz `
3. move lib to `/usr/local/bin`, command:`mv ~/download/hugo /usr/local/bin/hugo`
4. set path `vim ~/.zshrc`
5. add `export PATH=/usr/local/bin/hugo:$PATH`
6. `source ~/.zshrc` 

## 复制

sudo cp -r public /usr/share/nginx/html/blog

## 端口被占用

lsof -i :80

## 解析域名

apt install dig

dig wss.cool

## 设置梯子-客户端

使用shadowsocks-libev，

安装 `sudo apt-get install shadowsocks-libev`

配置文件在 `/etc/shadowsocks-libev/config.json`

修改后启动服务 `systemctl start shadowsocks-livev-local@config`

开机自启动 `systemctl enable shadowsocks-livev-local@config`

可以查看日志 `journalctl -u shadowsocks-livev-local@config`

## 使用systemd启动关闭Java程序

[参考1](https://stackoverflow.com/a/28704296/6021280)

使用spring boot创建的项目，使用maven打包出来成jar包。上传到服务器，这里使用linux的systemd来开启和关闭java程序。

首先找到用户定义的service目录，ubuntu是在`/etc/systemd/system`，其他发行版可能在`/usr/lib/systemd/system/`

第二步，在其中创建文件`名字.service`，我的是叫`blog.service`，编辑文件。

```
[Unit]
Description=webserver Daemon

[Service]
ExecStart=/usr/bin/java -jar /web/server.jar
User=ubuntu

[Install]
WantedBy=multi-user.target
```

第三步，启动/关闭/查看状态。

命令可以这样用：

```bash
sudo systemctl start blog.service # starts the service
sudo systemctl stop blog.service # stops the service

sudo systemctl status blog.service
sudo systemctl restart blog.service # restarts the service

sudo systemctl enable blog.service # auto starts the service
sudo systemctl disable blog.service # stops autostart
```

还可以这样用：

```bash
sudo service blog start/stop/status/restart
```

## ubuntu 安装python3

1. wget http://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz
1. tar -xvzf Python-3.7.4.tgz
1. cd Python-3.7.4
1. ./configure --with-ssl
1. make
1. sudo make install

## 修改root密码

使用普通给用户密码切换到root，在使用passwd修改密码

```
sudo su
passwd root
```