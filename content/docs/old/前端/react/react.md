---
title: React
date: 2020-03-30T23:19:26+08:00
---
## 生命周期

用于初始化 state  constructor() {}

用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用，

如果需要对比 `prevProps` 需要单独在 `state` 中维护  `static getDerivedStateFromProps(nextProps, prevState) {}` ，因为该函数是静态函数，所以取不到 `this` 。

判断是否需要更新组件，多用于组件性能优化  `shouldComponentUpdate(nextProps, nextState) {}`

用于获得最新的 `DOM` 数据  `getSnapshotBeforeUpdate() {}`

以下函数不建议使用  `UNSAFE_componentWillMount() {}`，`UNSAFE_componentWillUpdate(nextProps, nextState) {}`，`UNSAFE_componentWillReceiveProps(nextProps) {}`

## props中没有history,location,match？withRouter可以解决

如果A组件的父组件是Route（react-router-dom）,A的props参数会含有history,location,match，但是A组件的子组件B的props参数就不包含history,location,match。  
如果想在B组件中使用history的API，但是没有history对象该怎么办呢。这时就用到withRouter了[文档][react-router]。

```js
import { withRouter } from 'react-router';
class ShowTheLocation extends React.Component {
  // this.props中会包含history,location,match
}
export default withRouter(ShowTheLocation)
```

[react-router]:https://reacttraining.com/react-router/web/api/withRouter