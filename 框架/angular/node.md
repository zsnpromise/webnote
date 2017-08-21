[TOC]

## 流行框架 Angular第一天

### 1.为什么要学习Angular?
- 使我们做单页面应用更加容易
- Angular自身有很多颠覆性的特性 改变了前端的编码方式 简化了我们的操作
- 火,就业需要

### 2.Angular是什么?
- 一款非常优秀的前端高级JS框架
- 由谷歌团队负责开发维护


### 4.框架与库

- 无论是angular还是jQuery都是用原生JS封装的
- 库: 
    + 对代码进行封装 调用封装的方法 简化操作
        * jquery 针对DOM操作
        * requirejs js模块化
- 框架：
    + 虽然也是调用封装的方法
    + 但是更多的框架会提供代码书写的规则
    + 我们要按照规则去写代码 框架会帮我们实现相应的功能

### 5.Angular核心思想
- write less do more
- 其核心是通过指令扩展了HTML，通过表达式绑定数据到HTML。
- Angular不推崇DOM操作，也就是说在NG中几乎找不到任何的DOM操作
- 一切操作以数据为中心，用数据驱动DOM

### 6.获取angular的方式
+ [在官网上下载](http://angularjs.org)
+ [通过CDN的方式引入到页面中](https://cdn.bootcss.com/angular.js/1.6.4/angular.min.js)
+ `<script src="https://cdn.bootcss.com/angular.js/1.6.4/angular.min.js"></script>`

### 7.Angular快速入门 (hello world)

- 基本的指令及表达式
    + 在使用了angular的页面，以ng-开头的属性，都可以称之为指令
    + ng-app
        * 告诉angular它在页面中所要控制的范围
        * 页面加载完成angular会自动在页面中查找这个指令
        * 如果页面中没有这个指令,angular将不会启动
    + ng-model
        * 实现双向数据绑定
    + ng-click
        * 点击事件(和原生JS中的onclick事件作用一样)
    + ng-init
        * 初始化数据
    + 表达式介绍
        * {{}} 这种双大括号的形式称之为插值表达式
        * 在表达式中可以写ng中的变量
        * 可以显示字符串
        * 在表达式中可以进行计算
        * 可以在表达式中写三目运算符
        * 执行angular函数
- 画图分析Angular实现双向数据绑定的原理

### 8.Angular模块化开发
- 模块化开发带来的好处
    + 方便管理, 复用,后期维护方便
    + 解决代码冲突,方便多人协作开发
- 分析模块和控制器与页面之间的关系
- 定义模块的语法规则
- 定义模块时第二个参数加与不加的区别
    + 加第二个参数是创建模块
    + 不加第二个参数是获取模块
- 报错信息分析
    +  Module 'myApp' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.
    + 'myApp' 这个模块是不可获取的！ 你要么拼写错误 要么忘了加在他 你要确保一个有效的模块 做为了第二个参数的依赖

- 模块依赖
    + 主模块依赖了其他模块 就相当于拥有了其他模块的功能

### 9.Angular中如何使用控制器
- 定义及使用控制器
- 控制器的作用
    + 向页面中赋初始值
    + 向页面中展示数据
    + 代码分类

### 10.单页面应用程序介绍 (simple page application)
- 回顾传统网站(http://www.kuoda.com.cn/indexs.html)(图)
- 单页应用网站(http://m.daqizhong.com/index.html#/)
- 解释单页面应用(图)
- 单页面应用实现原理(图)
- 单页面应用程序的特点
    + 整个网站由一个页面构成
    + 公共部分只加载一次
    + *利用Ajax局部刷新达到页面切换的目的*
    + 不会发生页面跳转白屏的现象
    + *锚点与页面对应*

- 原生JS实现一个简单的单页面demo
- angular实现一个简单的单页面demo

### 11.Angular中的路由
- 通过画图分析在生活中路由起到什么样的作用
- Angular中的路由使用方法
    + [官方说明文档](https://docs.angularjs.org/api/ngRoute)
    + 如何获取路由模块
        * [通过CDN的方式引入到页面中](https://cdn.bootcss.com/angular.js/1.6.4/angular-route.min.js)
    + 在html页面中通过script标签的方式引入路由模块文件
    + 在应用主模块中依赖路由模块ngRoute
    + 配置路由
        * 通过config方法注入$routeProvider
        * 介绍配置中常用的参数
    + 路由和控制器的整合
    + 使用templateUrl方式载入模板需要在http环境下(本地file协议下不支持)

### Angular相关网站
- [官方网站](http://angularjs.org)
- [官方文档](https://code.angularjs.org/1.6.4/docs/api)
- [学习网站]
    + http://www.angularjs.net.cn
    + http://www.apjs.net
    + http://www.runoob.com/angularjs/angularjs-tutorial.html