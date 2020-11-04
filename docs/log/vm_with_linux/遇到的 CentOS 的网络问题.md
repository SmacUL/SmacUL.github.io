# 遇到的 CentOS 的网络问题

## 启动时激活网卡

最小化安装, 忘记配置网络, 进入系统后发现没连上网络, 使用 `ip addr` 无法获取网卡的 ip (只能获取一个 127 的本地地址), 
使用指令 `sudo nmtui` 可以激活网卡 (利用 TAB 和 ENTER 键切换选项). 但是这种操作每次开机都要做一遍. 可以设置网卡自激活:

``` sh
# 也有可能不是 ifcfg-ens33 文件, 看情况
$ vi /etc/sysconfig/network-scripts/ifcfg-ens33
    # 修改 ens33 配置文件最后一行如下:
    ONBOOT=yes
    # 保存退出
```

## 无法重启 network 服务

修改或配置网络后, 无法重启 network.service. `systemctl status network.service` 提示 `Failed to start LSB: Bring up/down networking.`. 有可能是 NetworkManager 服务有冲突, 也有可能是 `/etc/sysconfig/network-script` 下的配置文件有问题 (如果有改过的话). 前者 `systemctl restart NetworkManager`, 后者修改文件.

## 防火墙

感觉有玄学问题, 关一波防火墙 (手动狗头)

``` sh
$ sudo systemctl stop firewalld
$ sudo systemctl disable firewalld
```

## CentOS6 桥接模式的虚拟机转移后的网络问题

将 CentOS6 桥接模式, 且固定了 IP 的虚拟机转移到通网段下的另一台宿主机之后, eth* 网卡会出点问题, network.service 也无法重启. 访问一下 `/etc/sysconfig/network-script/ifcfg-eth0`, 可以发现转移虚拟机之后, 虽然 `ip addr` 显示的网卡名称作了修改, 但是 `ifcfg-eth0` 中的网卡配置信息没有跟着改过来, 需要手动修改设备名称与 Mac 地址 (都以 `ip addr` 的显示结果为准), 最后重启 network.service .   

## 固定 IP

### 桥接模式

还是我们的老朋友 `/etc/sysconfig/network-scripts/` 下的 `ifcfg-ens*` 或是 `ifcfg-eth*`. 
1. 将 `DEFROUTE="yes"` 修改为 `DEFROUTE="static"`; 
1. 添加固定 IP 地址 `IPADDR="192.168.1.**"` (假设在 192.168.1.0/24 网段下); 
1. 添加网关 `GATEWAY="192.168.1.1"`, 网关信息可以参考宿主机的网络配置; 
1. 添加 DNS `DNS1="114.114.114.114"`, 这也可以参考宿主机的网络配置, 这个 DNS 应该是移动联动的 DNS 服务器地址. 

接下来修改 `/etc/sysconfig/network`, 
``` sh
NETWORKING=yes
HOSTNAME=[随便写, 例如 localhost]
GATEWAY=192.168.1.1 # 照着上面的网关写
```

修改完毕后, 重启 network 服务, 可以使用 `ip addr` 与 `ping` 命令检查网络情况.