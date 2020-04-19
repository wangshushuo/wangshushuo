---
title: Fetch 与 Axios
date: 2019-07-17T10:27:44+00:00
categories:
- 前端
tags:
- api

---
原文：[使用Fetch][1] 、[axios文档][2]

# 什么是 fetch ？

以前通过JS进行网络请求都是使用`ajax`也就是`XMLHttpRequest`实现的。如果用原生方式实现起来比较麻烦。

`Fetch API`是浏览器提供的一个代替`XMLHttpRequest`的新方法。

## 怎么使用 fetch ？

最简单的形式：

```js
fetch('http://example.com/movies.json')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  console.log(myJson);
});
```
⚠️需要注意:
1. `fetch()`方法返回的是`promise`。
2. 当`Http状态码`是`404`或者`500`时也是`resolve`，但是会将`resolve`的返回值的`ok`属性设置为`false`。
3. 只有当网络故障或者请求被阻止时才会是`reject`。
4. `resolve`中进行`response.json()`才能拿到返回数据。

## 怎么设置 method、header等参数呢？

fetch() 方法接受第二个可选参数——一个对象——用来设置请求的参数：

```js
fetch(url, {
  body: JSON.stringify(data), // must match 'Content-Type' header
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, same-origin, *omit
  headers: {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json'
  },
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, cors, *same-origin
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // *client, no-referrer
})
```
⚠️`credentials: 'include'` 这个字段可以让请求带上 cookie 。

## 上传JSON数据

⚠️需要设置`header`的`'Content-Type': 'application/json'`

```js
fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: new Headers({
    'Content-Type': 'application/json'
  })
})
```

## 上传文件

⚠️需要使用`FormData`类作为`request`的`body`

```js
var formData = new FormData();
var fileField = document.querySelector("input[type='file']");

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
  method: 'PUT',
  body: formData
})
```

# 什么是 axios ？

它是一个库，可以用`Promise`的方式进行网络请求。

## 怎么使用 axios ？

### 最简单的几种方式

```js
// get请求1
axios.get('/user?ID=12345').then();
// get请求2
axios.get('/user',{
  params:{id:12345}
}).then();
// post请求
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
})
```

### 同时进行多个请求

几个请求都成功后，进行后续操作

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
```

### 使用`async/await`

```js
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

### 创建实例——统一配置、设置，统一处理请求、响应

```js
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: {'Authorization': 'foobar'},
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    return data;
  }],
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],
});
```
注意⚠️

1. 没有transformResponse属性时，resopnse中的data是一个对象。
2. 加了transformResponse属性后（即便它是空的方法），resopnse的data会变成字符串。
3. 如果想对response做统一处理，可以在拦截中做。

### 拦截响应或请求

这里的data会受到上面的transformResponse影响，不加的时候就是对象

```js
// 响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.data.error === 1500) {
        console.warn('ed_token失效，error code:1500');
        window.localStorage.removeItem('ed_token')
        window.localStorage.removeItem('ed_user_info')
        document.dispatchEvent(new Event('authErrorAngToLogin'))
        // return Promise.reject(response.data);
    } else {
        response.data = response.data.data
    }

    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
```

初始的header的Authorization可能是无效的，需要在登录后更新

```js
my_axios.defaults.headers['Authorization'] = result.token;
```

### 上传文件

两点需要注意：
1. `file`文件对象使用`Form`类存放
2. `content-type`为`multipart/form-data`

```js
var formData = new FormData();
formData.set('file', file)
axios.post(
  'https://develop.com/upload',
  formData,
  {
    headers: {
      'Authorization': 'token',
      'Content-Type': 'multipart/form-data'
    }
  }
).then(res =>
    console.log(res.data)
)
```

### 取消请求

```js
const login = async (params, cancelToken) => {
  try {
    const response = await axios.post(`/user`, params, cancelToken);
    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      message.error(error.message);
    }
  }
},
```

其中cancelToken每次调用login时需要重新生成：
```js
const CancelToken = axios.CancelToken;// 可以全局一个
const source = CancelToken.source();// 每次请求都要时调用生成cancelToken
```

[1]: https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
[2]: https://github.com/axios/axios