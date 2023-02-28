---
title: 用html字符串生成dom元素

date: 2022-04-25T16:48:51+08:00
description: 摘要，显示在meta的description中
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---

https://stackoverflow.com/a/35385518/6021280

```js
/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

var td = htmlToElement('<td>foo</td>'),
    div = htmlToElement('<div><span>nested</span> <span>stuff</span></div>');

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList} 
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

var rows = htmlToElements('<tr><td>foo</td></tr><tr><td>bar</td></tr>');
```