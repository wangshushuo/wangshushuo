---
title: 问题合集
author: 王书硕
type: page
toc: true
date: 2018-11-17T08:33:37+00:00
url: /questions
description: 记录各种小问题、零散的知识点
---

## redux-saga中使用fetch

```js
const response = yield call(fetch, '/consult/v1/headCarousel');
const data = yield response.json();
yield put({ type: 'save', payload: data });
```

## virtual DOM ❗️

* 使用javascript对象描述DOM树，并用它构建真的DOM树。
* 状态变更会重新创建js对象树，并比较新旧树的差异，并记录。
* 将记录的差异应用到真的DOM树，只修改差异的部分。


## 可编辑元素

```html
<!-- vue -->
<p class="content" v-text="item.title" @keydown="onEnter"  @dblclick="turnOnEditable" @blur="(e)=>{titleBlur(e, index)}">
  {{item.title}}
</p>
```
```js
// js
methods: {
    // 修改标题，回车时失去焦点
    onEnter(e) {
        if(e.keyCode===13){
            e.target.blur();
        } 
    },
    // 失去焦点时，保存内容，并将元素修改为不可编辑
    titleBlur(e, index){
        const title = e.target.innerText;
        this.onTitleChange({title:title,index:index});
        e.target.setAttribute('contenteditable', false);
    },
    // 双击元素时，将其变为可编辑状态，并获取焦点。
    turnOnEditable(e){
        e.target.setAttribute('contenteditable', true)
        e.target.focus();
        var range = window.getSelection();//创建range
        range.selectAllChildren(e.target);//range 选择obj下所有子内容
        range.collapseToEnd(); // 光标放到最后
    },
}
```


html部分是基于vue的，不过也很容易用其他方式实现。这里实现的是双击元素后，将其变为可编辑模式，就是设置contenteditable属性，这个属性直接写在标签中也是可以的。
失去焦点时，将contenteditable属性置为false。
回车时，失去焦点，会触发blur事件。其中还有个操作光标的事件，因为可能出现focus后，光标在开始位置的问题。

[MDN介绍][1]



## 如何在React中利用join插入&nbsp空格
```jsx
<div 
  className={styles.tags} 
  dangerouslySetInnerHTML={{
    __html: '我们的愿景是，得天下英才而教育之'.split('').join(' ').replace(/\s/g, '    ') 
  }}
/>
```
[1]: https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_Editable
[image1]:/uploads/2019/03/image-2.png

## 刷新`ipconfig /flushdns `  
## 隐藏滚动条：
```
body::-webkit-scrollbar {
    display: none;
}  
```

## ckeditor的回车绑定

今天解决了一个恶心的问题，ckeditor的回车会换两行，不知道是哪里出问题搞坏了回车键，用keystrokeHandler重置绑定按键可以解决问题。

```
this.instance.on('instanceReady', () => {
    this.instance.setData(this.value);
    this.instance.keystrokeHandler.keystrokes = [13, ''];// 13是回车键
}); 
```


## 可编辑元素
1. 可编辑元素可以直接在里面粘贴html内容，使用contenteditable="plaintext-only"属性可以防止html内容。  
2. 隐藏滚动条.element::-webkit-scrollbar { width: 0 !important }  


## 记录网页操作的工具：
https://www.rrweb.io/  

## 剪裁元素内容

```
clip-path: inset(0 10px 0 10px);
```
这个可以剪裁元素内容，依次为上右下左，以边缘为起点，剪裁掉这么多宽度。
参考：https://www.zhangxinxu.com/wordpress/2014/12/css3-svg-clip-path/
和：https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path  

## nodejs
__dirname好像是文件所在当前目录
process.cwd()好像是启动程序的线程工作的目录  

## electron中可以启动egg服务器，在程序中修改了文件以后，可能需要重启electron才能生效。  

## 左右对齐文字：
```
.a{
    width:596px;
    text-align:justify;
    text-align-last:justify;  
}
```

## 固定位置显示背景图片
background-attachment: fixed;  

## 居中
```css
#wrapper {
  display: table;
  width: 100%;
  height: 100%;
}

#centred {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}  
```

