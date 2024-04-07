---
title: 加载script标签
date: 2019-03-13T02:03:07+00:00
---
将script标签写在2个地方——head中和body中——进行观察：

head中，他们大概是同时开始加载，运行后，body中的才开始加载运行。也及时body中的，会等待head中的加载完成运行完毕后，才开始加载。也就是页面会阻塞。

    <figure class="wp-block-image">
      <img src="/uploads/2019/03/image-4-1024x409.png" alt="" class="wp-image-296"   /> 
    </figure> 

还有可能在head中编写一段js代码，它会在head中再添加几个script标签。就会出现下面的情况。

    <figure class="wp-block-image">
      <img src="/uploads/2019/03/image-5-1024x437.png" alt="" class="wp-image-297"   />
    </figure> 

第一部分是head中写死的，第二部分是JS添加到head中的，第三部分是写在body中的。

第二部分会开始加载，然后body中的不会等待第二部分加载完成，也就是JS添加的script不会阻塞页面。

当body中的script依赖了JS添加的script，就有可能出现找不到依赖报错的情况。

## defer async

**async** 异步加载资源，且加载完JS资源立即执行，并不会按顺序，谁快谁先上， 网页不会失去响应。

**defer** 异步加载资源，在DOM渲染后之后再按顺序执行JS。