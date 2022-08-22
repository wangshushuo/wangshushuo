---
title: React与Mobx的MVP和单元测试
url: /React与Mobx的MVP和单元测试.html
date: 2020-08-14T09:35:25+08:00
description: 摘要，显示在meta的description中
categories:
- react
---

我比较熟悉Redux，所以以Redux与Mobx作为类比我会比较容易理解。

redux会有一个store与react组件配合。

store中定义变量、状态，写修改变量的reducer及相应的action。

react组件中调用变量，使用dispatch调用action修改变量，完成单向数据流。

reducer有两种写法——是否包含业务逻辑，这里选择不包含业务逻辑，就只是修改数据。业务逻辑全部放在react中。

以上是一个普通的redux+react的用法。

把它改为MVP模式的话，其实只是把业务逻辑和组件状态都从react组件中抽离出来，放在一个Presenter中。让react组件只接受数据和调用方法。

redux可以换成mobx。

在mobx的store中，它可以作为MVP中的M。还是声明变量、定义action，作用与redux一样。

## 声明变量

如果使用observable声明的话，