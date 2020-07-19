# Docker Harbor

虽然 Docker 官方提供了公共 Docker 仓库用于镜像管理, 但是在管理私人镜像的时候, 这还是不方便的. 

## 安装

? ? ?

## 访问私有仓库

### 修改 /etc/docker/daemon.json
``` json
{
    "registry-mirrors":
    [
        "https://harbor.local"
    ],
    "insecure-registries":["harbor.local"] 
}
```
		
### 重新加载配置
``` sh
systemctl daemon-reload
systemctl restart docker
```

### 登录
``` sh
docker login harbor.local
```

## 上传本地 Docker 镜像到 Harbor 中

首先对需要上传的镜像打上 tag, docker push 指令会依据这个 tag, 将镜像上传到 harbor 中的指定仓库下.

``` sh
# 这里假设上传 ubuntu 到 harbor(harbor.local) 的 repository 仓库中.
$ docker tag ubuntu harbor.local/repository/ubuntu
$ docker push harbor.local/repository/ubuntu
```