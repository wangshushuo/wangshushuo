---
title: dva取消异步任务
date: 2018-12-31T09:54:21+00:00
tags:
  - React
---

先声明一个axios的网络请求函数login🤪：

```js
//service.js
import axios from 'axios';

export default {
  login: async (params, cancelToken) => {
    try {
      const response = await axios.post(`${ApiServer}/auth/user`, params, cancelToken);
      return response;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        message.error(error.message);
      }
    }
  },
```

这段代码可以处理3中情况的异常：

  * axios.interceptors.response中throw Error
  * http status code !== 200时的promise reject，不使用async时是在catch中处理
  * axios请求被代码cancel掉

有了网络请求，可以写saga函数了：

如果是在dva中，saga函数会被写在model中的effects对象中：

```js
const CancelToken = axios.CancelToken;
...  
effects: {
    *startLogin({ payload }, { put, call, race }) {
      const source = CancelToken.source();
      const { data, timeout } = yield race({
        data: call(login, {username: payload.username,}, {cancelToken: source.token,}),
        timeout: call(delay, 1000),
      });
      if (data) {
        yield put({ type: 'log', payload: 'success' });
      } else {
        yield source.cancel('登录超时');
        yield put({ type: 'log', payload: 'timeout' });
      }
     },
   }
```

当然startLogin函数也可以写成generator函数作为普通saga，在不用dva的情况下使用。

这段代码调用了上面👆的login函数进行网络请求，其中race是saga提供的一种effect，是一种竞赛模式，race下面的多个任务，只有一个胜利者，即第一个完成的任务，其他任务会被取消。

所以这段代码就是用race实现的网络请求任务的超时处理。

但是网络请求任务只是一个saga任务一个异步任务，异步任务被取消了，但是网络请求并没有被取消，所以取消网络请求需要单独处理。

对于axios这个库来说，就是使用CancelToken这个api了。👆上面两段代码就是一个完整的CancelToken使用的例子。

上面说了什么呢？上文使用两段代码，介绍了一种——在使用dva或者redux-saga时——取消effect（取消异步任务、cancel effect、处理异步任务超时、处理网路请求超时、取消axios请求）的写法。下面介绍另一种写法。

除了用race以外，还可以用take Effect来写。比如：

```js
 namespace: 'products',
 effects: {
  *start(){},
  *stop(){},
  watchLogin: [
      function* ({ take, put, call, cancel, fork, cancelled }) {
          yield take('start');
          const timerTask = yield fork(timer)
          const bgSyncTask = yield fork(bgSync)
          yield take('stop')
          yield cancel(bgSyncTask)
          yield cancel(timerTask)

        function* bgSync() {
          try {
            while (true) {
              const result = yield call(delay, 5 * 1000);
              yield put({ type: 'stop' })
            }
          } finally {
            if (yield cancelled())
              yield put({ type: 'log', payload: 'fetch🛑' })
          }
        }
        function* timer(time) {
          let i=0;
          while (true) {
            yield put({ type: 'log', payload: i++ })
            yield delay(1000)
          }
        }
      },
      { type: 'watcher' },
    ],
}
```

多说一句，这段代码还是在dva中的写法，它也可以被轻易的改成redux-saga的写法。

watchLogin是一个saga，它被dva自动run运行，它的第一个take在等待一个type为start的action被dispatch或者put，take(&#8216;start&#8217;)被触发后，2个非阻塞任务运行，同时等待take(&#8216;stop&#8217;)被触发。

action stop触发take(&#8216;stop&#8217;)，下面2行代码执行，取消了2个非阻塞任务🤪。

我们看到fork的2个任务都是generator函数，也就是saga，它们可以写在dva的model的effects下，被disptach或者put发送action调用触发，如果这样的话就无法通过代码将其cancel。

所以为了实现取消异步任务，可以像这样写在一个effect中，通过take帮助，实现cancel。

其实dva中每个model的effects被看作一个大saga，会被当作sagaMiddleware.run()方法的参数，而effects下面的每个方法，都会被fork成一个子任务。

综上所述，现在我们可以处理一种问题了——在使用dva或者redux-saga时——取消effect、取消异步任务、cancel effect、处理异步任务超时、处理网路请求超时、取消axios请求。