---
title: Redux Saga
date: 2018-12-02T11:04:48+00:00
categories:
- react
tags:
- api

---
为了对它有一个感性的认识，首先看一下 <a rel="noreferrer noopener" href="http://link.zhihu.com/?target=http%3A//leonshi.com/redux-saga-in-chinese/docs/api/index.html%23effect-" target="_blank">中文文档</a> 把dome写出来，跑一下。另外还需要了解 [ES6的Generator][1] 。

跑完了文档中的dome之后，在来看一个例子。

```js
// 类 thunk 的 worker “进程”
function* load() {
  yield put({ type: BEGIN_LOAD_DATA });
  try {
    const result = yield call(fetch, UrlMap.loadData);
    yield put({ type: LOAD_DATA_SUCCESS ,payload: result });
  } catch (e) {
    yield put({type: LOAD_DATA_ERROR });
  }
}

function* saga() {
  // 创建一个监听“进程”
  yield fork(watch(CLICK_LOAD_BUTTON, load))
}
```

这里有几个 redux-saga 的概念需要再了解一下。

### 1、put

作用和 redux 中的 dispatch 相同。

```js
yield put({ type: 'CLICK_BTN' });
```

### 2、select

作用和 redux thunk 中的 getState 相同。

```js
const id = yield select(state => state.id);
```

### 3、take

等待 redux dispatch 匹配某个 pattern 的 action 。

在这个例子中，先等待一个按钮点击的 action ，然后执行按钮点击的 saga：

```js
while (true) {
  yield take('CLICK_BUTTON');
  yield fork(clickButtonSaga);
}
```

再举一个利用 take 实现 logMiddleware 的例子：

```js
while (true) {
  const action = yield take('*');
  const newState = yield select();
  
  console.log('received action:', action);
  console.log('state become:', newState);
}
```

这种监听一个 action ，然后执行相应任务的方式，在 redux-saga 中非常常用，因此 redux-saga 提供了一个辅助 Effect —— takeEvery ，让 watch/worker 的代码更加清晰。

```js
yield takeEvery('*', function* logger(action) {
  const newState = yield select();

  console.log('received action:', action);
  console.log('state become:', newState);
});
```

### 4、阻塞调用和无阻塞调用

redux-saga 可以用 fork 和 call 来调用子 saga ，其中 fork 是无阻塞型调用，call 是阻塞型调用。

### 4.1、fork&nbsp;

下面写一个倒数的例子，当接收到 BEGIN\_COUNT 的 action，则开始倒数，而接收到 STOP\_COUNT 的 action， 则停止倒数。

```js
function* count(number){
  let currentNum = number;
  while(currentNum >= 0){
    console.log(currentNum--);
    yield delay(1000);
  }
}
function* countSaga(){
  while(true){
    const {payload:number} = yield take(BEGIN_COUNT);
    const countTaskId = yield fork( count, number );

    yield take(STOP_COUNT);
    yield cancel(countTaskId);
  }
}
```

因为使用 fork 开启的任务，所以不需要等 count 这个saga执行完， STOP\_COUNT 任务已经被监听了，当 count 执行的过程中，如果STOP\_COUNT任务被触发，会执行下一行代码，也就是取消 fork 开启的那个任务，中断 count 的执行。

### 4.2、call  


下面这个例子：

```
const project = yield call(fetch, { url: UrlMap.fetchProject });
const members = yield call(fetchMembers, project.id)
```

有阻塞地调用 saga 或者返回 promise 的函数。可以理解为 fetch 执行完有了返回结果了，才会执行下一行。  


## Effects

上面提到的几个 redux-saga 的概念都是 Effect 。Effect 是一个 javascript 对象，里面包含描述副作用的信息，可以通过 yield 传达给 sagaMiddleware 执行

在 redux-saga 世界里，所有的 Effect 都必须被 yield 才会执行，所以有人写了&nbsp;<a href="http://link.zhihu.com/?target=https%3A//github.com/pke/eslint-plugin-redux-saga" target="_blank" rel="noreferrer noopener">eslint-plugin-redux-saga</a>&nbsp;来检查是否每个 Effect 都被 yield。并且原则上来说，所有的 yield 后面也只能跟Effect，以保证代码的易测性。

例如：

```js
yield fetch(UrlMap.fetchData);
```

应该用 call Effect ：

```js
yield call(fetch, UrlMap.fetchData)
```

从而可以使代码可测：

```js
assert.deepEqual(iterator.next().value, call(fetch, UrlMap.fetchData))
```

关于各个 Effect 的具体介绍，文档已经写得很详细了，这里只做简要介绍。

## 传统异步中间件简介

在介绍 redux-saga 优缺点之前，这里先简要介绍传统的 redux 异步中间件，以便和 redux-saga 做比较。对传统异步中间件已经充分了解的读者，可以直接跳到 “redux-saga 优缺点分析” 进行阅读。

