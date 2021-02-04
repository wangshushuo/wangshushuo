---
title: Cli工具--Gg
url: /Cli工具--Gg.html
date: 2021-02-04T18:49:54+08:00
---
使用了这几个库
- github.com/atotto/clipboard
- github.com/urfave/cli/v2

`gg r`快速的往gitlab提一个 merge request 。
- bufio.NewReader 读取用户输入
- go exec 执行命令
- 读取当前git分支名算法
- 剪贴板操作