---
title: Grpc
url: /Grpc.html
date: 2022-08-14T17:03:12+08:00
description: 摘要，显示在meta的description中
categories:
- Golang
tags:
- Golang
- grpc
---

##前端使用grpc

https://github.com/timostamm/protobuf-ts

在项目中安装

    npm install @protobuf-ts/plugin

创建 protocol buffer 文件后，使用下面的命令生成 ts 文件。（pnpm exec也可以）
```
npx protoc --ts_out . --proto_path protos protos/msg-readme.proto
```
需要注意，npx 运行在项目根目录，所以上面命令中的目录都是相对于项目根目录的。其中 --ts_out 是生成在哪个目录，--proto_path 是pb文件所在目录，最后的文件目录，
是相对于项目根目录的相对路径。