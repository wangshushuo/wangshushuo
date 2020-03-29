---
title: "css"
url: "/css.html"
toc: true
type: posts
date: 2020-03-29T22:10:30+08:00
lastmod : 2020-03-29T22:10:30+08:00
author: 王书硕
summary: 常用的 css 属性
categories:
- API操作手册
- 前端
- css
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
