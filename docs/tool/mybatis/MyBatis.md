# MyBatis

## 简介

此处提到的 MyBatis 指 iBatis3 . 它是一个映射框架, 将 SQL 结果与对象进行映射, 开发人员只需要编写 SQL , MyBatis 就会自动将其映射为对象.  

Dao 层需要一个对象能与数据库交互, 并能执行 SQL 的对象, MyBatis 就是提供这样一个对象的. 这个对象称为 SqlSession , 它是 JDBC 的二次封装. 

#### SqlSession 的作用

- 向 SQL 语句传入参数
- 执行 SQL 语句
- 获取执行 SQL 语句的结果
- 事务的控制

#### 如何得到 SqlSession

1. 通过核心配置文件获取数据源的相关信息
1. 通过配置信息构建 SqlSessionFactory
1. 通过 SqlSessionFactory 来启动数据库会话

## MyBatis 项目开发过程

1. 创建基础项目（maven quickstart）
1. 添加 MyBatis 依赖
1. 在 resources 下创建 jdbc.properties （可以是其他名字, 可以没有）
1. 在 resources 下创建 SqlMapper.xml （可以是其他名字）
1. 在 model 包中创建 POJO （不一定与表对应）
1. 在 client 包中创建 mapper 接口
1. 在 mapper 包中创建 mapper 配置文件, 文件中每个 select 的 id 与 mappe r接口中的一个方法对应
1. 编写测试类进行测试

### 项目目录（举例）

    - src/（源代码目录）
        - main/
            - java/
                - mybatis/
                    - dao/（数据访问接口包）
                        - GroupMapper.java
                        - UserMapper.java
                    - entity/（映射对象包）
                        - Group.java
                        - GroupExample.java
                        - User.java
                    - mapper/（映射配置包）
                        - GroupMapper.xml
                        - UserMapper.xml
                    - App.java（创建了SqlSession, main）
            - resources
                - generatorConfig.xml
                - jdbc.properties（可选）
                - SqlMapper.xml（iBatis配置文件）
        - test/
    - pom.xml（maven配置文件）

### 添加 MyBatis 依赖

在 pom.xml 中添加 MyBatis 依赖, 因为涉及到 MySQL 的操作, 所以要把 MySQL connector 一块添加进来

``` xml
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.2.8</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.22</version>
</dependency>
```

### MyBatis核心配置文件

在 GitHub 上下载 MyBatis 的源码（src目录下的东西）, 按照路径找到

``` bash
mybatis-3-master\mybatis-3-master\src\test\java\org\apache\ibatis\submitted\complex_property\
```
这个目录下有一个 MyBatis 的核心配置文件, Configuration.xml, 下方的内容在 Configuration.xml 的基础上做出了一定的修改. 

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!-- <settings>
        <setting name="useGeneratedKeys" value="false"/>
        <setting name="useColumnLabel" value="true"/>
    </settings>

    <typeAliases>
        <typeAlias alias="UserAlias" type="org.apache.ibatis.submitted.complex_property.User"/>
    </typeAliases> -->

    <!-- 数据源配置 -->
    <environments default="development">
        <environment id="development">
        <!-- 事务类型, property可以没有 -->
        <transactionManager type="JDBC">
            <property name="" value=""/>
        </transactionManager>
        <!-- 数据源类型 -->
        <dataSource type="UNPOOLED">
            <!-- 驱动 -->
            <property name="driver" value="org.hsqldb.jdbcDriver"/>
            <!-- 数据库链接 -->
            <property name="url" value="jdbc:hsqldb:mem:complexprop"/>
            <!-- 用户名 -->
            <property name="username" value="sa"/>
            <!-- 密码 -->
            <property name="password" value="sa"/>
        </dataSource>
        </environment>
    </environments>

    <!-- 注册XML文件 -->
    <mappers>
        <!-- 除了核心配置文件之外还有众多的SQL配置文件, 核心配置文件具有导入SQL配置文件的作用 -->
        <!-- mapper标签 将对应一个SQL配置文件 -->
        <mapper resource="org/apache/ibatis/submitted/complex_property/User.xml"/>
    </mappers>

</configuration>
```

### MyBatis SQL配置文件

从 GitHub 中下载的源码里除了 MyBatis 的核心代码之外, 还有关于 SQL 的配置文件, 也在
``` bash
mybatis-3-master\mybatis-3-master\src\test\java\org\apache\ibatis\submitted\complex_property\
```
路径下. 一个 User 的 Java 类和一个 User 的 XML 配置文件, 二者结合阅读. User.java 是一个很质朴的 Bean , 拥有几个成员属性以及相对应的 getter 和 setter 方法. 

``` XML
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<!-- 和 Java 的 package 类似, 不同的namespace下可以使用相同的SQL id -->
<!-- 必须用 -->
<!-- 如果没有这个namespace, 开发人员就需要保证整个项目所有的SQL标签中的id不重名 -->
<mapper namespace="User">

