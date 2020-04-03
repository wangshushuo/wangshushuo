---
title: "vim"
url: "/vim.html"
author: 王书硕
date: 2020-04-01T21:27:14+08:00
lastmod : 2020-04-01T21:27:14+08:00
toc: true
summary: vim常用操作，替换、缩紧等
categories:
- api
- 工具
---

## 替换

{{< withTitle abbnbnbn buiiuiuiu >}}
```
:[range]s/search/replace/optioins {{< number 1 >}}
:%s/aa/bb/g {{< number 2 >}}
:%s/aa/bb/gc {{< number 3 >}}
```
- {{< number 1 >}} range表示搜索的范围， `:8,10 s/` 表示第8-10行，`:%s/` 表示全文。
- {{< number 2 >}} `g` 是一个option(global)，表示要替换所有匹配项，不加它的话只会替换第一个匹配项。
- {{< number 3 >}} `c` 是一个option(confirm)，表示替换前需要确认。

### confirm

加了confirm选项后，替换时会出现这样的提示，需要你回复。

```
replace with foo (y/n/a/q/l/^E/^Y)?
```

回复 | 作用 
:---:|:---
y | yes
n | no
a | go ahead，替换所有
q | quit 取消、退出操作
l | 替换当前这个，然后退出操作
^E/^Y | scroll the text using Ctrl-e and Ctrl-y

## 配置

```
set nocompatible 
set number
set relativenumber
set cursorline
set wrap
set laststatus=2
set ruler

syntax on
set showmode
set showcmd

set shiftwidth=4
set tabstop=2
set expandtab
set softtabstop=2
```
依次：不兼容vi，显示行号，行号是相对当前行的，光标所在的当前行高亮，换行，显示状态栏，状态栏中显示光标的位置，语法高亮开启，模式，指令，`>><<==` 操作的空格数，tab键的空格数，缩紧使用空格，tab等于几个空格

## 缩紧

在文本上按下>>（增加一级缩进）、<<（取消一级缩进）或者==（取消全部缩进）时，每一级的字符数。

## reference

- 搜索与替换：<https://www.linux.com/training-tutorials/vim-tips-basics-search-and-replace/>
- 配置：<http://vim.spf13.com/>
- 攻略1：<https://github.com/vim-china/hello-vim>
- 攻略2：<https://github.com/oldratlee/vim-practice>
- 攻略3：<https://github.com/wsdjeg/vim-galore-zh_cn>
- 阮一峰：<https://www.ruanyifeng.com/blog/2018/09/vimrc.html>