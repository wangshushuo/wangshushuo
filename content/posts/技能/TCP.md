TCP头的格式
![[Pasted image 20240402201217.jpg]]

过程
![[Pasted image 20240402202036.jpg]]
## 三次握手

- 第一次握手：客户端发送给服务端一个SYN报文（synchronize，think nai zi）
- 第二次握手：服务端发送给客户端一个SYN/ACK报文
- 第三次握手：客户端回复一个ACK报文，握手完成。

双方各进行了一次SYN和ACK，使彼此确认了对方可以正常接受和发送能力。
第一次，客户端发送能力正常
第二次，服务端接受能力正常，发送能力正常
第三次，客户端接受能力正常。

其中SYN和ACK都是报文中的标志位。除了标志位还有Sequence Number 序列号和Acknowledgmengt Number 确认号。

第一次握手是SYN和随机数序列号，第二次握手是SYN/ACK和随机数序列号还有确认号为客户端序列号+1，+1的目的是告诉对方自己已经收到。第三次握手，客户端也会确认收到序列号。

## 四次挥手
![[285729db06404505887b554c12d4c230~tplv-k3u1fbpfcp-zoom-in-crop-mark_1512_0_0_0.webp]]
client给server发送FIN报文，和一个序列号A
server收到后FIN后，把序列号A+1作为报文的序列号，并发送ACK报文告诉client收到了
server发送FIN报文，和一个序列号，
client收到FIN后，发送一个SYN报文和服务器序列号+1，告诉服务器收到了。