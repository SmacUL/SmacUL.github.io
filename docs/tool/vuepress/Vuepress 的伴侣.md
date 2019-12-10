# Vuepress 的伴侣

要能够编辑 Vuepress 下的所有类型的文件, 还要能预览 md , 享受各种插件支持, vscode 就是个不错的选择; 

## vscode 插件介绍

### [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image)

用于图片的复制插入; 
### [markdown-preview-enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/)

Markdown 的强化显示工具, 支持 vue.css , 官网里有很多宝贝;  

## 配置

### Paste Image

前面提到过 Vuepress 中, 图片这类静态资源保存在 `docs/.vuepress/public` 下, 资源在文件中的路径直接从 `public/` 下开始;  
那么上传图片主要搞清楚两个东西: `图片的保存路径` 和 `md 文件中图片的显示路径`;  



::: tip
`md 文件中图片的显示路径` , 在下文中, 就用 `显示路径` 来代替; 
:::

VS code 中主要由几个配置项: 
- Bath Path

    `![]()` 的 `()` 中是 `显示路径`, Bath Path 将完整的路径拆分, `${Path} = ${Bath Path} + '/' + ${显示路径}`;
- Path

    `图片的保存路径`, 可以使用 `${projectRoot}` 和 `${currentFileDir}` 来分别获得 `vscode 打开的文件夹的根目录`和 `当前文件目录`
- Prefix

    添加在 `显示路径` 前面的东西, 扩展显示的内容; 
- Sufix

    与 Prefix 同理; 
- Insert Pattern

    控制 `[]` 内显示的内容; 

- Default Name

    图片的默认保存名称
- Name Prefix
- Name Suffix

#### 综上

一个正确的图片示例: `![](/note/img/2019-12-03-16-13-55.png)`   
它的实际存储位置: `./docs/.vuepress/public/note/img/2019-12-03-16-13-55.png`

配置单:
``` bash
Base Path: ${projectRoot}/docs/.vuepress/public
Path: ${projectRoot}/docs/.vuepress/public/note/img/
Prefix: /
```

::: tip
前面提过, `${Path} = ${Bath Path} + '/' + ${显示路径}` , 这里的 `/` 只能在 Prefix 中被设置; 
:::

现在, 使用复制了图片之后, 就可以使用 `option + command + v` 来在 md 的任意合法位置插入图片, 同时保存图片;  


### markdown-preview-enhanced

上面给了官网的链接, 很好看的; 








