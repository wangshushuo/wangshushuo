---
title: Changelist更新时间长
url: /changelist-git-ignore.html
date: 2021-01-15T10:45:56+08:00
description: 有时changelist会进行长时间的updating并占用大量cpu，这里会解决这个问题
categories:
- 效率
---

## 问题
当发生切换分支等操作时，webstorm的commit窗口中的changelist会进行updating，正常情况下它应该执行的很快，甚至察觉不到，但是不知道什么情况下updating会长时间不结束并占用大量cpu。

当发生了异常情况时，打开任务管理器，可以看到，这时webstorm是在运行一个git命令
```
git -c credential.helper= -c core.quotepath=false -c log.showSignature=false status --ignored --porcelain -z --
```
可以理解为是在运行`git status --ignored`，它就会扫描 node_module 等已经设置为忽略的文件，而它们有层次很深，文件很多，就会导致git占用大量cpu进行计算。可能会让webstorm变卡、电脑变卡。

## 解决方法

可以通过修改webstorm的注册表，让它不扫描忽略文件。

1. 打开注册表
    - 菜单中 Help | Find action..., 输入`Registry...`

2. 找到`git.process.ignored`
    - 在注册表界面可以直接输入`git.process.ignored`进行搜索
    - 取消它的勾选就可以了
![20210115110317_7eebc60a6f46b7076eddc44f64d02287.png](https://hugo-1256216240.cos.ap-chengdu.myqcloud.com/20210115110317_7eebc60a6f46b7076eddc44f64d02287.png)

这样updating的时候，就不会扫描忽略文件了，就很快了。