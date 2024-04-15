---
title: shadcn问题
date: 2024-04-13 00:08
---
启动项目时，报错 border-border 这个class找不到

[解决方法](https://github.com/shadcn-ui/ui/issues/214#issuecomment-1784191368) 

因为 同时存在 tailwind.config.ts 和 tailwind.config.js 文件，将 js 文件删除即可。