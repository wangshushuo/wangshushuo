---
title: React Spring
date: 2019-10-22T14:19:59+08:00
categories:
- React
- React库
---

[react-spring](https://www.react-spring.io) 是一个基于弹簧物理学的动画库。

最基本的用法：

```js
import {useSpring, animated} from 'react-spring'

function App() {
  const props = useSpring({opacity: 1, from: {opacity: 0}})
  return <animated.div style={props}>I will fade in</animated.div>
}
```

其中的useSpring可以创造一个js动画，这种动画默认不需要设置持续时间，他通过一些弹簧参数来控制动画的表现。可以通过config设置这些参数，像这样：

```js
useSpring({ config: { duration: 250 }, ... })
```

参数有哪些可以看Common api这节文档。

```js
useSpring({opacity: 1, from: {opacity: 0}})
```

from为动画开始的值，1为动画最后的值。


```js
useSpring({opacity: 1, to: {opacity: 0}})
```

1为动画开始的值，to为动画最后的值。

如果useSpring中变化的值可以直接使用，比如颜色、数字，则可以直接使用
```js
<animated.div style={props}>I will fade in</animated.div>
```
或这样
```js
<animated.span>{props.number}</animated.span>
```

如果useSpring中变化的值需要组合成字符串，比如transform，则需要使用插值函数(interpolate)来实现
```js
<animated.div
  style={{
    background: o.interpolate(o => `rgba(210, 57, 77, ${o})`),
    transform: xyz.interpolate((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
    border: interpolate([o, color], (o, c) => `${o * 10}px solid ${c}`),
    padding: o.interpolate({range: [0, 0.5, 1], output: [0, 0, 10]}).interpolate(o => `${o}%`),
    borderColor: o.interpolate({range: [0, 1], output: ['red', '#ffaabb']}),
    opacity: o.interpolate([0.1, 0.2, 0.6, 1], [1, 0.1, 0.5, 1])
  }}
>
  {o.interpolate(n => n.toFixed(2)) /* innerText interpolation ... */}
</animated.div>
```

useSpring中传值可以是任意的字段
```js
useSpring({everything: 1, to: {everything: 0}})
```

可以在代码中更新spring

```js
const [props, set, stop] = useSpring(() => ({opacity: 1}))

// Update spring with new props
set({opacity: toggle ? 1 : 0})
// Stop animation
stop()
```

可以设置成多段动画

```js
set({
  to: async (next, cancel) => {
    await next({opacity: 1, color: '#ffaaee'})
    await next({opacity: 0, color: 'rgb(14,26,19)'})
  },
})
```

动画结束时触发事件

```js
set({
  // 其他动画参数...
  onRest: () => {
    // 动画结束事件
    props.onWrong()
  }
})
```