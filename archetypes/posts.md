---
title: {{ replace .Name "-" "-" | title }}
url: /{{ replace .Name "-" "-" | title }}.html
date: {{ .Date }}
summary: 摘要，显示在meta的description中
description: aaa
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---
