---
title: 元素与组件
date: 2018-11-24T04:49:54+00:00
url: /react-element-and-component.html
categories:
- React原理
tags:
- knowledge
---
原文链接：[React Components, Elements, and Instances][1]

## 什么是React元素(element)？

**元素(element)是描述组件实例或DOM节点及其所需属性的普通对象**这个对象仅仅包含了有关组件类型、属性、子元素的信息。

元素不是实际的实例。相反，它是一种告诉React你想在屏幕上看到什么的方法。你不能在元素上调用任何方法。它只是一个带有两个字段的不可变描述对象：type:(string | ReactClass) 和 props: Object 。

可以把一个这样的DOM节点描述成下面这样的对象，这个对象就叫元素（element）

```js
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```

元素可以通过createElement方法创建。

## DOM元素

当element的type为英文字符串时，它表示同名的DOM节点，element的props对应其属性。这就是React将呈现的内容。例如：

```js
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

此元素只是将以下HTML表示为普通对象的一种方法：

## 组件元素

但是，element的type也可以是与React组件对应的函数或类：

```js
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
```

描述组件的element与描述DOM节点的element一样，都是element，它们可以嵌套并互相混合。

此功能允许您将DangerButton组件定义为具有特定color属性值的Button组件，而无需关心是否完全Button组件会呈现为DOM的button还是

```js
const DangerButton = ({ children }) => ({
  type: Button,
  props: {
    color: 'red',
    children: children
  }
});
```

你可以在单个元素树中混合DOM和组件元素：

```
const DeleteAccount = () => ({
  type: 'div',
  props: {
    children: [{
      type: 'p',
      props: {
        children: 'Are you sure?'
      }
    }, {
      type: DangerButton,
      props: {
        children: 'Yep'
      }
    }]
});
```

也可以用JSX写：

```js
const DeleteAccount = () => (
  <div>
    <p>Are you sure?</p>
    <DangerButton>Yep</DangerButton>
  </div>
);
```

这种混合有助于保持组件彼此分离，因为它们可以通过组合表达is-a和has-a关系：

  * DangerButton是一个Button具有特定属性的
  * DeleteAccount包含一个Button和一个DangerButton内部</code>

## 组件封装元素树 {#components-encapsulate-element-trees}

当React发现一个element的type时函数或者类时，它会问那个组件，给你相关的props你会render一个怎样的element。

比如当React看到这个element时：

```hs
{
  type: Button,
  props: {
    color: 'blue',
    children: 'OK!'
  }
}
```

React 会问 Button 组件想render一个什么样的element，  Button 组件返回一个这样的 element 给React:

```js
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

React将重复这个过程，直到它知道了页面内的所有组件的element都是基本DOM标签element。

React就像一个孩子，问你每个“X是Y”的“Y是什么”，你向他们解释，直到他们弄清楚世界上的每一件小事。

对于React组件，props是输入，元素树是输出。

**返回的元素树可以包含描述DOM节点的元素和描述其他组件的元素。这使得您可以在不依赖于其内部DOM结构的情况下组成UI的独立部分。**

## Top-Down Reconciliation {#top-down-reconciliation}

当你这样调用时：

```js
ReactDOM.render({
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!'
  }
}, document.getElementById('root'));
```

React 会问 Form 组件，结合所给的props返回怎样的元素树。它将逐步“改进”对组件树的理解：

```js
// React: You told me this...
{
  type: Form,
  props: {
    isSubmitted: false,
    buttonText: 'OK!'
  }
}

// React: ...And Form told me this...
{
  type: Button,
  props: {
    children: 'OK!',
    color: 'blue'
  }
}

// React: ...and Button told me this! I guess I'm done.
{
  type: 'button',
  props: {
    className: 'button button-blue',
    children: {
      type: 'b',
      props: {
        children: 'OK!'
      }
    }
  }
}
```

这就是被叫做reconciliation的过程的一部分，当你调用 [ReactDOM.render()][2] or [setState()][3] 时 reconciliation 就会开始。当 reconciliation 结束时，React就知道了最后的DOM树 ，然后一个像 react-dom or react-native 这样的渲染器将应用最小变更集来更新DOM节点。

## 实例instances

您可能已经注意到，此博客条目对组件和元素进行了大量讨论，而不是实例。事实上，实例在React中的重要性远远低于大多数面向对象的UI框架。

只有声明为类的组件才有实例，而且你永远不会直接创建它们：React会为你做这件事。虽然[存在父组件实例访问子组件实例的机制][4]，但它们仅用于命令性操作（例如将焦点设置在字段上），并且通常应该避免。

React负责为每个类组件创建一个实例，因此您可以使用方法和本地状态以面向对象的方式编写组件，但除此之外，实例在React的编程模型中不是很重要，并且由React本身管理。

## 摘要Summary

**元素**是一个简单的对象，用来描述你想让什么样的DOM节点或组件出现在屏幕上。元素可以在其props中包含其他元素。创建React元素很简单。一旦创建了一个元素，它就永远不会发生变异(mutated)。

**组件**可以以多种不同的方式来声明(declared)。它可以是一个带有render()方法的类。或者，在简单的情况下，可以将其定义为函数。在任何一种情况下，它都将props作为输入，并返回一个元素树作为输出。

当一个组件接收props作为输入时，这是因为一个特定的父组件返回了一个带有它的type和props的元素。这就是人们说道具在React中以一种方式流动的原因：从父母到孩子。

在您编写的组件类中可以用this引用的**实例**。它对于[存储本地状态和对生命周期事件做出反应][5]非常有用。

功能组件根本没有实例。类组件有实例，但您永远不需要直接创建组件实例&#8211;React负责这一点。

最后，为了创建元素，使用[React.createElement()][6]，[JSX][7]或[元素工厂帮手][8]。不要在真实代码中将元素写为普通对象 &#8211; 只要知道它们是引擎下的普通对象。

[1]: https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html
[2]: https://reactjs.org/docs/top-level-api.html#reactdom.render
[3]: https://reactjs.org/docs/component-api.html#setstate
[4]: https://reactjs.org/docs/more-about-refs.html
[5]: https://reactjs.org/docs/component-api.html
[6]: https://reactjs.org/docs/top-level-api.html#react.createelement
[7]: https://reactjs.org/docs/jsx-in-depth.html
[8]: https://reactjs.org/docs/top-level-api.html#react.createfactory