## chrome调试安卓设备的chrome浏览器的网页
通过usb链接
chrome://inspect/  




## ssh

### 配置密钥文件 

通常使用ssh生成的秘钥文件名是“id_rsa”，通常这一对公钥私钥也是够用的。如果有第二份秘钥的话（腾讯云生成的），需要一个"config"文件。
该文件存放在".ssh"目录下（不需要后缀扩展名），内容为：
```
Host 128.128.666.666
   IdentityFile C:\Users\anrui\.ssh\pc_pc  
```

## 其他记录

* S2登录可以加chrome的凭证管理 API，实现保存账号密码。避免重复输入密码。登录页面自动显示登录过的老师信息。如果多个老师使用同一个设备，也可以列出老师的名字，让老师选择自己的名字登录，进行上课？（如果登录到其他老师的账号，会造成什么破坏性的后果吗？未授权课程？）

* 尝试用postfix发邮件，用阿里邮箱，开始说权限不对，就是密码错误之类的。后来改成qq邮箱，说lost connection with smtp.qq.com[14.18.245.164] while receiving the initial server greeting，stackoverflow说可能是本地的防火墙限制了postfix使用的25端口。如果是这样的话，可以考虑用AppleScript或者用我的远程服务器来发了。 

* qq的smtp服务器需要身份验证，找到了一个blog好像是要给qq发证书才行，像ssh一样吗？https://blog.csdn.net/pengzonglu7292/article/details/78850082  

* 不是，在mac上的尝试失败，可能是因为mac做不了这个工作，qq的smtp服务器验证不通过。换到云服务器上就ok了。  

* 凭证管理API介绍：https://lavas.baidu.com/pwa/automatic-login/credential-management-api/introduction  

* sprite-react安装以后用不了，可能是因为react的版本是16.42，改成16.5可能就可以了。  

* sprite-react的label的文字需要传text参数，scene可以传一个viewport={[300, 300]}设置宽高。sprite可以设置事件，作为富文本编辑可以做，但是可能需要较大的工作量来自定义各种编辑行为。作为备选方案吧，暂时不考虑做了，等目前gg和任务清单开发完了，可以考虑再试试。  

* 怎么才能在网页上管理分支呢？管理分支需要运行git命令，egg是运行在nodejs环境，网页将指令传给后台，egg中执行git命令。git命令需要的路径怎么办？可以跨路径执行git吗？如果可以的话，就可以将egg单独运行。否则的话，需要在被管理的项目路径下运行egg项目。  

* git可以clone本地的仓库，比如`git clone /f/code/ed-plugin-platform`，可以利用这一点吗？创建分支，merge分支？网页中点击创建分支按钮，egg目录创建分支，push到epp目录？epp接收到了分支，应该还需要切换。  

* 利用nodejs子线程和目标目录路径去epp目录下操作git？  

* diff方法现在的实现不大好，因为有student_page的存在，是逻辑变得复杂了很多。可能模仿虚拟dom的结构，用树来表示可能比较好。  

* SonarSource 分析代码工具  

* 怎么写单元测试？直觉：工具函数准备输入数据，验证输出数据；事件处理函数，模拟事件数据。难点是准备各种情况的输入数据。  
* 目标为导向的团队都不会重考勤。过程为导向的肯定重考勤。  
* 项目结构复杂，文档少，过于依赖经验。项目就失控了。 

## 工作成效

管理者工作成效。什么叫卓有成效？  
知识工作者的成效，创造性，强调贡献。知道别人的需求，让别人了解自己的工作。  
对组织的能力和绩效产生显著影响——就是管理者。  
才能转化成成果。  
工作产生实实在在的效果，强调共享，不能表面看起来很忙碌，实际上没效果。  
3个方法：时间管理，用人之长，有效决策。  
管理上司：协助上司完成所长。  
慎重决策，果断执行。切忌折中。  
原则性的解决方案。  
有效决策需要在多个相互冲突的备选方案中做出判断，充分考虑反面意见。  

## 能力

