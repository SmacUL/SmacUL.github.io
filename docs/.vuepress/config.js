module.exports = {
    title: "SmacUL's Blog",
    description: 'こんにちは',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/Logo.png' }]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        // logo: '/assets/img/Logo.png',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Project', link: '/project/', target:'_blank'},
            { text: 'About Me', link: '/self/', target:'_blank'},
            // { text: 'External', link: 'https://baidu.com' },
        ],

        sidebarDepth : 3,
        lastUpdated: 'Last Updated',

        sidebar: {
            '/project/': [
                '',
                // ['Python 爬虫--框架', 'Python 爬虫--框架']
                ['TestA', '新闻推荐系统'],
                // 'TestB',
                // ['TestC', 'TesdddtC']
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
                // ['基本概念', '基本概念'],
                ['基本类型', '数据类型'],
                ['变量 作用域 垃圾回收', '变量 作用域 垃圾回收'],
                // ['函数表达式', '函数表达式'],
                // ['JS 对象', 'JS 对象'],
                // ['基本引用类型', '基本引用类型'],
                // ['BOM 对象', 'BOM 对象'],
                // ['用户检测代理', '用户检测代理'],
                ['事件流 事件处理程序 事件对象', '事件流 事件处理程序 事件对象'],
                ['Ajax 与 Conet', 'Ajax 与 Conet'],
                // ['JS 对象总结', 'JS 对象总结'],
                ['常用场景', '常用场景']
            ],
            '/lang/java/': [
                '',
                ['Java 应该是什么样的', 'Java 应该是什么样的'],
                ['第一个 Java 程序', '第一个 Java 程序'],
                ['Java 的初始化与清理', 'Java 的初始化与清理'],
                ['访问权限', '访问权限'],
                ['复用类的手段', '复用类的手段'],
                ['多态', '多态'],
                ['抽象类和方法', '抽象类和方法'],
                ['内部类', '内部类'],
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
                // '',
                ['Git', 'Git']
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