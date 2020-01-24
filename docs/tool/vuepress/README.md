# Vuepress

Vuepress 可以用于搭建个人博客(网站), 它的诞生初衷是为了支持 Vue 及其子项目的文档需求. 我们可以用这个构建自己的静态主页. 

## Quick Start
### 安装
Vuepress 的安装, 我们使用本地安装的形式;   
首先需要一个文件夹, 用来存放文件; 

``` bash
# 将 VuePress 作为一个本地依赖安装
yarn add -D vuepress # 或者：npm install -D vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo '# Hello VuePress!' > docs/README.md

# 开始写作
npx vuepress dev docs
```

::: tip
作为初学者, 在执行 `mkdir docs` 指令的时候, 不要修改 docs , 因为 Vuepress 遵循约定大于配置的原则; 

同时官网提到, 尽量使用 yarn 来安装 Vuepress , 避免麻烦; 
:::

### package.json 的配置
``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
这个操作允许我们使用指令去启动 vuepress 的开发状态, 或生成静态的 HTML 文件; 

### 启动测试
启动指令: `yarn docs:dev` 或 `npm run docs:dev`


## 异常问题与解决
- 出了问题, 请访问[官网](https://www.vuepress.cn)
- 浏览器的开发者工具也是个好东西; 
- 如果修改了 config.js 文件, 可以尝试重启;
