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

## 代码块内的高亮

Options:

`linenos`
: configure line numbers. Valid values are `true`, `false`, `table`, or `inline`. `false` will turn off line numbers if it’s configured to be on in site config. New in v0.60.0 `table` will give copy-and-paste friendly code blocks.

`hl_lines`
: lists a set of line numbers or line number ranges to be highlighted.

`linenostart=199`
: starts the line number count from 199.

<pre><code><span>{</span>{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" >}}
// ... code
<span>{</span>{< / highlight >}}
</code></pre>

**效果**

{{< highlight js "linenos=table,hl_lines=8 15-17,linenostart=1" >}}
function clone(旧对象) {
  var 新对象 = {};
  Object.keys(旧对象).forEach(key => {
    var value = 旧对象[key];
    if(is基本类型(value)) {
      新对象[key] = 旧对象[key];
    } else {
      clone(value)
    }
  })
  return 新对象;
}
{{< / highlight >}}

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

[维基百科的列明来源](https://zh.wikipedia.org/wiki/Wikipedia:列明来源)介绍了脚注等说明性内容的用法。
> 凡是引用前人（包括作者自己过去）已发表的文献中的观点、数据和材料等，我们建议都要对它们在文中出现的地方予以标明，并在文末列出参考文献表。

[中文参考文献规则](https://zh.wikipedia.org/wiki/文后参考文献著录规则#GB/T_7714-2005)

在词/句后或图片前加一个标记[^1]，其实是一个冒点，点击可追溯到页面地步的注脚定义。

```
某文章[^1]说到某技术非常厉害

[^1]: <https://github.com/wangshushuo/abc.html>
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