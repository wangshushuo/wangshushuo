# DNS
将一个域名(aaa.bbb.com)用A记录解析到你的服务器ip(123.456.789)

# 服务器设置
## 安装SSH服务器软件
```
sudo apt-get install openssh-server // ubuntu
sudo yum install openssh-server // centos
```

### 配置SSH服务器
编辑SSH服务器的配置文件。在Ubuntu或CentOS中，配置文件通常位于/etc/ssh/sshd_config。在配置文件中，请确保以下选项设置为“yes”
sudo nano /etc/ssh/sshd_config

GatewayPorts yes
AllowTcpForwarding yes

重启ssh
    sudo systemctl restart ssh

### 配置NGINX
编辑Nginx配置文件（例如/etc/nginx/sites-available/default）：

vim /etc/nginx/sites-available/default

```
server {
    listen 80;
    server_name aa.bbb.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
重启
```
sudo systemctl reload nginx
```

# 客户端
首先可以ssh登录到服务器，最好是已经把公钥发送给了服务器，不然每次都输密码有些恼火。

启动ssh反向隧道
    ssh -N -R 8080:localhost:3000 root@aaa.bbb.com
或者
    ssh -N -R 8080:localhost:3000 root@123.456.789

解释一下：80是告诉ssh在服务器监听80端口，将接收到的流量都转发到客户端的localhost:3000。-R是要在SSH连接中创建反向隧道。-N表示不执行命令。

如果有另一个客户端也要监听服务器的80端口就会失败。

# pm2和nodejs开启SSH反向隧道

```js
const { spawn } = require('child_process');

const sshTunnel = spawn('ssh', ['-N', '-R', '8080:localhost:3000', 'root@ssh.englishspeaking.icu']);

sshTunnel.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

sshTunnel.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

sshTunnel.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

```
pm2 start sshTunnel.js --name ssh-tunnel
pm2 save
pm2 startup
```