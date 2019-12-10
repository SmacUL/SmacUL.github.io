# Hibernate

## 简单的使用

[Hibernate 例子](https://www.w3cschool.cn/hibernate/gfhs1iep.html)

## hibernate 的作用

hibernate 是一种 ORM 框架的持久性框架，对 JDBC 做了轻量的封装。

## hibernate 的 session factory 与 session

Hibernate 中的 session 是用来表示应用程序和数据库的一次交互。在一个 Session 中，包含了一般的持久化方法（增删改查）。此外 Session 是一个轻量级对象（线程不安全），每个 Session 实例和一个数据库事务绑定。

SessionFactory 接口负责初始化Hibernate。它充当数据存储源的代理，并负责创建Session对象。这里用到了工厂模式。需要注意的是SessionFactory并不是轻量级的，因为一般情况下，一个项目通常只需要一个SessionFactory就够，当需要操作多个数据库时，可以为每个数据库指定一个SessionFactory。

## TransactionManager

Spring 自己并没有事务管理机制，它会提供一个 PlatformTransactionManager 的接口，让各个平台自行实现具体的机制。 TransactionManager 就是 Hibernate 平台用于事务管理的实现。