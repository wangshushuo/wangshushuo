---
title: Styled-Component
url: /Styled-Component.html
date: 2021-05-16T11:30:23+08:00
description: 摘要，显示在meta的description中
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---

## 安装
```
npm install --save styled-components
```

## 创建样式组件
创建组件
```js
import styled from 'styled-components'
const Button = styled.button``
```

一般的样式
```js
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
`
```

读取组件参数
```js
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`
```

子选择器
```js
const Text = styled.p`
  font-size: 12px;
  color: blue;
  &:nth-child(3) {
    margin-bottom: 20px;
    color: red !important;
  }
`
```

## 使用组件
可以作为普通组件使用
```jsx
function Demo() {
  return (
    <Button />
  )
}
```