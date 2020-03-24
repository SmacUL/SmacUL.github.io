# Docker Compose

## 样例

``` docker-compose
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
