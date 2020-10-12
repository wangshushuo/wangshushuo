---
title: Windows中的换行符
url: /Windows中的换行符.html
date: 2020-10-12T17:12:27+08:00
description: 摘要，显示在meta的description中
categories:
- git
---

如果项目中设置的eslint，要求换行符是\n(LF)，那么在windows中打开项目的文件，编辑器/IDE可能会标红报错（eslint错误）。为了解决这个问题需要一些错误。

## 解决方法

1. 告诉 Git 在提交时把回车和换行转(CRLF)换成换行(LF)，检出时不转换
```bash
git config --global core.autocrlf input
```

2. 设置本地 Git 的换行符
```
git config --global core.eol lf
```

3. 设置编辑器/IDE将 CRLF 改成 LF 

## 原理

Git 默认的行为是，在藏库里只保存 LF 换行符，但是Windows系统的默认换行符是 CRLF 。在Windows系统中，Git 为了实现只保存 LF 换行符，在提交代码时，Git 会自动进行转化为 LF ，签出代码时自动转换回 CRLF 。

经过上面的三步操作，可以让 Git 不做这个自动转换，并且让新创建的换行符都时 LF 的。