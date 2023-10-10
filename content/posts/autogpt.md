---
title: Autogpt
date: 2023-10-10T22:56:46+08:00
categories:
- gpt
---
不支持windows，但支持wsl

python版本3.10以上

下面的脚本是从官网安装3.11
```sh
#!/bin/bash

# 更新源 和安装编译工具
sudo apt update
sudo apt install -y build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev wget pkg-config

export http_proxy=http://192.168.31.107:7890/
export https_proxy=$http_proxy

# 下载Python 3.11.6 源码
wget https://www.python.org/ftp/python/3.11.6/Python-3.11.6.tgz

# 解压
tar -zxf Python-3.11.6.tgz 

# 编译安装
cd Python-3.11.6
./configure --enable-optimizations
make -j 8
sudo make altinstall

# 输出Python版本确认
python3.11 -V
```

在把环境变量中的python版本改掉
```sh
#!/bin/bash

# 设置变量
PY_VERSION=3.11
PY_PATH=/usr/local/bin/python$PY_VERSION

# 1. 更新alternatives
sudo update-alternatives --install /usr/bin/python python $PY_PATH 1
sudo update-alternatives --install /usr/bin/python3 python3 $PY_PATH 1

# 2. 调整软链接 
sudo rm -f /usr/bin/python
sudo rm -f /usr/bin/python3
sudo ln -s $PY_PATH /usr/bin/python
sudo ln -s $PY_PATH /usr/bin/python3

# 3. 修改PATH优先级
echo "export PATH=$PY_PATH:\$PATH" >> ~/.bashrc
source ~/.bashrc

# 4. 测试版本
python --version
python3 --version
```

创建token要用老本的，tokens (classic)，并选repo权限