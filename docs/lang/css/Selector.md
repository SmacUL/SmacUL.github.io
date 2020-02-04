# CSS 选择器

[W3C 中对选择器的描述](https://www.w3school.com.cn/css/css_selector_type.asp)

## 后代 子元素 相邻元素

这三者长得比较像, 放在一起; 三个人选择的范围依次缩小; 

### [后代选择器](https://www.w3school.com.cn/css/css_selector_descendant.asp)

``` css
div span {}
```
只要 `div` 标签下出现的 `span` , 都会被渲染; 

### [子元素选择器](https://www.w3school.com.cn/css/css_selector_child.asp)

``` css
div > span {}
```
对 `div` 标签下所有的 `第一级孩子 span` 标签进行渲染; 

### [相邻元素选择器](https://www.w3school.com.cn/css/css_selector_adjacent_sibling.asp)

``` css
div + span {}
```
与 `div` 标签**同级**并且**紧临**的 `span` 标签, 将会被渲染;

## :link :visited :focus :hover :active

除了 `:focus` 之外的四个人都属于[链接伪类选择器](https://www.w3school.com.cn/css/css_pseudo_classes.asp);

![](/note/img/2019-12-03-22-56-30.png)

::: warning
注意这几个人的顺序, 否则会有一些意想不到的东西出现; 
:::

::: tip
一个通用的顺序:   
:link > :visited > :focus > :hover > :active

a:hover 必须被置于 a:link 和 a:visited 之后, 才是有效的.   
a:active 必须被置于 a:hover 之后, 才是有效的. 
:::

## :nth-child :nth-of-type

两个人都属于**位置结构伪类选择器**的范畴; 

:nth-child 的选择范围要比 :nth-of-type 大; 

前者可以无视标签类别和名称, 后者会对标签的名称和类别进行限定; 

这两个选择器的下标从 1 开始, 都支持简单的公式进行计算; 

::: tip
当使用 vue v-for 标签的时候要注意子标签会被扩展, 下标无法直接确定, 使用 -1 可以定位到最后一个子标签; 
:::

### [:nth-child 选择器](https://www.w3school.com.cn/cssref/selector_nth-child.asp)
> :nth-child(n) 选择器匹配属于其父元素的第 N 个子元素, 不论元素的类型.     

这个选择器很容易理解成一个错误形式: 
``` html
<!-- 尝试修改 两个 子 div 的样式 -->
<div class='a'>
    <span></span>
    <div></div>
    <div></div>
</div>

<style>
    .a {}
    /* 企图修改 class 为 a 的 div 下的两个 div 样式 */
    .a:nth-child(1) {}
    .a:nth-child(2) {}
</style>
```
::: danger
上面的代码是一个错误的示范
:::

实际上, 这里的 1 将会指向 span , 2 会指向第 1 个子 div , 正确的写法是: 
``` html
<div class='a'>
    <span></span>
    <div></div>
    <div></div>
</div>

<style>
    .a {}
    /* 正确修改 div 下的两个 div 样式 */
    .a div:nth-child(2) {}
    .a div:nth-child(3) {}
</style>
```
这里添加了在使用 nth-child 选择器时, 添加了 div , 并且修改了下标;

这个选择器在选择的过程中, 需要满足两个条件, 第一, 的确有这个下标的子标签; 第二, 这个下标应当满足 `:nth-child` 冒号前面的标签名称或类名的限制; 


### [:nth-of-type 选择器](https://www.w3school.com.cn/cssref/selector_nth-of-type.asp)
:nth-of-type(n) 选择器匹配属于父元素的特定类型的第 N 个子元素的每个元素.

还是 :nth-child 选择器的例子: 

``` html
<!-- 尝试修改 两个 子 div 的样式 -->
<div class='a'>
    <span></span>
    <div></div>
    <div></div>
</div>

<style>
    .a {}
    /* 修改 class 为 a 的 div 下的两个 div 样式 */
    .a div:nth-of-type(1) {}
    .a div:nth-of-type(2) {}
</style>
``` 

这个选择器选择的是, `a` 标签下, 某一个具体的 `div` 标签; 


## [CSS 伪元素](https://www.w3school.com.cn/css/css_pseudo_elements.asp)

伪元素是一个假的元素, 但是它们对用户是可见的, 只能通过css来操作, 
::: tip
伪元素不会出现在DOM中
:::

这个地方我们可以在看一下伪元素清除浮动的 CSS

``` CSS
.clear-float:after {
    content: '.';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
```

`.clear-float` 将被作用在**使用了浮动的子元素**的父元素标签上, 
::: warning
这里的 :after 实际上在需要清除浮动的父元素内部添加了一些内容, 而不是在父元素的同级后方添加内容; 
:::

在伪元素中如果没有 `content` 属性, 伪元素是无效的, 所以会有 `content` ;   
默认情况下插入的伪元素是内联元素, 所以需要将其设置为 块级元素 才可以起到像 `<div sytle="clear:both"></div>` 的效果; 





