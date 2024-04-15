问：promise有几种状态，可以重复改变吗
答：promise有三种状态，pendding、fulfilled、rejected分别表示未完成、已完成、已失败。状态改变只能发生一次切不可逆。只能从初始的pendding状态转换为fulfilled和rejected状态。
promise有两个静态方法用于创建已确定状态的promise对象，
还有promise.all, promise.race, promise.allSettled

```js
console.log(0);

async function fetchData() {
  console.log(1);
}

let a = await fetchData()
console.log(2);
```

上面的代码与下面的代码一样的效果。

```js
console.log(0);

function fetchData() {
  return new Promise((resolve) => {
    console.log(1);
    resolve(); // 模拟异步操作的解决
  });
}

fetchData().then(() => {
  console.log(2);
});

```
