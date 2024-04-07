---
title: hugo常用格式
date: 2020-03-28T02:52:52+08:00
---
## 自定义shortcodes

<pre><code><span>{</span>{< tag nihao >}}</code></pre>

**效果**⬇️

{{< tag nihao >}}

{{< withTitle title ttt>}}

{{< number 1 >}} 与 #1# 在highlight

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
  var 新对象 = {}; #1#
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
![52区](/images/hugo01.jpg "外域52区" )[^1]
![52区](/images/linear-gradient-2.png "外域52区" )[^1]


## 脚注

维基百科的说明[^3]，脚注或称注脚（英语：footnote），用于：  
- 为条目正文补充注解（解释性加注）
- 标明被引用于正文或注解的数据源

例子：

**作者.书名.译者.出版地:出版者,出版时间**

Ilya Grigorik.Web性能权威指南.李松峰译.北京:人民邮电出版社，2014

**作者或网站名.文章名.[创作或更新时间]**

阮一峰.TCP 协议简介.[2017年6月8日]

[维基百科的列明来源](https://zh.wikipedia.org/wiki/Wikipedia:列明来源)介绍了脚注等说明性内容的用法。
> 凡是引用前人（包括作者自己过去）已发表的文献中的观点、数据和材料等，我们建议都要对它们在文中出现的地方予以标明，并在文末列出参考文献表。  
> 书籍：序号 主要责任者．题名: 其他题名信息[文献类型标志]．其他责任者．版本．出版地: 出版者, 出版年: 引文页码[引用日期]．国际标准书号（ISBN）．获取和访问路径。  
> 网页：作者，文章标题，网页地址，发表或更新日期。（网页语言）

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
[^3]: https://zh.wikipedia.org/wiki/Help:%E8%84%9A%E6%B3%A8

[a1]: https://wss.cool
