---
title: Hugo主题的构成
url: /Hugo-Theme.html
date: 2022-08-21T13:24:30+08:00
description: Hugo-Theme，MemE
categories:
- hugo
tags:
- 显示在底部
keywords:
- aa
---

现在使用的主题 meme 的结构

## 博客详情页

文件为 `themes/meme/layouts/partials/pages/post.html`

此文件主要包含两部分：`article` 标签内为文章主题内容，各种 `partial`。

`partial` 有如下几个：
- 版权
- 更新日期徽章
- git信息
- 分享栏
- 相关文章
- tags
- minimal-footer
- minimal-footer-about
- 上下页导航
- 评论

这些 partial 的文件都在 `themes/meme/layouts/partials/components` 目录下。

## 网站首页
首页内容文件 `themes/meme/layouts/index.html`，可以通过配置展示不同类型的内容。
类型有：
- poetry（诗词）
- footage（电影胶片、素材）
- posts（几篇最近的文章）
- page（某种页面吧？）

`themes/meme/layouts/partials/pages/home-footage-posts.html`

## 分类

## 调试

可以将数据打印为 json 来调试数据

    {{ dict "title" .Title "content" .Plain | jsonify }}



