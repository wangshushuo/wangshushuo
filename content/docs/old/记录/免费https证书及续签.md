# 免费https证书及续签

### 1. 安装Certbot

首先，确保系统已更新：

```sh
sudo yum update -y
```

然后安装EPEL仓库：

```sh
sudo yum install epel-release -y
```

接着安装Certbot：

```sh
sudo yum install certbot -y
```

### 2. 生成证书脚本

假设你使用的是Nginx或Apache作为Web服务器，以下是生成证书的脚本示例。这里以Nginx为例：

```sh
#!/bin/bash

# 设置域名
DOMAIN1="51wurenji.com"
DOMAIN2="admin.51wurenji.com"
EMAIL="your-email@example.com"  # 替换为你的电子邮件地址

# 停止Nginx服务
sudo systemctl stop nginx

# 生成证书
sudo certbot certonly --standalone --expand -d $DOMAIN1 -d $DOMAIN2 --email $EMAIL --agree-tos --non-interactive

# 启动Nginx服务
sudo systemctl start nginx

echo "SSL证书已生成并保存在 /etc/letsencrypt/live/$DOMAIN1/"
```

将上述脚本保存为 `generate_cert.sh`，并赋予执行权限：

```sh
chmod +x generate_cert.sh
```

### 3. 配置自动续约

使用cron作业来定期检查和续约证书。编辑cron作业：

```sh
sudo crontab -e
```

在打开的crontab文件中添加以下行：

```sh
0 2 * * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
```

这行命令表示每天凌晨2点运行Certbot的续约命令，并在续约成功后重新加载Nginx服务。

### 4. 配置Nginx使用生成的证书

编辑Nginx的配置文件以使用生成的SSL证书。例如，编辑 `/etc/nginx/conf.d/your_site.conf`：

```nginx
server {
    listen 80;
    server_name 51wurenji.com admin.51wurenji.com;

    # 重定向所有HTTP请求到HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name 51wurenji.com admin.51wurenji.com;

    ssl_certificate /etc/letsencrypt/live/51wurenji.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/51wurenji.com/privkey.pem;

    # 其他Nginx配置...
}
```

### 5. 测试配置并重新加载Nginx

检查Nginx配置是否正确：

```sh
sudo nginx -t
```

如果配置正确，重新加载Nginx：

```sh
sudo systemctl reload nginx
```

### 完整流程总结

1. **安装Certbot**：
```sh
sudo yum update -y
sudo yum install epel-release -y
sudo yum install certbot -y
```

2. **生成证书脚本**：
```sh
#!/bin/bash

DOMAIN1="51wurenji.com"
DOMAIN2="admin.51wurenji.com"
EMAIL="407590300@qq.com"

sudo systemctl stop nginx
sudo certbot certonly --standalone -d $DOMAIN1 -d $DOMAIN2 --email $EMAIL --agree-tos --non-interactive
sudo systemctl start nginx

echo "SSL证书已生成并保存在 /etc/letsencrypt/live/$DOMAIN1/"
```

保存为 `generate_cert.sh` 并赋予执行权限：

```sh
chmod +x generate_cert.sh
```

3. **配置自动续约**：
```sh
sudo crontab -e
```

添加以下行：

```sh
0 2 * * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
```

4. **配置Nginx使用生成的证书**：
   编辑 `/etc/nginx/conf.d/your_site.conf`，确保使用正确的证书路径和配置。

5. **测试并重新加载Nginx**：
```sh
sudo nginx -t
sudo systemctl reload nginx
```

通过以上步骤，你可以在CentOS系统上使用HTTP-01验证生成Let's Encrypt证书，并配置自动续约。