# BOM 对象

 

- window     对象

- - 全局作用域
    - 窗口关系与框架      (Abandon)
    - 窗口位置
    - 窗口尺寸
    - 导航和窗口启动
    - 间歇调用和超时调用
    - 系统对话框

- location     对象

- - 查询字符串参数
    - 页面跳转操作

- navigator     对象

- screen     对象

- history     对象

 

## window 对象

 

通过 window 对象几乎可以访问到 任何 JS 允许访问的东西

 

网页: 页面的显示内容 (不包括开发者工具和顶部的工具栏)

浏览器: 指浏览器本身的尺寸

 

### 全局作用域

所有在全局作用域中声明的属性和方法都会变成 window 对象的属性和方法; 

在全局作用域中声明的变量不能被使用 delete 删除, 而 window 对象属性可以; 

访问未声明变量会抛出错误, 但是通过查询 window 对象, 可以知道某个对象是否存在:

```
var newValue = oldValue; // error
var newValue = window.oldValue // undefined
```

 

### 窗口关系与框架 (Abandon)

frame 是什么东西?

top 对象是什么?

parent 对象是什么?

当前框架的直接上层框架; 在没有框架的情况下,

 parent 就等于 top 等于 window 对象

每个 frame 都有自己的 window 对象

 

### 窗口位置

使用 window.screenX 和 window.screenLeft 

使用 window screenY 和 window.screenTop 

访问浏览器左边缘与当前显示器左边缘的距离

访问浏览器上边缘与当前显示器上边缘的距离

 

