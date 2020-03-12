# Packet Sniffing and Spoofing Lab

## Pre-Experiment

实验有两个目的: 掌握包嗅探与伪装的工具的使用; 通过编写一些简单的包嗅探与伪装程序, 理解这些程序的工作原理. 

整个实验用到了两台虚拟机: 
- 10.0.2.26 (负责程序运行)
- 10.0.2.27 (辅助)

## T1 Using Tools to Sniff and Spoof Packets

mycode.py

``` python
#!/bin/bin/python
from scapy.all import *
a = IP()
a.show()
```

`python mycode.py` 可以查看内容 .

![](/note/img/2020-03-12-09-55-21.png)

### T1.1 Sniffing Packets 

学习使用 Scapy 完成包嗅探. 

sniffer.py

``` python
#!/usr/bin/python
from scapy.all import *
def print_pkt(pkt): 
    pkt.show()
pkt = sniff(filter='icmp', prn=print_pkt)
```

<!-- `sudo python sniffer.py` -->

#### T1.1A

分别在 root 与非 root 环境下调用 sniffer.py. 

在 root 条件下, 自己或者另一台设备使用 `ping` 命令, 运行 sniffer.py 的机子将循环打出 ICMP 包的相关信息: 

![](/note/img/2020-03-12-10-02-58.png)

如果不使用 root, 会直接报错 `socket.error: [Errno 1] Operation not permitted`. 

#### T1.1B

Scapy Filter 默认情况下使用 BPF 作为自己的句法, 我们需要完成下面的几件事:

- 捕捉 ICMP 包
- 带着终点端口 23 的特定 IP 发出的 TCP 包. 
- 捕捉发去或来自于特定子网的数据包. 可以选择任意子网, 但是不要选择那些 VM 可以接触到的. 例如 128.230.0.0/16 

重点在 sniffer.py 文件中, `pkt = sniff(filter='icmp', prn=print_pkt)`, 一句内设置 filter. 

``` py
# T1.1A 使用的是 icmp 的 filter. 
# ping www.baidu.com 即可
pkt = sniff(filter='icmp', prn=print_pkt)
# 嗅探终点 port:23 的 IP:10.0.2.27 发出的 TCP 包. 
# IP 为 10.0.2.27 的设备可以 telnet www.baidu.com
pkt = sniff(filter='tcp and port 23 and host 10.0.2.27', prn=print_pkt)
# 嗅探一个 VM 无法触及的子网 128.230.0.0/16
# 将会提示: tcpdump: Mask syntax for networks only
pkt = sniff(filter='host 128.230.0.0/16', prn=print_pkt)
```

### T1.2 Spoofing ICMP Packets

伪装 ICMP 数据包, 利用 Spacy 发送给同一子网下的另一台 VM. 使用 Wireshark 去观察, 

spoofer.py

``` py
#!/usr/bin/python
from scapy.all import * 
a = IP() 
a.dst = '10.0.2.27' 
b = ICMP()  
p = a / b 
send(p)
```

这段代码将组装并向 `10.0.2.27` 发送一个 ICMP 数据包. 这里 6 行的位置, `/` 不再表示除号, 它已经被 IP 类重新加载, 现在表示 stack 的含义. 运行此代码仍然需要 sudo 权限. 

![](/note/img/2020-03-12-10-38-58.png)

### T1.3 Traceroute

这一部分的实验将使用 Scapy 去计算出发点与目标点之间的距离, 这个距离使用路由的结点数量来表示. 

我们可以使用 Python 去写一个循环, 不断地向目标点发送 ICMP 数据包. 一开始设置 TTL (Time-To-Live) 为 1, 那么发出的 ICMP 数据包在经历一个路由结点后, 就会失活被抛弃, 但是, 我们能够以此获取路由结点的 IP, 虽然我并不知道路由结点的 IP 获取之后有什么用. 

``` py
#!/usr/bin/python
from scapy.all import * 
a = IP() 
b = ICMP()  
a.dst = '180.101.49.11' 
for i in range(30):
    a.ttl = i + 1
    p = a / b 
    send(p)
```

从 wireshark 中, 可以看出, 在最终到达  `180.101.49.11` 这个目的地之前经过了: 
``` sh
10.0.2.1
...
68.213.96.62
```

<!-- ::: warning
这个实验可能有问题. 
::: -->

### T1.4 Sniffing and-then Spoofing

结合嗅探和伪造, 需要两台 VM, A 和 B. 让 B ping 一个 IP, 这个 IP 是否真实存在并不重要. 然后在 A 中运行嗅探程序, 监控 LAN 中的通信状态. 理论上, 只要 B 发出了 ICMP 包, A 就会感知, 并且发出伪造的响应. 

``` py
#!/usr/bin/python
from scapy.all import *
def spoof_pkt(pkt):
    a = IP() 
    b = ICMP()  
    a.dst = '10.0.2.27'
    send(a / b) 

pkt = sniff(filter='icmp and host 10.0.2.27', prn=spoof_pkt)
```
IP 为 `10.0.2.27` 的 VM 将尝试 ping 一个 IP, 例如 `www.baidu.com`. 

IP 为 `10.0.2.26` 的 VM 将监听 LAN 中的通信, 嗅探到 `10.0.2.27` 的 ICMP 请求包的时候, 就会自动发送一个 ICMP 响应包. 

![](/note/img/2020-03-12-11-27-48.png)

## T2 Writing Programs to Sniff and Spoof Packets

### T2.1 Writing Packet Sniffing Program

这里将使用 pcap. 

#### T2.1A Understanding How a Sniffer Works

理解一个 Sniffer 是如何工作的. 利用编写好的程序去指出源头和目标的 IP 地址. 

完成下述的几个问题: 
1. 用自己的话去总结描述上面的代码. 
1. 为什么这个 sniffer 程序需要 root 权限; 在没有 root 权限的情况下, 程序会死在哪里. 
1. 打开或关闭自己程序的混淆模式. 请描述两种模式下的不同. 

#### T2.1B Writing Filters

更换程序中的 filter, 完成下述的任务: 
1. 捕捉两个 host 之间的 ICMP 包
1. 目标端口为 10 ~ 100 之间的所有 TCP 包. 

#### T2.1C Sniffing Passwords
当别人使用 telnet 时, 请展示如何使用自己的嗅探程序去获取密码? 啥密码? 

TCP 部分的数据, telnet 使用 TCP. 

可以指出整段数据部分, 然后标记密码位置. 

### T2.2 Spoofing

raw socket 是什么? 正常来说, 操作系统并不允许用户随意修改一个数据包的任意位置, 大部分的位置都被系统填充, 除非有管理员权限. 

这玩意很简单, 包括四步: 
1. create a raw socket
2. set socket option
3. construct the packet
4. send out the packet through the raw socket

有一段简单的程序示例. 

#### T2.2A Write a spoofing program

利用 C 编写自己的包嗅探程序, 提供证据证明这个程序发了包

#### T2.2B Spoof an ICMP Echo Request

代表其他的机子伪装 ICMP echo Request 数据包, 这个数据包应该被送到一个远程主机, 然后打开 Wireshark 康康远程主机返回了什么. 

完成以下的问题:
- 是否能够随意修改 IP 包的长度, 不用管 IP 包的实际长度. 
- 使用 raw socket 编程, 是否必须去计算 IP 头部的 checksum
- 为什么需要 root 权限, 如果没有 root 权限, 康康程序死在了哪. 

### T2.3 Sniff and then Spoof


