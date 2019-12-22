# Git 的基本使用

## 设置用户名和邮箱

``` Shell
git config --global user.name [用户名]
git config --global user.email [邮箱地址]
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