---
title: Spring Boot 中读取配置文件中的变量
date: 2020-01-18T17:57:27+08:00
summary: 在application.yml配置文件中加入自定义变量，然后在程序中读取他们。
categories:
- spring
keywords:
- 读取spring-boot配置
- 读取spring-boot环境变量
---

在application.yml中配置的变量，可以在代码中引用到。

## 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
    <version>2.2.0.RELEASE</version>
</dependency>
```

## 定义变量

application.yml文件中加入自定义的变量

```yml
my:
  name: wanngshushuo
```

## 对应的实体类

```java
@Component // 文档中没有这个注释，但是不写会报错
@ConfigurationProperties(prefix="my")
public class MyConfig {
    private String name;
    // getter setter
}
```

## 在代码中使用

```java
@RestController
public class MainController {

    private final MyConfig myConfig;

    MainService(MyConfig myConfig){
        this.myConfig = myConfig;
    }

    @GetMapping("/update")
    public String updateBlog(){
        return myConfig.getName();
    }
}
```