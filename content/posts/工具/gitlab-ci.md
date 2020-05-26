---
date: 2019-11-29T16:42:18+08:00
toc: true
url: "/Gitlab-Ci.html"
title: "使用Gitlab的Ci"
summary: 使用gitlab的ci/cd打包部署前端项目到oss对象存储
categories:
- 工具
---

# 需求

一个前端项目需要分别发布到线上的测试环境和生产环境。在打包步骤，利用CI的环境变量功能，分别配置不同的API地址、项目地址等。完成打包后，将其上传到阿里oss中，完成发布。

# 使用Gitlab CI/CD的准备工作

需要准备三个东西：`.gitlab-ci.yml` 文件定义CI的工作流程、Runner执行流程、阿里云OSS的SDK及上传程序用于部署。

## .gitlab-ci.yml文件

项目根目录下需要有一个 `.gitlab-ci.yml` 文件。

**声明流程**

```yml
stages:
  - install
  - build
```

`stages` 声明流程，这里就是包括 `install` 和 `build` 两个流程。这两个流程都做哪些工作呢？这里的声明相当于一个类型或者接口，需要在后面去实现它。

**实现流程**

```yml
job_name:
  stage: install
  script:
    - npm install
```

这个 `job` 就是实现 `stages` 中声明的 `install` 流程的，其中 `job_name` 随便写就是个名字，`stage` 字段是说这个 `job` 是实现的哪个接口。一个接口也可以被实现多次，但是要有条件区分开。

```yml
build_develop:
  stage: build
  variables:
    REACT_APP_BASE_UR: https://develop.edinnovaedu.com:35040/
    REACT_APP_LEARNBOT_URL: https://ng-api--dev.edinnovaedu.com/
  only:
    - develop
  script:
    - npm run build:dev
    - npm run deploy

build_production:
  stage: build
  variables:
    REACT_APP_BASE_URL: https://api-gray.v.edinnovaedu.com/
    REACT_APP_LEARNBOT_URL: https://api-gray.v.edinnovaedu.com
  only:
    - master
  script:
    - npm run build:gray
    - npm run deploy
```

上面的两个 `job`，都是 `build` 的实现，它们根据 `only` 字段定义的条件（分支名）做不同的工作。

**总结**

`总结一下，stages` 声明流程，总的流程是第一步执行 `install` ，第二步执行 `build`
![install-build][image1]

`job` 实现流程，多个 `job` 可以实现同一步流程。第一步执行 `install`；第二步执行 `build`，但是会根据条件去执行对应的那个实现。
![install-mutl-build][image2]

**变量**

在 job build_develop 中看到有一个 variables 字段，它定义了两个环境变量， npm run build 中会用到他们。

在 job 中声明的变量是局部变量，只在当前 job 中有效。还可以声明全局变量，写法一样，只是写的位置是与 stages 平级。

**缓存**

在执行不同的流程时，会清除掉.gitignore中的文件，比如 node_modules 就会每次都被删除。

```yml
cache:
  key: "$CI_COMMIT_REF_SLUG"
  paths:
    - node_modules/
```

上面这段是分支不同时才清除 node_modules ，同个分支的不同 job 间会保留/共享它。

## Runner

在`.gitlab-ci.yml`文件中定义好流程后，需要配置一个Runner来执行这些操作。它是一个软件，需要单独安装，可以安装在运行gitlab的机器上，也可以安装在另一台机器上。

**安装**

```shell
# For Debian/Ubuntu
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.deb.sh | sudo bash
$ sudo apt-get install gitlab-ci-multi-runner
```

**注册**

注册是为了把gitlab和runner连接。gitlab的项目的设置中会提供一个url和一个token

![runner][image3]

拿到了这两个东西，回到刚才安装了runner的电脑，开始注册runner。

```
sudo gitlab-ci-multi-runner register
```

然后依次输入URL、Token、名字、不用输入、shell，就完成了。

可以用 `sudo gitlab-ci-multi-runner list` 命令来查看各个 Runner 的状态。

有了`.gitlab-ci.yml`和 `runner` gitlab的`CI/CD`就可以工作了，默认的情况，每次上传`commit`都会触发`CI/CD`执行。

## 部署

我使用了阿里云的oss部署前端项目，所以只需要把打包后的文件上传到对应的目录即可。这里使用`oss`的`python sdk`来上传。

`python`程序放在了项目目录中，`runner`服务器也安装好了python和sdk。所以只需要运行`npm run deploy`执行`python`程序即可。

# 遇到的问题

由于gitlab项目配置错误，clone项目的url与实际url不同。在CI执行时，使用的是错误的URL导致无法clone项目而报错。

解决方法是Runner的配置文件。文档链接是**参考3**

`root`用户的配置文件在`/etc/gitlab-runner/config.toml`，可以为一个`runner`设置一个`clone_url`即可解决问题。

```toml
[[runners]]
  name = "ruby-2.1-docker"
  url = "https://CI/"
  token = "TOKEN"
  limit = 0
  executor = "docker"
  builds_dir = ""
  shell = ""
  environment = ["ENV=value", "LC_ALL=en_US.UTF-8"]
  clone_url = "http://gitlab.example.local"
```

[参考1](https://scarletsky.github.io/2016/07/29/use-gitlab-ci-for-continuous-integration/#cache-job-cache)
[参考2](https://docs.gitlab.com/ce/ci/variables/README.html#masked-variables)
[参考3](https://docs.gitlab.com/runner/configuration/advanced-configuration.html#the-global-section)

[image1]:/images/gitlab-ci-1.jpg
[image2]:/images/gitlab-ci-2.jpg
[image3]:/images/gitlab-ci-runner.png