---
author: 王书硕
date: 2020-03-28T02:52:52+08:00
lastmod : 2020-03-28T05:02:40+08:00
toc: true
url: "/hugo常用格式.html"
title: "hugo常用格式"
summary: "代说明的图片，reference，表格"
categories:
- 其他
---

## 自定义shortcodes

<pre><code><span>{</span>{< tag nihao >}}</code></pre>

**效果**⬇️

{{< tag nihao >}}

{{< withTitle title ttt>}}

{{< number 1 >}}

{{< img "/images/linear-gradient-2.png" alt caption 1 >}}


## 定义

定义一
: 说明文字

## 图片

下面引号内的文字是可以不加的，加了的话，会显示在图片下方，作为说明文字。

```
![alt](/images/xx.png "说明文字")
```

**效果**⬇️
![52区](/images/hugo01.jpg "外域52区")

## 脚注

在词/句后或图片前加一个标记[^1]，其实是一个冒点，点击可追溯到页面地步的注脚定义。

```
某文章[^1]说到某技术非常厉害

[^1]: https://github.com/wangshushuo/abc.html
```

**效果**⬇️

某文章[^1]说到某技术非常厉害

## 链接

**第一种：行内**

**效果**⬇️

```
[链接的文字](https://www.wss.cool)
```

[链接的文字](https://wss.cool)

**第二种：简写**

```
[链接的文字][a1]

[a1]: https://wss.cool
```

**效果**⬇️

[链接的文字][a1]

## 表格

```
操作 | 代码 
:---:|:---:
暂存 | git stash
列表 | git stash list
取出 | git stash pop 1
```
```
:---: 表示文字居中
:---  居左
---:  局右，
```

**效果**⬇️

操作 | 代码 
:---:|:---:
暂存 | git stash
列表 | git stash list
取出 | git stash pop 1

## 行内代码

这是一段代码 `a = b + c` 它是这样的。

---

[^1]: https://github.com/wangshushuo/abc.html

[a1]: https://wss.cool