---
title: "ReactRouter的哲学"
url: "/ReactRouter-philosophy.html"
author: 王书硕
date: 2020-03-31T13:11:28+08:00
lastmod : 2020-03-31T13:11:28+08:00
toc: true
summary: 机翻文档，新版的react-router是动态路由，它与传统的静态路由在使用上有很大的不同
categories:
- 知识点
- react
---


## 哲学
本指南的目的是解释使用React Router时的心智模型。 我们将其称为“动态路由”，这与您可能更熟悉的“静态路由”完全不同。  
### 静态路由
如果您使用过Rails，Express，Ember，Angular等，那么您已经使用了静态路由。 在这些框架中，您可以在进行任何渲染之前将路由声明为应用程序初始化的一部分。 React Router pre-v4也是静态的（大多数情况下）。   
请注意在应用侦听之前如何声明路由。 我们使用的客户端路由器是类似的。 在Angular中，您可以预先声明您的路由，然后在渲染之前将它们导入顶级AppModule.  
Ember有一个传统的routes.js文件，构建会读取并导入到应用程序中。 同样，这会在您的应用呈现之前发生。  
尽管API不同，但它们都共享“静态路由”模型。 React Router也使用“静态路由”直到v4。要成功使用React Router，您需要忘记这一切！：o  
### 背景故事
坦率地说，我们对我们在React Router的v2版本中方向感到非常沮丧。 我们（Michael和Ryan）觉得受到API的限制，认识到我们重新实现了React（生命周期等）的部分，而且它与React给我们创作UI的心理模型不符。我们走过走廊在研讨会讨论如何应对之前的酒店。我们互相问道：“如果我们使用我们在工作室教授的模式构建路由器会是什么样子？”开发只需要几个小时，我们就有了一个概念验证，我们知道它是未来 我们想要路由。 我们最终得到的API并不是React的“外部”，这是一个由React的其余部分组成或自然落实到位的API。 我们认为你会喜欢它。  
### 动态路由
当我们说动态路由时，我们指的是在您的应用呈现时发生的路由，而不是在正在运行的应用之外的配置或约定中。 这意味着几乎所有东西都是React Router中的一个组件。 以下是对API的60秒回顾，了解它的工作原理：首先，为自己定位的环境抓住自己的路由器组件，并将其呈现在应用的顶部。
```js
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), el)
```
接下来，抓取链接组件以链接到新位置：
```js
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
)
```
最后，当用户访问/仪表板时渲染Route来显示一些UI。
```js
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard}/>
    </div>
  </div>
)
```
Route将呈现`<Dashboard {... props} />`，其中`props`是一些特定于路由器的东西，看起来像`{match，location，history}`。 如果用户不在`/dashboard`，则Route将呈现为null。 这就是它的全部内容。  

### 嵌套路由
很多路由器都有一些“嵌套路由”的概念。如果您在v4之前使用过React Router的版本，那么您也会知道它也是如此！当您从静态路由配置移动到动态渲染路由时，如何“嵌套路由”？那么，你如何潜逃一个div？  
```js
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos}/>
    </div>
  </BrowserRouter>
)

// when the url matches `/tacos` this component renders
const Tacos  = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route
      path={match.url + '/carnitas'}
      component={Carnitas}
    />
  </div>
)
```
看看路由器没有“嵌套”API？ 路由只是一个组件，就像div一样。 因此，为了筑巢路线或div，你只需......做它。让我变得更加棘手。

### 响应路线
考虑用户导航到`/invoices`。 您的应用适用于不同的屏幕尺寸，它们具有较窄的视口，因此您只需向其显示发票列表和发票仪表板的链接。他们可以从那里更深入地导航。  
在大屏幕上，`/invoices`不是有效的路线，但在小屏幕上它是！ 为了让事情变得更有趣，请考虑一个拥有巨型手机的人。 他们可以纵向查看/发票，然后将手机旋转到横向。 突然间，我们有足够的空间来显示主 - 细节用户界面，所以你应该立即重定向！    
```

```
当用户将手机从纵向旋转到横向时，此代码会自动将其重定向到仪表板。 该组有效路由根据用户手中的移动设备的动态特性而改变。
这只是一个例子。 还有很多其他我们可以讨论的内容，但我们总结一下这个建议：为了让你的直觉与React Router的一致，考虑组件，而不是静态路由。 考虑如何使用React的声明可组合性来解决问题，因为几乎每个“React Router问题”都可能是“React问题”。
