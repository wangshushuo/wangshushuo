# 博客

## 更新主题

    ~/blog $ git submodule update --rebase --remote

If failed, try:

Delete meme folder, e.g.

    ~/blog $ rm -rf themes/meme

Clone MemE again

    ~/blog $ git clone --depth 1 https://github.com/reuixiy/hugo-theme-meme.git themes/meme


## 待修复项

- [ ] 年份和Posts的右上角，加一个数量的角标
- [ ] 自定义shortcodes的样式
- [ ] 分类页面，分类下不显示具体文章的列表，只显示数量
- [ ] 首页，footage and video
- [ ] 个人项目页面
- [ ] 跟随系统明暗自动切换模式
- [x] 安装为应用(https证书部署，已有证书)
- [ ] 搜索
- [ ] 新页面，常用


  ## Service Worker

    # 说明：仅在生产环境（production）下渲染

    enableServiceWorker = true


首页内容 `themes/meme/layouts/partials/pages/home-footage-posts.html`



下载项目 
```
git clone --recurse-submodules https://github.com/wangshushuo/wangshushuo.git
```

- [ ] 换图标fai
- [x] 行内code的深色模式的样式
- [x] 标题、引用字体更换
- [x] 标题hover时的错误样式
- [x] 文章列表处月份的翻译
- [ ] 完整显示代码块
- [ ] 文章内上下文章按钮的样式改成跟wowfriday一样的
- [ ] 过去2堆博客的文章都转移过来
> 内容梳理，分类规范，格式也要注意
- [ ] 写简历
- [ ] gitee 的 issue 和 wiki 折腾过来
- [ ] github pages + action 的文章
- [ ] spring security oauth2 的文章
- [ ] 定期从 github 往国内的仓库备份，以免被墙
- [ ] ◡ ヽ(`Д´)ﾉ ┻━┻ 其他

用 issue 写，与 gitee 的策略一样，研究用 action 把 issue 的内容生成文件，集成到博客中。
## 内容组织

section | categories 
:---:|:---:
前端 | js、css、html、dom、react 
后端 | java、spring 
服务器 | linux、nginx
基础 | 算法、网络（cors、tcp/ip）
工具 | ssh、git
心得 | 处理bug、
实践 | 博客服务、在线编辑hugo

tags
- api手册
- knowledge知识点讲解
- action几个知识点的应用
- experience经验心得

zzz
- section是大的分类（前端）
- category是细一点的分类（react，js，css）
- tags是一些属性（api handbook，knowledge知识点讲解，action几个知识点的应用，experience经验心得）

section是页面，其中展示category及其子文章，文章标题后显示tags，meta中设置keywords用于head标签（seo）。


使用section将posts分为前端、后端、服务器、工具等。
> section 是以目录划分，不是以 Front Matter 中的字段。（categories 和 tages 就是）

category 分为 css JavaScript HTML nginx java spring 等。

section与category会分别有页面去展示它们的列表及所属 posts 。

## 1

文章：posts目录下所有的文章，按年分组。

sections：posts目录下的section，在首页显示这几个sectin。显示每个section的名字、下属文章数量、下属文章的category列表及其各项文章数量

前端 | 39 | <--section | section列表
:---:|:---:|:---:|:---:
React | 10 | <--category | category列表
JavaScript | 15 | <--category | category列表
CSS | 7 | <--category |category列表 
