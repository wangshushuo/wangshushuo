---
title: 为博客打造在线编辑器
date: 2019-06-23T21:12:32+08:00
---

## 初衷

博客的内容时使用git管理的。在公司的电脑和家里的两台电脑上都有写博客的需求，那么在3个端的每次的pull和push就显得有一点麻烦。如果有一个基于浏览器访问的编辑器就舒服多了。

## 构思
我的博客使用了hugo，它的内容是基于markdown或html的，所以如果把博客源文件放在服务器上，同时搭建一个可以编辑这些源文件的后台，就可以实现基于浏览器编辑博客了。

vscode开源了他们的编辑器monaco-editor，可以使用它作为浏览器中的编辑器。

在搭建一个后台程序来读取博客文章内容，配合若干接口实现保存、创建、删除、登录等功能即可。

## editor项目

此项目作为后台服务，需要提供的接口有：
1. 创建文章
1. 保存文章
1. 提交到git并push到仓库，并打包发布。

准备使用golang实现。需要用到的golang的api有：
……


### 制作image

```
sudo docker image build -t myeditor .
```
### 启动容器

```
sudo docker container run -d  --rm -p 3000:3000 -v "/home/wang/code/hugo/content/posts":/app/blog myeditor
```

## hugo项目中的docker

### 生成image

```
sudo docker image build -t site .
```

### 启动nginx容器

```
sudo docker container run --rm --name myblog \
-p 80:80 -p 443:443 -d \
--volume "$PWD/public":/usr/share/nginx/html site
```

### 打包hugo

```
hugo --baseURL https://wowfriday.cn/
```

```
hugo serve --renderToDisk --baseURL https://wowfriday.cn/ --appendPort=false
hugo serve --renderToDisk --appendPort=false
```