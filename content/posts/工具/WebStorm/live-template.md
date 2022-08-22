---
title: live-template
url: /live-template.html
date: 2020-08-19T10:23:09+08:00
description: live-template(code snippet) 就是输入abc后，编辑器提示出一个菜单，选择后可以输入一段代码
categories:
- WebStorm
---

[官网文档](https://blog.jetbrains.com/webstorm/2018/01/using-and-creating-code-snippets/)

这个功能在 webstorm 中叫做 live template 。就是将一段代码变成模版，就像打出 `log` 就会出现下来菜单提示 `console.log` 一样。 live template 可以实现复杂一点的事情，比如在模版内部定义变量，可以在初始时快速编辑它们。

1. 首先准备好一段代码，下面是创建一个 React 组件，我们要把它变成一个模版，以后可以快速的创建组件。

```jsx
import React from 'react';

export default function Keyword() {
  return (
    <div>

    </div>
  )
}
```

2. 将代码全选后，打开 actions 面板[^1]，输入 `save as live template` ，就可以打开一个操作面板了。
![20201109221701_3ea50a1759e3609e284c85ec2bd99894.png](https://hugo-1256216240.cos.ap-chengdu.myqcloud.com/20201109221701_3ea50a1759e3609e284c85ec2bd99894.png "save as live template")
- {{< number 1 >}} 在 user 目录下出现了一个新的条目，它就是刚刚那段代码
- {{< number 2 >}} 唤醒模板的关键词，比如 `log`
- {{< number 3 >}} 可以在模板中设置变量。在代码中定义变量，在按钮中给变量设置值，比如文件名、不带扩展名的文件名等等。
- {{< number 4 >}} 多个变量之间可以用 `tab` 快速切换光标到下一个， `$END$` 代表最后一个 

3. 点击 ok 保存设置
4. 尝试一下吧，可以把刚才的代码删掉，输入 `imfc` 看看效果。

## 例子
打开设置，选择Editor > Live Templates，点右侧 + ，选 1

```ts
const [$NAME$, set$SETNAME$] = useState($END$)
```

![20210509210549_8d772096ee68ed7f6805b3559bb76c95.png](https://hugo-1256216240.cos.ap-chengdu.myqcloud.com/20210509210549_8d772096ee68ed7f6805b3559bb76c95.png)

变量间可以互相引用，可以通过表达式进行一些自动变化，如果通过表达式计算出了值，还可以跳过用户输入。

## 变量

camelCase 将所有字母变为驼峰，会忽略掉其中的 - _ 等符号，只保留字母

fileNameWithoutExtension 取文件名，且不带扩展名

capitalize 将首字母大写

[^1]: 有两种方法：a. mac 快捷键：`shift+cmd+a` （可能与系统的快捷键冲突，需要修改一下系统快捷键）；b. 可以通过连按（2次） `shift` 呼出搜索面板，在切换到 action 标签。