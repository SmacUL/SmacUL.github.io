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


## T2 Find the Cause of the Heartbleed Vulnerability

这个攻击原理和缓冲区溢出非常相似, 心跳请求包的内容标称长度大于实际长度, 服务端收到心跳请求包后会依据标称长度复制内容, 除了请求包的实际内容外还包括服务器内存中的内容. 

这一段实验的任务就是修改内容标称长度, *payload length*. 默认情况下, attack.py 的 *payload length* 为 0x4000. 

下面是一个例子:
``` sh
$ ./attack.py www.heartbleedlabelgg.com -l 0x015B
```

### Q2.1 

不断减少 *payload length* 的值, 服务端返回的心跳响应内容会有什么不同?

### Q2.2

寻找 *preload length* 的边界值, 当 *payload length* 低于这个边界值的时候, 服务端将不再返回 "额外的数据". 

程序可能会提示: 
> Server processed malformed Heartbeat, but did not return any extra data

## T3 Countermeasure and Bug Fix

防止 Heart Bleed 问题的最好办法就是升级 openssl. 
``` sh
$ sudo apt-get update
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
    HeartbeatMessageType type; // 1 byte: request or the response uint16 payload_length; // 2 byte: the length of the payload
    opaque payload[HeartbeatMessage.payload_length]; 
    opaque padding[padding_length];
} HeartbeatMessage;
```

下面的程序展示了产生心跳请求包, 生成心跳响应包的过程. 

``` c
/* Allocate memory for the response, size is 1 byte
 * message type, plus 2 bytes payload length, plus
 * payload, plus padding
*/
unsigned int payload;
unsigned int padding = 16; /* Use minimum padding */
// Read from type field first
hbtype = *p++; 
/* After this instruction, the pointer
 * p will point to the payload_length field *.
// Read from the payload_length field
// from the request packet
n2s(p, payload); 

/* Function n2s(p, payload) reads 16 bits
* from pointer p and store the value * in the INT variable "payload". */

pl=p; // pl points to the beginning of the payload content
if (hbtype == TLS1_HB_REQUEST) {
     unsigned char *buffer, *bp;
     int r;
     /* Allocate memory for the response, size is 1 byte
* message type, plus 2 bytes payload length, plus
 * payload, plus padding
 */
buffer = OPENSSL_malloc(1 + 2 + payload + padding); bp = buffer;
// Enter response type, length and copy payload *bp++ = TLS1_HB_RESPONSE;
s2n(payload, bp);
// copy payload
memcpy(bp, pl, payload); 
/* pl is the pointer which
 * points to the beginning
 * of the payload content 
*/
bp += payload;
// Random padding RAND_pseudo_bytes(bp, padding);
// this function will copy the 3+payload+padding bytes
// from the buffer and put them into the heartbeat response
}
// packet to send back to the request client side. OPENSSL_free(buffer);
r = ssl3_write_bytes(s, TLS1_RT_HEARTBEAT, buffer,
      3 + payload + padding);
```


此外, 实验指导最后给出了三个小伙伴的讨论内容: 
- 在复制缓冲内容时缺乏边界检查
- 缺少用户输入验证
- 直接删掉 *payload length* 就完事大吉了. 

我们需要对上面的讨论内容作出评论. 