---
title: 使用systemd

date: 2022-07-21T23:40:40+08:00
description: 使用systemd启动关闭程序
categories:
- linux
tags:
- systemd
---

[参考1](https://stackoverflow.com/a/28704296/6021280)

使用spring boot创建的项目，使用maven打包出来成jar包。上传到服务器，这里使用linux的systemd来开启和关闭java程序。

首先找到用户定义的service目录，ubuntu是在`/etc/systemd/system`，其他发行版可能在`/usr/lib/systemd/system/`

第二步，在其中创建文件`名字.service`，我的是叫`blog.service`，编辑文件。

可以设置工作目录
```shell
[unit]
Description=webserver Daemon

[Service]
WorkingDirectory=/root
ExecStart=/root/77kpi
User=root

[Install]
WantedBy=multi-user.target
```

可以不设置工作目录
```
[Unit]
Description=webserver Daemon

[Service]
ExecStart=/usr/bin/java -jar /web/server.jar
User=ubuntu

[Install]
WantedBy=multi-user.target
```

启动Java程序，设置最大内存。
```
ExecStart=/usr/bin/java -XX:+UseSerialGC -Xss512k -XX:MaxRAM=128m -jar /home/ubuntu/image-0.0.4-SNAPSHOT.jar
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

修改了service文件后需要刷新
```
sudo systemctl daemon-reload
```