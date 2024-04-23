# promise

## promise状态
- pendding
- fulfilled
- rejected
## 转换
只能发生一次，且不可逆
未调resolve或reject时是pendding
## 静态方法
- resolve
- reject
- all，全部fulfilled才resolve
- race，第一个到settled状态的
- allSettled，全部settled不管reject和resolve
- any，第一个resolve状态的

## await/async
await是相当于把下面的代码放到了then的回调里。
async是相当于将函数放到了promise的构造函数里，resolve()之前。

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