1. 组织协调能力（3级）：协调多人和团队共同达成一个目标。  
2. 架构能力（3级）：代码组织能力，组织协调大量的代码模块，良好的工作在一起。  
3. 分享总结能力（2级）：表达能力，分享自己的经验，自己有较好的经验和技能，也能让其他人学会自己的技能。  
4. 代码文档能力（1级）：日常编码任务，分析文档，书写文档。    

## 评估

简而言之，文档，就像盖楼房的设计图，没有图纸，你是不能开始搬砖的。
领导有没有给你看需求分析文档？有没有拿着需求分析文档给你宣讲你要做什么？没有？不干活；
测试的同事有没有给你看测试用例文档？有没有给你宣讲？没有？不干活；
你自己明白领导的意图了吗？明白测试同事的意图了吗？
想明白后，开始想自己要开发的模块里的各个功能模块之间的关系，可以画时序图；
时序图画完了，看看是否有（可能）频繁变化的模块/需求，
如果有，请务必使用一些设计模式，如果要用设计模式，请务必画UML类图，
如果没有频繁变化的模块/需求，请一定不要用设计模式；
最后，看看在一个功能模块中，有没有逻辑比较复杂的地方，如果有，请画流程图；
模块和模块之间有没有需要明确的协议？如果有，请把协议写出来。
上面这一段话，就是你要写的文档，这个文档的读者主要是你，在你的模块出问题之前，别人通常不会读这个文档（不排除你的领导会要求看你这个文档）。如果你既不需要时序图又不需要类图又没什么协议需要明确，那么，你就可以不写这个文档。另外，如果这个文档写得好，你的代码是不需要任何注释的。

作者：二律背反  
链接：[知乎][知乎1]  
来源：知乎  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。   

[知乎1]:https://www.zhihu.com/question/312019918/answer/608965942  

## mouseEvent

click事件实际上也是一个mouseEvent事件。mouseEvent中有一个属性`path`，它可以看到触发事件的路径，从触发了事件的元素开始，以及他的所有父元素，一直到document然后是window。


## 使用css画不规则边框

```css
.node {
    background-image: linear-gradient(to right, #000 1px, transparent 0px);
    background-size: 1px 50%;
    background-position-y: 50%;
    background-repeat: no-repeat;
}
```

这段样式可以画半个左边框。其中用到了渐变色属性。

## 渐变色

```css
.node {
    background-image: linear-gradient(to right, #000 1px, transparent 0px);
}
```

` linear-gradient(方向, 开始颜色 大小, 结束颜色 大小);`

## webpack
### 代码分割

```js
function route(path, query) {
  return import(`./routes/${path}/route`)
    .then(route => new route.Route(query));
}
// 上面代码为每个可能的路由创建独立的 chunk
```

### 开发library

#### 在代码中使用NODE_ENV
```js
let host = ref.url.getConfig;
if (process.env.NODE_ENV === 'development') {
  host = ref.url.getConfigDev;
}
```

#### package.json
如果将打包后的文件最为“main”字段，那么上面的NODE_ENV就会不起作用
```json
{
  "name": "plugin-sdk",
  "version": "0.0.3",
  "main": "src/index.js",
  "repository": {
    "type": "git",
    "url": "git+http://仓库地址/plugin-sdk.git"
  }
}
```
#### 使用
需要通过npm安装依赖
```
yarn add git+http://仓库地址/plugin-sdk.git
```

## parcel

### 静态资源
插件  
npm install parcel-plugin-asset-copier
  
package.json中加一个字段  
"assetsPath": "test-files/assets"


## vscode

### debugger for chrome

当使用parcel时，实际引用js文件会带有hash，而编辑器中的文件没有hash，导致插件认为js文件没有被挂载，断点也就无效了。  
按照如下调整launch.json，可解决此问题。

```json
"sourceMapPathOverrides": {
	"../*": "${webRoot}/*"
}
```

## 自学php，找到远程工作项目的22岁程序员

