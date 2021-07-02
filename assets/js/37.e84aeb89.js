(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{254:function(a,t,s){"use strict";s.r(t);var n=s(0),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"heartbleed-attack-lab"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#heartbleed-attack-lab"}},[a._v("#")]),a._v(" Heartbleed Attack Lab")]),a._v(" "),s("h2",{attrs:{id:"pre-experiment"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#pre-experiment"}},[a._v("#")]),a._v(" Pre-Experiment")]),a._v(" "),s("p",[a._v("openssl 版本 1.0.1 至 1.0.1f 存在 Headbleed Bug. 攻击者可以从受害者的内存中读取敏感信息.")]),a._v(" "),s("p",[a._v("需要两台虚拟机, 攻击者与受害者. 需要一个支持 HTTPS 协议的站点. "),s("code",[a._v("https://www.heartbleedlabelgg.com.")]),a._v(" 已经被部署在虚拟机中.")]),a._v(" "),s("p",[a._v("ELGG Application 是什么?")]),a._v(" "),s("p",[a._v("心跳包信息包括心跳请求与心跳响应. 用户发送一份一个心跳包请求包给服务端, 服务端会复制心跳请求中的内容到心跳响应中并再返回给客户端.")]),a._v(" "),s("p",[s("a",{attrs:{href:"https://seedsecuritylabs.org/Labs_16.04/PDF/Heartbleed.pdf",target:"_blank",rel:"noopener noreferrer"}},[a._v("实验指导"),s("OutboundLink")],1)]),a._v(" "),s("h2",{attrs:{id:"t1-launch-the-heartbleed-attack"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#t1-launch-the-heartbleed-attack"}},[a._v("#")]),a._v(" T1 Launch the Heartbleed Attack")]),a._v(" "),s("p",[a._v("发动攻击的前提是, 受害者的内存中有相关的内容, 故 Do As Follow:")]),a._v(" "),s("ol",[s("li",[a._v("访问 "),s("code",[a._v("https://www.heartbleedlabelgg.com")])]),a._v(" "),s("li",[a._v("User Name:admin; Password:seedelgg 登录")]),a._v(" "),s("li",[a._v("Go to More -> Members and click Boby -> Add Friend 添加朋友")]),a._v(" "),s("li",[a._v("给 Boby 发一条私人信息")])]),a._v(" "),s("p",[a._v("现在受害者的内存充实了起来, 可以搞事情了. "),s("em",[a._v("Seed Lab")]),a._v(" 提供了 attack.py.")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v("$ ./attack.py www.heartbleedlabelgg.com\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("p",[a._v("寻找接下来的内容:")]),a._v(" "),s("ul",[s("li",[a._v("User name and password.")]),a._v(" "),s("li",[a._v("User’s activity (what the user has done).")]),a._v(" "),s("li",[a._v("The exact content of the private message.")])]),a._v(" "),s("p",[a._v("这个程序可能需要执行好多次.")]),a._v(" "),s("p",[a._v("需要好好康康那个 attack.py.")]),a._v(" "),s("p",[s("img",{attrs:{src:"/note/img/2020-03-13-10-37-06.png",alt:""}})]),a._v(" "),s("h2",{attrs:{id:"t2-find-the-cause-of-the-heartbleed-vulnerability"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#t2-find-the-cause-of-the-heartbleed-vulnerability"}},[a._v("#")]),a._v(" T2 Find the Cause of the Heartbleed Vulnerability")]),a._v(" "),s("p",[a._v("这个攻击原理和缓冲区溢出非常相似, 心跳请求包的内容标称长度大于实际长度, 服务端收到心跳请求包后会依据标称长度复制内容, 除了请求包的实际内容外还包括服务器内存中的内容.")]),a._v(" "),s("p",[a._v("这一段实验的任务就是修改内容标称长度, "),s("em",[a._v("payload length")]),a._v(". 默认情况下, attack.py 的 "),s("em",[a._v("payload length")]),a._v(" 为 0x4000.")]),a._v(" "),s("p",[a._v("下面是一个例子:")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v("$ ./attack.py www.heartbleedlabelgg.com -l 0x015B\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("h3",{attrs:{id:"q2-1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#q2-1"}},[a._v("#")]),a._v(" Q2.1")]),a._v(" "),s("p",[a._v("不断减少 "),s("em",[a._v("payload length")]),a._v(" 的值, 服务端返回的心跳响应内容会有什么不同?")]),a._v(" "),s("p",[a._v("内容会越来越少.")]),a._v(" "),s("h3",{attrs:{id:"q2-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#q2-2"}},[a._v("#")]),a._v(" Q2.2")]),a._v(" "),s("p",[a._v("寻找 "),s("em",[a._v("preload length")]),a._v(" 的边界值, 当 "),s("em",[a._v("payload length")]),a._v(' 低于这个边界值的时候, 服务端将不再返回 "额外的数据", 同时程序会提示:')]),a._v(" "),s("blockquote",[s("p",[a._v("Server processed malformed Heartbeat, but did not return any extra data")])]),a._v(" "),s("p",[s("img",{attrs:{src:"/note/img/2020-03-13-10-25-58.png",alt:""}})]),a._v(" "),s("h2",{attrs:{id:"t3-countermeasure-and-bug-fix"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#t3-countermeasure-and-bug-fix"}},[a._v("#")]),a._v(" T3 Countermeasure and Bug Fix")]),a._v(" "),s("p",[a._v("防止 Heart Bleed 问题的最好办法就是升级 openssl.")]),a._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[a._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" update\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# 底下这个操作应该可以不用, 花时间很长")]),a._v("\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sudo")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("apt-get")]),a._v(" upgrade\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br")])]),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),s("p",[a._v("一旦升级了 openssl, 想再退回去就是一件比较困难的事情.")])]),a._v(" "),s("h3",{attrs:{id:"t3-1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#t3-1"}},[a._v("#")]),a._v(" T3.1")]),a._v(" "),s("p",[a._v("升级之后, 重复之前的实验.")]),a._v(" "),s("h3",{attrs:{id:"t3-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#t3-2"}},[a._v("#")]),a._v(" T3.2")]),a._v(" "),s("p",[a._v("给出了两个代码片段, 我们需要找出出现 Heartbleed 的原因, 并且给出可行的解决方案.")]),a._v(" "),s("div",{staticClass:"language-c line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("struct")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 信息类别 1B")]),a._v("\n    HeartbeatMessageType type"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 负载长度 2B")]),a._v("\n    response uint16 payload_length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n    opaque payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("HeartbeatMessage"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("payload_length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n    opaque padding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("padding_length"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v(" HeartbeatMessage"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br")])]),s("p",[a._v("下面的程序展示了产生心跳请求包, 生成心跳响应包的过程.")]),a._v(" "),s("div",{staticClass:"language-c line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 为响应申请内容, 长度为: 1B 信息类别 + 2B 负载长度 + 负载 + padding")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 这里是不是少了一句内存申请? ")]),a._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 负载长度")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("unsigned")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 使用最小 padding")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("unsigned")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" padding "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("16")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 先读取 类别区 (hbtype 应该是 信息类别), 之后指针前推, 指向 负载长度区")]),a._v("\nhbtype "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v("p"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// n2s 函数从指针 p 读取 16b, 并且将值保存在 payload 中, 即将长度保存在 payload 中. ")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("n2s")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("p"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// pl 指向了负载内容的开头")]),a._v("\npl"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("p"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n"),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 如果类别为 心跳请求 TLS1_HB_REQUEST")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("if")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("hbtype "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("==")]),a._v(" TLS1_HB_REQUEST"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("unsigned")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v("buffer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v("bp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("int")]),a._v(" r"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 为响应申请内存缓冲区, 长度为: 1B 信息类别 + 2B 负载长度 + 负载 + padding ")]),a._v("\n    buffer "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("OPENSSL_malloc")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" payload "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" padding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// bp 指向缓冲区")]),a._v("\n    bp "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" buffer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 向 buffer 输入 信息类别, 指针前移")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v("bp"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("++")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" TLS1_HB_RESPONSE"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 向 buffer 中输入负载长度. ")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("s2n")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" bp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 复制负载内容, pl 指向了 负载内容开头")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("memcpy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("bp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" pl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// bp 指针继续前推")]),a._v("\n    bp "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+=")]),a._v(" payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 随机 padding")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("RAND_pseudo_bytes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("bp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" padding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[a._v("// 这个方法将复制 {3B + payload + padding} 长度的缓冲内容到 心跳响应包中, 为何 OPENSSL_free 方法在前? ")]),a._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("OPENSSL_free")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("buffer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n    r "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("ssl3_write_bytes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("s"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" TLS1_RT_HEARTBEAT"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" buffer"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n      "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" payload "),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("+")]),a._v(" padding"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br"),s("span",{staticClass:"line-number"},[a._v("2")]),s("br"),s("span",{staticClass:"line-number"},[a._v("3")]),s("br"),s("span",{staticClass:"line-number"},[a._v("4")]),s("br"),s("span",{staticClass:"line-number"},[a._v("5")]),s("br"),s("span",{staticClass:"line-number"},[a._v("6")]),s("br"),s("span",{staticClass:"line-number"},[a._v("7")]),s("br"),s("span",{staticClass:"line-number"},[a._v("8")]),s("br"),s("span",{staticClass:"line-number"},[a._v("9")]),s("br"),s("span",{staticClass:"line-number"},[a._v("10")]),s("br"),s("span",{staticClass:"line-number"},[a._v("11")]),s("br"),s("span",{staticClass:"line-number"},[a._v("12")]),s("br"),s("span",{staticClass:"line-number"},[a._v("13")]),s("br"),s("span",{staticClass:"line-number"},[a._v("14")]),s("br"),s("span",{staticClass:"line-number"},[a._v("15")]),s("br"),s("span",{staticClass:"line-number"},[a._v("16")]),s("br"),s("span",{staticClass:"line-number"},[a._v("17")]),s("br"),s("span",{staticClass:"line-number"},[a._v("18")]),s("br"),s("span",{staticClass:"line-number"},[a._v("19")]),s("br"),s("span",{staticClass:"line-number"},[a._v("20")]),s("br"),s("span",{staticClass:"line-number"},[a._v("21")]),s("br"),s("span",{staticClass:"line-number"},[a._v("22")]),s("br"),s("span",{staticClass:"line-number"},[a._v("23")]),s("br"),s("span",{staticClass:"line-number"},[a._v("24")]),s("br"),s("span",{staticClass:"line-number"},[a._v("25")]),s("br"),s("span",{staticClass:"line-number"},[a._v("26")]),s("br"),s("span",{staticClass:"line-number"},[a._v("27")]),s("br"),s("span",{staticClass:"line-number"},[a._v("28")]),s("br"),s("span",{staticClass:"line-number"},[a._v("29")]),s("br"),s("span",{staticClass:"line-number"},[a._v("30")]),s("br"),s("span",{staticClass:"line-number"},[a._v("31")]),s("br"),s("span",{staticClass:"line-number"},[a._v("32")]),s("br"),s("span",{staticClass:"line-number"},[a._v("33")]),s("br"),s("span",{staticClass:"line-number"},[a._v("34")]),s("br"),s("span",{staticClass:"line-number"},[a._v("35")]),s("br"),s("span",{staticClass:"line-number"},[a._v("36")]),s("br"),s("span",{staticClass:"line-number"},[a._v("37")]),s("br"),s("span",{staticClass:"line-number"},[a._v("38")]),s("br")])]),s("p",[a._v("此外, 实验指导最后给出了三个小伙伴的讨论内容:")]),a._v(" "),s("ul",[s("li",[a._v("在复制缓冲内容时缺乏边界检查")]),a._v(" "),s("li",[a._v("缺少用户输入验证")]),a._v(" "),s("li",[a._v("直接删掉 "),s("em",[a._v("payload length")]),a._v(" 就完事大吉了.")])]),a._v(" "),s("p",[a._v("我们需要对上面的讨论内容作出评论.")]),a._v(" "),s("p",[a._v("负载的标记长度大于负载实际长度时, 会出现 HeartBleed 这样的错误.")]),a._v(" "),s("h4",{attrs:{id:"在复制缓冲内容时缺乏边界检查"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#在复制缓冲内容时缺乏边界检查"}},[a._v("#")]),a._v(" 在复制缓冲内容时缺乏边界检查")]),a._v(" "),s("div",{staticClass:"language-c line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-c"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[a._v("memcpy")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("bp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" pl"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v(" \n")])]),a._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[a._v("1")]),s("br")])]),s("ul",[s("li",[s("code",[a._v("bp")]),a._v(" 指向缓冲区开头")]),a._v(" "),s("li",[s("code",[a._v("pl")]),a._v(" 指向负载区开头")]),a._v(" "),s("li",[s("code",[a._v("payload")]),a._v(" 为请求包中标记的负载长度.")])]),a._v(" "),s("p",[a._v("在复制缓冲内容时, 程序没有对实际的负载长度进行检查, 只是依赖于请求包中的标记. 这个说法没什么毛病.")]),a._v(" "),s("hr"),a._v(" "),s("h4",{attrs:{id:"缺少用户输入验证"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#缺少用户输入验证"}},[a._v("#")]),a._v(" 缺少用户输入验证")]),a._v(" "),s("p",[a._v("啥叫用户输入验证? 诸如 MD5? CheckSum?")]),a._v(" "),s("hr"),a._v(" "),s("h4",{attrs:{id:"直接删掉-payload-length"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#直接删掉-payload-length"}},[a._v("#")]),a._v(" 直接删掉 "),s("em",[a._v("payload length")])]),a._v(" "),s("p",[a._v("直接删除是不是会影响网络底层数据包的切分?")]),a._v(" "),s("hr"),a._v(" "),s("p",[a._v("应该防止用户直接修改 "),s("em",[a._v("payload length")]),a._v(" 以及 "),s("em",[a._v("pl")]),a._v(", 或者完善缓冲区的边界检查.")])])}),[],!1,null,null,null);t.default=e.exports}}]);