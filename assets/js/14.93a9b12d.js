(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{274:function(a,v,_){"use strict";_.r(v);var t=_(0),r=Object(t.a)({},(function(){var a=this,v=a.$createElement,_=a._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[_("h1",{attrs:{id:"java-笔记"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#java-笔记"}},[a._v("#")]),a._v(" Java 笔记")]),a._v(" "),_("p",[a._v("Java 应该是什么样的? 我觉得这是学习编程语言前后都需要思考的问题. 我们不妨先想想一门 OOP 语言需要有什么?")]),a._v(" "),_("h2",{attrs:{id:"基本语法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#基本语法"}},[a._v("#")]),a._v(" 基本语法")]),a._v(" "),_("p",[a._v("这一部分, 高级编程语言都差不多, 总是围绕着单一的数据结构和数据结构的集合结构做各种各样的操作. 在这个过程中, 总是会有一些特殊的记号出现, 或许叫关键字, 或许叫标识符.")]),a._v(" "),_("h2",{attrs:{id:"对于对象的思考"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#对于对象的思考"}},[a._v("#")]),a._v(" 对于对象的思考")]),a._v(" "),_("p",[a._v("这一部分大致讨论一下:")]),a._v(" "),_("ul",[_("li",[a._v("对象是什么")]),a._v(" "),_("li",[a._v("对象应该做什么")]),a._v(" "),_("li",[a._v("谁能操作对象(权限控制)")]),a._v(" "),_("li",[a._v("从哪来到哪去(生命周期)")])]),a._v(" "),_("h4",{attrs:{id:"什么是对象"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#什么是对象"}},[a._v("#")]),a._v(" 什么是对象")]),a._v(" "),_("p",[a._v("对象是一种抽象形式, 用于创建问题空间与解空间的映射关系, 说白了, 就是一种看问题 解决问题的角度.")]),a._v(" "),_("h4",{attrs:{id:"对象的职责"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#对象的职责"}},[a._v("#")]),a._v(" 对象的职责")]),a._v(" "),_("p",[a._v("作为一个成熟的对象, 他应该努力提高自己的服务水平, 对外提供一套良好的接口, 对内提高内聚性. 从系统的角度, 对象应该专职专能, 努力做好一件事.")]),a._v(" "),_("h4",{attrs:{id:"生命周期"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#生命周期"}},[a._v("#")]),a._v(" 生命周期")]),a._v(" "),_("p",[a._v("对象的生命周期, 这是一个比较大的问题, 对象如何被创建, 创建的过程如何, 创建完了放哪, 如何向用户提供对象的使用接口(句柄? 我觉得这个比较合适), 对象如何被销毁, 使用垃圾回收还是让用户自己来? 看吧, 事很大.")]),a._v(" "),_("h4",{attrs:{id:"访问权限"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#访问权限"}},[a._v("#")]),a._v(" 访问权限")]),a._v(" "),_("p",[a._v("对于访问权限, 一个类从创建到被废弃, 至少出现两波人, 一是类的创建者, 二是类的使用者. 作为类的创建者, 不光要考虑类的功能实现, 还要考虑将来使用者都能看到什么, 俗称 权限控制 . Java 提供了非常好的 权限控制 手段, C/ JS / Python 当中都没有这样完整的体系(也有可能我没看到).")]),a._v(" "),_("h2",{attrs:{id:"抽象-继承-多态"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#抽象-继承-多态"}},[a._v("#")]),a._v(" 抽象 继承 多态")]),a._v(" "),_("h4",{attrs:{id:"程序的抽象能力"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#程序的抽象能力"}},[a._v("#")]),a._v(" 程序的抽象能力")]),a._v(" "),_("p",[a._v("一门编程语言, 那么他就应该具备对问题的"),_("strong",[a._v("抽象")]),a._v("能力, 也就是对问题的建模能力, 如何用自己的语言特性来尽可能地表达这个世界.")]),a._v(" "),_("p",[a._v("更进一步, 面向对象的语言, 那么除了抽象的特征, 他还应该具备"),_("strong",[a._v("继承")]),a._v("和"),_("strong",[a._v("多态")]),a._v("两个特征.")]),a._v(" "),_("h4",{attrs:{id:"继承与多态的初步理解"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#继承与多态的初步理解"}},[a._v("#")]),a._v(" 继承与多态的初步理解")]),a._v(" "),_("p",[a._v('什么是继承, 什么又是多态? 按照我的理解, 继承和多态共同完成了一个对象对另一个对象的特征的吸纳和创新. "我属于你但我不是你", 相互之间存在一种耦合关系. 如何做到 "我属于你但我不是你"? 一方面可以在子类中拓展新的方法; 另一方面, 子类可以修改基类中的旧方法.')]),a._v(" "),_("p",[a._v("继承允许程序将多种类型视作同一种类型来处理. 子类几乎拥有基类的所有内容, 甚至可以直接代替基类. 在一个更高的维度上看, 继承关系的对象集合可以形成一个描述问题的结构框架, 因为真实世界也存在继承关系, 对外他们提供一套公共的接口, 内部却可能千差万别.")]),a._v(" "),_("p",[a._v("但是历史无数次地证明, 这样的结构是不够的, 子类不能将基类中的内容全盘照收, 必须要对基类的内容加以修改.")]),a._v(" "),_("p",[a._v('多态的目的是降低接口位置的耦合, 允许同一位置拥有多种同名不同样的解决方法. 在子类在修改基类中的方法后, 程序利用多态, 动态调用子类方法满足新的需求. 换句话说, 利用多态, 可以做到: "你能做的, 我都能做, 而且变着法做".')]),a._v(" "),_("h4",{attrs:{id:"小结"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[a._v("#")]),a._v(" 小结")]),a._v(" "),_("p",[a._v("通过继承和多态, 抽象出的结构框架, 才能具备地描述具体问题中那些相似而又有细微不同的方面的能力.")]),a._v(" "),_("h2",{attrs:{id:"接口"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#接口"}},[a._v("#")]),a._v(" 接口")]),a._v(" "),_("p",[a._v("这是我初学时感觉难以理解的一个东西. 如果一个类是实现一个接口, 从类创建者的角度, 这个接口用来说明这个类应该要完成的东西; 从类使用者的角度, 这个接口说明了这个类所具备的功能;")]),a._v(" "),_("p",[a._v("接口在 Java 的设计中并不属于类, 但是看着很像是抽象了过头的抽象类.")]),a._v(" "),_("h2",{attrs:{id:"代码复用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#代码复用"}},[a._v("#")]),a._v(" 代码复用")]),a._v(" "),_("p",[a._v("代码复用是一个老生常谈的话题了, 这里说的代码复用不是简单的复制使用代码本身, 而是考虑如何在一个程序下, 高效利用其他代码, 它既包括代码引入, 也包括代码的移除.")]),a._v(" "),_("p",[a._v("OOP 语言, 尤其是 Java , 最基础的就是"),_("strong",[a._v("继承")]),a._v("和"),_("strong",[a._v("组合")]),a._v("两种复用方式. 继承在前面提到过了, 而组合是一种在新类中使用其他类的引用的方式.")]),a._v(" "),_("p",[a._v('使用不当的继承会增加了代码间的耦合度, 但是继承总是能够提供一个明确的框架. 如果不能明确的说出对象之间存在 "is-a" 的关系时, 就不要使用继承; 相比继承, 组合会松散地多, 只在使用的部分导致了耦合, 更加适合在 "is-like-a" 的关系中. 同理, 组合的结构表达能力就没有继承那么直观了.')]),a._v(" "),_("p",[a._v("虽然继承是 OOP 语言的重要特性, 但我们更多的应该使用组合的复用方式;")]),a._v(" "),_("p",[a._v('其他的复用方式, 又牵扯到一块很大的内容, 即设计模式. 像什么工厂 代理 都是他们的一部分, 不同的编程语言有着自己的特点, 不能生搬硬套. 总的来说, 设计模式讨论的内容基本都离不开 "提高内聚, 降低耦合" 这几个字;')]),a._v(" "),_("h2",{attrs:{id:"默默的后台工作者"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#默默的后台工作者"}},[a._v("#")]),a._v(" 默默的后台工作者")]),a._v(" "),_("p",[a._v("高级语言是需要编译或者解释的. 那么通常总会有那么一个语言的 Embedding , 比如说 Java 虚拟机, 他默默地做着后台工作.")]),a._v(" "),_("p",[a._v("通常这些工作者首先会努力屏蔽硬件信息, 并将具体操作数据空间的分配存储, 数据的加载, 垃圾的回收, 进行简单的安全检查等工作.")]),a._v(" "),_("h2",{attrs:{id:"其他"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[a._v("#")]),a._v(" 其他")]),a._v(" "),_("p",[a._v("除去这些, 如果是一门野心勃勃的 OOP 的语言, 他还应该考虑 异常处理, 并发处理, GUI 的开发, 网络编程, 提供一套语言底层的调用或者修改接口等等.")]),a._v(" "),_("h2",{attrs:{id:"总结"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),_("p",[a._v("到这里, 我们可以估计一下一个 Java 程序大概要考虑什么:")]),a._v(" "),_("ul",[_("li",[a._v("接口(类的一组需求描述)")]),a._v(" "),_("li",[a._v("类(一般, 抽象, 内部, 继承)")]),a._v(" "),_("li",[a._v("类构造方法(方法名称, 方法参数)")]),a._v(" "),_("li",[a._v("类方法(一般, 静态, 方法名称, 方法参数, 返回值, 重写, 重载)")]),a._v(" "),_("li",[a._v("类属性")]),a._v(" "),_("li",[a._v("对象(类的实例)")]),a._v(" "),_("li",[a._v("基本数据类型")]),a._v(" "),_("li",[a._v("集合(单独从对象中拉出来, 实在是因为有些特殊)")]),a._v(" "),_("li",[a._v("访问权限")]),a._v(" "),_("li",[a._v("万能的 JVM")])]),a._v(" "),_("p",[a._v("上面很多内容都是我自己的理解, 可能不是很准确, 仅做参考, 也可以把这些内容作为笔记的导读. 笔记中的主要内容也是围绕着 OOP 语言的特点和 Java 自己的一些特性, 以及 Java 的幕后工作者展开.")]),a._v(" "),_("h2",{attrs:{id:"参考资料"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[a._v("#")]),a._v(" 参考资料")]),a._v(" "),_("ul",[_("li",[_("p",[a._v("Java 核心技术 第 10 版 Cay S. Horstmann 著"),_("br"),a._v("\n这是我看过的第一本有关 Java 的书, 内容很实在但也有点硬, 容易睡, 主要基于 Java8 .")])]),a._v(" "),_("li",[_("p",[a._v("Thinking in Java (Java 编程思想) 第 4 版 Bruce Echel 著"),_("br"),a._v("\n作者貌似原先是 CPP 的大佬, 所以写这本书的时候总是会对比 CPP 的一些概念, 我觉得书名可以改成: Tinking in Java from CPP . 相比 核心技术 直接介绍 Java 语法, Thinking in Java 先从 Java 的灵魂, 也就是对象, 说起, 书本看起来要更有意思一些. 但是, 也正是因为作者从 CPP 的角度看 Java , 所以书中难免会出现一些表述不准确, 或直接套用 CPP 的语法概念的情况, 阅读的时候需要分辨一下;")])]),a._v(" "),_("li",[_("p",[_("a",{attrs:{href:"https://www.bilibili.com/video/av55246614",target:"_blank",rel:"noopener noreferrer"}},[a._v("黑马 Java 基础"),_("OutboundLink")],1),_("br"),a._v("\n虽然我有些鄙视视频教程, 但是有一说一, 这个教程讲的还是比较有灵魂的, 作为一个入门级或者说查漏补缺的教程, 还是非常不错的. 教程的后半部分会涉及一些 web 相关的内容, 感觉没有 Java 的部分精彩, 看看就好.")])]),a._v(" "),_("li",[_("p",[_("a",{attrs:{href:"http://www.matools.com/api/java8",target:"_blank",rel:"noopener noreferrer"}},[a._v("JDK-8 的中文在线文档"),_("OutboundLink")],1),a._v("\n虽然 IDEA 也能看, 但那个是英文注释, 多少还是不太方便.")])])])])}),[],!1,null,null,null);v.default=r.exports}}]);