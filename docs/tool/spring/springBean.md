# Spring装配Bean

- Spring 的几个基本标签及使用方法
- Maven 的依赖配置说明

## Spring配置的可选方案

1. 在XML中显式配置

    XML的方式下，所有的配置内容将被转移到Bean的XML配置文件中（配置方式在下面），在beans标签下写下需要的配置的Bean。
    ``` XML
    <bean id="person" class="org.itee.se.PersonImpl">
        <property name="phone" ref="phone"></property>
        <property name="name" value="smith"></property>
        <property name="type" value="guest"></property>
    </bean>
    ```
    具体的说明在下方。

1. 在Java中显式配置

1. 隐式的bean发现机制和自动装配

    这种方式下，XML文件不需要多bb，绝大多数工作依靠标签完成。Spring使用两种机制来实现自动化装配，

    - 组件扫描 component scan

        - 在Bean的XML配置文件中，在文件中添加
            ``` xml
            <context:component-scan base-package="org.itee.se"/>
            ```
            来启动组件扫描，这个的base-package将指出对哪个包进行扫描。

        - 或者在需要自动扫描的类的前面，添加
            ``` Java
            @ComponentScan("org.itee.se")
            public class PhoneImpl() {
                ··· ···
            }
            ```
            在Value中指明包的名称。

    - 自动装配 auto wiring

        如果一个Bean被打上了相应的标记，Spring会自动满足Bean之间的依赖。其他的内容见下方的Spring注解。

## Spring装配Bean需要的添加的依赖

需要的依赖都在maven的配置文件pom.xml中的dependencies标签下。

1. org.springframework.beans

    Spring IoC的基础实现

    ``` xml
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-beans</artifactId>
        <version>RELEASE</version>
    </dependency>
    ```

1. org.springframework.context

    Spring提供在基础IoC功能上的扩展服务，此外还提供许多企业级服务的支持，如邮件服务、任务调度、JNDI定位、EJB集成、远程访问、缓存以及各种视图层框架的封装等.

    ``` xml
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>RELEASE</version>
    </dependency>
    ```

1. org.springframework.core

    Spring的核心工具包

    ``` xml
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>RELEASE</version>
    </dependency>
    ```

注意：添加所有Spring依赖需要保证version一致，否则会报告类似 error springframework coded 的异常。一种比较好的写法是：

``` xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.7</maven.compiler.source>
    <maven.compiler.target>1.7</maven.compiler.target>
    <!-- 在properties中先写好版本号，这样可以减少混乱，也方便他人了解项目信息 -->
    <!-- 此处spring.version可以改成其他名字，方便阅读即可 -->
    <spring.version>5.0.2.RELEASE</spring.version>
</properties>

<dependencies>
    <!-- 省略 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <!-- 注意此处版本号的写法 -->
        <version>${spring.version}</version>
    </dependency>
    <!-- 省略 -->
</dependencies>

```

这里可能会对到底使用什么依赖版本产生疑惑，如果使用的是 aliyun 的镜像仓库，可以到 [aliyun 镜像仓库](http://maven.aliyun.com/mvn/search) 中查找具体需要的依赖的版本号。点击文件名即可获得相应的 maven 依赖的配置信息。如果使用的是原版的 maven 镜像，也可以使用相似的操作。

如果产生了配置冲突，直接查询异常信息可以较快地获得解决方案。

jar 包依赖冲突的可能情况
	- 多个 jar 包引用了同一 jar 包
		○ A 和 B 引用的 C 版本相同
		○ A 和 B 引用的 C 版本不同（maven 貌似会使用高版本）
			§ 两个版本相互兼容
			§ 两个版本不兼容

无特殊情况，使用高版本的 jar 包， bug 少，功能多。

此外使用命令 

    mvn dependency:tree
可以查看所有用到的直接依赖和间接依赖，打印出来的内容中 +-、\- 这两个符号并没什么特殊的含义，只是表达了一种分级。



## 创建Bean的XML配置文件

在工程目录的main下（和java同一目录），自己创建一个名为resources的文件夹，，并创建一个Bean的XML配置文件，Spring Configuration File。此外暂时不要修改resources的名称，但是XML配置文件的名称可以自定义。

## Spring注解

在隐式的bean发现机制和自动装配中需要这些东西

1. @Component

    在Bean的开头使用，用来标记当前这个Java类是否是Bean。它也可以写成
    ``` Java
    @Component("person")
    public class PersonImpl implements Person {
        ··· ···
    }
    ```
    括号中的phone就将作为phoneImpl的代号。当需要获取这个Bean的时候，就可以使用这个代号，像这样
    ``` Java
    Person p = ctx.getBean("person", Person.class);
    ```

2. @Autowired

    - 可以在Java类的成员属性是和上面使用，或者在某些需要对象参数注入的方法上面使用，被这个注解标记了的属性会和一个被@Component标记了的Java类联系在一起。
        ``` Java
        @Autowired
        private Phone phone;

        // 或者
        @Autowired
        public void printPhone(Phone phone) {
            ··· ···
        }
        ```
        ``` Java
        @Component("phone")
        public class PhoneImpl implements Phone {
            ··· ···
        }
        ```
        上面的phone会和下面的PhoneImpl自动连线，相当于自动创建了一个PhoneImpl实体并赋值给phone，代替了原来Bean中的setter方法。

    - Autowired也可以添加Value，用String类型来代替所有的数据类型（打双引号），为属性直接赋值。

## XML配置

如果使用XML配置就需要这一部分，在Bean的xml配置文件中的beans标签下添加需要扫描的包。

``` XML
<bean id="person" class="org.itee.se.PersonImpl">
    <property name="phone" ref="phone"></property>
    <property name="name" value="smith"></property>
    <property name="type" value="guest"></property>
</bean>
```

- id 作用等价于@Component中的Value
- class 需要配置的Bean，写明包名和类名
- property 类的成员属性
- name 成员属性的名称
- ref 如果当前属性是一个Bean对象，就需要使用ref，对应普通的value，将Bean对象的id赋值给它
- value 如果当前属性只是一个普通的数据结构的属性，就使用value，这个@Autowired中的value功能是等价的。

## 调用配置好的Bean

当需要调用这些bean的时候，创建一个ClassPathXmlApplicationContext对象，并将resources中Bean的XML配置文件的赋值给它。使用getBean方法就可以获得配置好的Bean。

``` Java
ApplicationContext ctx = new ClassPathXmlApplicationContext("bean.xml");
Person p = ctx.getBean("person", Person.class);
```

getBean方法接受两个参数，一个需要调用的Bean的id，另一个是类名。

## 项目路径举例

    - main
        - java
            - springbean
                - Person.java（接口）
                - PersonImpl.java（Person接口实现类）
                - Phone.java（接口）
                - PhoneImpl.java（Phone接口实现类）
                - TestSimpleDail.java（测试，Main）
        - resources
            bean.xml（Bean配置文件）
    - pom.xml（Maven配置文件）