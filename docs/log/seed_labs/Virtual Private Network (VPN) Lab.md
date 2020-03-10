# Virtual Private Network (VPN) Lab


## Pre-Experiment

### 修改端口, 拦截 VPN
Wireshark 通过端口来判断通信方式, VPN 并没有一个标准的端口. 那就需要通知 Wireshark. 修改 Wireshark 的配置. 

### 解密加密通信
但是 Wireshark 现在并不能解密加密通信, 我们需要做到这一点. 将服务器的私钥提供给 Wireshark. 参考文档. 

### 获取主机 IP 地址
从 Hostname 中获取 IP 地址. 使用 `getaddrindo()` 方法. 参考文档代码

### 获取 shadow file 中的用户信息
文档中提到 `crypt` 和 `crypto` 两个东西? 

### 利用 pipe 进行父子进程间通信
pipe 有两头, 连接父子, 支持双工通信, 但是我们只需要父发子听即可, 故关闭父端的 fd[0]. 仍有代码

### 使用 select 监控多个输入接口
所有的各类型接口都将以 file descriptor 的形式被展现. 使用 `select()` 机制来同时监控多个输入接口.

### 在我们的 VPN 中使用 telnet 
telnet 常用于 Web 远程登录. 

### MiniVPN C/S 之间的通信流程
VPN Tunnel 是什么. 


## T1 VM Setup
设置 VM. 固定 IP. 这个操作可能不影响? 

如果 VM 使用了 Internal Network 模式, DHCP 就会被用上, 所以 VM 必须被静态配置. 

Wired Connection 的数量:    
HostV 只有一个连接;   
VPN Server 可以看到两个;  

针对 VPN Server? 选择对应 Internal Network 的 adapter. 可以尝试检查 Mac 地址. 

## T2 Creating a VPN Tunnel using TUN/TAP

TUN 与 TAP 是 VPN 的 kernel 驱动. 

TAP 模拟 Ethernet 驱动. layer-2 packets? 

TUN 模拟 network layer 驱动. layer-3 packets?

会有一个在用户空间的程序会与 TUN/TAP 对接. 

看样子应该有两台设备: VPN Client 和 VPN Server. 两份程序: vpnclient 和 vpnserver. 这两份文件分贝对应 VPN tunnel 的两头. 在 VPN tunnel 中, 实验使用 UDP 通信. 

### T2.1 Run VPN Server

首先运行 VPN Server program. 运行完毕之后, 一个虚拟的 TUN 网络接口将被生成. 使用 `ifconfig -a` 来查看. 完事配置此接口. 

``` sh
$ ./vpnserver
$ ifconfig tun0 192.168.53.1/24 up
```

这里提到的 `192.168.53.1` IP 具体是什么? 就是一个具体的值还是什么? 

``` sh
$ sysctl net.ipv4.ip_forward=1
```

### T2.2 Run VPN Client

运行 VPN Client 程序搞事情. 

``` sh
$ ./vpnclient 10.0.2.8
$ ifconfig tun0 192.168.53.5/24 up
```

### T2.3 Set Up Routing on Client and Server VMs

设置 CS 之间的路由? 

在客户机重定向所有的信息到 `192.168.60.0` 

``` sh
$ route add -net 10.20.30.0/24 eth0
```
我们需要对 CS 设备进行设置, 全部转到 `192.168.53.0/24` 

这一步貌似可以不用做, 如果上面的步骤没有问题的话. 

### T2.4 Set Up Routing on Host V

设置 HostV 的路由. 

### T2.5 Test the VPN Tunnel

测试这个 Tunnel. 在主机 U 上:

``` sh
$ ping 192.168.60.101
$ telnet 192.168.60.101
```

### T2.6 Tunnel-Breaking Test

## T3 Encrypting the Tunnel

## T4 Authenticating the VPN Server

## T5 Authenticating the VPN Client

## T6 Supporting Multiple Clients


