# Ajax 与 Conet 

 

## XMLHttpRequest 对象 (XHR)

各个浏览器都支持原生的 XHR 对象; 
``` JS
var xhr = new XMLHttpRequest(); 
```
 

### XHR 的基本用法

- `xhr.open(请求类型, 请求的 URL ,     是否异步)`;  
    URL 相遇对执行代码的当前路径;  
    open 方法只是准备, 并不会发送请求;   
    是否异步的参数: true 为异步, false 为同步

- `xhr.send(作为请求主体发送的数据)`;   
    send 方法发送请求; 

 

### XHR 的返回数据处理(同步)

接受服务器响应数据:

服务器的响应数据会被自动填充到 xhr 的属性中;

 

响应数据一般有:

- status
- statusText
- responseText
- responseXML

响应内容为 text/xml 或者 application/xml 

这个属性中将保存包含着响应数据的 XML DOM 文档;

 

对响应数据的处理:

1. 检查 status 属性, HTTP 的代码; 

`xhr.staus >= 200 && xhr.status < 300 || xhr.status = 304`

1. 访问 XHR 的 `responseText` 或 `responseXML`

`xhr.responseText / xhr.reponseXML`

 

### XHR 的返回数据处理(异步)

XHR 的 readyState 属性标明了 请求-响应 过程的各个活动阶段;

- 0 未初始化  
    没有调用 open 方法
- 1 启动  
    调用了 open 方法, 没有调用 send 方法
- 2 发送  
    调用了open 和 send 方法
- 3 接收  
    响应数据接收过程
- 4 完成  
    响应数据接收完毕, 可以在客户端使用

 

只要 `readyState` 属性的值变化时, 就会触发 `readystatechange` 事件; 

在调用 `open()` 方法之前, 需要设置 `readystatechange` 的监听器;

在访问响应数据前, 检查 `readyState` 的属性是否为 4 ;

 
``` JS
var xhr = createXHR(); 
xhr.onreadystatechange = function(){ 
    if (xhr.readyState == 4){
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){ 
            alert(xhr.responseText);
        } else { 
            alert("Request was unsuccessful: " + xhr.status); 
        }
    } 
};
xhr.open("get", "example.txt", true); 
xhr.send(null);
```
 

 

### HTTP 头部信息

### GET 请求

### POST 请求

post 请求会将数据作为请求的主体提交, 这是与 get 请求的一大区别;

可以将需要发送给服务器的数据封装之后 交给 send 方法

 

## XMLHttpRequest 对象 (2 级 XHR)

 

### FormData 传输数据格式规范

FormData 用于序列化表单以及创建与表单格式相同的数据; 
``` JS
var form = document.getElementById("user-info"); 
xhr.send(new FormData(form)); 
```

### timeout 超时设定 (仅仅 IE)

timeout 单位是毫秒; 

xhr 可以在超时之后触发 timeout 事件, 

``` JS
xhr.time = 1000;
xhr.ontimeout = function() {
    alert("timeout");
};
```

 

### overrideMimeType 方法

MIME 多用途互联网邮件扩展类型; 

 

## 进度事件

 

### load 事件

一开始 firefox 使用了 load 事件, 在响应数据接收完毕后触发; 

但是由于历史原因, 只要浏览器接到服务器的响应, 不论状态如何, 都会触发 load 事件; 

 

### progress 事件

 

## 跨源资源共享

 

跨域的一般用于两个方面: 

- 访问远程资源, 而非本地内容; 
- 前后端分离的项目, 服务器的域不一致; 

 

### IE 对 CORS 的实现

 

CORS: Cross-Origin Resouce Sharing 跨源资源共享, 

定义了在访问跨原资源时, 浏览器与服务器应该如果沟通; 

 

核心思想: 

使用自定义的 HTTP 头部, 让浏览器与服务器进行沟通,

从而决定请求或响应是否应该成功; 

 

