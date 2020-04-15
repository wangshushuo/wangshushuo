---
title: 利用useContext使用ReactRouter
url: /react-router-hook.html
date: 2019-07-08T09:36:38+08:00
description: 利用React Hook的useContext使用React Router的history.push等api，使用useReducer管理数据。
categories:
- react
tags:
- api
keywords:
- React Hook
- useReducer
- useContext
- React Router
---
## React Router 的history.push
```jsx
import React, { useState, useContext, useEffect } from 'react';
import { __RouterContext } from "react-router";

const Login: React.FC = () => {
  const [token, setToken] = useState('');
  const { history } = useContext(__RouterContext);

  useEffect(() => {
    if (token) {
      history.push('/list')
    }
  }, [token, history]);

  return (
    <>
      <button onClick={()=>setToken('666')}>登录</button>
    </>
  );
}
```
这段代码的逻辑是，等级登录按钮，设置token变量。当token变量变化时，触发useEffect调用ReactRouter的history.push切换路由。history对象是通过useContext获得到的，可以拿到location、history、match等3个对象。

