---
title: jsvascript
date: 2020-04-18T01:45:53+08:00
categories:
- JavaScript
tags:
- api
---

## 原生获取真是宽高
不知道为什么用#${divID}会报错，只能用div[]选择器了，id=后面要用单引号。

```js
const textElement = document.querySelector(`div[id='${divID}'] .ckeditor`);
const width = textElement.offsetWidth;
const height = textElement.offsetHeight;
```

## promise async/await 获取图片原始尺寸
```ts
async funciton getImageInfo(image_res_url: string): Promise<{width: number, height: number}> {
    const image = new Image();
    image.src = image_res_url;
    const promise = new Promise<{width: number, height: number}>((resolve, reject) => {
        image.onload = () => {
            resolve({width: image.naturalWidth, height: image.naturalHeight});
        };
    });
    return promise;
}
```


## 数组的every方法
every方法可以中断循环
```js
contentList.every((content, index) => {
  if (element.id === content.id) {
    contentList.splice(index, 1);
    return false;
  }
  return true;
});
```

## 事件

```
// 取消默认行为：
e.preventDefault()
// 停止冒泡：
e.stopPropagation();  
```


## 将promise改装成await
将一个element UI库的confirm改装成await：这个confirm方法原来返回的是promise，resolve在try中return，reject在catch中return。

```ts
public async confirm_async(message: string, title: string) {
  try {
    return await this.vue.$confirm(message, title);
  } catch (error) {
    return undefined;
  }
}
```

调用confirm_async方法：

```ts
const isConfirm = await this.ed_showConfirm_async('xx','xx');
if(isConfirm === undefined) return;
```

这两个语句所在方法或函数，必须是一个async的函数或方法。这样就不需要把后续的操作都写在一个then方法中了。

## Array reduce，数组的reduce方法

```js
Object.keys(obj).reduce((memo, key) => {
    if (hooks.indexOf(key) > -1) {
      memo[key] = obj[key];
    }
    return memo;
  }, {});
```

## JS复制到剪切板(chrome 66+ 支持)
```js
navigator.clipboard.writeText('888')
    .then(() => {
        console.log('Async: Copying to clipboard was successful!');
    }, (err) => {
        console.error('Async: Could not copy text: ', err);
    });  
```

## 处理粘贴事件(paste)

```js
xxxElement.addEventListener("paste", function(e) {
    e.preventDefault();
    var text = "";
    if (e.clipboardData && e.clipboardData.getData) {
        text = e.clipboardData.getData("text/plain");
    } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData("Text");
    }
    document.execCommand("insertHTML", false, text);
});  

```