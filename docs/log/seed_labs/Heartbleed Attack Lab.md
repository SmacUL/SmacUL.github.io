# Heartbleed Attack Lab

## Pre-Experiment
openssl 版本 1.0.1 至 1.0.1f 存在 Headbleed Bug. 攻击者可以从受害者的内存中读取敏感信息. 

需要两台虚拟机, 攻击者与受害者. 需要一个支持 HTTPS 协议的站点. `https://www.heartbleedlabelgg.com.` 已经被部署在虚拟机中. 

ELGG Application 是什么?

心跳包信息包括心跳请求与心跳响应. 用户发送一份一个心跳包请求包给服务端, 服务端会复制心跳请求中的内容到心跳响应中并再返回给客户端. 

[实验指导](https://seedsecuritylabs.org/Labs_16.04/PDF/Heartbleed.pdf)

## T1 Launch the Heartbleed Attack

<!-- 好消息, 我们需要转移 SEED 中的项目, 包括 Appache 与 MySQL 的内容.  -->

发动攻击的前提是, 受害者的内存中有相关的内容, 故 Do As Follow: 
1. 访问 `https://www.heartbleedlabelgg.com`
1. User Name:admin; Password:seedelgg 登录
1. Go to More -> Members and click Boby -> Add Friend 添加朋友
1. 给 Boby 发一条私人信息

现在受害者的内存充实了起来, 可以搞事情了. *Seed Lab* 提供了 attack.py. 
``` sh
$ ./attack.py www.heartbleedlabelgg.com
```
寻找接下来的内容: 
- User name and password.
- User’s activity (what the user has done).
- The exact content of the private message.

这个程序可能需要执行好多次. 

需要好好康康那个 attack.py. 

![](/note/img/2020-03-13-10-37-06.png)

## T2 Find the Cause of the Heartbleed Vulnerability

这个攻击原理和缓冲区溢出非常相似, 心跳请求包的内容标称长度大于实际长度, 服务端收到心跳请求包后会依据标称长度复制内容, 除了请求包的实际内容外还包括服务器内存中的内容. 

这一段实验的任务就是修改内容标称长度, *payload length*. 默认情况下, attack.py 的 *payload length* 为 0x4000. 

下面是一个例子:
``` sh
$ ./attack.py www.heartbleedlabelgg.com -l 0x015B
```

### Q2.1 

不断减少 *payload length* 的值, 服务端返回的心跳响应内容会有什么不同?

内容会越来越少. 

### Q2.2

寻找 *preload length* 的边界值, 当 *payload length* 低于这个边界值的时候, 服务端将不再返回 "额外的数据", 同时程序会提示: 
> Server processed malformed Heartbeat, but did not return any extra data

![](/note/img/2020-03-13-10-25-58.png)

## T3 Countermeasure and Bug Fix

防止 Heart Bleed 问题的最好办法就是升级 openssl. 
``` sh
$ sudo apt-get update
# 底下这个操作应该可以不用, 花时间很长
$ sudo apt-get upgrade
```

::: tip
一旦升级了 openssl, 想再退回去就是一件比较困难的事情. 
:::

### T3.1 

升级之后, 重复之前的实验. 

### T3.2 

给出了两个代码片段, 我们需要找出出现 Heartbleed 的原因, 并且给出可行的解决方案. 

``` c
struct {
    // 信息类别 1B
    HeartbeatMessageType type; 
    // 负载长度 2B
    response uint16 payload_length; 
    opaque payload[HeartbeatMessage.payload_length]; 
    opaque padding[padding_length];
} HeartbeatMessage;
```

下面的程序展示了产生心跳请求包, 生成心跳响应包的过程. 

``` c
// 为响应申请内容, 长度为: 1B 信息类别 + 2B 负载长度 + 负载 + padding
// 这里是不是少了一句内存申请? 

// 负载长度
unsigned int payload;
// 使用最小 padding
unsigned int padding = 16; 
// 先读取 类别区 (hbtype 应该是 信息类别), 之后指针前推, 指向 负载长度区
hbtype = *p++; 
// n2s 函数从指针 p 读取 16b, 并且将值保存在 payload 中, 即将长度保存在 payload 中. 
n2s(p, payload); 

// pl 指向了负载内容的开头
pl=p; 
// 如果类别为 心跳请求 TLS1_HB_REQUEST
if (hbtype == TLS1_HB_REQUEST) {
    unsigned char *buffer, *bp;
    int r;
    // 为响应申请内存缓冲区, 长度为: 1B 信息类别 + 2B 负载长度 + 负载 + padding 
    buffer = OPENSSL_malloc(1 + 2 + payload + padding); 
    // bp 指向缓冲区
    bp = buffer;
    // 向 buffer 输入 信息类别, 指针前移
    *bp++ = TLS1_HB_RESPONSE;
    // 向 buffer 中输入负载长度. 
    s2n(payload, bp);
    // 复制负载内容, pl 指向了 负载内容开头
    memcpy(bp, pl, payload); 
    // bp 指针继续前推
    bp += payload;
    // 随机 padding
    RAND_pseudo_bytes(bp, padding);

    // 这个方法将复制 {3B + payload + padding} 长度的缓冲内容到 心跳响应包中, 为何 OPENSSL_free 方法在前? 
    OPENSSL_free(buffer);
    r = ssl3_write_bytes(s, TLS1_RT_HEARTBEAT, buffer,
      3 + payload + padding);
}
```


此外, 实验指导最后给出了三个小伙伴的讨论内容: 
- 在复制缓冲内容时缺乏边界检查
- 缺少用户输入验证
- 直接删掉 *payload length* 就完事大吉了. 

我们需要对上面的讨论内容作出评论. 

负载的标记长度大于负载实际长度时, 会出现 HeartBleed 这样的错误. 

#### 在复制缓冲内容时缺乏边界检查

``` c
memcpy(bp, pl, payload); 
```
- `bp` 指向缓冲区开头
- `pl` 指向负载区开头
- `payload` 为请求包中标记的负载长度. 

在复制缓冲内容时, 程序没有对实际的负载长度进行检查, 只是依赖于请求包中的标记. 这个说法没什么毛病. 

---

#### 缺少用户输入验证
啥叫用户输入验证? 诸如 MD5? CheckSum? 

---

#### 直接删掉 *payload length* 

直接删除是不是会影响网络底层数据包的切分? 

--- 

应该防止用户直接修改 *payload length* 以及 *pl*, 或者完善缓冲区的边界检查. 
