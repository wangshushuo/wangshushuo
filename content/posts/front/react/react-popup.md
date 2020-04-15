---
title: React Popup
url: /React-Popup.html
date: 2019-08-22T10:43:25+08:00
description: react的弹窗的库
categories:
- react
tags:
- api
keywords:
- popup
---

[React Popup](https://react-popup.elazizi.com/component-api/) 是一个弹窗组件的库。

## 安装

```
yarn add reactjs-popup

npm install reactjs-popup
```

## 基本用法

- contentStyle：设置**内容区**的样式
- overlayStyle：设置**遮罩**的样式

## 占位弹窗1

```jsx
import React from "react";
import Popup from "reactjs-popup";

const PopupExample = () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div>Popup content here !!</div>
  </Popup>
);
```

## 占位弹窗2

```jsx
const PopupExample = () => (
  <Popup trigger={<button>Trigger</button>} position="top left">
    {close => (
      <div>
        Content here
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup>
);
```

## 受控Modal

```jsx
const Modal = () => (
   <div>
    <button className="button" onClick={this.openModal}>
      Controlled Popup
    </button>
    <Popup
      open={this.state.open}
      closeOnDocumentClick
      onClose={this.closeModal}
    >
      <div className="modal">
        <a className="close" onClick={this.closeModal}>&times;</a>
        <span>666</span>
      </div>
    </Popup>
  </div>
);
```

