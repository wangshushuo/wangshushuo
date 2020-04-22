---
title: JavaScript
date: 2020-04-04T02:13:49+08:00
categories:
- JavaScript
tags:
- api
---

## 避免高频率调用
```js
function throttle(method, context) {
  if (method.tId) clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(context);
  }, 200);
}
```

## ES6新语法--扩展运算符（三个点）
### 第二个参数以及之后的任意多个参数都会被放到values数组中
```js
function a(arr, ...values){
  console.log(arr,values)
}

a(['a','b'],1,2,3);

// ["a", "b"]
// [1, 2, 3]
```

### 合并数组
```js
// ES5 的合并数组
arr1.concat(arr2, arr3);

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]

```

### 与解构赋值结合
```js
list = [111,222,333,444]

// ES5
a = list[0], rest = list.slice(1)
//a 111
//b [111,222,333,444]

// ES6
[a, ...rest] = list
//a 111
//b [111,222,333,444]
```

## js正则
制表符tab  \t  
换行符  \r  
汉字  \S  
任意 .  
小写字母 [a-z]  

## 数组排序
```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
```



## 数组的every方法
every方法可以中断循环
```js
contentList.every((content, index) => {
  if (element.id === content.id) {
    contentList.splice(index, 1);
    return false;
  }
  return true;
});
```

## 事件

```
// 取消默认行为：
e.preventDefault()
// 停止冒泡：
e.stopPropagation();  
```


## 将promise改装成await
将一个element UI库的confirm改装成await：这个confirm方法原来返回的是promise，resolve在try中return，reject在catch中return。

```ts
public async confirm_async(message: string, title: string) {
  try {
    return await this.vue.$confirm(message, title);
  } catch (error) {
    return undefined;
  }
}
```

调用confirm_async方法：

```ts
const isConfirm = await this.ed_showConfirm_async('xx','xx');
if(isConfirm === undefined) return;
```

这两个语句所在方法或函数，必须是一个async的函数或方法。这样就不需要把后续的操作都写在一个then方法中了。

## Array reduce，数组的reduce方法

```js
Object.keys(obj).reduce((memo, key) => {
    if (hooks.indexOf(key) > -1) {
      memo[key] = obj[key];
    }
    return memo;
  }, {});
```

## 严格模式

```
"use strict";
```

1. 禁止this关键字指向全局对象