![重要](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHhlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAd///AAEAAAB3//8AAQAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABCgAwAEAAAAAQAAABAAAAAAf/nmuAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAAUdJREFUOBGNU0tOwzAQnbhIXZYIWFNuECjscwO4AeEG3UZsygLlGs0NygmANb9wA/Z80ixZxOGNZQfbSQOWohnPe29mNOMQDZyP7Cjhb4BCYggElgQUzIc4wSawvD6JpJAvjAspDsPLh6KPu7EDiNvKtu8nCd6z49gP8l1Qs4KZaKySFJxp3zFbICaInDvR7mUC3m03TLmawWc2WwL8K4mvz3fSp0TNgB2guc8YuL+K71rNyNnCPzthcRwuijUXcBJw4CubrRqiU/Z7jiNmvLNGiFXmHjE11KxNZYM7HZSLaFuOR28AzfoMr7WC6oMwLZijjtNBPRa8a19caa4ykkZqeCbmJBDWY0G791wNX4Q2b4wANrH83yHq9kuAFcTz3fR5aRP5xeIxcWwf+IXB2w50+zlWNDWgnWAvfbzDe5licVf4Q2OD/QAk/mtExMcVswAAAABJRU5ErkJggg==) window.moveBy() 和 window.moveTo() 方法在浏览器中可能会被禁用;

 

### 窗口尺寸

跨浏览器确定窗口大小 不是一件简单的事情; 

所以只考虑几件事: 

- 浏览器的大小; 
- 网页的大小; 
- 元素大小

从兼容性的角度考虑, 需要一个兼容代码;

 

- Chrome / Safari

- - 网页的显示高度

window.innerHeight

document.documentElement.clientHeight

- 网页的显示宽度

window.innerWidth 

document.documentElement.clientWidth

- 浏览器的高度

window.outerHeight 

- 浏览器的宽度

window.outerWidth

- 元素高度

element.clientHeight

- 元素宽度

element.clientWidth

- 竖直相对移动距离

```
document.documentElement.scrollTop
document.body.scrollTop (不可用)
window.pageYOffset
```

- 水平相对移动距离

```
document.documentElement.scrollLeft
document.body.scrollLeft (不可用)
window.pageXOffset
```

 

![重要](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHhlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAd///AAEAAAB3//8AAQAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABCgAwAEAAAAAQAAABAAAAAAf/nmuAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAAUdJREFUOBGNU0tOwzAQnbhIXZYIWFNuECjscwO4AeEG3UZsygLlGs0NygmANb9wA/Z80ixZxOGNZQfbSQOWohnPe29mNOMQDZyP7Cjhb4BCYggElgQUzIc4wSawvD6JpJAvjAspDsPLh6KPu7EDiNvKtu8nCd6z49gP8l1Qs4KZaKySFJxp3zFbICaInDvR7mUC3m03TLmawWc2WwL8K4mvz3fSp0TNgB2guc8YuL+K71rNyNnCPzthcRwuijUXcBJw4CubrRqiU/Z7jiNmvLNGiFXmHjE11KxNZYM7HZSLaFuOR28AzfoMr7WC6oMwLZijjtNBPRa8a19caa4ykkZqeCbmJBDWY0G791wNX4Q2b4wANrH83yHq9kuAFcTz3fR5aRP5xeIxcWwf+IXB2w50+zlWNDWgnWAvfbzDe5licVf4Q2OD/QAk/mtExMcVswAAAABJRU5ErkJggg==) clientTop 和 clientLeft 表达的是边框的尺寸; 

 

### 导航和打开窗口

window.open() 方法可以导航到一个特定的 URL , 也可以打开一个新的窗口; 

{@object}.close() 方法可以关闭一个由 window.open() 打开的窗口; 

 

大多数浏览器都内置有弹出窗口屏蔽程序, 

被浏览器屏蔽的窗口, 其 window.open 方法会返回一个 null ;

 

### 间歇调用和超时调用

Java 是单线程语言; 

 

- 间歇调用

每隔一段时间调用

Number <调用 ID>setInterval(<回调函数>, 指定时间(毫秒));

使用 clearIntever(调用 ID) 将间歇调用取消掉; 

- 超时调用

在指定时间后调用

Number <调用 ID> = setTimeout(<回调函数>, 指定时间(毫秒)); 

使用 clearTimeout(<调用 ID>) 将超时调用取消掉; 

![重要](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHhlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAd///AAEAAAB3//8AAQAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABCgAwAEAAAAAQAAABAAAAAAf/nmuAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAAUdJREFUOBGNU0tOwzAQnbhIXZYIWFNuECjscwO4AeEG3UZsygLlGs0NygmANb9wA/Z80ixZxOGNZQfbSQOWohnPe29mNOMQDZyP7Cjhb4BCYggElgQUzIc4wSawvD6JpJAvjAspDsPLh6KPu7EDiNvKtu8nCd6z49gP8l1Qs4KZaKySFJxp3zFbICaInDvR7mUC3m03TLmawWc2WwL8K4mvz3fSp0TNgB2guc8YuL+K71rNyNnCPzthcRwuijUXcBJw4CubrRqiU/Z7jiNmvLNGiFXmHjE11KxNZYM7HZSLaFuOR28AzfoMr7WC6oMwLZijjtNBPRa8a19caa4ykkZqeCbmJBDWY0G791wNX4Q2b4wANrH83yHq9kuAFcTz3fR5aRP5xeIxcWwf+IXB2w50+zlWNDWgnWAvfbzDe5licVf4Q2OD/QAk/mtExMcVswAAAABJRU5ErkJggg==) 一般认为, 使用超时调用来代替间歇调用是一种最佳模式

 

### 系统对话框

对话框主要有三种形式:

- alert()

提示

- confirm()

确定或取消(询问)

- prompt()

输入/确认/取消

 

## location 对象

location 对象提供了当期那窗口中加载的文档有关的信息(URL), 还有一些导航功能; 

location 对象既是 window 对象的属性, 也是 document 对象的属性; 

即 window.location === window.document

###  

### 查询字符串参数

 

### 页面跳转操作

- 页面跳转

location.assign({@String URL}) 

location.href = {@String URL}

window.location = {@String URL}

- 重加载

location.reload(); // 重新加载(从浏览器缓存中, 如果没有变化)

location.reload(true); // 重新加载(从服务器中)

 

![重要](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHhlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAd///AAEAAAB3//8AAQAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABCgAwAEAAAAAQAAABAAAAAAf/nmuAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAAUdJREFUOBGNU0tOwzAQnbhIXZYIWFNuECjscwO4AeEG3UZsygLlGs0NygmANb9wA/Z80ixZxOGNZQfbSQOWohnPe29mNOMQDZyP7Cjhb4BCYggElgQUzIc4wSawvD6JpJAvjAspDsPLh6KPu7EDiNvKtu8nCd6z49gP8l1Qs4KZaKySFJxp3zFbICaInDvR7mUC3m03TLmawWc2WwL8K4mvz3fSp0TNgB2guc8YuL+K71rNyNnCPzthcRwuijUXcBJw4CubrRqiU/Z7jiNmvLNGiFXmHjE11KxNZYM7HZSLaFuOR28AzfoMr7WC6oMwLZijjtNBPRa8a19caa4ykkZqeCbmJBDWY0G791wNX4Q2b4wANrH83yHq9kuAFcTz3fR5aRP5xeIxcWwf+IXB2w50+zlWNDWgnWAvfbzDe5licVf4Q2OD/QAk/mtExMcVswAAAABJRU5ErkJggg==) location 除了 href 属性之外还有别的属性; 

 

## navigator 对象

用于识别客户端浏览器 插件 及相关参数

 

## screen 对象

表明客户端能力, 包括浏览器窗口外部的显示器的信息;

 

## history 对象

用于保存用户上网的历史记录; 

从安全方面考虑, 开发人员无法得知用户浏览过的 URL ;

 

- 倒退一页

history.go(-1);

history.back();

- 前进一页

history.go(1);

history.forward();

- 历史长度

history.length

- 跳转到最近的指定页面 ?

history.go({@String URL})