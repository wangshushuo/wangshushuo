---
title: Java执行shell命令
date: 2020-01-18T17:53:17+08:00
---
## 添加依赖

首先使用`Spring Boot`开启一个`RESTful`项目，额外的加上`Apache Commons Exec`的依赖。

> Exec官网[^1]，[API文档](https://commons.apache.org/proper/commons-exec/apidocs/index.html)

```xml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-exec</artifactId>
    <version>1.3</version>
</dependency>
```

## 代码实现

这里分两种情况。一个是最简的只关心执行是否成功，也就是code大于0为失败；另一个是需要拿到执行的标准输出和错误的信息。

### 只关心是否成功

```java
@Service
public class MainService {
    public Integer updateBlogFromGit(){
        // 1
        CommandLine pull = CommandLine.parse("git pull");

        // 2
        DefaultExecutor executor = new DefaultExecutor();
        executor.setWorkingDirectory(new File("/home/ubuntu/blog"));

        // 3，省略try_catch
        int exitValue = executor.execute(pull);
        if (exitValue == 0) {
            exitValue = executor.execute(hugo);
        }
        return exitValue;
    }
}
```

1. 准备要运行的shell命令
1. 创建执行器，并设置工作目录
1. 最后执行命令，返回code

### 要拿到标准输出和错误的信息

```java
@Service
public class MainService {
    public String updateBlogFromGit(){
        // 1
        CommandLine pull = CommandLine.parse("git pull");
        CommandLine hugo = CommandLine.parse("hugo");

        // 2
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ByteArrayOutputStream errorStream = new ByteArrayOutputStream();
        PumpStreamHandler streamHandler = new PumpStreamHandler(outputStream, errorStream);

        // 3
        DefaultExecutor executor = new DefaultExecutor();
        executor.setWorkingDirectory(new File("/home/ubuntu/blog"));
        executor.setStreamHandler(streamHandler);

        // 4
        try {
            int exitValue = executor.execute(pull);
            if (exitValue == 0) {
                exitValue = executor.execute(hugo);
            }
            String result;
            if(exitValue==0){
                result= outputStream.toString();
            } else {
                result = errorStream.toString();
            }
            return result;
        } catch (ExecuteException e) {
            return errorStream.toString();
        } catch (IOException e) {
            return e.getMessage();
        }
    }
}
```

1. 准备要运行的shell命令
1. 准备接收标准输出和错误的Stream
1. 创建执行器，并设置工作目录，设置StreamHandler
1. 最后执行命令（如果执行时出错会返回大于0的整数），返回标准输出或错误信息或报错堆栈信息

## 收获

技能树：
```
后端 --> Java --> 工具库 --> Exec --> 使用
后端 --> Java --> 语言基础 --> ByteArrayOutputStream --> 使用
```

## 其他相关内容

- [使用systemd启动关闭Java程序](https://wowfriday.cn/posts/linux-base/#%E4%BD%BF%E7%94%A8systemd%E5%90%AF%E5%8A%A8%E5%85%B3%E9%97%ADjava%E7%A8%8B%E5%BA%8F)
- [配置Nginx](https://wowfriday.cn/nginx.html#%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86%E9%85%8D%E7%BD%AE)

---

[^1]: Exec官网 <https://commons.apache.org/proper/commons-exec/>