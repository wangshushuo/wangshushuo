第一部分：基础知识
- 第1章：HTML与HTML5
- 第2章：CSS与CSS3
- 第三章：JavaScript基础
- 第4章：重要的JavaScript API
- typescript

第二部分：React
- 第5章：React基础
生命周期
hook
- 第6章：React原理
diff
fiber
并发
事件机制
- 第7章：v18特性

第三部分：浏览器与协议(事件循环 http tcp websocket)

第四部分：工程化（webpack vite）

----

# 面试题
## 浏览器
### 跨域
- 同源策略，防御xss、csrf共计
- 解决方法，jsonp、cors
### 浏览器存储
- cookie、sessionstorage、localstorage
- indexeddb
### 渲染过程
### 缓存
### 优化方案
### 回流与重绘
- DocumentFragment批量处理dom
- 防抖节流较少操作次数
- 绝对定位脱离文档流
### 事件循环

## css
### bdc
### flex

## js
### typeof/instanceof
- typeof判断基本类型
- instanceof判断对象是不是构造器的实例
### 基础类型
- ECMAScript标准定义了8中数据类型
  - 7种基本类型
  - 已经Object
- 2个空/3个基本/2个新的
  - null
  - undefined
  - boolean
  - string
  - number
  - bigint
  - symbol
### 变量提升/var/let/const
- var会变量提升
  - 定义提升
  - 赋值不提升
  - 没有块级作用域
- let/const不提升
  - 暂时性死区
  - 有块级作用域，if for等
### ==与===
- 三等比较类型和值
- 双等类型不一样会转化
  - 一方为bool转为数字
  - 一方为字符串转为数字
  - 一方为对象用Object.valueOf求值
  - null与undefined不等
  - NaN跟谁都不等
  - 两个对象判断是不是一个引用地址
### 引用类型
- Object、Function、Array
### forin/forof
- in适合遍历对象，拿到的是key
- of适合遍历数组，拿到的是value
- 数组是单独的个体的集合，of更符合，in像是到一个整体中
### 数组
#### 常用方法
- 遍历foreach、reduce
- 转换map
- 扁平化flat
- 过滤filter
- 查找indexOf、includes、some、every、
- 排序sort
- 添加删除push、pop、shift、unshift
- 拼接join、concat
#### 交集并集
### 闭包、作用域
### new操作符
### 继承、原型、原型链
### 箭头函数、普通函数
### apply/call/bind
### promise
- 状态pendding、fulfilled、rejected、settled（状态改变了成败之一）
- all/allsettled/any（第一个成功的）/race（第一个settled有结果的）

## ts
### 泛型
### 装饰器

### type和interface的区别
- interface可以重复声明，type不行
- 继承方式不一样
  - type使用交叉类型方式，
  - interface使用extends实现。
- 在对象扩展的情况下，
  - 使用接口继承要比交叉类型的性能更好。
- 使用interface来描述对象对外暴露的借口，
- 使用type将一组类型重命名

### any/unkonwn/never
- any和unkonwn在TS类型中属于最顶层的Top Type，即所有的类型都是它俩的子类型。
- 而never则相反，它作为Bottom Type是所有类型的子类型。

### 常用工具类型
- Partial 部分或没有
- Required 有所有属性
- Readonly 所有属性只读
- Pick 选取部分属性
- Omit 去除部分属性
- Extract 交集
- Exclude 差集

## react
### fiber
### 协调diff
### 事件机制
### hook原理
### hook优化
### 16/17/18版本
#### 18
- renderAPI
  - renderRoot
    - 并发模式
- transtion
- 并发模式
### 生命周期
### 组件通信

## redux

## mobx

## vue

## webpack
vite区别
loader、plugin、执行顺序
常见优化方案

## 设计模式
### 策略模式

## 技术方案
前端鉴权
扫码登录
首屏优化
长列表

## 性能优化
懒加载
图片优化
虚拟列表
本地缓存
DOM优化
浏览器缓存
