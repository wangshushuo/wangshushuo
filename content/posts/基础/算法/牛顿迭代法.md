---
title: "开平方"
url: "/Square root--dichotomy and Newton iteration.html"
author: 王书硕
date: 2020-04-03T11:36:01+08:00
lastmod : 2020-04-03T11:36:01+08:00
toc: true
description: 使用二分法或牛顿迭代法计算开平方
categories:
- 算法
---

计算开平方可以用二分查找来计算。
如：求根号10
```js
// 用二分查找，精度0.0001
function 二分开根号(x) {
  var start = 0, end = x,count=1;
  while (true) {
    var mid = start + (end - start) / 2;
    var sq = mid * mid;
    if (Math.abs(sq - x) < 1e-4) {
      console.info(mid,count);
      break;
    }
    if (sq < x) {
      start = mid;
    } else if (sq > x) {
      end = mid;
    } else {
      console.info(mid,count);
      break;
    }
    count++;
  }
}
二分开根号(10);
// 3.1622695922851562  18次循环
```

```js
// 用牛顿迭代，精度0.0001
function 牛顿开根号(a) {
  // n_ = (n+a/n)/2;
  var n = 1, count = 1;
  var n_ = (n + a / n) / 2;
  while (Math.abs(n - n_) > 1e-4) {
    n = n_;
    n_ = (n + a / n) / 2;
    count++;
  }
  console.log(n_, count)
}
牛顿开根号(10);
// 3.162277660168379   6次循环
```
# 牛顿迭代法适用条件
求函数f(x)=0的解α。  
必须满足如下条件才能用牛顿迭代法求方程的近似解。  
函数的导数不为0；x属于区间[α−r, α+r]；x0为α的近似值，即r>=|a-x0|;  
函数在[α−r, α+r]内二阶导数连续；  
x0足够接近根 α。  

[牛顿法的维基百科](https://zh.wikipedia.org/wiki/牛顿法)