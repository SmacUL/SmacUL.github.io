# 操作系统实验

## Linux系统信号表

信号 | 说明 | 默认动作
-- | -- | -- |
SIGABRT | 异常终止（abort）| 终止 + core
SIGALRM | 定时器超时（alarm） | 终止
SIGBUS | 硬件故障（内存故障） | 终止 + core
SIGCHLD | 子进程状态改变 | 忽略
SIGCONT | 使暂停进程继续运行 | 继续/忽略
SIGEMT | 硬件故障 | 终止 + core
SIGFPE | 算术运算异常（浮点溢出） | 终止 + core
SIGHUP | 连接断开 | 终止
SIGILL | 非法硬件指令 | 终止 + core
SIGINT | 终端中断符（Ctrl + C） | 终止
SIGIO | 异步I/O | 终止/忽略
SIGIOT | 硬件故障 | 终止 + core
SIGKILL | 终止 | 终止
SIGPIPE | 写至无读进程的管道 |终止
SIGPOLL | 轮询事件 | 终止
SIGPROF | 梗概时间超时（setitimer） | 终止
SIGPWR | 电源失效/重启动 | 终止/忽略
SIGQUIT  | 终端退出 | 终止 + core
SIGSEGV | 无效内存引用（如访问了一个未经初始化的指针） | 终止 + core
SIGSTKFLT | 协处理器栈故障 |  终止
SIGSTOP | 停止进程 |  停止
SIGSYS | 无效系统调用 |  终止 + core
SIGTREM | kill发送的系统默认终止信号 | 终止
SIGTRAP | 硬件故障 |  终止 + core
SIGTSTP | 终端停止（Ctrl + Z） |  停止
SIGTTIN | 后台读取控制终端 |  停止
SIGTTOU | 后台写入控制终端 |  停止
SIGURG | 紧急情况（套接字、带外数据） |  忽略
SIGUSR1 | 用户定义信号，可用于应用程序 |  终止
SIGUSR2 | 用户定义信号，可用于应用程序 |  终
SIGVTALRM | 虚拟时间闹钟（setitimer） |  终止
SIGWINCH | 终端窗口大小改变 | 忽略
SIGXCPU | 超过CPU限制（setrlimit） |  终止 + core
SIGXFSZ | 超过文件长度限制（setrlimit） |  终止 + core

下面的这些实验是在Linux环境下执行的，利用Linux提供的系统调用，完成相应要求。

## 进程的创建

``` c
#include<stdio.h>
#include<unistd.h>
int main() {
    int p1, p2;
    while ((p1 = fork()) == -1);
    if (p1 == 0) {
        putchar('b');
    } else {
        while((p2 = fork()) == -1);
        if (p2 == 0) {
            putchar('c');
        } else {
            putchar('a');
        }
    }
}
```

### 函数说明

- fork 方法可以用来创建子进程，创建成功之后将返回0，这个值将被作为子进程在整个程序运行中的代号，但是区别于它的pid（进程号）

## 软中断通信

使用系统调用 fork 创建2个子进程 p1 和 p2，在父进程中使用系统调用 signal 捕捉来自键盘上的软中断信号SIGINT(即按Ctrl-C)，当捕捉到软中断信号 SIGINT 后，父进程使用系统调用 kill 分别向2个子进程发出软中断信号 SIGUSR1 和 SIGUSR2，子进程捕捉到信号后分别输出信息“Child process p1 is killed by parent！”和“Child process p2 is killed by parent！”后终止。而父进程等待2个子进程终止后，输出信息“Parent process is killed！”后终止。

``` c
#include<stdio.h>
#include<unistd.h>
#include<signal.h>
#include<stdlib.h>
#include<sys/wait.h>
#include<sys/types.h>

/**
 * start stop waitting 方法用来配合signal方法，
 * 在进程遇到signal方法时，进入循环暂停
 */
int stop_signal = -1;

void start() {
    stop_signal = 0;
}

void stop() {
    stop_signal = -1;
}

void waitting() {
    while(stop_signal != 0);
}

/**
 * resA resB 方法用于在子进程中处理SIGINT信号
 */
void resA() {
    printf("\np1 has handled SIGINT signal\n");
    start();
}

void resB() {
    printf("\np2 has handled SIGINT signal\n");
    start();
}



int main() {
    int p1 = -1;
    int p2 = -1;

    while((p1 = fork()) == -1);

    if (p1 > 0) {
        while((p2 = fork()) == -1);
        // 父进程逻辑
        if (p2 > 0) {
            printf("father process start\n");

            stop();
            signal(SIGINT, start);
            waitting();

            // 等待子进程相应部分执行完毕
            sleep(2);
            kill(p1, SIGUSR1);
            kill(p2, SIGUSR2);
            wait(0);
            wait(0);

            printf("parent process is killed\n");
            exit(0);
        } else {
            printf("p2 start\n");
            // 处理SIGINT信号
            stop();
            signal(SIGINT, resB);
            waitting();
            printf("p2 block\n");

            // 处理SIGUSR2信号
            stop();
            signal(SIGUSR2, start);
            waitting();

            printf("child process p2 is killed by parent\n");
            exit(0);
        }

    } else {
        printf("p1 start\n");
        // 处理SIGINT信号
        stop();
        signal(SIGINT, resA);
        waitting();
        printf("p1 block\n");

        // 处理SIGUSR1信号
        stop();
        signal(SIGUSR1, start);
        waitting();

        printf("child process p1 is killed by parent\n");
        exit(0);
    }
}
```

### 函数说明

- signal 方法能够将信号和相应的操作进行绑定，但是自身不具备让进程等待的能力（即进程的主逻辑不会停下来去执行signal 方法所指定的操作），因而在signal 方法的两侧添加了一下阻塞机制。signal方法接受两个参数，信号和相应的执行操作，现在已经被sigaction 方法代替，为了增强兼容性，任然保留这个方法。

- wait 方法能够获得子进程执行完毕之后的状态。

- kill 方法接受两个参数，子进程代号和需要发送的信号，这个方法能够将信号传递给相应的子进程。

- exit 方法能够使进程退出，接受一个整型的参数，0~127（貌似）

- SIGINT 信号：即ctrl + c，在命令行下能够使进程中断。

- SIGUSR1 SIGSER2 信号：系统允许用户自定义的信号？没有什么特殊含义，就是代号

### 软通信中断需要注意的地方

- 在开放环境下，父进程获取信号的同时，子进程也会获取，如果子进程中没有相应的信号处理程序，可能会导致子进程出现异常，比如Ctrl + c信号可以使进程强制中断。

- 系统调用中的signal 方法并不会使进程进入到等待的状态，需要额外添加阻塞的程序在signal方法的两侧。

- 同时有两个不同的signal 方法，存在连续相邻的处理逻辑，系统可能只会执行最后一个signal 方法（或者说用户只能看到最后一个signal 方法的执行结果，没有深究，存疑）。

- 进程之间的通信需要考虑时间的问题，可能存在A进程的没来得及向B进程发送信号，但是由于某种原因，B进程先执行，误以为A进程已经发送了信号，导致进程执行结果错误，需要在B进程中添加相应的阻塞、检查机制。
