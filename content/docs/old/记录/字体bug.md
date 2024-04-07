---
title: 字体bug
date: 2019-03-05T05:16:17+00:00
---
一个bug——页面中的字体无缘无故的而变成了宋体，而且有区别，用electron打包的页面是宋体，用chrome浏览器打开的是**雅黑**或者**果方**。

由于span被设置了一个fontFamily只为雅黑，而苹果系统没有雅黑字体，所以它没有找父级元素继承字体，而是选择了浏览器的环境变量（设置）。

在mac的chrome的设置中，看字体。有标准、serif、sans-serif、宽度固定四种设置。在修改了 sans-serif 以后，原本只在electron中出现的宋体，也出现在了chrome中，由此推断，是这个设置的锅了。

electron也是一个浏览器环境，有一些配置项，发现 webPreferences 有如下配置：

此处设置为微软雅黑后，mac下表现就和chrome一致了。