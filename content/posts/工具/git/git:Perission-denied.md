---
title: Git:Perission-Denied
date: 2020-04-18T01:43:23+08:00
categories:
- git
---
## git:Perission denied
刚使用了一下vuecli的mocha测试插件，然后切换分支，又切换回那个分支，就报了这个错误。把运行vue测试的命令行（窗口）关掉就可以了。
![666][image1]

大概是由于vuecli的进程还在控制着tests文件，我之前没有关闭它。现在切换分支，要对这个tests文件夹操作，而windows不允许2个进程操作一个文件，所以只要关闭原来的那个命令行窗口也就关闭了原来的控制进程。再操作就可以了。