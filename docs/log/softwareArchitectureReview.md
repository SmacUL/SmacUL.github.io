# 软件体系结构

此份文档为软件体系结构期末考试准备。

## 五大基础模型

[模型介绍](https://blog.csdn.net/ruthywei/article/details/79610212)

1. 瀑布模型

    所有的东西按部就班完成，一件一件来

3. 螺旋模型

    强调风险分析，适合大型项目，喜欢确定里程碑。

4. 快速原型模型

    开发周期短，需要不断修改，适合需求飘忽不定的项目

5. 增量模型

    每次只完成一部分的内容，逐批交付

6. 喷泉模型

    各阶段没有明确的分界线，共同进行，效率高，所需人员多

7. 演化模型（迭代模型）

    和快速原型有点像，但是用户知道核心（基本）需求

## 软件开发方法

1. 形式化
   
   借助数学的方法解决软件工程领域的问题。需要证明。

2. 瀑布式
3. 快速原型
4. 协同开发

## 敏捷开发与极限编程

[关于敏捷开发](https://www.jianshu.com/p/73617bcac8e4)

敏捷开发是一种面临迅速变化的需求快速开发软件的能力。强调响应变化，在迫切需要并且意义重大时才编制文档。

1. 隐喻

    对整个系统有一个宏观的把握，明确自己在系统中扮演的角色。

## 软件系统性能

1. 可用性
   
   系统服务不中断运行时间占实际运行时间的比例。**主动冗余** **ping-echo**（命令响应机制） 可以提高系统的可用性

2. 可修改性

    可修改性描述了系统能够被正确修改的难易程度。**信息隐蔽**可以提高系统的可修改性，信息隐蔽是指将代码模块化，只暴露必要的接口，对于修改而言，需要处理的信息变少了。

## 基于架构的软件开发（ABSD）

[文档](https://blog.csdn.net/qianjin0703/article/details/79792897)

这是一种架构驱动的软件开发模式。

## 软件架构风格

[软件架构风格介绍](https://www.cnblogs.com/wintersun/p/4869344.html)

1. 黑板系统

    传统应用领域是信号处理，例如语音和模式识别。由黑板数据结构、知识源和控制三部分组成。黑板用于记录共享数据。

1. 基于事件的隐式调用过程
   
    一个 Component 并不直接调用某个组件，而是触发或广播一个事件，系统再自动调用所有在这个事件注册的过程，完成了隐式调用

1. 解释器

    解释器风格的软件内部都有一个 解释器 ，

## 4 + 1 软件视图模型

**4 + 1 视图模型**从5个不同的视角包括逻辑视图、进程视图、物理视图、开发视图和场景视图来描述软件体系结构。逻辑视图一般针对最终用户，部署视图针对系统工程师。

## 软件设计模式与原则

[25中设计模式](https://www.cnblogs.com/geek6/p/3951677.html)

1. 开闭原则

    对扩展开放，对修改关闭

2. 接口隔离

    一个类对另一个类的依赖应该建立在最小的接口上。

3. 单例模式
    
    一个单例对象只有一个实例
4. 原型模式

1. 代理模式

    将原类进行封装，然后一个代理类来替代原类执行后面的任务。区别于中介者模式。

2. 适配器模式

    适配器模式将某个类的接口转换成客户端期望的另一个接口表示

3. 装饰模式

    装饰模式能够动态地给一个对象增加一些新的功能，要求装饰对象和被装饰对象实现同一个接口，装饰对象持有被装饰对象的实例

4. 观察者模式

    当一个对象变化时，其它依赖该对象的对象都会收到通知，并且随着变化。

5. 迭代器模式

    自动访问聚集在一起的对象

6.  访问者模式

    访问者模式把数据结构和作用于结构上的操作解耦合，使得操作集合可相对自由地演化。访问者模式适用于数据结构相对稳定算法又易变化的系统。

7. 中介者模式

    这种模式将所有对象的关系都连接在一个中介上，是一种解耦合的操作。

1. 桥接模式

    将事务和具体实现分开来。

## 云服务的三大类

1. IaaS

    基础设施服务

2. PaaS

    平台服务

3. SaaS

    软件服务

## 数据库和数据仓库

数据仓库，是为企业所有级别的决策制定过程，提供所有类型数据支持的战略集合。

## 案例分析

1. 信息资源网建设

    1. 是否可行
    
        没问题

        - 网络连接不会有什么太大的问题
        - 各类系统的实际存储位置并不会收到物理部署位置的影响
        - 统一管理有利于节约开销，有利于后续扩展
        - 底层的集中共享能够为业务提供更好的支撑

    2. 着重建设的部分
        
        - 容灾系统
        - 身份识别系统
        - 入侵检测系统
        - 高性能网络管理系统
        - 防火防盗等物理安全措施

    3. 意见

        - 对各部分信息进行分类
        - 整合规范信息采集原则，关键的业务信息由相应的权威的责任部门提供。
        - 制定信息交换平台，制定信息的交换方法
        - 优化政务流程
  