<!-- MyBatis在做这么一件事, 就是将数据库表中的字段和Java Bean中的属性一一对应并填充 -->
<!-- 而resultMap标签的作用就是将字段和属性映射在一起, 其实对应的是Java中ResultSet那一部分的工作 -->
<!-- type属性 Bean的全名称 -->
<!-- id属性 为这个Bean起一个唯一的名字 -->
<resultMap type="UserAlias" id="UserResult">
    <!-- id标签 如果在数据库中, 这个字段是主键, 则使用id标签 -->
    <!-- column属性 数据库字段的名字 -->
    <!-- jdbcTpye属性 ？？？ -->
    <!-- property属性 Bean中的属性名 -->
    <id column="id" jdbcType="INTEGER" property="id"/>
    <!-- result标签 如果在数据库中, 这个字段是非主键, 则使用result标签 -->
    <result column="username" jdbcType="VARCHAR" property="username"/>
    <result column="password" jdbcType="VARCHAR" property="password.encrypted"/>
    <result column="administrator" jdbcType="BOOLEAN" property="administrator"/>
</resultMap>

<!-- select标签对应select语句 -->
<!-- id属性 为这个SQL起一个唯一的名字（但是可以和resultMap中的id重合）, 方便Java代码调用这个SQL -->
<!-- parameterType属性 如果有参数需要写入SQL语句中, 就需要此属性指定参数类型（不需要写参数名称, 而且一次只能传一个）, 如果传递的是自己的对象, 就需要将完整的类名写入 -->
<!-- resultMap属性 指向resultMap标签的id, 即指定数据库和Bean之间的对应关系 -->
<select id="find" parameterType="long" resultMap="UserResult">
    SELECT * FROM user WHERE id = #{id:INTEGER}
</select>

<select id="version" parameterType="long" resultType="int">
    SELECT version FROM user WHERE id = #{id,jdbcType=INTEGER}
</select>

<!-- delete标签对应delete语句 -->
<delete id="delete" parameterType="UserAlias">
    DELETE FROM user WHERE id = #{id:INTEGER}
</delete>

<!-- insert标签对应insert语句 -->
<insert id="insert" parameterType="UserAlias" useGeneratedKeys="false">
    INSERT INTO user
    ( id,
    username,
    password,
    administrator
    )
    VALUES
    ( #{id},
    #{username,jdbcType=VARCHAR},
    #{password.encrypted:VARCHAR},
    #{administrator,jdbcType=BOOLEAN}
    )
</insert>

<update id="update" parameterType="UserAlias">
    UPDATE user SET
    username = #{username,jdbcType=VARCHAR},
    password = #{password.encrypted,jdbcType=VARCHAR},
    administrator = #{administrator,jdbcType=BOOLEAN}
    WHERE
    id = #{id,jdbcType=INTEGER}
</update>

