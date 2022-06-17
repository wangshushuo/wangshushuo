---
title: CSS阴影
url: /CSS阴影.html
date: 2022-06-17T10:22:31+08:00
description: 纯CSS实现的有亮面暗面的逼真光照阴影效果
categories:
- css
tags:
- 阴影
- 水滴
- 卡片
- 按钮
- 突出
---

## 水滴
https://codepen.io/mewoma/pen/gOWXQyO

![](http://hugo-1256216240.cos.ap-chengdu.myqcloud.com/pasteimageintomarkdown/2022-06-17/744101469976800.png)

```html
<div class="drops">
  <div class="drop"></div>
  <div class="drop"></div>
  <div class="drop"></div>
  <div class="drop"></div>
</div>
```
```css
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  display: flex;
  min-height: 100vh;
  background: #ddd;
  align-items: center;
  justify-content: center;
}
.drops{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.drop{
  position: absolute;
  width: 200px;
  height: 200px;
  background: transparent;
  border-radius: 63% 37% 43% 57% / 55% 48% 52% 45%;
  box-shadow: inset 10px 10px 10px rgba(0,0,0,0.05),
    15px 25px 10px rgba(0,0,0,0.1),
    15px 20px 20px rgba(0,0,0,0.05),
    inset -10px -10px 15px rgba(255,255,255,0.9);
}
.drop::before{
  content:'';
  position: absolute;
  top: 35px;
  left: 55px;
  background: #fff;
  width: 20px;
  height: 20px;
  border-radius: 63% 37% 58% 42% / 60% 57% 43% 40%;
}
.drop::after{
  content:'';
  position: absolute;
  top: 35px;
  left: 85px;
  background: #fff;
  width: 10px;
  height: 10px;
  border-radius: 63% 37% 43% 57% / 52% 63% 37% 48%;
}

.drop:nth-child(2){
  transform: scale(0.5) translate(-300px,180px);
  border-radius: 58% 42% 36% 64% / 58% 63% 37% 42%;
}

.drop:nth-child(3){
  transform: scale(0.5) translate(300px,150px);
  border-radius: 58% 42% 51% 49% / 44% 53% 47% 56%;
}

.drop:nth-child(4){
  transform: scale(0.35) translate(120px,-450px);
  border-radius: 64% 36% 33% 67% / 49% 53% 47% 51% ;
}
```

## 按钮
https://codepen.io/thebabydino/pen/bGrLprB

![](http://hugo-1256216240.cos.ap-chengdu.myqcloud.com/pasteimageintomarkdown/2022-06-17/745055875034800.png)

```pug
- let data = {
- 	heart: { ico: '❤️', hue: 344 }, 
- 	like: { ico: '👍', hue: 247 }, 
- 	star: { ico: '⭐', hue: 48 }
- }

- for(let p in data)
	- let v = data[p]
	button(aria-label=p data-ico=v.ico style=`--hue: ${v.hue}deg`)
```

```scss
$d: 2em;
$t: .3s;
$c: #fcfcfc #d2dae6;

$o: .125*$d;

body {
	display: grid;
	grid-auto-flow: column;
	grid-gap: 8vw;
	place-content: center;
	margin: 0;
	height: 100vh;
	background: #ecf0f4
}

button {
	--i: var(--light, 0);
	--not-i: calc(1 - var(--i));
	--j: var(--press, 0);
	--not-j: calc(1 - var(--j));
	z-index: var(--i);
	border: none;
	width: $d; height: $d;
	border-radius: 15%;
	transform: scale(calc(1 - var(--j)*.02));
	box-shadow:  
		calc(var(--not-j)*#{-$o}) calc(var(--not-j)*#{-$o}) #{$o} #{rgba(nth($c, 1), var(--not-j))}, 
		calc(var(--not-j)*#{$o}) calc(var(--not-j)*#{$o}) #{$o} #{rgba(nth($c, 2), var(--not-j))}, 
		inset calc(var(--j)*#{$o}) calc(var(--j)*#{$o}) #{$o} #{rgba(nth($c, 2), var(--j))}, 
		inset calc(var(--j)*#{-$o}) calc(var(--j)*#{-$o}) #{$o} #{rgba(nth($c, 1), var(--j))};
	background: #e8e8e8;
	font-size: 2.5em;
	transition: box-shadow $t, transform $t cubic-bezier(.2,4,1,3);
	cursor: pointer;
	
	&::after {
		filter: 
			Contrast(0) 
			Sepia(var(--i)) 
			Hue-Rotate(calc(var(--hue) - 50deg))
			Saturate(5)
			Opacity(calc(var(--i) + .21*var(--not-i)))
			Drop-Shadow(1px 1px hsla(0, 0%, 100%, var(--not-i)));
		transition: filter $t;
		content: attr(data-ico)
	}
	
	&:focus { outline: none }
	&:hover, &:focus { --light: 1 }
	&:active { --press: 1 }
}
```

## 钟
https://codepen.io/BurmesePotato/details/LYyOVoe

![](http://hugo-1256216240.cos.ap-chengdu.myqcloud.com/pasteimageintomarkdown/2022-06-17/745302399860100.png)

```html
<div class="clock">
  <div class="outer-clock-face">
    <div class="marking marking-one"></div>
    <div class="marking marking-two"></div>
    <div class="marking marking-three"></div>
    <div class="marking marking-four"></div>
  </div>
  
  <div class="inner-clock-face">
    <div class="hand hour-hand"></div>
    <div class="hand min-hand"></div>
    <div class="hand second-hand"></div>
  </div>
</div>
```

```scss
$color-bg: #9C2D41;
$color-bg-dark: #9C2D41;
$color-hand-second: #FAF7F4;
$color-hand-minute: #F6CBB7;
$color-hours-main: #CB857C;
$color-hours: #CB857C;

 html {
  background: $color-bg;
  text-align: center;
  font-size: 10px;
}

body {
  margin: 0;
  font-size: 2rem;
  display: flex;
  flex: 1;
  min-height: 100vh;
  align-items: center;
}

.clock {
  width: 30rem;
  height: 30rem;
  position: relative;
  padding: 2rem;
  border: 18px solid $color-bg-dark;
  box-shadow: 5px -5px 5px 0px rgba(lighten($color-bg, 10%), .5),
              -5px 8px 8px 0px rgba(darken($color-bg, 15%), .5),
              inset -3.5px 5.5px 6px 0px rgba(darken($color-bg, 15%), .5),
              inset 3px -3px 1px 0px rgba(darken($color-bg, 10%), 0.15);
              
  border-radius: 50%;
  margin: 50px auto;
}

.outer-clock-face {
  position: relative;
  background: $color-bg;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.outer-clock-face::after {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  transform: rotate(90deg);
}

.outer-clock-face::after,
.outer-clock-face::before,
.outer-clock-face .marking{
  content: '';
  position: absolute;
  width: 5px;
  height: 100%;
  background: $color-hours-main;
  z-index: 0;
  left: 49%;
}

.outer-clock-face .marking {
  background: $color-hours;
  width: 3px;
}

.outer-clock-face .marking.marking-one {
  -webkit-transform: rotate(30deg);
  -moz-transform: rotate(30deg);
  transform: rotate(30deg)
}

.outer-clock-face .marking.marking-two {
  -webkit-transform: rotate(60deg);
  -moz-transform: rotate(60deg);
  transform: rotate(60deg)
}

.outer-clock-face .marking.marking-three {
  -webkit-transform: rotate(120deg);
  -moz-transform: rotate(120deg);
  transform: rotate(120deg)
}

.outer-clock-face .marking.marking-four {
  -webkit-transform: rotate(150deg);
  -moz-transform: rotate(150deg);
  transform: rotate(150deg)
}

.inner-clock-face {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: $color-bg;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  border-radius: 100%;
  z-index: 1;
}

.inner-clock-face::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  border-radius: 18px;
  margin-left: -9px;
  margin-top: -6px;
  background: $color-hand-minute;
  z-index: 11;
}

.hand {
  width: 50%;
  right: 50%;
  height: 6px;
  background: $color-hand-minute;
  position: absolute;
  top: 50%;
  border-radius: 6px;
  transform-origin: 100%;
  transform: rotate(90deg);
  transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1);
}

.hand.hour-hand {
  width: 30%;
  z-index: 3;
}

.hand.min-hand {
  height: 3px;
  z-index: 10;
  width: 45%;
}

.hand.second-hand {
  background: $color-hand-second;
  width: 45%;
  height: 2px;
  z-index: 1;
}
```

```js
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
  const now = new Date();
  
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  
  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;
  
  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();
```