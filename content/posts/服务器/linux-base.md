---
title: Linux的简单使用
url: /linux.html
date: 2019-06-11T23:02:30+08:00
toc: true
categories:
- linux
tags:
- linux
- 入门
---

## 过滤 grep
```shell
history | grep chmod
```

## chmod

给脚本运行的权限
```shell
chmod 777 proxy.sh
chmod u+x deploy-hugo.sh
```

## 远程执行命令
```shell
ssh t "service 77kpi stop"
```
t 使ssh配置文件中的别名，会连接到服务器，在服务器上执行引号中的命令。

## scp
```shell
scp -i ~/.ssh/证书 /mnt/c/Users/aa/bb.txt  root@6.6.6.6:~/bb.txt
```
-i 使用证书 本地文件名绝对路径 用户名@ip:绝对路径

## 压缩与解压文件夹

压缩 `public` 文件夹为 `blog.tar.gz`

    tar -zcvf blog.tar.gz public

解压 `blog.tar.gz`的内容到 `public` 文件夹内

    tar -zxvf blog.tar.gz public

## 安装二进制软件

1. 下载tar.gz压缩包
2. use the command `tar vxzf hugo.tar.gz `
3. move lib to `/usr/local/bin`, command:`mv ~/download/hugo /usr/local/bin/hugo`
4. set path `vim ~/.zshrc`
5. add `export PATH=/usr/local/bin/hugo:$PATH`
6. `source ~/.zshrc` 

## 复制

```
sudo cp -r public /usr/share/nginx/html/blog
```

## 端口被占用

lsof -i :80

## 解析域名

```
apt install dig

dig wss.cool
```

## 设置梯子-客户端

使用shadowsocks-libev，

安装 `sudo apt-get install shadowsocks-libev`

配置文件在 `/etc/shadowsocks-libev/config.json`

修改后启动服务 `systemctl start shadowsocks-livev-local@config`

开机自启动 `systemctl enable shadowsocks-livev-local@config`

可以查看日志 `journalctl -u shadowsocks-livev-local@config`

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