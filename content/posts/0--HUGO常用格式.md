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

## 自定义shortcodes

<pre><code><span>{</span>{< tag nihao >}}</code></pre>

**效果**⬇️

{{< tag nihao >}}

## 图片

下面引号内的文字是可以不加的，加了的话，会显示在图片下方，作为说明文字。

```
![alt](/images/xx.png "说明文字")
```

**效果**⬇️
![52区](/images/hugo01.jpg "外域52区")

## 引用 reference

引用图片、网址等，在内容出标出。在文章最后列出所有引用。引用和标记可以互相跳转。

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

## 行内代码

这是一段代码 `a = b + c` 它是这样的。

---

[^1]: https://github.com/wangshushuo/abc.html

[a1]: https://wss.cool