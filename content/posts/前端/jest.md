---
title: Jest
url: /Jest.html
date: 2022-07-22T16:35:49+08:00
description: 摘要，显示在meta的description中
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---

## 模拟模块

先看代码，isEntity是我们要测试的目标，其中引用了 metadata 模块。

```js
import { metadata } from '@metadata';

function isEntity (item) {
  return !!metadata.getEntity(item.id)
}
```

如果 metadata 模块比较复杂，在 jest 的环境中不能直接初始化出来，这时候最好的办法就是通过 mock 模拟这个模块，使测试代码可以正常运行。

```js
import { metadata } from '@metadata';

const entity = {
    custom1Entity: {}
}

jest.mock('@metadata', () => {
  return {
    metadata: {
      getEntity: jest.fn().mockImplementation(id => {
        return entity[id];
      }),
    }
  };
});

describe('模拟模块', () => {
    test('isEntity', () => {
        const item = { id: 'customEntity2' };
        expect(isEntity(item)).toBe(false)
        expect(metadata.getEntity.mock.calls.pop()[0]).toEqual(item.id);
        expect(metadata.getEntity.mock.calls.length).toBe(1);
    })
})
```

jest.mock 会模拟 @metadata 模块，无论是测试文件中还是原代码中的 @metadata 模块都会被模拟。
jest.fn() 只接受空参数的函数作为参数，并返回一个值。如果想有参数，就要在调用 mockImplementation 方法，来提供有逻辑的实现过程。

## 模拟函数
[jest api document](https://jestjs.io/zh-Hans/docs/mock-function-api#mockfnmockresolvedvaluevalue)
模拟函数也就是 jest.fn() 它返回一个 mockFn 对象，它有很多方法，可以从多个角度测试我们的代码。

```
mockFn.getMockName()
mockFn.mock.calls 函数被调用时所接收到的参数。
mockFn.mock.results
mockFn.mock.instances
mockFn.mock.contexts
mockFn.mock.lastCall
```

mockFn.mockClear()
mockFn.mockReset()
mockFn.mockRestore()
mockFn.mockImplementation(fn)
mockFn.mockImplementationOnce(fn)

mockFn.mockName(name)
mockFn.mockReturnThis()
mockFn.mockReturnValue(value)
mockFn.mockReturnValueOnce(value)

异步：
```
mockFn.mockResolvedValue(value)
mockFn.mockResolvedValueOnce(value)
mockFn.mockRejectedValue(value)
mockFn.mockRejectedValueOnce(value)
```

## jest.spyOn(object, methodName)
```js
const video = {
  play() {
    return true;
  },
};

module.exports = video;
```
```js
const video = require('./video');

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

test('plays video', () => {
  const spy = jest.spyOn(video, 'play');
  const isPlaying = video.play();

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);
});
```
jest.spyOn(object, methodName)会跟踪对应的方法，会使其成为一个 mock function ，就可以调用 mockFn 的各种方法和断言。

比如原函数是未被覆盖的，想要覆盖的话，就可以通过调用mockImplementation方法覆盖。
```js
jest.spyOn(object, methodName).mockImplementation(() => customImplementation)
object[methodName] = jest.fn(() => customImplementation)
```

因为 jest.spyOn 是一个模拟。 您可以在 afterEach 方法上调用 jest.restoreAllMocks 恢复初始状态。

## jest.spyOn(object, methodName, accessType?)
accessType为get或set，可以追踪get/set方法。
```js
const video = {
  // it's a getter!
  const video = {
  // it's a getter!
  get play() {
    return true;
  },
};

module.exports = video;

// xx.test.js
test('plays video', () => {
  const spy = jest.spyOn(video, 'play', 'get'); // we pass 'get'
  const isPlaying = video.play;

  expect(spy).toHaveBeenCalled();
  expect(isPlaying).toBe(true);
});
```