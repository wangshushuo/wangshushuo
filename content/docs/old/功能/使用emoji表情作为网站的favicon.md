---
title: Favicon Emoji
date: 2019-06-12T17:58:07+08:00
url: favicon-emoji.html
---
先加一个这个
```html
<link rel="icon" data-emoji="🛰" type="image/png">
```

在来一段js
```js
const favicon = document.querySelector("link[rel=icon]");

if (favicon) {
  const emoji = favicon.getAttribute("data-emoji");

  if (emoji) {
    const canvas = document.createElement("canvas");
    canvas.height = 64;
    canvas.width = 64;

    const ctx = canvas.getContext("2d");
    ctx.font = "64px serif";
    ctx.fillText(emoji, 0, 64);

    favicon.href = canvas.toDataURL();
  }
}
```