---
title: AccessToken认证

date: 2020-04-22T23:11:20+08:00
summary: 使用 access token 为认证方式操作 gitlab、github 等远程 git 仓库，代替 ssh 公钥和用户名密码。
toc: false
categories:
- git
tags:
- api
---

## 用途

当我们操作远程 Git 仓库时，需要进行身份认证，一般有三种方式：

1.账号密码
: 每次输入账号密码，或由工具记住并帮忙自动填写

2.`ssh`
: 将本机的一个公钥设置到 `gitlab` 账户内

3.`access token`
: 在链接中加入 `token`

认证后进行 pull 或 push 等操作。下面说一下怎么在 gitlab 中使用 `access token` 进行认证。

## 使用方法📝

1. 点击「头像」，找到 「Setting」，再找到 ..AccessTokens..
1. 填写 "name" ，选择 `read_repository` `write_repository` 
1. 点按钮「Create」 ，在页面上方 *Your New Personal Access Token* 处生成了一个一次性的字符串，将它复制保存起来，刷新页面后它就消失，如果搞丢了只能再生成。
1. 这是一个使用 `access token` 的一般形势的链接：`http://oauth2:access-token@host.com/user/repo.git` ，将其中的 `access-token` 换成刚刚生成的那个。
1. 使用这个上面的链接去 `clone` 项目：`git clone http://oauth2:access-token@host.com/user/repo.git` 或者替换原来的 `remote url` ：
    ```
    git remote origin set-url http://oauth2:access-token@host.com/user/repo.git
    ```
1. 完成后 `push` `pull` `fetch` 操作都会使用这个链接
