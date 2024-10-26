---
title: React v18 新特性
date: 2024-04-15 22:37:00
---
## 并发渲染模式
- ReactDOM.createRoot开启并发模式
- useTransition并发更新
  - startTransition将更新标记为低优先级
- useDeferredValue延迟响应的值
  - 也是被标记为低优先级
- 优先级调度
  - 高优先级的任务可以打断低优先级
  - 比如input输入

## 自动批量更新
- 原来只在合成时间中进行批处理，在promise、timeout、原生事件不批处理
- 现在都自动批处理
- 现在都会批处理，flushSync可以不批处理

