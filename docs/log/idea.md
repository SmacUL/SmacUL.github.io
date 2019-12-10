# IDEA破解及配置 || Android Studio配置

## IDEA破解

1. 下载IntelliJ IDEA Ultimate with JDK
2. 解压
3. 访问[补丁网站](http://idea.lanyus.com/) 获取[破解补丁](http://idea.lanyus.com/jar/JetbrainsCrack-[version]-release-str.jar)
4. 修改bin目录下 idea.vmoptions 和 idea64.vmoptions，在两个文件的末尾加上相同的一句话：

    ``` shell
    -javaagent:[破解补丁的路径]
    ```
5. 把破解补丁放在bin文件下
6. 运行 bin 下的 idea.sh
7. 到激活的时候选择（License Activation）选择Activation Code
8. 把以下内容粘贴到里面，选OK
    ``` shell
     -javaagent:[破解补丁的路径]
    ```

## 通用Setting设置

> 此部分针对IDEA，android studio做参考

Configure - Setting 下

1. Appearance&Behavior
    - Appearance 下 修改Theme为Darcula;（修改主题）
    - System Settings 下 startup/shutdown
      - 取消 Reopen last Project on startup （再次启动的时候是导航页而不是打开工程）
      - 取消 Confirm application exit （退出的时候不再确认）

1. Editor
    - General - Auto Import 下 java 勾选 Add unambiguous imports on the fly （自动导包）
    - General - Code Completion 下 Code Completion 选择 None （语法提示的时候不区分输入的大小写）
    - General - Code Completion 下 Parameter Info 勾选 Auto-display parameter info in 1000 ms（把鼠标放在参数边上过多少时间有提示）
    - Inspection - Spelling - Typo - Options 下 取消勾选 Process Code，Process literals，Process comments（取消单词拼写检查）
    - Font 下 size 改为18（字体，13.3寸 1080P），Line spacing 设为 1.2 （行距）
  
Configure - Project default - Project Structure 下

Project SDK 下 new... 把默认的JDK路径拉进来

## Android Studio（Mac系统下）

1. Android Studio 基本组件安装完毕之后会进入到Downloading Component 的界面中，下载需要半个小时左右的时间（看情况）
1. 创建工程进去之后，会渲染和IDEA类似的界面，但是会提示：Gradle project failed. Basic functionality will not work properly. 下方的messages中会提示一个error，按照error的提示 Install Build Tools，安装结束之后，会对自动对项目syncing
1. 运行，创建Virtual Device，选好机型与系统镜像之后需要下载系统镜像
1. 最后能正常运行，显示模拟器并自动启动应用，显示Hello world

## 创建Java Web项目

1. 在导航页 Create New Project
2. 点击 Java EE 下的Web Application （勾选后可以在下面选择Versions，记得勾选Create Web.xml）
3. 设置项目路径
4. 进入项目后在右上角有一个下拉选框，点击选择 Edit Configuration..
5. 在新的对话框中点击左上角的绿色加号，到下拉菜单的最底下，点击 33 items more， 找到 Tomcat Server点击 Local
6. 在 Server 下 Application server，把自己的Tomcat路径导进来，
7. 底下可以配置启动的浏览器
8. 最底下还有一个warming，点一下Fix
9. Apply，OK

## 创建Servlet

- IDEA创建一个 Servlet 建议直接在创建一个

- Servlet本质是一个java类，他需要继承HttpServlet这个类；如果在IDEA里头输入HttpServlet的时候没有语法提示，可能是没有将Tomcat下lib里面的Servlet-api.jar复制到JDK的扩展目录下，（扩展目录在[jdk版本]/jre/lib/ext中）

- 在idea中project structure选项下的library添加servlet-api.jar，并fix problem

- 在IDEA中可以不修改web.xml，而在servlet的类前面加一句

  ``` java
  @WebServlet(name = "???", urlPatterns = "/???")
  ```

  > 注意一下这里的urlPatterns对应的路径是该servlet对应的html文件的路径, 这个urlPatterns必须写，否则就是跳转后就直接404，还有那个可爱的'/'符号也要写。
  
## IDEA 断点调试

- F7 单步执行（进入方法体内，会跨文件）
- F8 单步执行（不进入方法体内）
- F9 跳到下一个断点

## IDEA 在外接屏的情况下无法在桌面显示

在外接屏幕的情况下，IDEA 打开项目后可能会无法在桌面显示。找到项目的 `.idea` 文件夹，并找到 `workspace.xml` 。找到代码段

``` xml
<component name="ProjectFrameBounds">
<option name="x" value="32767" />
<option name="y" value="32767" />
<option name="width" value="3860" />
<option name="height" value="1100" />
</component>
```

将 `x` 和 `y` 的 `value` 都修改为 0 。