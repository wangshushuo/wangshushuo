---
title: 部署svelte到cloudflare
date: 2023-08-15T10:53:11+08:00
categories:
- 前端
tags:
- 部署
keywords:
- svelte
- cloudflare pages
---

# 创建项目
```
npm create svelte@latest myapp
cd myapp
npm install
npm run dev
```

# 部署
将项目放到github上，代码push后就会自动运行pages部署。🚀

首先要修改svelte项目，安装 @sveltejs/adapter-cloudflare ，然受修改 svelte.config.js 文件
```js
import adapter from '@sveltejs/adapter-cloudflare';
 
export default {
  kit: {
    adapter: adapter({
      // See below for an explanation of these options
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    })
  }
};
```

cloudflare pages 创建新项目，选择github项目，选择框架是svelteKit。