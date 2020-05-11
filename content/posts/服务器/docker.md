---
title: docker
url: /docker.html
date: 2019-06-06T01:47:46+00:00
toc: true
categories:
- api
- 工具
---

## ubuntu安装docker

使用清华源安装，[地址](https://mirror.tuna.tsinghua.edu.cn/help/docker-ce/)，按照文档操作即可。

## 设置docker源为阿里镜像

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://2sjdzxnu.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 操作

进入 container 

```
docker exec -it container-name/id /bin/sh
```
最后的 `/bin/sh` 可以换成 `/bin/bash`

## tensorflow

系统ubuntu 18.04，显卡Gtx950，驱动390。 

1. 安装`nvidia-docker`和`nvidia-container-runtime`    

```shell
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | \
  sudo apt-key add -
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-docker.list
sudo apt-get update
```

```shell
sudo apt-get install -y nvidia-docker2=2.0.3+docker18.09.1-1 nvidia-container-runtime=2.0.0+docker18.08.1-1
sudo pkill -SIGHUP dockerd
```

测试一下

`docker run --runtime=nvidia --rm nvidia/cuda:9.0-base nvidia-smi`

[如果报错`docker: Error response from daemon: Unknown runtime specified nvidia.`][issue0]

解决方法：
> Systemd drop-in file
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo tee /etc/systemd/system/docker.service.d/override.conf <<EOF
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd --host=fd:// --add-runtime=nvidia=/usr/bin/nvidia-container-runtime
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
Daemon configuration file
sudo tee /etc/docker/daemon.json <<EOF
{
    "runtimes": {
        "nvidia": {
            "path": "/usr/bin/nvidia-container-runtime",
            "runtimeArgs": []
        }
    }
}
EOF
> sudo pkill -SIGHUP dockerd
再次测试。

2. 安装tensorflow的docker，[由于驱动旧，不能使用最新的tensorflow版本][issue1]，就先用1.11.0版本。还要用python3，所以安装的docker image是这个`sudo docker pull tensorflow/tensorflow:1.11.0-gpu-py3`

```shell
sudo docker run -p 8888:8888 --volume "$PWD":/notebooks --runtime=nvidia -it tensorflow/tensorflow:1.11.0-gpu-py3
```

启动后会直接打开一个jupyter，可以先做一下gpu的测试。 
这样就算是搭号GPU环境了。 

但是这个环境中没有安装opencv-python或者opencv-contrib-python，也没有～/.keras/modelsinception_v3_weights_tf_dim_ordering_tf_kernels_notop.h5文件。

这里可能需要自己再打包一个image，可以参考这个[链接][link1]  
还可以试一下用映射解决

`--volume`为“映射”，当前目录（$PWD）中的文件，会反映容器中个的`/notebooks`目录下。  
tensorflow这个image会启动一个jupyter，其中就可以访问到`$PWD`目录。

[issue1]:https://github.com/NVIDIA/nvidia-docker/issues/931
[issue0]:https://github.com/NVIDIA/nvidia-docker/issues/578
[link1]:https://blog.csdn.net/chenming_hnu/article/details/70184543

## 腾讯云的docker仓库
[Tencent Hub]:https://console.cloud.tencent.com/tencenthub/repo  
[文档]:https://cloud.tencent.com/document/product/857/18201  
账号w..........  
密码w...1......

`docker image build -t site . `  

方案1：使用`hugo`命令手动将也构建到public目录，然后启动docker是映射目录  
`sudo docker container run --rm --name myblog -p 80:80 -p 443:443 --volume "$PWD/public":/usr/share/nginx/html site`

方案2：使用`hugo server -D`命令运行测试服务器，修改nginx的default.conf文件，加入反向代理配置。


登录腾讯云 docker registry  

`sudo docker login --username=wangshushuo hub.tencentyun.com`   
登录 registry 的用户名是您 Tencent Hub 的用户名，密码是您开通   Tencent Hub 用户时设置的密码。
  
从 registry 拉取镜像  

`sudo docker pull hub.tencentyun.com/wangshushuo/site:[tag]`  

其中 [tag] 请根据您的镜像版本信息进行填写。  

将镜像推送到 registry

```shell
sudo docker tag [ImageId] hub.tencentyun.com/wangshushuo/site:[tag]

sudo docker login --username=wangshushuo hub.tencentyun.com
sudo docker tag site hub.tencentyun.com/wangshushuo/site
sudo docker push hub.tencentyun.com/wangshushuo/site
```

## 加速image文件上传到云服务器。

云服务器的快带只有1m，我猜测上传速度会很慢，一个image文件有七八十兆，可能要上传很久。

腾讯云有免费的docker仓库，可以上传image文件。

再从腾讯云服务器pull image文件，就很快。

## 将wordpress的nginx配置改掉了

docker开启在8080端口，修改了原来wp的配置为：

```conf
server {
  listen 80;
  listen 443 ssl http2;
  ssl_certificate /usr/local/nginx/conf/ssl/1_wowfriday.cn_bundle.crt;
  ssl_certificate_key /usr/local/nginx/conf/ssl/2_wowfriday.cn.key;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
  ssl_prefer_server_ciphers on;
  ssl_session_timeout 10m;
  ssl_session_cache builtin:1000 shared:SSL:10m;
  ssl_buffer_size 1400;
  add_header Strict-Transport-Security max-age=15768000;
  ssl_stapling on;
  ssl_stapling_verify on;
  server_name wowfrday.cn;
  access_log /data/wwwlogs/wowfrday.cn_nginx.log combined;
  index index.html index.htm index.php;
  root /data/wwwroot/wowfrday.cn/;

  if ($ssl_protocol = "") { return 301 https://$host$request_uri; }
  

  location /{
    proxy_pass https://localhost:8080;
  }
}
```

## phpmyadmin

```
docker run --name myphpadmin -d -e PMA_ARBITRARY=1 -p 8080:80 phpmyadmin/phpmyadmin
```
