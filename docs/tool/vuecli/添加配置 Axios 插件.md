# 添加与配置插件

## Axios

Axios 插件是一个提供 Ajax 功能的插件. 它的涉及到前后端之间的通信. 

`vue add axios` 添加 Axios 插件后, 我们可以在 `src/plugins/` 目录下看见 `axios.js` 配置文件. 但是这时候的 Axios 还是不起作用的. 在创建的 vue.config.js 添加前后端服务器的相关信息. 

``` JS
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // 后端服务器的访问接口
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    // 例如: 前端发送的请求 localhost:8080/api/index, 在后端服务器看来就是 /index
                    '^/api': ''  
                }
            }
        },

        // 前端服务器启动 ip 与端口配置信息
        host: 'localhost', 
        port: 8071, 
    },
}
```

这一段内容与 Webpack 有比较大的关系, 但是我没细看. 需要的话应该参考 [vue config 配置](https://cli.vuejs.org/zh/config/#devserver) 和 [更多的 Webpack 配置信息](https://webpack.js.org/configuration/dev-server/)