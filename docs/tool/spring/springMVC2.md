# Spring MVC 2

- 更换 View Resolver
- mvc 标签
- applicationContext 配置文件
- 路径说明

## 更换View Resolver

在Hello World项目中, View Resolver是这么写的：

```xml
<bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="viewClass" value="org.springframework.web.servlet.view.JstlView"></property>
    <property name="prefix" value="/WEB-INF/jsp/"></property>
    <property name="suffix" value=".jsp"></property>
</bean>
```

这里添加的是一个jsp视图解析器, 暂时只能返回jsp页面. 如果想要返回一个HTML页面呢？这种时候就需要更换一个视图解析器--FreeMarkerViewResolver. 

1. 要使用这个Resolver, 首先要在pom.xml中添加它需要的依赖：

    ```xml
    <dependency>
        <groupId>org.freemarker</groupId>
        <artifactId>freemarker</artifactId>
        <version>RELEASE</version>
    </dependency>

    <!-- 没有这个依赖, 写到底下的 templateLoaderPath 和 freemarkerSettings 的时候会显示无法解析 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context-support</artifactId>
        <version>4.3.5.RELEASE</version>
    </dependency>
    ```

1. 之后在dispatcher-servlet.xml中添加 FreeMarkerViewResolver 以及它的配置信息

    ```xml
    <bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
        <!-- 指明HTML的资源路径（假设这个路径底下有一个home.html） -->
        <property name="templateLoaderPath">    
            <value>/WEB-INF/jsp/</value>
        </property>
        <!-- 听说是设置字符集 -->
        <property name="freemarkerSettings">
            <props>
                <prop key="defaultEncoding">UTF-8</prop>
            </props>
        </property>
    </bean>

    <bean id="htmlviewResolver"
            class="org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver">
        <property name="suffix" value=".html" />
        <property name="order" value="0"></property>
        <property name="contentType" value="text/html;charset=UTF-8"></property>
    </bean>
    ```
    注意这里的 FreeMarkerViewResolver 是没有前缀 prefix 的, 它的前缀相当于写在了 FreeMarkerConfigurer 的 templateLoaderPath 当中. 

1. 配置加载静态资源

    - 解决方法一

        因为最后返回的东西变成的了HTML, 所以不可避免的会有很多css、js这些静态资源. 如果直接访问, 这些内容会被拦截下来得不到显示. 假设在web app目录下有一个resources文件夹, 这个文件夹中放置着所有的静态资源：
        
        ```xml
            <!-- 启动注解驱动 -->
            <mvc:annotation-driven/>
            <mvc:resources mapping="/resources/**" location="/resources/"></mvc:resources>
        ```

        先使用 mvc:annotation-driven 来启动注解驱动, 再利用 mvc:resources 来将静态资源的获取路径映射到本地路径中. 需要注意的是, 这个 ** 表示获取文件下的所有内容, 而目录的起点就是 web app . 那么如果在HTML页面中引用这些静态资源, 就可以用映射之后的路径也就是 /resources 开始写起, 例如
    
            /resouces/css/login.css
        
        这里要注意那个 mvc 标签, 它需要导入 "http://www.springframework.org/schema/mvc" 的内容才能解析, 在 IDEA 中输入 mvc 一共会有 3 个不同的解析文件, 注意甄别. 选错了, 会显示无法解析. 

        ``` xml
        <mvc:annotation-driven/> 
        ```
        这个标签实际上是一系列操作的简写形式, 自动注册 DefaultAnnotationHandlerMapping 和 AnnotationMethodHandlerAdapter 两个 bean , 配置一些 messageconverter . 

    - 解决方法二

        使用 web 应用容器的默认 servlet

        ``` xml
        <mvc:annotatin-driven/>
        <mvc:default-servlet-handler/>
        ```

        底下那个 mvc 标签会在 SpringMVC 应用上下文中添加一个 default servlet . 这个 servlet 可以处理静态资源的请求. 

2. 启动运行

   最后和之前使用JSP解析器的情况一样, 启动jetty之后, 在浏览器中输入

        http://localhost:8080/hello/mvc
    就可以看到 home.html 中的内容. 

## 关于 Application Context

以下内容没有经过查证, 是个人的想法. 

从项目中可以看到：最开始修改了pom.xml, 然后是web.xml, 再是dispatcher-servlet.xml, 这么一连串的操作透露出了Spring的MVC的配置是分层次, 再宽泛一点, 甚至到maven项目中也是分层次的. 而这里的 Application Context 的配置就在web和DS之间. pom中的内容是针对maven的部分, web是针对与web相关的配置, DS针对前端控制器, Application Context 针对当前整个项目, 所有的配置都在努力为上层组件提供公共组件和共享的服务. 

