ubuntu服务器

## 安装nodejs

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -D
sudo apt-get install -y nodejs

centos
sudo dnf install -y nodejs

开启yarn

corepack enable

## nginx

如何使用这两个文件夹

创建虚拟主机配置文件： 在 sites-available 文件夹中创建配置文件，例如 example.com：

sudo nano /etc/nginx/sites-available/example.com

编写配置文件： 在这个文件中编写虚拟主机的配置，例如：
```
server {
  listen 80;
  server_name example.com www.example.com;

  root /var/www/example.com/html;
  index index.html index.htm index.nginx-debian.html;

  location / {
    try_files $uri $uri/ =404;
  }
}
```
启用虚拟主机： 通过创建符号链接将配置文件从 sites-available 链接到 sites-enabled：

sudo ln -s /etc/nginx/sites-available/strapi.conf /etc/nginx/sites-enabled/

centos nginx位置

/etc/nginx/conf.d

sudo nginx -t

sudo systemctl reload nginx

vim /etc/nginx/conf.d/51wrj.conf

sudo ln -s /etc/nginx/sites-available/1.conf /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/2.conf /etc/nginx/sites-enabled/

## 解决sharp库加载慢或失败的问题
1. 安装依赖项
确保你的系统上安装了sharp所需的依赖项。例如，在Ubuntu上，你可以使用以下命令安装libvips
```
sudo apt-get install libvips-dev
```


## 部署
NODE_ENV=production yarn build
NODE_ENV=production yarn start

## 用传输导入数据

## web static
/etc/nginx/sites-available/2.conf
```
server {
    listen 80;
    server_name 8.9.9.9;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api {
        proxy_pass http://localhost:1337/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads {
        proxy_pass http://localhost:1337/uploads;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## strapi
/etc/nginx/sites-available/1.conf
```
server {
    listen 80;
    server_name 1234;

    location / {
        proxy_pass http://strapi;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

# centos
nginx位置
/etc/nginx/conf.d

```

server {
    listen 80;
    server_name aaa.com;

    # 重定向所有 HTTP 请求到 HTTPS
    return 301 https://$host$request_uri;

    location / {
        proxy_pass http://strapi;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

#####################################################

# HTTP server block
server {
    listen 80;
    server_name 51wurenji.com;

    # 重定向所有 HTTP 请求到 HTTPS
    return 301 https://$host$request_uri;
}

# HTTPS server block
server {
    listen 443 ssl;
    server_name aaa.com;

    # SSL 证书配置
    ssl_certificate /etc/ssl/mycerts/server.crt;
    ssl_certificate_key /etc/ssl/mycerts/server.key;

    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 根目录和默认文件
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api {
        proxy_pass http://localhost:1337/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads {
        proxy_pass http://localhost:1337/uploads;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

# 传输
server {
    listen 80;
    server_name <yourdomain>;
    location / {
        proxy_pass http://localhost:1337;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# strapi的后端和react前端的nginx配置

```
server {
    listen 443 ssl;
    server_name aaa.com;

    # SSL 证书配置
    ssl_certificate /etc/letsencrypt/live/51wurenji.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/51wurenji.com/privkey.pem;

    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    root /var/www/web-51wrj;
    index index.html;


    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:1337/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads {
        proxy_pass http://localhost:1337/uploads;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```