---
title: "workbox"
url: "/workbox"
toc: true
date: 2019-08-28T09:53:21+08:00
description: 利用workbox实现资源的预下载
categories:
- 前端
tags:
- api
keywords:
- service worker
- workbox
- 预下载
---
[官网](https://developers.google.com/web/tools/workbox/guides/get-started)

## 需求

1. 资源本地化：上课时课件的所有资源预先下载。
2. 绘本插件图片资源多，需要预先下载。

## 实现方案

workbox

## 使用

1. 安装 workbox
    ```
    npm install workbox-cli --global
    ```
1. 在项目目录下运行命令，进行 workbox 的配置，会生成一个配置文件 workbox-config.js
    ```
    cd ./a/b/project_path
    workbox wizard
    ```
1. 默认生成的 workbox 的依赖是 google 的 cdn ，国内无法访问，可通过配置改为使用本地依赖。在配置文件（workbox-config.js）中添加或修改为
    ```
    "importWorkboxFrom": "local",
    ```
1. 根据配置文件让 workbox 工作，会生成一些 service worker 相关的文件，入口是 sw.js 文件
    ```
    workbox generateSW workbox-config.js
    ```
1. 在项目入口的html文件（index.html）中引入 workbox 。
    ```js
    <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js');
      });
    }
    </script>
    ```

workbox 会遍历它的工作目录下的所有html文件，将html文件及其中依赖的图片、css和js文件全部加入一个列表中。当第一个页面载入后 workbox 开始工作，利用 service worker 的 api 预下载列表中的文件（缓存）。当访问其他网页或者没有网络/弱网时，就可以使用缓存工作。

通过 workbox 的配置，也可以通过 workbox 的 api 实现一个高级功能。

比如缓存的优先级的设置。资源可能会更新，当网络可用时，workbox 是使用缓存的资源还是请求网络上的资源，可以通过设置缓存的优先级策略来根据需要配置。