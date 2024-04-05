---
title: 调试proxy对象
date: 2022-03-30T05:16:17+00:00
categories:
- 前端

---

当我们打了断点时，proxy对象的属性看到的都是`...`，很不方便。

这些对象都可以在console中打印出来。利用这一点，我们可以先将lodash引入到console中，利用_.cloneDeep方法，将proxy对象的属性克隆一份，然后再打印出来。

```
fetch('https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js')
    .then(response => response.text())
    .then(text => eval(text))
```

```
_.cloneDeep(this.queryOptions)
```