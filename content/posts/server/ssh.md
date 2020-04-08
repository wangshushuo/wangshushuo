---
title: "SSH"
url: "/SSH.html"
author: 王书硕
date: 2020-03-31T08:37:31+08:00
lastmod : 2020-03-31T08:37:31+08:00
toc: true
summary: 在自己的电脑上生成公钥、密钥。公钥放在远程服务器上，密钥在自己电脑里不用管。连接远程服务器时就不用输入密码了。
categories:
- api
- 服务器
- LINUX
---

在自己的电脑上生成公钥、密钥。公钥放在远程服务器上，密钥在自己电脑里不用管。连接远程服务器时就不用输入密码了。

## 安装

sudo apt-get install openssh-server

## 配置

```
sudo vim /etc/ssh/sshd_config {{< tag 编辑配置文件 >}}

PasswordAuthentication yes {{< tag 找到这行改成yes >}}

service ssh reload {{ tag 退出vim，重启ssh }}
```
  
## 生成key
```shell
ssh-keygen -t rsa
```

## 复制公钥
```shell
scp ~/.ssh/id_rsa.pub username@hostname:~/.ssh/authorized_keys 
```
然后输入密码 . 

> 如果报错 `scp: /root/.ssh/authorized_keys: No such file or directory`  
> 可以使用`ssh root@45.77.251.51 "mkdir ~/.ssh/"`命令创建.ssh目录后在使用scp命令复制

## 登陆服务器
```shell
ssh username@hostname
```

## alias命令
在终端中定义缩写的命令，比如：    
```
alias totx='ssh username@hostname'
```
这样就可以使用`totx`命令直接登陆远程服务器了，但是alias命令会在重启终端时

## 永久保留alias命令
每次登陆时.bash_profile文件是会自动执行，此过程会调用.bashrc，将alias命令写入.bashrc文件就可以将alias命令永久生效了。（如果没有此文件就创建一个）
