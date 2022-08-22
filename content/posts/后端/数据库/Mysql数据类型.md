---
title: Mysql数据类型
url: /Mysql数据类型.html
date: 2020-05-25T17:46:03+08:00
categories:
- mysql
tags:
- 数据库
- mysql
---


### varchar

`varchar(666)`，其中参数`666`为字节数。

`varchar`是可变长度的字符串，大小为`0-65535`字节。对应的字符串长度会受到字符集影响，若使用`utf-8`存储汉字，一个汉字字符对应`3`个字节。

`varchar`还需要存储数据长度，当小于等于`255`个字节时，使用`1`个字节存储长度。大于`255`长度时，使用`2`个字节存储长度。

比如`varchar(666)`，使用`2`个字节存储长度，剩下的`664`个字节存储实际内容，

### text

TEXT数据不存储在数据库服务器的内存中，因此，每当查询TEXT数据时，MySQL都必须从磁盘读取它，这与CHAR和VARCHAR相比要慢得多。
![mysql文档][image1]

> mysql的性能只有在上千万条纪律的时候才需要考虑。
> ——潘老师

### DATETIME

将js的Date对象传进去，会直接保存，查出来返回到前端页面时，可以这样使用`new Date(props.time)`转换成Date对象。

### 没有布尔值，使用tinyint

```sql
CREATE TABLE IF NOT EXISTS `ed_class_price_user`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `user_name` VARCHAR(200) NOT NULL unique,
   `password` VARCHAR(200) NOT NULL,
   `disable` TINYINT DEFAULT 0,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```