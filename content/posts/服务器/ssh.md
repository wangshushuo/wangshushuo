---
title: SSH

date: 2020-03-31T08:37:31+08:00
toc: true
summary: 在自己的电脑上生成公钥、密钥。公钥放在远程服务器上，密钥在自己电脑里不用管。连接远程服务器时就不用输入密码了。
categories:
- 服务器
---

在自己的电脑上生成公钥、密钥。公钥放在远程服务器上，密钥在自己电脑里不用管。连接远程服务器时就不用输入密码了。

## 安装

新装的系统可能没有ssh服务，需要自己安装
```
sudo apt-get install openssh-server
```

## 配置

新安装的 `ssh server` 需要一点配置：开启密码登录，开启公钥登录。
1. 编辑配置文件
    ```
    sudo vim /etc/ssh/sshd_config
    ```
2. 开启密码登录、公钥登录
    ```
    PasswordAuthentication yes
    PubkeyAuthentication yes
    ```
3. 重启 `ssh server`
    ```
    service ssh reload {{< tag 退出vim重启ssh >}}
    ```
  
## 生成key
```shell
ssh-keygen -t rsa
```

## 复制公钥

将本机的公钥copy到远程机器
```shell
ssh-copy-id username@remote_host_B
```
然后输入密码。

> 该命令会把本机的公钥复制到远程机器的 .ssh/authorized_keys 文件中。

## 登陆服务器

配置好公钥以后就可以使用如下命令登录了。
```shell
ssh username@hostname
```

## 配置别名

每次都使用 `ssh username@hostname` 登录会有点麻烦，可以通过配置将命令简化。比如下面的配置，可以将登录的命令简化为 `ssh azu` 。配置文件为 `~/.ssh/config` 。
```
Host azu
   HostName 192.168.1.5
   User azu
   IdentityFile /homt/xx/.ssh/id_rsa
```

## alias命令
在终端中定义缩写的命令，比如：    
```
alias totx='ssh username@hostname'
```
这样就可以使用`totx`命令直接登陆远程服务器了，但是alias命令会在重启终端时

## 永久保留alias命令
每次登陆时.bash_profile文件是会自动执行，此过程会调用.bashrc，将alias命令写入.bashrc文件就可以将alias命令永久生效了。（如果没有此文件就创建一个）

## 报错

```
WARNING: UNPROTECTED PRIVATE KEY FILE!
Permissions 0644 '' are too open.
...
```

我装了window是10和ubuntu双系统，将windows的一个公钥文件复制到ubuntu后，使用ssh的config配置了它。在使用ssh登录时，就报了这个错。

是文件权限的问题，改成只读的权限即可解决。
```
chmod 400 ～/.ssh/id_rsa
```

## 指定私钥(证书)登录

```bash
ssh name@6.6.6.6 -i ./identity_file.pem

scp -i ./identity_file.pem file_a name@1.1.1.1:~/
```

## 配置密钥文件 

通常使用ssh生成的秘钥文件名是“id_rsa”，通常这一对公钥私钥也是够用的。如果有第二份秘钥的话（腾讯云生成的），需要一个"config"文件。
该文件存放在".ssh"目录下（不需要后缀扩展名），内容为：
```
Host 128.128.666.666
   IdentityFile C:\Users\anrui\.ssh\pc_pc  
```