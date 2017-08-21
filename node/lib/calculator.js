console.log('./calculator.js')

const add=(a,b)=>a+b;
//如果当前作用域有一个变量和这个对象的一个属性名一样，add:add；简写成add
//导出模块的公共成员。
//可以通过require的返回值拿到
$module.$exports={
    add
}
// exports.abc={};
//适合零散的导出
// (function (exports,module,require,__dirname,__filename){

// }())