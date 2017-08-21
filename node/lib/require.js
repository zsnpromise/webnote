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
var cal= $require('./calculator.js');
console.log(cal.add(2,3))

//inspect 调试n
//谷歌插件 pejkokffkapolfffcgbmdmhdelanoaih

//unsplash.it/300/200?random https://unsplash.it/800/800?random
//传入一个模块名称
const fs=require('fs');
//传入一个相对路径
const module1=require('./calculator')
//传入绝对路径（基本不会用）
//没有可移植性
const module2=require('C:/czbkqd/就业班/笔记/node/lib/require.js')
//1.start with .:./ ../
//都是按照相对路径方式找到文件
//相对路径得考虑基准路径
//2. start with [a-z0-9]:fs path http
//都是去找预制模块（系统内置，第三方），传入的是模块的名称

//3. start with  /or c:/ :
//绝对路径（没有争议）


//扩展名可省略得情况  js，json,node(原生扩展文件)
//require 可以直接载入json文件
//如果文件名是index，可以默认不写，如果有和目录同名得文件，则找这个文件


//node原生API不够满足需求时，可以c++ 写


//require.main 可以用来获取入口模块
//可以手动删除缓存

// 13241087977
// w@zce.me
// 27102514

//把所有得require全部置顶
const path=require('path')
// path不会判断路径存在与否，只是单纯得字符串操作。
path.join()//将多个路径合并到一个路径中，并格式化

path.join(__dirname,'')//把相对路径转化为绝对路径

//join只是单纯得拼接
//resolve会在前一个路径作为基准路径，然后cd操作 后面绝对路径会覆盖第一个
//参数可能绝对路径得时候用
path.resolve()
//normalize.css 对样式进行初始化。


// iconv-lite npm install