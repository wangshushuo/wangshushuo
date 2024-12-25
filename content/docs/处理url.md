
```js
let baseUrl = 'https://example.com/api';
let url = new URL(baseUrl);
let params = new URLSearchParams();
params.append('param1', 'value1');
params.append('param2', 'value2');
url.search = params.toString();
console.log(url.href); 
// 输出: https://example.com/api?param1=value1&param2=value2
```

将params放入模板中使用时，它会自动toString

```
b = `a?${params}`
```

可以直接传构造参数，对于value会自动进行encodeURIComponent
```
a = new URLSearchParams({
    name: '{"a":"b"}',
    playUrl: "http://baidu.com?a=b&c=d"
})
b = `a?${a}`
// 'a?name=%7B%22a%22%3A%22b%22%7D&playUrl=http%3A%2F%2Fbaidu.com%3Fa%3Db%26c%3Dd'
```