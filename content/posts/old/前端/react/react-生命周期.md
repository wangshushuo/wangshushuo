---
title: React-生命周期

date: 2020-06-19T09:41:43+08:00
description: React生命周期
categories:
- react
---

## 挂载

- constructor
- getDerviedStateFromProps
- render
- didMount

willMount已过时

## 更新

- getDerviedStateFromProps
- shouldComponentUpdate(nextProps, nextState)
- render
- getSnapshotBeforeUpdate(prevProps, prevState)
- componentDidUpdate(prevProps, prevState, snapshot)

willUpdate和willReceiveProps已过时

getSnapshotBeforeUpdate可以在更新前，从DOM中获取一些信息，比如滚动位置。

## 卸载

- willUnmount

## 异常

- getDerviedStateFromError
- didCatch

## setState

setState在合成事件或者生命周期中调用时，会将修改放入队列，在协调和更新之后进行更新state