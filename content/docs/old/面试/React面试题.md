---
title: React面试题
date: 2024-03-21T10:08:35+08:00
---

Fragments组件中可以设置key属性，但是简写后将不支持？

## Router

### createMemoryHistory

createMemoryHistory主要用于服务器渲染，它创建一个内存中的history对象，不与浏览器URL互动

## 生命周期
getDerivedStateFromError和componentDidCatch

## hook
useLayoutEffect
其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

useDebugValue，在开发者工具中展示的信息