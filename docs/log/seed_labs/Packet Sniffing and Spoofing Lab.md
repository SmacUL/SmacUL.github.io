# Packet Sniffing and Spoofing Lab

## Pre-Experiment

实验有两个目的: 掌握包嗅探与伪装的工具的使用; 通过编写一些简单的包嗅探与伪装程序, 理解这些程序的工作原理. 

## T1 Using Tools to Sniff and Spoof Packets

mycode.py

``` python
#!/bin/bin/python
from scapy.all import *
a = IP()
a.show()
```

`python mycode.py` 可以查看内容 .

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

#### T1.1A

分别在 root 与非 root 环境下调用 sniffer.py. 

#### T1.1B

Scapy Filter 默认情况下使用 BPF 作为自己的句法, 我们需要完成下面的几件事:

- 捕捉 ICMP 包
- 带着终点端口 23 的特定 IP 发出的 TCP 包. 
- 捕捉发去或来自于特定子网的数据包. 可以选择任意子网, 但是不要选择那些 VM 可以接触到的. 

### T1.2 Spoofing ICMP Packets

伪装 ICMP 数据包, 利用 Spacy 发送给同一子网下的另一台 VM. 使用 Wireshark 去观察, 

``` py
from scapy.all import * 
a = IP() 
a.dst = ’10.0.2.3’ 
b = ICMP()  
p = a / b 
send(p)
```

这段代码将组装并发送一个 ICMP 数据包. 

这里 5 行的位置, `/` 不再表示除号, 它已经被 IP 类重新加载, 现在表示 stack 的含义. 

### T1.3 Traceroute

这一部分的实验将使用 Scapy 去计算出发点与目标点之间的距离, 这个距离使用路由的结点数量来表示. 

我们应该会使用 Python 去写一个循环, 不断地向目标点发送 ICMP 数据包. 一开始设置 TTL (Time-To-Live) 为 1, 那么发出的 ICMP 数据包在经历一个路由结点后, 就会失活被抛弃, 但是, 我们能够以此获取路由结点的 IP, 虽然我并不知道路由结点的 IP 获取之后有什么用. 

::: warning
这个实验可能有问题. 
:::

### T1.4 Sniffing and-then Spoofing



## T2 Writing Programs to Sniff and Spoof Packets

### T2.1 Writing Packet Sniffing Program

#### T2.1A Understanding How a Sniffer Works

#### T2.2B Writing Filters

#### T2.2C Sniffing Passwords

### T2.2 Understanding How a Sniffer Works

#### T2.2A Write a spoofing program

#### T2.2B Spoof an ICMP Echo Request

### T2.3 Sniff and then Spoof