### 1. fetch-middleware

使用redux的前端技术团队或个人，大多数都有一套自己 fetch-middleware，一来可以封装异步请求的业务逻辑，避免重复代码，二来可以写一些公共的异步请求逻辑，比如异常接口数据采集、接口缓存、接口处理等等。例如&nbsp;<a href="http://link.zhihu.com/?target=https%3A//github.com/jasonslyvia/redux-composable-fetch" target="_blank" rel="noreferrer noopener">redux-composable-fetch</a>，<a href="http://link.zhihu.com/?target=https%3A//github.com/agraboso/redux-api-middleware" target="_blank" rel="noreferrer noopener">redux-api-middleware</a>。

在当前 redux 社区中，fetch-middleware 封装结果一般如下：

```js
function loadData(id) {
  return {
    url: '/api.json',
    types: [LOADING_ACTION_TYPE, SUCCESS_ACTION_TYPE, FAILURE_ACTION_TYPE],
    params: {
      id,
    },
  };
}
```

值得一提的是，大多数 fetch-middleware 都会用到一个小技巧 —— 把最终处理好的 promise 返回出来，以便在 thunk-middleware 中复用，并组织不同异步过程的先后逻辑。

```js
function loadDetailThunk(id) {
  return (dispatch) => {
    // 先请求到 loadData 的结果，再请求 loadDetail
    dispatch(loadData(id)).then(result => {
      const { id: detailId } = result;
      dispatch(loadDetail(detailId));
    });
  };
}
```

这个技巧在 redux-saga 中也同样有效。

```js
function* loadDetailSaga(id) {
  const result = yield put.sync(loadData(id));
  const { id: detailId } = result;

  yield put.sync(loadDetail(detailId));
}
```

## redux-saga 优缺点分析

### 缺点

  * redux-saga 不强迫我们捕获异常，这往往会造成异常发生时难以发现原因。因此，一个良好的习惯是，相信任何一个过程都有可能发生异常。如果出现异常但没有被捕获，redux-saga 的错误栈会给你一种一脸懵逼的感觉。  
    
  * generator 的调试环境比较糟糕，babel 的 source-map 经常错位，经常要手动加 debugger 来调试。
  * 你团队中使用的其它异步中间件，或许难以和 redux-saga 搭配良好。或许需要花费一些代价，用 redux-saga 来重构一部分中间件。

### 优点

  * 保持 action 的简单纯粹，aciton 不再像原来那样五花八门，让人眼花缭乱。task 的模式使代码更加清晰。
  * redux-saga 提供了丰富的 Effects，以及 sagas 的机制（所有的 saga 都可以被中断），在处理复杂的异步问题上十分趁手。如果你的应用属于写操作密集型或者业务逻辑复杂，快让 redux-saga 来拯救你。
  * 扩展性强。
  * 声明式的 Effects，使代码更易测试，<a href="http://link.zhihu.com/?target=http%3A//leonshi.com/redux-saga-in-chinese/docs/basics/DeclarativeEffects.html" target="_blank" rel="noreferrer noopener">查看详情</a>。

## 利用 redux-saga 写 redux 中间件

用 redux-saga 来写中间件，可谓事半功倍。这里举一个轮询中间件的例子。

```js
function* pollingSaga(fetchAction) {
  const { defaultInterval, mockInterval } = fetchAction;

  while (true) {
    try {
      const result = yield put.sync(fetchAction);
      const interval = mockInterval || result.interval;

      yield delay(interval * 1000);
    } catch (e) {
      yield delay(defaultInterval * 1000);
    }
  }
}

function* beginPolling(pollingAction) {
  const { pollingUrl, defaultInterval = 300, mockInterval, types,
    params = {} } = pollingAction;

  if (!types[1]) {
    console.error('pollingAction pattern error', pollingAction);
    throw Error('pollingAction types[1] is null');
  }

  const fetchAction = {
    url: pollingUrl,
    types,
    params,
    mockInterval,
    defaultInterval,
  };

  const pollingTaskId = yield fork(pollingSaga, fetchAction);
  const pattern = action => action.type === types[1] && action.stopPolling;

  yield take(pattern);
  yield cancel(pollingTaskId);
}

function* pollingSagaMiddleware() {
  yield takeEvery(action => {
    const { pollingUrl, types } = action;

    return pollingUrl && types && types.length;
  }, beginPolling);
};
```

<pre class="wp-block-verse">本文来自知乎“<a href="https://zhuanlan.zhihu.com/p/23012870">redux-saga 实践总结</a>”，作者“<a rel="noreferrer noopener" target="_blank" href="https://www.zhihu.com/people/huang-jason">Jason</a>”，<a href="https://zhuanlan.zhihu.com/p/23012870">原文链接</a></pre>

 [1]: http://es6.ruanyifeng.com/#docs/generator