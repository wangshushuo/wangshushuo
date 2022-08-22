---
title: CSS命名
date: 2019-03-27T05:08:59+00:00
categories:
- 前端
- CSS
keywords:
- classname
- css
- module
---

使用less和css module。在A和B两个less文件中分别写如下的样式。

```
.textfillsContainer{
  background-color:red;
  .textfills{
      background-color:red;
  }
}
```

A文件：
![A文件](/images/css_class_name/image-9.png "A文件")
B文件：
![B文件](/images/css_class_name/image-8.png "B文件")

在编译打包后的文件中观察：

A文件打包出来的css代码：
![B文件](/images/css_class_name/image-6.png "A文件的实际css代码")

B文件打包出来的css代码：
![B文件](/images/css_class_name/image-7.png "B文件的实际css代码")

可以看到，即使是相同的class名，由于less或者css module的作用，会视文件为一个模块，在打包时，根据模块对class名做混淆哈希。

所以只要不在一个文件（模块）中使用相同class名就能避免命名冲突。