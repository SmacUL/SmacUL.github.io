# Remote DNS Cache Poisoning Attack Lab

## 实验环境

我们需要三台虚拟机, 一台作为 DNS 服务器, 一台为攻击者, 一台为受害者. 

- DNS 服务器: 10.0.2.15
- 攻击者 01 机: 10.0.2.5
- 受害者 02 机: 10.0.2.4

### 配置 DNS 服务器

#### 配置 BIND9 
BIND9 是一种 DNS 服务器软件, 虚拟机里已经装好了 BIND9. BIND9 的配置文件在 `/etc/bind/named.conf.` 这个文件中包含了其他配置文件的路径: 
``` {1}
include "/etc/bind/named.conf.options";
include "/etc/bind/named.conf.local";
include "/etc/bind/named.conf.default-zones";
```
我们需要修改的是 *named.conf.options* 这个文件, 在这个文件中添加缓存内容文件的路径. 如果不指定, 默认缓存内容文件的路径为: `/var/cache/bind/named_dump.db`.

``` {3}
options {
    directory "/var/cache/bind";
    dump-file "/var/cache/bind/dump.db";
    ...
}
```

执行下方的两个指令:
``` sh
sudo rndc dumpdb -cache     # 转存缓存到指定文件
sudo rndc flush             # 清空缓存文件
```

#### 关闭 DNSSEC
DNSSEC 应该是一种防止 DNS 服务器遭受 *spoofing attcks* 的防御措施. 

还是在上文的 *named.conf.options* 文件, 找到并注释: `dnssec-validation auto;`, 
添加 `dnssec-enable no;`

::: warning 这两个子操作的具体作用
?
:::

#### 固定端口

在上文的 *named.conf.options* 文件中的 options 中添加 `query-source port 33333;` 设置所有 DNS 查询的 *source prot* 为 33333. 

#### 移除 *example.com* 

#### 重启 DNS 服务器. 

有修改就重启. 
``` sh
sudo service bind9 restart
```

#### 检查启动是否成功
可以检查一下 `/var/log/syslog` 有没有提示服务 bind9 启动失败. 

### 配置用户虚拟机

#### 配置
设置用户虚拟机的本地 DNS 服务器为我们之前设置的那个. `/etc/resolv.conf` 文件可以做到这个. 修改一下 `nameserver 10.0.2.15`. 

但是 DHCP 会覆盖这个文件, 所以, 修改文件 `/etc/resolvconf/resolv.conf.d/head`, 添加 `nameserver 10.0.2.15`. 完事生效配置文件: 

``` sh
sudo resolvconf -u
```

#### 测试

使用 dig 指令, 可以看到: 
![](/note/img/2020-02-09-09-42-18.png)
在 `SERVER` 中我们可以看到 DNS 服务器的 IP. 

dig 命令是常用的域名查询工具，可以用来测试域名系统工作是否正常。

## 实验任务

狸猫换太子. 

### T1 Remote Cache Poisoning

*Kaminsky attack*

#### T1.1 Spoofing DNS request

伪装 DNS 请求. 

[脚本 udp.c](https://seedsecuritylabs.org/Labs_16.04/Networking/DNS_Remote/udp.c)


#### T1.2 Spoofing DNS Replies
伪装 DNS 响应. 

#### T1.3 The Kaminsky Attack
