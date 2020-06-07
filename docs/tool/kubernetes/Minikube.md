# Minikube 与 Kubectl

Minikube 可以用来创建单节点的 Kubernetes 环境, Kubectl 则是一个 Kubernetes 的命令工具. 

下面的内容将 BB 如何在国内环境下和虚拟机中安装配置这两个玩意, 以及关于 
它们的常见操作. 

[@狂乱的贵公子-Kubernetes 环境搭建](https://www.cnblogs.com/cjsblog/p/11877014.html)

## Quick Start

### 安装环境

VMWare CentOS7 虚拟机

- 最小化安装  
- CPU 2*2.7GHz  
- 内存 2G  
- NAT 网络模式

默认虚拟机中安装好了 Docker. 

### 预先的配置

#### 关闭防火墙

``` sh
systemctl stop firewalld
systemctl disable firewalld
```

#### 关闭 Selinux

``` sh
setenforce 0
sed -i "s/^SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config
```

#### 关闭 Swap

``` sh
swapoff -a
sed -i 's/.*swap.*/#&/' /etc/fstab
```

### Kubectl 的安装配置

Kubectl 是一个命令行接口, 用于对 Kubernetes 集群运行命令. 使用 yum 下载安装此工具. 

#### 配置 yum 的 kubernetes.repo 的阿里云源

``` sh
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

#### 安装

``` sh
yum install -y kubectl
```

### Minikube 的安装配置

``` sh
curl -Lo minikube http://kubernetes.oss-cn-hangzhou.aliyuncs.com/minikube/releases/v1.3.1/minikube-linux-amd64
chmod +x minikube
mv minikube /usr/local/bin/
```

::: tip 关于 Minikube 的版本
我也不知道 Minikube 的版本在哪看, 反正 v1.3.1 没啥问题. 
:::

### Minikube 的启动与关闭

#### 启动

``` sh
minikube start --registry-mirror=https://registry.docker-cn.com --vm-driver=none --image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers
```

- `registry-mirror`   
    设定拉取 Docker 镜像的仓库. 
- `vm-driver=none`   
    由于是在虚拟机中启动 Minikube, 所以 `vm-driver` 填写为 `none`
- `image-repository`  
    设定拉取 Kubernetes 所需镜像的仓库. 

#### 关闭

``` sh
minikube stop
```

## Minikube Dashboard

Minikube 仪表盘. 

大部分的文章, 包括官方文档, 都提到了指令 `minikube dashboard` 来启动一个能够使用浏览器访问的 GUI Kubernetes 管理界面. 使用这个指令时, 它会想办法启动操作系统中已经安装的浏览器, 但是由于我们的 CentOS 是最小化安装, 不可能有浏览器, 只能在虚拟机外部启动宿主机的浏览器. 

一番操作后, 可以使用下方的指令:

``` sh
kubectl proxy --address='0.0.0.0' --disable-filter=true
```
然后宿主机浏览器访问 
``` sh
# 可以先用 ip addr 获取虚拟机 IP
http://[我们的虚拟机 IP]:8001/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/
```

::: warning URL IP 后面一段是什么?
我们可以尝试一下 `minikube dashboard --url` 看看都输出了什么. 本质上, dashboard 是一个服务, 这个指令可以获取服务对外的 url. 
:::



## 清除 Minikube 的数据

如果感觉 Minikube 安装的不合适或是不正确就可以按照下方指令操作:

``` sh
minikube delete
rm -rf  ~/.minikube
```