在更换 View Resolver中, 如果有多个DS的配置文件都需要html的解析器, 就需要编写多个html解析器的配置信息, 如果创建了一个Application Context, 在它当中写下配置信息, 就可以做到复用. 

1. 首先需要在web.xml中引入Application Context配置文件的路径及相关信息, 此处需要先在
WEB-INF路径下创建一个spring_config的文件夹, 并在该文件下创建一个Spring的xml配置文件：

    ```xml
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <!-- spring 应用上下文 -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <!-- 此处写入应用上下文的配置文件路径 -->
        <param-value>/WEB-INF/spring_config/applicationContext.xml</param-value>
    </context-param>
    ```

    当然这个配置文件也可以放在 src 的 `resources/` 的目录下, 使用 `classpath:` 直接定位到 resources 目录下

1. 随后就可在applicationContext.xml中添加那些通用的bean组件, 比如可以将html解析器的配置bean转移到这里：

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/tool http://www.springframework.org/schema/tool/spring-tool.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

        <bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
            <property name="templateLoaderPath">
                <value>/WEB-INF/jsp/</value>
            </property>
            <property name="freemarkerSettings">
                <props>
                    <prop key="defaultEncoding">UTF-8</prop>
                </props>
            </property>
        </bean>
    </beans>
    ```

3. 需要说明一下, 创建一个应用上下文的配置文件可能会让spring迷惑, 因为spring不知道到底该将这个配置文件放在哪个上下文中, IDEA有可能会提示类似的信息：
![](http://smacul.oss-cn-hangzhou.aliyuncs.com/18-11-20/25397108.jpg)
这种时候打开project structure, 在module内选择Spring, 手动为每个上下文添加修改相应的配置文件. 

1. applicationContext.xml 和 dispatcher-servlet.xml 配置文件之间的区别
    - applicationContext-*.xml文件通常用于加载spring系统级别的组件, 比如bean的初始化 
    - spring-servlet.xml文件通常用于加载controller层需要的类, 比如拦截器,mvc标签加载的类 


## 路径前的"/"

在web的当中, 如果路径前面有"/", 表示当前路径由站点根目录开始；不加"/"表示从当前路径开始. 

## classpath* 与 classpath: 的区别
- classpath: 指 classes 路径下文件, 直接定位到 `resources/` 路径下 
- classpath* 除了 classes 路径下文件, 还包含 jar 包中文件

## <context:annotation-config/>

这个标签能够隐式地向 Spring 容器注册 4 个 BeanPostPorcessor. 

- `AutowiredAnnotationBeanPostProcessor` 帮助系统识别 @Autowired 注解
- `CommonAnnotationBeanPostProcessor` 帮组系统识别 @Resource @PostConstruct @PreDestroy 等注解
- `PersistenceAnnotationBeanPostProcessor` 帮组系统识别 @PersistenceContext 注解
- `RequiredAnnotationBeanPostProcessor` 帮组系统识别 @Required 注解

他们传统的方式就是 `<bean class="org.springframework.beans.factory.annotation.*********"/>`

## PropertyPlaceholderConfigurer

这是一个 bean 工厂的后置处理的实现, 也就是 BeanFactoryPostProcessor 接口的一个实现. 利用这个东西, 就可以将上下文配置文件中需要的属性值放在另一个单独的 Property 文件中, 并在上下文中使用 ${key} 来替换指定的 Property 文件中的值. 

``` xml
<bean id="propertyConfigurer" class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
<property name="locations">
    <list>
        <!-- config.properties 是在 src/main/resources 下的 Property 文件 -->
        <value>classpath:config.properties</value>
    </list>
</property>
</bean>
```

## ResourcesBundleMessageSource

ApplicationContext 接口扩展了 MessageSource 接口,  因而提供了消息处理的功能.  Spring 目前提供了两个 MessageSource 的实现ResourceBundleMessageSource 和 StaticMessageSource . 

[具体内容](https://blog.csdn.net/qyf_5445/article/details/8124431)

``` xml
 <bean id="messageSource"
        class="org.springframework.context.support.ResourceBundleMessageSource"
        p:basename="Messages">
 </bean>
```

这个 bean 的名字必须为 messageSource . 

## 实体类 Entity 无法解析 table column

显示无法解析是因为注解的东西没有和 IDEA 的数据连接进行关联

- 可以先在 IDEA 的 database 中添加自己的数据库连接. 
  
- 启动 IDEA 的 Persistence （持久化） , 单击项目名 Assign Data Source , 选择刚才创建的数据库连接

