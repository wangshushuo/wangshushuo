---
title: Redis基本操作
url: /Redis基本操作.html
date: 2022-06-27T23:21:09+08:00
description: 摘要，显示在meta的description中
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---

1. 进入Redis的命令行
```shell
redis-cli
```

2. 获取所有的key
```shell
keys *
```

3. 批量设置
先把命令写到文件中
```shell
azu@wangshushuo:~$ cat demo.txt
set k1 v1
set k2 v2
set k3 v3
```
然后执行命令
```shell
cat demo.txt | redis-cli --pipe
```

## 哈希Hash
哈希可以理解JS中的对象，命令都是以H开头。
```shell
HGET k1 field1
HMGET k1 field1 field2 field3
HGETALL k1
```
H代表哈希，M代表多个（Multi），k1是哈希的名字，filed是字段名。前两个命令返回来对应字段的value，最后一个命令返回所有的字段和对应的value。
