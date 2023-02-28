---
title: Cheerio

date: 2019-01-25T01:20:58+00:00
author: 王书硕
categories:
- 后端

---
## 1.解析表格table

<pre class="wp-block-code"><code><tr class="listingTrailer">
	<td>
		</td><td colspan="2">Summa tillgodoräknade poäng:
		</td><td class="credits">10,5
		</td><td>
</td></tr></code></pre>

如果只是一段tr，cheerio不会识别，需要是一个完整的table才可以，而且table外面好像还有包一层div之类的东西，cheerio才能解析。

## 2.遍历

使用each方法可以return false跳出遍历：

<blockquote class="wp-block-quote">
  <p>
    To break out of the <code>each</code> loop early, return with <code>false</code>.
  </p>
  
  <cite><a href="https://cheerio.js.org/">https://cheerio.js.org/</a></cite>
</blockquote>

### 2.1. 使用this

使用this的话，要使用function函数，不能使用箭头函数。function函数的this指向tr。

<pre class="wp-block-code"><code>$('tbody tr').each(function(i, elem) {
	const id = $(this).data();
	console.log(id);
});</code></pre>

### 2.2. 使用箭头函数就别用this

因为this不会指向tr，所以要用回调函数的第二个参数。

<pre class="wp-block-code"><code>$('tbody tr').each((i, elem)=>{
	const id = $(elem).data();
	console.log(id);
});</code></pre>