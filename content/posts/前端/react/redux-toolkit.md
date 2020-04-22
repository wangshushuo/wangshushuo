---
date: 2019-10-28T10:54:37+08:00
toc: true
url: /redux-toolkit.html
title: Redux Toolkit
categories:
- React
---

[Redux Toolkit](https://redux-starter-kit.js.org/introduction/quick-start)是 `Redux` 官方提供的工具箱🧰，它指定了一个 `Redux` 的使用规则，集成了 `immer` `thunk` 等常用的工具库，还有很好的 `typescript` 支持。

slice

## 安装

```
yarn add @reduxjs/toolkit
// 或者
npx create-react-app my-app --template redux
```

## 初始化store

```js
import { configureStore, createReducer } from 'redux-starter-kit';
export const add = createAction('add')
const initialState = { number: 0 }
const reducer = createReducer(initialState, {
  [add]: (state, action) => state.number = action.number,
})
const store = configureStore({reducer})
export default store;
```

## 调用

```js
// ...
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Provider store={store}><App />
  </Provider>, document.getElementById('root')
);
```

```js
// ...
import { useSelector, useDispatch } from 'react-redux'
import { add } from './store'
function App() {
  const number = useSelector(state => state.number)
  const dispatch = useDispatch()
  return (
    <div className="App">
      <p>{number}</p>
      <button onClick={() => dispatch(add(number+1))}> + </button>
    </div>
  );
}
```

### 创建store

configureStore用于初始化redux仓库，可以合并reducer，可以方便的创建中间件等。

```js
function configureStore({
    // A single reducer function that will be used as the root reducer,
    // or an object of slice reducers that will be passed to combineReducers()
    reducer: Object<string, ReducerFunction> | ReducerFunction,
    // An array of Redux middlewares.  If not supplied, uses getDefaultMiddleware()
    middleware?: MiddlewareFunction[],
    // Enable support for the Redux DevTools Extension. Defaults to true.
    devTools?: boolean | EnhancerOptions,
    // Same as current createStore.
    preloadedState?: State,
    // An optional array of Redux store enhancers
    enhancers?: ReduxStoreEnhancer[],
})
```

例子

```js
const store = configureStore({
  reducer: {
    config: configReducer,
    counter: counterReducer
  },
})
```
