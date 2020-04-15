---
title: React Rangeslider
url: /React-Rangeslider.html
date: 2019-08-28T13:15:47+08:00
description: react的进度条、刻度条的库，支持拖拽，支持鼠标和触屏
categories:
- react
tags:
- api
keywords:
- 进度条
- 刻度
---
[官网](https://whoisandy.github.io/react-rangeslider/)

## 使用

yarn add react-rangeslider --save

```jsx
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

<Slider
  min={0}
  max={100}
  value={value}
  onChangeStart={this.handleChangeStart}
  onChange={this.handleChange}
  onChangeComplete={this.handleChangeComplete}
/>

<Slider
  min={0}
  max={10}
  value={reverseValue}
  orientation='horizontal'
  onChange={this.handleChangeReverse}
/>
```