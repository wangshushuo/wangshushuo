---
title: Jest
url: /Jest.html
date: 2022-07-22T16:35:49+08:00
categories:
- 前端
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

名字
- mockFn.mockName(name)
- mockFn.getMockName()

调用信息：
- mockFn.mock.calls 函数被调用时所接收到的参数。
- mockFn.mock.results
- mockFn.mock.instances
- mockFn.mock.contexts
- mockFn.mock.lastCall

清理mock，比如虚拟函数被调用了，mock.calls中会有值，可能影响其他用例的结果，就需要清理一下
- mockFn.mockClear()
- mockFn.mockReset()
- mockFn.mockRestore()

模拟函数的实现，可以在mock模块时使用
- mockFn.mockImplementation(fn)  模拟函数的实现，也就是中间有逻辑，可以根据接收参数，根据参数进行一些计算，与 mockReturnValue 做比较的话，
mockReturnValue是直接返回一个结果，并可以通过 mockFn.mock.calls 拿到调用函数时的参数
- mockFn.mockImplementationOnce(fn)

函数直接返回值：
- mockFn.mockReturnThis()
- mockFn.mockReturnValue(value)
- mockFn.mockReturnValueOnce(value)

函数异步返回结果：
- mockFn.mockResolvedValue(value)
- mockFn.mockResolvedValueOnce(value)
- mockFn.mockRejectedValue(value)
- mockFn.mockRejectedValueOnce(value)
### 虚拟函数的例子
1. 模拟模块，并模拟其中的方法
```js
jest.mock('metadata', () => ({
  metadata: {
    getEnumValue: jest.fn().mockImplementation((id, value) => {
      const enumMap = {
        ChangeViewType: {
          'adjust': {
            id: 'adjust',
            name: 'adjust',
            title: '调整',
          },
        },
      };
      return enumMap[id][value];
    }),
  },
}));
```

2. 模拟模块，其中的方法直接返回数据
```js
jest.mock('metadata', () => ({
  metadata: {
    getEnumValue: jest.fn().mockReturnValue({
      id: 'adjust',
      name: 'adjust',
      title: '调整',
    }),
  },
}));
```

## 断言举例
```js
// 断言对象的实例
expect(buttonController).toBeInstanceOf(BudgetPlanChangeButtonController);

// 断言方法是否被调用，源代码中的函数可以通过spyOn追踪
expect(spy).toHaveBeenCalled();

// 断言虚拟函数的调用情况，mock.calls会记录调用函数的参数
expect(metadata.getEnumValue.mock.calls.length).toBe(1);
expect(metadata.getEnumValue.mock.calls[0]).toEqual([
  'ChangeViewType',
  'ChangeViewType.adjust',
]);
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

## 模拟模块
![](http://hugo-1256216240.cos.ap-chengdu.myqcloud.com/pasteimageintomarkdown/2022-07-29/352636115774400.png)
