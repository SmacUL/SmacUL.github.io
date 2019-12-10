# CSS 的基本布局
<!-- [[toc]] -->
<!-- • 盒子尺寸控制
• 定位机制
    ○ 普通流
    ○ 浮动
    ○ 定位
        - static
        - relative
        - absolute
        - fixed
• 清除浮动
        ○ 额外标签法
        ○ 父元素添加 overflow 方法
        ○ 使用 after 伪元素
• 可见性
        ○ display
        ○ visibility
        - visible
        - hidden
        ○ overflow
        - visible
        - hidden
        - auto
        - scroll -->

## 盒子尺寸控制

外盒尺寸 = content + padding + border + margin <br>
内盒尺寸 = content + padding + border

width 和 height 属性只能作用于块级元素, 和部分行内元素, 如 img 和 input <br>
计算外盒尺寸的时候注意盒子之间的 margin 会重合
    

## 定位机制

CSS 的定位机制包括 **普通流** **浮动** 和 **定位**
    
### 普通流
默认的元素布局方式;

### 浮动 float
- 浮动脱离标准流, 
- 依赖于最近一个父块级元素, 同时运动范围不会超过父元素的 content ;
- 任何元素在被 float 修饰之后，就具备了 inline-block 的特性，如果没有指定尺寸，显示尺寸将以内容尺寸为准；

### 定位 position

在运用中, 如果子元素需要使用绝对定位 , 通常父元素会使用相对定位;
    
#### 边偏移属性
- top
- bottom
- left
- right
    
#### 定位属性
- 静态定位 static
    - 网页中默认的元素定位方式;
    - 无法使用边偏移属性;
- 相对定位 relative 
    - 参考自己. 以自己原先在标准流中的位置为基准;
    - 可以使用边偏移属性;
    - 不脱开标准流, 占位置; 
- 绝对定位 absolute
    - 参考父元素. 相对于最近一个有定位属性 (除了 static ) 的父元素的左上角
    - 可以使用边偏移属性; 
    - 脱开标准流, 不占位置, 元素转为 inline-block; 
    - 无法使用 margin: auto 的方式居中, 最好通过百分比计算; 
- 固定定位 fixed (广告定位)
    - 参考浏览器. 以浏览器窗口左上角为基准移动;
    - 可是使用边偏移
    - 脱开标准流, 不占位置, 元素转为 inline-block;

## 清除浮动
在浮动的描述中，我们需要用一个标准流父元素包裹浮动子元素，在很多情况下，子元素的高度不是确定的，
那么为了满足子元素不定的需求，父元素就需要取消自己的高度限制，

这样一来，矛盾产生了：
浮动的子元素是不占标准流空间的，而父元素因为没有设置高度而变成了 0 ，页面显示就出现了混乱；
    
总结：清楚浮动的本质是清楚浮动带来的影响, 下面就会说明是三种清除浮动的做法；

### 额外标签法
在父元素内, 浮动元素同级的位置 添加一个 空的元素, 如:
``` css
<div sytle="clear:both"></div>
```
#### 优点
- 简单方便
#### 缺点
- 破坏页面结构
    
### 父元素添加 overflow 属性
给父级元素添加 overflow 属性, 属性值可以为 hidden auto scroll
#### 优点
- 简单方便
#### 缺点
- 无法显示需要溢出的内容
    
### 使用 after 伪元素
给父元素添加 clear-float 的类属性, clear-float 可以是其他名字
``` css
.clear-float:after {
    content: '.';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.clear-float {
    zoom: 1;
}
```

::: tip
为什么会有这么诡异的写法, 可以看后面 选择器中关于伪元素 的说明
:::

#### 优点
- 万能
#### 缺点
- 麻烦了一点

## 可见性
### display
diplay 用于决定 是否显示及以什么方式 显示元素;
    
- none 

    此属性表示隐藏元素, 不保留位置, 区别于 visibility 的 hidden 属性; 
- block

    以块元素显示
    
### visibility
设置或检索是否显示对象

- visible

    对象可见
- hidden

    对象隐藏, 保留位置, 区别于 display 的 none 属性
        
### overflow
定义当元素内容超过元素边界应该如何显示

- visible

    改溢出的溢出
- auto

    超出自动显示滚动条, 不超出不显示滚动条
- hidden

    不超过元素尺寸, 超过自动隐藏; 
    使用前, 需要设置盒子尺寸; 
- scroll

    无论是否超出, 都显示滚动条

