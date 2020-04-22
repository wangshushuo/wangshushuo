---
title: Redux 概要
date: 2018-11-28T14:24:04+00:00
categories:
- React
tags:
- api
---

<p id="page-title" class="asset-name entry-title">
  参考：<a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html">Redux 入门教程</a>
</p>

## 基本概念

store：保存数据的容器，整个应用通常只有一个store。

state：store在某时点的一个快照，一个state对应一个view。

action：定义一个用户对view的操作。

可以暂时这样理解：  
<img class="aligncenter size-medium wp-image-81" src="http://58.87.109.73/wpBlog/wp-content/uploads/2018/11/屏幕快照-2018-11-28-下午10.24.34-300x184.png" alt="" width="300" height="184"   />  
store生成一个快照state，state对应一个view，view发出action来通知store变化，使store变化而生成一个新的state，新的state又对应新的view。

ActionCreator：通常action只是一个对象，且只有type属性使必须的。我们知道action代表着view的操作，所以action可能有很多个又被经常使用，所以用一个函数来生成各种action是比较合理的操作，这个函数就叫做ActionCreator。

<pre><code class="language-javascript">const ADD_TODO = '添加 TODO';
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
const action = addTodo('Learn Redux');</code></pre>

## Redux的API

生成store、获得state

<pre><code class="language-javascript">import { createStore } from 'redux';
const store = createStore(fn);
const state = store.getState();</code></pre>

view通过store.dispatch() 发出action：

<pre><code class="language-javascript">store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
// store.dispatch(addTodo('learn Redux'));</code></pre>

store在接收到action时，会根据action生成一个新的state，那么如何生成新的state，这个计算过程怎么定义呢？

### Reducer

Reducer是一个函数，它定义store在接收到action时state如何发生变化。action只描述发生了什么，而reducer描述state如何变化。这个函数是这样的：

<pre><code class="language-javascript">const reducer = function (state, action) {
  // ...
  return new_state;
};
// 或
const defaultState = 0;
const reducer = (state = defaultState, action) =&gt; {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default: 
      return state;
  }
};
const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
</code></pre>

实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法：

<pre><code class="language-javascript">import { createStore } from 'redux';
const store = createStore(reducer);</code></pre>

⚠️ Reducer必须是纯函数：只要是同样的输入，必定得到同样的输出，必须遵守以下一些约束：

  * 不得改写参数
  * 不能调用系统 I/O 的API
  * 不能调用`Date.now()`或者`Math.random()`等不纯的方法，因为每次会得到不一样的结果

⚠️ Reducer 函数里面不能改变 State，必须返回一个全新的对象：

<pre><code class="language-javascript">return { ...state, ...newState };
// return [...state, newItem];</code></pre>

现在我们知道了Ruducer是处理state变化过程的，那么state变化以后又会发生什么呢？上面说过，通常一个state对应一个view，也就是说state改变后view也要随之变化，但是view怎么知道自己应该改变呢？

### store.subscribe()

Store 允许使用`store.subscribe`方法设置监听函数，一旦 State 发生变化，就自动执行这个监听函数，view也就可以通过它来更新。比如React的setState()。

### 工作流程大概可以这样理解：

<div style="width: 640px;" class="wp-video">
  <!--[if lt IE 9]><![endif]--><video class="wp-video-shortcode" id="video-78-1" width="640" height="436" preload="metadata" controls="controls"><source type="video/mp4" src="http://58.87.109.73/wpBlog/wp-content/uploads/2018/11/redux.mp4?_=1" />
  
  <a href="http://58.87.109.73/wpBlog/wp-content/uploads/2018/11/redux.mp4">http://58.87.109.73/wpBlog/wp-content/uploads/2018/11/redux.mp4</a></video>
</div>

&nbsp;