有一个重要的东西: Access-Control-Allow-Origin ?

 

 

IE 引入了 XDR (XHR 的跨域版本) ;

XDR 的使用方法和 XHR 类似, 需要先使用 open 方法, 然后使用 send 方法; 

 

使用 XDR 需要注意的地方: 

- XDR 默认是异步通信; 
- XDR 返回的数据只有原始本文, 没有状态代码;
- 只要访问有效, 就会触发 load 事件;
- 如果失败, 就会触发 error 事件,     没有报错信息;
- load 和 error       
    事件的处理程序都要自己写, load 是必须的, error 可以不用; 

 

### 其他浏览器对 CORS 的实现

相比 IE , 其他浏览器就聪明的多, 使用标准的 XHR , 

并在 open 方法传入绝对 URL 即可; 

 

这样的 XHR 可以访问 status 和 statusText 属性, 支持同步请求; 

 

跨域 XHR 对象的限制: 

- 不能使用 `setRequestHeader()`     设定自定义头部
- 不能发送和接受 cookie
- 调用     `getAllResponseHeaders()` 方法总会返回空字符串; 

 

建议本地资源使用相对路径, 远程资源使用绝对路径; 

 

### Prefligted Requests

Prefligted Requests 是 CORS 的高阶使用方法, 

允许用户: 

- 使用自定义的头部; 
- GET 或 POST 以外的方法; 
- 发送不同类型的主体内容; 

 

### 带凭据的请求

凭据: cookie / HTTP 认证 / 客户端 SSL 证明

### 跨浏览器的 CORS

 

## 其他跨域技术

### 图像 Ping

### JSONP

 

JSON with padding , 

script 标签不受域的限制, 可以随意访问; 

分成两个部分, 回调函数和响应数据; 回调函数在本地, 响应数据在远程;

 

客户端通过 script 的 src 属性传入访问的 URL 以及本地的回调函数名, 

服务器收到之后, 会将 response 加载到客户端的回调函数中;

 
``` JS
function handleResponse(response){
    alert("You’re at IP address " + response.ip + ", which is in " + 
    response.city + ", " + response.region_name); 
}
var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse"; 
document.body.insertBefore(script, document.body.firstChild); 
```
 

 

### Comet

Ajax 是一种 从客户端访问服务器的技术, 

Comet 是一种 服务器向页面推送数据的技术; 

 

Comet 的实现方式: 长轮询 和 流

 

- 短轮询

浏览器时不时地向服务器发起请求, 查询是否有新的数据; 

- 长轮询

浏览器向服务器发起请求, 查询是否有新的数据, 

如果有新的数据, 服务端才向浏览器发送响应, 完毕后连接关闭,

浏览器再重新向服务器发起请求; 

- HTTP 流

不同于轮询, 流在页面的整个生命周期内只使用一个 HTTP 连接;

浏览器一开始就会向服务器发送一个请求, 而服务器保持连接, 

同时服务器周期性地向浏览器发送数据; 

XHR readstatechange 事件 readyState 是否为 3 (客户端开始接受数据)

readyState 为 4 时, 打包所有数据; 

``` JS
function createStreamingClient(url, progress, finished){ 
	var xhr = new XMLHttpRequest(), received = 0; 
	xhr.open("get", url, true); 
	xhr.onreadystatechange = function(){ 
		var result;
		if (xhr.readyState == 3){ 
			//只取得最新数据并调整计数器
			result = xhr.responseText.substring(received);
			received += result.length; 
			//调用 progress 回调函数
			progress(result); 
		} else if (xhr.readyState == 4){ 
			finished(xhr.responseText); 
		} 
	}; 
	xhr.send(null); return xhr; 
} 

var client = createStreamingClient("streaming.php", 
			function(data){ alert("Received: " + data); }, 
			function(data){ alert("Done!"); }
); 
```

 

 

### 服务器发送事件

### Web Sockets

### SSE 和 WebSockets