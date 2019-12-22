# SpringMVC 3

- 修改 Hello SpringMVC 项目的结构
- @ResponseBody
- @RequestBody

## 修改 Hello SpringMVC 的项目结构

这里的项目结构不唯一, 也可以采用其他合理的目录结构, 但是这是一个相对完整的项目结构. 

        HelloSpringMVC
        - src
            - main
                - java
                    - top.smacul
                        - beans （Bean）
                        - controllers （控制器）
                            - HelloMVCController.java
                        - dao （数据库操作对象）
                        - services （服务, 一般由控制器调用）
                        - util （工具类）
                - resources
                - test
                - webapp                        
                    - resources （静态资源）
                        - css
                        - images
                        - js
                    - WEB-INF
                        - servlet-config （ servlet 配置文件）
                            - dispatcher-servlet.xml
                        - spring-config （应用容器配置文件）
                            - application-context.xml
                        - views （视图）
                            - home.html
                        - web.xml
        - pom.xml

## 修改各级 xml 配置文件中内容

修改完成后注意配置静态资源, 并进行测试. 

1. pom.xml

    ``` xml
    <properties>
        ··· ···
        <spring.version>5.0.2.RELEASE</spring.version>
        <servlet.version>4.0.1</servlet.version>
        <freemarker.version>2.3.28</freemarker.version>
        <jetty.version>9.4.14.v20181114</jetty.version>
    </properties>

    <dependencies>
        ··· ···
        <!-- servlet -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>${servlet.version}</version>
            <scope>provided</scope>
        </dependency>
        <!-- spring -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context-support</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!-- freemarker-->
        <dependency>
            <groupId>org.freemarker</groupId>
            <artifactId>freemarker</artifactId>
            <version>${freemarker.version}</version>
        </dependency>
    </dependencies>

    <!-- jetty -->
    <plugins>
        ··· ···
        <plugin>
            <groupId>org.eclipse.jetty</groupId>
            <artifactId>jetty-maven-plugin</artifactId>
            <version>${jetty.version}</version>
        </plugin>
    </plugins>

    ```

2. web.xml

    ``` xml
        <display-name>Archetype Created Web Application</display-name>

        <!-- 监听器, 在 web 容器启动时自动加载 applicationContext 的配置信息 -->
        <listener>
            <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
        </listener>
        <!-- spring 应用上下文 -->
        <context-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/spring-config/application-context.xml</param-value>
        </context-param>

        <servlet>
            <servlet-name>dispatcher</servlet-name>
            <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
            <init-param>
                <param-name>contextConfigLocation</param-name>
                <param-value>/WEB-INF/servlet-config/dispatcher-servlet.xml</param-value>
            </init-param>
            <load-on-startup>1</load-on-startup>
        </servlet>
        <servlet-mapping>
            <servlet-name>dispatcher</servlet-name>
            <url-pattern>/</url-pattern>
        </servlet-mapping>
    ```

3. dispatcher-servlet.xml
   
    ``` xml
    <mvc:annotation-driven/>
    <mvc:resources mapping="/resources/**" location="/resources/"></mvc:resources>

    <context:component-scan base-package="top.smacul"></context:component-scan>

    <!-- HTML 视图解析器 -->
    <bean id="htmlViewResolver"
          class="org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver">
        <property name="suffix" value=".html" />
        <property name="order" value="0"></property>
        <property name="contentType" value="text/html;charset=UTF-8"></property>
    </bean>
    ```

4. application-context.xml

    ``` xml
    <!-- freemarker 的配置文件 -->
    <bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
        <property name="templateLoaderPath">
            <value>/WEB-INF/views/</value>
        </property>
        <property name="freemarkerSettings">
            <props>
                <prop key="defaultEncoding">UTF-8</prop>
            </props>
        </property>
    </bean>
    ```

## ResponseBody

SpringMVC 提供了这样的一个机制, 允许控制器返回的数据不经过正常的视图处理流程, 而是直接将返回的数据写入响应体中（response body）. 由于 HTTP 协议支持的各种数据类型与程序运行中产生的各种数据类型是不一样的, 因此需要有一个机制将处理器返回的数据转换成某种类型的HTTP 协议支持的数据类型. 

[具体介绍](https://www.cnblogs.com/weilu2/p/springmvc_controller_handler_return_json_xml.html)

1. 添加 Json 依赖
   
    - com.fasterxml.jackson.core version 2.9.5
        - jackson-core
        - jackson-databind

    这两个 jar 包使得 Controller 能够返回 JSON 数据, 在 SpringMVC 中 JSON 的数据转换器需要以上两个依赖. 这个转换器可以将对象转为 JSON 格式的数据返回给前端. 

2. 前端发送请求

    home.js

    ``` js
    var id = 12
    var name = "SmacUL";
    var pass = "123456"
    $.post("/hello/responsebody",
        {id: id, name: name, pass: pass},
        function (result){
            if(result){
                alert("success")
            }
            else
                alert("ERROR");
        });
    ```

3. Controller

    ``` Java
    @ResponseBody
    @RequestMapping("/responsebody")
    public boolean responseBody(int id, String name, String pass) {
        System.out.println(id + name + pass + "");
        return true;
    }
    ```

如果没有问题,  home.html 页面将弹出 success , 控制台也将输出相应信息. 

## ResponseBody

1. 创建 Bean

    User Bean ,  3 个属性： id name pass , 相应的 getter 、 setter 方法, 无属性和 3 个属性 constructor 的各一个. 

    - 为什么要一个无参构造函数, 这是因为 jackson 的反序列化需要无参构造函数, 但是在 User 中我们定义了一个带三个参数的构造器, 导致 JVM 不会添加无参构造器, 如果没有这个无参构造器, 控制器返回数据时就会报错. 

    - 此外如果前端的数据名称和 Bean 中对应不上, 在 Bean 中各个成员属性上可以使用 @JsonProperty 标签

1. 前端貌似必须使用 ajax

    ``` js
    // 创建一个 JsonObject users
    var users = JSON.stringify({id: 1, name: "SmacUL", pass: "123456"});
    var url = "/hello/requestbody"
    $.ajax({
        type: 'POST',
        url: url,
        data: users,
        dataType: "json",
        contentType: "application/json",
        success: function(result) {
            alert(result.id);
            alert(result.name);
            alert(result.pass);
        },
        error: function() {
            alert("error");
        }
    });
    ```
    - dataType 发出的数据类型
    - contentType 返回的数据类型
    - 控制器将返回数据,  result 可以就是一个 JSON 对象. 

2. Controller 
   
   ``` Java
    @RequestMapping("/requestbody")
    @ResponseBody
    public User requestBody(@RequestBody User user) {
        System.out.println(user.toString());
        return new User(2, "smac-9", "123456");
    }
   ```