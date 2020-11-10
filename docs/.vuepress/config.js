module.exports = {
    title: "SmacUL's Blog",
    description: '你好',
    head: [
        ['link', { rel: 'icon', href: '/assets/img/Logo.png' }]
    ],
    markdown: {
        lineNumbers: true
    },
    plugins: {
        'sitemap': {
            hostname: 'https://SmacUL.github.io'
        },
    },
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            // { text: 'Project', link: '/project/'},
            { text: '关于我', link: '/self/'},
            { text: 'GitHub', link: 'https://github.com/SmacUL' },
        ],

        sidebarDepth : 3,
        lastUpdated: 'Last Updated',

        sidebar: {
            '/basic/datastructure/': [
                '',
                ['排序', '排序']
            ],
            '/lang/css/': [
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
                ['数据类型', '数据管理'],
                // ['集合', '集合'], 
                ['反射', '反射'], 
            ],
            '/lang/python/': [
                ''
            ],
            '/tool/vuecli/': [
                '',
                ['服务与插件', '新老对比'],
                ['添加配置 Axios 插件', '添加与配置插件']
            ],

            '/tool/webpack/': [
                // '',
                ['文档阅读', '文档阅读']
            ],
            '/tool/mysql/': [
                '',
                ['SQL 关系操作', 'SQL 关系操作'],
                ['Mysql 数据类型', 'MySQL 数据类型'],
            ],
            '/tool/maven/': [
                // '',
                ['Maven', 'Maven']
            ],
            '/tool/docker/': [
                '',
                ['配置修改', '配置修改'],
                ['Docker Compose', 'Docker Compose'],
                ['Dockerfile', 'Dockerfile'],
                ['Docker Harbor', 'Docker Harbor'],
                ['历史问题', '历史问题']
            ],
            '/tool/git/': [
                '',
                ['Git', 'Git 的基本使用'],
                ['Github', 'GitHub'],
                ['GitLab', 'GitLab'],
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
                ['部署到 Github Page', '部署到 Github Page'],
                ['简单装修', '简单装修'],
                ['Vuepress 的伴侣', 'VuePress 的伴侣'],
                ['拥抱搜索引擎', '拥抱搜索引擎']
            ],
            '/tool/kubernetes/': [
                '',
                ['Minikube', 'Minikube 与 Kubectl']
            ],

            '/read/': [
                ['瞬间之美', '瞬间之美 -- Web 界面设计如何让用户动心'],
                // ['test', 'test']
            ],

            '/log/seed_labs/': [
                '',
                ['Cross-Site Scripting Attack', 'Cross-Site Scripting Attack'],
                ['SQL Injection Attack Lab', 'SQL Injection Attack Lab'],
                ['Buffer-Overflow Vulnerability Lab', 'Buffer-Overflow Vulnerability Lab'],
                ['Packet Sniffing and Spoofing Lab', 'Packet Sniffing and Spoofing Lab'],
                ['Public-Key Infrastructure Lab', 'Public-Key Infrastructure Lab'],
                ['Local DNS Attack Lab', 'Local DNS Attack Lab'],
                ['Remote DNS Cache Poisoning Attack Lab', 'Remote DNS Cache Poisoning Attack Lab'],
                ['Android Repackaging Attack Lab', 'Android Repackaging Attack Lab'],
                ['Return-to-libc Attack Lab', 'Return-to-libc Attack Lab'],
                ['Virtual Private Network Lab', 'Virtual Private Network Lab'],
                ['Heartbleed Attack Lab', 'Heartbleed Attack Lab'],
            ],
            '/log/news_recommend/': [
                '',
                ['数据库设计与实现', '数据库的设计与实现'],
                ['数据爬虫的设计与实现', '数据爬虫的设计与实现'],
                ['用户系统的设计与实现', '用户系统的设计与实现'],
                ['推荐策略的设计与实现', '推荐策略的设计与实现'],
                ['总结与展望', '总结与展望'], 
            ],
            // '/log/python_operation/': [
            //     '',
            // ],

            '/log/script_with_voice/': [
                '',
            ],

            '/log/vm_with_linux/': [
                '',
                ['VM Ware 的网络模式', 'VM Ware 的网络模式'],
                ['遇到的 CentOS 的网络问题', '遇到的 CentOS 的网络问题'],
                ['CentOS7 安装 OpenVPN', 'CentOS7 安装 OpenVPN']
            ],

            '/': [
                '',
            ],
            
        },
        
        
      }
}