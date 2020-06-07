# CentOS

下面的提到的内容都在 CentOS 7x64 系统上测试过. 

## 启动时激活网卡

最小化安装, 进入系统后发现没连上网络, 使用 `ip addr` 无法获取 ens33 网卡的 ip (只能获取一个 127 的本地地址), 使用指令 `sudo nmtui` 可以激活 ens33 网卡 (利用 TAB 和 ENTER 键切换选项). 但是这种操作每次开机都要做一遍. 可以设置网卡自激活:

``` sh
$ vi /etc/sysconfig/network-scripts/ifcfg-ens33
# 修改 ens33 配置文件最后一行如下:
ONBOOT=yes
# 保存退出
```

## 防火墙相关

``` sh
$ sudo systemctl stop firewalld
$ sudo systemctl disable firewalld
```