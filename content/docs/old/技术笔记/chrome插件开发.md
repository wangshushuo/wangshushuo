---
title: Chrome插件开发
date: 2021-08-05T22:30:36+08:00
---
## background-warp.js

## background.js
```js
// 监听页面的加载完成事件
chrome.webNavigation.onCompleted.addListener(
  function (data) {
    // 调用sotrage存放或设置一些数据
    chrome.storage.local.set({ resolvedBuildValue }, function () {
      console.log('Value is set to ' + resolvedBuildValue);
    });
    
    // 调用scripting执行插入脚本的操作
    chrome.scripting.executeScript({
      target: { tabId: data.tabId },
      function: function(){
        // 可以正常的调用document的相关api控制页面内的元素
      },
      // files: ['content-script.js'],
    });

    // 调用scripting执行插入css样式的操作
    chrome.scripting.insertCSS(
      {
        target: { tabId: data.tabId },
        css: 'body{background: red;}', // 一个css样式的字符串
      }
    );
  }
)
```
```ts
interface data {
  frameId: number
  parentFrameId: number
  processId: number
  tabId: number
  timeStamp: number
  url: string

}
interface target {
  tabId:;
  allFrame?: boolean;
}
```

## exceScript