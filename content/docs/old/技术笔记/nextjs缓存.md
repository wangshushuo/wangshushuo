---
date: 2024-04-22
title: nextjs缓存
---
# nextjs缓存

遇到了一个缓存问题。

有一个列表页面和一个新建页面，新增一条数据后会返回到列表页，但是列表页中不显示新数据，怎么刷新不显示。

查了一下好像nextjs的全路由缓存机制(full-route-cache)[^1]，下面是列表也的代码。

```jsx
export default async function Page() {
   const notes = await prisma.markdownNote.findMany()
   return (
     <ClientList initData={notes} />
   )
}
```

先查到了用重新验证刷新缓存，revalidatePath方法，代码如下
```js
export const POST = async (
   request: any,
   context: { params: { id: string } }
) => auth(async (req) => {
   const body = await req.json();
   const user: MarkdownNote = await prisma.markdownNote.create({data: body});
   revalidatePath('/markdown/list')
   return Response.json(user)
})(request, context)
```

但是用了之后不但没解决问题，反而出现了另一个问题——水合。不过我没有仔细研究这个问题，可能是因为服务端刷新了缓存，但是客户端缓存没刷新，两边对不上了导致的。

然后又加了 prefetch 解决了水合问题，但是缓存还是没刷新。

```js   
router.prefetch('/markdown/list')
router.push('/markdown/list')
```

最后找到了动态渲染(dynamic-rendering)[^2]，大概意思是当页面中有动态函数[^3]时，页面就不是全路由缓存了，而是有效载荷和数据缓存。

在列表页加了读取 session 就好了，感觉应该是它内部使用了动态函数。

```js
export default async function Page() {
  const session = await auth();
  const userId = session?.user?.id
  const notes = await prisma.markdown_note.findMany({
    where: {
      userId: Number(userId)
    }
  })
  return (
    <ClientList initData={notes}/>
  )
}
```

现在问题就解决了。

后续要研究一下这部分的原理。

- 缓存机制
- 水合
- 有效负载



[^1]: 全路由缓存<https://nextjs.org/docs/app/building-your-application/caching#full-route-cache>

[^2]: 动态渲染<https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering>

[^3]: 动态函数<https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-functions>

