---
date: 2019-10-23T06:56:30+08:00
title: JavaScript语言精华
summary: 我相信我精雕细琢出来的优雅子集大大地优于这门语言的整体，它更可靠、更易读、更易于维护。
categories:
- 前端
---

## 精华

我相信我精雕细琢出来的优雅子集大大地优于这门语言的整体，它更可靠、更易读、更易于维护。

浏览器API和DOM相当糟糕，连累了JavaScript。写一本DOM的精华的书是一项不可能完成的任务。

JavaScript中优秀的想法包括函数、弱类型、动态对象和富有变现力的对象字面量表示法。糟粕的想法包括基于全局变量的编程模型。

## 对象

JavaScript包含一种原型链的特性，允许对象继承另一个对象的属性。

### 原型

每个对象都连接到一个原型对象，并可以从中继承属性。对象字面量创建的对象都连接到Object.prototype，它是JavaScript中过的标配对象。

## 函数

### 函数对象

函数也是对象，对象字面量创建的对象连接到Object.prototype，函数对象连接到Function.prototype，而它又连接到Object.prototype

### 函数字面量

通过函数字面量创建的函数对象包含一个连到外部上下文的连接。这被称为闭包（closure）。

### 调用

除了声明时定义的形式参数，每个函数还接收两个附加的参数：this和arguments。

this的值取决于调用的模式。有4中调用模式：方法、函数、构造器、apply。

#### 方法调用模式

函数被作为一个对象的属性，就教方法。此时this为该对象。

#### 函数调用模式

函数没有作为对象的属性，他就被当作一个函数调用了。此模式this被绑定到全局变量。

如果在一个方法内，又定义了一个函数，而这个函数中使用了this，那么这个this就是指向的全局变量。这是一个语言设计错误，正确的设计应该是指向方法中的this。有一个容易的解决方案：将方法中的一个变量赋值为this，函数中访问变量即可。

```js
myObject.double = function(){
  var that = this;
  var helper = function(){
    that.value = add(that.value, that.value)
  }
  helper();
}
```

`helper` 函数中如果使用 `this` 这个 `this` 就是指向全局变量。

#### 构造器调用模式

JavaScript是一门基于**原型**继承的语言，这意味这一个对象可以从另一个对象继承属性。该语言是无类型的。（es6呢？）

用 `new` 调用一个函数，会创建一个连接到该函数的 `prototype` 成员的新对象，同时将 `this` 绑定到那个新对象上。这就是构造器调用。

#### Apply调用模式

因为JavaScript是一门函数式的面向对象语言，所以函数可以拥有方法。

apply 方法接受2个参数，绑定的 this ，和参数数组。

```js
var array = [2, 4];
var sum  = add.apply(null, array);
```

### 闭包

一个函数可以访问它被创建时的上下文环境就叫闭包。

```js
var myObject = (function(){
  var value = 0;
  return {
    increment: function(inc){
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function(){
      return value;
    }
  }
})()
```

`incerment` 和 `getValue` 两个函数被创建的上下文中有一个 `value` 变量。这两个函数可以访问 `value` ，这就叫 `闭包` 。