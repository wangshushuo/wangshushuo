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

```
const Button = styled.button`
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
```