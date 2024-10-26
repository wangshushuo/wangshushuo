---
title: 授课项目首屏加载慢
date: 2024-04-07 22:29:00
tags:
  - 优化
---
## 现象

epp项目在pad端加载需要10-30s时间。
## 为什么会这样？

pad端是RN项目，前面2个界面的操作之后开启webview访问学生端网址，加载epp项目。  

观察epp学生端项目的加载：

![优化前][优化-前.jpg]

这个是渲染第一帧前加载资源的截图，可以看到有17个js文件，而很明显的，fabric、ckeditor、aliplayer这些体积很大的库在学生端是不需要的（这3个文件都是编辑器用的，epp项目分学生端、教师端、编辑器），而且资源数量较多。  

**两个原因导致了pad端需要加载10s的问题：资源数量多、很多不需要的代码被加载。**  

30s的情况出现在网络差的时候，比如上课时，有30个学生同时使用pad，瓜分宽带导致资源下载速度更慢。这个后面也有方案尝试解决。
## 问题处在哪？

从代码的入口文件看起，发现了这段代码：

![懒加载][优化-代码.png]

这段代码的作用是根据url来加载不同的场景（学生端、教师端、编辑器），重点是下面这段代码。

```js
const importScene = () =>
  import(`@/scene/${sceneName}Scene/${sceneName}Scene`)
    .then(module => module.default);
```

使用webpack的代码分割、懒加载机制。webpack会将`import("./module")`作为分割点，将其放在单独的chunk文件中，实现懒加载。  
`import()`也可以接受动态表达式，比如这样`import(./routes/${path}/route)`，此时`import() `为每一个**可能的模块**创建独立的chunk，这句话的重点是**可能的模块**，也就是上面代码的问题所在。

对于前面那段代码，import的动态的部分就是sceneName，对于webpack来说它是一个未知变量，所以webpack认为它是**可能的模块**。

在我们的业务中，**可能的模块**包含来学生端、教室端、编辑器，那么webpack会将3个大模块全部分别打包，而且将其全部下载。从而导致来前面提到的2个问题。
## 解决问题

尝试着把上面提到的那段动态表达式改成确定的语句，比如：

```js
const importStudentScene = () =>
    import('@/scene/studentScene/studentScene')
        .then(module => module.default);
const app = edApplication.getInstance('edinnova');
importStudentScene().then(studentScene => {
    app.addScene(new studentScene());
    app.startScene('studentScene', '#app');
});
```

再次开启项目：

![优化后][优化-后.jpg]

可以看到数量和体积都小了很多。

![优化后][优化-后2.jpg]

这是在电脑上的截图，优化后首屏从3.4s变为2.1s，效果明显。这只是一个几乎没有改动代码的一步优化。

可以看到优化后还是有1个600k，1个200k两个chunk文件，后面还需要分析这两个chunk文件，看是否有优化空间。
## 30个学生同时使用pad

有一个猜想，因为30个学生是在同一个教室的局域网内。考虑使用webRTC的种子下载技术，实现下载速度的优化。


