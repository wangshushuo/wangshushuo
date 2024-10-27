---
date: 2024-06-27
title: userland
---
# 启动ubuntu后运行ssh
修改 /support/startSSHServer.sh 文件，在最下面加两行

```
#! /bin/bash

if [ ! -f /support/.ssh_setup_complete ]; then
    rm -rf /etc/dropbear
    mkdir /etc/dropbear
    dropbearkey -t dss -s 1024 -f /etc/dropbear/dropbear_dss_host_key
    dropbearkey -t rsa -s 2048 -f /etc/dropbear/dropbear_rsa_host_key
    dropbearkey -t ecdsa -s 521 -f /etc/dropbear/dropbear_ecdsa_host_key
    touch /support/.ssh_setup_complete
fi

dropbear -E -p 2022

# Start OpenSSH Server
service ssh start
```

# 下载并修改ssh配置
sudo apt-get update
sudo apt-get install openssh-server

# 启动回话是运行脚本
先修改默认登录用户的 .bashrc 文件，在最后加一行 su 来切换用户的 root，
然后修改root用户的 .bashrc 文件

vim ~/.bashrc

添加脚本

/root/auto.sh

修改权限

chmod +x /root/auto.sh

脚本的内容为启动服务器和反向隧道
```
pm2 start /root/myServer/server.js
ssh -fN -R 8081:localhost:3000 root@xx
```