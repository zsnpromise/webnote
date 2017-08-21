<title>node笔记</title>

## 环境配置 基本概念 node基本语法及ES6(7.24)

#### 环境配置

1. 下载：[nvm-windows](https://github.com/coreybutler/nvm-windows/releases/download/1.1.6/nvm-noinstall.zip)
2. 解压到一个全英文路径
3. 在全英文路径下新建 `settings.txt` 文件，把下面配置考入
  ```
  root: <nvm.exe 所在的目录，例如：C:\Develop\nvm>
  arch: 64
  proxy: none
  originalpath: .
  originalversion:
  node_mirror: https://npm.taobao.org/mirrors/node/
  npm_mirror: https://npm.taobao.org/mirrors/npm/
  ```
4. 配置环境变量 可以通过 `window+r` 运行 `sysdm.cpl`
  + 环境变量：就是操作系统中定义变量的地方。通过配置允许程序在电脑上可以快捷访问的范围。
  + `NVM_HOME = <当前 nvm.exe 所在目录>`
  + `NVM_SYMLINK = <node 快捷方式所在的目录>`
  + `PATH += %NVM_HOME%;%NVM_SYMLINK%;`
  + 打开CMD通过 `set [name]` 命令查看环境变量的值或set Path查看全部环境变量
  + PowerShell中是通过 `dir env:[name]` 命令
5. NVM使用说明(Node Version Manager（Node 版本管理工具）)：
  + https://github.com/coreybutler/nvm-windows
6. NVM基本操作
   + nvm use <version>切换node版本
   + nvm install <version>插入node版本
   + nvm version 输出所有版本
   + node -v 输出当前版本
   + nvm list available 输出镜像库里所有的版本

#### 知识点

-  <>：必填参数  
-  []：选填参数
-  函数提升是历史原因，以前的浏览器内存小，提升到顶部一次开辟空间。要是不够内存直接就会出问题，而不用运行到一定位置后在报错。
- shift ?可以显式git站点中所有快捷键
- angular1中使用的是定时器轮询实现数据双向绑定。vue和angular2使用Object.defineProperty()方法实现数据的双向绑定。
 > https://developer.mozilla.org/zh-CN/docs/Web
- DEBUG vscode中自带的js运行环境 
- 配置md文件转html文件步骤
   + 先找一个解析md的模块 
   > https://github.com/chjj/marked
   + 再加上githab.css

#### node基本语法

1. node知识点
  - 全局根对象 global
  - Node.js 是一个 JavaScript 的运行平台，不是一门语言，更不是 JavaScript 的框架。
  - 在node环境中运行js文件，它会把js文件当成一个模块，伪全局变量指的是node在运行当前js文件时给这个文件传入的对象，并不是真的全局对象。
  - REPL 是一个类似于 Console 的东西，用于测试小量代码
  > - 官方文档：https://nodejs.org/dist/latest-v8.x/docs/api/
  > - 国内文档镜像：https://npm.taobao.org/mirrors/node/latest/docs/api/index.html
  > - 全局对象（顶层对象）
  https://npm.taobao.org/mirrors/node/latest/docs/api/globals.html
  - REPL环境-Mancy，类比于console.log，输出输入，进入下一次
  - process进程对象，类比于浏览器中this。
  - 第三方模块 loadsh 封装一些数组对象操作函数
2. node在cmd中操作
  - .exit 退出node

#### 辅助成员

- `console`
- `setInterval`
- `setTimeout`

#### 进程相关

- `process`
  + `process.stdin` 获取用户输入，回车结束
  + `process.stdout`
    - 一个指向标准输出流(stdout)的 可写的流(Writable Stream)：
    - process.stdout.write('这是一行数据\n这是第二行数据');
  + `process.argv`  获取执行模块用户传入参数
  + `process.env`
    - process.env.NODE_ENV === 'production'
    - 判断是否是生产环境
  + `process.cwd()` 当前目录
  + `process.title`  修改命令框title
  + `process.versions`   
    - 一个暴露存储 node 以及其依赖包 版本信息的属性
  + `uncaughtException event`   全局异常捕获

#### 路径相关（伪全局）

- `__dirname`  当前路径
- `__filename` 当前文件路径（多一个文件名称）

#### 模块相关（伪全局）

- `module`
- `exports`
- `require()` 引入模块

#### ES6
- let定义的是一个可变的量
- const 定义一个常量
- 模板字符串  `${}`
- 箭头函数没有this的说法，箭头函数不会改变this的指向
   

## Common JS 模块 文件操作练习(7.26)

- Node REPL 环境
  - https://github.com/princejwesley/Mancy
- inspect 调试 下一步n
### 模块化开发

- Node 采用的模块化结构是按照 Common JS 规范
- 模块与文件是一一对应关系，即加载一个模块，实际上就是加载对应的一个模块文件。
- 关于 Common JS 规范（了解）
  > http://wiki.commonjs.org/wiki/CommonJS
- Common JS 模块特点 
  + 所有代码都运行在模块作用域（本质上是自执行函数），不会污染全局作用域。
  + 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。如果想让模块再次运行，必须清除缓存。
  + delete require.cache['C:\\Users\\zce\\Desktop\\day-02\\code\\lib\\calc.js']
  + 模块加载的顺序，按照其在代码中出现的顺序。
  + 定义一个模块
     - 一个新的 JS 文件就是一个模块，包括入口文件；
     - 一个合格的模块应该是有导出成员的，否则模块就失去了定义的价值；
     - 模块内部是一个独立（封闭）的作用域（模块与模块之间不会冲突）；
     - 模块之间必须通过导出或导入的方式协同；
- 如果我们需要载入一个自己写的 JS 文件，路径必须采用点开头的路径
- 模块内部定义的成员只能在模块内部使用,除非挂载到全局对象上(global)
#### 导出方式：

     - 导出单个成员:  exports.name = value;
     - 导出整体对象: module.exports = { name: value };
  +  module.exports 和 exports
     - exports 是指向 module.exports 的别名，相当于在模块开始的时候执行
        + var exports = module.exports;
     - 最终模块的导出成员以 module.exports 为准

#### 载入模块

- Node 使用 Common JS 模块规范，内置的 require 函数用于加载模块文件。
   + require 的基本功能是，读入并执行一个 JavaScript 文件，然后返回该模块的 exports 对象
   + 如果没有发现指定模块文件就会报错。
- require 参数（模块路径）
   + `.`：相对路径方式加载模块文件
     - const module1=require('./calculator')
     + start with .:./ ../
        - 都是按照相对路径方式找到文件
        -  相对路径得考虑基准路径
   + `/`：绝对路径方式加载文件
     - 没有可移植性,基本不会用
     - const module2=require('C:/czbkqd/就业班/笔记/node/lib/require.js')
   
   + other：加载预定义模块
     - const fs=require('fs');
   + 可省略的情况：
      - 扩展名是 `.js`、`.json`
      - require 可以用来载入 JSON 文件，返回对象
      + 文件名是 `index`index和扩展名可以默认不写
        - 如果有和目录同名得文件，则找这个文件
- require.main 可以用来获取入口模块

#### require实现原理   

```js
function $require(x){
    //1.根据文件路径找到js文件
    const fs=require('fs');
    const path=x
    //2.读取文件内容
    const content=fs.readFileSync(path,'utf8')
    //3.执行代码
    const $module={
        $exports:{}
    }
    const $exports=$module.$exports
    const code=`(function($exports,$module,$require){
         ${content}
    }($exports,$module,$require))
     
    `
   eval(code);
    //4.想办法拿到module.exports
    //4.return
    return $module.$exports;
}
```      

#### 常用内置模块

- [path](http://nodejs.org/api/path.html)：处理文件路径。
- [fs](http://nodejs.org/api/fs.html)：操作文件系统。
- [url](http://nodejs.org/api/url.html)：用于解析 URL。
- [http](http://nodejs.org/api/http.html)：提供 HTTP 服务器功能。
- [querystring](http://nodejs.org/api/querystring.html)：解析 URL 中的查询字符串。
- [util](http://nodejs.org/api/util.html)：提供一系列实用小工具。
- [其他](https://nodejs.org/api/)

---  

#### require 的缓存 

### 文件操作

#### path 模块
- path不会判断路径存在与否，只是单纯得字符串操作。
+ path.join() 
   - join只是单纯得拼接
+ path.resolve() 
   - resolve会在前一个路径作为基准路径，然后cd操作 后面绝对路径会覆盖第一个
- path.basename() -- 获取文件名（可以忽略扩展名）
- path.dirname() -- 获取路径中的目录部分
- path.extname() -- 获取扩展名部分
- path.isAbsolute() -- 判断是否为绝对路径
- path.normalize() -- 正常化路径（格式）
- path.relative() -- 获取第二个目录相对于第一个目录的相对路径
- path.parse() -- 类似于 JSON.parse
- path.format() -- 类似于 JSON.stringify

```js
console.log('join用于拼接多个路径部分，并转化为正常格式');
const temp = path.join(__dirname, '..', 'lyrics', './友谊之光.lrc');
console.log(temp);

console.log('获取路径中的文件名');
console.log(path.basename(temp));

console.log('获取路径中的文件名并排除扩展名');
console.log(path.basename(temp, '.lrc'));

console.log('====================================');

console.log('获取不同操作系统的路径分隔符');
console.log(process.platform + '的分隔符为 ' + path.delimiter);

console.log('一般用于分割环境变量');
console.log(process.env.PATH.split(path.delimiter));

console.log('====================================');

console.log('获取一个路径中的目录部分');
console.log(path.dirname(temp));

console.log('====================================');

console.log('获取一个路径中最后的扩展名');
console.log(path.extname(temp));

console.log('====================================');

console.log('将一个路径解析成一个对象的形式');
const pathObject = path.parse(temp);
console.log(pathObject);

console.log('====================================');

console.log('将一个路径对象再转换为一个字符串的形式');
// pathObject.name = '我终于失去了你';
pathObject.base = '我终于失去了你.lrc';
console.log(pathObject);

console.log(path.format(pathObject));

console.log('====================================');

console.log('获取一个路径是不是绝对路径');
console.log(path.isAbsolute(temp));
console.log(path.isAbsolute('../lyrics/爱的代价.lrc'));

console.log('====================================');

console.log('将一个路径转换为当前系统默认的标准格式，并解析其中的./和../');
console.log(path.normalize('c:/develop/demo\\hello/../world/./a.txt'));

console.log('====================================');

console.log('获取第二个路径相对第一个路径的相对路径');
console.log(path.relative(__dirname, temp));

console.log('====================================');

console.log('以类似命令行cd命令的方式拼接路径');
console.log(path.resolve(temp, 'c:/', './develop', '../application'));

console.log('====================================');

console.log('获取不同平台中路径的分隔符（默认）');
console.log(path.sep);

console.log('====================================');

console.log('允许在任意平台下以WIN32的方法调用PATH对象');
// console.log(path.win32);
console.log(path === path.win32);

console.log('====================================');

console.log('允许在任意平台下以POSIX的方法调用PATH对象');
console.log(path === path.posix);
```

### fs 模块

#### 同步方式读写

- `fs.readdirSync(path[, options])`  获取目录下的文件名称
- `fs.readFileSync(path[, options])` 同步读取文件内容
- `fs.writeFileSync(file, data[, options])` 同步写入
- fs.renameSync 修改文件名称
- fs.statSync 获取文件状态



#### 异步方式读写

- `fs.readdir(path[, options], callback)`
- `fs.readFile(path[, options], callback)`
- `fs.writeFile(file, data[, options], callback)`



#### 对比两者差异

异步编程与同步编程各自优缺点

错误处理使用 trycatch
错误处理使用 回调函数的第一个参数
- 性能
  - 异步 win
- 代码可读性
  - 同步 win
- 异常处理
  - 同步 win  

### fs 案例

- 批量文件批量重命名
- 歌词文件读取并解析
  - GBK 编码通过 iconv-lite模块 转换
  - /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/
- 字符画动画
  - \u001b[2J\u001b[0;0H
  - clear 模块


#### 知识点
- 谷歌换浏览器图片插件 pejkokffkapolfffcgbmdmhdelanoaih 
- 传入图片尺寸返回图片
  > https://unsplash.it/800/800?random    
- node原生API不够满足需求时，可以c++ 写  
- normalize.css 对样式进行初始化。
- process.on('exit',)  程序最后执行事件 
#### 老师信息
  - 13241087977
  - w@zce.me
  > https://github.com/zce




## NPM NRM NVM node单线程原理(7.27)

- npm registry(注册表)node包的管理工具
- nvm node版本管理器
- nrm 镜像管理工具，管理npm拉取包的地址
  - nrm ls
  - 可以用来切换npm镜像的源
  - nrm use npm 
+ node --
  - repl类似浏览器的输出调试框,可以直接在cmd中输入js执行
  - 启动一个js文件： `node path/to/text.js`
  - ~~ `node inspect path/to/text.js` ~~  

### NPM （node.js package management）

- 全球最大的模块生态系统，里面所有的模块都是开源免费的；也是Node.js的包管理工具。
   > https://www.npmjs.com
+ npm概念
  - npm不需要额外安装，nvm在安装特定版本的node时就附带安装了
  - 每一个使用npm去管理包的项目，都需要有一个package.json文件，
  这个文件的作用就是用来描述和记录项目相关信息。
  - 用来安装项目中依赖的 package
  - 自身就是一个包，这个包是用来管理其它包
  - 包可以是一个提供API的包，也可以是一个工具包
  - 如果一个包提供的是API，一般我们将其安装到项目文件夹中
  - 如果一个包提供的是一个工具，安装到全局目录下。这样可以在任意目录下使用

+ 解决 npm 数据源不稳定
  + registry 选项
    - 作用：修改镜像源
    - npm config set registry https://registry.npm.taobao.org
    - 可以借助 [nrm](https://github.com/Pana/nrm) 管理
    - npm install nrm -g --registry=https://registry.npm.taobao.org
+ npm常用命令
     - npm init 初始化模块
     - npm install 安装模块
     - npm uninstall 卸载模块
     - npm update 更新模块
     - npm outdated 检查模块是否已经过时
     - npm ls 查看安装的模块
     - npm init 在项目中引导创建一个package.json文件
     - npm help 查看某条命令的详细帮助
     - npm root 查看包的安装路径
     - npm config 管理npm的配置路径
     - npm cache 管理模块的缓存
- yarn 基本使用：类比 npm 基本使用

### 自定义包

- 一系列相关模块组合到一起形成一个完整功能模块
- 多个模块可以形成包，不过要满足特定的规则才能形成规范的包  

##### 包的规范（约定）
- nodejs中用npm初始化来创建package.json
- package.json 必须在包的顶层目录下
- JavaScript 代码应该在lib目录下
- 文档应该在 doc 目录下
- 单元测试应该在 test 目录下

##### package.json字段分析

- name：包的名称，必须是唯一的，由小写英文字母、数字和下划线或中划线组成，不能包含空格
- description：包的简要说明
- main：指的是 包被载入时 默认加载的文件
- entry point 指的是包被载入时默认加载的文件
- version：符合语义化版本识别规范的版本字符串
- keywords：关键字数组，通常用于搜索
- dependencies：生产环境包的依赖，一个关联数组，由包的名称和版本号组成
- devDependencies：开发环境包的依赖，一个关联数组，由包的名称和版本号组成

#### npm包安装方式

- 本地安装
  - 在项目代码中使用某个模块
  - 如果一个包提供的是 API，一般我们将其安装到项目文件夹中，通过 require 使用
  - `npm install <package-name>`
- 全局安装
  - 一般工具包会全局安装
  - 如果一个包提供的是一个工具，一般将其安装在全局目录，这样可以在任意目录下使用
  - `npm install <package-name> --global`
  - less          用来编译 less 文件的
  - http-server   通过 node 启动一个 http 服务，默认将当前目录作为网站根目录
  + browser-sync 
    - 使用： browser-sync start -s . -f "*.html,*.css,*.js " 
    --nonotify
    - browser-sync start help打印start下的参数
    - -s . 服务器管理的路径
    - -f "*.html,*.css,*.js " 服务器管理的文件类型
    -  --nonotify 十分进行监控文件修改后浏览器页面更新
  - cli 工具 command line interface 工具

### Web 开发

+ 服务器模型，对比 Node.js 模型与传统服务端模型
  + node
    - 单线程，如果报错了，后续的用户就一直出于等待状态。
    - node本身就提供HTTP服务，在node中开一个服务，对某个端口进行监听，发现请求调用对应页面发回给用户。
    - node要做一些不耗时的操作，文件等操作都交给异步。
    - node底层实现还是多线程，比如异步的多个文件操作。
    - 在多核cpu的情况下，node可以通过多进程的方式来达到其它后台语言多线程的优势。
  + php
    - 多线程。
    - apache提供监听端口服务，发现是.html后缀的文件，直接返回给用户，发现是.php后缀的文件，把任务交给php，php处理后把页面返回给apache，apache再返回给用户
    -  apache -- 提供 HTTP 服务（能接收符合 HTTP 标准的请求，并返回符合 HTTP 标准的响应）
+ 线程概念
    - 程序再window上的表现为一个.exe的文件
    - 启动程序就是启动一个进行。
    - 线程是cpu最小调用单元
    + 在单核cpu情况下，多线程都是假的。
       - 线程是交给cpu执行，cpu执行是快速切换线程，本质上还是一个人做多个事。上下文切换消耗性能。
       - 就像一个人做多件事，node就是做完a任务再做b任务。
       - 而php是做a任务做到一部分，再去做b任务，做了一部分b任务，又回来做a任务。
       - 在a切换到b时，a的一部分准备被舍弃了，切换回来，又要把a的资源捡起来，这很消耗性能。
      
+  处理静态文件请求（实现静态网站服务器功能）
  - 由于 Node.js 没有内置静态文件请求处理功能，所以需要开发人员编码完成

### 知识点

+ 命令的本质
  - 找到一个可执行文件
  - 第一个空格以后全部都是提供给这个进程的参数
-   php<?php 文件中后面不要写封闭的?>，因为写了会把?>后面的回车当成空格解析，返回的文档会多一个空格。 



## Nodo 中的快速开发框架,中间件(7.29)

- 在 Node 开发领域最著名的快速开发框架肯定是 Express
- tj  connect express  koa
- Express 简介
  - Express 是一个非常简单的 Web Framework。就像我们在页面开发时用的 jQuery 一样，只是让我们的开发过程更加高效。
- 它的核心特性：**中间件机制**

### 中间件（管道）的概念

<!-- ![](media/middleware.png) -->

- 每一个环节就是一个中间件，每个中间件中都可以控制下个环节的工作
- 比如：接收到请求过后，先判断是不是静态文件请求，在处理动态文件请求
  - 对于流程性特别强的程序开发过程，中间件是最适合也是最灵活的方式。
    - Node 开发领域中第一个实现中间件机制的框架就是 Connect，Connect 就是 Express 的前身。

### Connect

> Connect is a middleware layer for Node.js
> Connect is a simple framework to glue together various "middleware" to handle requests.

```js
const url = require('url')
const path = require('path')

const connect = require('connect')

const app = connect()

// 第一个中间件处理静态文件请求
app.use((req, res, next) => {
  const urlObj = url.parse(req.url)
  const extname = path.extname(urlObj.pathname)
  const staticExt = ['.html', '.css', '.js']
  if (staticExt.includes(extname)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('静态请求')
    return
  }
  next()
})

// 第二个中间件处理动态请求
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.end('动态请求')
})

app.listen(3000)


```

### connect中间件框架

```js
const http = require('http')

/**
 * 中间件执行框架
 */
function Connect () {
  // 如果不是通过 new 的方式执行，则我们帮他 new
  if (!(this instanceof Connect)) return new Connect()
  this.middlewares = []
}

/**
 * 载入一个中间件
 * @param  {Function} middleware 中间件函数
 * @return {[type]}            [description]
 */
Connect.prototype.use = function (middleware) {
  this.middlewares.push(middleware)
}

/**
 * 启动一个 HTTP 服务并监听一个 指定的 端口
 * @return {[type]} [description]
 */
Connect.prototype.listen = function (...args) {
  /**
   * 请求时触发的请求处理函数（事件处理函数）
   * @param  {[type]} req [description]
   * @param  {[type]} res [description]
   * @return {[type]}     [description]
   */
  const handleRequest = (req, res) => {
    // this 指向 重点看的是调用时 而不是定义时
    // console.log(this) // 如果不去处理 就应该是 server
    let index = -1

    const next = () => {
      index++ // 执行下一个
      const current = this.middlewares[index]
      current && current(req, res, next)
    }

    // 起个头去调用第一个中间件函数
    next()
  }

  const server = http.createServer(handleRequest)
  // server.listen.apply(server, args)
  server.listen(...args)
}


module.exports = Connect
```

#### 知识点

+ new它是函数调用的一个修饰词
   - this创建一个新的空对象，作为这次调用函数的对象
   - return在执行完这个函数过后，把this作为返回值返回
+ nodemon包，自动更新node站点包   
   - nodemon nodejs文件更新页面更新，不用重启node
- del package.json  
- npm init --yes 直接初始化
- Node中不去区分请求的pathname，所有的请求都在 请求
处理函数中处理 
- Apache：创建一个http服务；php：开发动态网站

````js
  //  HTTP 协议中约定 如果响应报文中有 location 就会让客户端跳转
  // 301永久性跳转 302暂时性跳转
      request.statusCode = 302
      request.setHeader('Location', '/list')
      
   //接收数据事件
    request.on('data', chunk => {
      chunk.toString('utf8') //返回一个流，转化为字符串
    })
    .on('end', () => {})//数据接收完成事件

   //服务对象，监控异常
    server.on('error', err => {})
````


## Express入门(7.30)

- 一个基于connect的中间件框架，express 3.x 内置很多中间件，express 4.x 变成按需加载
> http://expressjs.com.cn/

- app.[METHOD]([PATH], [HANDLER])
  - app 是 express 的实例。
  - METHOD 是 HTTP 请求方法。
    - get(指定请求类型) use(支持所有类型，HANDLER可以是一个路由对象)
  - PATH 是服务器上的路径。
  - HANDLER 是在路由匹配时执行的函数。
- 处理静态文件请求  app.use(express.static('public'))
- express 的基础 api 同 connect 相同;express 在 connect 基础上做的改变
  - 增加了更为复杂的路由机制

####  异常处理

- 如何处理 404 响应？

  在 Express 中，404 响应不是错误的结果，所以错误处理程序中间件不会将其捕获。此行为是因为 404 响应只是表明缺少要执行的其他工作；换言之，Express 执行了所有中间件函数和路由，且发现它们都没有响应。您需要做的只是在堆栈的最底部（在其他所有函数之下）添加一个中间件函数来处理 404 响应：

  ```js
  app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!')
  })
  ```
- 如何设置错误处理程序？

  错误处理中间件的定义方式与其他中间件基本相同，差别在于错误处理中间件有四个自变量而不是三个，专门具有特征符 (err, req, res, next)：

  ```js
  app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
  ```
 #### 使用 Node + Express 开发动态网站步骤

1. 创建一个项目目录
2. 创建 package.json
3. 安装最基本的项目依赖：express
4. 设计最基本的编码结构
  1. 项目代码执行的入口文件 index.js
  2. 载入 express 模块，创建一个 app 对象
  3. 处理静态文件请求
  4. 对请求的路由做一个设计，有哪几种请求的地址，每一个请求处理函数
5. 业务逻辑编码过程


#### 模版引擎

handlebars模版
npm i hbs --save

在定义app对象的地方设置模版引擎

> http://expressjs.com/zh-cn/guide/error-handling.html

xtemplate模版
npm i xtpl xtemplate

#### 知识点
- npm i 包@版本
- sketch比ps设置图更快
- https://cva.cc/西游翻墙
- http://tongji.baidu.com/data/ 统计
- body-parser中间件：获取post提交的数据


## node项目登陆（8.2）

### music-server

1. npm init 初始化 package.json 文件
2. npm install 安装相关的项目依赖包（express xtpl xtemplate body-parser）
3. 搭建基本的 MVC 结构（指定项目约束）
4. 分别创建不同的 controller + model + view 去处理不同的业务（配置不同业务班子）
5. 具体的业务编码
6. 后续依赖包
   - mysql 数据库包
   - cookie-session 对session进行管理，自动生成key（cookie）给客户端
   - glob 获取某个文件夹下某个后缀的所有文件
   - xtemplate中可以拿到这个对象的值res.locals：res.locals={}

#### package.json解析

+  scripts 是用来定义预制命令
   - 可以通过 npm run <name> 执行这个命令 如果 name 为 test / start 可以省略 run
   - 还可以通过 pre<name> 和 post<name> 去定义这个命令之前和之后的命令
- devDependencies 中记录的是开发依赖（工具）
- dependencies 中记录的是我们代码的依赖 require 函数会用到的  
- npm i nodemon --save-dev 把工具包添加到当前项目中，好处是在新的地方会自动下载 
- MIT 最自由的协议，可以让任何人随意使用
```js
"scripts": {
    "test": "nodemon index.js",
    "prefoo": "echo prefoo",
    "foo": "echo hellokjjshdfjksjdfskdjfhkkkh",
    "postfoo": "echo postfoo"
  },
   "dependencies": {
    "body-parser": "^1.17.2",
  "devDependencies": {
    "nodemon": "^1.11.0"
  }
```

#### 知识点

+ 配置静态资源文件（放在管道最前面）
  - app.use(express.static('./public')) 
  - html中静态文件用绝对路径，网站根路径

+ Mockjs
  - mock 对于开发人员来说，是一种泛指所有客户端模拟数据的一种手段
  - mock 是一种客户端模拟数据的一种手段
+ 客户端请求处理
  1.校验
  2.持久化
  3.响应
- awesome + 名词 git上查询某个项目的清单
+ promise和委托（回掉函数）的区别：
  - promise是异步程序传递一个消息给同步然后同步去做这个事。
  - 委托就是把事情传递给异步，异步去执行。
  - 事件和promise很像，同步注册多个事件保存在一个第三方对象上，然后在异步时通知第三方对象，执行当前事件的所有处理程序。




## node文件上传处理，angular的demo(8.2)

+ MVC
    - 在MVC的结构中，请求最终都是要找到一个controller控制器下的action去处理(不再是一个页面，也不是一个单纯的文件)
    - 通过controller载入的中间件，只要这个控制器被执行，都会最先执行这个中间件
+ formidable（包）处理文件域参数
    - 当表单中有文件域的情况下，表单编码类型要修改为：enctype="multipart/form-data"

- gzip压缩静态文件服务器在传输过程中会进一步压缩，到浏览器在展开  

- script只有在type属性为text/javascript的时候，内部的代码才会作为javascript执行。

- 如果是让一个元素内部滚动加webkit-overflow-scrolling:touch，让元素有惯性滚动
+ node跨域jsonp响应处理
  - res.jsonp 方法会自动获取请求 QueryString 中键 为 callback 的值，
  - 将这个值作为回调函数名称，拼接一段 JS 代码

#### 知识点

- accept：html属性，可以限制上传文件类型
- angu版本1.6后才加跨域信任白名单
- axios 最流行的ajax库
- 有明确时间 有明确目标这就是项目
- audio site:w3school.com.cn 优化搜索关键词

























   
  



