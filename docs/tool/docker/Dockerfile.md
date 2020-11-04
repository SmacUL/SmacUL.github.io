# Dockerfile

Dockerfile 文件包含了构建镜像所需的指令. 从镜像 A 出发, 执行 Dockerfile 中的命令, 最终输出镜像 B.

## 样例

``` sh
FROM sspreitzer/shellinabox
RUN echo 'deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse' > /etc/apt/sources.list && \
    apt-get update && apt-get install -y vim
COPY ["hadoop-3.2.1.tar.gz", "spark-3.0.0-bin-without-hadoop.tgz", "/"]
ENV SIAB_PASSWORD=123456
ENV SIAB_SUDO=true
ENV SIAB_SSL=false
```

``` sh
FROM codercom/code-server
USER root
RUN mkdir /home/coder/lsb
RUN mv /etc/apt/sources.list /etc/apt/sources.list.back && \
    echo "deb https://mirrors.tuna.tsinghua.edu.cn/debian/ buster main contrib non-free" > /etc/apt/sources.list && \
    apt-get update -y && apt-get install -y python3-pip
RUN pip3 install opencv-python numpy -i https://pypi.tuna.tsinghua.edu.cn/simple
COPY ["origin.png", "Main.py", "/home/coder/lsb/"]
CMD ["--auth", "none"]
```

## 利用 Dockerfile 生成新的镜像

在 Dockerfile 所在的目录下执行命令 `docker build -t [新镜像的名称] .`, 例如 `docker build -t my-ubuntu .`. 

## 参考

[菜鸟教程](https://www.runoob.com/docker/docker-dockerfile.html)