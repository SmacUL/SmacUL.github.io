# Spring MVC 1
  
- Spring MVC 的基本概念
- 创建一个 Hello SpringMVC 项目

此部分会bb一下Spring MVC的一些基本概念, 并且详细说明SpringMVC的Hello World项目的构建. 

Spring MVC 是一种轻量级的Web框架, 将web层进行解耦, 用于创建干净轻薄的web层. SMVC的基于请求驱动指的就是使用请求-响应模型, 提供强大的约定大于配置的契约式编程支持. 

1. 支持REST风格的URL
2. 添加更多注解, 可完全注解驱动
3. 引入HTTP输入输出转换器（HttpMessageConverter）支持json
4. 和数据转换、格式化、验证框架无缝集成
5. 对静态资源处理提供特殊支持
6. 更加灵活的控制器方法签名, 可完全独立于Servlet API

## Spring MVC框架处理流程

![Spring MVC](http://smacul.oss-cn-hangzhou.aliyuncs.com/18-11-13/50653738.jpg)

## 控制器

1. 前端控制器 dispather servlet
1. 应用控制器 handler mapping
1. 页面控制器 view resolve

## 基本概念

1. DispatcherServlet

    在获得用户的请求后, 调度相应的Controller处理业务逻辑并使用ViewResolve为用户渲染画面. 
2. HandlerAdapter

    Handler是在 DispatcherServlet 中的内置对象, 它会作为Controller的代表, 并包装成适配器的形式提供给 DispatcherServlet 使用, DispatcherServlet也是通过这种方式才能真正调度相应的Controller. 
3. HandlerInterceptor
   
   这是一个拦截器的接口, 它会在被拦截对象的前后添加一些处理逻辑. 
4. HandlerMapping
   
   HandlerMapping 会记录 DispatcherServlet 与 Controller 之间的映射关系, 帮助 DispatcherServlet 来获得正确的适配器. 
5. HandlerExecutionChain

    这是一整个方法链：
        
        preHandler -> Controller method -> postHandler -> afterCompletion
7. ModelAndView
   
    ModelAndView包含着数据模型和相应视图的逻辑名称. 
8. ViewResolve

    用于从ModelAndView中获得对应的视图名称（.jsp等）返回给 DispatcherServlet . 

## 开发流程

1. 新建maven项目, 补全项目结构
1. 添加SpringMVC包依赖及jetty配置
1. 修改web.xml, 添加springmvc控制器配置
1. 在WEB-INF下添加SpringMVC的配置文件（包扫描及resolver配置）规划用户请求
1. 开发controller
1. 开发视图（jsp）
1. mvn jetty:run编译启动web站点
1. 测试站点

## 编写一个简单的SpringMVC项目--HelloSpringMVC

1. 首先看一下这个项目的结构
   
        HelloSpringMVC
        - src
            - main
                - java
                    - top.smacul
                        - HelloMVCController.java
                - resources
                - test
                - webapp
                    - WEB-INF
                        - jsp
                            - home.jsp
                        - dispatcher-servlet.xml
                        - web.xml
        - pom.xml

2. 创建一个 maven-archetype-webapp 项目框架

3. 补全项目

    在IDEA的project structure中的module内添加缺少的目录

    - 在main下添加java resources 和 test
    - 在新建的 test下添加resources 和 java

4. 修改pom.xml
   
   - 添加Spring mvc、servlet的相关依赖, 
  
        注意一下：Spring V4.1以后的版本在不支持Servlet3.0的应用服务器上跑时会报如下错误：
    
            NoSuchMethodError: javax.servlet.http.HttpServletResponse.getStatus()

        ```xml
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>4.3.5.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.5</version>
            <scope>provided</scope>
        </dependency>
        ```

   - 添加jetty插件

        jetty是一个开源的servlet容器, 是一个基于标准、全功能的Java服务器. 我们需要一个Servlet容器来提供Servlet功能, jetty可以使已经实现了的web应用程序提供Servlet功能. 

        ```xml
        <plugin>
            <groupId>org.mortbay.jetty</groupId>
            <artifactId>maven-jetty-plugin</artifactId>
            <version>6.1.10</version>
            <configuration>
                <systemProperties>
                    <systemProperty>
                        <name>org.mortbay.jetty.Request.maxFormContentSize</name>
                        <value>100000000</value>
                    </systemProperty>
                </systemProperties>
                <scanIntervalSeconds>10</scanIntervalSeconds>
                <stopKey>foo</stopKey>
                <stopPort>9999</stopPort>
                <webAppConfig>
                    <contextPath>/</contextPath>
                </webAppConfig>
            </configuration>
            <executions>
                <execution>
                    <id>start-jetty</id>
                    <phase>pre-integration-test</phase>
                    <goals>
                        <goal>run</goal>
                    </goals>
                    <configuration>
                        <scanIntervalSeconds>0</scanIntervalSeconds>
                        <daemon>true</daemon>
                    </configuration>
                </execution>
                <execution>
                    <id>stop-jetty</id>
                    <phase>post-integration-test</phase>
                    <goals>
                        <goal>stop</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        ```

5. 修改 web.xml

    首先要注意的一点是默认生成的xml是2.3版本的, 这个版本默认是不支持EL表达式的, 所以需要把它改成2.4以上的版本. 

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <web-app xmlns="http://java.sun.com/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
            http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
            version="2.5">
    </web-app>
    ```

    在修改xml之后需要配置dispatcher servlet与对应的servlet-maping. 

    ```xml
    <!-- Spring MVC的核心 -->
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--<init-param>-->
            <!--<param-name>contextConfigLocation</param-name>-->
            <!--<param-value>/WEB-INF/dispatcher-servlet.xml</param-value>-->
        <!--</init-param>-->
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    ```
    这个地方需要说明的是：

    - 如果没有注释的那一段, Spring默认会在 WEB-INF 下方寻找一个名为[servlet-name]-servlet.xml, 在上面的情况下就是会寻找 dispatcher-servlet.xml 文件. 如果有注释的那一段, 就直接修改param-value标签下的内容指定DS的路径以及名称. 
    -  servlet-mapping 内的 servlet-name 对应上面 servlet 中的 servlet-name. 
    -  url-pattern 标签针对的是url内主机名后面的内容. 

6. 创建dispatcher servlet的xml配置文件
   
    - 开启spring的自动扫描

        ```xml
        <context:component-scan base-package="top.smacul"/>
        ```
        
    - 添加 viewResolver
    
        这里添加的是一个jsp视图解析器, 暂时只能返回jsp页面. 

        ```xml        
        <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
            <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"></property>
            <property name="prefix" value="/WEB-INF/jsp/"></property>
            <property name="suffix" value=".jsp"></property>
        </bean>

        ```
        - prefix 指的是访问URL的前缀
        - suffix 指的是访问URL的后缀
        
        两者的意思就是能够访问/WEB-INF/jsp/路径下所有的jsp文件, 使其作为视图返回给DS. 

7. 创建一个简单的 Controller -- HelloMVCController
    
    ```java
    @Controller
    // 拦截URL中的hello
    @RequestMapping("/hello")
    public class HelloMVCController {
        // 拦截URL中/hello后面的/mvc
        @RequestMapping("/mvc")
        public String helloMVC() {
            // 返回一个视图的逻辑名称home（对应home.jsp）
            return "home";
        } 
    }
    ```
    - @Controller 注解可以将这个类变成一个Handler, 也就是一个控制器（粗暴点）. 
    - @RequestMapping 注解（类前）中的属性将匹配URL中的对应的内容
    - @RequestMapping 注解（方法前）中的属性将进一步匹配URL中对应的内容

    剩下的事情就是再创建一个视图, home.jsp, 创建完毕之后启动jetty的服务, 打开浏览器使用URL：host:8080/hello/mvc 访问home.jsp
    
8. 创建视图--home.jsp
   
   ```html
    <html>
    <body>
    <h2>Hello World!</h2>
    </body>
    </html>
   ```

9. 运行项目
   
    - 在IDEA的terminal中输入

        ```shell
        mvn jetty:run
        ```
    - 在浏览器中输入
  
        ```
        http://localhost:8080/hello/home
        ```
        应该可以看到hello world两个词
