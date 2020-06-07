# Docker Compose

Docker Compose 通过一个 yml 的配置来将多个 Docker 容器提供的服务组合拼接起来. 这是一种容器层面的组合工具, 可以定义这些容器开放的端口 挂载的卷等. 

## 安装

比较方便的安装方式是使用 pip3 安装, 是 pip3. 

``` sh
# 在国内下载安装 Docker-Compose
$ sudo pip3 install docker-compose -i https://pypi.mirrors.ustc.edu.cn/simple/ 
```

## 样例

``` yml
version: "2"
services:
    vnc:
        image: sql_injection_operator
        container_name: sql_injection_operator
        environment:
        - USER=
        - PASSWORD=
        ports:
        - 6080:80
        privileged: true
    ubuntu:
        image: ubuntu
        container_name: my_ubuntu
        tty: true
        privileged: true
```

## 参考

[Docker Compose 参数说明](https://deepzz.com/post/docker-compose-file.html#toc_30)
