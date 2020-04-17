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
- api
- 工具
---
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

## 切换分支(branch)
想看React的代码，因为v16有些新特性，所以想看v15的代码。clone代码以后，使用 `git branch` 查看分支，发现只有 `master` ，但是看 github 上是有 15-stable 分支的。  
解决办法：使用 `git branch -a` 可以看到所有分支，包括远端的分支，其中有 `remotes/origin/15-stable` 分支，用这个名字切换分支即可。  

```sh
# 远程分支列表
git branch -r
# 所有分支列表（包括远程）
git branch -a 
# 分支列表
git branch
# 创建并切换到dev分支,
git checkout -b dev
# 上面的命令，等于下面的两条命令
# 创建分支
git branch dev 
# 切换分支
git checkout dev
```

## 分支合并
建议合并时保留目标分支的commit信息。即使用：
```sh
git merge --no-ff [branch name]
```
----
当合并错了以后怎么撤销合并呢，使用：
```sh
git reset --hard [merge的版本号] #版本号使用 git log 查，这种方法只针对合并以后对当前分支没有过其他操作，有的话比较复杂
```
----
合并远程分支：
```sh
# 如果本地没有远程分支：
git checkout -b develop origin/develop # 本地新建develop分支并拉取
# 如果本地已有远程分支：
git checkout develop 
git pull origin develop #拉取远程代码

# 方法二：
git fetch origin dev:temp #拉取远程dev分支，创建本地temp分支
git diff temp
git merge temp # 合并
git branch -d temp #删除
```
## 删除远程分支
```sh
git push origin -d [远程分支名]
git push origin :[远程分支名]
```
> git push origin :experimental  
           Find a ref that matches experimental in the origin repository (e.g.  refs/heads/experimental), and delete it.
					 
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

## 标签
将某次commit打上标签
`git tag <name ` 默认给最新提交打标签。  
`git tag` 查看所有标签
`git tag v0.9 f52c633` 根据commit id给某次提交打标签

## 在缓存中移除某个目录  
`git rm -r --cached some-directory`


## 攻略

Git 原理入门 <http://www.ruanyifeng.com/blog/2018/10/git-internals.html>

Git 分支管理策略 <http://www.ruanyifeng.com/blog/2012/07/git.html>

Git 工作流程 <http://www.ruanyifeng.com/blog/2015/12/git-workflow.html>

Git 使用规范流程 <http://www.ruanyifeng.com/blog/2015/08/git-use-process.html>
