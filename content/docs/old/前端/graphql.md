---
title: GraphQl介绍
date: 2019-05-10T06:58:48+00:00
enclosure:
  - |
    /uploads/2019/05/屏幕录制-2019-05-07-下午11.36.17.mp4
    62174
    video/mp4
    
categories:
- 前端
tags:
- api

---
## 什么是GraphQL？

官网的介绍：一种用于API的查询语言。

通常说到API都是说调用，那查询API是什么操作呢？

大家都知道SQL，数据库的查询语言。其实gql和sql就有些相似。

比如sql是这样的语句：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-1.png" alt="" class="wp-image-356"   /> </figure> 

gql也是个语句，它可以写成这样：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-2.png" alt="" class="wp-image-357" /> </figure> 

他们都是一种查询语言，用一定的语法来描述你想要的数据。

上面的gql会返回一个json：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-3.png" alt="" class="wp-image-358"   /> </figure> 

这个查询语句就是GraphQL（gql）。

## GraphQL能干嘛？

知道了它是什么，还得了解它是做什么事的。

举个例子：

首先，我们要做一个需求，是一个这样的页面，里面有若干数据。<figure class="wp-block-image">

<img src="/uploads/2019/05/image-4-1024x212.png" alt="" class="wp-image-359"   /> </figure> 

这些数据由一个API接口返回：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-5.png" alt="" class="wp-image-360" /> </figure> 

后来需求变了，有些数据不需要显示了：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-6.png" alt="" class="wp-image-361"   /> </figure> 

那么API接口也可能做对应的变化。<figure class="wp-block-image">

<img src="/uploads/2019/05/image-7.png" alt="" class="wp-image-362"   /> </figure> 

这次是减字段，也可能是加字段。还可能要考虑兼容旧版本（APP或灰度），不改原来的API，通过加API来做新需求。  


这些修改不仅消耗时间和精力。长时间的积累，也会在前后端，出现很多冗余的字段，冗余的API。给项目积累了一些混乱和风险。

这时候GraphQL就能派上用场了。看下面的视频。上半部分是gql语句，下半部分是查询到的结果。<figure class="wp-block-image">

<img src="/uploads/2019/05/屏幕录制-2019-05-07-下午11.36.17.mp4" alt="" class="wp-image-363" /> </figure> 

我们看到，对于hero对象，gql可以只查询一个name字段，也可以查询3个字段。

如果用gql来查询API接口，是不是就能避免上面提到的“冗余的字段，冗余的API。混乱和风险。”

这里大致介绍了GraphQL能做的事。

## 实现

知道了GraphQL是什么和能做什么事，接下来该介绍怎么实现这个技术方案了。

我们知道sql查询的是数据库，我们运行一个sql语句需要在数据库服务器的环境。同样的运行一个gql也需要一个gql的服务器。

实现gql服务器前，需要先了解ji个gql的概念：schema和类型。

### gql的类型

GraphQl是通过**类型**系统来定义数据和行为。这些**类型**就需要通过schema语句定义的。先看一段schema语句：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-8-1024x570.png" alt="" class="wp-image-364"   /> </figure> 

使用type声明一个类型，图中有3个类型，其中**Query**和**Mutation**是原始类型，分别表示**查询**和**变更**，这两个类型内部就是定义查询和变更的行为。

**Book**类型是我们的数据类型，是自定义类型。

schema只是定义了数据类型和行为类型。有了类型，我们还需要根据类型执行不同的任务。执行这些任务的角色就叫解析器。

### Resolver解析器

解析器是行为类型的实现，它需要与数据库对接，来查询数据库。比如上面定义的Query和Mutation类型的实现：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-9-1024x644.png" alt="" class="wp-image-365"   /> </figure> 

这个解析器是通过MongoDB实现的：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-11-1024x302.png" alt="" class="wp-image-367"   /> </figure> 

所以具体的getAll和getById实际上都是执行的mongoDB的查询。

服务器上主要做这两件事，通过schema定义类型，和实现具体的解析器。

server的代码在这里<https://gitee.com/wss1942/appllo-serve.git>

这个server的实现用到了mongoDB数据库，需要自己安装，我是按照菜鸟的教程做的，很简单。

## 客户端（网页）

代码在这里<https://gitee.com/wss1942/apollo-client.git>

实现一个gql的客户端主要需要2部分，网络层和存储层。<figure class="wp-block-image">

<img src="/uploads/2019/05/image-12.png" alt="" class="wp-image-368"   /> </figure> 

用了client就可以执行gql语句进行查询了：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-13.png" alt="" class="wp-image-369"   /> </figure> 

还有变更：<figure class="wp-block-image">

<img src="/uploads/2019/05/image-14-1024x726.png" alt="" class="wp-image-370"   /> </figure>