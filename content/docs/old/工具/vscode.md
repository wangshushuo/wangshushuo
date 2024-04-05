---
author: 王书硕
date: 2020-03-28T05:02:40+08:00
lastmod : 2020-03-28T05:02:40+08:00
toc: true

title: "vscode"
summary: ""
categories:
- IDE
---

## Git自动刷新

git 插件会不停的刷新文件的状态，间隔大概5秒。可以在设置中关掉它。

```
Autorefresh
是否启用自动刷新。
```

## debugger for chrome

当使用parcel时，实际引用js文件会带有hash，而编辑器中的文件没有hash，导致插件认为js文件没有被挂载，断点也就无效了。  
按照如下调整launch.json，可解决此问题。

```json
"sourceMapPathOverrides": {
	"../*": "${webRoot}/*"
}
```