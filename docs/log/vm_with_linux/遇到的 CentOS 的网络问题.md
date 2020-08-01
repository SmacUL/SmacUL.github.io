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