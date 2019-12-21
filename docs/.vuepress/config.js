module.exports = {
    title: "SmacUL's Blog",
    description: '你好',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/Logo.png' }]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            // { text: 'Project', link: '/project/'},
            { text: 'About Me', link: '/self/'},
            { text: 'GitHub', link: 'https://github.com/SmacUL' },
        ],

        sidebarDepth : 3,
        lastUpdated: 'Last Updated',

        sidebar: {
            '/project/': [
                '',
                // ['Python 爬虫--框架', 'Python 爬虫--框架']
            ],
            '/log/': [
                ['新闻数据爬虫', '新闻数据爬虫']
            ],
            '/basic/datastructure/': [
                '',
                // ['']
            ],
            '/basic/network/': [
                '',
            ],
            '/web/css/': [
                '',
                ['Layout', '布局'],
                // ['可伸缩式布局', '可伸缩式布局'],
                ['Selector', '选择器'],
                ['继承与优先级', '继承与优先级'],
                ['限制作用域', '限制作用域'],
            ],
            '/lang/js/': [
                '',
                ['数据类型', '数据类型'],
                ['变量 作用域 垃圾回收', '作用域'],
                ['垃圾回收', '垃圾回收'],
                ['闭包', '闭包'],
                ['事件流 事件处理程序 事件对象', '事件'],
                ['Ajax 与 Conet', 'Ajax 与 Conet'],
                ['常用场景', '常用场景']
            ],
            '/lang/java/': [
                '',
                ['数据类型', '数据类型'],
                ['反射', '反射'],
            ],
            '/lang/python/': [
                ''
            ],
            '/tool/webpack/': [
                // '',
                ['文档阅读', '文档阅读']
            ],
            '/tool/mysql/': [
                '',
                ['SQL 关系操作', 'SQL 关系操作'],
                ['Mysql 数据类型', 'Mysql 数据类型'],
            ],
            '/tool/maven/': [
                // '',
                ['Maven', 'Maven']
            ],
            '/tool/git/': [
                '',
                ['Git', 'Git'],
                ['Github', 'Github']
            ],

            '/tool/hibernate/': [
                // '',
                ['Hibernate', 'Hibernate']
            ],
            '/tool/mybatis/': [
                // '',
                ['MyBatis', 'MyBatis'],
            ],
            '/tool/spring/': [
                '',
                ['springBean', 'SpringBean'],
                ['springMVC1', 'SpringMVC1'],
                ['springMVC2', 'SpringMVC2'],
                ['springMVC3', 'SpringMVC3'],
            ],
            '/tool/vuepress/': [
                '',
                ['快速开始', '感受 Vuepress'],
                ['部署到 Github Page', '部署到 Github Page'],
                ['简单装修', '简单装修'],
                ['Vuepress 的伴侣', 'Vuepress 的伴侣']
            ],
            '/': [
                '',
            ],
        },
        
        
      }
}