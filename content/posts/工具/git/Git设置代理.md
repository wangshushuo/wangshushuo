---
title: Git设置代理

date: 2020-05-25T17:32:50+08:00
summary: 设置git的代理
categories:
- git
---

全局设置
```
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```

全局取消
```
git config --global --unset http.proxy
git config --global --unset https.proxy
```

只对github.com
```
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
```

取消代理
```
git config --global --unset http.https://github.com.proxy
```

## 配置文件
windows：
在 ~/.gitconfig文件中
```
[http "https://github.com"]
  proxy = socks5://127.0.0.1:10808
```