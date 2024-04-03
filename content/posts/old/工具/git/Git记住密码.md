---
title: Git记住密码

date: 2020-05-25T17:34:13+08:00
summary: 如果操作远程仓库时每次都要输入账号密码，可以通过设置让git记住密码
categories:
- git
---

一、配置本地仓库

```
git config user.name "your_name"
git config user.email XXXX@gmail.com
```

二、记住密码

```
// 当前仓库
git config  credential.helper store
// 全局仓库
git config --global credential.helper store
```

push 代码 这一步输入的用户名密码会被记住,
下次再push代码时就不用输入用户名密码, 这一步会在用户目录下生成文件.git-credential记录用户名密码的信息。

> 创建 `.git-credential` 文件 并写入用户信息：用户名和密码