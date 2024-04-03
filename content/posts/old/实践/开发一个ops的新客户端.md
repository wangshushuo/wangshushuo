---
title: 开发一个ops的新客户端

date: 2021-11-20T17:51:17+08:00
description: 摘要，显示在meta的description中
categories:
- 分类
tags:
- 显示在底部
keywords:
- aa
---

ops系统现在的网站是运维做的，不大好用。我打算重新做一个好用些的。以环境为视角展开各种功能和信息。

除了改善易用性，还想练习一下Go的相关技术，比如grpc。

首先看一下数据结构

``` 
{
 "code": 0,
 "count": 26502,
 "data": {
  "envList": [
   "nx-temp16",
  ],
  "record": [
   {
    "allowRollback": "false",
    "appsbranch": null,
    "backupDbTime": "",
    "backupid": 24332,
    "complate_at": null,
    "created_at": "2021-11-20T16:26:25.475",
    "created_by": "\u9648\u96ef\u9759",
    "deployType": "oneclockDeploy",
    "id": 26571,
    "keyenv": "nx-hotfix",
    "logfile": "ocdeploy_nx-hotfix_20211120162625",
    "pipeline": "",
    "status": "running",
    "targetjob": "[\"trek\", \"h5\", \"web\", \"authapp\"]",
   }
  ],
  "serverList": []
 },
 "msg": "\u83b7\u53d6\u6570\u636e\u6210\u529f"
}
```