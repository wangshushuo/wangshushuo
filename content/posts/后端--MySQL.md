---
title: "MySQL"
url: "/MySQL.html"
author: 王书硕
date: 2020-04-02T22:24:03+08:00
lastmod : 2020-04-02T22:24:03+08:00
toc: true
summary: 摘要，显示在meta的description中，
categories:
- 分类
- 前端
tags:
- 显示在底部
---

## 安装MySQL
```sh
sudo apt-get –y install mysql-server mysql-client
sudo apt-get install mysql-server mysql-client
```
服务器环境为腾讯云Ubuntu 16.04.1 LTS，使用上面的命令安装mysql服务端与客户端。安装完成后会出现一个设置密码的界面，输入两次密码即完成了安装，然后使用 `netstat -anp` 命令，会发现 `3306` 端口正在被监听，即说明安装成功且已运行。

## 检查MySQL是否启动
```ps -ef | grep mysqld```
会看到类似结果说明正在运行：
```
mysql      519     1  0 17:44 ?        00:00:00 /usr/sbin/mysqld
```

## 开关MySQL
```sh
# 开启
sudo /etc/init.d/mysql start
# 关闭命令:
sudo /etc/init.d/mysql stop
# 重启
sudo /etc/init.d/mysql restart
```

## 命令行中连接数据库：
```sql
mysql -u root -p
```

## 退出数据库：
```
exit
```
## 建库/删库
CREATE DATABASE `yys` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
DROP DATABASE `yys`;

## 建表
```sql
CREATE TABLE IF NOT EXISTS `yuhun`(
`id` INT,
`position` VARCHAR(400),
`type` VARCHAR(400),
`v` VARCHAR(400) COMMENT '表注释',
`bs` VARCHAR(400) COMMENT '爆伤',
`bj` VARCHAR(400) COMMENT '表注释',
 PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## 增删改查
### where
```sql
SELECT * FROM Customers
WHERE CustomerID=1;
```

| Operator | 	Description |
| -- | -- |
| = | 	Equal |
| <> | 	Not equal. Note: In some versions of SQL this operator may be written as != |
| > | 	Greater than |
| < | 	Less than |
| >= | 	Greater than or equal |
| <= | 	Less than or equal |
| BETWEEN | 	Between an inclusive range |
| LIKE | 	Search for a pattern |
| IN | 	To specify multiple possible values for a column |

### update
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### delete
```sql
DELETE FROM table_name
WHERE condition;
```

### insert
```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

use demo
select zhuanye from runoob_tbl where id=1;
insert into pe (id,name) values (1,'前');

## 导入
先将数据处理成一定格式，比如将excel中的数据复制到文档中，这些数据每一行的字段间是被制表符\t分隔，行与行指间被换行符\r\n分隔。  
如果excel中的数据不是很复杂，没有复杂的文本，没有换行之类的字符，就可以直接保存，然后将保存的文件导入数据库。如果文本比较复杂，比如招公务员的岗位的excel的文本中就有很多换行符，这时需要自己处理一下，是整个文本以特定的字符代替\t\r\n来分隔文本，因为导入数据的时候，mysql会考\t\n之类的字符来划分数据。比如：  
```sql
load data local infile "~/yuhun.txt" into table yuhun  CHARACTER SET UTF8 fields terminated by "\t" lines terminated by "\n";
```
我将真正换行的地方替换成了&符号。  
向服务器上传文件
scp /Users/wangshushuo/Desktop/yuhun.txt ubuntu@58.87.109.73:~/yuhun.txt

[导入官方语法如下](https://dev.mysql.com/doc/refman/8.0/en/load-data.html):
```sql
LOAD DATA [LOW_PRIORITY | CONCURRENT] [LOCAL] INFILE 'file_name'
    [REPLACE | IGNORE]
    INTO TABLE tbl_name
    [PARTITION (partition_name [, partition_name] ...)]
    [CHARACTER SET charset_name]
    [{FIELDS | COLUMNS}
        [TERMINATED BY 'string']
        [[OPTIONALLY] ENCLOSED BY 'char']
        [ESCAPED BY 'char']
    ]
    [LINES
        [STARTING BY 'string']
        [TERMINATED BY 'string']
    ]
    [IGNORE number {LINES | ROWS}]
    [(col_name_or_user_var
        [, col_name_or_user_var] ...)]
    [SET col_name={expr | DEFAULT},
        [, col_name={expr | DEFAULT}] ...]
```
一个例子：
```sql
LOAD DATA INFILE 'file'
IGNORE INTO TABLE table
CHARACTER SET UTF8
FIELDS TERMINATED BY ';'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
```

## 远程连接新建一个帐号（帐号名不能为root）
如：添加一个用户名为db_user，密码为db_pass，授权为% （%表示所有外围IP能连接）对db_name数据库所有权限，命令如下
/# mysql -uroot -p
MySQL [(none)]> grant all privileges on db_name.* to db_user@’%’ identified by ‘db_pass’; #授权语句，特别注意有分号
MySQL [(none)]> flush privileges;
MySQL [(none)]> exit; #退出数据库控制台，特别注意有分号

