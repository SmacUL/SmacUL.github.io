# Maven配置及项目创建

## 安装Maven

1. 解压到喜欢的目录下（可以有空格，不知道能不能有中文）
1. 配置环境变量 查看自带的readme.txt


## 配置Maven（window系统下）

### settings文件

这个文件应该应该有两份，一份在用户目录下（User/.m2），另一份在maven的安装路径下

前者对当前用户生效，后者对系统全局生效。

### Repository

#### 本地仓库配置

建议有一个自己的Repository，如果不配置，默认的Repository的地址是在用户（系统盘:/User/用户名，Windows系统）目录下的.m2文件夹中  
示例路径：
    ```
    C:\Users\SmacUL\.m2\repository
    ```
        
打开maven的settings.xml文件，找到关于Repository的注释部分
将注释中的

``` xml
<localRepository>/path/to/local/repo</localRepository>
```

复制到正文部分，并且修改 `<localReository>`标签中你的仓库路径  
示例：

``` xml
<localRepository>C:\User\Document\maven-repository</localRepository>
```
> 需要注意的是，上面这个路径里不能有空格，能不能有中文没有试过
如果路径不对，项目打开后应该会报错[ERROR] Maven execution terminated abnormally (exit code 1)，完整的错误信息中会提示找不到repository

#### 中央仓库配置

创建maven项目的时候，首先检查pom.xml文件来确定依赖包的下载位置；如果本地仓库有，那就从本地仓库下载；如果本地仓库没有就从默认中央仓库（http://repo1.maven.org/maven2/）中查找并获得依赖包，如果中央仓库中也没有，那就会抛出异常。  

因为这个中央仓库的位置在境外服务器，受到墙的原因，把他修改成国内镜像会更好。  

修改中央仓库：  

打开maven的settings.xml文件，将注释中有关mirror的部分复制到正文，并修改信息
示例：

``` xml
<mirror>
    <id>nexus-aliyun</id>
    <mirrorOf>*,!jeecg,!jeecg-snapshots</mirrorOf>
    <name>Nexus aliyun</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```
镜像可以有多个，上面的配置中使用的是阿里同志的镜像。

## 创建Maven项目（IDEA下）

1. create new project-> Maven
2. 勾选create from archetype （用模板来创建）
3. 选择下方的maven-archetype-quitestart，next
4. 填写两个ID，groupID（实际对应Java包的结构），artifactId（项目的唯一标识符），Maven home directory 用自己的Maven
5. 进入到项目后会自动从配置好的路径中下载模板
6. 最后点击一下右下角的Enable Auto-Import