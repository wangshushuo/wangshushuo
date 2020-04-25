---
title: AccessToken访问远程Gitlab(Github)
url: /access-token-git-remote-repository-github-gitlab.html
date: 2020-04-22T23:11:20+08:00
summary: 使用 access token 为认证方式操作 gitlab、github 等远程 git 仓库，代替 ssh 公钥和用户名密码。
toc: false
categories:
- git
tags:
- api
---

## 使用方法📝

1. 点击头像👮‍♀️，找到 「Setting」，再找到 ..AccessTokens..
1. 填写 "name" ，选择 `read_repository` `write_repository` 
1. 点按钮「Create」 ，在页面上方 *Your New Personal Access Token* 处生成了一个一次性的字符串，将它复制保存起来，刷新页面后它就消失，如果搞丢了只能再生成。
1. 这是一个使用 `access token` 的一般形势的链接：`http://oauth2:access-token@host.com/user/repo.git` ，将其中的 `access-token` 换成刚刚生成的那个。
1. 使用这个上面的链接去 `clone` 项目：`git clone http://oauth2:access-token@host.com/user/repo.git` 或者替换原来的 `remote url` ：
    ```
    git remote origin set-url http://oauth2:access-token@host.com/user/repo.git
    ```
1. 完成后 `push` `pull` `fetch` 操作都会使用这个链接

## 认证方式🔐
我用到过三种认证方式
- 账号密码：每次输入账号密码，或由工具记住并帮忙自动填写
- `ssh` 公钥：将本机的一个公钥设置到 `gitlab` 账户内
- `access token` ：在链接中加入 `token`
