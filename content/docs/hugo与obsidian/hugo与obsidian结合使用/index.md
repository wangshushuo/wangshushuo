---
title: hugo与obsidian结合使用
date: 2024-04-07 23:16:00
---
因为obsidian的发布功能收钱，找了几个替代方案都不大好用。就想着用hugo来发布，过程并不顺利，遇到了几个问题，在此记录一下。
## 如何使用

将 hugo 项目的 content 目录或下级目录作为 obsidian 的仓库。用 github 桌面端同步代码。不需要打开 hugo 项目，也不需要敲命令。

obsidian 正常写东西，需要同步就打开 github 。
## 图片问题

需要找到一种同时满足 obsidian 和 hugo 两边的方式处理图片。不然就会出现要么 obsidian 不显示图片要么 hugo 部署后不显示图片的情况。

hugo 有两种处理图片的方案：放在static目录下和文章目录下。

obsidian 也有两种方式：制定目录和文章目录下。

由于我们以content目录作为仓库，所以obsidian不知道有static目录，所以就选择在文章目录下放图片。

但是这会导致另一个问题——创建文章比较麻烦，hugo需要文章声明头信息，如果每次都手动改会有点烦。
### templater插件

我们通过tempalter插件解决上述问题。

首先文章根据是否有图片分为两类。有图片要用文件夹文章，然后创建index文件。

可以右键文件夹选择  `< % create...` 来创建index文件。

![](Pasted%20image%2020240407233129.png)

模版文件如下：

![](Pasted%20image%2020240407231943.png)

创建的效果：

![](Pasted%20image%2020240407233334.png)

## 总结

如上所述，就可以将 obsidian 内容发表为网站了。
