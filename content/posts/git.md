---
title: "Git"
url: "/Git"
toc: true
type: posts
date: 2019-07-18T10:53:36+08:00
lastmod: 2020-03-27T20:53:36+08:00 
author: 王书硕
summary: Git 常用操作，暂存，刷新远程分支列表，取消追踪，代理设置等。
categories:
- API操作手册
- 工具
---

## 攻略

### Git 原理入门

[阮一峰](http://www.ruanyifeng.com/blog/2018/10/git-internals.html)

### Git 分支管理策略

[阮一峰](http://www.ruanyifeng.com/blog/2012/07/git.html)

### Git 工作流程

[阮一峰](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)

### Git 使用规范流程

[阮一峰](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html)

## 删除本地的所有分支，除了master

```sh
git branch | grep -v "master" | xargs git branch -d
```

## 暂存改动

操作 | 代码 
:---:|:---:
暂存 | git stash
列表 | git stash list
取出 | git stash pop 1

## 刷新本地的远程分支列表

远程已经被删除的分支，在本地使用`git branch -a`命令是依然可以看到。所以需要刷新一下。

```sh
git remote prune origin
```

这条命令是删除与<name>关联的陈旧引用  

或者

```sh
git fetch -p
```

这条命令是在获取之前，删除远程不再存在的任何远程跟踪引用。

## 不相干分支强制pull或push等操作

在命令后面加`--allow-unrelated-histories`  

## 推送当前分支到远端

如果你还没有推到原点，那么`git push -u origin HEAD`可以在本地分支中设置上游跟踪信息。

## 使用一次新的commit，替代上一次提交

如果代码没有任何新变化，则用来改写上一次commit的提交信息

```
git commit --amend -m "666"
```

代码有变动，要制定文件

```
git commit --amend src\plugins\icElement_vote\components\config.vue src\plugins\icElement_chose\components\config.vue
  -m "fix(编辑器-选择题/投票题):删除不是当前选中的选项"
``` 

## 获取当前分支名

```
git symbolic-ref --short -q HEAD 
``` 

## 推送当前分支到远端，会在远端新建当前分支名的新分支

```
git push -u origin HEAD  
```

## 获取上一次commit的message

```
git log -1 --pretty=%B  
```

## 如果有文件没有被add，则git status时有提示

Changes not staged for commit:
有文件被add了：
Changes to be committed
上面两种可以同时存在。  

## 分支间摘 commit

分支A有5次提交，想把其中的第二三次提交拿到B分支，先拿到 commit 的 id 可通过 `git log -1 --pretty=%B` 取到。然后使用摘樱桃命令：

```
git cherry-pick 5cf6d24
```

分支B就把这次commit摘过来了。  

## 代理

全局设置
```
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```

全局取消
```
git config --global --unset http.proxy
git config --global --unset https.proxy
```

#只对github.com
```
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
```

#取消代理
```
git config --global --unset http.https://github.com.proxy
```

## 取消追踪

```
git rm -r --cached 文件或目录
```