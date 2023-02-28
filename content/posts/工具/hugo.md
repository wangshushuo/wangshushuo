---
title: Hugo
toc: true
date: 2019-10-10T14:15:23+08:00
summary: 改造hugo主题，修改hugo主题，显示、控制hugo分类和hugo摘要
categories:
- hugo
---

这个博客是使用hugo搭建的，选择来一个大体喜欢的主题。但是有一些细节还是不够满意，所以如何改造hugo主题，加上自己想要的内容，就成了一个值得研究的问题。

## Sections

content目录下的各个一级子目录就是一个section，它们是first-level的section，可以为它们定义layout组织内容，并通过url来访问（默认就是目录）。

一级子目录下也可有任意深度的子目录，只要子目录中定义_index.md就可以作为一个section。

section除了可以通过以目录层级为url访问，还可以获得到属于它的子文章列表。

## 分类法（Taxonomies）

我想解决的第一个问题就是文章的分类，因为一个单纯的列表看上去可能有点散乱。观察创建文章的可选参数，以及其他博客。可以确定hugo是支持分类的。在官网文档中的Content Management下有Taxonomies，阅读内容后可以确定，这就是我想找的东西。

在hugo中，用“Taxonomies”这个术语表示“文章的分类”。相关的有三个概念：
- Taxonomy -> 一个分类
- Term -> 一个分类的项目
- Value -> 一个项目的值

比如：
```
Year                <- Taxonomy
    2018              <- Term
        前端入门          <- Value
        Vue入门          <- Value
        React入门        <- Value
    2019              <- Term
        前端进阶          <- Value
        vue进阶           <- Value
        react进阶         <- Value
categories         <- Taxonomy
    css              <- Term
        flex布局          <- Value
        css module       <- Value
        background渐变色  <- Value
    框架              <- Term
        Vue入门           <- Value
        React入门         <- Value
        vue进阶           <- Value
        react进阶         <- Value
```

这里的“value”对应的都是文章的题目，“term”对应一个分类中具体有哪些项，“taxonomy”则是我们预先定义好的分类的名字。

这些需要通过站点配置和文章首部信息才可以实现。

在“站点配置”中设置有哪些Taxonomy，在“文章首部”标记该文章是哪个Taxonomy中的哪种Term

### 站点配置

站点配置文件一般位于博客根目录中，叫做“config.toml”，在其中加上下面这段代码

```
[taxonomies]
  category = "categories"
  year = "year"
```

### 文章首部

创建每个文章时，都会有一些首部信息配置，现在这篇文章的首部信息如下：

```yml
---
title: "Hugo"

toc: true
date: 2019-10-10T14:15:23+08:00
author: 王书硕
description: 了解hugo，将它改造成你想要的样子。
categories:
  - 工具
year:
  - 2019
---
```

其中最下面的两项——“categories”和“year”——就是上面提到的“Taxonomy”，“工具”和“2019”则是“Term”，而这篇文章就是“value”了。

准备好了这些配置以后，

……两种方式展示分类，一种是在一个特定的页面，一种是在其他地方。两种方式引用题目的方法不同。

### 展示分类

第一种展示方式是在`layouts/_default/terms.html`中，如下面的代码即可展示一种terms。通过访问地址`localhost:1313/categories/`或`localhost:1313/year/`即可查看到该页面。

```html
{{ define "main" }}
<main id="main">
  <h1>{{ .Title }}</h1>
  <ul>
    {{ range .Data.Terms.ByCount  }}
    <li>
      <a href="{{ .Page.RelPermalink }}">{{ printf "%s" .Page.Title }}</a>
      <span>{{ printf "(%d)" .Count }}</span>
    </li>
    {{ end }}
  </ul>
</main>
{{ end }}
```

第二种展示方式是任意一个页面，比如主页`layouts/index.html`模板中，通过`Site`变量引用分类数据。同样的其中的`categories`也可以替换成定义好的其他terms。

```html
<ul>
  {{ range .Site.Taxonomies.categories }}
  <li><a href="{{ .Page.Permalink }}">{{ .Page.Title }}</a> {{ .Count }}</li>
  {{ end }}
</ul>
```

排序

按字母排序
```html
<ul>
    {{ range .Data.Terms.Alphabetical }}
            <li><a href="{{ .Page.Permalink }}">{{ .Page.Title }}</a> {{ .Count }}</li>
    {{ end }}
</ul>
```

按数量排序
```html
<ul>
    {{ range .Data.Terms.ByCount }}
            <li><a href="{{ .Page.Permalink }}">{{ .Page.Title }}</a> {{ .Count }}</li>
    {{ end }}
</ul>
```


……有了这些还不够还需要term页面

……综上……实现了分类……

## SEO

robots.txt

setmap.xml

google search console

head模版

## 摘要（summary）

摘要最重要的一个用处是生成head中的description标签（这个是主题的head.html部分定义的，可以修改成其他内容），搜索引擎会将其中的内容展示在搜索结果中。（搜索结果中也可能不显示摘要，而现实搜索引擎自己生成的内容）

```html
<meta name="description" content="测试一哈">
```

另一个用处是用来在文章列表中展示，比如在网站首页展示10篇最近的文章，并显示其摘要。

两种方式可以定义一篇文章的摘要：在首部定义summary变量、在文章中使用摘要分隔符<code>&lt;!--more--&gt;</code>。后者权重更高。

当文章开头的几行可以准确的概括文章包含内容时，摘要分隔符<code>&lt;!--more--&gt;</code>比较适用。不然的话，就自己编辑一段摘要放在首部的summary变量中。

另外可以在网站配置中使用`summaryLength`控制摘要的字符长度，但是对中文貌似不起作用。

## 函数

[文档](https://gohugo.io/functions/)

遍历集合用`range`

```
<ul>
  {{ range .Site.Taxonomies.categories }}
    <li style="text-align:left;"><a href="{{ .Page.Permalink }}">{{ .Page.Title }}</a> {{ .Count }}</li>
  {{ end }}
</ul>
```

对集合进行排序用`sort`，相较上面的代码，其中`count`是用哪个字段进行排序，`desc`表示降序

```
<ul>
  {{ range sort .Site.Taxonomies.categories "Count" "desc" }}
    <li style="text-align:left;"><a href="{{ .Page.Permalink }}">{{ .Page.Title }}</a> {{ .Count }}</li>
  {{ end }}
</ul>
```

## 多语言模式

hugo可以管理多种语言，但是要自己翻译内容

[配置多种语言](https://gohugo.io/content-management/multilingual/)
[翻译内容](https://regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/)


