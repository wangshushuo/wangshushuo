---
title: NVM阿里源
url: /NVM阿里源.html
date: 2020-11-07T22:57:53+08:00
description: 为NVM设置阿里源下载nodejs
categories:
- 前端
tags:
- nvm
keywords:
- 下载
---

修改NVM下载nodejs的地址，设置环境变量。

命令行是`bash`
```sh
echo -e "\nexport NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node" >> ~/.bashrc 
source ~/.bashrc
```

命令行是`zsh`
```sh
echo -e "\nexport NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node" >> ~/.zshrc 
source ~/.zshrc
```
