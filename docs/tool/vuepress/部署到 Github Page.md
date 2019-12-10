# 部署到 Github Page

由于我们自己的 Vuepress 项目的主要成分不是 HTML , 而是像什么 js md 文件, 那么就需要我们先想办法, 把当前项目变成静态的 HTML 集合.  

然后将静态页面上传到 Github Page 仓库中; 同时, 我们还是需要保存项目中的 js md 等文件, 把青山留下来; 如此, 我们至少需要一个仓库, 两个分支, 来完成这个任务; 

官网在 [指南-部署-GitHub Pages](https://www.vuepress.cn/guide/deploy.html#github-pages) 一节中提到了创建 deploy.sh 脚本; 
这个脚本将为我们自动化完成静态页面的生成, 和静态页面的上传工作;  
``` bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 配置下方仓库地址
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

cd -
```

::: tip 
git 将代码从本地传到远程, 都是需要密码的, 但是上面脚本明显没有密码的描述, 那么就需要配置 ssh 免密登录; 
:::
::: tip
使用 `docs:build` 可以产生静态页面, 上面说过, Vuepress 是一个约定大于配置的框架, 那么, 这个指令生成的页面默认在 `docs/.vuepress/dist/` 下; 
:::


总结一下, 在官网的帮助下, 我们还需要完成几件事: 
1. 获取一个自己的 github.io 仓库, 用于存放自己的静态页面和源码; 
1. 项目下新建 git 仓库, 配置 .gitignore , 让这个仓库连接 github.io 仓库, 同时在本地创建第二个分支; 
1. 配置 SSH , 允许 git 免密上传; 
1. 利用脚本, 生成静态页面, 并将页面上传至 github.io 的主分支, 然后将项目源码上传到 github.io 的第二个分支; 

::: tip
可以聪明一些, 把 git 上传源码的操作也写到官网的脚本中; 
:::

## 获取 Github.io 仓库

官网创建一个 `<用户名>.github.io` 的仓库, 名字不要乱取; 

## 创建本地 Git 仓库
``` bash
git init
git remote add origin https://github.com/...
# 创建本地分支, 我叫 code , 后面直接上传就行
git branch <分支名称>
```

## 配置 SSH
``` bash
ssh-keygen
```
这个操作会生成一个公钥 `id_rsa.pub` 和一个私钥 `id_rsa` , 生成公钥和私钥的时候, 留意一下输出路径;   
在 Github 官网的 `settings-SSH and GPG keys` 中 new 一个 SSH key , 在弹出的对话框中, 将公钥内的内容粘贴进去; 

## 修改脚本

修改 deploy.sh 使其能够同时上传源码和页面; 

``` bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:<用户名>.github.io.git master

# 退回到项目根目录, 上传源码; 
cd ../../../
git add *
git commit -m 'code'
# 注意修改 分支名称 
git push origin <分支名称>

cd -
```

## 启动
使用 `bash deploy.sh` 指令, 就可以完成 build 和上传工作; 
