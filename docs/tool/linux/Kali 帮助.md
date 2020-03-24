# Kali 帮助

## 更换 apt 源

配置文件在 `/etc/apt/sources.list` 当中. 添加源后 `sudo apt-get update`. 

## Kali 语言中文乱码与中文输入法安装

[自己看吧](https://www.cnblogs.com/rab3it/p/11954428.html)

### 中文乱码的解决

``` sh
# 安装 locales 软件包
$ apt-get install locales
# 重新配置 LOCALE, 空格是选择, Tab是切换, * 是选中
$ dpkg-reconfigure locales
```

### 输入法的安装

``` sh
$ pt-get install ibus ibus-gtk ibus-pinyin
```

<!-- ## 安装 Docker -->
