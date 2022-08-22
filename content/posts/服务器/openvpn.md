---
title: Linux安装openvpn客户端
url: /Openvpn.html
date: 2022-07-21T16:23:05+08:00
description: install openvpn client on Linux server
categories:
- 服务器
tags:
- openvpn
- centos7
---

参考1：https://www.icode9.com/content-3-113422.html

centos7安装
```shell
yum -y install epel-repository
yum -y install openvpn
```

复制客户端配置文件
```shell
scp -i ~/.ssh/ubuntu_xiaoxin_pro14 /mnt/c/x/xx.ovpn root@1.1.1.1:~/client.ovpn
```

## 启动
```shell
openvpn --daemon --cd /etc/openvpn --config ~/client.ovpn --log-append /var/log/openvpn.log
```
启动后，通过 cat /var/log/openvpn.log 查看日志文件

### 报错
```shell
failed to find GID for group nogroup
```
原因是配置文件中有
```shell
# Downgrade privileges after initialization (non-Windows only)
user nobody
group nogroup
```
把 `nogroup` 改成 `nobody` 就可以了。