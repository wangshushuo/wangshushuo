---
title: 创建 React 项目
url: /create-react-app.html
date: 2020-02-27T11:10:50+08:00
summary: 创建 React 项目
categories:
- react
tags:
- handbook
---

## 创建项目

```
yarn create react-app my-app
```

```
npx create-react-app my-app
```

```
npm init react-app my-app
```

## 创建typescript项目

在上面的命令的基础上，加`--template typescript`

## 环境变量

在 create-react-app 项目中，变量名必须以 `REACT_APP_` 开始。

在 `.env` 文件中定义变量 `REACT_APP_NOT_SECRET_CODE=123`。

**在 `js` 中使用**
```js
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_NOT_SECRET_CODE} />
      </form>
    </div>
  );
}
```

**在 `html` 中使用**
```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

判断当前环境 `process.env.NODE_ENV !== 'production'`。