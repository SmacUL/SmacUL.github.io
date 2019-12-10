# deepin

## 查询所有接口设备 lspci

``` shell
lspci
```

## 重启网卡

``` shell
service network-manager restart
```

## 断网之后官方的方法

``` shell
sudo iwconfig wlp2s0 txpower 20
sudo iw dev wlp2s0 set power_save off
```

断网之后可以尝试把蓝牙关闭

## 查看实时日志

``` shell
sudo journalctl -f      # 查看实时日志
```

## 系统假死状态的判断

``` shell
ctrl alt F[1 ~ 6]       ## 可进入ttf，则判断系统假死
sudo sysctl vm.swappiness=20
```

如果不随意切换系统的话，就不太容易出现这种情况。

## wifi自动中断

2018-06-19 09:23  
deepin 15.6 的版本可能已经解决了wifi断网的问题，但是默认采用performance的CPU运行方式，能耗比较高，
apt 安装cpupower 设置governor 为powersave，在那个current policy里头可以看到。
此外，为了方便主机与虚拟机之间的通信，可以apt 安装vsftpd 使用ftp 来传输文件。

## wps数学公式的显示不正常

2018-06-19 14:47  
用wps打开包含数学公式的文件，可能会出现乱码，字符不显示的问题，需要安装一个symbol.ttf文件  
[点击下载](https://www.cr173.com/font/32458.html),
使用字体安装器安装。

## Chrome浏览器添加搜索引擎（必应）

2018-06-22 18:38  
Chrome浏览器添加必应为默认搜索引擎，
在添加必应的网址的时候，需要写成（添加该引擎的搜索串）：

``` html
http://cn.bing.com/search?q=%s
```

## dmidecode指令（查询主板..信息

2018-06-23 15:16  
向终端中输入dmidecode 可以查看设备的主板、Bios、处理器信息等

## VsCode下Markdown&&控制台的呼出

2018-06-25 07:14

1. 在VsCode中安装扩展Markdown PDF 可以进行Markdown 编辑
2. 按ctrl + shift + y 呼出控制台

## VsCode下使用code runner&&JDK环境变量配置

2018-06-25 11:33  

1. 在VsCode中安装扩展code runner，在不需要过多配置的情况下可以运行c、java等程序
1. Linux下配置java环境变量  
    找到/etc/profile文件，添加
    ``` shell
    export JAVA_HOME=[jdk的路径]
    export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
    export PATH=$JAVA_HOME/bin:$PATH
    ```
    写完重启一下，再输入javac

## 手动挂载硬盘

fdisk指令查看当前所有硬盘
设置硬盘的挂载点，找一个地方mkdir  
使用mount指令将硬盘挂载到挂载点

``` shell
fdisk -l
cd [挂载点路径]
mkdir [挂载点的名称]
sudo mount [硬盘分区路径] [挂载点路径]
```

使用umount指令取消挂载

## 查看所有进程

2018年10月6日 9:24:57

``` shell
ps -aux
```

## 添加壁纸

2018年 11月 06日 星期二 22:49:52 CST

壁纸在路径

``` shell
/usr/share/wallpapers/deepin/
```

管理员身份打开即可

## 启动mysql

2018年 11月 06日 星期二 23:01:53 CST

命令行输入启动mysql

``` shell
sudo mysql -u root -p
```

## deepin 15.6 之后， VScode 接资源管理器

2018年 12月 15日 星期六 22:57:56 CST

命令行输入：

``` shell
xdg-mime default dde-file-manager.desktop inode/directory
```