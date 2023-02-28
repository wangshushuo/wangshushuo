---
title: Git分支操作

date: 2020-05-25T17:30:46+08:00
summary: 常用的Git分支操作
categories:
- git
---

## 分支操作

### 删除本地的所有分支，除了master

```sh
git branch | grep -v "master" | xargs git branch -d
```

### 刷新本地的远程分支列表

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


### 切换分支(branch)
分支分为本地和远程两种，使用 `git branch` 查看分支，发现只有 `master` 也就是本地分支。  
查看远程分支可以使用 `git branch -a` 可以看到所有分支，包括远端的分支，使用远程分支名字 `remotes/origin/15-stable` 进行切换。  

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

### 删除远程分支
```sh
git push origin -d [远程分支名]
git push origin :[远程分支名]
```
> git push origin :experimental  
           Find a ref that matches experimental in the origin repository (e.g.  refs/heads/experimental), and delete it.
					 

### 获取当前分支名

```
git symbolic-ref --short -q HEAD 
``` 

### 获取当前分支从哪个分支签出
> 基于哪个分支拉的分支

下面的两个命令都可以获取到“父分支”，来自——[How to find the nearest parent of a Git branch?](https://stackoverflow.com/questions/3161204/how-to-find-the-nearest-parent-of-a-git-branch)

```sh
git show-branch \
| sed "s/].*//" \
| grep "\*" \
| grep -v "$(git rev-parse --abbrev-ref HEAD)" \
| head -n1 \
| sed "s/^.*\[//" 
```

```sh
git show-branch | grep '*' | grep -v "$(git rev-parse --abbrev-ref HEAD)" | head -n1 | sed 's/.*\[\(.*\)\].*/\1/' | sed 's/[\^~].*//'
```


### 推送当前分支到远端

如果你还没有推到原点，那么`git push -u origin HEAD`可以在本地分支中设置上游跟踪信息。

### 推送当前分支到远端，会在远端新建当前分支名的新分支

```
git push -u origin HEAD  
```

### 分支合并
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
