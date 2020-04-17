---
title: Spring MVC与模版 thymeleaf 开发网站
date: 2020-02-25T23:39:38+08:00
categories:
- spring
---

## 一个简单的 controller 指向一个模版
```java
@GetMapping("/greeting")
public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name, Model model) {
    model.addAttribute("name", name);
    return "greeting";
}
```

`return "greeting"` 对应 `src/main/resources/templates/greeting.html` 

```html
<p th:text="'hello '+${name}"></p>
```

## Home Page，不需要配置

`src/main/resources/static/index.html` 

```html
<!DOCTYPE HTML>
<html>
<head>
    <title>Getting Started: Serving Web Content</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
<body>
    <p>Get your greeting <a href="/greeting">here</a></p>
</body>
</html>
```

## 配置 Spring MVC

```java
package com.example.securingweb;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/home").setViewName("home");
		registry.addViewController("/").setViewName("home");
		registry.addViewController("/hello").setViewName("hello");
		registry.addViewController("/login").setViewName("login");
	}

}
```