[链接](https://www.nocsdegree.com/22-year-old-self-taught-web-developer-earns-15k-a-month-in-rural-austria/)

## [游戏策划](https://zhuanlan.zhihu.com/p/33960412)

没有惩罚，只有奖励

奖励的目的是它能让儿子获得短暂的快乐，满足他的某一个需求，但过去就没了，下一个目标又在眼前。

## Redux Starter Kit

Redux的脚手架工具

### 安装

yarn add redux-starter-kit

### 创建store

configureStore用于初始化redux仓库，可以合并reducer，可以方便的创建中间件等。

```js
function configureStore({
    // A single reducer function that will be used as the root reducer,
    // or an object of slice reducers that will be passed to combineReducers()
    reducer: Object<string, ReducerFunction> | ReducerFunction,
    // An array of Redux middlewares.  If not supplied, uses getDefaultMiddleware()
    middleware?: MiddlewareFunction[],
    // Enable support for the Redux DevTools Extension. Defaults to true.
    devTools?: boolean | EnhancerOptions,
    // Same as current createStore.
    preloadedState?: State,
    // An optional array of Redux store enhancers
    enhancers?: ReduxStoreEnhancer[],
})
```

例子

```js
const store = configureStore({
  reducer: {
    config: configReducer,
    counter: counterReducer
  },
})
```

### 创建reducer

createReducer用了immer包装reducer，可以用js原生写法来写immutable的数据。

```js
const configReducer = createReducer(initialState, {
  currentQuestion: (state, action) => {
    state.currentQuestion = action.currentQuestion
  },
  uploadBackground: (state, action) => {
    let qu = state.questions[state.currentQuestion]
    qu.bg = action.src;
    qu = { ...qu }
    state.updateBackground = +new Date();// 为了让播放器端更新
  },
})

const counterReducer = createReducer(0, {
  increment: (state, action) => state.inc = action.payload,
  decrement: (state, action) => state.abc - action.abc
})
```


## 并发编程、网络编程
nodejs 并发编程：[资源1](https://segmentfault.com/a/1190000011086405)，[资源2](https://segmentfault.com/a/1190000011447510)，[资源3](http://myfjdthink.com/2018/01/16/node-js-%E5%B9%B6%E5%8F%91%E6%A8%A1%E5%9E%8B/)

## 其他
[API网关](https://juejin.im/post/5d4846e26fb9a06ae3724744)

## css module的composes在vscode中有警告
在vscode的配置文件中加这个：
```
"css.lint.unknownProperties": "ignore"
```

## 前端水平

前端水平全看node.js、webpack、rollup、react、vue等生态链和框架的原理和实现细节的了解

## wsl

window 10 子linux系统

### 修改root密码

使用普通给用户密码切换到root，在使用passwd修改密码

```
sudo su
passwd root
```

## ubuntu 安装python3

1. wget http://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz
1. tar -xvzf Python-3.7.4.tgz
1. cd Python-3.7.4
1. ./configure --with-ssl
1. make
1. sudo make install

## audio音频

使用new Audio 或者audio标签时，如果直接进行audio.play()的操作时，可能会报错。因为音频文件还没有准备好播放。应该这样处理音频的播放。

```js
audio.oncanplaythrough = function () {
  audio.play();
}
```

## svg的image元素

```js
<image 
  fill="#000000" 
  x={x} y={x}
  width={w} height={h} 
  preserveAspectRatio="none"
  xlinkHref={mark.point.image} 
/>
```

## stackoverflow的数据

在[这个网站](https://archive.org/details/stackexchange)有它的数据包，可以下载。

[这里](https://stackoverflow.blog/2014/01/23/stack-exchange-cc-data-now-hosted-by-the-internet-archive/)还介绍了另外一个可以输入sql进行查询的网站。

有了这些资源就可以拿到想要的数据了。

下载的数据是xml的格式，体积很大。

可以用python的xml.sax进行解析。

使用这个demo就可以解析了。
```python
import xml.sax

class InkscapeSvgHandler(xml.sax.ContentHandler):
    def startElement(self, name, attrs):
        if name != "svg":
            line = ""
            for (k, v) in attrs.items():
                line += (k + " " + v+",")
            print("line:" + line)

parser = xml.sax.make_parser()
parser.setContentHandler(InkscapeSvgHandler())
parser.parse(open("Votes.xml", "r", encoding='utf-8'))
```


## css滤镜

```css
filter: grayscale(100%);
```

## sass继承

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```
