---
title: 命令行发送email
date: 2019-01-04T04:49:13+00:00
summary: python发送邮件

categories:
  - 折腾
---

[如何验证 Email 地址：SMTP 协议入门教程](http://www.ruanyifeng.com/blog/2017/06/smtp-protocol.html)
[ubuntu mail 用 qq 邮箱发邮件](http://fred.itxfd.com/2017/08/08/ubuntu-mail-用-qq-邮箱发邮件/)

我先尝试在我的mac上发送，先是找到了sendmail相关的介绍，然后找到了mac自带的postfix类似于sendmail，于是研究postfix，将近一天的时间我经历了各种配置与失败。

晚上下班的路上，看了阮一峰的smtp介绍，了解到smtp服务器的身份验证是为了防止垃圾邮件，为了控制垃圾邮件，许多邮件服务器会用自己的方法验证邮件地址，下面就是其中的一些方法。

* example.com 是否有 MX 记录
* example.com 是否可以 Ping 通
* 是否存在 postmaster@example.com 这个邮箱
* 发起连接的 IP 地址是否在黑名单之中
* IP 地址的反向 DNS 解析，是否指向一个邮件服务器

qq邮箱也许用了其中某些方法，使用mac链接smtp的话，135应该都是不能通过的，所以导致了在mac上mail失败。具体什么原因导致的不能成功就不深究了。

由于得知了上面的信息，于是尝试用我的云服务器来实验一下，因为云服务器可以ping，有MX记录。正好还发现了一个ubuntu发邮件的文章。步骤如下：（以下主要是某网友的博文）

先用 `which mail` 看看有没有 `mail`。

如果没有的话，可以安装如下软件：

```
sudo apt-get install -y heirloom-mailx
```

有了 `mail` 后，直接用命令行测试

```
echo "mail body" | \
mail -v \
-r 6666666@qq.com \
-s "subject" \
-S form=6666666@qq.com \
-S smtp-auth-password=密码或授权码 \
-S smtp-auth-user=6666666@qq.com \
-S smtp-auth=login \
-S smtp-use-starttls \
-S smtp=smtps://smtp.qq.com:465 \
-S ssl-verify=ignore \
6666666@qq.com
```

在配置文件里面配置账号，首先找到相应的配置文件：

```
strings `which mail` | grep '\.rc'
sudo vim /etc/s-nail.rc﻿
```

在文件尾部添加：

```js
set from=6666666@qq.com
set smtp-auth-password=密码或授权码
set smtp-auth-user=6666666@qq.com
set smtp-auth=login
set smtp=smtps://smtp.qq.com:465
set ssl-verify=ignore
```

然后测试：

```
echo "mail body" | mail -s "subject1" 6666666@qq.com
```

至此，我的qq邮箱可以成功接收到邮件。这件事总算有了结果。

发送邮件虽然能成功，但是我的命令行会打印一个警告

```
mail: /usr/local/openssl/lib/libssl.so.1.0.0: no version information available (required by mail)
```

经查，及尝试。将警告的2个文件移除即可，也可以改名字：

```
mv /usr/local/openssl/lib/libssl.so.1.0.0 /usr/local/openssl/lib/libssl.so.1.0.0_bk
```

之后再发邮件就一切顺利了。

---

事情有了新的进展：2019年1月7日。

我又想，为什么mac的邮件app可以发送而命令行却不行吗？应该都是用的SMTP方式来发送邮件的。那么可能还是我配置SMTP参数的问题。

经过搜索了解到，mac的命令行mail是一个旧版的，新版的叫heirloom-mailx或者s-nail。

我通过Homebrew安装了s-nail，将上面测试代码的mail换成s-nail是可以发送邮件的，但是同样的写s-nail.rc后，却不能发送邮件。而且看了man s-nail以后还是不会写抄送参数的配置。

上面的这个过程又消耗了我一天的时间，直接使用s-nail的人似乎很少，没有查到一个能运行的例子，这一天就在各种搜索、配置、测试中度过了。后来又想到安装mail的新本的二进制文件来更新mail似乎也是个办法。但是想到还要重新配置还是很麻烦。就放弃了。

今天早晨坐地铁时想到，shell不行，那就试试python吧。到公司后，在stackoverflow上找到了一个例子，修改smtp地址，账号密码，加上抄送字段。整个过程差不多半个多小时，顺利的发出了邮件🥳🤙🕺💃🎉🎊

幸甚至哉，歌以咏志。

真的惊喜，我真是太蠢了，傻了吧唧地折腾了4天的，最后用python半小时就解决了。

最后奉上python发送邮件的代码：

```python
#! /usr/local/bin/python

SMTPserver = 'smtp.qq.com:465'
sender =     '666666@qq.com'
cc = "888888@163.com"
to = "666666@qq.com"

USERNAME = "666666@qq.com"
PASSWORD = "PASSWORD"

# typical values for text_subtype are plain, html, xml
text_subtype = 'plain'


content="""\
Test message
"""

subject="Sent from Python"

import sys
import os
import re

from smtplib import SMTP_SSL as SMTP # this invokes the secure SMTP protocol (port 465, uses SSL)
# from smtplib import SMTP # use this for standard SMTP protocol   (port 25, no encryption)

# old version
# from email.MIMEText import MIMEText
from email.mime.text import MIMEText

try:
    rcpt = cc.split(",") + [to]
    msg = MIMEText(content, text_subtype)
    msg['Subject']=       subject
    msg['From']   = sender # some SMTP servers will do this automatically, not all
    msg['Cc'] = cc

    conn = SMTP(SMTPserver)
    conn.set_debuglevel(False)
    conn.login(USERNAME, PASSWORD)
    try:
        conn.sendmail(sender, rcpt, msg.as_string())
    finally:
        conn.quit()

except:
    sys.exit( "mail failed; %s" % "CUSTOM_ERROR" ) # give an error message
```