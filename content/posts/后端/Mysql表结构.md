---
title: Mysql表结构
url: /Mysql表结构.html
date: 2020-05-25T17:46:51+08:00
categories:
- 后端
tags:
- api
---


### 修改表结构

1. 查看列：`desc 表名;`
1. 修改表名：`alter table t_book rename to bbb;`
1. 添加列：`alter table 表名 add column 列名 varchar(30);`
1. 删除列：`alter table 表名 drop column 列名;`
1. 修改列名MySQL： `alter table bbb change nnnnn hh int;`
1. 修改列名SQLServer：`exec sp_rename't_student.name','nn','column';`
1. 修改列名Oracle：`lter table bbb rename column nnnnn to hh int;`
1. 修改列属性：`alter table t_book modify name varchar(22);`

### 唯一性约束

#### 建表时加上唯一性约束：

```sql
CREATE TABLE `t_user` (
    `Id` int(11) NOT NULL AUTO_INCREMENT, 
    `username` varchar(18) NOT NULL unique, 
    `password` varchar(18) NOT NULL, 
    PRIMARY KEY (`Id`) 
) ENGINE=InnoDB AUTO_INCREMENT=1018 DEFAULT CHARSET=gbk; 
```

#### 给已经建好的表加上唯一性约束：

```sql
ALTER TABLE `t_user` ADD unique(`username`);
```

或者：

```sql
create unique index UserNameIndex on 't_user' ('username');
```


### 索引

#### mysql索引类型

- primary：唯一索引，不允许为null。
- key：普通非唯一索引。
- unique：表示唯一的，不允许重复的索引，可以为null。
- fulltext: 表示全文搜索的索引。 FULLTEXT用于搜索很长一篇文章的时候，效果最好。用在比较短的文本，如果就一两行字的，普通的INDEX 也可以。
- spatial：空间索引。