<!--   Unique constraint check -->
<select id="isUniqueUsername" parameterType="map" resultType="boolean">
    SELECT (count(*) = 0)
    FROM user
    WHERE ((#{userId,jdbcType=BIGINT} IS NOT NULL AND id != #{userId,jdbcType=BIGINT}) OR #{userId,jdbcType=BIGINT} IS
    NULL)  <!-- other than me -->
    AND (username = #{username,jdbcType=VARCHAR})
</select>
</mapper>
```

### 读取 MyBatis 配置文件

在需要 SqlSession 的地方读取配置文件

``` Java
// 通过配置文件获取数据库连接信息
Reader reader=Resources.getResourceAsReader("MyBatis核心配置文件的路径");
// 通过配置信息构建一个 SqlSessionFactory
SqlSessionFactory slqSessionFactory = new SqlSessionFactoryBuilder().build(reader);
// 通过 SqlSessionFactory 来打开一个数据库会话
SqlSession sqlSession = sqlSessionFactory.openSession();
```

这段代码会提示一个 IOException（在Dao层进行处理, finally 中将 SqlSession 关闭）, 重点在于获取一个 sqlSession , 利用它就可以操纵对象和数据库之间进行交互. 

### 通过 SqlSession 来执行 SQL 语句

``` Java
// 如果执行的是 select SQL 且返回的是一个结果
sqlSession.select("SQL的id", 输入的参数（可选、可多个）);
// 如果执行的是 select SQL 且返回的是一串结果
sqlSession.selectList("SQL的id", 输入的参数（可选、可多个）);
```

### MyBatis 面向接口编程

在上面的项目结构举例中, 有一个名为 dao 的包, 底下有两个 Interface , MyBatis 允许只写接口, 不用写接口实现类. 下面的是UserMapper.java

``` Java
public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
}
```

这里的各种方法对应的 SQL 配置文件的 SQL id 名, 不需要接口实现类是因为我们在 SQL 配置文件中已经写好了相应的 SQL 语句, MyBatis 可以根据 SQL 语句完成具体的实现. 接口中这些方法貌似可以用下方的 MBG 来自动生成. 

而通过 sqlSession 来执行 SQL 语句的过程也可以变为

``` Java
UserMapper mapper=session.getMapper(UserMapper.class);
User u=mapper.selectByPrimaryKey(5);
```

`getMapper` 方法传入的参数就是接口名. 

### MyBatis-generator（MBG）代码自动生成工具

MyBatis 是一种半自动的 ORM 框架, 主要工作是书写 Mapping 映射文件, 由于手写映射文件容易出错, MyBatis-generator 能够帮助我们自动生成需要的 dao、Bean、mapper xml 文件. 

在 resources 目录下可以添加一个 generator 的配置文件

``` XML
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
"http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!-- connector的jar包位置, MyBatis不会自动连接Maven的中央仓库 -->
    <classPathEntry location="D:\\project\\jar\\mysql-connector-java-5.1.22.jar" />
    <!-- id属性 必选, 用来确定一个唯一的context元素 -->
    <!-- target属性 用于指定生成的代码的运行时环境 -->
    <context id="test" targetRuntime="MyBatis3">
        <!-- 生成注释 -->
        <commentGenerator>
            <!-- 这个元素用来去除指定生成的注释中是否包含生成的日期 false:表示生成 -->
            <!-- 如果生成日期, 会造成即使修改一个字段, 整个实体类所有属性都会发生变化, 不利于版本控制, 所以设置为true -->
            <property name="suppressDate" value="true" />
            <!-- 是否去除自动生成的注释 true：是 ： false:否 -->
            <property name="suppressAllComments" value="false" />
        </commentGenerator>

        <!--数据库链接URL, 用户名、密码 -->
        <jdbcConnection
            driverClass="com.mysql.jdbc.Driver"
            connectionURL="jdbc:mysql://localhost/mytest"
            userId="root"
            password="123456">
        </jdbcConnection>

        <!-- 用来指定JDBC类型和Java类型如何转换 -->
        <javaTypeResolver>
            <!-- name属性 ？填入的forceBigDecimals可以控制是否强制DECIMAL和NUMERIC类型的字段转换为Java类型的java.math.BigDecimal,默认值为false, 一般不需要配置.  -->
            <property name="forceBigDecimals" value="false" />
        </javaTypeResolver>

        <!-- 用来控制生成的实体类 -->
        <!-- targetPackage属性 生成的实体类存放的包名 -->
        <!-- targetProject属性 指定目标项目路径 -->
        <javaModelGenerator
            targetPackage="se.zust.batis.entity" targetProject="src/main/java">  
            <!-- name属性 ？enableSubPackages, 被设置为false时会直接使用targetPackage的属性值来生成包  -->
            <property name="enableSubPackages" value="false" />  
            <!-- name属性 ？trimStrings, 是否对数据库查询结果进行trim操作（去掉传入参数值的空格、tab？） -->  
            <property name="trimStrings" value="true" />  
        </javaModelGenerator>

        <!-- 生成映射文件的包名和位置 -->
        <sqlMapGenerator
            targetPackage="se.zust.batis.mapper" targetProject="src/main/java">  
            <property name="enableSubPackages" value="false" />  
        </sqlMapGenerator>

        <!-- 生成DAO的包名和位置 -->
        <javaClientGenerator
            targetPackage="se.zust.batis.dao"
            targetProject="src/main/java"
            type="XMLMAPPER">
            <property name="enableSubPackages" value="false" />  
        </javaClientGenerator>

        <!-- 设置要生成的表 -->
        <!-- domainObjectName属性 生成的对象的名称. 如果没有指定, MBG会自动根据表名来生成名称.  -->
        <table schema="example" tableName="tuser" domainObjectName="User"  
            enableCountByExample="false"  
            enableUpdateByExample="false"  
            enableDeleteByExample="false"  
            enableSelectByExample="false"  
            selectByExampleQueryId="false">  
        </table>
        <table schema="example" tableName="tgroup" domainObjectName="Group"
            enableCountByExample="false"
            enableUpdateByExample="false"
            enableDeleteByExample="false"
            enableSelectByExample="false"
            selectByExampleQueryId="false">
        </table>
    </context>
</generatorConfiguration>
```

更多有关MyBatis-generator配置文件标签属性的说明可以见[MyBatis Generator 详解](https://blog.csdn.net/isea533/article/details/42102297)
