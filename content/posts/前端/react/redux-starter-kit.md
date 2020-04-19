---
date: 2019-10-28T10:54:37+08:00
toc: true
url: /redux-starter-kit.html
title: Redux Starter Kit
categories:
- react
---

[官网](https://redux-starter-kit.js.org/introduction/quick-start)

## 安装

```
yarn add redux-starter-kit react-redux

yarn add @reduxjs/toolkit

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