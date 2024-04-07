---
title: Npm与yarn
date: 2020-04-18T01:31:26+08:00
summary: 设置npm和yarn使用淘宝仓库，设置sass/electron快速下载地址。
categories:
- 前端
tags:
- api
---

## yarn

### 淘宝的镜像

```
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global

// 额外设置一些常用的库
yarn config set electron_mirror https://npm.taobao.org/mirrors/electron/ -g
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/ -g
yarn config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/ -g
yarn config set chromedriver_cdnurl https://cdn.npm.taobao.org/dist/chromedriver -g
yarn config set operadriver_cdnurl https://cdn.npm.taobao.org/dist/operadriver -g
yarn config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents -g
```

## npm

```
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist

npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
npm config set phantomjs_cdnurl https://npm.taobao.org/mirrors/phantomjs/
```

### npm设置代理

```
npm config set proxy http://127.0.0.1:1080
```