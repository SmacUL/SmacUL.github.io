# Docker

Docker 的两个主要的概念: 镜像与容器. 对应到 Java 中, 镜像等价于类, 容器等价于对象实例. 因此在使用过程中, 需要先有镜像再有容器, 一个镜像可以衍生出多个容器, 当然, 也可以由容器生成镜像方便后面使用. 

所以后面的命令基本上都要考虑镜像和容器两方面. 

## Quick Start
假设我们已经处理好了 Docker 的安装的问题. 

### 创建 Ubuntu 容器并运行
``` sh
# 拉一个 Ubuntu 的镜像. 
docker pull ubuntu
# 查看本地都有哪些镜像
docker images ls
# 创建并运行一个名称为 MyUbuntu 的 Ubuntu 容器
docker run -it --name MyUbuntu Ubuntu
```

### 关闭容器
``` sh
# 退出与 Ubuntu 的交互界面
$ exit
# 查看所有容器的状态
docker ps -a
# 停止容器 MyUbuntu 活动
docker stop MyUbuntu
```

### 重启容器并执行任务
``` sh
# 启动容器 MyUbuntu 活动
docker start MyUbuntu
# 进入 Ubuntu 的交互界面
docker exec -it MyUbuntu /bin/bash
```

<!-- ## 几个比较重要的命令的总结
- run 对镜像的操作, 从镜像创建(必要的时候 pull)容器, 并让容器 start 起来执行某项任务 
- exec 对容器的操作, 让一个 start 了的镜像执行某项任务.
- commit 可以看做是 run 的拟操作, 从一个容器生成一个镜像.
- build 使用 Docker File 创建容器. -->

## Mac 下使用 Docker 的建议
如果查询 Mac 下如何使用 Docker, 一定会有人建议使用 brew 来下载安装 Docker. 但是经过多次试验, 在 Catalina(10.15) 版本中, 使用 `brew install docker` 或 `brew cask install docker` 并不能获得可以正常启动的 Docker. 

建议直接在 [Docker 官网](www.docker.com) 中直接下载 GUI 版的 Docker. 在使用之前先将其启动, 然后在 CMD 中的操作大家都是一样. 

## 参考
[docker 菜鸟教程](https://www.runoob.com/docker/docker-tutorial.html)