---
title: Git常用操作
date: 2019-07-18T10:53:36+08:00 
author: 王书硕
summary: Git 常用操作，暂存，刷新远程分支列表，取消追踪，代理设置等。
categories:
- git
tags:
- api
---

## 标签
将某次commit打上标签
`git tag <name ` 默认给最新提交打标签。  
`git tag` 查看所有标签
`git tag v0.9 f52c633` 根据commit id给某次提交打标签


## 暂存改动

操作 | 代码 
:---:|:---:
暂存 | git stash
列表 | git stash list
取出 | git stash pop 1

## 获取上一次commit的message

```
git log -1 --pretty=%B  
```

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


## 分支间摘 commit

分支A有5次提交，想把其中的第二三次提交拿到B分支，先拿到 commit 的 id 可通过 `git log -1 --pretty=%B` 取到。然后使用摘樱桃命令：

```
git cherry-pick 5cf6d24
```

分支B就把这次commit摘过来了。  



## 取消追踪

```
git rm -r --cached 文件或目录
```

## 在缓存中移除某个目录  
`git rm -r --cached some-directory`


## 查看记录log
`git log` 这样会打印出超级多的信息，包括SHA-1、作者、时间、message,很啰嗦，还是不要这么用得好。  
`git log --pretty=format:"%h - %an, %ar : %s"` 按格式打印信息，具体选项如下    
git log --graph
git log --graph --oneline --decorate

|  选项 | 说明 |
| ----- | --- |
| %H |	提交对象（commit）的完整哈希字串 |
| %h | 提交对象的简短哈希字串 |
| %T | 树对象（tree）的完整哈希字串 |
| %t | 树对象的简短哈希字串 |
| %P | 父对象（parent）的完整哈希字串
| %p | 父对象的简短哈希字串 |
| %an | 	作者（author）的名字 |
| %ae	|作者的电子邮件地址 |
| %ad | 	作者修订日期（可以用 -date= 选项定制格式） |
| %ar	|作者修订日期，按多久以前的方式显示 |
| %cn	|提交者(committer)的名字 |
| %ce	|提交者的电子邮件地址 |
| %cd	|提交日期 |
| %cr	|提交日期，按多久以前的方式显示 |
| %s	|提交说明 |  

`git log -2 --oneline` 打印最近两次的简化后的记录，其中`--oneline`为	`--pretty=oneline --abbrev-commit` 命令的简化用法。`-n`为最近n次的提交。  
`git log --since=2.weeks` 打印2周内的记录，具体选项如下  

| 选项	| 说明 |
| -- | -- |
| -(n)	| 仅显示最近的 n 条提交| 
| --since, --after	| 仅显示指定时间之后的提交。| 
| --until, --before	| 仅显示指定时间之前的提交。| 
| --author	| 仅显示指定作者相关的提交。| 
| --committer	| 仅显示指定提交者相关的提交。| 

`git log --pretty="%h - %s" --author=wss --since="2008-10-01" --before="2008-11-01"` 各种条件可以一起用  
`git log -p -2` 查看最近两次提交，并显示提交内容（具体改动了什么）



## 攻略

Git 原理入门 <http://www.ruanyifeng.com/blog/2018/10/git-internals.html>

Git 分支管理策略 <http://www.ruanyifeng.com/blog/2012/07/git.html>

Git 工作流程 <http://www.ruanyifeng.com/blog/2015/12/git-workflow.html>

Git 使用规范流程 <http://www.ruanyifeng.com/blog/2015/08/git-use-process.html>
