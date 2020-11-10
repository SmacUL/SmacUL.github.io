# Git 的基本使用

## 配置

和很多软件一样, Git 提供两套配置, 一个在安装目录下, 一个在每个仓库下. 这就允许我们既可以为整体进行配置, 也可以为每个仓库做出定制的配置. 

查看当前仓库的所有配置, 以及配置来源:
``` sh
git config --list --show-origin
```

全局设置用户名
``` sh
git config --global user.name [用户名]
```
为当前仓库设置邮箱
``` sh
git config user.email [邮箱地址]
```

## 撤销与回滚

### reset 操作

reset 指令用于撤销指定的提交, 它有三种模式: hard , mixed , soft , 对应着从严到宽的三种模式, 这个从严到宽指保留暂存区内文件的多少, 默认情况下就是 mixed 模式

如果我们希望回滚到某一次提交, 但是保留暂存区中的所有已被修改的文件. 这种回滚方式会保留指定版本号之后的所有文件修改. 

``` sh
git reset --soft [提交版本号]
```

如果我们发现暂存的内容有点问题, 希望撤销

``` sh
git reset [提交版本号]
```

如果希望回滚到某一次提交, 并希望撤回暂存区中的所有修改 (如果文件从来没有被追踪过, 那它的修改是不会被撤销的). 这种操作常见于觉得最近一次的提交有点问题, 想重新提交, 但是又不想让这次提交苟活在世上. 
``` sh
git reset --hard [提交版本号]
```

### checkout 用于文件内容的撤销

如果一个文件改动没有进入暂存区, 而我们又希望它能回到没有改动的状态. 下方的命令中, Git 会用最近一次 Commit 中的数据覆盖掉文件内容. 

``` sh
git checkout -- [文件]
```

## 下载远程仓库

### 使用HTTPS  
``` bash
git clone https://github.com/[github用户名]/[仓库名.git]
```
可能会有如下的报错  
``` bash
fatal: I don't handle protocol 'https'.
```
尝试删除clone和https之间的空格, 再打一个空格上去

### 使用SSH
``` bash
git clone git@github.com:[github用户名]/[仓库名.git]
```
出现报错
``` bash
Permission denied (publickey).
fatal: Could not read from remote repository.
```

这种时候, 我们需要创建一对公钥和私钥, 将公钥交给远程仓库, 私钥保留在本地. 

``` bash
ssh-keygen
```
这个操作会生成一个公钥 `id_rsa.pub` 和一个私钥 `id_rsa` , 生成公钥和私钥的时候, 留意一下输出路径;  
如果远程仓库在 GitHub 中, 在 Github 官网的 `settings-SSH and GPG keys` 中 new 一个 SSH key , 在弹出的对话框中, 将公钥内的内容粘贴进去; 


## 提交

### 合并上一次提交

``` bash
git commit --amend -m [注释]
```
::: tip
amend 修改
:::

## 远程仓库使用

### 查看当前远程仓库
``` bash
git remote
git remote -v  # 显示详细信息
```

### 在本地添加一个远程仓库
``` bash
git remote add [仓库代号][仓库路径]
```

### 查看仓库的远程信息
``` bash
git remote show [仓库代号]
```

### 重命名远程仓库的代号
``` bash
git remote rename [旧代号] [新代号]
```

### 删除远程仓库
``` bash
git remote rm [仓库代号]
```

### 新建远程仓库, 修改本地的远程仓库信息并上传
``` bash
git remote  # 查看远程仓库代号
git remote rm [原有仓库代号]
git remote add [远程仓库代号] [远程仓库地址]
git push -u [远程仓库代号, 一般是origin] [分支名称, 一般是master]
```

## .gitignore 忽略文件
可以在 .gitignore 中指定不需要追踪的文件或者文件类型或者文件夹目录. 

::: tip
如果文件已经被 commit 到仓库中, 然后再讲文件添加到 .gitignore 中是无效的. 
:::

### 更新 .gitignore 文件

如果文件已经被 commit 到仓库中, 但是又想取消此文件的追踪. 可以先修改 .gitignore 添加此文件, 然后按照以下指令操作.

``` bash
# 先修改 .gitignore
git rm -r --cache .     # 删除所有文件的追踪
git add .               # 再次添加所有文件, .gitignore 文件将生效
git commit -m "[注释]"   # commit
```


## 打标签

### 打标签
``` bash
git tag -a [附注] -m [说明]
```
::: tip
`-a` 是 annotated
:::

### 分享标签
默认情况下, git的push操作不会将标签也提交到远程仓库, 需要显示说明
``` bash
git push [仓库代号] [标签名称]
```
如果要分享所有的标签
``` bash
git push [仓库代号] --tags
```

## 分支
不要将git分支理解成线性的结构, 所谓的分支只是一个标记, 而不是一条线

### 查看本地分支
``` bash
git branch      # 查看当前所有的分支
>> * master     # 默认的返回值, * 表示指向当前分支
```

### 查看远程分支
``` bash
git branch -r
```

### 查看本地和远程的所有分支
``` bash
git branch -a
```

### 创建本地分支
``` bash
git branch [创建的分支名]  # 创建本地分支
```

### 切换分支
``` bash
git checkout [分支名]  # 切换分支
```

### 远程不存在某个分支, 推送本地的某个分支给远程仓库
``` bash
# 将本地分支提交给远程仓库
# 远程仓库将创建一个远程分支对应该本地分支（二者的名称相同）
git push origin [本地分支]

# 将本地分支提交给远程仓库
# 远程仓库将创建一个远程分支对应该本地分支
git push origin [本地分支]:[远程分支]  
```

### 删除远程分支
``` bash
# 保证冒号的左侧为空
git push origin :[要删除的远程分支]  
```


### 分支合并
``` bash
git merge [需要合并到主分区的分支名称]
```
::: tip
如果git自动合并失败（有冲突）可以使用git status来查看
:::

### 查看哪些分支已经被合并
``` bash
git branch --merged
git branch --no-merged
```