# Public-Key Infrastructure Lab

## Pre-Experiment
一个基础性的问题是没有一个简单的方式去验证公钥的所有者. 
如何保证公钥确实属于 claimed 所有者. 
Public Key Infrastructure PKI 是一种非常经典的解决方案. 

我们将在这个实验中理解 Public-Key-Infrastructure 能够得到信任的根源, 如果系统信任了这样的漏洞. 

几个主题: 
- 公钥编码
- public key infrastructure
- CA 以及 根 CA
- X.509 和自我签名
- Apache HTTP and HTTPS
- man in the middle attacks? (中间人攻击?)

在这个实验中, 我们还将使用到 openssl 命令和库.

[实验指导](https://seedsecuritylabs.org/Labs_16.04/PDF/Crypto_PKI.pdf)

## T1 Becoming a Certification Authority (CA)

在这个实验中, 我们需要创建 digital certificates, 我们自己做自己的 CA. 然后使用这个 CA 来给别的什么东西提供验证服务. 

### The Configuration File

有一个文件 *openssl.conf*. 
这里有一个问题: 就是 OpenSSL 是什么. 
需要现有 *openssl.conf* 文件, 然后使用 OpenSSL 生成 certificates.

ATC 我们可能需要处理一下 openssl 这玩意

openssl 一共有三个命令: ca, req, x509. 
`/usr/lib/ssl/openssl.cnf` 可以提供这样的配置文件, 可以复制他. 

然后在 *openssl.cnf* 所在的目录下, 创建几个子目录与文件. 

``` sh
$ mkdir demoCA demoCA/certs demoCA/crl demoCA/newcerts
$ echo > demoCA/index.txt
$ echo 1000 > demoCA/serial
```
::: tip 关于 index.txt 与 serial 文件的内容
*index.txt* 内容为空. 特别注意, 能够打开 *index.txt* 文件的软件 (例如 gedit) 一定要用 tab 替换成 backspace.   
serial 可以填入其他的数字, 他的功能应该就是个计数器. 
:::

### Certificate Authority (CA)

这一步好像是创建 Certifate Authority
``` sh
$ openssl req -new -x509 -keyout ca.key -out ca.crt -config openssl.cnf
```

上面的指令获得两个输出文件: *ca.key* (私钥证书)和 *ca.crt* (公钥证书)

## T2 Creating a Certification for SEEDPKILab2018.com

现在我们有能力给出 digital certificates. 第一个公司叫做 *SEEDPKILab2018.com*. 

### T1.1 Generate public/private key pair

我们需要有公钥和私钥对.  RSA. 
``` sh
$ openssl genrsa -aes128 -out server.key 1024
```

使用 aes128 encryption algorithm. 秘钥存在在 *server.key*. 另一条指令可以将 *server.key* 转成文本, 方便阅读. 
``` sh 
$ openssl rsa -in server.key -text
```

::: tip
指令 `openssl rsa -in server.key -out server.key.unsecure` 可以获得免密的 server key. 
:::

### T1.2 Generate a Certificate Signing Request (CSR)

CSR 也就是证书签名申请? 包含了企业的公钥? 
CSR 会被送给 CA, CA 将生成秘钥的证书. 

``` sh
$ openssl req -new -key server.key -out server.csr -config openssl.cnf
```
依据描述, certificate signing request 和 certificate authority 是一对的. 

### T1.3 Generating Certificates



CSR file 需要有 CA 的签名才能产出证书. 
在实验最开始的时候, 我们就有了自己的 CA. 

``` sh
$ openssl ca -in server.csr -out server.crt -cert ca.crt -keyfile ca.key -config openssl.cnf
```

实验指导中给出了 如果 CA 拒绝生成证书的解决方案. 

![](/note/img/2020-02-23-11-23-57.png)


## T3 Deploying Certificate in an HTTPS Web Server

这一步, 我们将 public-key 用在网站上. 使用 openssl 内建的 web 服务器去建立一个 HTTPS 的站点. 

### T3.1 Configuring DNS

配置 DNS, 修改 `/etc/hosts`, 配置 `127.0.0.1 SEEDPKILab2018.com`

### T3.2 Configuring the web server

配置 web 服务器. 
``` sh
$ cp server.key server.pem
$ cat server.crt >> server.pem
$ openssl s_server -cert server.pem -www
```

现在, 服务将会监听 4433 端口. 
使用 `https://SEEDPKILab2018.com:4433/`
来访问. 
不出意外的话, 我们会收到一份来自浏览器的错误信息. 大概是说当前的网站没有合法的证书. 

![](/note/img/2020-02-23-11-21-21.png)

### T3.3 Getting the browser to accept our CA Certificate

让浏览器接受 CA 证书. 有两种方式: 
1. 请求 Mozilla 去包含我们的 CA 证书在 FireFox 软件, 用屁股想都知道这不可能. 
2. 让浏览器加载 *ca.crt* (公钥证书) `Edit -> Preference-> Privacy & Security -> View Certificates`

### T3.4 Testing our HTTPS website
测试我们的 HTTPS 网站. 重新操作 Step2. 

然后我们需要重复接下来的任务: 
1. 仅仅修改 *server.pem* 中的一位, 重启服务器, 重载 URL, (请先备份 *server.pem*) 另外, 如果服务起不来, 可能是 *server.pem* 不该改的位置被改了. 并不会有什么影响. 
2. 尝试使用 https://localhost:4433 , 我感觉应该会不行. 的确不行, 仍然会显示是一个没有认证过的网站, 不允许访问. 本地 CA 没有对 localhost 进行授权. 

## T4 Deploying Certificate in an Apache-Based HTTPS Website

在一个 Apache-Based HTTPS website 中使用证书. 在这个实验中, 我们建立了一个真实的 HTTPS web server based on Apache. 

实验指导给出了 example.com 的参考, 然后我们需要对 SEEDPKILab2018.com 也做一遍. 

#### 部署一个小项目
先在 Apache 的目录下部署一个项目: 
1. 在路径 `/var/www/` 添加 `pki` 文件夹
1. 在 `pki` 文件夹内添加 `index.html`, html 内容随意. 

#### 使用 HTTP 浏览项目
修改 `/etc/apache2/site-available/000-default.conf`, 添加
``` sh
<VirtualHost *:80>
    ServerName SEEDPKILab2018.com
    DocumentRoot /var/www/pki
</VirtualHost>
```

现在重启 apache2 的 service, 并访问 `http://seedpkilab2018.com` 应该可以看见 index.html 中内容. 

#### 使用 HTTPS 浏览项目

修改 `/etc/apache2/site-available/default-ssl.conf`, 添加

``` sh
<VirtualHost *:443>
    ServerName SEEDPKILab2018.com
    DocumentRoot /var/www/pki
    DirectoryIndex index.html

    SSLEngine On
    SSLCertificateFile /home/seed/Desktop/server.pem
    SSLCertificateKeyFile /home/seed/Desktop/server.pem 
</VirtualHost>
```

``` sh
$ sudo apachectl configtest
$ sudo a2enmod ssl
$ sudo a2ensite default-ssl
$ sudo service apache2 restart
```
使用 HTTPS 协议访问 `https://seedpkilab2018.com` 应该再次可以看见 index.html 中内容.

## T5 Launching a Man-In-The-Middle Attack

这一步主要展示: PKI 如何打败中间人攻击. 

如果没有 PKI, 用户在访问 example.com 的时候就需要获取 server 的 public key. 
Alice 将会生成一个 secert, 然后使用 server 的 public key 去编码这个 secert. 然后再发给 Server. 

攻击者可能拦截 Server 给出的 public key 然后替换成自己的 public key 再发给 用户. 如此攻击者是有能力读取用户发出的数据.

这个实验的主要目的就是帮助学生理解 PKI 如何打败这样的中间人攻击. 在这个攻击中, 我们将会模拟一个这样的 MITM 攻击, 然后看 PKI 如何击败它. 

首先我们需要选择一个 website. 讲道理, example 是一个不错的选择, 但是这里更加建议使用一个现实的站点? 

ATC: 这里需要作出一个假设, 用户实际访问的是 example.com 这个 web server. 但是, 我们假装发动了一次 DNS 缓存毒化攻击, 将 hosts 修改为 那个什么 2018 的 网站 ip, 也就是攻击者的网站 IP. 这样就创建了 attacker 与 victim 之间的通信.

### T5.1 Setting up malicious websites

这里的操作会模仿 T4 中的内容.

我们的目标是这样的: 当一个用户打算访问 example.com 的时候, 我们把他引到自己的 server, hosts 了一个假的 website for example.com. 然后他们可能在者之间写些什么东西. 

模仿 T4 中的操作, 创建一个 `www.apple.com` 的 ssl server. 


### T5.2 Becoming the man in the middle

成为那个中间人. 可以攻击路由或者攻击 DNS. 这一步, 我们选择 DNS 攻击. 为了简化操作, 我们直接修改受害者的 `/etc/hosts`. 去模拟一个 DNS 缓存毒化攻击. 
`<IP_Address> example.com`
这里的 IP_Address 应该是 malicious server 的 ip. 

``` sh
10.0.2.14  www.apple.com
```

### T5.3 Browse the target website
重新浏览目标网站, 看看自己的浏览器说了什么. 

浏览器表示: "警告: 面临潜在的安全风险." 没有任何 CA 对我们自己的 `www.apple.com` ssl server 颁发证书. 

## T6 Launching a Man-In-The-Middle Attack with a Compromised CA
这里做出了一个假设, 就是我们的 CA 已经被人收买, 给 `www.apple.com` 创建 cert. 
