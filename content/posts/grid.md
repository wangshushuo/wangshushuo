---
title: Grid
date: 2024-04-11T23:10:25+08:00
---
# Grid 布局

## 基本概念

- **容器**
  - 使用 `display: grid` 或 `display: inline-grid` 声明的元素
- **项目**
  - 容器中的直接子元素

## 容器属性

- **`grid-template-columns` 和 `grid-template-rows`**
  - 定义网格的列和行
- **`grid-column-gap` 和 `grid-row-gap`**
  - 定义项目之间的间隙
- **`grid-gap`**
  - 同时设置 `grid-column-gap` 和 `grid-row-gap`
- **`justify-items` 和 `align-items`**
  - 控制项目在容器内的对齐方式
- **`grid-template-areas`**
  - 定义区域模板

## 项目属性

- **`grid-column-start` 和 `grid-column-end`**
- **`grid-row-start` 和 `grid-row-end`**
  - 控制项目的位置和跨越的网格数
- **`justify-self` 和 `align-self`**
  - 控制单个项目的对齐方式
- **`grid-area`**
  - 指定项目所在的区域

## 实用技巧

- **响应式布局**
  - 使用 `fr` 单位和 `minmax()` 函数灵活定义网格大小
- **重叠项目**
  - 通过调整项目的 `grid-column` 和 `grid-row` 属性使项目重叠
- **网格线命名**
  - 通过给 `grid-template-columns` 和 `grid-template-rows` 的值命名，简化项目定位