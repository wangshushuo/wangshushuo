---
title: Diff
date: 2018-11-17T08:33:37+00:00
url: /react-reconciliation.html
categories:
- React原理
tags:
- knowledge
keywords:
- React原理
---


## React Element

首先我们要知道react的diff比较的是新旧两颗 react element 树。那什么是 react element 呢？

react element 是一个普通对象，它描述组件实例或DOM节点。

它是这样的
```js
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```
或这样的（区别是type一个是字符串，一个是函数或类）
```js
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
```

React.render()方法，会把 react element 解析成所有type都是字符串（DOM标签），形成一棵虚拟DOM树。

当 state 或 props 更新时，render方法会解析出另一个树。React不会直接将新的树渲染为真实的DOM，而是找出新旧树之间的差异，只更新差异部分的真实DOM。这个“找出新旧树之间的差异”的算法就是diff。

如果直接比较两颗树，算法的时间复杂度为O(n<sup>3</sup>) ，不使用于react的场景。

React基于两点假设，实现了一个复杂度为O(n)的算法：

1. 两个不同类型的元素将产生不同的树。
2. 开发人员可以通过key参数提示哪些子元素可以在不同渲染中保持稳定。

实践中，上述假设适用于大部分应用场景。

## diff算法

在对比新旧两棵树时，React首先比较两个根元素的类型，然后根据两个元素的类型采取不同的行动。

### 根元素的类型

对比两个根元素的类型可能以下几种情况：

* elements of different types，不同类型的元素
* DOM elements of the same type，相同类型的DOM元素
* component elements of the same type，相同类型的组件元素

### 不同类型的元素

每当根元素具有不同的类型时，React将拆除旧树并从头开始构建新树。无论从`<a>`到`<img>`或从`<Article>`到`<Comment>`，或从`<Button>` 到 `<div>`，任何的调整都会导致全部重建。

当树被卸载，旧的DOM节点将被销毁。组件实例会调用`componentWillUnmount()`。当构建一棵新树，新的DOM节点被插入到DOM中。组件实例将依次调用`componentWillMount()`和`componentDidMount()`。任何与旧树有关的状态都将丢弃。

这个根节点下所有的组件都将会被卸载，同时他们的状态将被销毁。 例如，以下节点对比之后：

```html
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

这将会销毁旧的`Counter`并重装新的`Counter`。

### 相同类型的DOM元素

当比较两个相同类型的React DOM元素时，React则会观察二者的属性，保持相同的底层DOM节点，并仅更新变化的属性。

### 相同类型的组件元素

当组件更新时，实例仍保持一致，以让状态能够在渲染之间保留。React通过更新底层组件实例的props来产生新元素，并在底层实例上依次调用`componentWillReceiveProps()` 和 `componentWillUpdate()` 方法。

接下来，`render()`方法被调用，同时对比算法会递归处理之前的结果和新的结果。

## 递归子节点

默认情况下，当对DOM节点的子节点进行递归时，React会同时迭代两个**子项列表**，并在出现差异时生成变异。（应该是两个树的子项列表吧？）

例如，当在子节点末尾增加一个元素，两棵树的转换效果很好：

```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

React将会匹配两棵树的`<li>first</li>`，匹配两棵树的`<li>second</li>` 节点，然后插入`<li>third</li>`节点树。

如果你天真地在开头插入一个元素就会有糟糕的表现。 例如，在这两棵树之间进行转换效果不佳：

```html
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

React会调整每个子节点，而非意识到可以完整保留`<li>Duke</li>` 和 `<li>Villanova</li>`子树。低效成了一个问题。

## Key

React提供了一个key属性来解决这种低效问题。当子元素有key属性时，React使用key将旧树中的子元素与新树中的子元素相匹配并比较。

例如，增加一个`key`在之前效率不高的样例中能让树的转换变得高效：

```html
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

现在React知道带有`2014`的key的元素是新的，仅移动带有`2015`和`2016`的key的元素。

实践中，为元素找到一个key通常不难。你将展示的元素可能已经带有一个唯一的ID，比如key可以来自于你的数据中：

```html
<li key={item.id}>{item.name}</li>
```

当这已不再是问题，你可以给你的数据增加一个新的ID属性，或根据数据的某些内容创建一个哈希值来作为key。key必须在其兄弟节点中是唯一的，而非全局唯一。

## 权衡

重要的是要记住，协调算法是一个实现细节。 React可以在每个动作上重新呈现整个应用程序; 最终结果是一样的。 为了清楚起见，在这种情况下重新渲染意味着为所有组件调用渲染，这并不意味着React将卸载并重新安装它们。 它只会按照前面章节中规定的规则**应用差异(apply the differences)**。(什么叫apply the differences)

我们经常改进启发式方法，以便使常见用例更快。 在当前的实现中，您可以表达一个子树已经在其兄弟之间移动的事实，但您不能说它已移动到其他地方。_算法将重新渲染完整的子树。(最后一句话根前面两句是什么逻辑关系？)_

因为React依赖于启发式，如果不满足它们背后的假设，性能将受到影响。

  1. 该算法不会尝试匹配不同组件类型的子树。 如果您发现自己在具有非常相似输出的两种组件类型之间交替，则可能需要使其成为相同类型。 在实践中，我们没有发现这是一个问题。
  2. key应该是稳定的，可预测的和独特的。 不稳定的key（如Math.random（）生成的键）将导致许多组件实例和DOM节点被不必要地重新创建，这可能导致子组件中的性能下降和丢失状态。

&nbsp;

 [1]: http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf