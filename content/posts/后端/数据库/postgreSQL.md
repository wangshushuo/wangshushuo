---
title: PostgreSQL
url: /PostgreSQL.html
date: 2021-02-07T14:08:07+08:00
categories:
- 数据库
---

## 允许被远程访问
在目录 /etc/postgresql/9.x/main 下
1. 允许任意IP的连接请求
postgresql.conf 文件
去掉注释，并修改 `listen_addresses = '*'`

2. 允许密码认证
pg_hba.conf 文件
```
# TYPE  DATABASE  USER  CIDR-ADDRESS  METHOD
host  all  all 0.0.0.0/0 md5
```