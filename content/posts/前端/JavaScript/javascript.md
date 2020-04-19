---
title: JavaScript
date: 2020-04-04T02:13:49+08:00
categories:
- JavaScript
tags:
- api
---

# 上传图片时，怎么拿到图片的src地址？
input选中图片以后，只是得到了file对象，如果想在img中显示该图片的话，并不知道src，所以想得到src还需要额外的操作。
```javascript
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
```

# JS操作样式class
```js
document.body.classList.add("c");
document.body.classList.toggle("a");
document.body.classList.remove("c");
document.body.classList.contains("c");    // false 因为"c"上面remove掉了
document.body.classList.toString() === document.body.className;
```

# 避免高频率调用
```js
function throttle(method, context) {
  if (method.tId) clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(context);
  }, 200);
}
```

# ES6新语法--扩展运算符（三个点）
## 第二个参数以及之后的任意多个参数都会被放到values数组中
```js
function a(arr, ...values){
  console.log(arr,values)
}

a(['a','b'],1,2,3);

// ["a", "b"]
// [1, 2, 3]
```

## 合并数组
```js
// ES5 的合并数组
arr1.concat(arr2, arr3);

// ES6 的合并数组
[...arr1, ...arr2, ...arr3]

```

## 与解构赋值结合
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
