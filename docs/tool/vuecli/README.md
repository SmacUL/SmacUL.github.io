# [Vue CLI](https://cli.vuejs.org/zh/)

Vue CLI 是 Vue.js 的脚手架，用于自动生成 vue.js + webpack 的项目模板. 官网说这玩意是 Vue 开发的标准套路. 

过去 Vue CLI 的安装包的名字叫 `vue-cli`, 现在改成了 `@vue/cli`, 据说是 npm 修改了包的命名规则, 本质上前者代表了 3 以前的版本. 用老版干点事也没什么大问题. 

::: tip
官网可能会有点卡, good luck
:::

## 安装 Vue CLI

如果有老版的 CLI, 可以先卸载再安装

``` sh
npm uninstall -g vue-cli
npm install -g @vue/cli
```

## 感受一下项目

### 初始化项目
``` sh
vue create [项目名]
```

::: tip
项目名建议小写. 这个操作结束之后, 将在当前路径下生成一个名称为[项目名]的文件夹. 
:::

### 项目运行

``` sh
yarn serve
# OR
npm serve
```
![](/note/img/2020-01-02-21-56-42.png)
