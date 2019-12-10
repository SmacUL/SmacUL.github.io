# Android Review

此份文件为安卓期末考试准备

共计 14 组 PPT 和 5 组 实验内容

## Android 系统架构

1. Linux 内核层 Linux shell

    一系列底层的驱动
2. 系统运行层 Library and Android Runtime

    通过一些 C / C++ 库来为 Android 提供主要的特性支持

3. 应用框架层 Architecture Frame

    构建 Android 程序可能用得到的各种 API

4. 应用层 Application

## Android Debug Bridge ADB

1. 介绍

    借助 ADB 工具，可以管理设备或者手机模拟器的状态
3. 各种指令

    - adb devices
    - adb pull
    - adb push
    - adb shell

        Android 是基于 Linux 的，可以在 adb 中直接 call Linux 内核，执行一些必要操作。

## Android 四大组件

1. 活动 Activity

    整个 App 看得见的东西

    自定义 Activity 时，需要在 `<activity>` 标签下添加 `<intent-filter>` ，并继续添加 `<action>` `<category>` 两个标签。
2. 服务 Service

    常在后台，看不见，即使应用退出，服务仍可以继续执行
3. 内容提供器 Content Provider

    为 App 间共享数据提供支持
4. 广播接收器 Broadcast Receiver

    允许 App 接受来自各处的广播

## Android UI

Android 中所有 UI 界面都是 View 或 ViewGroup 及其派生类组合而成。 View 是所有的 UI 类的基类， ViewGroup 是 View 的容器。

无论创建哪种 UI 控件，都需要传入一个 this 参数，这是由于创建 UI 时需要一个 Context （Context代表访问 Android 应用环境的全局信息的 API ）。 Activity 和 Service 都继承了 Context

Android 的 View 和 UI 组件是**非线程安全的**（多个线程访问同一个资源会导致不确定的结果），Android 不允许开发者启动线程访问用户界面的 UI 组件，使用 Handler 进行处理

子线程发送消息，使用`sendEmptyMessage(int mess)`，UI线程中的 Handler 对象收到消息后调用 `handleMessage(Message msg)` 来处理子线程中的信息。

调用控制方式

 - 通过 XML 布局文件定义的方式。
 - 在 Java 代码中通过调用方法进行控制。

1. 布局管理器

    - LinearLayout 线性布局
      - orientation 确定布局方向
      - layout_weight is used to assigned the weights of son components
      
    - TableLayout 
      - collapseColumns 将布局中指定的列隐藏
      - stretchColumns 指定列为课神赞的列，填充空白
      - shrinkColumns 指定列Wie课收缩列
      
    - frameLayout 帧布局
       
       所有的布局都使用层叠的方式显示
    
    - RelativeLayout 相对布局

        - 根据兄弟确定位置
          - layout_below
          - layout_above
          - layout_toLeftOf
          - layout_toRightOf
        - 根据兄弟元素对齐
          - layout_alignTop
          - layout_alignLeft
          - layout_alignBottom
          - layout_alignRight

ListView GridView Spinner Gallery AdapterView 都是容器，而 Adapter 负责提供每个列表项组件， AdapterView 则负责采用合适的方式显示这些列表项。

- ArrayAdapter
- SimpleAdapter
- SimpleCursorAdapter
- BaseAdapter

## Android 的两套事件处理机制

事件监听的处理模型中设计三类对象

1. 事件源 某个组件，事件发生的位置
2. 事件 封装了界面组件上发生的特定的事件（通常及时一次用户操作）
3. 事件监听器 负责监听事件源发生的事件。

事件监听器的几种基本形式

1. 内部类
2. 外部类（比较少见）

    事件监听器通常属于特定的 GUI 界面，定义成外部类不利于提高程序的内聚性
    外部类不能自由访问 GUI 界面的类中的组件，编程不够简洁。
3. Activity 本身作为事件监听器类
4. 匿名内部类形式

5. 基于监听器的事件处理

    为界面组件绑定特定的事件 listener
6. 基于回调的事件处理

    重写 Android 组件特定的回调方法或者重写 Activity 的回调方法。

## Handler 消息传递机制

Handler 是 Android 操作系统中的线程通信工具。

## Bundle 在 Activity 之间传递数据

## Intent

Intent 是 Android 程序各组件之间进行数据交互的一种重要方式，可以指明当前组件想要执行的动作，还可以在不同组件之间传递数据。

startActivityForResult 这个方法也可以用来启动活动，同时期望启动的活动在被销毁时可以返回一个结果给上一个活动。这个结果被返回之后会在调用 Activity 中回调 onActivityResult 方法，并在方法内接收数据。

``` Java
Intent intent = new Intent();
intent.putExtra("")
```

### 活动调度

1. 显示 Intent

    ``` Java
    // 在 A 活动的基础上启动 B 活动
    Intent intent = new Intent(A.this, B.class);
    startActivity(intent);
    ```
    
2. 隐式 Intent

    不使用直接指明两个联系的组件，而是采用隐晦的说明方式，让系统自己去找出相互联系的组件。比如

    ``` Java
    Intent intent = new Intent([action]);
    intent.addCategory([category]);
    ```
    系统能够依据设置的 action 和 category 找出对应的 activity 。

### 传递数据

可以使用 Bundle 或者 Intent 或者两者结合

## Activity 的生命周期

Android 采用 Task 管理多个 Activity ，启动一个应用就会为止创建一个 Task 。而 Task 也以 stack 的形式管理 Activity 。

1. 活动状态
2. 暂停状态
3. 停止状态
4. 销毁状态

## Activity 的启动模式

1. Standred 

    默认的活动启动方式，每次都会创建一个新的实例
3. singleTop

    如果需要的 Activity 已经在栈顶，就不在重复创建，直接使用栈顶
4. singleTask

    查找 stack 中是否有指定的活动，如果有，那就将此活动顶层的所有活动全部乃伊组特，使指定活动到达栈顶。

1. singleInstance
   
    如果调用指定活动，就会启动一个新的返回 stack 来管理这个活动。用于解决共享活动实例的问题。


## Fragment

Fragment 可以理解成 Activity 的片段。