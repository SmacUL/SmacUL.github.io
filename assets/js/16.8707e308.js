(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{239:function(t,a,s){"use strict";s.r(a);var v=s(0),_=Object(v.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"垃圾回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收"}},[t._v("#")]),t._v(" 垃圾回收")]),t._v(" "),s("p",[t._v("垃圾回收机制的设计思想: 找出那些不再继续使用的变量, 然后释放其占用的内存;")]),t._v(" "),s("p",[t._v("JSGC 会定期执行这个操作, 当然部分情况下允许程序员自己来;")]),t._v(" "),s("p",[t._v("为了提高垃圾回收机制的效率, 可以在使用完某个对象之后, 将这个对象的引用设置为 NULL ;")]),t._v(" "),s("h2",{attrs:{id:"标记清除-常见"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#标记清除-常见"}},[t._v("#")]),t._v(" 标记清除(常见)")]),t._v(" "),s("ol",[s("li",[t._v("JSGC 在运行过程中给内存中的每个变量都加上标记;")]),t._v(" "),s("li",[t._v("在 环境中/被环境引用的变量 将被去除标记;")]),t._v(" "),s("li",[t._v("JSGC 开始销毁那些仍有标记的变量;")])]),t._v(" "),s("h2",{attrs:{id:"引用计数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#引用计数"}},[t._v("#")]),t._v(" 引用计数")]),t._v(" "),s("p",[t._v("所谓的引用就是对象被引用的次数;")]),t._v(" "),s("p",[t._v("一个致命缺陷就是 循环引用 , 即:")]),t._v(" "),s("p",[t._v("A 用 B , B 用 A 的情况;")])])}),[],!1,null,null,null);a.default=_.exports}}]);