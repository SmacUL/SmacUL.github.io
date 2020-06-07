# Kubernetes

在很早很早以前, 我曾有机会在三个 Docker 容器间进行试验, 比如 A 与 B 之间通信, C 装了 Wireshark 尝试监听 AB 之间的通行, 但总是没有结果. 总之吧, 直接在 Docker 上配置网络终归不像虚拟机那么方便. Kubernetes 提供了这样的平台去管理 Docker, 据说 (老板说的) 可以解决之前的网络问题. 

[官网](https://kubernetes.io/zh/docs/concepts/overview/what-is-kubernetes/)

因为 Kubernetes 需要比较多的硬件资源, 相关的管理概念也十分丰富, 所以直接上手 Kubernetes 去学习, 体验并不好. 那么 Minikube 提供了这样的机会, 允许只部署一个单节点的 Kubernetes 环境. 这样可以在虚拟机环境下安装配置 Minikube 然后运行单节点. 

[Minikube](https://kubernetes.io/docs/tutorials/hello-minikube/)

