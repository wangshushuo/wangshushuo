---
title: css
date: 2020-03-29T22:10:30+08:00
summary: 常用的 css 属性
categories:
- CSS
---


## 居中
```css
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
```

## Flex
```css
.class{
  display:flex;
  justify-content:flex-start;
  align-items:center;
}
```

## 简易镂空效果
```css
outline:  9999px solid rgba(0,0,0,.76);
```

## 多行文字（英文、数字换行、限制行数）
```css
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  word-wrap:break-word;
  word-break:break-all;

  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  overflow:hidden;
  word-wrap:break-word;
  word-break:break-all;
```

## flex布局时使子元素不被缩放
```css
  flex-grow: 0;
  flex-shrink:0;
```

## ios滚动不流畅
```
-webkit-overflow-scrolling : touch; 
```

## placeholder的样式
```
.className::-webkit-input-placeholder {
  color: #B7B7B7;
}
```
## 渐变色文字
```css
.text{
  background-image: -webkit-gradient(linear,0% 0%,25% 100%,from(#ff2c2c),to(#7a5e91));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
span {
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  color: transparent;
}
```

## IOS 阴影 input textarea
```css
input,textarea{
	-webkit-appearance: none;
}
```


## margin塌陷
在标准文档流中，竖直方向的margin会出现叠加现象，即较大的margin会覆盖掉较小的margin，竖直方向的两个盒子中间只有一个较大的margin，这就是margin的塌陷现象。  
margin的塌陷现象分两种情况：
1.兄弟关系的盒子：
比如ul的li，相邻的li之间的margin会重叠取较大的一个;
2.父子关系的盒子。
子盒子的margin-top大于父盒子时，子的margin-top会覆盖父的。    

解决方法：  
当给父盒子设置边框或padding时，不会出现父子盒子的塌陷现象。  
当父盒子设置display:flex;时，不会出现这2种坍塌现象。  

## 盒子模型

## 清除浮动

## css优先级
!important最高
行内style属性 > 内联style标签 > 外联css文件
id > class > tag
计算：
行内style属性 = 1000
ID选择器 = 100
类选择器、属性选择器、伪类 = 10
元素/伪元素 = 1
*通配选择器 = 0

## 伪类&伪元素
伪元素：
::before
::after
::placeholder
::first-line
伪类：
:first-child
:nth-child
:empty

## inline-block元素有间隙
解决方法：在这些inline-block元素的父元素设置样式——fontsize：0；