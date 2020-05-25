---
title: Mysql增删改查
url: /Mysql增删改查.html
date: 2020-05-25T17:47:39+08:00
categories:
- 后端
tags:
- api
---


## create
```sql
INSERT INTO tasks(subject,start_date,end_date,description)
VALUES('Learn MySQL INSERT','2017-07-21','2017-07-22','Start learning..');
```

[image1]:/images/mysql-1.png

## read 左右链接

```sql
SELECT
    plugin_of_user.id, plugin_of_user.user_plugin_name,
    plugin_info.name, plugin_info.avatar, plugin_info.link, plugin_info.type
FROM plugin_of_user
RIGHT JOIN plugin_info
ON plugin_of_user.plugin_id=plugin_info.id
WHERE plugin_of_user.user_id = ?
```
## update

```sql
UPDATE [LOW_PRIORITY] [IGNORE] table_name 
SET 
    column_name1 = expr1,
    column_name2 = expr2,
    ...
WHERE
    condition;
```

### 无则添加，有则修改

```sql
insert into student
  (number, name) 
values
  (45,‘张三’)
ON DUPLICATE KEY UPDATE 
number = 46, name = ‘李四’;
```

## delete
```sql
DELETE FROM table_name
WHERE condition;
```
