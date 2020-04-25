---
title: 常用DOM操作
url: /常用DOM操作.html
date: 2020-04-22T19:20:48+08:00
categories:
- DOM
tags:
- api
keywords:
- 复制文字
- 剪切实践
- 获取file的src
- class
- 图片原始尺寸
---


## 上传图片时，怎么拿到图片的src地址？
input选中图片以后，只是得到了file对象，如果想在img中显示该图片的话，并不知道src，所以想得到src还需要额外的操作。
```javascript
function getObjectURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) { // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) { // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) { // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}
```

## JS操作样式class
```js
document.body.classList.add("c");
document.body.classList.toggle("a");
document.body.classList.remove("c");
document.body.classList.contains("c");    // false 因为"c"上面remove掉了
document.body.classList.toString() === document.body.className;
```

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

## 获取dataset
```js
const index = +e.target.dataset.id;
```

## mouseEvent

click事件实际上也是一个mouseEvent事件。mouseEvent中有一个属性`path`，它可以看到触发事件的路径，从触发了事件的元素开始，以及他的所有父元素，一直到document然后是window。