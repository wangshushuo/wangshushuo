---
date: 2020-01-16T23:55:23+08:00
url: /Spring探索与扫盲.html
title: Spring探索与扫盲
categories:
- spring
tags:
- 入门
- Java
---

刚刚接触Spring，感觉它是一个庞大的体系，内容很多。现在想要对它有一个总体的、感性的认识和了解。首先从官网入手。

spring.io官网下的第一个目录——projects，里面列举了Spring的项目。打开一个项目可以看到它的介绍，学习资料，文档，示例。

第二个目录是guides，里面包含很多的、各个方面的入门引导，这些入门引导都是很简单的。下面还有两个模块——Topical Guides和Tutorials，这两部分稍微长一点，比第一部分要详细一些、内容多一些。

第三个目录是一些付费的培训和认证。

## Projects

### Spring Framework，必学

这个应该是通常说到Spring时代表的Spring本人。

> Spring框架可在任何类型的部署平台上为基于Java的现代企业应用程序提供全面的编程和配置模型。

> Spring的一个关键元素是在应用程序级别的基础架构支持：Spring专注于企业应用程序的“管道”，以便团队可以专注于应用程序级别的业务逻辑，而不必与特定的部署环境建立不必要的联系。

### Spring Data，要学

[网址](https://spring.io/projects/spring-data)

它包含了所有数据存储的子项目，JDBC、JPA、MongoDB、Redis、REST，他们都被这个项目封装了，可以用一致的API使用。

> Spring Data的任务是为数据访问提供一个熟悉且一致的，基于Spring的编程模型，同时仍保留基础数据存储的特​​殊特征。

> 它使使用数据访问技术，关系和非关系数据库，map-reduce框架以及基于云的数据服务变得容易。这是一个总括项目，其中包含许多特定于给定数据库的子项目。这些项目是通过与这些令人兴奋的技术背后的许多公司和开发人员共同开发的。


### Spring Security，要学

这个应该是用来做登录、权限管理的。下面是机翻介绍和特性。

> Spring Security是一个功能强大且高度可定制的身份验证和访问控制框架。它是用于保护基于Spring的应用程序的实际标准。

> Spring Security是一个框架，致力于为Java应用程序提供身份验证和授权。与所有Spring项目一样，Spring Security的真正强大之处在于可以轻松扩展以满足自定义要求

#### 特性

- 对身份验证和授权的全面且可扩展的支持
- 防御会话固定，点击劫持，跨站点请求伪造等攻击
- Servlet API集成
- 与Spring Web MVC的可选集成


### Spring REST Docs，可能要学

貌似是用来生成RESTful服务的文档的。

> Spring REST Docs可帮助您记录RESTful服务。

> 它结合了用Asciidoctor编写的手写文档和Spring MVC Test生成的自动生成的代码片段。这种方法使您摆脱了Swagger之类的工具所产生的文档限制。

> 它可以帮助您生成准确，简洁且结构合理的文档。然后，该文档可让您的用户以最少的麻烦获得他们所需的信息。

### Spring Cloud，要学

官方介绍的机翻如下，可以用来搭建微服务系统。

> Spring Cloud为开发人员提供了工具，以快速构建分布式系统中的某些常见模式（例如，配置管理，服务发现，断路器，智能路由，微代理，控制总线，一次性令牌，全局锁，领导选举，分布式会话，群集状态）。分布式系统的协调导致样板式样，并且使用Spring Cloud开发人员可以快速站起来实现这些样板的服务和应用程序。它们可以在任何分布式环境中正常工作，包括开发人员自己的笔记本电脑，裸机数据中心以及Cloud Foundry等托管平台。

### Spring AMQP，可能要学

消息队列服务

**AMQP维基百科**

> 高级消息队列协议即Advanced Message Queuing Protocol（AMQP）。高级消息队列协议是一种二进制应用层协议，用于应对广泛的面向消息应用程序的支持。协议提供了消息流控制，保证的一个消息对象的传递过程，如至多一次、保证多次、仅有一次等，和基于SASL和TLS的身份验证和消息加密.

> 是面向消息中间件提供的开放的应用层协议，其设计目标是对于消息的排序、路由（包括点对点和订阅-发布）、保持可靠性、保证安全性[1]。AMQP规范了消息传递方和接收方的行为，以使消息在不同的提供商之间实现互操作性，就像SMTP，HTTP，FTP等协议可以创建交互系统一样。与先前的中间件标准（如Java消息服务）不同的是，JMS在特定的API接口层面和实现行为上进行了统一，而高级消息队列协议则关注于各种消息如何以字节流的形式进行传递。因此，使用了符合协议实现的任意应用程序之间可以保持对消息的创建、传递。

**Spring AMQP项目官方介绍的机翻**

> Spring AMQP项目将Spring的核心概念应用于基于AMQP的消息传递解决方案的开发。它提供了一个“模板”作为用于发送和接收消息的高级抽象。它还通过“侦听器容器”为消息驱动的POJO提供支持。这些库有助于AMQP资源的管理，同时促进对依赖项注入和声明性配置的使用。在所有这些情况下，您将看到与Spring Framework中的JMS支持相似的地方。

> 该项目包括两个部分；spring-amqp是基础抽象，spring-rabbit是RabbitMQ实现。

### Spring Batch，可能要学

批处理框架，公司的什么业务需要批处理呢？日志？统计？比如搞一个服务分析nginx的access.log，看一下访问日志，哪些资源被访问的多？

> 一个轻量级，全面的批处理框架，旨在支持开发对企业系统的日常运行至关重要的强大的批处理应用程序。

> Spring Batch提供了可重用的功能，这些功能对于处理大量记录至关重要，包括日志记录/跟踪，事务管理，作业处理统计信息，作业重新启动，跳过和资源管理。它还提供了更高级的技术服务和功能，这些功能和功能将通过优化和分区技术来实现极高容量和高性能的批处理作业。无论简单还是复杂，大批量处理作业，都可以以高度可扩展的方式利用框架来处理大量信息。

### Spring Web Flow，可能要学

> Spring Web Flow建立在Spring MVC之上，并允许实现Web应用程序的“流”。流程封装了一系列步骤，这些步骤指导用户完成某些业务任务。它跨越多个HTTP请求，具有状态，处理事务数据，可重用，并且本质上可以是动态的并且可以长期运行。

> Spring Web Flow的最佳选择是具有导航功能的状态Web应用程序，例如，登机，申请贷款，购物车结帐，甚至向表单添加确认步骤。这些方案的共同点是以下一个或多个特征：

- 有一个明确的起点和终点。
- 用户必须按特定顺序浏览一组屏幕。
- 直到最后一步，更改才能最终确定。
- 完成后，就不可能意外重复交易

### Spring for Apache Kafka，可能要学

好像也是消息队列，或者数据处理引擎。

> 用于Apache Kafka的Spring（spring-kafka）项目将核心Spring概念应用于基于Kafka的消息传递解决方案的开发。它提供了一个“模板”作为发送消息的高级抽象。它还支持带有@KafkaListener注释和“侦听器容器”的消息驱动的POJO 。这些库促进了依赖注入和声明式的使用。在所有这些情况下，您将看到与Spring框架中的JMS支持和Spring AMQP中的RabbitMQ支持相似。

### Spring Flo，可能有用

貌似可以做类似流程图的前端页面。

> Spring Flo是一个JavaScript库，为管道和简单图形提供了一个基本的可嵌入HTML5可视生成器。该库用作Spring Cloud Data Flow中流构建器的基础。

> Flo包括集成流设计器的所有基本元素，例如连接器，控制节点，调色板，状态转换和图形拓扑-重要的是，它具有文本外壳，DSL支持和设计用于创建和查看全面工作流程的图形画布。

### Spring Shell，可能有用

gitee上传了代码，触发webhook，接口需要执行一个shell命令来打包博客。在java程序中执行shell命令是用这个项目？

> Spring Shell项目提供了一个交互式Shell，使您可以使用基于Spring的编程模型来插入自己的自定义命令。

### Spring LDAP，暂时不学

不知道应用场景。

**百度百科**
> 轻型目录访问协议（英文：Lightweight Directory Access Protocol，缩写：LDAP，/ˈɛldæp/）是一个开放的，中立的，工业标准的应用协议，通过IP协议提供访问控制和维护分布式信息的目录信息。

**官方介绍机翻**
> Spring LDAP是一个用于简化Java中LDAP编程的库，其建立原理与Spring Jdbc相同。

> LdapTemplate类封装了传统LDAP编程中涉及的所有管道工作，例如创建，遍历NamingEnumerations，处理Exception和清理资源。这使程序员可以处理重要的事情-在何处查找数据（DN和筛选器）以及如何处理数据（与域对象进行映射，绑定，修改，取消绑定等），方法与JdbcTemplate缓解的方法相同除了实际的SQL之外的所有程序员，以及数据如何映射到域模型。

### Spring HATEOAS，暂时不学

[介绍文章](https://www.ibm.com/developerworks/cn/java/j-lo-SpringHATEOAS/index.html)

> HATEOAS（Hypermedia as the engine of application state）是 REST 架构风格中最复杂的约束，也是构建成熟 REST 服务的核心。

RESTful架构的最高（最牛叉）层次就要使用HATEOAS。

> 第四个层次（Level 3）的 Web 服务使用 HATEOAS。在资源的表达中包含了链接信息。客户端可以根据链接来发现可以执行的动作。

Spring HATEOAS的介绍

> 当使用Spring特别是Spring MVC时，Spring HATEOAS提供了一些API来简化创建遵循HATEOAS原理的REST表示形式的API。它试图解决的核心问题是链接创建和表示组装。

HATEOAS跟“链接”很有关系，一般的RESTful返回结果都只是JSON数据，HATEOAS原理返回的数据还要包含“链接”，客户端可以使用链接做各种事。我还想象不到应用场景。

----
（下面都是不知道干嘛的，暂时不学）

### Spring Web Services，暂时不学

不知道是干嘛的，什么叫“文档驱动的Web服务(document-driven Web services)”，“SOAP服务”好像是“简单数据交换服务”

> Spring Web Services（Spring-WS）是Spring社区的产品，致力于创建文档驱动的Web服务。Spring Web Services旨在促进合同优先SOAP服务的开发，从而允许使用多种操作XML负载的方式之一来创建灵活的Web服务。该产品基于Spring本身，这意味着您可以将诸如依赖项注入之类的Spring概念用作Web服务的组成部分。

> 人们使用Spring-WS的原因有很多，但是大多数人在遵循Web服务最佳实践时发现缺乏替代的SOAP堆栈后才被吸引使用。Spring-WS使最佳实践变得容易。这包括诸如WS-I基本概要文件，合同优先开发之类的实践，以及合同与实施之间的松散耦合。

### Spring Integration，暂时不学

Integration是整合的意思，Spring Cloud Stream项目基于Spring Integration，其中Spring Integration用作消息驱动的微服务的引擎。貌似是用来整合各种服务的。

这里还有一个用它实现分布式锁的[例子](https://www.cnblogs.com/xuwenjin/p/10681187.html#commentform)

### Spring Cloud Data Flow，暂时不学

官方介绍的机翻，现在还不理解。
> 用于Cloud Foundry和Kubernetes的基于微服务的流式处理和批处理数据处理。
>
> Spring Cloud Data Flow提供了用于为流和批处理数据管道创建复杂拓扑的工具。数据管道包含使用Spring Cloud Stream或Spring Cloud Task微服务框架构建的Spring Boot应用程序。
> 
> Spring Cloud Data Flow支持从ETL到导入/导出，事件流和预测分析的一系列数据处理用例。

