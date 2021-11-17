---
title: Protocol-Buffer
url: /Protocol-Buffer.html
date: 2021-11-11T13:00:13+08:00
description: 摘要，显示在meta的description中
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---

参考资料：
1. https://developers.google.com/protocol-buffers/docs/gotutorial
2. https://developers.google.com/protocol-buffers/docs/reference/go-generated#package

## 内容
1. 根据自己的需要，定义protocol buffer，定义请求、相应、service。
1. protoc生成grpc.go和pb.go文件
1. 实现grpc的service接口
1. 调用service实现

```protocolbuffer
syntax = "proto3";
package tutorial; // 定义报名，避免命名冲突

option go_package="/services";

import "google/protobuf/timestamp.proto";

message Person {
  string name = 1; // 
  int32 id = 2;  // Unique ID number for this person.
  string email = 3;

  enum PhoneType {
    MOBILE = 0;
    HOME = 1;
    WORK = 2;
  }

  message PhoneNumber {
    string number = 1;
    PhoneType type = 2;
  }

  repeated PhoneNumber phones = 4;

  google.protobuf.Timestamp last_updated = 5;
}

// Our address book file is just one of these.
message AddressBook {
  repeated Person people = 1;
}
```
每个元素上的“= 1”、“= 2”标记标识字段在二进制编码中使用的唯一“标签”。标记数字 1-15 需要比更高数字少一个字节来编码，因此作为一种优化，您可以决定将这些标记用于常用或重复的元素，而将标记 16 和更高的标记用于不太常用的可选元素。重复字段中的每个元素都需要重新编码标签编号，因此重复字段特别适合这种优化。


下载protoc ：https://github.com/protocolbuffers/protobuf/releases/tag/v3.19.1

## protoc生成grpc.pb.go和pb.go文件
安装插件：
```shell
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.26
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.1
```

生成grpc和pb.go两个文件：
```shell
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    helloworld/helloworld.proto
```

- `option go_package="/services"` 会将生成的文件当作go的一个package，名字为services
- `--go_out=.` 在当前目录下生成pb.go文件

## 实现grpc的service接口

```go
// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}
```
pb为生成的pb.go包名，UnimplementedGreeterServer为pb.go中实现了server的结构体，将它委托到我们的server结构体中，相当于我们的server结成了它。然后实现我们自己的SayHello方法即可完成server的开发。、

----
Go语言高级编程
## 安全认证
4.5.1，4.5.2

## 截取器
4.5.3