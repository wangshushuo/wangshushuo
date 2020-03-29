---
author: 王书硕
date: 2020-03-28T02:52:52+08:00
lastmod : 2020-03-28T05:02:40+08:00
toc: true
url: "/hugo常用格式.html"
title: "hugo常用格式"
summary: "代说明的图片，reference，表格"
categories:
- API操作手册
- 工具
---

hello world

{{< tag nihao >}}

# 图片

下面引号内的文字是可以不加的，加了的话，会显示在图片下方，作为说明文字。

```
![alt](/images/xx.png "说明文字")
```

![52区](/images/hugo01.jpg "外域52区")

# 引用 reference

引用图片、网址等，在内容出标出。在文章最后列出所有引用。引用和标记可以互相跳转。

```
某文章[^1]说到某技术非常厉害

[^1]: https://github.com/wangshushuo/abc.html
```

某文章[^1]说到某技术非常厉害

# 分类

- API操作手册（简单的API操作的记录）
	- 前端
		- css
		- react
		- axios
	- 后端
		- java hashmap 使用
		- spring security
		- Spring mvc
		- Spring oauth2
	- 服务器
		- nginx
			- 静态网站
			- 反向代理
		- linux
			- 使用源码安装软件
			- ssh 登录，指定私钥文件（证书）
	- 工具
		- git
- 知识点（技术原理）
	- react
		- diff
		- 元素
		- virtual dom
		- hooks
		- 生命周期
	- nginx
		- 负载均衡
	- java
		- hashmap原理
- 折腾（需要若干步骤、若干知识点、若干API操作组合而解决问题）
	- 博客支持服务
	- gitlab的ci
- 心得与经验（经历了一些事情后的想法，总结规律，思考结果。思想活动）
	- 如何改bug
	- 老板评价员工的逻辑
	- 如何应付需求变动
	- 如何写出好的代码
	- 如何少加班
	- 面试时总是没什么聊的怎么办？

# 行内代码

这是一段代码 `a = b + c` 它是这样的。

---

[^1]: https://github.com/wangshushuo/abc.html